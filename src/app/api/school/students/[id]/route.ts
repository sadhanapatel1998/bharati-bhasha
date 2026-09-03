import { NextRequest } from 'next/server';
import { requireSchool, json, fail, audit } from '@/server/lib/guard';
import { Student } from '@/server/models/Student';
import { School } from '@/server/models/School';
import { Result } from '@/server/models/Result';

export const runtime = 'nodejs';
type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const g = await requireSchool(req);
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const body = await req.json().catch(() => ({}));
  const allowed = ['name', 'fatherName', 'motherName', 'dob', 'gender', 'classLevel', 'section', 'subject', 'phone', 'email', 'examCenter'];
  const updates: Record<string, unknown> = {};
  allowed.forEach((k) => {
    if (body[k] !== undefined) updates[k] = body[k];
  });

  const student = await Student.findOneAndUpdate(
    { _id: id, schoolId: g.session.schoolId },
    updates,
    { new: true }
  );
  if (!student) return fail('Student not found', 404);

  await Result.updateMany({ studentId: student._id }, { studentName: student.name, classLevel: student.classLevel });
  await audit(g.session, 'update', 'Student', student.name, updates);
  return json({ success: true, item: { ...student.toObject(), _id: String(student._id) } });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const g = await requireSchool(req);
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const student = await Student.findOneAndDelete({ _id: id, schoolId: g.session.schoolId });
  if (!student) return fail('Student not found', 404);

  await Result.deleteMany({ studentId: id });
  await School.updateOne(
    { _id: g.session.schoolId },
    { studentCount: await Student.countDocuments({ schoolId: g.session.schoolId }) }
  );
  await audit(g.session, 'delete', 'Student', student.name);

  return json({ success: true, message: 'Student deleted' });
}
