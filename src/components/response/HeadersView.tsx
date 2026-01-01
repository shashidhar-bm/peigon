import React from 'react';
import styled from 'styled-components';

interface HeadersViewProps {
  headers: Record<string, string>;
}

const ViewContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundDark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  word-break: break-all;
`;

const KeyCell = styled(Td)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  width: 30%;
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const HeadersView: React.FC<HeadersViewProps> = ({ headers }) => {
  const headerEntries = Object.entries(headers);

  if (headerEntries.length === 0) {
    return <EmptyState>No response headers</EmptyState>;
  }

  return (
    <ViewContainer>
      <Table>
        <thead>
          <tr>
            <Th>Header</Th>
            <Th>Value</Th>
          </tr>
        </thead>
        <tbody>
          {headerEntries.map(([key, value]) => (
            <tr key={key}>
              <KeyCell>{key}</KeyCell>
              <Td>{value}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ViewContainer>
  );
};

