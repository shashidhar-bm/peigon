import React from 'react';
import styled from 'styled-components';
import { KeyValuePair } from '../../types';
import { Button, Input } from './';


interface KeyValuePairListProps {
    pairs: KeyValuePair[];
    onChange: (pairs: KeyValuePair[]) => void;
    keyPlaceholder?: string;
    valuePlaceholder?: string;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PairRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr auto;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: start;
`;

const Checkbox = styled.input`
  margin-top: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const AddButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const KeyValuePairList: React.FC<KeyValuePairListProps> = ({
    pairs,
    onChange,
    keyPlaceholder = 'Key',
    valuePlaceholder = 'Value',
}) => {
    const handleAdd = () => {
        const newPair: KeyValuePair = {
            id: crypto.randomUUID(),
            key: '',
            value: '',
            enabled: true,
        };
        onChange([...pairs, newPair]);
    };

    const handleUpdate = (id: string, updates: Partial<KeyValuePair>) => {
        onChange(
            pairs.map((pair) =>
                pair.id === id ? { ...pair, ...updates } : pair
            )
        );
    };

    const handleDelete = (id: string) => {
        onChange(pairs.filter((pair) => pair.id !== id));
    };

    return (
        <ListContainer>
            {pairs.map((pair) => (
                <PairRow key={pair.id}>
                    <Checkbox
                        type="checkbox"
                        checked={pair.enabled}
                        onChange={(e) => handleUpdate(pair.id, { enabled: e.target.checked })}
                    />
                    <Input
                        value={pair.key}
                        onChange={(e) => handleUpdate(pair.id, { key: e.target.value })}
                        placeholder={keyPlaceholder}
                        fullWidth
                    />
                    <Input
                        value={pair.value}
                        onChange={(e) => handleUpdate(pair.id, { value: e.target.value })}
                        placeholder={valuePlaceholder}
                        fullWidth
                    />
                    <DeleteButton
                        variant="secondary"
                        size="small"
                        onClick={() => handleDelete(pair.id)}
                    >
                        ×
                    </DeleteButton>
                </PairRow>
            ))}
            <AddButtonContainer>
                <Button variant="secondary" size="small" onClick={handleAdd}>
                    Add {keyPlaceholder}
                </Button>
            </AddButtonContainer>
        </ListContainer>
    );
};
