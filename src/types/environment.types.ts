export interface EnvironmentVariable {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
  type: 'default' | 'secret';
}

export interface Environment {
  id: string;
  name: string;
  variables: EnvironmentVariable[];
  createdAt: string;
  updatedAt: string;
}

export interface GlobalVariables {
  [key: string]: string;
}

