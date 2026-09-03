import { NextRequest } from 'next/server';
import { requirePermission, json, fail, audit } from '@/server/lib/guard';
import { Exam } from '@/server/models/Exam';

export const runtime = 'nodejs';
type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'exams.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const updates = await req.json().catch(() => ({}));
  delete updates._id;
  const exam = await Exam.findByIdAndUpdate(id, updates, { new: true });
  if (!exam) return fail('Exam not found', 404);

  await audit(g.session, 'update', 'Exam', exam.name, updates);
  return json({ success: true, item: { ...exam.toObject(), _id: String(exam._id) } });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'exams.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const exam = await Exam.findByIdAndDelete(id);
  if (!exam) return fail('Exam not found', 404);
  await audit(g.session, 'delete', 'Exam', exam.name);
  return json({ success: true, message: 'Exam deleted' });
}
