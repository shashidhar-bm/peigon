export const API_CONSTANTS = {
  DEFAULT_TIMEOUT: Number(process.env.REACT_APP_DEFAULT_TIMEOUT) || 30000,
  MAX_HISTORY_SIZE: Number(process.env.REACT_APP_MAX_HISTORY_SIZE) || 50,
  LOCAL_STORAGE_KEY: process.env.REACT_APP_LOCAL_STORAGE_KEY || 'postman_clone_data',
  APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  APP_NAME: process.env.REACT_APP_NAME || 'Postman Clone',
} as const;

export const STORAGE_KEYS = {
  COLLECTIONS: 'collections',
  ENVIRONMENTS: 'environments',
  HISTORY: 'history',
  CURRENT_ENVIRONMENT: 'currentEnvironment',
  GLOBAL_VARIABLES: 'globalVariables',
  ACTIVE_REQUEST: 'activeRequest',
} as const;

export const DEFAULT_HEADERS = [
  { id: '1', key: 'Content-Type', value: 'application/json', enabled: true },
];

export const COMMON_HEADERS = [
  'Accept',
  'Accept-Encoding',
  'Accept-Language',
  'Authorization',
  'Cache-Control',
  'Content-Type',
  'Cookie',
  'Host',
  'Origin',
  'Referer',
  'User-Agent',
  'X-Requested-With',
  'X-API-Key',
];

export const CONTENT_TYPES = [
  'application/json',
  'application/xml',
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
  'text/html',
  'text/xml',
];

