import { NextRequest, NextResponse } from 'next/server';

const mockELearnings = [
  { id: '1', title: 'हिंदी भाषा ओलंपियाड कक्षा 5-8 संपूर्ण ई-बुक', format: 'PDF', status: 'सक्रिय' },
  { id: '2', title: 'संस्कृत व्याकरण प्रश्न बैंक 2026', format: 'PDF/EPUB', status: 'सक्रिय' }
];

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, count: mockELearnings.length, data: mockELearnings });
}
