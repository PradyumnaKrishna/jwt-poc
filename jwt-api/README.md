# JWT-library POC

This is a Proof of concept to showcase the use of the `jwt-library` in the API routes of a Next.js project.

The API routes are located in the `pages/api` directory. The `jwt-library` is used to create and verify JWT tokens.

## Getting Started

## Installation

To run this project, install the dependencies:

```bash
npm install
```

### Installing the JWT-library (optional)

This step is optional as `jwt-library` is already included in the project as a vendor package.

The `jwt-library` isn't published on npm yet. To use it in this project, there are two ways either link the library or include the build files in the project.

1. To link the library, run the following command in the `jwt-library` directory:

   ```bash
   npm link
   ```

   Then, in the root directory of this project, run:

   ```bash
   npm link jwt-library
   ```

   This will link the `jwt-library` to this project.

2. To include the build files, copy the contents of the `dist` directory of the `jwt-library` to the `vendor/jwt-library` directory of this project.

To import the library in the project, use the following import statement:

```js
// Import the jwt-library as npm package if installed.
import * as jwt from 'jwt-library';

// Import the jwt-library as vendor package if not installed.
import * as jwt from '@/vendor/jwt-library';
```

### Setting up environment variables

`JWT_SECRET` is stored as an environment variable to provide an extra layer of security.

Create a `.env.local` file (take `.env.template` as reference) in the root directory of the project with the following content:

```env
JWT_SECRET=your-secret-here
```

The environment variable is used to store the secret used to sign the JWT tokens. A template is provided in the `.env.local.template` file. Replace `your-secret-here` with a secret of your choice.

### Running the development server

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Steps to run POC

1. If you try to access the API route `GET /api/secure/info` without a valid JWT token, you'll get a 401 Unauthorized response.
2. Generate a JWT token by calling API `POST /api/auth` with a request data containing `user` and `ttl` (optional).
3. Usign the generated token, call the API `GET /api/secure/info` with the token in the Authorization header (`Authorization: Bearer <token>`).
4. You'll be able to access the endpoint successfully.
5. Now, If you try to access the API route `GET /api/secure/info` with an invalid JWT token, you'll get a 401 Unauthorized response.

## API Routes

There are two API routes in this project that use the `jwt-library`:

### Generate JWT Token

`POST /api/auth`

- **Descripiton**: This route is used to generate a JWT token for a user. The user details are hardcoded in the route. The token is generated using the `encode_jwt` method of the `jwt-library`.
- **Request**:
  - `user`: The user details to generate the token for.
  - `ttl`: (Optional) The time-to-live of the token in seconds.
- **Response**: A JSON object containing
  - `token`: The generated JWT token.
  - `expiresAt`: The expiry time of the token.
- **Status Codes**:
  - `200`: The token was generated successfully.
  - `400`: The request was invalid.
  - `405`: The method is not allowed.

**Example**

```http
POST /api/auth HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

Request:
{
   "user": "test-user"
}

Response:
{
   "token": <token>,
   "expiresAt": <expiry-time>
}
```

### Secure Endpoint, Validate JWT Token

`GET /api/secure/info`:

- **Description**: A secure endpoint that requires a valid JWT token to access. The token is validated using the `decode_jwt` method of the `jwt-library`.
- **Request**: The request should contain the JWT token in the `Authorization` header.
  - `Authorization: Bearer <token>`
- **Response**: A JSON object containing the info details extracted from the token.
- **Status Codes**:
  - `200`: The token was valid and the info was extracted.
  - `401`: The token was invalid or missing.
  - `405`: The method is not allowed.

**Example**

```http
POST /api/secure/info HTTP/1.1
Host: localhost:3000
Authorization: Bearer <token>
Content-Type: application/json
Accept: application/json

Response:
{
   "info": {
      "id": 1,
      "user": "test-user",
      "iat": <issued-at-time>,
      "exp": <expiry-time>
   }
}
```
