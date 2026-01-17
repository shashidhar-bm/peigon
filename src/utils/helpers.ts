export const generateId = (): string => {
  return crypto.randomUUID();
};

export const generateShortId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const createEmptyRequest = (name: string = 'New Request'): ApiRequest => {
  const now = new Date().toISOString();

  return {
    id: generateId(),
    name,
    method: 'GET' as HttpMethod,
    url: '',
    headers: [],
    params: [],
    body: {
      type: 'none',
    },
    auth: {
      type: 'none',
    },
    createdAt: now,
    updatedAt: now,
  };
};

export const createEmptyKeyValuePair = (): KeyValuePair => {
  return {
    id: generateShortId(),
    key: '',
    value: '',
    enabled: true,
  };
};

export const cloneRequest = (request: ApiRequest, newName?: string): ApiRequest => {
  return {
    ...request,
    id: generateId(),
    name: newName || `${request.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const deepClone = <T>(obj: T): T => {
  return structuredClone(obj);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const downloadJson = (data: any, filename: string): void => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
};

