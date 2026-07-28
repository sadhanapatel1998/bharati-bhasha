import { NextRequest, NextResponse } from 'next/server';
import { activeTokens } from '../../../../server/lib/tokenStore';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const body = await req.json().catch(() => ({}));
  const token = authHeader ? authHeader.replace('Bearer ', '').trim() : body?.token;

  if (token && activeTokens.has(token)) {
    activeTokens.delete(token);
  }

  const res = NextResponse.json({ success: true, message: 'सफलतापूर्वक लॉगआउट संपन्न हुआ।' });
  res.cookies.set('adminToken', '', { path: '/', maxAge: 0 });
  return res;
}
