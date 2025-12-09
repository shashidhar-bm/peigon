import {
  isValidUrl,
  isValidJson,
  isValidHeaderKey,
  isValidVariableName,
  validateEmail,
} from '../../../src/utils/validators';

describe('validators utils', () => {
  describe('isValidUrl', () => {
    it('should validate URLs correctly', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('example.com')).toBe(true);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('not a url')).toBe(false);
    });
  });

  describe('isValidJson', () => {
    it('should validate JSON correctly', () => {
      expect(isValidJson('{"key": "value"}')).toBe(true);
      expect(isValidJson('[]')).toBe(true);
      expect(isValidJson('')).toBe(true); // Empty is valid
      expect(isValidJson('invalid json')).toBe(false);
      expect(isValidJson('{"key": value}')).toBe(false);
    });
  });

  describe('isValidHeaderKey', () => {
    it('should validate header keys correctly', () => {
      expect(isValidHeaderKey('Content-Type')).toBe(true);
      expect(isValidHeaderKey('X-API-Key')).toBe(true);
      expect(isValidHeaderKey('Authorization')).toBe(true);
      expect(isValidHeaderKey('Invalid Key')).toBe(false);
      expect(isValidHeaderKey('key@value')).toBe(false);
    });
  });

  describe('isValidVariableName', () => {
    it('should validate variable names correctly', () => {
      expect(isValidVariableName('baseUrl')).toBe(true);
      expect(isValidVariableName('api_key')).toBe(true);
      expect(isValidVariableName('_private')).toBe(true);
      expect(isValidVariableName('123invalid')).toBe(false);
      expect(isValidVariableName('invalid-name')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should validate emails correctly', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });
});

