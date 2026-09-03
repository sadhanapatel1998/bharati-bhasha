import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { requirePermission, json, fail, audit } from '@/server/lib/guard';
import { School } from '@/server/models/School';
import { User } from '@/server/models/User';
import { Student } from '@/server/models/Student';
import { Result } from '@/server/models/Result';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'schools.view');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const school = await School.findById(id).lean();
  if (!school) return fail('School not found', 404);

  const [studentCount, resultCount] = await Promise.all([
    Student.countDocuments({ schoolId: id }),
    Result.countDocuments({ schoolId: id }),
  ]);

  return json({ success: true, item: { ...school, _id: String((school as { _id: unknown })._id) }, studentCount, resultCount });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'schools.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const body = await req.json().catch(() => ({}));
  const { newPassword, ...updates } = body || {};

  if (updates.status === 'active') updates.approvedAt = new Date();
  delete updates._id;
  delete updates.code;

  const school = await School.findByIdAndUpdate(id, updates, { new: true });
  if (!school) return fail('School not found', 404);

  // status change must propagate to the login account
  if (updates.status) {
    await User.updateMany(
      { schoolId: school._id },
      { isActive: updates.status !== 'suspended' && updates.status !== 'rejected' }
    );
  }

  if (newPassword) {
    if (String(newPassword).length < 6) return fail('Password must be at least 6 characters', 400);
    await User.updateOne(
      { schoolId: school._id, role: 'school' },
      { passwordHash: await bcrypt.hash(String(newPassword), 10) }
    );
  }

  await audit(g.session, 'update', 'School', school.name, updates);
  return json({ success: true, item: { ...school.toObject(), _id: String(school._id) } });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'schools.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const school = await School.findByIdAndDelete(id);
  if (!school) return fail('School not found', 404);

  await Promise.all([
    User.deleteMany({ schoolId: id }),
    Student.deleteMany({ schoolId: id }),
    Result.deleteMany({ schoolId: id }),
  ]);

  await audit(g.session, 'delete', 'School', school.name);
  return json({ success: true, message: 'School and all linked records deleted' });
}
