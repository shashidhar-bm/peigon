import { useState, useCallback, useEffect } from 'react';
import { HistoryEntry, ApiRequest, ApiResponse } from '../types';
import { historyService } from '../services';

interface UseHistoryResult {
  history: HistoryEntry[];
  addToHistory: (request: ApiRequest, response?: ApiResponse) => void;
  deleteEntry: (id: string) => boolean;
  clearHistory: () => void;
  searchHistory: (query: string) => HistoryEntry[];
  refreshHistory: () => void;
}

export function useHistory(): UseHistoryResult {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const refreshHistory = useCallback(() => {
    const loadedHistory = historyService.getHistory();
    setHistory(loadedHistory);
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const addToHistory = useCallback((request: ApiRequest, response?: ApiResponse) => {
    historyService.addToHistory(request, response);
    refreshHistory();
  }, [refreshHistory]);

  const deleteEntry = useCallback((id: string) => {
    const result = historyService.deleteHistoryEntry(id);
    refreshHistory();
    return result;
  }, [refreshHistory]);

  const clearHistory = useCallback(() => {
    historyService.clearHistory();
    refreshHistory();
  }, [refreshHistory]);

  const searchHistory = useCallback((query: string) => {
    return historyService.searchHistory(query);
  }, []);

  return {
    history,
    addToHistory,
    deleteEntry,
    clearHistory,
    searchHistory,
    refreshHistory,
  };
}

