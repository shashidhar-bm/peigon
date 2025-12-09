import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useRequestContext, useEnvironmentContext, useHistoryContext } from '../../contexts';
import { Button, Tabs } from '../common';
import { MethodSelector } from './MethodSelector';
import { URLInput } from './URLInput';
import { ParamsTab } from './ParamsTab';
import { HeadersTab } from './HeadersTab';
import { BodyTab } from './BodyTab';
import { AuthTab } from './AuthTab';

const BuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${theme.colors.background};
`;

const RequestLine = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};
  align-items: center;
`;

const TabsContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const RequestBuilder: React.FC = () => {
  const { currentRequest, updateRequest, sendRequest, isLoading } = useRequestContext();
  const { activeVariables } = useEnvironmentContext();
  const { addToHistory } = useHistoryContext();

  const handleSend = async () => {
    try {
      await sendRequest(activeVariables);
      // Add to history after successful request
      addToHistory(currentRequest);
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const tabs = [
    {
      id: 'params',
      label: 'Params',
      content: <ParamsTab />,
    },
    {
      id: 'headers',
      label: 'Headers',
      content: <HeadersTab />,
    },
    {
      id: 'body',
      label: 'Body',
      content: <BodyTab />,
    },
    {
      id: 'auth',
      label: 'Authorization',
      content: <AuthTab />,
    },
  ];

  return (
    <BuilderContainer>
      <RequestLine>
        <MethodSelector
          value={currentRequest.method}
          onChange={(method) => updateRequest({ method })}
        />
        <URLInput
          value={currentRequest.url}
          onChange={(url) => updateRequest({ url })}
          onSubmit={handleSend}
        />
        <Button
          variant="primary"
          onClick={handleSend}
          isLoading={isLoading}
          disabled={!currentRequest.url}
        >
          Send
        </Button>
      </RequestLine>

      <TabsContainer>
        <Tabs tabs={tabs} defaultActiveTab="params" />
      </TabsContainer>
    </BuilderContainer>
  );
};

