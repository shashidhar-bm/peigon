import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useRequestContext } from '../../contexts';
import { Tabs } from '../common';
import { StatusBar } from './StatusBar';
import { BodyView } from './BodyView';
import { HeadersView } from './HeadersView';

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${theme.colors.background};
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSizes.lg};
  background: ${theme.colors.backgroundLight};
`;

const TabsContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const ResponseViewer: React.FC = () => {
  const { response, error, isLoading } = useRequestContext();

  if (isLoading) {
    return (
      <ViewerContainer>
        <EmptyState>Sending request...</EmptyState>
      </ViewerContainer>
    );
  }

  if (error) {
    return (
      <ViewerContainer>
        <EmptyState style={{ color: theme.colors.error }}>
          Error: {error.message}
        </EmptyState>
      </ViewerContainer>
    );
  }

  if (!response) {
    return (
      <ViewerContainer>
        <EmptyState>Send a request to see the response</EmptyState>
      </ViewerContainer>
    );
  }

  const tabs = [
    {
      id: 'body',
      label: 'Body',
      content: <BodyView response={response} />,
    },
    {
      id: 'headers',
      label: `Headers (${Object.keys(response.headers).length})`,
      content: <HeadersView headers={response.headers} />,
    },
  ];

  return (
    <ViewerContainer>
      <StatusBar response={response} />
      <TabsContainer>
        <Tabs tabs={tabs} defaultActiveTab="body" />
      </TabsContainer>
    </ViewerContainer>
  );
};

