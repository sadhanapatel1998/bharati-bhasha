import { NextRequest, NextResponse } from 'next/server';
import { activeTokens } from '../../../../server/lib/tokenStore';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const body = await req.json().catch(() => ({}));
  const token = authHeader ? authHeader.replace('Bearer ', '').trim() : body?.token;

  if (token && activeTokens.has(token)) {
    activeTokens.delete(token);
  }

  return NextResponse.json({ success: true, message: 'सफलतापूर्वक लॉगआउट संपन्न हुआ।' });
}
