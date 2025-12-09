import { KeyValuePair } from '../types';

export const parseUrl = (url: string): { baseUrl: string; params: KeyValuePair[] } => {
  try {
    const urlObj = new URL(url);
    const params: KeyValuePair[] = [];
    
    urlObj.searchParams.forEach((value, key) => {
      params.push({
        id: Math.random().toString(36).substring(2, 9),
        key,
        value,
        enabled: true,
      });
    });
    
    return {
      baseUrl: `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`,
      params,
    };
  } catch {
    return { baseUrl: url, params: [] };
  }
};

export const buildUrlWithParams = (baseUrl: string, params: KeyValuePair[]): string => {
  const enabledParams = params.filter(p => p.enabled && p.key);
  
  if (enabledParams.length === 0) return baseUrl;
  
  const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);
  
  enabledParams.forEach(param => {
    url.searchParams.append(param.key, param.value);
  });
  
  return url.toString();
};

export const parseHeaders = (headers: Record<string, string>): KeyValuePair[] => {
  return Object.entries(headers).map(([key, value]) => ({
    id: Math.random().toString(36).substring(2, 9),
    key,
    value,
    enabled: true,
  }));
};

export const keyValuePairsToObject = (pairs: KeyValuePair[]): Record<string, string> => {
  return pairs
    .filter(pair => pair.enabled && pair.key)
    .reduce((acc, pair) => {
      acc[pair.key] = pair.value;
      return acc;
    }, {} as Record<string, string>);
};

export const replaceVariables = (str: string, variables: Record<string, string>): string => {
  let result = str;
  
  // Replace {{variableName}} with actual values
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, value);
  });
  
  return result;
};

export const extractVariables = (str: string): string[] => {
  const regex = /{{\\s*([a-zA-Z_][a-zA-Z0-9_]*)\\s*}}/g;
  const matches = str.matchAll(regex);
  const variables: string[] = [];
  
  for (const match of matches) {
    if (match[1] && !variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  
  return variables;
};

export const parseResponseHeaders = (headers: any): Record<string, string> => {
  if (typeof headers === 'object' && headers !== null) {
    return headers;
  }
  return {};
};

