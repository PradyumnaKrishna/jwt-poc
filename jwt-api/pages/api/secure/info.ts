import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  info: string;
};

type ErrorResponse = {
  error: string;
  details?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorResponse>
) {
  if (req.method === 'GET') {
    res.status(200).json({ info: 'Success! You have access to this secure endpoint.' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
