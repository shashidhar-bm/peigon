import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Input } from '../common';

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
  gap: ${({ theme }) => theme.spacing.sm};
  padding-right: 4px;

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
  border-radius: ${({ $isUser }) =>
        $isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px'};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.4;
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
            text: "Hello! I'm Peigen AI. I can help you with your API requests. (Groq integration coming soon!)",
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const messageEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Mock response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: `You said: "${inputValue}". I'll be able to help you better once Groq is integrated!`,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        }, 1000);
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
                            {msg.text}
                        </MessageBubble>
                    ))
                )}
                <div ref={messageEndRef} />
            </MessageList>
            <InputContainer>
                <Input
                    placeholder="Ask something..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    fullWidth
                />
                <Button variant="primary" size="small" onClick={handleSend} style={{ minWidth: '60px' }}>
                    Send
                </Button>
            </InputContainer>
        </ChatContainer>
    );
};
