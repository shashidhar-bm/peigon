import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { RequestBuilder } from '../request/RequestBuilder';
import { ResponseViewer } from '../response/ResponseViewer';

const MainContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${theme.colors.backgroundLight};
`;

const SplitPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const RequestSection = styled.div`
  flex: 1;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ResponseSection = styled.div`
  flex: 1;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top: 1px solid ${theme.colors.border};
`;

export const MainPanel: React.FC = () => {
  return (
    <MainContainer>
      <SplitPanel>
        <RequestSection>
          <RequestBuilder />
        </RequestSection>
        <ResponseSection>
          <ResponseViewer />
        </ResponseSection>
      </SplitPanel>
    </MainContainer>
  );
};

