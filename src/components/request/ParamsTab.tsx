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

export const ParamsTab: React.FC = () => {
  const { currentRequest, updateRequest } = useRequestContext();

  const handleAddParam = () => {
    const newParams = [...currentRequest.params, createEmptyKeyValuePair()];
    updateRequest({ params: newParams });
  };

  const handleUpdateParam = (index: number, updates: Partial<KeyValuePair>) => {
    const newParams = [...currentRequest.params];
    newParams[index] = { ...newParams[index], ...updates };
    updateRequest({ params: newParams });
  };

  const handleDeleteParam = (index: number) => {
    const newParams = currentRequest.params.filter((_, i) => i !== index);
    updateRequest({ params: newParams });
  };

  return (
    <TabContainer>
      <Table>
        {currentRequest.params.map((param, index) => (
          <Row key={param.id}>
            <Checkbox
              checked={param.enabled}
              onChange={(e) => handleUpdateParam(index, { enabled: e.target.checked })}
            />
            <Input
              placeholder="Key"
              value={param.key}
              onChange={(e) => handleUpdateParam(index, { key: e.target.value })}
            />
            <Input
              placeholder="Value"
              value={param.value}
              onChange={(e) => handleUpdateParam(index, { value: e.target.value })}
            />
            <DeleteButton onClick={() => handleDeleteParam(index)}>×</DeleteButton>
          </Row>
        ))}
      </Table>
      <AddButton variant="ghost" size="small" onClick={handleAddParam}>
        + Add Parameter
      </AddButton>
    </TabContainer>
  );
};

