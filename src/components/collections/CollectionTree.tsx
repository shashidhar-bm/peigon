import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useCollectionContext, useRequestContext } from '../../contexts';
import { Collection } from '../../types';
import { CollectionItem } from './CollectionItem';
import { Modal, Input, Button } from '../common';

const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.sidebarText};
  font-size: ${theme.fontSizes.sm};
`;

export const CollectionTree: React.FC = () => {
  const { collections, deleteCollection, updateCollection } = useCollectionContext();
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

