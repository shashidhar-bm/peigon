import { useState, useCallback } from 'react';
import { ApiRequest, ApiResponse, ResponseError } from '../types';
import { apiService } from '../services';

interface UseApiRequestResult {
  response: ApiResponse | null;
  error: ResponseError | null;
  isLoading: boolean;
  sendRequest: (request: ApiRequest, variables?: Record<string, string>) => Promise<ApiResponse>;
  clearResponse: () => void;
  setResponse: (response: ApiResponse) => void;
}

export function useApiRequest(): UseApiRequestResult {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<ResponseError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (request: ApiRequest, variables: Record<string, string> = {}) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await apiService.sendRequest(request, variables);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err as ResponseError);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResponse = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  return {
    response,
    error,
    isLoading,
    sendRequest,
    clearResponse,
    setResponse,
  };
}

