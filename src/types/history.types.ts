import { ApiRequest } from './request.types';
import { ApiResponse } from './response.types';

export interface HistoryEntry {
  id: string;
  request: ApiRequest;
  response?: ApiResponse;
  timestamp: string;
}

