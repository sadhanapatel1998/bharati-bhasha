import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/server/lib/db';
import { Exam } from '@/server/models/Exam';
import { EXAM_SCHEDULE } from '@/data/olympiadData';

export async function GET(req: NextRequest) {
  const db = await connectToDB();

  if (!db) {
    return NextResponse.json({ success: true, count: EXAM_SCHEDULE.length, data: EXAM_SCHEDULE, source: 'mock' });
  }

  const docs = await Exam.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, count: docs.length, data: docs, source: 'db' });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const db = await connectToDB();

  if (!db) {
    return NextResponse.json({ success: true, message: 'परीक्षा जोड़ी गई। (mock)', data: { id: String(Date.now()), ...body } }, { status: 201 });
  }

  const created = await Exam.create(body);
  return NextResponse.json({ success: true, message: 'परीक्षा जोड़ी गई।', data: created }, { status: 201 });
}
