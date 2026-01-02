import { useState, useCallback, useEffect } from 'react';
import { Collection, ApiRequest, CollectionExport } from '../types';
import { collectionService } from '../services';

interface UseCollectionsResult {
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

export function useCollections(): UseCollectionsResult {
  const [collections, setCollections] = useState<Collection[]>([]);

  const refreshCollections = useCallback(() => {
    const loadedCollections = collectionService.getCollections();
    setCollections(loadedCollections);
  }, []);

  useEffect(() => {
    refreshCollections();
  }, [refreshCollections]);

  const createCollection = useCallback((name: string, description?: string) => {
    const newCollection = collectionService.createCollection(name, description);
    refreshCollections();
    return newCollection;
  }, [refreshCollections]);

  const updateCollection = useCallback((id: string, updates: Partial<Collection>) => {
    const updated = collectionService.updateCollection(id, updates);
    refreshCollections();
    return updated;
  }, [refreshCollections]);

  const deleteCollection = useCallback((id: string) => {
    const result = collectionService.deleteCollection(id);
    refreshCollections();
    return result;
  }, [refreshCollections]);

  const addRequest = useCallback((collectionId: string, request: ApiRequest) => {
    const result = collectionService.addRequestToCollection(collectionId, request);
    refreshCollections();
    return result;
  }, [refreshCollections]);

  const updateRequest = useCallback((collectionId: string, requestId: string, updates: Partial<ApiRequest>) => {
    const result = collectionService.updateRequestInCollection(collectionId, requestId, updates);
    refreshCollections();
    return result;
  }, [refreshCollections]);

  const removeRequest = useCallback((collectionId: string, requestId: string) => {
    const result = collectionService.removeRequestFromCollection(collectionId, requestId);
    refreshCollections();
    return result;
  }, [refreshCollections]);

  const exportCollection = useCallback((id: string) => {
    return collectionService.exportCollection(id);
  }, []);

  const importCollection = useCallback((exportData: CollectionExport) => {
    const result = collectionService.importCollection(exportData);
    if (result) {
      refreshCollections();
    }
    return result;
  }, [refreshCollections]);

  return {
    collections,
    createCollection,
    updateCollection,
    deleteCollection,
    addRequest,
    updateRequest,
    removeRequest,
    exportCollection,
    importCollection,
    refreshCollections,
  };
}

