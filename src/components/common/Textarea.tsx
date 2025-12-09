import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextareaWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.textPrimary};
`;

const StyledTextarea = styled.textarea`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.fonts.mono};
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textPrimary};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  outline: none;
  resize: vertical;
  min-height: 100px;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.borderDark};
  }
  
  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }
  
  &:disabled {
    background: ${theme.colors.backgroundDark};
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const ErrorText = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.error};
`;

export const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  error, 
  fullWidth,
  ...props 
}) => {
  return (
    <TextareaWrapper $fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledTextarea {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </TextareaWrapper>
  );
};

