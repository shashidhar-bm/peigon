import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { SavedResponse, ComparisonResult, ComparisonViewMode } from '../types/comparison.types';
import { comparisonService } from '../services/comparisonService';
import { useRequestContext } from './RequestContext';

interface ComparisonContextType {
    // State
    savedResponses: SavedResponse[];
    comparisonMode: boolean;
    selectedLeftId: string | null;
    selectedRightId: string | null;
    comparisonResult: ComparisonResult | null;
    viewMode: ComparisonViewMode;

    // Actions
    saveCurrentResponse: (name: string) => void;
    deleteSavedResponse: (id: string) => void;
    selectLeftResponse: (id: string | null) => void;
    selectRightResponse: (id: string | null) => void;
    compareSelected: () => void;
    clearComparison: () => void;
    toggleComparisonMode: () => void;
    setViewMode: (mode: ComparisonViewMode) => void;
    refreshSavedResponses: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparisonContext = () => {
    const context = useContext(ComparisonContext);
    if (!context) {
        throw new Error('useComparisonContext must be used within ComparisonProvider');
    }
    return context;
};

interface ComparisonProviderProps {
    children: ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
    const { currentRequest, response } = useRequestContext();
    const [savedResponses, setSavedResponses] = useState<SavedResponse[]>([]);
    const [comparisonMode, setComparisonMode] = useState(false);
    const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
    const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
    const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
    const [viewMode, setViewMode] = useState<ComparisonViewMode>('side-by-side');

    const refreshSavedResponses = useCallback(() => {
        const responses = comparisonService.getSavedResponses();
        setSavedResponses(responses);
    }, []);

    // Load saved responses on mount
    useEffect(() => {
        refreshSavedResponses();
    }, [refreshSavedResponses]);

    const saveCurrentResponse = useCallback((name: string) => {
        if (!response) {
            throw new Error('No response to save');
        }

        comparisonService.saveResponse(
            response,
            name,
            currentRequest.url,
            currentRequest.method
        );

        refreshSavedResponses();
    }, [response, currentRequest, refreshSavedResponses]);

    const deleteSavedResponse = useCallback((id: string) => {
        comparisonService.deleteSavedResponse(id);
        refreshSavedResponses();

        // Clear selection if deleted response was selected
        if (selectedLeftId === id) {
            setSelectedLeftId(null);
        }
        if (selectedRightId === id) {
            setSelectedRightId(null);
        }

        // Clear comparison if it involved the deleted response
        if (comparisonResult) {
            const leftId = 'id' in comparisonResult.leftResponse ? comparisonResult.leftResponse.id : null;
            const rightId = 'id' in comparisonResult.rightResponse ? comparisonResult.rightResponse.id : null;

            if (leftId === id || rightId === id) {
                setComparisonResult(null);
            }
        }
    }, [selectedLeftId, selectedRightId, comparisonResult, refreshSavedResponses]);

    const selectLeftResponse = useCallback((id: string | null) => {
        setSelectedLeftId(id);
    }, []);

    const selectRightResponse = useCallback((id: string | null) => {
        setSelectedRightId(id);
    }, []);

    const compareSelected = useCallback(() => {
        // Get left response
        let leftResponse: SavedResponse | null = null;
        if (selectedLeftId === 'current') {
            if (!response) {
                throw new Error('No current response available');
            }
            leftResponse = {
                id: 'current',
                name: 'Current Response',
                response,
                savedAt: new Date().toISOString(),
                requestUrl: currentRequest.url,
                requestMethod: currentRequest.method,
            };
        } else if (selectedLeftId) {
            leftResponse = comparisonService.getSavedResponseById(selectedLeftId);
        }

        // Get right response
        let rightResponse: SavedResponse | null = null;
        if (selectedRightId === 'current') {
            if (!response) {
                throw new Error('No current response available');
            }
            rightResponse = {
                id: 'current',
                name: 'Current Response',
                response,
                savedAt: new Date().toISOString(),
                requestUrl: currentRequest.url,
                requestMethod: currentRequest.method,
            };
        } else if (selectedRightId) {
            rightResponse = comparisonService.getSavedResponseById(selectedRightId);
        }

        if (!leftResponse || !rightResponse) {
            throw new Error('Please select two responses to compare');
        }

        const result = comparisonService.compareResponses(leftResponse, rightResponse);
        setComparisonResult(result);
    }, [selectedLeftId, selectedRightId, response, currentRequest]);

    const clearComparison = useCallback(() => {
        setComparisonResult(null);
        setSelectedLeftId(null);
        setSelectedRightId(null);
    }, []);

    const toggleComparisonMode = useCallback(() => {
        setComparisonMode(prev => !prev);
        if (comparisonMode) {
            // Exiting comparison mode, clear state
            clearComparison();
        }
    }, [comparisonMode, clearComparison]);

    return (
        <ComparisonContext.Provider
            value={{
                savedResponses,
                comparisonMode,
                selectedLeftId,
                selectedRightId,
                comparisonResult,
                viewMode,
                saveCurrentResponse,
                deleteSavedResponse,
                selectLeftResponse,
                selectRightResponse,
                compareSelected,
                clearComparison,
                toggleComparisonMode,
                setViewMode,
                refreshSavedResponses,
            }}
        >
            {children}
        </ComparisonContext.Provider>
    );
};
