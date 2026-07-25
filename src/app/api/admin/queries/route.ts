import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../server/models/dataStore';

export async function GET(req: NextRequest) {
  const list = dbStore.getQueries();
  return NextResponse.json({ success: true, count: list.length, data: list });
}
