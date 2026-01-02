import React from 'react';
import styled from 'styled-components';
import { useRequestContext, useEnvironmentContext, useHistoryContext } from '../../contexts';
import { Button, Tabs } from '../common';
import { MethodSelector } from './MethodSelector';
import { URLInput } from './URLInput';
import { ParamsTab } from './ParamsTab';
import { HeadersTab } from './HeadersTab';
import { BodyTab } from './BodyTab';
import { AuthTab } from './AuthTab';
import { SaveRequestModal } from './SaveRequestModal';

const BuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
`;

const RequestLine = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
  const [isSaveModalOpen, setIsSaveModalOpen] = React.useState(false);

  const handleSend = async () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RequestBuilder.tsx:39',message:'handleSend called',data:{method:currentRequest.method,url:currentRequest.url,hasUrl:!!currentRequest.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    try {
      const response = await sendRequest(activeVariables);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RequestBuilder.tsx:42',message:'Request sent successfully',data:{status:response?.status,hasResponse:!!response},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      // Add to history after successful request
      addToHistory(currentRequest, response);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RequestBuilder.tsx:44',message:'Added to history',data:{method:currentRequest.method,url:currentRequest.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RequestBuilder.tsx:46',message:'Request failed',data:{error:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
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
        <Button
          variant="secondary"
          onClick={() => setIsSaveModalOpen(true)}
          data-testid="save-request-button"
        >
          Save
        </Button>
      </RequestLine>

      <TabsContainer>
        <Tabs tabs={tabs} defaultActiveTab="params" />
      </TabsContainer>

      <SaveRequestModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        request={currentRequest}
      />
    </BuilderContainer>
  );
};

