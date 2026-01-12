import Groq from 'groq-sdk';

let groqInstance: Groq | null = null;

const getGroqClient = () => {
    if (!groqInstance) {
        const apiKey = process.env.REACT_APP_GROQ_API_KEY;
        console.log('Checking for Groq API Key...');
        if (!apiKey) {
            console.error('REACT_APP_GROQ_API_KEY is missing!');
            throw new Error('REACT_APP_GROQ_API_KEY is not defined in the environment.');
        }
        console.log('Groq API Key found (masked):', apiKey.substring(0, 5) + '...');
        groqInstance = new Groq({
            apiKey,
            dangerouslyAllowBrowser: true // Required for client-side API calls
        });
    }
    return groqInstance;
};

export const getGroqCompletion = async (message: string, history: { role: 'user' | 'assistant', content: string }[]) => {
    try {
        const groq = getGroqClient();
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are Peigen AI, a helpful assistant for Peigen, an API testing tool. You help users with API requests, debugging, and general programming questions. Format your responses clearly using Markdown.'
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
