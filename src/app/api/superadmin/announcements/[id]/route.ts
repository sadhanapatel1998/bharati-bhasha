import { NextRequest } from 'next/server';
import { requirePermission, json, fail, audit } from '@/server/lib/guard';
import { Announcement } from '@/server/models/Announcement';

export const runtime = 'nodejs';
type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'announcements.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;
  const updates = await req.json().catch(() => ({}));
  delete updates._id;

  const item = await Announcement.findByIdAndUpdate(id, updates, { new: true });
  if (!item) return fail('Announcement not found', 404);
  await audit(g.session, 'update', 'Announcement', item.title, updates);
  return json({ success: true, item: { ...item.toObject(), _id: String(item._id) } });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'announcements.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;
  const item = await Announcement.findByIdAndDelete(id);
  if (!item) return fail('Announcement not found', 404);
  await audit(g.session, 'delete', 'Announcement', item.title);
  return json({ success: true, message: 'Announcement deleted' });
}
