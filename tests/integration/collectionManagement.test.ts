import { collectionService } from '../../src/services/collectionService';
import { createEmptyRequest } from '../../src/utils/helpers';
import { storageService } from '../../src/services/storageService';

describe('Collection Management Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should create and retrieve collections', () => {
    const collection = collectionService.createCollection('Test Collection', 'Description');

    expect(collection.name).toBe('Test Collection');
    expect(collection.description).toBe('Description');

    const retrieved = collectionService.getCollection(collection.id);
    expect(retrieved).toEqual(collection);
  });

  it('should add request to collection', () => {
    const collection = collectionService.createCollection('API Tests');
    const request = createEmptyRequest();
    request.name = 'Get Users';
    request.url = 'https://api.example.com/users';

    const success = collectionService.addRequestToCollection(collection.id, request);
    expect(success).toBe(true);

    const updated = collectionService.getCollection(collection.id);
    expect(updated?.requests).toHaveLength(1);
    expect(updated?.requests[0].name).toBe('Get Users');
  });

  it('should update collection', () => {
    const collection = collectionService.createCollection('Original Name');
    
    const updated = collectionService.updateCollection(collection.id, {
      name: 'Updated Name',
    });

    expect(updated?.name).toBe('Updated Name');
  });

  it('should delete collection', () => {
    const collection = collectionService.createCollection('To Delete');
    
    const deleted = collectionService.deleteCollection(collection.id);
    expect(deleted).toBe(true);

    const retrieved = collectionService.getCollection(collection.id);
    expect(retrieved).toBeNull();
  });

  it('should export and import collection', () => {
    const collection = collectionService.createCollection('Export Test');
    const request = createEmptyRequest();
    request.name = 'Test Request';
    collectionService.addRequestToCollection(collection.id, request);

    const exported = collectionService.exportCollection(collection.id);
    expect(exported).toBeDefined();
    expect(exported?.collection.name).toBe('Export Test');

    if (exported) {
      const imported = collectionService.importCollection(exported);
      expect(imported).toBeDefined();
      expect(imported?.name).toContain('Imported');
      expect(imported?.requests).toHaveLength(1);
    }
  });
});

