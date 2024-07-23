import * as crypto from 'crypto';

function encodeUrlsafe(base64: string): string {
  return base64
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function decodeUrlsafe(base64: string): string {
  const padding = base64.length % 4;
  if (padding) {
    base64 += '='.repeat(4 - padding);
  }
  return base64
    .replace(/\-/g, '+') // Convert '-' to '+'
    .replace(/\_/g, '/'); // Convert '_' to '/'
}

export function b64UrlEncode(str: string): string {
  return encodeUrlsafe(btoa(str));
}

export function b64UrlDecode(base64: string): string {
  return atob(decodeUrlsafe(base64));
}

export function createSignature(header: string, payload: string, secret: string): string {
  const signatureInput = `${header}.${payload}`;
  const signature = crypto.createHmac('sha256', secret).update(signatureInput).digest('base64');
  return encodeUrlsafe(signature);
}
