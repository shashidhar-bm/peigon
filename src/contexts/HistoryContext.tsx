import React, { createContext, useContext, ReactNode } from 'react';
import { HistoryEntry, ApiRequest, ApiResponse } from '../types';
import { useHistory } from '../hooks';

interface HistoryContextType {
  history: HistoryEntry[];
  addToHistory: (request: ApiRequest, response?: ApiResponse) => void;
  deleteEntry: (id: string) => boolean;
  clearHistory: () => void;
  searchHistory: (query: string) => HistoryEntry[];
  refreshHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistoryContext must be used within HistoryProvider');
  }
  return context;
};

interface HistoryProviderProps {
  children: ReactNode;
}

export const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {
  const historyHook = useHistory();

  return (
    <HistoryContext.Provider value={historyHook}>
      {children}
    </HistoryContext.Provider>
  );
};

