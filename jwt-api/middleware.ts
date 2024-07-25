import { NextRequest, NextResponse } from 'next/server';

import * as jwt from '@/vendor/jwt-library';

export async function middleware(req: NextRequest) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('`JWT_SECRET` is not set in env.');
  }

  let token = req.headers.get('authorization');
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized', details: 'Missing token' }, { status: 401 });
  }

  token = token.split(' ')[1];
  const validate = await jwt.validate_jwt(secret, token);
  console.log(validate);
  if (!validate) {
    return NextResponse.json({ error: 'Unauthorized', details: 'Invalid token' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/secure/:path*'],
};
