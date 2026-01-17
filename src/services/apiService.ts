import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiRequest, ApiResponse, ResponseError } from '../types';
import { API_CONSTANTS } from '../constants';
import { keyValuePairsToObject, replaceVariables } from '../utils';

class ApiService {
  async sendRequest(
    request: ApiRequest,
    variables: Record<string, string> = {}
  ): Promise<ApiResponse> {
    const startTime = Date.now();

    try {
      // Replace variables in URL
      let url = replaceVariables(request.url, variables);

      // Ensure URL has protocol
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      // Build headers
      const headers = keyValuePairsToObject(request.headers);

      // Replace variables in headers
      Object.keys(headers).forEach(key => {
        headers[key] = replaceVariables(headers[key], variables);
      });

      // Add auth headers
      this.addAuthHeaders(request, headers);

      // Build params
      const params = keyValuePairsToObject(request.params);

      // Replace variables in params
      Object.keys(params).forEach(key => {
        params[key] = replaceVariables(params[key], variables);
      });

      // Build request body
      let requestData: any = undefined;

      if (request.method !== 'GET' && request.method !== 'HEAD') {
        requestData = this.buildRequestBody(request, variables);
      }

      // Configure axios request
      const axiosConfig: AxiosRequestConfig = {
        method: request.method.toLowerCase(),
        url,
        headers,
        params,
        data: requestData,
        timeout: API_CONSTANTS.DEFAULT_TIMEOUT,
        validateStatus: () => true, // Don't throw on any status code
      };

      // Send request
      const response: AxiosResponse = await axios(axiosConfig);

      // Calculate response time and size
      const responseTime = Date.now() - startTime;
      const responseSize = this.calculateResponseSize(response);

      // Convert axios headers to plain object
      // Axios response.headers can be an AxiosHeaders object or plain object
      const responseHeaders: Record<string, string> = {};
      if (response.headers) {
        // Handle AxiosHeaders object (has forEach method) or plain object
        const headersObj = response.headers as any;
        if (headersObj && typeof headersObj.forEach === 'function') {
          // It's an AxiosHeaders object
          headersObj.forEach((value: any, key: string) => {
            responseHeaders[key] = String(value);
          });
        } else if (headersObj && typeof headersObj === 'object') {
          // It's a plain object
          Object.keys(headersObj).forEach(key => {
            const value = headersObj[key];
            if (value !== undefined && value !== null) {
              responseHeaders[key] = String(value);
            }
          });
        }
      }

      // Build API response
      return {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data: response.data,
        responseTime,
        responseSize,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      throw this.handleError(error as AxiosError, responseTime);
    }
  }

  private addAuthHeaders(request: ApiRequest, headers: Record<string, string>): void {
    switch (request.auth.type) {
      case 'bearer':
        if (request.auth.bearer) {
          headers['Authorization'] = `Bearer ${request.auth.bearer}`;
        }
        break;

      case 'basic':
        if (request.auth.basic) {
          const { username, password } = request.auth.basic;
          const credentials = btoa(`${username}:${password}`);
          headers['Authorization'] = `Basic ${credentials}`;
        }
        break;

      case 'apiKey':
        if (request.auth.apiKey) {
          const { key, value, addTo } = request.auth.apiKey;
          if (addTo === 'header') {
            headers[key] = value;
          }
        }
        break;
    }
  }

  private buildRequestBody(request: ApiRequest, variables: Record<string, string>): any {
    switch (request.body.type) {
      case 'json':
        return request.body.json;

      case 'raw':
        if (request.body.raw) {
          return replaceVariables(request.body.raw, variables);
        }
        return undefined;

      case 'urlencoded':
        if (request.body.urlencoded) {
          const data = keyValuePairsToObject(request.body.urlencoded);
          // Replace variables
          Object.keys(data).forEach(key => {
            data[key] = replaceVariables(data[key], variables);
          });
          return new URLSearchParams(data).toString();
        }
        return undefined;

      case 'formData':
        if (request.body.formData) {
          const formData = new FormData();
          request.body.formData
            .filter(pair => pair.enabled && pair.key)
            .forEach(pair => {
              const value = replaceVariables(pair.value, variables);
              formData.append(pair.key, value);
            });
          return formData;
        }
        return undefined;

      default:
        return undefined;
    }
  }

  private calculateResponseSize(response: AxiosResponse): number {
    try {
      const dataStr = JSON.stringify(response.data);
      return new TextEncoder().encode(dataStr).length;
    } catch {
      return 0;
    }
  }

  private handleError(error: AxiosError, _responseTime: number): ResponseError {
    if (error.response) {
      // Server responded with error status
      return {
        message: `Request failed with status ${error.response.status}`,
        code: error.code,
        status: error.response.status,
        timestamp: new Date().toISOString(),
      };
    } else if (error.request) {
      // Request was made but no response
      return {
        message: 'No response received from server',
        code: error.code,
        timestamp: new Date().toISOString(),
      };
    } else {
      // Error in request setup
      return {
        message: error.message || 'An error occurred while sending the request',
        code: error.code,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

export const apiService = new ApiService();

