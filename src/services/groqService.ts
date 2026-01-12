import Groq from 'groq-sdk';
import { ApiRequest, ApiResponse } from '../types';

let groqInstance: Groq | null = null;

const getGroqClient = () => {
    if (!groqInstance) {
        const apiKey = process.env.REACT_APP_GROQ_API_KEY;
        if (!apiKey) {
            throw new Error('REACT_APP_GROQ_API_KEY is not defined in the environment.');
        }
        groqInstance = new Groq({
            apiKey,
            dangerouslyAllowBrowser: true // Required for client-side API calls
        });
    }
    return groqInstance;
};

export interface AppContext {
    currentRequest: ApiRequest;
    response: ApiResponse | null;
}

export type ToolResponse = {
    role: 'assistant';
    content: string | null;
    tool_calls?: any[];
};

export const getGroqCompletion = async (
    history: any[],
    context: AppContext
): Promise<ToolResponse> => {
    try {
        const groq = getGroqClient();

        const contextString = `
CURRENT STATE:
${JSON.stringify({
            request: {
                method: context.currentRequest.method,
                url: context.currentRequest.url,
                headers: context.currentRequest.headers,
                params: context.currentRequest.params,
                body: context.currentRequest.body
            },
            response: context.response ? {
                status: context.response.status,
                statusText: context.response.statusText,
                data: context.response.data,
                headers: context.response.headers,
                time: context.response.responseTime,
                size: context.response.responseSize
            } : 'No response yet'
        }, null, 2)}
`;

        const tools: any[] = [
            {
                type: 'function',
                function: {
                    name: 'update_request',
                    description: 'Update the fields of the current API request.',
                    parameters: {
                        type: 'object',
                        properties: {
                            url: { type: 'string', description: 'The API URL to set.' },
                            method: { type: 'string', enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], description: 'The HTTP method.' },
                            headers: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, value: { type: 'string' }, enabled: { type: 'boolean' } } } },
                            params: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, value: { type: 'string' }, enabled: { type: 'boolean' } } } },
                            body: {
                                type: 'object',
                                properties: {
                                    type: { type: 'string', enum: ['none', 'json', 'formData', 'raw', 'urlencoded'] },
                                    raw: { type: 'string' },
                                    json: { type: 'string', description: 'JSON string for body content' }
                                }
                            }
                        }
                    }
                }
            },
            {
                type: 'function',
                function: {
                    name: 'send_active_request',
                    description: 'Execute the current active API request and return the response.'
                }
            }
        ];

        const messages: any[] = [
            {
                role: 'system',
                content: `You are Peigen AI, an agentic assistant for Peigen, an API testing tool. 
You can autonomously interact with the application to help the user.
You have access to the CURRENT state of the user's active request and response. 

AGENTIC CAPABILITIES:
1. You can update the request using 'update_request'.
2. You can send the request to get actual results using 'send_active_request'.

GUIDELINES:
- If a user asks to "test", "run", "send", or "update" a URL, use your tools.
- After sending a request, analyze the response and explain it to the user.
- When providing code or configuration, ALWAYS use Markdown code blocks with the correct language tag (e.g., \`\`\`typescript).
- The chat UI supports syntax highlighting and has a built-in copy button for code blocks.
- Be concise, professional, and act as a senior software engineer.

${contextString}`
            },
            ...history
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages,
            model: 'llama-3.3-70b-versatile',
            tools,
            tool_choice: 'auto',
        });

        const choice = chatCompletion.choices[0].message;
        return {
            role: 'assistant',
            content: choice.content,
            tool_calls: choice.tool_calls
        };
    } catch (error) {
        console.error('Groq API Error:', error);
        throw new Error('Failed to get response from Groq AI');
    }
};
