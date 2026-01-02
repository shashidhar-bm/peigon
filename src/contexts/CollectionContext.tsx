import React, { createContext, useContext, ReactNode } from 'react';
import { Collection, ApiRequest, CollectionExport } from '../types';
import { useCollections } from '../hooks';

interface CollectionContextType {
  collections: Collection[];
  createCollection: (name: string, description?: string) => Collection;
  updateCollection: (id: string, updates: Partial<Collection>) => Collection | null;
  deleteCollection: (id: string) => boolean;
  addRequest: (collectionId: string, request: ApiRequest) => boolean;
  updateRequest: (collectionId: string, requestId: string, updates: Partial<ApiRequest>) => boolean;
  removeRequest: (collectionId: string, requestId: string) => boolean;
  exportCollection: (id: string) => CollectionExport | null;
  importCollection: (exportData: CollectionExport) => Collection | null;
  refreshCollections: () => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const useCollectionContext = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollectionContext must be used within CollectionProvider');
  }
  return context;
};

interface CollectionProviderProps {
  children: ReactNode;
}

export const CollectionProvider: React.FC<CollectionProviderProps> = ({ children }) => {
  const collectionHook = useCollections();

  return (
    <CollectionContext.Provider value={collectionHook}>
      {children}
    </CollectionContext.Provider>
  );
};

