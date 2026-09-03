import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/server/lib/db';
import { School, nextSchoolCode } from '@/server/models/School';
import { User } from '@/server/models/User';
import { getSettings } from '@/server/models/Setting';
import { json, fail } from '@/server/lib/guard';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const db = await connectToDB();
  if (!db) return fail('Database not configured. Set MONGODB_URI in .env.local', 503);

  const body = await req.json().catch(() => ({}));
  const {
    schoolName,
    principal,
    email,
    phone,
    password,
    board,
    address,
    city,
    state,
    pincode,
    subjects,
  } = body || {};

  if (!schoolName || !email || !password) return fail('School name, email and password are required', 400);
  if (String(password).length < 6) return fail('Password must be at least 6 characters', 400);

  const cleanEmail = String(email).trim().toLowerCase();

  const settings = await getSettings();
  if (!settings.registrationOpen) return fail('School registration is currently closed', 403);

  const exists = await User.findOne({ email: cleanEmail });
  if (exists) return fail('This email is already registered', 409);

  const code = await nextSchoolCode(String(state || 'IN'));

  const school = await School.create({
    code,
    name: String(schoolName).trim(),
    principal,
    email: cleanEmail,
    phone,
    board: board || 'CBSE',
    address,
    city,
    state,
    pincode,
    subjects: Array.isArray(subjects) ? subjects : [],
    status: 'pending',
    session: settings.currentSession,
  });

  const passwordHash = await bcrypt.hash(String(password), 10);

  await User.create({
    name: principal || schoolName,
    email: cleanEmail,
    phone,
    passwordHash,
    role: 'school',
    designation: 'School Coordinator',
    schoolId: school._id,
  });

  return json({
    success: true,
    message: 'School registered successfully',
    schoolCode: code,
  }, 201);
}
