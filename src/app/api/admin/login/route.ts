import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { activeTokens } from '../../../../server/lib/tokenStore';
import { connectToDB } from '@/server/lib/db';
import { Admin } from '@/server/models/Admin';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json().catch(() => ({}));

  if (!email || !password) {
    return NextResponse.json({
      success: false,
      message: 'कृपया ईमेल एवं पासवर्ड प्रविष्ट करें।'
    }, { status: 400 });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const db = await connectToDB();

  let user: {
    id: string;
    name: string;
    email: string;
    role: string;
    designation?: string;
    avatar?: string;
    lastLogin?: string;
  } | null = null;

  if (db) {
    // Real DB-backed admin auth.
    const adminDoc = await Admin.findOne({ email: cleanEmail });
    if (adminDoc && (await bcrypt.compare(password, adminDoc.passwordHash))) {
      const lastLogin = new Date().toLocaleString('hi-IN', { timeZone: 'Asia/Kolkata' });
      adminDoc.lastLogin = lastLogin;
      await adminDoc.save();

      user = {
        id: String(adminDoc._id),
        name: adminDoc.name,
        email: adminDoc.email,
        role: adminDoc.role,
        designation: adminDoc.designation,
        avatar: adminDoc.avatar,
        lastLogin,
      };
    }
  } else {
    // No DB configured — demo-only fallback so the dashboard is still explorable.
    if (cleanEmail === 'admin@bharatibhasha.org' && password === 'admin123') {
      user = {
        id: 'ADM-1001',
        name: 'डॉ. सर्वेश कुमार शर्मा',
        email: cleanEmail,
        role: 'मुख्य राष्ट्रीय प्रशासक',
        designation: 'राष्ट्रीय परीक्षा नियंत्रण कक्ष (Demo Mode)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
        lastLogin: new Date().toLocaleString('hi-IN', { timeZone: 'Asia/Kolkata' }),
      };
    }
  }

  if (!user) {
    return NextResponse.json({
      success: false,
      message: 'अमान्य क्रेडेंशियल्स! कृपया सही ईमेल व पासवर्ड प्रविष्ट करें।'
    }, { status: 401 });
  }

  const token = `token_bbo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  activeTokens.set(token, user);

  const res = NextResponse.json({
    success: true,
    message: db
      ? 'प्रशासक प्रमाणीकरण सफल रहा! डैशबोर्ड में स्वागत है।'
      : 'प्रशासक प्रमाणीकरण सफल रहा! (डेमो मोड — कोई डेटाबेस कनेक्ट नहीं है)',
    token,
    user
  });

  res.cookies.set('adminToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
