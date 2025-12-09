import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Button, Modal, Input } from '../common';
import { useCollectionContext, useHistoryContext } from '../../contexts';
import { CollectionTree } from '../collections/CollectionTree';

const SidebarContainer = styled.aside`
  width: 300px;
  background: ${theme.colors.sidebarBg};
  border-right: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
`;

const SidebarHeader = styled.div`
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.sidebarActive};
`;

const TabButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: ${theme.spacing.sm};
  background: ${props => props.$isActive ? theme.colors.sidebarActive : 'transparent'};
  color: ${props => props.$isActive ? theme.colors.textWhite : theme.colors.sidebarText};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.sidebarHover};
    color: ${theme.colors.textWhite};
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: ${theme.spacing.md};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.sidebarText};
  font-size: ${theme.fontSizes.sm};
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const HistoryItem = styled.div`
  padding: ${theme.spacing.sm};
  background: ${theme.colors.sidebarHover};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.sidebarActive};
  }
`;

const HistoryMethod = styled.span<{ $method: string }>`
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.success};
`;

const HistoryUrl = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.sidebarText};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: ${theme.spacing.xs};
`;

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'collections' | 'history'>('collections');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  
  const { createCollection } = useCollectionContext();
  const { history } = useHistoryContext();

  const handleCreateCollection = () => {
    if (collectionName.trim()) {
      createCollection(collectionName);
      setCollectionName('');
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <SidebarContainer>
        <SidebarHeader>
          <TabButtons>
            <TabButton 
              $isActive={activeTab === 'collections'}
              onClick={() => setActiveTab('collections')}
            >
              Collections
            </TabButton>
            <TabButton 
              $isActive={activeTab === 'history'}
              onClick={() => setActiveTab('history')}
            >
              History
            </TabButton>
          </TabButtons>
          
          {activeTab === 'collections' && (
            <Button 
              variant="primary" 
              size="small" 
              fullWidth
              onClick={() => setIsModalOpen(true)}
            >
              + New Collection
            </Button>
          )}
        </SidebarHeader>

        <SidebarContent>
          {activeTab === 'collections' ? (
            <CollectionTree />
          ) : (
            history.length === 0 ? (
              <EmptyState>No request history yet</EmptyState>
            ) : (
              <HistoryList>
                {history.map(entry => (
                  <HistoryItem key={entry.id}>
                    <HistoryMethod $method={entry.request.method}>
                      {entry.request.method}
                    </HistoryMethod>
                    <HistoryUrl>{entry.request.url || 'Untitled Request'}</HistoryUrl>
                  </HistoryItem>
                ))}
              </HistoryList>
            )
          )}
        </SidebarContent>
      </SidebarContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Collection"
        size="small"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateCollection}>
              Create
            </Button>
          </>
        }
      >
        <Input
          label="Collection Name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Enter collection name"
          fullWidth
          autoFocus
        />
      </Modal>
    </>
  );
};

