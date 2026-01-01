import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ApiResponse } from '../../types';
import { formatBytes, formatTime, getStatusColorCategory } from '../../utils';
import { COLORS } from '../../constants';
import { useComparisonContext } from '../../contexts/ComparisonContext';
import { Button, Modal, Input } from '../common';

interface StatusBarProps {
  response: ApiResponse;
}

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatusBadge = styled.div<{ $status: number }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${props => {
    const category = getStatusColorCategory(props.$status);
    return COLORS[category as keyof typeof COLORS];
  }};
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
`;

const StatValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StatusBar: React.FC<StatusBarProps> = ({ response }) => {
  const { saveCurrentResponse, toggleComparisonMode } = useComparisonContext();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [responseName, setResponseName] = useState('');

  const handleSave = () => {
    if (responseName.trim()) {
      saveCurrentResponse(responseName.trim());
      setResponseName('');
      setShowSaveModal(false);
    }
  };

  return (
    <>
      <BarContainer>
        <StatusBadge $status={response.status}>
          {response.status} {response.statusText}
        </StatusBadge>

        <Stat>
          <StatLabel>Time</StatLabel>
          <StatValue>{formatTime(response.responseTime)}</StatValue>
        </Stat>

        <Stat>
          <StatLabel>Size</StatLabel>
          <StatValue>{formatBytes(response.responseSize)}</StatValue>
        </Stat>

        <Actions>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setShowSaveModal(true)}
          >
            Save Response
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={toggleComparisonMode}
          >
            Compare
          </Button>
        </Actions>
      </BarContainer>

      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Save Response"
      >
        <SaveModalContent
          responseName={responseName}
          setResponseName={setResponseName}
          setShowSaveModal={setShowSaveModal}
          handleSave={handleSave}
        />
      </Modal>
    </>
  );
};

// Helper component to use useTheme hook inside Modal content if needed, 
// or just access theme from context if we extract this.
// Actually, for inline styles, we need the theme object.
// Let's use the useTheme hook at the top level of StatusBar.

const SaveModalContent: React.FC<any> = ({ responseName, setResponseName, setShowSaveModal, handleSave }) => {
  const theme = useTheme();
  return (
    <div style={{ padding: theme.spacing.md }}>
      <Input
        label="Response Name"
        value={responseName}
        onChange={(e) => setResponseName(e.target.value)}
        placeholder="e.g., Production User API - Jan 2024"
        fullWidth
        autoFocus
      />
      <div style={{ marginTop: theme.spacing.md, display: 'flex', gap: theme.spacing.sm, justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!responseName.trim()}>
          Save
        </Button>
      </div>
    </div>
  );
};


