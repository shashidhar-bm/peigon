import React, { useState, useEffect } from 'react';
import { useCollectionContext } from '../../contexts';
import { ApiRequest } from '../../types';
import { Modal, Button, Input, Select } from '../common';

interface SaveRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: ApiRequest;
}

export const SaveRequestModal: React.FC<SaveRequestModalProps> = ({
    isOpen,
    onClose,
    request,
}) => {
    const { collections, addRequest } = useCollectionContext();
    const [name, setName] = useState(request.name || '');
    const [selectedCollectionId, setSelectedCollectionId] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName(request.name || '');
            if (collections.length > 0 && !selectedCollectionId) {
                setSelectedCollectionId(collections[0].id);
            }
        }
    }, [isOpen, request, collections, selectedCollectionId]);

    const handleSave = () => {
        if (!selectedCollectionId) return;

        const requestToSave: ApiRequest = {
            ...request,
            name: name || request.url || 'Untitled Request',
        };

        addRequest(selectedCollectionId, requestToSave);
        onClose();
    };

    const collectionOptions = collections.map((c) => ({
        value: c.id,
        label: c.name,
    }));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Save Request"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={!selectedCollectionId || collections.length === 0}
                    >
                        Save
                    </Button>
                </>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Select
                    label="Collection"
                    value={selectedCollectionId}
                    onChange={(e) => setSelectedCollectionId(e.target.value)}
                    options={
                        collections.length === 0
                            ? [{ value: '', label: 'No collections found' }]
                            : collectionOptions
                    }
                    fullWidth
                />
                <Input
                    label="Request Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter request name"
                    fullWidth
                    autoFocus
                />
            </div>
        </Modal>
    );
};
