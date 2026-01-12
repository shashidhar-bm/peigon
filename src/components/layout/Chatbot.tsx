import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input } from '../common';
import { getGroqCompletion, AppContext } from '../../services';
import { useRequestContext } from '../../contexts';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

const MessageBubble = styled.div<{ $isUser: boolean; $isSystem?: boolean }>`
  max-width: 85%;
  align-self: ${({ $isUser, $isSystem }) => ($isSystem ? 'center' : $isUser ? 'flex-end' : 'flex-start')};
  padding: ${({ theme, $isSystem }) => ($isSystem ? '4px 12px' : `${theme.spacing.sm} ${theme.spacing.md}`)};
  background: ${({ theme, $isUser, $isSystem }) =>
        $isSystem ? 'transparent' : ($isUser ? theme.colors.primary : theme.colors.sidebarActive)};
  color: ${({ theme, $isUser, $isSystem }) =>
        $isSystem ? theme.colors.textSecondary : ($isUser ? theme.colors.textWhite : theme.colors.textPrimary)};
  border-radius: ${({ $isUser, $isSystem }) =>
        $isSystem ? '4px' : ($isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px')};
  font-size: ${({ theme, $isSystem }) => ($isSystem ? '10px' : theme.fontSizes.sm)};
  font-style: ${({ $isSystem }) => ($isSystem ? 'italic' : 'normal')};
  line-height: 1.5;
  box-shadow: ${({ theme, $isSystem }) => ($isSystem ? 'none' : theme.shadows.sm)};

  p { margin: 0; }

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
    code { background: transparent; padding: 0; }
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

const CodeBlockContainer = styled.div`
  position: relative;
  margin: ${({ theme }) => theme.spacing.sm} 0;
  border-radius: 6px;
  overflow: hidden;
  background: #1e1e1e;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CodeBlock: React.FC<{ language: string; value: string }> = ({ language, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <CodeBlockContainer>
            <CopyButton onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy'}
            </CopyButton>
            <SyntaxHighlighter
                language={language || 'text'}
                style={vscDarkPlus}
                wrapLongLines={true}
                customStyle={{
                    margin: 0,
                    padding: '16px',
                    fontSize: '12px',
                    background: 'transparent',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                }}
            >
                {value}
            </SyntaxHighlighter>
        </CodeBlockContainer>
    );
};

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    isSystem?: boolean;
    timestamp: Date;
    rawHistory?: any[]; // Store the exact history for Groq
}

export const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm Peigen AI. I'm now in **Agentic Mode**. I can help you update and test your APIs directly! What should we test first?",
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const { currentRequest, updateRequest, sendRequest, response } = useRequestContext();

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
            id: uuidv4(),
            text: currentInput,
            isUser: true,
            timestamp: new Date(),
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            // Reconstruct history from previous states
            let history: any[] = [];
            messages.forEach(m => {
                if (m.rawHistory) {
                    history = [...m.rawHistory];
                } else if (!m.isSystem) {
                    history.push({ role: m.isUser ? 'user' : 'assistant', content: m.text });
                }
            });

            history.push({ role: 'user', content: currentInput });

            let aiFinished = false;
            let currentMessages = [...updatedMessages];
            let activeAgentRequest = { ...currentRequest };

            while (!aiFinished) {
                const context: AppContext = { currentRequest: activeAgentRequest, response };
                const aiResponse = await getGroqCompletion(history, context);

                if (aiResponse.tool_calls && aiResponse.tool_calls.length > 0) {
                    history.push({
                        role: 'assistant',
                        content: aiResponse.content,
                        tool_calls: aiResponse.tool_calls
                    });

                    if (aiResponse.content) {
                        const assistantMsg: Message = {
                            id: uuidv4(),
                            text: aiResponse.content,
                            isUser: false,
                            timestamp: new Date(),
                            rawHistory: [...history]
                        };
                        currentMessages = [...currentMessages, assistantMsg];
                        setMessages(currentMessages);
                    }

                    for (const toolCall of aiResponse.tool_calls) {
                        const { name, arguments: argsString } = toolCall.function;
                        const args = JSON.parse(argsString);
                        let result = '';

                        if (name === 'update_request') {
                            const systemMsg: Message = {
                                id: uuidv4(),
                                text: `AI action: Updating request configuration...`,
                                isUser: false,
                                isSystem: true,
                                timestamp: new Date(),
                            };
                            currentMessages = [...currentMessages, systemMsg];
                            setMessages(currentMessages);

                            updateRequest(args);
                            activeAgentRequest = { ...activeAgentRequest, ...args };
                            result = 'Request updated successfully.';
                        } else if (name === 'send_active_request') {
                            const systemMsg: Message = {
                                id: uuidv4(),
                                text: `AI action: Sending API request...`,
                                isUser: false,
                                isSystem: true,
                                timestamp: new Date(),
                            };
                            currentMessages = [...currentMessages, systemMsg];
                            setMessages(currentMessages);

                            try {
                                const res = await sendRequest(undefined, activeAgentRequest);
                                result = `Request sent. Status: ${res.status} ${res.statusText}. Data: ${JSON.stringify(res.data).substring(0, 500)}...`;
                            } catch (err: any) {
                                result = `Request failed: ${err.message}`;
                            }
                        }

                        history.push({
                            role: 'tool',
                            tool_call_id: toolCall.id,
                            content: result
                        });
                    }
                } else {
                    const finalAssistantMsg: Message = {
                        id: uuidv4(),
                        text: aiResponse.content || '',
                        isUser: false,
                        timestamp: new Date(),
                        rawHistory: [...history]
                    };
                    setMessages([...currentMessages, finalAssistantMsg]);
                    aiFinished = true;
                }
            }
        } catch (error: any) {
            const errorMessage: Message = {
                id: uuidv4(),
                text: `Error: ${error.message || 'I encountered an issue. Please check your API key or connection.'}`,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <ChatContainer>
            <MessageList>
                {messages.length === 0 ? (
                    <WelcomeMessage>Start a conversation...</WelcomeMessage>
                ) : (
                    messages.map((msg) => (
                        <MessageBubble key={msg.id} $isUser={msg.isUser} $isSystem={msg.isSystem}>
                            <ReactMarkdown
                                components={{
                                    code({ _node, inline, className, children, ...props }: any) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <CodeBlock
                                                language={match[1]}
                                                value={String(children).replace(/\n$/, '')}
                                            />
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {msg.text}
                            </ReactMarkdown>
                        </MessageBubble>
                    ))
                )}
                {isLoading && <TypingIndicator>AI Agent is working...</TypingIndicator>}
                <div ref={messageEndRef} />
            </MessageList>
            <InputContainer>
                <Input
                    placeholder="E.g., Test the users API..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    fullWidth
                    disabled={isLoading}
                />
                <Button variant="primary" size="small" onClick={handleSend} disabled={isLoading} style={{ minWidth: '60px' }}>
                    {isLoading ? '...' : 'Send'}
                </Button>
            </InputContainer>
        </ChatContainer>
    );
};
