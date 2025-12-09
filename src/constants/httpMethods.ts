import { HttpMethod } from '../types';

export const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

export const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: '#61AFFE',
  POST: '#49CC90',
  PUT: '#FCA130',
  DELETE: '#F93E3E',
  PATCH: '#50E3C2',
  HEAD: '#9012FE',
  OPTIONS: '#0D96F2',
};

export const DEFAULT_METHOD: HttpMethod = 'GET';

