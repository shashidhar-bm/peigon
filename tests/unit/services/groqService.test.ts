import { AppContext } from '../../../src/services/groqService';

describe('GroqService', () => {
    const mockApiKey = 'test-api-key';
    const originalEnv = process.env;

    // Variables to hold the re-imported modules for each test
    let getGroqCompletion: (history: any[], context: AppContext) => Promise<any>;
    let GroqMock: any;

    beforeEach(async () => {
        jest.resetModules(); // Clear module cache
        jest.clearAllMocks();
        process.env = { ...originalEnv, REACT_APP_GROQ_API_KEY: mockApiKey };

        // Define the mock factory
        jest.doMock('groq-sdk', () => {
            return jest.fn().mockImplementation(() => ({
                chat: {
                    completions: {
                        create: jest.fn()
                    }
                }
            }));
        });

        // Re-import dependencies to ensure they use the fresh environment/mocks
        const groqModule = await import('groq-sdk');
        GroqMock = groqModule.default;

        const serviceModule = await import('../../../src/services/groqService');
        getGroqCompletion = serviceModule.getGroqCompletion;
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    const mockContext: AppContext = {
        currentRequest: {
            method: 'GET',
            url: 'https://api.example.com/test',
            headers: [],
            params: [],
            body: { type: 'none' }
        },
        response: {
            status: 200,
            statusText: 'OK',
            data: { message: 'success' },
            headers: {},
            responseTime: 100,
            responseSize: 50
        }
    };

    const mockHistory = [
        { role: 'user', content: 'Test prompt' }
    ];

    it('should initialize Groq client with correct API key', async () => {
        const mockCreate = jest.fn().mockResolvedValue({
            choices: [{
                message: {
                    content: 'Test response',
                    tool_calls: undefined
                }
            }]
        });

        GroqMock.mockImplementation(() => ({
            chat: {
                completions: {
                    create: mockCreate
                }
            }
        }));

        await getGroqCompletion(mockHistory, mockContext);

        expect(GroqMock).toHaveBeenCalledWith({
            apiKey: mockApiKey,
            dangerouslyAllowBrowser: true
        });
    });

    it('should call completion with correct parameters', async () => {
        const mockCreate = jest.fn().mockResolvedValue({
            choices: [{
                message: {
                    content: 'Test response',
                    tool_calls: undefined
                }
            }]
        });

        GroqMock.mockImplementation(() => ({
            chat: {
                completions: {
                    create: mockCreate
                }
            }
        }));

        await getGroqCompletion(mockHistory, mockContext);

        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
            messages: expect.arrayContaining([
                expect.objectContaining({ role: 'system' }),
                ...mockHistory
            ]),
            model: 'llama-3.3-70b-versatile',
            tool_choice: 'auto'
        }));
    });

    it('should return correct response format', async () => {
        const mockResponse = {
            choices: [{
                message: {
                    content: 'AI Response',
                    tool_calls: [{ id: '1', function: { name: 'test' } }]
                }
            }]
        };

        const mockCreate = jest.fn().mockResolvedValue(mockResponse);

        GroqMock.mockImplementation(() => ({
            chat: {
                completions: {
                    create: mockCreate
                }
            }
        }));

        const result = await getGroqCompletion(mockHistory, mockContext);

        expect(result).toEqual({
            role: 'assistant',
            content: 'AI Response',
            tool_calls: [{ id: '1', function: { name: 'test' } }]
        });
    });

    it('should throw error when API key is missing', async () => {
        // Spy on console.error to suppress error logging during this test and verify the inner error
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        delete process.env.REACT_APP_GROQ_API_KEY;

        await expect(getGroqCompletion(mockHistory, mockContext))
            .rejects
            .toThrow('Failed to get response from Groq AI');

        expect(consoleSpy).toHaveBeenCalledWith(
            'Groq API Error:',
            expect.objectContaining({ message: expect.stringContaining('is not defined') })
        );

        consoleSpy.mockRestore();
    });

    it('should handle API errors gracefully', async () => {
        const mockError = new Error('API Error');
        const mockCreate = jest.fn().mockRejectedValue(mockError);

        GroqMock.mockImplementation(() => ({
            chat: {
                completions: {
                    create: mockCreate
                }
            }
        }));

        await expect(getGroqCompletion(mockHistory, mockContext))
            .rejects
            .toThrow('Failed to get response from Groq AI');
    });
});
