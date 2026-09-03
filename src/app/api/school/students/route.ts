import { NextRequest } from 'next/server';
import { requireSchool, json, fail, listParams, escapeRegex, audit } from '@/server/lib/guard';
import { Student, nextRollNo } from '@/server/models/Student';
import { School } from '@/server/models/School';
import { getSettings } from '@/server/models/Setting';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requireSchool(req);
  if (g.response) return g.response;

  const { page, limit, skip, q, status, subject, classLevel, sort } = listParams(req);
  const filter: Record<string, unknown> = { schoolId: g.session.schoolId };
  if (status) filter.status = status;
  if (subject) filter.subject = subject;
  if (classLevel) filter.classLevel = classLevel;
  if (q) {
    const rx = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ name: rx }, { rollNo: rx }, { fatherName: rx }];
  }

  const [items, total] = await Promise.all([
    Student.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Student.countDocuments(filter),
  ]);

  return json({
    success: true,
    items: items.map((s) => ({ ...s, _id: String(s._id), schoolId: String(s.schoolId) })),
    total, page, limit, pages: Math.ceil(total / limit) || 1,
  });
}

export async function POST(req: NextRequest) {
  const g = await requireSchool(req);
  if (g.response) return g.response;

  const body = await req.json().catch(() => ({}));
  if (!body.name || !body.classLevel) return fail('Student name and class are required', 400);

  const school = await School.findById(g.session.schoolId);
  if (!school) return fail('School not found', 404);
  if (school.status === 'suspended' || school.status === 'rejected') {
    return fail('Your school account is not active', 403);
  }

  const settings = await getSettings();

  const student = await Student.create({
    name: body.name,
    fatherName: body.fatherName,
    motherName: body.motherName,
    dob: body.dob,
    gender: body.gender,
    classLevel: body.classLevel,
    section: body.section,
    subject: body.subject || 'hindi',
    phone: body.phone,
    email: body.email,
    examCenter: body.examCenter,
    rollNo: await nextRollNo(settings.currentSession),
    schoolId: school._id,
    schoolName: school.name,
    session: settings.currentSession,
    status: 'rollAllotted',
  });

  await School.updateOne({ _id: school._id }, { $inc: { studentCount: 1 } });
  await audit(g.session, 'create', 'Student', student.name);

  return json({ success: true, item: { ...student.toObject(), _id: String(student._id) } }, 201);
}
