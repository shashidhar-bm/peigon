import React from 'react';
import styled, { css } from 'styled-components';

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
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
          font-size: ${({ theme }) => theme.fontSizes.sm};
          height: 28px;
        `;
      case 'large':
        return css`
          padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
          font-size: ${({ theme }) => theme.fontSizes.lg};
          height: 44px;
        `;
      default:
        return css`
          padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
          font-size: ${({ theme }) => theme.fontSizes.md};
          height: 36px;
        `;
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.textWhite};
          
          &:hover:not(:disabled) {
            background: ${({ theme }) => theme.colors.primaryHover};
          }
        `;
      case 'danger':
        return css`
          background: ${({ theme }) => theme.colors.error};
          color: ${({ theme }) => theme.colors.textWhite};
          
          &:hover:not(:disabled) {
            background: #E03535;
          }
        `;
      case 'success':
        return css`
          background: ${({ theme }) => theme.colors.success};
          color: ${({ theme }) => theme.colors.textWhite};
          
          &:hover:not(:disabled) {
            background: #3BB880;
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${({ theme }) => theme.colors.textPrimary};
          
          &:hover:not(:disabled) {
            background: ${({ theme }) => theme.colors.backgroundDark};
          }
        `;
      default:
        return css`
          background: ${({ theme }) => theme.colors.backgroundDark};
          color: ${({ theme }) => theme.colors.textPrimary};
          border: 1px solid ${({ theme }) => theme.colors.border};
          
          &:hover:not(:disabled) {
            background: ${({ theme }) => theme.colors.backgroundLight};
            border-color: ${({ theme }) => theme.colors.borderDark};
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
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

