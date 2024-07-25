import { TextEncoder, TextDecoder } from 'util';
import { webcrypto } from 'node:crypto';

Object.assign(global, { TextDecoder, TextEncoder });
Object.defineProperty(globalThis, 'crypto', {
  value: webcrypto,
});
