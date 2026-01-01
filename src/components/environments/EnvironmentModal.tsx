import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useEnvironmentContext } from '../../contexts';
import { Button, Input, Modal } from '../common';
import { Environment, EnvironmentVariable } from '../../types';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const VariablesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  max-height: 400px;
  overflow-y: auto;
`;

const VariableRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

interface EnvironmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingEnvironment?: Environment | null;
    onCreated?: (env: Environment) => void;
}

export const EnvironmentModal: React.FC<EnvironmentModalProps> = ({
    isOpen,
    onClose,
    editingEnvironment,
    onCreated
}) => {
    const { createEnvironment, updateEnvironment } = useEnvironmentContext();
    const [name, setName] = useState('');
    const [variables, setVariables] = useState<EnvironmentVariable[]>([]);

    useEffect(() => {
        if (editingEnvironment) {
            setName(editingEnvironment.name);
            setVariables(editingEnvironment.variables ? [...editingEnvironment.variables] : []);
        } else {
            setName('');
            setVariables([]);
        }
    }, [editingEnvironment, isOpen]);

    const handleSave = () => {
        if (!name.trim()) return;

        if (editingEnvironment) {
            updateEnvironment(editingEnvironment.id, { name, variables });
            onClose();
        } else {
            const newEnv = createEnvironment(name);
            if (variables.length > 0) {
                updateEnvironment(newEnv.id, { variables });
            }

            if (onCreated) {
                onCreated(newEnv);
                // Do not close, switch to edit mode via parent state update
            } else {
                onClose();
            }
        }
    };

    const handleAddVariable = () => {
        const newVar: EnvironmentVariable = {
            id: Date.now().toString() + Math.random().toString().slice(2),
            key: '',
            value: '',
            enabled: true,
            type: 'default'
        };
        setVariables([...variables, newVar]);
    };

    const handleVariableChange = (id: string, field: keyof EnvironmentVariable, value: any) => {
        // Note: value type any to support boolean 'enabled' if we add checkbox later
        const newVars = variables.map(v => v.id === id ? { ...v, [field]: value } : v);
        setVariables(newVars);
    };

    const handleDeleteVariable = (id: string) => {
        const newVars = variables.filter(v => v.id !== id);
        setVariables(newVars);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editingEnvironment ? "Edit Environment" : "New Environment"}
            size="medium"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>
                        {editingEnvironment ? "Save" : "Create"}
                    </Button>
                </>
            }
        >
            <ModalContent>
                <Input
                    label="Environment Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Development"
                    fullWidth
                    autoFocus={!editingEnvironment}
                />

                <SectionTitle>Variables</SectionTitle>
                <VariablesList>
                    {variables.map((variable) => (
                        <VariableRow key={variable.id}>
                            <Input
                                placeholder="Key"
                                value={variable.key}
                                onChange={(e) => handleVariableChange(variable.id, 'key', e.target.value)}
                            />
                            <Input
                                placeholder="Value"
                                value={variable.value}
                                onChange={(e) => handleVariableChange(variable.id, 'value', e.target.value)}
                            />
                            <Button variant="danger" size="small" onClick={() => handleDeleteVariable(variable.id)}>X</Button>
                        </VariableRow>
                    ))}
                </VariablesList>

                <Button variant="secondary" size="small" onClick={handleAddVariable}>
                    + Add Variable
                </Button>
            </ModalContent>
        </Modal>
    );
};
