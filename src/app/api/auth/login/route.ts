import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/server/lib/db';
import { User } from '@/server/models/User';
import { School } from '@/server/models/School';
import { signSession, cookieOptions, SESSION_COOKIE, homeForRole, Role } from '@/server/lib/auth';
import { fail } from '@/server/lib/guard';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const db = await connectToDB();
  if (!db) return fail('Database not configured. Set MONGODB_URI in .env.local', 503);

  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) return fail('Email and password are required', 400);

  const cleanEmail = String(email).trim().toLowerCase();
  const user = await User.findOne({ email: cleanEmail });
  if (!user) return fail('Invalid email or password', 401);

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) return fail('Invalid email or password', 401);
  if (!user.isActive) return fail('This account has been suspended', 403);

  let school: Record<string, unknown> | null = null;
  if (user.role === 'school' && user.schoolId) {
    school = (await School.findById(user.schoolId).lean()) as Record<string, unknown> | null;
    if (school && (school as { status?: string }).status === 'suspended') {
      return fail('This account has been suspended', 403);
    }
  }

  user.lastLogin = new Date();
  await user.save();

  const token = await signSession({
    sub: String(user._id),
    email: user.email,
    name: user.name,
    role: user.role as Role,
    schoolId: user.schoolId ? String(user.schoolId) : null,
    permissions: user.role === 'admin' ? (user.permissions || []) : [],
  });

  const res = NextResponse.json({
    success: true,
    message: 'Signed in',
    redirect: homeForRole(user.role as Role),
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.role === 'admin' ? user.permissions || [] : [],
      designation: user.designation,
      avatar: user.avatar,
      schoolId: user.schoolId ? String(user.schoolId) : null,
      school: school
        ? {
            id: String((school as { _id: unknown })._id),
            name: (school as { name?: string }).name,
            code: (school as { code?: string }).code,
            status: (school as { status?: string }).status,
          }
        : null,
    },
  });

  res.cookies.set(SESSION_COOKIE, token, cookieOptions);
  return res;
}
