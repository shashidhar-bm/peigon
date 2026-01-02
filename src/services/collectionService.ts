import { Collection, CollectionFolder, ApiRequest, CollectionExport } from '../types';
import { generateId } from '../utils';
import { storageService } from './storageService';
import { STORAGE_KEYS, API_CONSTANTS } from '../constants';

class CollectionService {
  getCollections(): Collection[] {
    return storageService.get<Collection[]>(STORAGE_KEYS.COLLECTIONS, []) || [];
  }

  getCollection(id: string): Collection | null {
    const collections = this.getCollections();
    return collections.find(c => c.id === id) || null;
  }

  createCollection(name: string, description?: string): Collection {
    const collections = this.getCollections();
    const now = new Date().toISOString();

    const newCollection: Collection = {
      id: generateId(),
      name,
      description,
      requests: [],
      folders: [],
      createdAt: now,
      updatedAt: now,
    };

    collections.push(newCollection);
    storageService.set(STORAGE_KEYS.COLLECTIONS, collections);

    return newCollection;
  }

  updateCollection(id: string, updates: Partial<Collection>): Collection | null {
    const collections = this.getCollections();
    const index = collections.findIndex(c => c.id === id);

    if (index === -1) return null;

    collections[index] = {
      ...collections[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    storageService.set(STORAGE_KEYS.COLLECTIONS, collections);
    return collections[index];
  }

  deleteCollection(id: string): boolean {
    const collections = this.getCollections();
    const filtered = collections.filter(c => c.id !== id);

    if (filtered.length === collections.length) return false;

    storageService.set(STORAGE_KEYS.COLLECTIONS, filtered);
    return true;
  }

  addRequestToCollection(collectionId: string, request: ApiRequest): boolean {
    const collection = this.getCollection(collectionId);
    if (!collection) return false;

    request.collectionId = collectionId;
    collection.requests.push(request);

    this.updateCollection(collectionId, { requests: collection.requests });
    return true;
  }

  updateRequestInCollection(collectionId: string, requestId: string, updates: Partial<ApiRequest>): boolean {
    const collection = this.getCollection(collectionId);
    if (!collection) return false;

    const requestIndex = collection.requests.findIndex(r => r.id === requestId);
    if (requestIndex === -1) return false;

    collection.requests[requestIndex] = {
      ...collection.requests[requestIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.updateCollection(collectionId, { requests: collection.requests });
    return true;
  }

  removeRequestFromCollection(collectionId: string, requestId: string): boolean {
    const collection = this.getCollection(collectionId);
    if (!collection) return false;

    const filtered = collection.requests.filter(r => r.id !== requestId);
    if (filtered.length === collection.requests.length) return false;

    this.updateCollection(collectionId, { requests: filtered });
    return true;
  }

  createFolder(collectionId: string, name: string, parentId?: string): CollectionFolder | null {
    const collection = this.getCollection(collectionId);
    if (!collection) return null;

    const newFolder: CollectionFolder = {
      id: generateId(),
      name,
      requestIds: [],
      parentId,
    };

    collection.folders.push(newFolder);
    this.updateCollection(collectionId, { folders: collection.folders });

    return newFolder;
  }

  exportCollection(id: string): CollectionExport | null {
    const collection = this.getCollection(id);
    if (!collection) return null;

    return {
      version: API_CONSTANTS.APP_VERSION,
      collection,
      exportedAt: new Date().toISOString(),
    };
  }

  importCollection(exportData: CollectionExport): Collection | null {
    try {
      const collection = exportData.collection;
      
      // Generate new IDs to avoid conflicts
      const importedCollection: Collection = {
        ...collection,
        id: generateId(),
        name: collection.name.includes('(Imported)') ? collection.name : `${collection.name} (Imported)`,
        createdAt: collection.createdAt || new Date().toISOString(),
        updatedAt: collection.updatedAt || new Date().toISOString(),
        folders: collection.folders || [],
        requests: collection.requests || [],
        description: collection.description,
      };

      const collections = this.getCollections();
      collections.push(importedCollection);
      storageService.set(STORAGE_KEYS.COLLECTIONS, collections);

      return importedCollection;
    } catch (error) {
      console.error('Error importing collection:', error);
      return null;
    }
  }
}

export const collectionService = new CollectionService();

