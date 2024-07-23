// tests/jwt.test.ts
import { b64UrlEncode, b64UrlDecode } from '../src/utils';

describe('', () => {
  const test_string = 'Hello, World!';
  const base64 = 'SGVsbG8sIFdvcmxkIQ==';

  test('b64UrlEncode should encode a string to base64url', () => {
    const encoded = b64UrlEncode(test_string);
    expect(typeof encoded).toBe('string');
    expect(b64UrlDecode(encoded)).toBe(test_string);
  });

  test('b64UrlDecode should decode a base64url to string', () => {
    const decoded = b64UrlDecode(base64);
    expect(decoded).toBe(test_string);
  });

  test('validate urlsafe encoding', () => {
    const encoded = b64UrlEncode(test_string);
    expect(/^[A-Za-z0-9\-_]+$/.test(encoded)).toBe(true);
  });
});
