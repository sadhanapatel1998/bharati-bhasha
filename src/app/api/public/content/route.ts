import { NextRequest } from 'next/server';
import { connectToDB } from '@/server/lib/db';
import { SiteContent } from '@/server/models/SiteContent';
import { json } from '@/server/lib/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/public/content?keys=faqs,testimonials
 * Returns only what has been saved in the DB. The client merges this over the
 * original static data, so a missing key simply keeps the existing content.
 */
export async function GET(req: NextRequest) {
  const db = await connectToDB();
  if (!db) return json({ success: true, content: {} });

  const keysParam = (req.nextUrl.searchParams.get('keys') || '').trim();
  const filter: Record<string, unknown> = { isPublished: true };
  if (keysParam) filter.key = { $in: keysParam.split(',').map((k) => k.trim()).filter(Boolean) };

  const docs = await SiteContent.find(filter).select('key data').lean();
  const content: Record<string, unknown> = {};
  docs.forEach((d) => {
    content[d.key as string] = d.data;
  });

  return json({ success: true, content });
}
