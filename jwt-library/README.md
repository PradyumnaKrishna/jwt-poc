# JWT Library

This library provides methods for encoding, decoding, and validating JSON Web Tokens (JWTs). It utilizes the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) for cryptographic operations, like create HMAC signatures.

## Usage

Import the library and use the provided methods as follows:

```typescript
import { encode_jwt, decode_jwt, validate_jwt } from 'jwt-library';

const secret = 'your-secret-key';
const id = 'user-id';
const payload = { name: 'John Doe' };
const ttl = 3600; // Time to live in seconds

// Encode a JWT
const jwt = encode_jwt(secret, id, payload, ttl);
console.log('Encoded JWT:', jwt);

// Decode a JWT
const decodedJwt = decode_jwt(secret, jwt);
console.log('Decoded JWT:', decodedJwt);

// Validate a JWT
const isValid = validate_jwt(secret, jwt);
console.log('Is Valid JWT:', isValid);
```

## Installation

The build is provided in the `dist` directory. Include these files in your project to use the library.
To build the library from source, run the following commands:

```bash
npm install
npm run build
```

The library will be built in the `dist` directory.

## Testing

To run the tests, use the following command:

```bash
npm test
```
