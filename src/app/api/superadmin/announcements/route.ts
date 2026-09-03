import { NextRequest } from 'next/server';
import { requirePermission, json, fail, listParams, escapeRegex, audit } from '@/server/lib/guard';
import { Announcement } from '@/server/models/Announcement';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requirePermission(req, 'announcements.view');
  if (g.response) return g.response;

  const { page, limit, skip, q, sort } = listParams(req);
  const filter: Record<string, unknown> = {};
  if (q) filter.$or = [{ title: new RegExp(escapeRegex(q), 'i') }, { titleHi: new RegExp(escapeRegex(q), 'i') }];

  const [items, total] = await Promise.all([
    Announcement.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Announcement.countDocuments(filter),
  ]);

  return json({
    success: true,
    items: items.map((a) => ({ ...a, _id: String(a._id) })),
    total, page, limit, pages: Math.ceil(total / limit) || 1,
  });
}

export async function POST(req: NextRequest) {
  const g = await requirePermission(req, 'announcements.manage');
  if (g.response) return g.response;

  const body = await req.json().catch(() => ({}));
  if (!body.title && !body.titleHi) return fail('Title is required', 400);

  const item = await Announcement.create(body);
  await audit(g.session, 'create', 'Announcement', item.title);
  return json({ success: true, item: { ...item.toObject(), _id: String(item._id) } }, 201);
}
