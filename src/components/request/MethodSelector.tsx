import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { HttpMethod } from '../../types';
import { HTTP_METHODS, METHOD_COLORS } from '../../constants';

interface MethodSelectorProps {
  value: HttpMethod;
  onChange: (method: HttpMethod) => void;
}

const Select = styled.select<{ $method: HttpMethod }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  color: ${props => METHOD_COLORS[props.$method]};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  outline: none;
  transition: all ${theme.transitions.fast};
  min-width: 120px;
  
  &:hover {
    border-color: ${theme.colors.borderDark};
  }
  
  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }
`;

export const MethodSelector: React.FC<MethodSelectorProps> = ({ value, onChange }) => {
  return (
    <Select
      $method={value}
      value={value}
      onChange={(e) => onChange(e.target.value as HttpMethod)}
    >
      {HTTP_METHODS.map(method => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </Select>
  );
};

