import { NextRequest } from 'next/server';
import { requireSchool, json, fail, audit } from '@/server/lib/guard';
import { School } from '@/server/models/School';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requireSchool(req);
  if (g.response) return g.response;

  const school = await School.findById(g.session.schoolId).lean();
  if (!school) return fail('School not found', 404);
  return json({ success: true, item: { ...school, _id: String((school as { _id: unknown })._id) } });
}

export async function PATCH(req: NextRequest) {
  const g = await requireSchool(req);
  if (g.response) return g.response;

  const body = await req.json().catch(() => ({}));
  // a school may never change its own code, status or student counters
  const allowed = ['name', 'nameHi', 'principal', 'phone', 'board', 'address', 'city', 'state', 'pincode', 'website', 'logo', 'subjects'];
  const updates: Record<string, unknown> = {};
  allowed.forEach((k) => {
    if (body[k] !== undefined) updates[k] = body[k];
  });

  const school = await School.findByIdAndUpdate(g.session.schoolId, updates, { new: true });
  if (!school) return fail('School not found', 404);

  await audit(g.session, 'update', 'SchoolProfile', school.name, updates);
  return json({ success: true, item: { ...school.toObject(), _id: String(school._id) } });
}
