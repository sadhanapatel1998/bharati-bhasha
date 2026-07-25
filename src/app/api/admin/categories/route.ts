import { NextRequest, NextResponse } from 'next/server';

const mockCategories = [
  { id: '1', name: 'हिंदी व्याकरण', slug: 'hindi-grammar', count: 18 },
  { id: '2', name: 'संस्कृत साहित्य', slug: 'sanskrit-literature', count: 24 },
  { id: '3', name: 'परीक्षा मार्गदर्शन', slug: 'exam-guidance', count: 12 },
  { id: '4', name: 'छात्रवृत्ति व पुरस्कार', slug: 'scholarship-awards', count: 8 }
];

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, count: mockCategories.length, data: mockCategories });
}

export async function POST(req: NextRequest) {
  const { name, slug } = await req.json().catch(() => ({}));
  const newCat = {
    id: String(Date.now()),
    name: name || 'नयी श्रेणी',
    slug: slug || 'new-category',
    count: 0
  };
  return NextResponse.json({ success: true, message: 'श्रेणी जोड़ी गई।', data: newCat }, { status: 201 });
}
