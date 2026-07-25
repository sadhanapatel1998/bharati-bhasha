import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../server/models/dataStore';

export async function GET(req: NextRequest) {
  const regs = dbStore.getRegistrations();
  return NextResponse.json({ success: true, count: regs.length, data: regs });
}
