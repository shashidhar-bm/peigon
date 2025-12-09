import React, { createContext, useContext, ReactNode } from 'react';
import { Environment } from '../types';
import { useEnvironments } from '../hooks';

interface EnvironmentContextType {
  environments: Environment[];
  currentEnvironment: Environment | null;
  activeVariables: Record<string, string>;
  setCurrentEnvironment: (id: string | null) => void;
  createEnvironment: (name: string) => Environment;
  updateEnvironment: (id: string, updates: Partial<Environment>) => Environment | null;
  deleteEnvironment: (id: string) => boolean;
  refreshEnvironments: () => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export const useEnvironmentContext = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error('useEnvironmentContext must be used within EnvironmentProvider');
  }
  return context;
};

interface EnvironmentProviderProps {
  children: ReactNode;
}

export const EnvironmentProvider: React.FC<EnvironmentProviderProps> = ({ children }) => {
  const environmentHook = useEnvironments();

  return (
    <EnvironmentContext.Provider value={environmentHook}>
      {children}
    </EnvironmentContext.Provider>
  );
};

