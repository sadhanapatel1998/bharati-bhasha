import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { requirePermission, json, fail, listParams, escapeRegex, audit } from '@/server/lib/guard';
import { User } from '@/server/models/User';
import { normalizePermissions, DEFAULT_ADMIN_PERMISSIONS } from '@/server/lib/permissions';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requirePermission(req, 'admins.view');
  if (g.response) return g.response;

  const { page, limit, skip, q, sort } = listParams(req);
  const filter: Record<string, unknown> = { role: { $in: ['superadmin', 'admin'] } };
  if (q) {
    const rx = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ name: rx }, { email: rx }];
  }

  const [items, total] = await Promise.all([
    User.find(filter).select('-passwordHash').sort(sort).skip(skip).limit(limit).lean(),
    User.countDocuments(filter),
  ]);

  return json({
    success: true,
    items: items.map((u) => ({ ...u, _id: String(u._id) })),
    total, page, limit, pages: Math.ceil(total / limit) || 1,
  });
}

export async function POST(req: NextRequest) {
  const g = await requirePermission(req, 'admins.manage');
  if (g.response) return g.response;

  const body = await req.json().catch(() => ({}));
  if (!body.name || !body.email || !body.password) return fail('Name, email and password are required', 400);
  if (String(body.password).length < 6) return fail('Password must be at least 6 characters', 400);

  const email = String(body.email).trim().toLowerCase();
  if (await User.findOne({ email })) return fail('This email is already registered', 409);

  const user = await User.create({
    name: body.name,
    email,
    phone: body.phone,
    designation: body.designation,
    role: body.role === 'superadmin' ? 'superadmin' : 'admin',
    permissions:
      body.role === 'superadmin'
        ? []
        : normalizePermissions(Array.isArray(body.permissions) ? body.permissions : DEFAULT_ADMIN_PERMISSIONS),
    passwordHash: await bcrypt.hash(String(body.password), 10),
  });

  await audit(g.session, 'create', 'AdminUser', user.email);
  const obj = user.toObject();
  delete obj.passwordHash;
  return json({ success: true, item: { ...obj, _id: String(user._id) } }, 201);
}
