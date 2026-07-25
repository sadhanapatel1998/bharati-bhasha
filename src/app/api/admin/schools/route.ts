import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../server/models/dataStore';

export async function GET(req: NextRequest) {
  const schools = dbStore.getSchools();
  return NextResponse.json({ success: true, count: schools.length, data: schools });
}

export async function POST(req: NextRequest) {
  const { name, principal, phone, email, city, state, enrolledStudents, board } = await req.json().catch(() => ({}));
  if (!name || !city || !state) {
    return NextResponse.json({ success: false, message: 'विद्यालय का नाम, शहर एवं राज्य अनिवार्य हैं।' }, { status: 400 });
  }

  const newSchool = dbStore.addSchool({
    name,
    principal: principal || 'अज्ञात प्रधानाचार्य',
    phone: phone || '+91 90000 00000',
    email: email || 'school@edu.in',
    city,
    state,
    address: `${city}, ${state}`,
    pincode: '110001',
    enrolledStudents: Number(enrolledStudents) || 100,
    status: 'सक्रिय',
    board: board || 'CBSE'
  });

  return NextResponse.json({ success: true, message: 'विद्यालय सफलतापूर्वक पंजीकृत हुआ।', data: newSchool }, { status: 201 });
}
