import { Environment, EnvironmentVariable, GlobalVariables } from '../types';
import { generateId } from '../utils';
import { storageService } from './storageService';
import { STORAGE_KEYS } from '../constants';

class EnvironmentService {
  getEnvironments(): Environment[] {
    return storageService.get<Environment[]>(STORAGE_KEYS.ENVIRONMENTS, []) || [];
  }

  getEnvironment(id: string): Environment | null {
    const environments = this.getEnvironments();
    return environments.find(env => env.id === id) || null;
  }

  getCurrentEnvironment(): Environment | null {
    const currentId = storageService.get<string>(STORAGE_KEYS.CURRENT_ENVIRONMENT);
    return currentId ? this.getEnvironment(currentId) : null;
  }

  setCurrentEnvironment(id: string | null): void {
    if (id === null) {
      storageService.remove(STORAGE_KEYS.CURRENT_ENVIRONMENT);
    } else {
      storageService.set(STORAGE_KEYS.CURRENT_ENVIRONMENT, id);
    }
  }

  createEnvironment(name: string): Environment {
    const environments = this.getEnvironments();
    const now = new Date().toISOString();

    const newEnvironment: Environment = {
      id: generateId(),
      name,
      variables: [],
      createdAt: now,
      updatedAt: now,
    };

    environments.push(newEnvironment);
    storageService.set(STORAGE_KEYS.ENVIRONMENTS, environments);

    return newEnvironment;
  }

  updateEnvironment(id: string, updates: Partial<Environment>): Environment | null {
    const environments = this.getEnvironments();
    const index = environments.findIndex(env => env.id === id);

    if (index === -1) return null;

    environments[index] = {
      ...environments[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    storageService.set(STORAGE_KEYS.ENVIRONMENTS, environments);
    return environments[index];
  }

  deleteEnvironment(id: string): boolean {
    const environments = this.getEnvironments();
    const filtered = environments.filter(env => env.id !== id);

    if (filtered.length === environments.length) return false;

    // Clear current environment if it's being deleted
    const currentId = storageService.get<string>(STORAGE_KEYS.CURRENT_ENVIRONMENT);
    if (currentId === id) {
      storageService.remove(STORAGE_KEYS.CURRENT_ENVIRONMENT);
    }

    storageService.set(STORAGE_KEYS.ENVIRONMENTS, filtered);
    return true;
  }

  addVariable(environmentId: string, variable: EnvironmentVariable): boolean {
    const environment = this.getEnvironment(environmentId);
    if (!environment) return false;

    environment.variables.push(variable);
    this.updateEnvironment(environmentId, { variables: environment.variables });
    return true;
  }

  updateVariable(environmentId: string, variableId: string, updates: Partial<EnvironmentVariable>): boolean {
    const environment = this.getEnvironment(environmentId);
    if (!environment) return false;

    const variableIndex = environment.variables.findIndex(v => v.id === variableId);
    if (variableIndex === -1) return false;

    environment.variables[variableIndex] = {
      ...environment.variables[variableIndex],
      ...updates,
    };

    this.updateEnvironment(environmentId, { variables: environment.variables });
    return true;
  }

  removeVariable(environmentId: string, variableId: string): boolean {
    const environment = this.getEnvironment(environmentId);
    if (!environment) return false;

    const filtered = environment.variables.filter(v => v.id !== variableId);
    if (filtered.length === environment.variables.length) return false;

    this.updateEnvironment(environmentId, { variables: filtered });
    return true;
  }

  getActiveVariables(): Record<string, string> {
    const currentEnv = this.getCurrentEnvironment();
    const globalVars = this.getGlobalVariables();

    const envVars: Record<string, string> = {};

    if (currentEnv) {
      currentEnv.variables
        .filter(v => v.enabled)
        .forEach(v => {
          envVars[v.key] = v.value;
        });
    }

    // Global variables override environment variables
    return { ...envVars, ...globalVars };
  }

  getGlobalVariables(): GlobalVariables {
    return storageService.get<GlobalVariables>(STORAGE_KEYS.GLOBAL_VARIABLES, {}) || {};
  }

  setGlobalVariable(key: string, value: string): void {
    const globals = this.getGlobalVariables();
    globals[key] = value;
    storageService.set(STORAGE_KEYS.GLOBAL_VARIABLES, globals);
  }

  removeGlobalVariable(key: string): void {
    const globals = this.getGlobalVariables();
    delete globals[key];
    storageService.set(STORAGE_KEYS.GLOBAL_VARIABLES, globals);
  }
}

export const environmentService = new EnvironmentService();

