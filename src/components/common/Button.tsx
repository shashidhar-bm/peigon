import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-family: ${theme.fonts.primary};
  font-weight: 500;
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  outline: none;
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.fontSizes.sm};
          height: 28px;
        `;
      case 'large':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.lg};
          height: 44px;
        `;
      default:
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.md};
          height: 36px;
        `;
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.textWhite};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryHover};
          }
        `;
      case 'danger':
        return css`
          background: ${theme.colors.error};
          color: ${theme.colors.textWhite};
          
          &:hover:not(:disabled) {
            background: #E03535;
          }
        `;
      case 'success':
        return css`
          background: ${theme.colors.success};
          color: ${theme.colors.textWhite};
          
          &:hover:not(:disabled) {
            background: #3BB880;
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.textPrimary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.backgroundDark};
          }
        `;
      default:
        return css`
          background: ${theme.colors.backgroundDark};
          color: ${theme.colors.textPrimary};
          border: 1px solid ${theme.colors.border};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.backgroundLight};
            border-color: ${theme.colors.borderDark};
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  disabled,
  ...props 
}) => {
  return (
    <StyledButton disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </StyledButton>
  );
};

