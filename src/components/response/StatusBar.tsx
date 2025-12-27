import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
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
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.backgroundLight};
  border-bottom: 1px solid ${theme.colors.border};
`;

const StatusBadge = styled.div<{ $status: number }>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${props => {
    const category = getStatusColorCategory(props.$status);
    return COLORS[category as keyof typeof COLORS];
  }};
  color: ${theme.colors.textWhite};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StatLabel = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
`;

const StatValue = styled.span`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.textPrimary};
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
  gap: ${theme.spacing.sm};
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
      </Modal>
    </>
  );
};


