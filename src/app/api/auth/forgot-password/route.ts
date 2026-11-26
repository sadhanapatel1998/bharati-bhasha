import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { connectToDB } from '@/server/lib/db';
import { User } from '@/server/models/User';
import { fail, json } from '@/server/lib/guard';
import { sendMail } from '@/server/lib/mailer';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const db = await connectToDB();
  if (!db) return fail('Database not configured. Set MONGODB_URI in .env.local', 503);

  const { email } = await req.json().catch(() => ({}));
  if (!email) return fail('Email is required', 400);

  const user = await User.findOne({ email: String(email).trim().toLowerCase() });
  // same response whether or not the email exists (no account enumeration)
  if (user && user.isActive) {
    const token = crypto.randomBytes(32).toString('hex');
    user.resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    user.resetTokenExpiry = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();

    const base = process.env.SITE_URL || req.nextUrl.origin;
    const link = `${base}/reset-password?token=${token}`;
    try {
      await sendMail(
        user.email,
        'Reset your password',
        `<p>Hello ${user.name},</p><p>Click below to reset your password. This link is valid for 30 minutes.</p><p><a href="${link}">Reset password</a></p>`,
        `Reset your password (valid 30 min): ${link}`
      );
    } catch (e) {
      console.error('forgot-password mail failed', e);
    }
  }
  return json({ success: true, message: 'If this email is registered, a reset link has been sent.' });
}
