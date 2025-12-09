import { useState, useCallback, useEffect } from 'react';
import { Environment } from '../types';
import { environmentService } from '../services';

interface UseEnvironmentsResult {
  environments: Environment[];
  currentEnvironment: Environment | null;
  activeVariables: Record<string, string>;
  setCurrentEnvironment: (id: string | null) => void;
  createEnvironment: (name: string) => Environment;
  updateEnvironment: (id: string, updates: Partial<Environment>) => Environment | null;
  deleteEnvironment: (id: string) => boolean;
  refreshEnvironments: () => void;
}

export function useEnvironments(): UseEnvironmentsResult {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [currentEnvironment, setCurrentEnvState] = useState<Environment | null>(null);
  const [activeVariables, setActiveVariables] = useState<Record<string, string>>({});

  const refreshEnvironments = useCallback(() => {
    const loadedEnvironments = environmentService.getEnvironments();
    const current = environmentService.getCurrentEnvironment();
    const variables = environmentService.getActiveVariables();

    setEnvironments(loadedEnvironments);
    setCurrentEnvState(current);
    setActiveVariables(variables);
  }, []);

  useEffect(() => {
    refreshEnvironments();
  }, [refreshEnvironments]);

  const setCurrentEnvironment = useCallback((id: string | null) => {
    environmentService.setCurrentEnvironment(id);
    refreshEnvironments();
  }, [refreshEnvironments]);

  const createEnvironment = useCallback((name: string) => {
    const newEnvironment = environmentService.createEnvironment(name);
    refreshEnvironments();
    return newEnvironment;
  }, [refreshEnvironments]);

  const updateEnvironment = useCallback((id: string, updates: Partial<Environment>) => {
    const updated = environmentService.updateEnvironment(id, updates);
    refreshEnvironments();
    return updated;
  }, [refreshEnvironments]);

  const deleteEnvironment = useCallback((id: string) => {
    const result = environmentService.deleteEnvironment(id);
    refreshEnvironments();
    return result;
  }, [refreshEnvironments]);

  return {
    environments,
    currentEnvironment,
    activeVariables,
    setCurrentEnvironment,
    createEnvironment,
    updateEnvironment,
    deleteEnvironment,
    refreshEnvironments,
  };
}

