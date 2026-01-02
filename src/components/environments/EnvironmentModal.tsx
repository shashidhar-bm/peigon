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
}

export const EnvironmentModal: React.FC<EnvironmentModalProps> = ({
    isOpen,
    onClose,
    editingEnvironment,
}) => {
    const { createEnvironment, updateEnvironment, setCurrentEnvironment, environments } = useEnvironmentContext();
    const [name, setName] = useState('');
    const [variables, setVariables] = useState<EnvironmentVariable[]>([]);

    useEffect(() => {
        if (editingEnvironment && isOpen) {
            // Reload environment data in case it was updated
            const freshEnv = environments.find(env => env.id === editingEnvironment.id) || editingEnvironment;
            setName(freshEnv.name);
            setVariables(freshEnv.variables ? [...freshEnv.variables] : []);
        } else if (!editingEnvironment && isOpen) {
            setName('');
            setVariables([]);
        }
    }, [editingEnvironment, isOpen, environments]);

    const handleSave = () => {
        if (!name.trim()) return;

        if (editingEnvironment) {
            updateEnvironment(editingEnvironment.id, { name, variables });
            onClose();
            return;
        }

        const newEnv = createEnvironment(name);
        if (variables.length > 0) {
            updateEnvironment(newEnv.id, { variables });
        }

        // auto-select newly created environment for immediate use
        setCurrentEnvironment(newEnv.id);
        onClose();
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
                    data-testid="env-name-input"
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
                                data-testid={`variable-key-${variable.id}`}
                                placeholder="Key"
                                value={variable.key}
                                onChange={(e) => handleVariableChange(variable.id, 'key', e.target.value)}
                            />
                            <Input
                                data-testid={`variable-value-${variable.id}`}
                                placeholder="Value"
                                value={variable.value}
                                onChange={(e) => handleVariableChange(variable.id, 'value', e.target.value)}
                            />
                            <Button variant="danger" size="small" onClick={() => handleDeleteVariable(variable.id)}>X</Button>
                        </VariableRow>
                    ))}
                </VariablesList>

                <Button data-testid="add-variable-btn" variant="secondary" size="small" onClick={handleAddVariable}>
                    + Add Variable
                </Button>
            </ModalContent>
        </Modal>
    );
};
