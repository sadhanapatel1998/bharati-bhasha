import { NextRequest } from 'next/server';
import { Types } from 'mongoose';
import { requireSchool, json } from '@/server/lib/guard';
import { Student } from '@/server/models/Student';
import { Result } from '@/server/models/Result';
import { School } from '@/server/models/School';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requireSchool(req);
  if (g.response) return g.response;

  const schoolId = String(g.session.schoolId);
  const oid = new Types.ObjectId(schoolId);

  const [school, totalStudents, publishedResults, bySubject, byClass, agg, recentStudents, top] =
    await Promise.all([
      School.findById(schoolId).lean(),
      Student.countDocuments({ schoolId }),
      Result.countDocuments({ schoolId, isPublished: true }),
      Student.aggregate([{ $match: { schoolId: oid } }, { $group: { _id: '$subject', count: { $sum: 1 } } }]),
      Student.aggregate([
        { $match: { schoolId: oid } },
        { $group: { _id: '$classLevel', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Result.aggregate([
        { $match: { schoolId: oid, isPublished: true } },
        {
          $group: {
            _id: null,
            avg: { $avg: '$percentage' },
            max: { $max: '$percentage' },
            pass: { $sum: { $cond: [{ $gte: ['$percentage', 35] }, 1, 0] } },
            n: { $sum: 1 },
          },
        },
      ]),
      Student.find({ schoolId }).sort({ createdAt: -1 }).limit(6).lean(),
      Result.find({ schoolId, isPublished: true }).sort({ percentage: -1 }).limit(6).lean(),
    ]);

  const a = agg[0] || { avg: 0, max: 0, pass: 0, n: 0 };

  return json({
    success: true,
    school: school ? { ...school, _id: String((school as { _id: unknown })._id) } : null,
    stats: {
      totalStudents,
      publishedResults,
      avgScore: Math.round((a.avg || 0) * 100) / 100,
      topScore: Math.round((a.max || 0) * 100) / 100,
      passRate: a.n ? Math.round((a.pass / a.n) * 10000) / 100 : 0,
    },
    bySubject: bySubject.map((r) => ({ key: r._id || 'unknown', count: r.count })),
    byClass: byClass.map((r) => ({ key: r._id || '—', count: r.count })),
    recentStudents: recentStudents.map((s) => ({ ...s, _id: String(s._id), schoolId: String(s.schoolId) })),
    topPerformers: top.map((r) => ({ ...r, _id: String(r._id) })),
  });
}
