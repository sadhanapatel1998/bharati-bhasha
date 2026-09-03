import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { requirePermission, json, fail, listParams, escapeRegex, audit } from '@/server/lib/guard';
import { School, nextSchoolCode } from '@/server/models/School';
import { User } from '@/server/models/User';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requirePermission(req, 'schools.view');
  if (g.response) return g.response;

  const { page, limit, skip, q, status, sort } = listParams(req);
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (q) {
    const rx = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ name: rx }, { code: rx }, { city: rx }, { state: rx }, { email: rx }, { principal: rx }];
  }

  const [items, total] = await Promise.all([
    School.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    School.countDocuments(filter),
  ]);

  return json({
    success: true,
    items: items.map((s) => ({ ...s, _id: String(s._id) })),
    total,
    page,
    limit,
    pages: Math.ceil(total / limit) || 1,
  });
}

export async function POST(req: NextRequest) {
  const g = await requirePermission(req, 'schools.manage');
  if (g.response) return g.response;

  const body = await req.json().catch(() => ({}));
  if (!body.name || !body.email) return fail('School name and email are required', 400);

  const email = String(body.email).trim().toLowerCase();
  if (await User.findOne({ email })) return fail('This email is already registered', 409);

  const school = await School.create({
    ...body,
    email,
    code: body.code || (await nextSchoolCode(String(body.state || 'IN'))),
    status: body.status || 'active',
    approvedAt: (body.status || 'active') === 'active' ? new Date() : null,
  });

  const password = body.password || 'school@123';
  await User.create({
    name: body.principal || body.name,
    email,
    phone: body.phone,
    passwordHash: await bcrypt.hash(String(password), 10),
    role: 'school',
    designation: 'School Coordinator',
    schoolId: school._id,
  });

  await audit(g.session, 'create', 'School', school.name);
  return json({ success: true, item: { ...school.toObject(), _id: String(school._id) }, tempPassword: password }, 201);
}
