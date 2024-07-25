import type { NextApiRequest, NextApiResponse } from 'next';
import { randomInt } from 'crypto';

// Import the jwt-library as npm package if installed.
// import * as jwt from 'jwt-library';

// Import the jwt-library as vendor package if not installed.
import * as jwt from '@/vendor/jwt-library';

type ResponseData = {
  token: string;
  expiresAt: Date;
};

type ErrorResponse = {
  error: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorResponse>
) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in env.');
  }
  if (req.method === 'POST') {
    const data = req.body;
    if (!data.user) {
      res.status(400).json({ error: 'Bad Request', details: '`user` is required' });
      return;
    }
    const ttl = data.ttl || 3600;
    const expiresAt = new Date(Date.now() + ttl * 1000);
    const token = await jwt.encode_jwt(secret, randomInt(1000), { name: data.user }, data.ttl);
    res.status(200).json({ token, expiresAt });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
