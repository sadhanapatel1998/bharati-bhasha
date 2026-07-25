import { NextRequest, NextResponse } from 'next/server';

const mockELearning = [
  { id: 'EL-01', title: 'कक्षा 5 से 12 हेतु संपूर्ण ई-पुस्तिकाएं एवं उत्तर कुंजी', format: 'PDF', downloads: 12400 },
  { id: 'EL-02', title: 'संस्कृत उच्चारणाभ्यास ऑडियो-विजुअल व्याख्यान श्रृंखला', format: 'Video/MP4', views: 28900 }
];

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, count: mockELearning.length, data: mockELearning });
}
