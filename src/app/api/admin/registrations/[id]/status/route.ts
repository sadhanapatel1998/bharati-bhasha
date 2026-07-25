import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../../../server/models/dataStore';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json().catch(() => ({}));

  if (!status) {
    return NextResponse.json({ success: false, message: 'नई स्थिति (Status) प्रदान करें।' }, { status: 400 });
  }

  const updated = dbStore.updateRegistrationStatus(id, status);
  if (updated) {
    return NextResponse.json({ success: true, message: `पंजीकरण स्थिति '${status}' कर दी गई।`, data: updated });
  }
  return NextResponse.json({ success: false, message: 'पंजीकरण आवेदन नहीं मिला।' }, { status: 404 });
}
