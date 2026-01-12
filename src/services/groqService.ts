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

export const getGroqCompletion = async (
    message: string,
    history: { role: 'user' | 'assistant', content: string }[],
    context: AppContext
) => {
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

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are Peigen AI, a helpful assistant for Peigen, an API testing tool. 
You help users with API requests, debugging, and general programming questions. 
You have access to the CURRENT state of the user's active request and response. 
Use this context to answer questions specifically about what they are doing.
Format your responses clearly using Markdown.

${contextString}`
                },
                ...history,
                {
                    role: 'user',
                    content: message
                }
            ],
            model: 'llama-3.3-70b-versatile',
        });

        return chatCompletion.choices[0]?.message?.content || '';
    } catch (error) {
        console.error('Groq API Error:', error);
        throw new Error('Failed to get response from Groq AI');
    }
};
