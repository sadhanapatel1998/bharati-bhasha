import { NextRequest } from 'next/server';
import { requirePermission, json, listParams, escapeRegex } from '@/server/lib/guard';
import { AuditLog } from '@/server/models/AuditLog';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requirePermission(req, 'audit.view');
  if (g.response) return g.response;

  const { page, limit, skip, q } = listParams(req);
  const filter: Record<string, unknown> = {};
  if (q) {
    const rx = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ actorName: rx }, { action: rx }, { entity: rx }, { entityLabel: rx }];
  }

  const [items, total] = await Promise.all([
    AuditLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    AuditLog.countDocuments(filter),
  ]);

  return json({
    success: true,
    items: items.map((a) => ({ ...a, _id: String(a._id) })),
    total, page, limit, pages: Math.ceil(total / limit) || 1,
  });
}
