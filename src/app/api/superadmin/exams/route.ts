import { NextRequest } from 'next/server';
import { requirePermission, json, fail, listParams, escapeRegex, audit } from '@/server/lib/guard';
import { Exam } from '@/server/models/Exam';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requirePermission(req, 'exams.view');
  if (g.response) return g.response;

  const { page, limit, skip, q, status, sort } = listParams(req);
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (q) filter.name = new RegExp(escapeRegex(q), 'i');

  const [items, total] = await Promise.all([
    Exam.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Exam.countDocuments(filter),
  ]);

  return json({
    success: true,
    items: items.map((e) => ({ ...e, _id: String(e._id) })),
    total, page, limit, pages: Math.ceil(total / limit) || 1,
  });
}

export async function POST(req: NextRequest) {
  const g = await requirePermission(req, 'exams.manage');
  if (g.response) return g.response;

  const body = await req.json().catch(() => ({}));
  if (!body.name) return fail('Exam name is required', 400);

  const exam = await Exam.create(body);
  await audit(g.session, 'create', 'Exam', exam.name);
  return json({ success: true, item: { ...exam.toObject(), _id: String(exam._id) } }, 201);
}
