// tests/jwt.test.ts
import { encode_jwt, decode_jwt, validate_jwt } from '../src/index';

describe('JWT Library', () => {
  const secret = 'secret';
  const id = '123';
  const payload = { name: 'John Doe' };
  const ttl = 3600; // 1 hour in seconds

  let jwt: string;

  test('encode_jwt should return a JWT string', () => {
    jwt = encode_jwt(secret, id, payload, ttl);
    expect(jwt).toBeDefined();
    expect(typeof jwt).toBe('string');
  });

  test('decode_jwt should return the correct payload', () => {
    const decoded = decode_jwt(secret, jwt);
    expect(decoded).toBeDefined();
    expect(decoded.id).toBe(id);
    expect(decoded.payload).toEqual(payload);
  });

  test('validate_jwt should return true for a valid JWT', () => {
    const isValid = validate_jwt(secret, jwt);
    expect(isValid).toBe(true);
  });

  test('validate_jwt should return false for an invalid JWT', () => {
    const invalidJwt = jwt + 'tampering';
    const isValid = validate_jwt(secret, invalidJwt);
    expect(isValid).toBe(false);
  });

  test('validate_jwt should return false for expired JWT', () => {
    const expiredJwt = encode_jwt(secret, id, payload, 0);
    const isValid = validate_jwt(secret, expiredJwt);
    expect(isValid).toBe(false);
  });
});
