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
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useHistory.ts:26',message:'addToHistory called',data:{method:request.method,url:request.url,hasResponse:!!response},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    historyService.addToHistory(request, response);
    refreshHistory();
    // #region agent log
    const newHistory = historyService.getHistory();
    fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useHistory.ts:29',message:'History refreshed after add',data:{historyLength:newHistory.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
  }, [refreshHistory]);

  const deleteEntry = useCallback((id: string) => {
    const result = historyService.deleteHistoryEntry(id);
    refreshHistory();
    return result;
  }, [refreshHistory]);

  const clearHistory = useCallback(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useHistory.ts:37',message:'clearHistory called',data:{historyLengthBefore:history.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    historyService.clearHistory();
    refreshHistory();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/76b1d9bd-7576-473a-9c0f-3ea06293f1d8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useHistory.ts:40',message:'History cleared',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
  }, [refreshHistory, history.length]);

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

