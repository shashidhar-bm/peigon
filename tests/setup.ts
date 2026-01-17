import '@testing-library/jest-dom';

// In-memory localStorage mock with tracking
let storage: Record<string, string> = {};

const localStorageMock = {
  getItem: jest.fn((key: string) => (key in storage ? storage[key] : null)),
  setItem: jest.fn((key: string, value: string) => {
    storage[key] = value;
  }),
  removeItem: jest.fn((key: string) => {
    delete storage[key];
  }),
  clear: jest.fn(() => {
    storage = {};
  }),
  key: jest.fn((index: number) => Object.keys(storage)[index] ?? null),
  get length() {
    return Object.keys(storage).length;
  },
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Reset mocks between tests
beforeEach(() => {
  storage = {};
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  localStorageMock.key.mockClear();
});

// Mock fetch
global.fetch = jest.fn();

// Suppress console errors in tests
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Polyfill for crypto.randomUUID
if (!global.crypto) {
  // @ts-ignore
  Object.defineProperty(global, 'crypto', {
    value: {
      randomUUID: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    }
  });
} else if (!global.crypto.randomUUID) {
  // @ts-ignore
  global.crypto.randomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
}

// Polyfill for TextEncoder if missing
import { TextEncoder as UtilTextEncoder } from 'util';
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = UtilTextEncoder as any;
}

