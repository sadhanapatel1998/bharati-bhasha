import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { requirePermission, json, fail, audit } from '@/server/lib/guard';
import { User } from '@/server/models/User';
import { normalizePermissions } from '@/server/lib/permissions';

export const runtime = 'nodejs';
type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'admins.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  const body = await req.json().catch(() => ({}));
  const updates: Record<string, unknown> = {};
  ['name', 'phone', 'designation', 'avatar', 'isActive'].forEach((k) => {
    if (body[k] !== undefined) updates[k] = body[k];
  });
  if (body.role === 'admin' || body.role === 'superadmin') updates.role = body.role;
  if (Array.isArray(body.permissions)) {
    updates.permissions = body.role === 'superadmin' ? [] : normalizePermissions(body.permissions);
  }
  if (body.password) {
    if (String(body.password).length < 6) return fail('Password must be at least 6 characters', 400);
    updates.passwordHash = await bcrypt.hash(String(body.password), 10);
  }

  const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-passwordHash');
  if (!user) return fail('Admin not found', 404);

  await audit(g.session, 'update', 'AdminUser', user.email);
  return json({ success: true, item: { ...user.toObject(), _id: String(user._id) } });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const g = await requirePermission(req, 'admins.manage');
  if (g.response) return g.response;
  const { id } = await ctx.params;

  if (id === g.session.sub) return fail('You cannot delete your own account', 400);

  const user = await User.findOneAndDelete({ _id: id, role: { $in: ['superadmin', 'admin'] } });
  if (!user) return fail('Admin not found', 404);

  await audit(g.session, 'delete', 'AdminUser', user.email);
  return json({ success: true, message: 'Admin deleted' });
}
