import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '../../../../server/models/dataStore';

export async function GET(req: NextRequest) {
  const students = dbStore.getStudents();
  return NextResponse.json({ success: true, count: students.length, data: students });
}

export async function POST(req: NextRequest) {
  const { name, fatherName, classLevel, subject, schoolName, city } = await req.json().catch(() => ({}));

  if (!name || !fatherName || !schoolName) {
    return NextResponse.json({ success: false, message: 'छात्र का नाम, पिता का नाम एवं विद्यालय नाम अनिवार्य हैं।' }, { status: 400 });
  }

  const newStudent = dbStore.addStudent({
    name,
    fatherName,
    classLevel: classLevel || 'कक्षा 5वीं',
    subject: subject || 'हिंदी',
    schoolName,
    city: city || 'नई दिल्ली'
  });

  return NextResponse.json({ success: true, message: 'छात्र रोल नंबर आवंटित एवं पंजीकृत किया गया।', data: newStudent }, { status: 201 });
}
