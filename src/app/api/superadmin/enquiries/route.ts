import { NextRequest } from 'next/server';
import { requirePermission, json, listParams, escapeRegex } from '@/server/lib/guard';
import { Enquiry } from '@/server/models/Enquiry';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requirePermission(req, 'enquiries.view');
  if (g.response) return g.response;

  const { page, limit, skip, q, status, sort } = listParams(req);
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (q) {
    const rx = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ name: rx }, { email: rx }, { subject: rx }];
  }

  const [items, total] = await Promise.all([
    Enquiry.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Enquiry.countDocuments(filter),
  ]);

  return json({
    success: true,
    items: items.map((e) => ({ ...e, _id: String(e._id) })),
    total, page, limit, pages: Math.ceil(total / limit) || 1,
  });
}
