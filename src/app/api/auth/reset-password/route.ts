import { NextRequest } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/server/lib/db';
import { User } from '@/server/models/User';
import { fail, json } from '@/server/lib/guard';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const db = await connectToDB();
  if (!db) return fail('Database not configured. Set MONGODB_URI in .env.local', 503);

  const { token, password } = await req.json().catch(() => ({}));
  if (!token || !password) return fail('Token and password are required', 400);
  if (String(password).length < 6) return fail('Password must be at least 6 characters', 400);

  const hash = crypto.createHash('sha256').update(String(token)).digest('hex');
  const user = await User.findOne({ resetTokenHash: hash, resetTokenExpiry: { $gt: new Date() } });
  if (!user) return fail('Reset link is invalid or has expired', 400);

  user.passwordHash = await bcrypt.hash(String(password), 10);
  user.resetTokenHash = null;
  user.resetTokenExpiry = null;
  await user.save();
  return json({ success: true, message: 'Password updated' });
}
