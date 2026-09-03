import { NextRequest } from 'next/server';
import { requireSchool, json, listParams, escapeRegex } from '@/server/lib/guard';
import { Result } from '@/server/models/Result';

export const runtime = 'nodejs';

/** Schools may only READ results — publishing stays with the national office. */
export async function GET(req: NextRequest) {
  const g = await requireSchool(req);
  if (g.response) return g.response;

  const { page, limit, skip, q, subject, classLevel, examId, sort } = listParams(req);
  const filter: Record<string, unknown> = { schoolId: g.session.schoolId, isPublished: true };
  if (subject) filter.subject = subject;
  if (classLevel) filter.classLevel = classLevel;
  if (examId) filter.examId = examId;
  if (q) {
    const rx = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ rollNo: rx }, { studentName: rx }];
  }

  const [items, total] = await Promise.all([
    Result.find(filter).sort(sort === '-createdAt' ? { percentage: -1 } : sort).skip(skip).limit(limit).lean(),
    Result.countDocuments(filter),
  ]);

  return json({
    success: true,
    items: items.map((r) => ({ ...r, _id: String(r._id) })),
    total, page, limit, pages: Math.ceil(total / limit) || 1,
  });
}
