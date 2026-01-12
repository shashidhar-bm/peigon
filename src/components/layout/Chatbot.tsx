import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Button, Input } from '../common';
import { getGroqCompletion, AppContext } from '../../services';
import { useRequestContext } from '../../contexts';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs};
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 85%;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, $isUser }) => ($isUser ? theme.colors.primary : theme.colors.sidebarActive)};
  color: ${({ theme, $isUser }) => ($isUser ? theme.colors.textWhite : theme.colors.textPrimary)};
  border-radius: ${({ $isUser }) => ($isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px')};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  p {
    margin: 0;
  }

  code {
    background: ${({ theme, $isUser }) => ($isUser ? 'rgba(0,0,0,0.1)' : theme.colors.backgroundDark)};
    padding: 2px 4px;
    border-radius: 4px;
    font-family: ${({ theme }) => theme.fonts.mono};
  }

  pre {
    background: ${({ theme, $isUser }) => ($isUser ? 'rgba(0,0,0,0.1)' : theme.colors.backgroundDark)};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: 4px;
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing.xs} 0;
    
    code {
      background: transparent;
      padding: 0;
    }
  }

  ul, ol {
    margin: ${({ theme }) => theme.spacing.xs} 0;
    padding-left: ${({ theme }) => theme.spacing.lg};
  }
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-style: italic;
`;

const InputContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.sidebarBg};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const WelcomeMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

export const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm Peigen AI. I'm now powered by Groq. How can I help you today?",
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const { currentRequest, response } = useRequestContext();

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const currentInput = inputValue;
        const userMessage: Message = {
            id: Date.now().toString(),
            text: currentInput,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const history = messages.map((msg) => ({
                role: msg.isUser ? ('user' as const) : ('assistant' as const),
                content: msg.text,
            }));

            const context: AppContext = {
                currentRequest,
                response
            };

            const aiResponse = await getGroqCompletion(currentInput, history, context);

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: aiResponse,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I encountered an error while processing your request. Please check your API key and try again.",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <ChatContainer>
            <MessageList>
                {messages.length === 0 ? (
                    <WelcomeMessage>Start a conversation...</WelcomeMessage>
                ) : (
                    messages.map((msg) => (
                        <MessageBubble key={msg.id} $isUser={msg.isUser}>
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </MessageBubble>
                    ))
                )}
                {isLoading && <TypingIndicator>Peigen AI is thinking...</TypingIndicator>}
                <div ref={messageEndRef} />
            </MessageList>
            <InputContainer>
                <Input
                    placeholder="Ask something..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    fullWidth
                    disabled={isLoading}
                />
                <Button
                    variant="primary"
                    size="small"
                    onClick={handleSend}
                    style={{ minWidth: '60px' }}
                    disabled={isLoading}
                >
                    {isLoading ? '...' : 'Send'}
                </Button>
            </InputContainer>
        </ChatContainer>
    );
};
