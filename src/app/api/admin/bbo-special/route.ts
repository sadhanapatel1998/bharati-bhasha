import { NextRequest, NextResponse } from 'next/server';

const mockBboSpecialModules = [
  { id: 'BBO-SP-01', name: 'भारती भाषा राष्ट्रीय छात्रवृत्ति योजना 2026', status: 'सक्रिय' },
  { id: 'BBO-SP-02', name: 'संस्कृत व्याकरण एवं भाषा ज्ञान कार्यशाला', status: 'सक्रिय' },
  { id: 'BBO-SP-03', name: 'हिंदी भाषा मेधावी मेडल एवं प्रशस्ति पत्र वितरण', status: 'सक्रिय' }
];

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, count: mockBboSpecialModules.length, data: mockBboSpecialModules });
}
