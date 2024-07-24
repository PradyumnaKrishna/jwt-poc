import type { NextApiRequest, NextApiResponse } from 'next';

// Import the jwt-library as npm package if installed.
// import * as jwt from 'jwt-library';

// Import the jwt-library as vendor package if not installed.
import * as jwt from '@/vendor/jwt-library';

type ResponseData = {
  info: Object;
};

type ErrorResponse = {
  error: string;
  details?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorResponse>
) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in env.');
  }

  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Unauthorized', details: 'Authorization header is missing' });
      return;
    }
    const validate = jwt.validate_jwt(secret, token);
    if (!validate) {
      res.status(401).json({ error: 'Unauthorized', details: 'Invalid token' });
      return;
    }
    const payload = jwt.decode_jwt(secret, token);
    res.status(200).json({ info: payload });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
