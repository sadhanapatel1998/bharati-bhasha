import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/server/lib/db';
import { Category } from '@/server/models/Category';

const mockCategories = [
  { id: '1', name: 'हिंदी व्याकरण', slug: 'hindi-grammar', count: 18 },
  { id: '2', name: 'संस्कृत साहित्य', slug: 'sanskrit-literature', count: 24 },
  { id: '3', name: 'परीक्षा मार्गदर्शन', slug: 'exam-guidance', count: 12 },
  { id: '4', name: 'छात्रवृत्ति व पुरस्कार', slug: 'scholarship-awards', count: 8 }
];

export async function GET(req: NextRequest) {
  const db = await connectToDB();

  if (!db) {
    return NextResponse.json({ success: true, count: mockCategories.length, data: mockCategories, source: 'mock' });
  }

  const docs = await Category.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, count: docs.length, data: docs, source: 'db' });
}

export async function POST(req: NextRequest) {
  const { name, slug } = await req.json().catch(() => ({}));
  const db = await connectToDB();

  if (!db) {
    const newCat = { id: String(Date.now()), name: name || 'नयी श्रेणी', slug: slug || 'new-category', count: 0 };
    return NextResponse.json({ success: true, message: 'श्रेणी जोड़ी गई। (mock)', data: newCat }, { status: 201 });
  }

  const created = await Category.create({ name: name || 'नयी श्रेणी', slug: slug || `cat-${Date.now()}`, count: 0 });
  return NextResponse.json({ success: true, message: 'श्रेणी जोड़ी गई।', data: created }, { status: 201 });
}
