// tests/jwt.test.ts
import { encode_jwt, decode_jwt, validate_jwt } from '../src/index';

describe('JWT Library', () => {
  const secret = 'secret';
  const id = '123';
  const payload = { name: 'John Doe' };
  const ttl = 3600; // 1 hour in seconds

  let jwt: string;

  test('encode_jwt should return a JWT string', async () => {
    jwt = await encode_jwt(secret, id, payload, ttl);
    expect(jwt).toBeDefined();
    expect(typeof jwt).toBe('string');
  });

  test('decode_jwt should return the correct payload', async () => {
    const decoded = await decode_jwt(secret, jwt);
    expect(decoded).toBeDefined();
    expect(decoded.id).toBe(id);
    expect(decoded).toMatchObject(payload);
  });

  test('validate_jwt should return true for a valid JWT', async () => {
    const isValid = await validate_jwt(secret, jwt);
    expect(isValid).toBe(true);
  });

  test('validate_jwt should return false for an invalid JWT', async () => {
    const invalidJwt = jwt + 'tampering';
    const isValid = await validate_jwt(secret, invalidJwt);
    expect(isValid).toBe(false);
  });

  test('validate_jwt should return false for expired JWT', async () => {
    const expiredJwt = await encode_jwt(secret, id, payload, -1);
    const isValid = await validate_jwt(secret, expiredJwt);
    expect(isValid).toBe(false);
  });
});
