describe('Groq Chatbot Integration', () => {
    beforeEach(() => {
        // Visit the app homepage clearly
        cy.visit('/');
        // Switch to Chat tab
        cy.contains('button', 'Chat').click();
    });

    it('should allow user to send a message and receive a mocked AI response', () => {
        const userMessage = 'Hello AI';
        const aiResponse = 'Hello! I am a mocked AI response.';

        // Intercept the Groq API call
        cy.intercept('POST', 'https://api.groq.com/openai/v1/chat/completions', {
            statusCode: 200,
            body: {
                choices: [
                    {
                        message: {
                            content: aiResponse,
                            role: 'assistant',
                        },
                    },
                ],
            },
        }).as('groqChat');

        // Type and send message
        cy.get('input[placeholder="E.g., Test the users API..."]').type(`${userMessage}{enter}`);

        // Verify user message appears immediately
        cy.contains(userMessage).should('be.visible');

        // Wait for the API call
        cy.wait('@groqChat');

        // Verify AI response appears
        cy.contains(aiResponse).should('be.visible');
    });

    it('should handle tool calls correctly', () => {
        const userMessage = 'Update request to POST';
        const toolCallId = 'call_123';

        // 1. Intercept first call: Returns a tool call
        cy.intercept('POST', 'https://api.groq.com/openai/v1/chat/completions', (req) => {
            // Check if this is the initial request (history has user message at end)
            const messages = req.body.messages;
            const lastMessage = messages[messages.length - 1];

            if (lastMessage.role === 'user' && lastMessage.content === userMessage) {
                req.reply({
                    statusCode: 200,
                    body: {
                        choices: [
                            {
                                message: {
                                    content: null,
                                    role: 'assistant',
                                    tool_calls: [
                                        {
                                            id: toolCallId,
                                            type: 'function',
                                            function: {
                                                name: 'update_request',
                                                arguments: JSON.stringify({ method: 'POST' }),
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                });
            } else {
                // 2. Intercept second call: Returns final response after tool output
                req.reply({
                    statusCode: 200,
                    body: {
                        choices: [
                            {
                                message: {
                                    content: 'I have updated the request method to POST.',
                                    role: 'assistant',
                                },
                            },
                        ],
                    },
                });
            }
        }).as('groqChat');

        // Send the message
        cy.get('input[placeholder="E.g., Test the users API..."]').type(`${userMessage}{enter}`);

        // Wait for first call (tool trigger)
        cy.wait('@groqChat');

        // Verify system message for tool action
        cy.contains('AI action: Updating request configuration...').should('be.visible');

        // Wait for second call (sending tool output)
        cy.wait('@groqChat');

        // Verify final confirmation
        cy.contains('I have updated the request method to POST.').should('be.visible');
    });
});
