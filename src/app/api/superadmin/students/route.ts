import { NextRequest } from 'next/server';
import { requirePermission, json, fail, listParams, escapeRegex, audit } from '@/server/lib/guard';
import { Student, nextRollNo } from '@/server/models/Student';
import { School } from '@/server/models/School';
import { getSettings } from '@/server/models/Setting';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requirePermission(req, 'students.view');
  if (g.response) return g.response;

  const { page, limit, skip, q, status, schoolId, subject, classLevel, sort } = listParams(req);
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (schoolId) filter.schoolId = schoolId;
  if (subject) filter.subject = subject;
  if (classLevel) filter.classLevel = classLevel;
  if (q) {
    const rx = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ name: rx }, { rollNo: rx }, { fatherName: rx }, { schoolName: rx }];
  }

  const [items, total] = await Promise.all([
    Student.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Student.countDocuments(filter),
  ]);

  return json({
    success: true,
    items: items.map((s) => ({ ...s, _id: String(s._id), schoolId: String(s.schoolId) })),
    total,
    page,
    limit,
    pages: Math.ceil(total / limit) || 1,
  });
}

export async function POST(req: NextRequest) {
  const g = await requirePermission(req, 'students.manage');
  if (g.response) return g.response;

  const body = await req.json().catch(() => ({}));
  if (!body.name || !body.classLevel || !body.schoolId) {
    return fail('Student name, class and school are required', 400);
  }

  const school = await School.findById(body.schoolId);
  if (!school) return fail('School not found', 404);

  const settings = await getSettings();

  const student = await Student.create({
    ...body,
    rollNo: body.rollNo || (await nextRollNo(settings.currentSession)),
    schoolName: school.name,
    session: settings.currentSession,
  });

  await School.updateOne({ _id: school._id }, { $inc: { studentCount: 1 } });
  await audit(g.session, 'create', 'Student', student.name);

  return json({ success: true, item: { ...student.toObject(), _id: String(student._id) } }, 201);
}
