import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface URLInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const StyledInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textPrimary};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  outline: none;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.borderDark};
  }
  
  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const URLInput: React.FC<URLInputProps> = ({ value, onChange, onSubmit }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <StyledInput
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Enter request URL"
    />
  );
};

