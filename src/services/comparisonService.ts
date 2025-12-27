import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from '../types/response.types';
import { SavedResponse, ComparisonResult } from '../types/comparison.types';
import { storageService } from './storageService';
import { computeDiff, countDiffChanges } from '../utils/diffUtils';

const STORAGE_KEY = 'peigen_saved_responses';

class ComparisonService {
    /**
     * Save a response for later comparison
     */
    saveResponse(
        response: ApiResponse,
        name: string,
        requestUrl: string,
        requestMethod: string
    ): SavedResponse {
        const savedResponse: SavedResponse = {
            id: uuidv4(),
            name,
            response,
            savedAt: new Date().toISOString(),
            requestUrl,
            requestMethod,
        };

        const savedResponses = this.getSavedResponses();
        savedResponses.push(savedResponse);
        storageService.set(STORAGE_KEY, savedResponses);

        return savedResponse;
    }

    /**
     * Get all saved responses
     */
    getSavedResponses(): SavedResponse[] {
        const data = storageService.get<SavedResponse[]>(STORAGE_KEY);
        return data || [];
    }

    /**
     * Get a saved response by ID
     */
    getSavedResponseById(id: string): SavedResponse | null {
        const savedResponses = this.getSavedResponses();
        return savedResponses.find(r => r.id === id) || null;
    }

    /**
     * Delete a saved response
     */
    deleteSavedResponse(id: string): void {
        const savedResponses = this.getSavedResponses();
        const filtered = savedResponses.filter(r => r.id !== id);
        storageService.set(STORAGE_KEY, filtered);
    }

    /**
     * Update a saved response name
     */
    updateSavedResponseName(id: string, newName: string): void {
        const savedResponses = this.getSavedResponses();
        const response = savedResponses.find(r => r.id === id);
        if (response) {
            response.name = newName;
            storageService.set(STORAGE_KEY, savedResponses);
        }
    }

    /**
     * Compare two responses and return the comparison result
     */
    compareResponses(
        leftResponse: SavedResponse | ApiResponse,
        rightResponse: SavedResponse | ApiResponse
    ): ComparisonResult {
        // Extract the actual response data
        const leftData = 'response' in leftResponse ? leftResponse.response.data : leftResponse.data;
        const rightData = 'response' in rightResponse ? rightResponse.response.data : rightResponse.data;

        // Compute the diff
        const diff = computeDiff(leftData, rightData);
        const summary = countDiffChanges(diff);

        return {
            leftResponse,
            rightResponse,
            diff,
            summary,
        };
    }

    /**
     * Clear all saved responses
     */
    clearAllSavedResponses(): void {
        storageService.remove(STORAGE_KEY);
    }

    /**
     * Export saved responses as JSON
     */
    exportSavedResponses(): string {
        const savedResponses = this.getSavedResponses();
        return JSON.stringify(savedResponses, null, 2);
    }

    /**
     * Import saved responses from JSON
     */
    importSavedResponses(jsonData: string): void {
        try {
            const imported = JSON.parse(jsonData) as SavedResponse[];
            const existing = this.getSavedResponses();

            // Merge imported responses with existing ones, avoiding duplicates
            const merged = [...existing];
            imported.forEach(importedResponse => {
                const exists = existing.some(r => r.id === importedResponse.id);
                if (!exists) {
                    merged.push(importedResponse);
                }
            });

            storageService.set(STORAGE_KEY, merged);
        } catch (error) {
            throw new Error('Invalid JSON format for saved responses');
        }
    }
}

export const comparisonService = new ComparisonService();
