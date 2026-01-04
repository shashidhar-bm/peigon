import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { RequestBuilder } from '../request/RequestBuilder';
import { ResponseViewer } from '../response/ResponseViewer';
import { Resizer } from '../common';

const MainContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundLight};
`;

const SplitPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const RequestSection = styled.div<{ height?: string, flex?: number }>`
  ${({ height, flex }) => height ? `height: ${height};` : `flex: ${flex || 1};`}
  min-height: 100px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ResponseSection = styled.div<{ height?: string, flex?: number }>`
  ${({ height, flex }) => height ? `height: ${height};` : `flex: ${flex || 1};`}
  min-height: 100px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MainPanel: React.FC = () => {
  const [requestHeight, setRequestHeight] = useState<number | null>(null);

  const handleResize = useCallback((delta: number) => {
    setRequestHeight(prev => {
      // If we haven't resized yet, start from approx 50%
      const currentHeight = prev ?? (window.innerHeight - 100) / 2;
      const newHeight = currentHeight + delta;
      return Math.max(100, newHeight); // Minimum 100px
    });
  }, []);

  return (
    <MainContainer>
      <SplitPanel>
        <RequestSection height={requestHeight ? `${requestHeight}px` : undefined} data-testid="request-section">
          <RequestBuilder />
        </RequestSection>
        <Resizer direction="vertical" onResize={handleResize} />
        <ResponseSection flex={1} data-testid="response-section">
          <ResponseViewer />
        </ResponseSection>
      </SplitPanel>
    </MainContainer>
  );
};

