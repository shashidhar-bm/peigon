import { ApiRequest } from './request.types';

export interface Collection {
  id: string;
  name: string;
  description?: string;
  requests: ApiRequest[];
  folders: CollectionFolder[];
  createdAt: string;
  updatedAt: string;
}

export interface CollectionFolder {
  id: string;
  name: string;
  description?: string;
  requestIds: string[];
  parentId?: string;
}

export interface CollectionExport {
  version: string;
  collection: Collection;
  exportedAt: string;
}

