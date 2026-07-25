import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../../../server/models/dataStore';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { reply } = await req.json().catch(() => ({}));

  if (!reply) {
    return NextResponse.json({ success: false, message: 'उत्तर (Reply text) प्रदान करें।' }, { status: 400 });
  }

  const updated = dbStore.replyQuery(id, reply);
  if (updated) {
    return NextResponse.json({ success: true, message: 'उत्तर सफलतापूर्वक प्रेषित व दर्ज किया गया।', data: updated });
  }
  return NextResponse.json({ success: false, message: 'जिज्ञासा / प्रश्न नहीं मिला।' }, { status: 404 });
}
