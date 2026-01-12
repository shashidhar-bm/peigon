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
  sendRequest: (variables?: Record<string, string>, request?: ApiRequest) => Promise<ApiResponse>;
  clearResponse: () => void;
  resetRequest: () => void;
  setResponse: (response: ApiResponse) => void;
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
  const { response, error, isLoading, sendRequest: sendApiRequest, clearResponse, setResponse } = useApiRequest();

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

  const sendRequest = useCallback(async (variables: Record<string, string> = {}, request?: ApiRequest) => {
    return await sendApiRequest(request || currentRequest, variables);
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
        setResponse,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

