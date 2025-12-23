import { storageService } from '../../../src/services/storageService';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should retrieve stored value', () => {
      const testData = { foo: 'bar' };
      (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(testData));

      const result = storageService.get('test-key');
      expect(result).toEqual(testData);
    });

    it('should return default value when key not found', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      const result = storageService.get('test-key', { default: 'value' });
      expect(result).toEqual({ default: 'value' });
    });
  });

  describe('set', () => {
    it('should store value', () => {
      const testData = { foo: 'bar' };
      storageService.set('test-key', testData);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'peigen_data_test-key',
        JSON.stringify(testData)
      );
    });
  });

  describe('remove', () => {
    it('should remove value', () => {
      storageService.remove('test-key');

      expect(localStorage.removeItem).toHaveBeenCalledWith('peigen_data_test-key');
    });
  });

  describe('has', () => {
    it('should check if key exists', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue('value');

      expect(storageService.has('test-key')).toBe(true);
    });

    it('should return false when key does not exist', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      expect(storageService.has('test-key')).toBe(false);
    });
  });
});

