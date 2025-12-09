export const isValidUrl = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  
  // Allow URLs without protocol for simplicity
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidJson = (str: string): boolean => {
  if (!str || str.trim() === '') return true; // Empty is valid
  
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export const isValidHeaderKey = (key: string): boolean => {
  // Header keys should not contain spaces or special characters except dash
  const headerKeyRegex = /^[a-zA-Z0-9-_]+$/;
  return headerKeyRegex.test(key);
};

export const isValidVariableName = (name: string): boolean => {
  // Variable names should be alphanumeric with underscores
  const variableNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
  return variableNameRegex.test(name);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCollectionName = (name: string): boolean => {
  return name.trim().length > 0 && name.length <= 100;
};

export const validateEnvironmentName = (name: string): boolean => {
  return name.trim().length > 0 && name.length <= 50;
};

