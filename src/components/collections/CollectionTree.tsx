import React, { useState } from 'react';
import styled from 'styled-components';
import { useCollectionContext, useRequestContext } from '../../contexts';
import { Collection } from '../../types';
import { CollectionItem } from './CollectionItem';
import { Modal, Input, Button } from '../common';

const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.sidebarText};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const CollectionTree: React.FC = () => {
  const { collections, deleteCollection, updateCollection, exportCollection } = useCollectionContext();
  const { setCurrentRequest } = useRequestContext();
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [newName, setNewName] = useState('');

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setNewName(collection.name);
  };

  const handleSaveEdit = () => {
    if (editingCollection && newName.trim()) {
      updateCollection(editingCollection.id, { name: newName });
      setEditingCollection(null);
      setNewName('');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      deleteCollection(id);
    }
  };

  const handleRequestClick = (request: any) => {
    setCurrentRequest(request);
  };

  const handleExport = (collection: Collection) => {
    const exportData = exportCollection(collection.id);
    if (exportData) {
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${collection.name.replace(/[^a-z0-9]/gi, '_')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  if (collections.length === 0) {
    return <EmptyState>No collections yet. Create one to get started!</EmptyState>;
  }

  return (
    <>
      <TreeContainer>
        {collections.map(collection => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            onEdit={() => handleEdit(collection)}
            onDelete={() => handleDelete(collection.id)}
            onRequestClick={handleRequestClick}
            onExport={handleExport}
          />
        ))}
      </TreeContainer>

      <Modal
        isOpen={editingCollection !== null}
        onClose={() => setEditingCollection(null)}
        title="Edit Collection"
        size="small"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditingCollection(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save
            </Button>
          </>
        }
      >
        <Input
          label="Collection Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          fullWidth
          autoFocus
        />
      </Modal>
    </>
  );
};

