import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { ApiResponse } from '../../types';
import { formatBytes, formatTime, getStatusColorCategory } from '../../utils';
import { COLORS } from '../../constants';

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

export const StatusBar: React.FC<StatusBarProps> = ({ response }) => {
  return (
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
    </BarContainer>
  );
};

