import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../server/models/dataStore';

export async function GET(req: NextRequest) {
  const stats = dbStore.getDashboardStats();
  return NextResponse.json({
    success: true,
    data: {
      ...stats,
      serverTime: new Date().toISOString(),
      activeModule: 'भारती भाषा ओलंपियाड राष्ट्रीय प्रशासन'
    }
  });
}
