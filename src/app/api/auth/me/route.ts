import { NextRequest } from 'next/server';
import { connectToDB } from '@/server/lib/db';
import { User } from '@/server/models/User';
import { School } from '@/server/models/School';
import { getSession, json, fail } from '@/server/lib/guard';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const session = await getSession(req);
  if (!session) return fail('Not authenticated', 401);

  const db = await connectToDB();
  if (!db) return fail('Database not configured', 503);

  const user = await User.findById(session.sub).lean();
  if (!user) return fail('Not authenticated', 401);

  const u = user as Record<string, unknown>;
  let school: Record<string, unknown> | null = null;
  if (u.schoolId) {
    const s = await School.findById(u.schoolId).lean();
    if (s) {
      const sd = s as Record<string, unknown>;
      school = { id: String(sd._id), name: sd.name, code: sd.code, status: sd.status, city: sd.city, state: sd.state };
    }
  }

  return json({
    authenticated: true,
    user: {
      id: String(u._id),
      name: u.name,
      email: u.email,
      role: u.role,
      permissions: u.role === 'admin' ? u.permissions || [] : [],
      designation: u.designation,
      avatar: u.avatar,
      lastLogin: u.lastLogin,
      schoolId: u.schoolId ? String(u.schoolId) : null,
      school,
    },
  });
}
