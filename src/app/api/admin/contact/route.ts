import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../server/models/dataStore';

export async function GET(req: NextRequest) {
  const queries = dbStore.getQueries();
  return NextResponse.json({ success: true, count: queries.length, data: queries });
}
