import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useRequestContext } from '../../contexts';
import { AuthType } from '../../types';
import { Select, Input } from '../common';

const TabContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  overflow: auto;
`;

const AuthTypeSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const AuthForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 500px;
`;

export const AuthTab: React.FC = () => {
  const { currentRequest, updateRequest } = useRequestContext();
  const theme = useTheme();

  const authTypeOptions = [
    { value: 'none', label: 'No Auth' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'basic', label: 'Basic Auth' },
    { value: 'apiKey', label: 'API Key' },
  ];

  const handleAuthTypeChange = (type: AuthType) => {
    updateRequest({
      auth: { type },
    });
  };

  const renderAuthForm = () => {
    switch (currentRequest.auth.type) {
      case 'none':
        return (
          <div style={{ color: theme.colors.textMuted, textAlign: 'center', padding: theme.spacing.xl }}>
            This request does not use any authorization
          </div>
        );

      case 'bearer':
        return (
          <AuthForm>
            <Input
              label="Token"
              value={currentRequest.auth.bearer || ''}
              onChange={(e) =>
                updateRequest({
                  auth: { ...currentRequest.auth, bearer: e.target.value },
                })
              }
              placeholder="Enter bearer token"
              fullWidth
            />
          </AuthForm>
        );

      case 'basic':
        return (
          <AuthForm>
            <Input
              label="Username"
              value={currentRequest.auth.basic?.username || ''}
              onChange={(e) =>
                updateRequest({
                  auth: {
                    ...currentRequest.auth,
                    basic: {
                      username: e.target.value,
                      password: currentRequest.auth.basic?.password || '',
                    },
                  },
                })
              }
              placeholder="Enter username"
              fullWidth
            />
            <Input
              label="Password"
              type="password"
              value={currentRequest.auth.basic?.password || ''}
              onChange={(e) =>
                updateRequest({
                  auth: {
                    ...currentRequest.auth,
                    basic: {
                      username: currentRequest.auth.basic?.username || '',
                      password: e.target.value,
                    },
                  },
                })
              }
              placeholder="Enter password"
              fullWidth
            />
          </AuthForm>
        );

      case 'apiKey':
        return (
          <AuthForm>
            <Input
              label="Key"
              value={currentRequest.auth.apiKey?.key || ''}
              onChange={(e) =>
                updateRequest({
                  auth: {
                    ...currentRequest.auth,
                    apiKey: {
                      key: e.target.value,
                      value: currentRequest.auth.apiKey?.value || '',
                      addTo: currentRequest.auth.apiKey?.addTo || 'header',
                    },
                  },
                })
              }
              placeholder="Enter key name"
              fullWidth
            />
            <Input
              label="Value"
              value={currentRequest.auth.apiKey?.value || ''}
              onChange={(e) =>
                updateRequest({
                  auth: {
                    ...currentRequest.auth,
                    apiKey: {
                      key: currentRequest.auth.apiKey?.key || '',
                      value: e.target.value,
                      addTo: currentRequest.auth.apiKey?.addTo || 'header',
                    },
                  },
                })
              }
              placeholder="Enter API key"
              fullWidth
            />
            <Select
              label="Add to"
              value={currentRequest.auth.apiKey?.addTo || 'header'}
              onChange={(e) =>
                updateRequest({
                  auth: {
                    ...currentRequest.auth,
                    apiKey: {
                      key: currentRequest.auth.apiKey?.key || '',
                      value: currentRequest.auth.apiKey?.value || '',
                      addTo: e.target.value as 'header' | 'query',
                    },
                  },
                })
              }
              options={[
                { value: 'header', label: 'Header' },
                { value: 'query', label: 'Query Params' },
              ]}
              fullWidth
            />
          </AuthForm>
        );

      default:
        return null;
    }
  };

  return (
    <TabContainer>
      <AuthTypeSelector>
        <Select
          data-testid="auth-type-selector"
          value={currentRequest.auth.type}
          onChange={(e) => handleAuthTypeChange(e.target.value as AuthType)}
          options={authTypeOptions}
        />
      </AuthTypeSelector>
      {renderAuthForm()}
    </TabContainer>
  );
};

