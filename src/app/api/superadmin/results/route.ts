import { NextRequest } from 'next/server';
import { requirePermission, json, fail, listParams, escapeRegex, audit } from '@/server/lib/guard';
import { Result } from '@/server/models/Result';
import { Student } from '@/server/models/Student';
import { Exam } from '@/server/models/Exam';
import { recomputeRanks } from '@/server/lib/ranks';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requirePermission(req, 'results.view');
  if (g.response) return g.response;

  const { page, limit, skip, q, schoolId, subject, classLevel, examId, sort } = listParams(req);
  const status = req.nextUrl.searchParams.get('status');

  const filter: Record<string, unknown> = {};
  if (schoolId) filter.schoolId = schoolId;
  if (subject) filter.subject = subject;
  if (classLevel) filter.classLevel = classLevel;
  if (examId) filter.examId = examId;
  if (status === 'published') filter.isPublished = true;
  if (status === 'draft') filter.isPublished = false;
  if (q) {
    const rx = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ rollNo: rx }, { studentName: rx }, { schoolName: rx }];
  }

  const [items, total] = await Promise.all([
    Result.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Result.countDocuments(filter),
  ]);

  return json({
    success: true,
    items: items.map((r) => ({ ...r, _id: String(r._id) })),
    total,
    page,
    limit,
    pages: Math.ceil(total / limit) || 1,
  });
}

export async function POST(req: NextRequest) {
  const g = await requirePermission(req, 'results.manage');
  if (g.response) return g.response;

  const body = await req.json().catch(() => ({}));
  if (!body.rollNo || body.marksObtained === undefined) {
    return fail('Roll number and marks obtained are required', 400);
  }

  const student = await Student.findOne({ rollNo: String(body.rollNo).toUpperCase() });
  if (!student) return fail(`No student found with roll number ${body.rollNo}`, 404);

  const exam = body.examId ? await Exam.findById(body.examId) : null;

  const payload = {
    studentId: student._id,
    rollNo: student.rollNo,
    studentName: student.name,
    schoolId: student.schoolId,
    schoolName: student.schoolName,
    classLevel: student.classLevel,
    subject: student.subject,
    examId: exam?._id || null,
    examName: exam?.name || body.examName || 'Olympiad',
    marksObtained: Number(body.marksObtained),
    totalMarks: Number(body.totalMarks) || exam?.totalMarks || 100,
    remark: body.remark || '',
    isPublished: Boolean(body.isPublished),
    session: student.session,
  };

  const existing = await Result.findOne({ rollNo: payload.rollNo, examId: payload.examId });
  let result;
  if (existing) {
    Object.assign(existing, payload);
    await existing.save();
    result = existing;
  } else {
    result = await Result.create(payload);
  }

  await Student.updateOne({ _id: student._id }, { status: 'appeared' });
  await recomputeRanks(payload.examId ? String(payload.examId) : null);
  await audit(g.session, existing ? 'update' : 'create', 'Result', result.rollNo);

  const fresh = await Result.findById(result._id).lean();
  return json(
    { success: true, item: { ...fresh, _id: String((fresh as { _id: unknown })._id) } },
    existing ? 200 : 201
  );
}
