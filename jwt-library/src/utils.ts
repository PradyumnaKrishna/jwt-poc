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

export async function createSignature(
  header: string,
  payload: string,
  secret: string
): Promise<string> {
  const signatureInput = `${header}.${payload}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureInput);
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, data);
  const signature = b64UrlEncode(String.fromCharCode(...new Uint8Array(signatureBuffer)));
  return signature;
}
