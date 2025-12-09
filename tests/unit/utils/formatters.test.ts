import { formatBytes, formatTime, formatJson, getStatusColorCategory } from '../../../src/utils/formatters';

describe('formatters utils', () => {
  describe('formatBytes', () => {
    it('should format bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 B');
      expect(formatBytes(1024)).toBe('1.00 KB');
      expect(formatBytes(1048576)).toBe('1.00 MB');
      expect(formatBytes(1073741824)).toBe('1.00 GB');
    });
  });

  describe('formatTime', () => {
    it('should format milliseconds', () => {
      expect(formatTime(500)).toBe('500 ms');
    });

    it('should format seconds', () => {
      expect(formatTime(1500)).toBe('1.50 s');
    });

    it('should format minutes', () => {
      expect(formatTime(125000)).toBe('2m 5s');
    });
  });

  describe('formatJson', () => {
    it('should format JSON correctly', () => {
      const data = { key: 'value', nested: { foo: 'bar' } };
      const formatted = formatJson(data);
      expect(formatted).toContain('"key"');
      expect(formatted).toContain('"value"');
    });

    it('should handle non-JSON values', () => {
      const result = formatJson('plain string');
      expect(result).toBe('"plain string"');
    });
  });

  describe('getStatusColorCategory', () => {
    it('should return correct category for status codes', () => {
      expect(getStatusColorCategory(100)).toBe('status1xx');
      expect(getStatusColorCategory(200)).toBe('status2xx');
      expect(getStatusColorCategory(301)).toBe('status3xx');
      expect(getStatusColorCategory(404)).toBe('status4xx');
      expect(getStatusColorCategory(500)).toBe('status5xx');
    });
  });
});

