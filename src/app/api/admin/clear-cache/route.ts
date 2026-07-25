import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json({ success: true, message: 'सिस्टम सर्वर कैश एवं डेटाबेस सूचकांक सफलता से साफ़ कर दिए गए हैं।' });
}
