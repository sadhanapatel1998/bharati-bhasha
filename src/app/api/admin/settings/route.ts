import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../server/models/dataStore';

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, data: dbStore.getSettings() });
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const updated = dbStore.updateSettings(body || {});
  return NextResponse.json({ success: true, message: 'साइट सेटिंग्स अद्यतन हुईं।', data: updated });
}
