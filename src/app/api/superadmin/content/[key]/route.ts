import { NextRequest } from 'next/server';
import { requirePermission, json, fail, audit } from '@/server/lib/guard';
import { SiteContent } from '@/server/models/SiteContent';
import { blockByKey } from '@/data/contentRegistry';

export const runtime = 'nodejs';
type Ctx = { params: Promise<{ key: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'content.view');
  if (g.response) return g.response;
  const { key } = await ctx.params;

  const def = blockByKey(key);
  if (!def) return fail('Unknown content block', 404);

  const doc = await SiteContent.findOne({ key }).lean();
  const d = doc as Record<string, unknown> | null;

  return json({
    success: true,
    item: {
      key,
      label: def.label,
      labelHi: def.labelHi,
      group: def.group,
      shape: def.shape,
      titleField: def.titleField || null,
      isPublished: d ? Boolean(d.isPublished) : true,
      seeded: Boolean(d),
      data: d ? d.data : def.fallback,
      // the untouched original, so the console can offer "restore default"
      original: def.fallback,
    },
  });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'content.manage');
  if (g.response) return g.response;
  const { key } = await ctx.params;

  const def = blockByKey(key);
  if (!def) return fail('Unknown content block', 404);

  const body = await req.json().catch(() => ({}));
  if (body.data === undefined) return fail('No data supplied', 400);

  const doc = await SiteContent.findOneAndUpdate(
    { key },
    {
      key,
      label: def.label,
      labelHi: def.labelHi,
      group: def.group,
      shape: def.shape,
      titleField: def.titleField || null,
      data: body.data,
      isPublished: body.isPublished === undefined ? true : Boolean(body.isPublished),
      updatedBy: g.session.name,
    },
    { new: true, upsert: true }
  );

  await audit(g.session, 'update', 'SiteContent', def.label);
  return json({ success: true, item: { ...doc.toObject(), _id: String(doc._id) } });
}

/** Restore this block to the value the website originally shipped with. */
export async function DELETE(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'content.manage');
  if (g.response) return g.response;
  const { key } = await ctx.params;

  const def = blockByKey(key);
  if (!def) return fail('Unknown content block', 404);

  await SiteContent.findOneAndUpdate(
    { key },
    { data: def.fallback, updatedBy: g.session.name },
    { upsert: true }
  );

  await audit(g.session, 'restore', 'SiteContent', def.label);
  return json({ success: true, message: 'Restored to original content', data: def.fallback });
}
