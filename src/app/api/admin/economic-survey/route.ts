import { NextRequest, NextResponse } from 'next/server';

const mockEconomicSurvey = [
  { id: 'ES-2026', title: 'भारतीय भाषा प्रोत्साहन बजट एवं राज्यवार वितरण रिपोर्ट 2026', totalFund: '₹1.25 करोड़' }
];

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, count: mockEconomicSurvey.length, data: mockEconomicSurvey });
}
