import React, { useState } from 'react';
import styled from 'styled-components';
import { ApiResponse, BodyViewMode } from '../../types';
import { formatJson, copyToClipboard } from '../../utils';
import { Button } from '../common';

interface BodyViewProps {
  response: ApiResponse;
}

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const Toolbar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundLight};
`;

const ContentArea = styled.div`
  flex: 1;
  overflow: auto;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
`;

const CodeBlock = styled.pre`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const BodyView: React.FC<BodyViewProps> = ({ response }) => {
  const [viewMode, setViewMode] = useState<BodyViewMode>('pretty');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    const content = typeof response.data === 'string'
      ? response.data
      : formatJson(response.data);

    const success = await copyToClipboard(content);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const renderContent = () => {
    if (!response.data) {
      return <EmptyState>No response body</EmptyState>;
    }

    if (typeof response.data === 'string') {
      return <CodeBlock>{response.data}</CodeBlock>;
    }

    switch (viewMode) {
      case 'pretty':
        return <CodeBlock>{formatJson(response.data)}</CodeBlock>;
      case 'raw':
        return <CodeBlock>{JSON.stringify(response.data)}</CodeBlock>;
      case 'preview':
        return <CodeBlock>{formatJson(response.data)}</CodeBlock>;
      default:
        return <CodeBlock>{formatJson(response.data)}</CodeBlock>;
    }
  };

  return (
    <ViewContainer>
      <Toolbar>
        <Button
          size="small"
          variant={viewMode === 'pretty' ? 'primary' : 'ghost'}
          onClick={() => setViewMode('pretty')}
        >
          Pretty
        </Button>
        <Button
          size="small"
          variant={viewMode === 'raw' ? 'primary' : 'ghost'}
          onClick={() => setViewMode('raw')}
        >
          Raw
        </Button>
        <div style={{ flex: 1 }} />
        <Button size="small" variant="secondary" onClick={handleCopy}>
          {copySuccess ? 'Copied!' : 'Copy'}
        </Button>
      </Toolbar>
      <ContentArea>{renderContent()}</ContentArea>
    </ViewContainer>
  );
};

