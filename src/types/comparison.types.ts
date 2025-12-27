import { ApiResponse } from './response.types';

export type DiffType = 'added' | 'removed' | 'modified' | 'unchanged';

export interface DiffNode {
    path: string;
    type: DiffType;
    oldValue?: any;
    newValue?: any;
    children?: DiffNode[];
}

export interface SavedResponse {
    id: string;
    name: string;
    response: ApiResponse;
    savedAt: string;
    requestUrl: string;
    requestMethod: string;
}

export interface ComparisonResult {
    leftResponse: SavedResponse | ApiResponse;
    rightResponse: SavedResponse | ApiResponse;
    diff: DiffNode;
    summary: {
        added: number;
        removed: number;
        modified: number;
        unchanged: number;
    };
}

export type ComparisonViewMode = 'side-by-side' | 'unified';
