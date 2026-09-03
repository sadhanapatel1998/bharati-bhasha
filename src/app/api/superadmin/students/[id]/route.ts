import { NextRequest } from 'next/server';
import { requirePermission, json, fail, audit } from '@/server/lib/guard';
import { Student } from '@/server/models/Student';
import { School } from '@/server/models/School';
import { Result } from '@/server/models/Result';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'students.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const updates = await req.json().catch(() => ({}));
  delete updates._id;

  if (updates.schoolId) {
    const school = await School.findById(updates.schoolId);
    if (!school) return fail('School not found', 404);
    updates.schoolName = school.name;
  }

  const student = await Student.findByIdAndUpdate(id, updates, { new: true });
  if (!student) return fail('Student not found', 404);

  await Result.updateMany(
    { studentId: student._id },
    { studentName: student.name, classLevel: student.classLevel, subject: student.subject }
  );

  await audit(g.session, 'update', 'Student', student.name, updates);
  return json({ success: true, item: { ...student.toObject(), _id: String(student._id) } });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'students.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const student = await Student.findByIdAndDelete(id);
  if (!student) return fail('Student not found', 404);

  await Result.deleteMany({ studentId: id });
  await School.updateOne(
    { _id: student.schoolId },
    { studentCount: await Student.countDocuments({ schoolId: student.schoolId }) }
  );
  await audit(g.session, 'delete', 'Student', student.name);

  return json({ success: true, message: 'Student deleted' });
}
