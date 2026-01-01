import React from 'react';
import styled from 'styled-components';
import { API_CONSTANTS } from '../../constants';
import { useEnvironmentContext, useThemeContext } from '../../contexts';
import { Select } from '../common';

const HeaderContainer = styled.header`
  height: 60px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LogoText = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const Version = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.backgroundDark};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const EnvironmentSelector = styled.div`
  min-width: 200px;
`;

const ThemeToggleButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.backgroundDark};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  font-size: 20px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
    border-color: ${({ theme }) => theme.colors.borderDark};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const Header: React.FC = () => {
  const { environments, currentEnvironment, setCurrentEnvironment } = useEnvironmentContext();
  const { mode, toggleTheme } = useThemeContext();

  const environmentOptions = [
    { value: '', label: 'No Environment' },
    ...environments.map(env => ({ value: env.id, label: env.name })),
  ];

  return (
    <HeaderContainer>
      <Logo>
        <LogoText>{API_CONSTANTS.APP_NAME}</LogoText>
        <Version>v{API_CONSTANTS.APP_VERSION}</Version>
      </Logo>
      <Actions>
        <EnvironmentSelector>
          <Select
            value={currentEnvironment?.id || ''}
            onChange={(e) => setCurrentEnvironment(e.target.value || null)}
            options={environmentOptions}
          />
        </EnvironmentSelector>
        <ThemeToggleButton
          onClick={toggleTheme}
          title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {mode === 'light' ? '🌙' : '☀️'}
        </ThemeToggleButton>
      </Actions>
    </HeaderContainer>
  );
};


