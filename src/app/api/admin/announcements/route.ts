import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../server/models/dataStore';

export async function GET(req: NextRequest) {
  const list = dbStore.getAnnouncements();
  return NextResponse.json({ success: true, count: list.length, data: list });
}

export async function POST(req: NextRequest) {
  const { title, category, targetAudience, content, status } = await req.json().catch(() => ({}));
  if (!title || !content) {
    return NextResponse.json({ success: false, message: 'शीर्षक एवं विवरण सामग्री अनिवार्य है।' }, { status: 400 });
  }

  const newAnn = dbStore.addAnnouncement({
    title,
    category: category || 'सामान्य सूचना',
    targetAudience: targetAudience || 'सभी विद्यालय',
    content,
    status: status || 'प्रकाशित'
  });

  return NextResponse.json({ success: true, message: 'नई घोषणा प्रकाशित की गई।', data: newAnn }, { status: 201 });
}
