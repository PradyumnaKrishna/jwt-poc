import * as utils from './utils';

export function encode_jwt(
  secret: string,
  id: string | number,
  payload: any,
  ttl: number = 3600
): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  // Generates the issued at and expiration time
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + ttl;

  // Encodes the header and payload into Base64
  const encodedHeader = utils.b64UrlEncode(JSON.stringify(header));
  const encodedPayload = utils.b64UrlEncode(JSON.stringify({ id, payload, exp, iat }));

  // Creates the signature
  const signature = utils.createSignature(encodedHeader, encodedPayload, secret);

  // Returns the JWT token
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function decode_jwt(
  secret: string,
  token: string
): { id: string; payload: any; expiresAt: Date } {
  try {
    // Splits the token into header, payload, and signature
    const [encodedHeader, encodedPayload, signature] = token.split('.');

    // Decodes the header and payload
    const payload = JSON.parse(utils.b64UrlDecode(encodedPayload));
    const expectedSignature = utils.createSignature(encodedHeader, encodedPayload, secret);

    // Validates the signature
    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }

    // converts the expiration time to a Date object
    const expiresAt = new Date(payload.exp * 1000);

    // Returns the decoded payload
    return { id: payload.id, payload: payload.payload, expiresAt };
  } catch (error) {
    throw error;
  }
}

export function validate_jwt(secret: string, token: string): boolean {
  try {
    // Decodes the token and checks if it has expired
    const current_time = new Date();
    const payload = decode_jwt(secret, token);
    if (payload.expiresAt < current_time) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
