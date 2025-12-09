import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { API_CONSTANTS } from '../../constants';
import { useEnvironmentContext } from '../../contexts';
import { Select } from '../common';

const HeaderContainer = styled.header`
  height: 60px;
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.lg};
  flex-shrink: 0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const LogoText = styled.h1`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.primary};
  margin: 0;
`;

const Version = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  background: ${theme.colors.backgroundDark};
  padding: 2px 8px;
  border-radius: ${theme.borderRadius.sm};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const EnvironmentSelector = styled.div`
  min-width: 200px;
`;

export const Header: React.FC = () => {
  const { environments, currentEnvironment, setCurrentEnvironment } = useEnvironmentContext();

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
      </Actions>
    </HeaderContainer>
  );
};

