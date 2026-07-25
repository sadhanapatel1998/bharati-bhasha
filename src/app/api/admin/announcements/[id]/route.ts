import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../../server/models/dataStore';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  dbStore.deleteAnnouncement(id);
  return NextResponse.json({ success: true, message: 'घोषणा हटा दी गई।' });
}
