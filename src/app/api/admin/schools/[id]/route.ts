import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../../server/models/dataStore';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const updated = dbStore.updateSchool(id, body);
  if (updated) {
    return NextResponse.json({ success: true, message: 'विद्यालय विवरण अद्यतन (Update) हुआ।', data: updated });
  }
  return NextResponse.json({ success: false, message: 'विद्यालय नहीं मिला।' }, { status: 404 });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  dbStore.deleteSchool(id);
  return NextResponse.json({ success: true, message: 'विद्यालय अभिलेख हटा दिया गया।' });
}
