import * as utils from './utils';

interface jwtPayload {
  [key: string]: any;
  iss?: string;
  aud?: string;
  sub?: string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export async function encode_jwt(
  secret: string,
  id: string | number,
  payload: object,
  ttl: number = 3600,
  options: { [key: string]: any } = {}
): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  // Generates the issued at and expiration time
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + ttl;

  // Creates the JWT payload
  const _payload: jwtPayload = {
    id,
    ...payload,
    iat,
    exp,
  };

  if (options.nbf) {
    _payload.nbf = options.nbf;
  }

  if (options.iss) {
    _payload.iss = options.iss;
  }

  if (options.aud) {
    _payload.aud = options.aud;
  }

  if (options.sub) {
    _payload.sub = options.sub;
  }

  if (options.jti) {
    _payload.jti = options.jti;
  }

  // Encodes the header and payload into Base64
  const encodedHeader = utils.b64UrlEncode(JSON.stringify(header));
  const encodedPayload = utils.b64UrlEncode(JSON.stringify(_payload));

  // Creates the signature
  const signature = await utils.createSignature(encodedHeader, encodedPayload, secret);

  // Returns the JWT token
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export async function decode_jwt(secret: string, token: string): Promise<jwtPayload> {
  try {
    // Splits the token into header, payload, and signature
    const [encodedHeader, encodedPayload, signature] = token.split('.');

    // Decodes the header and payload
    const payload = JSON.parse(utils.b64UrlDecode(encodedPayload));
    const expectedSignature = await utils.createSignature(encodedHeader, encodedPayload, secret);

    // Validates the signature
    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }

    // Returns the decoded payload
    return payload;
  } catch (error) {
    throw error;
  }
}

export async function validate_jwt(secret: string, token: string): Promise<boolean> {
  try {
    // Decodes the token
    const current_time = Math.floor(Date.now() / 1000);
    const payload = await decode_jwt(secret, token);

    // Validates the token expiration and not before time
    if (payload.exp && payload.exp < current_time) {
      return false;
    }
    if (payload.nbf && payload.nbf > current_time) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
