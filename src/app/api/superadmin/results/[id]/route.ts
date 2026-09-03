import { NextRequest } from 'next/server';
import { requirePermission, json, fail, audit } from '@/server/lib/guard';
import { Result, gradeFor } from '@/server/models/Result';
import { recomputeRanks } from '@/server/lib/ranks';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'results.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const updates = await req.json().catch(() => ({}));
  delete updates._id;

  // publishing is a separate privilege from editing marks
  if (updates.isPublished !== undefined) {
    const pub = await requirePermission(req, 'results.publish');
    if (pub.response) return pub.response;
  }

  const result = await Result.findById(id);
  if (!result) return fail('Result not found', 404);

  Object.assign(result, updates);
  const total = result.totalMarks || 100;
  result.percentage = Math.round((result.marksObtained / total) * 10000) / 100;
  result.grade = gradeFor(result.percentage);
  await result.save();

  await recomputeRanks(result.examId ? String(result.examId) : null);
  await audit(g.session, 'update', 'Result', result.rollNo, updates);

  const fresh = await Result.findById(result._id).lean();
  return json({ success: true, item: { ...fresh, _id: String((fresh as { _id: unknown })._id) } });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'results.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const result = await Result.findByIdAndDelete(id);
  if (!result) return fail('Result not found', 404);

  await recomputeRanks(result.examId ? String(result.examId) : null);
  await audit(g.session, 'delete', 'Result', result.rollNo);
  return json({ success: true, message: 'Result deleted' });
}
