import { NextRequest } from 'next/server';
import { requirePermission, json, fail, audit } from '@/server/lib/guard';
import { Enquiry } from '@/server/models/Enquiry';

export const runtime = 'nodejs';
type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'enquiries.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;
  const updates = await req.json().catch(() => ({}));
  delete updates._id;

  const item = await Enquiry.findByIdAndUpdate(id, updates, { new: true });
  if (!item) return fail('Enquiry not found', 404);
  await audit(g.session, 'update', 'Enquiry', item.subject || item.name);
  return json({ success: true, item: { ...item.toObject(), _id: String(item._id) } });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'enquiries.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;
  const item = await Enquiry.findByIdAndDelete(id);
  if (!item) return fail('Enquiry not found', 404);
  await audit(g.session, 'delete', 'Enquiry', item.subject || item.name);
  return json({ success: true, message: 'Enquiry deleted' });
}
