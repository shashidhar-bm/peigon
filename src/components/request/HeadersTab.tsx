import React from 'react';
import styled from 'styled-components';
import { useRequestContext } from '../../contexts';
import { createEmptyKeyValuePair } from '../../utils';
import { KeyValuePair } from '../../types';
import { Button } from '../common';

const TabContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  height: 100%;
  overflow: auto;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 1fr 40px;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DeleteButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const AddButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.sm};
  align-self: flex-start;
`;

export const HeadersTab: React.FC = () => {
  const { currentRequest, updateRequest } = useRequestContext();

  const handleAddHeader = () => {
    const newHeaders = [...currentRequest.headers, createEmptyKeyValuePair()];
    updateRequest({ headers: newHeaders });
  };

  const handleUpdateHeader = (index: number, updates: Partial<KeyValuePair>) => {
    const newHeaders = [...currentRequest.headers];
    newHeaders[index] = { ...newHeaders[index], ...updates };
    updateRequest({ headers: newHeaders });
  };

  const handleDeleteHeader = (index: number) => {
    const newHeaders = currentRequest.headers.filter((_, i) => i !== index);
    updateRequest({ headers: newHeaders });
  };

  return (
    <TabContainer>
      <Table>
        {currentRequest.headers.map((header, index) => (
          <Row key={header.id}>
            <Checkbox
              checked={header.enabled}
              onChange={(e) => handleUpdateHeader(index, { enabled: e.target.checked })}
            />
            <Input
              placeholder="Header"
              value={header.key}
              onChange={(e) => handleUpdateHeader(index, { key: e.target.value })}
            />
            <Input
              placeholder="Value"
              value={header.value}
              onChange={(e) => handleUpdateHeader(index, { value: e.target.value })}
            />
            <DeleteButton onClick={() => handleDeleteHeader(index)}>×</DeleteButton>
          </Row>
        ))}
      </Table>
      <AddButton variant="ghost" size="small" onClick={handleAddHeader}>
        + Add Header
      </AddButton>
    </TabContainer>
  );
};

