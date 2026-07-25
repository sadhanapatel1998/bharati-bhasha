import { NextRequest, NextResponse } from 'next/server';

const mockCategories = [
  { id: '1', name: 'हिंदी भाषा एवं साहित्य', slug: 'hindi-literature' },
  { id: '2', name: 'संस्कृत व्याकरण एवं वेदांत', slug: 'sanskrit-grammar' },
  { id: '3', name: 'राष्ट्रीय शिक्षा नीति 2020', slug: 'nep-2020' }
];

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, count: mockCategories.length, data: mockCategories });
}

export async function POST(req: NextRequest) {
  const { name } = await req.json().catch(() => ({}));
  return NextResponse.json({ success: true, message: 'श्रेणी निर्मित की गई।', data: { id: String(Date.now()), name } }, { status: 201 });
}
