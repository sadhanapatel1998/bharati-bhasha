import { connectToDB } from '@/server/lib/db';
import { Announcement } from '@/server/models/Announcement';
import { json } from '@/server/lib/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await connectToDB();
  if (!db) return json({ success: true, items: [] });

  const items = await Announcement.find({ isPublished: true }).sort({ createdAt: -1 }).limit(10).lean();
  return json({ success: true, items: items.map((a) => ({ ...a, _id: String(a._id) })) });
}
