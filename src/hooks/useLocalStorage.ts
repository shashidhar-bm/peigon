import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storageService.get<T>(key, initialValue) || initialValue;
  });

  const setValue = useCallback((value: T) => {
    setStoredValue(value);
    storageService.set(key, value);
  }, [key]);

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    storageService.remove(key);
  }, [key, initialValue]);

  // Listen to storage events from other tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `postman_clone_data_${key}`) {
        if (event.newValue) {
          try {
            setStoredValue(JSON.parse(event.newValue));
          } catch (error) {
            console.error('Error parsing storage value:', error);
          }
        } else {
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

