import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal, Input } from '../common';
import { useCollectionContext, useHistoryContext, useRequestContext } from '../../contexts';
import { CollectionTree } from '../collections/CollectionTree';

const SidebarContainer = styled.aside`
  width: 300px;
  background: ${({ theme }) => theme.colors.sidebarBg};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
`;

const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.sidebarActive};
`;

const TabButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, $isActive }) => $isActive ? theme.colors.sidebarActive : 'transparent'};
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.textWhite : theme.colors.sidebarText};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.sidebarHover};
    color: ${({ theme }) => theme.colors.textWhite};
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.sidebarText};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const HistoryItem = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.sidebarHover};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.sidebarActive};
  }
`;

const HistoryMethod = styled.span<{ $method: string }>`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.success};
`;

const HistoryUrl = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.sidebarText};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'collections' | 'history'>('collections');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('');

  const { createCollection } = useCollectionContext();
  const { history, clearHistory } = useHistoryContext();
  const { setCurrentRequest, setResponse, clearResponse: clearRequestResponse } = useRequestContext();

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

          {activeTab === 'history' && history.length > 0 && (
            <Button
              variant="secondary"
              size="small"
              fullWidth
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your request history?')) {
                  clearHistory();
                }
              }}
            >
              Clear History
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
                  <HistoryItem
                    key={entry.id}
                    onClick={() => {
                      // Restore request
                      setCurrentRequest(entry.request);

                      // Restore response if available
                      if (entry.response) {
                        setResponse(entry.response);
                      } else {
                        clearRequestResponse();
                      }
                    }}
                  >
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

