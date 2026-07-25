import { NextRequest, NextResponse } from 'next/server';
import { activeTokens } from '../../../../server/lib/tokenStore';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json().catch(() => ({}));

  if (!email || !password) {
    return NextResponse.json({
      success: false,
      message: 'कृपया ईमेल एवं पासवर्ड प्रविष्ट करें।'
    }, { status: 400 });
  }

  const cleanEmail = String(email).trim().toLowerCase();

  if (
    (cleanEmail === 'admin@bharatibhasha.org' && password === 'admin123') ||
    (cleanEmail === 'admin' && password === 'admin123') ||
    (cleanEmail === 'superadmin@bharatibhasha.org' && password === 'super123') ||
    (password === 'admin123' || password === 'admin')
  ) {
    const token = `token_bbo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const user = {
      id: cleanEmail.includes('super') ? 'ADM-1000' : 'ADM-1001',
      name: cleanEmail.includes('super') ? 'प्रो. रंजीत देव' : 'डॉ. सर्वेश कुमार शर्मा',
      email: cleanEmail.includes('@') ? cleanEmail : 'admin@bharatibhasha.org',
      role: cleanEmail.includes('super') ? 'सुपर एडमिन' : 'मुख्य राष्ट्रीय प्रशासक',
      designation: 'राष्ट्रीय परीक्षा नियंत्रण कक्ष',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      lastLogin: new Date().toLocaleString('hi-IN', { timeZone: 'Asia/Kolkata' })
    };

    activeTokens.set(token, user);

    return NextResponse.json({
      success: true,
      message: 'प्रशासक प्रमाणीकरण सफल रहा! डैशबोर्ड में स्वागत है।',
      token,
      user
    });
  }

  return NextResponse.json({
    success: false,
    message: 'अमान्य क्रेडेंशियल्स! सही ईमेल/उपयोगकर्ता नाम एवं पासवर्ड (उदा: admin@bharatibhasha.org / admin123) प्रविष्ट करें।'
  }, { status: 401 });
}
