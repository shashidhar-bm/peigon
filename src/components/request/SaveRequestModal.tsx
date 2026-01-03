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
            // Always select the first collection if available
            if (collections.length > 0) {
                const firstCollectionId = collections[0].id;
                setSelectedCollectionId(firstCollectionId);
            } else {
                setSelectedCollectionId('');
            }
        } else {
            // Reset when modal closes
            setName('');
            setSelectedCollectionId('');
        }
    }, [isOpen, request.name, collections.length]);

    const handleSave = () => {
        if (!selectedCollectionId) return;

        const now = new Date().toISOString();
        const requestToSave: ApiRequest = {
            ...request,
            id: request.id || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: name || request.url || 'Untitled Request',
            createdAt: request.createdAt || now,
            updatedAt: now,
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
