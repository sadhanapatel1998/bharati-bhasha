import { NextRequest, NextResponse } from 'next/server';
import { activeTokens } from '../../../../server/lib/tokenStore';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader ? authHeader.replace('Bearer ', '').trim() : req.nextUrl.searchParams.get('token');

  if (token && activeTokens.has(token)) {
    return NextResponse.json({ authenticated: true, user: activeTokens.get(token) });
  }

  return NextResponse.json({ authenticated: false, message: 'सत्र समाप्त हो गया है।' }, { status: 401 });
}
