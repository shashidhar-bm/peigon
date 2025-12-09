import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ApiRequest, ApiResponse, ResponseError } from '../types';
import { createEmptyRequest } from '../utils';
import { useApiRequest } from '../hooks';

interface RequestContextType {
  currentRequest: ApiRequest;
  response: ApiResponse | null;
  error: ResponseError | null;
  isLoading: boolean;
  setCurrentRequest: (request: ApiRequest) => void;
  updateRequest: (updates: Partial<ApiRequest>) => void;
  sendRequest: (variables?: Record<string, string>) => Promise<void>;
  clearResponse: () => void;
  resetRequest: () => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const useRequestContext = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequestContext must be used within RequestProvider');
  }
  return context;
};

interface RequestProviderProps {
  children: ReactNode;
}

export const RequestProvider: React.FC<RequestProviderProps> = ({ children }) => {
  const [currentRequest, setCurrentRequestState] = useState<ApiRequest>(createEmptyRequest());
  const { response, error, isLoading, sendRequest: sendApiRequest, clearResponse } = useApiRequest();

  const setCurrentRequest = useCallback((request: ApiRequest) => {
    setCurrentRequestState(request);
    clearResponse();
  }, [clearResponse]);

  const updateRequest = useCallback((updates: Partial<ApiRequest>) => {
    setCurrentRequestState(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const sendRequest = useCallback(async (variables: Record<string, string> = {}) => {
    await sendApiRequest(currentRequest, variables);
  }, [currentRequest, sendApiRequest]);

  const resetRequest = useCallback(() => {
    setCurrentRequestState(createEmptyRequest());
    clearResponse();
  }, [clearResponse]);

  return (
    <RequestContext.Provider
      value={{
        currentRequest,
        response,
        error,
        isLoading,
        setCurrentRequest,
        updateRequest,
        sendRequest,
        clearResponse,
        resetRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

