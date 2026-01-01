import { HistoryEntry, ApiRequest, ApiResponse } from '../types';
import { generateId } from '../utils';
import { storageService } from './storageService';
import { STORAGE_KEYS } from '../constants';

class HistoryService {
  getHistory(): HistoryEntry[] {
    return storageService.get<HistoryEntry[]>(STORAGE_KEYS.HISTORY, []) || [];
  }

  addToHistory(request: ApiRequest, response?: ApiResponse): void {
    const history = this.getHistory();

    const entry: HistoryEntry = {
      id: generateId(),
      request,
      response,
      timestamp: new Date().toISOString(),
    };

    // Add to beginning of array
    history.unshift(entry);

    // Keep only the last N entries
    const trimmedHistory = history.slice(0, 50);

    storageService.set(STORAGE_KEYS.HISTORY, trimmedHistory);
  }

  getHistoryEntry(id: string): HistoryEntry | null {
    const history = this.getHistory();
    return history.find(entry => entry.id === id) || null;
  }

  deleteHistoryEntry(id: string): boolean {
    const history = this.getHistory();
    const filtered = history.filter(entry => entry.id !== id);

    if (filtered.length === history.length) return false;

    storageService.set(STORAGE_KEYS.HISTORY, filtered);
    return true;
  }

  clearHistory(): void {
    storageService.set(STORAGE_KEYS.HISTORY, []);
  }

  searchHistory(query: string): HistoryEntry[] {
    const history = this.getHistory();

    if (!query) return history;

    const lowerQuery = query.toLowerCase();

    return history.filter(entry => {
      const { request } = entry;
      return (
        request.name.toLowerCase().includes(lowerQuery) ||
        request.url.toLowerCase().includes(lowerQuery) ||
        request.method.toLowerCase().includes(lowerQuery)
      );
    });
  }
}

export const historyService = new HistoryService();

