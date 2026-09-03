import { NextRequest } from 'next/server';
import { requirePermission, json, fail, audit } from '@/server/lib/guard';
import { Result } from '@/server/models/Result';
import { Student } from '@/server/models/Student';
import { Exam } from '@/server/models/Exam';
import { recomputeRanks } from '@/server/lib/ranks';

export const runtime = 'nodejs';

/**
 * Body: { examId?, totalMarks?, publish?, rows: "ROLL,45,100\nROLL2,80" | [{rollNo,marksObtained,totalMarks}] }
 * Also recomputes school / state / national ranks for the exam afterwards.
 */
export async function POST(req: NextRequest) {
  const g = await requirePermission(req, 'results.manage');
  if (g.response) return g.response;

  const body = await req.json().catch(() => ({}));
  const defaultTotal = Number(body.totalMarks) || 100;
  let publish = Boolean(body.publish);
  if (publish) {
    const pub = await requirePermission(req, 'results.publish');
    if (pub.response) publish = false; // silently import as draft when not allowed to publish
  }
  const exam = body.examId ? await Exam.findById(body.examId) : null;

  let rows: { rollNo: string; marksObtained: number; totalMarks?: number }[] = [];

  if (typeof body.rows === 'string') {
    rows = body.rows
      .split('\n')
      .map((line: string) => line.trim())
      .filter(Boolean)
      .filter((line: string) => !/^roll/i.test(line))
      .map((line: string) => {
        const [rollNo, marks, total] = line.split(/[,\t;]/).map((c) => c.trim());
        return { rollNo: (rollNo || '').toUpperCase(), marksObtained: Number(marks), totalMarks: Number(total) || defaultTotal };
      });
  } else if (Array.isArray(body.rows)) {
    rows = body.rows;
  }

  if (!rows.length) return fail('No rows to import', 400);

  const imported: string[] = [];
  const failed: { rollNo: string; reason: string }[] = [];

  for (const row of rows) {
    if (!row.rollNo || Number.isNaN(row.marksObtained)) {
      failed.push({ rollNo: row.rollNo || '—', reason: 'Invalid row format' });
      continue;
    }
    const student = await Student.findOne({ rollNo: String(row.rollNo).toUpperCase() });
    if (!student) {
      failed.push({ rollNo: row.rollNo, reason: 'Student not found' });
      continue;
    }

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
      marksObtained: Number(row.marksObtained),
      totalMarks: Number(row.totalMarks) || defaultTotal,
      isPublished: publish,
      session: student.session,
    };

    const existing = await Result.findOne({ rollNo: payload.rollNo, examId: payload.examId });
    if (existing) {
      Object.assign(existing, payload);
      await existing.save();
    } else {
      await Result.create(payload);
    }
    await Student.updateOne({ _id: student._id }, { status: 'appeared' });
    imported.push(student.rollNo);
  }

  await recomputeRanks(exam?._id ? String(exam._id) : null);
  await audit(g.session, 'bulk-import', 'Result', `${imported.length} rows`);

  return json({ success: true, imported: imported.length, failedCount: failed.length, failed });
}

