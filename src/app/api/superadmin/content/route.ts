import { NextRequest } from 'next/server';
import { requirePermission, json } from '@/server/lib/guard';
import { SiteContent } from '@/server/models/SiteContent';
import { CONTENT_BLOCKS } from '@/data/contentRegistry';

export const runtime = 'nodejs';

/** Lists every editable block. Blocks not yet seeded are returned from the
 *  original static data so the console is never empty. */
export async function GET(req: NextRequest) {
  const g = await requirePermission(req, 'content.view');
  if (g.response) return g.response;

  const group = req.nextUrl.searchParams.get('group') || '';
  const docs = await SiteContent.find({}).lean();
  const byKey = new Map(docs.map((d) => [d.key as string, d]));

  const items = CONTENT_BLOCKS.filter((b) => !group || b.group === group).map((b) => {
    const doc = byKey.get(b.key) as Record<string, unknown> | undefined;
    const value = doc?.data ?? b.fallback;
    return {
      key: b.key,
      label: b.label,
      labelHi: b.labelHi,
      group: b.group,
      shape: b.shape,
      titleField: b.titleField || null,
      seeded: Boolean(doc),
      isPublished: doc ? Boolean(doc.isPublished) : true,
      updatedAt: doc?.updatedAt || null,
      updatedBy: doc?.updatedBy || null,
      count: Array.isArray(value) ? (value as unknown[]).length : null,
    };
  });

  return json({ success: true, items, groups: [...new Set(CONTENT_BLOCKS.map((b) => b.group))] });
}
