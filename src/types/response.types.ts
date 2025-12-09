export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  responseTime: number;
  responseSize: number;
  timestamp: string;
}

export interface ResponseError {
  message: string;
  code?: string;
  status?: number;
  timestamp: string;
}

export type ResponseTab = 'body' | 'headers' | 'cookies';

export type BodyViewMode = 'pretty' | 'raw' | 'preview';

