import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button, Modal, Input, Resizer } from '../common';
import { useCollectionContext, useHistoryContext, useRequestContext } from '../../contexts';
import { CollectionTree } from '../collections/CollectionTree';

const SidebarWrapper = styled.aside<{ width: number }>`
  width: ${({ width }) => width}px;
  display: flex; /* Row layout to put content and resizer side-by-side */
  flex-direction: row;
  flex-shrink: 0;
  position: relative;
`;

const SidebarInner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.sidebarBg};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
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

const HistoryTimestamp = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
  text-align: right;
`;

const HistoryUrl = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

// Helper to format date
const formatHistoryTime = (isoString: string) => {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      // HH:MM format
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    if (diffHours < 48) return 'Yesterday';

    return date.toLocaleDateString();
  } catch (e) {
    return '';
  }
};

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'collections' | 'history'>('collections');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  const { createCollection, importCollection } = useCollectionContext();
  const { history, clearHistory } = useHistoryContext();
  const { setCurrentRequest, setResponse, clearResponse: clearRequestResponse } = useRequestContext();

  const [width, setWidth] = useState(300);

  const handleResize = useCallback((delta: number) => {
    setWidth(prev => {
      const newWidth = prev + delta;
      return Math.min(Math.max(newWidth, 200), 600); // Clamp between 200px and 600px
    });
  }, []);

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Sidebar.tsx:126', message: 'Sidebar rendered', data: { activeTab, historyLength: history.length, isModalOpen, isImportModalOpen }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'C' }) }).catch(() => { });
  // #endregion

  const handleCreateCollection = () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Sidebar.tsx:139', message: 'handleCreateCollection called', data: { collectionName: collectionName.trim() }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
    // #endregion
    if (collectionName.trim()) {
      createCollection(collectionName);
      setCollectionName('');
      setIsModalOpen(false);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Sidebar.tsx:145', message: 'Collection created', data: { collectionName }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
      // #endregion
    }
  };

  const handleImport = () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Sidebar.tsx:156', message: 'handleImport called', data: { jsonLength: importJson.length }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
    // #endregion
    setImportError(null);

    if (!importJson.trim()) {
      setImportError('Please paste collection JSON');
      return;
    }

    try {
      const parsed = JSON.parse(importJson);
      // Handle both CollectionExport format and direct collection format (for tests)
      let exportData;
      if (parsed.collection) {
        // It's a CollectionExport format
        exportData = parsed;
      } else if (parsed.name && parsed.requests) {
        // It's a direct collection format - wrap it and ensure all required fields
        exportData = {
          version: parsed.version || '1.0',
          collection: {
            id: parsed.id || 'temp-id',
            name: parsed.name,
            description: parsed.description,
            requests: parsed.requests || [],
            folders: parsed.folders || [],
            createdAt: parsed.createdAt || new Date().toISOString(),
            updatedAt: parsed.updatedAt || new Date().toISOString(),
          },
          exportedAt: parsed.exportedAt || new Date().toISOString(),
        };
      } else {
        setImportError('Invalid collection format');
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Sidebar.tsx:170', message: 'Import validation failed', data: { hasCollection: !!parsed.collection, hasName: !!parsed.name }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
        // #endregion
        return;
      }

      const result = importCollection(exportData);
      if (result) {
        setImportJson('');
        setIsImportModalOpen(false);
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Sidebar.tsx:175', message: 'Import successful', data: { collectionName: result.name }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
        // #endregion
      } else {
        setImportError('Failed to import collection');
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Sidebar.tsx:179', message: 'Import failed', data: {}, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
        // #endregion
      }
    } catch (error) {
      setImportError('Invalid JSON format');
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Sidebar.tsx:183', message: 'Import JSON parse error', data: { error: String(error) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
      // #endregion
    }
  };

  return (
    <>
      <SidebarWrapper width={width}>
        <SidebarInner>
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
                onClick={() => {
                  // #region agent log
                  fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Sidebar.tsx:160', message: 'History tab clicked', data: { previousTab: activeTab, historyLength: history.length }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'C' }) }).catch(() => { });
                  // #endregion
                  setActiveTab('history');
                }}
                data-testid="history-tab-button"
              >
                History
              </TabButton>
            </TabButtons>

            {activeTab === 'collections' && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  variant="primary"
                  size="small"
                  style={{ flex: 1 }}
                  onClick={() => setIsModalOpen(true)}
                >
                  New Collection
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setIsImportModalOpen(true)}
                  title="Import Collection"
                >
                  Import
                </Button>
              </div>
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
                <EmptyState>No request history</EmptyState>
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <HistoryMethod $method={entry.request.method}>
                          {entry.request.method}
                        </HistoryMethod>
                        <HistoryTimestamp>{formatHistoryTime(entry.timestamp)}</HistoryTimestamp>
                      </div>
                      <HistoryUrl>{entry.request.url || 'Untitled Request'}</HistoryUrl>
                    </HistoryItem>
                  ))}
                </HistoryList>
              )
            )}
          </SidebarContent>
        </SidebarInner>
        <Resizer direction="horizontal" onResize={handleResize} />
      </SidebarWrapper>

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
            <Button variant="primary" onClick={handleCreateCollection} data-testid="create-collection-btn">
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
          data-testid="new-collection-input"
        />
      </Modal>

      {/* Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          setImportJson('');
          setImportError(null);
        }}
        title="Import Collection"
        size="medium"
        footer={
          <>
            <Button variant="secondary" onClick={() => {
              setIsImportModalOpen(false);
              setImportJson('');
              setImportError(null);
            }}>Cancel</Button>
            <Button variant="primary" onClick={handleImport}>Import</Button>
          </>
        }
      >
        <p>Paste your collection JSON here:</p>
        <textarea
          value={importJson}
          onChange={(e) => {
            setImportJson(e.target.value);
            setImportError(null);
          }}
          style={{ width: '100%', height: '200px', padding: '8px', border: '1px solid #ccc', fontFamily: 'monospace' }}
          placeholder='{ "version": "1.0", "collection": { ... } }'
        />
        {importError && (
          <p style={{ color: 'red', marginTop: '8px', fontSize: '14px' }}>{importError}</p>
        )}
      </Modal>
    </>
  );
};

