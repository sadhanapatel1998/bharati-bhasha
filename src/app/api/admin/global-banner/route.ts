import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    data: {
      textHi: 'भारती भाषा ओलंपियाड 2026 - राष्ट्रीय स्तर पंजीकरण प्रारंभ! अंतिम तिथि: 15 अगस्त 2026',
      active: true,
      linkText: 'अभी पंजीकरण करें'
    }
  });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ success: true, message: 'ग्लोबल बैनर अद्यतन (Updated) कर दिया गया।' });
}
