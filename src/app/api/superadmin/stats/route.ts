import { NextRequest } from 'next/server';
import { requireSuper, json } from '@/server/lib/guard';
import { School } from '@/server/models/School';
import { Student } from '@/server/models/Student';
import { Result } from '@/server/models/Result';
import { Enquiry } from '@/server/models/Enquiry';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requireSuper(req);
  if (g.response) return g.response;

  const [
    totalSchools,
    activeSchools,
    pendingSchools,
    totalStudents,
    publishedResults,
    pendingEnquiries,
    bySubject,
    byClass,
    avgAgg,
    recentSchools,
    topPerformers,
  ] = await Promise.all([
    School.countDocuments({}),
    School.countDocuments({ status: 'active' }),
    School.countDocuments({ status: 'pending' }),
    Student.countDocuments({}),
    Result.countDocuments({ isPublished: true }),
    Enquiry.countDocuments({ status: 'pending' }),
    Student.aggregate([{ $group: { _id: '$subject', count: { $sum: 1 } } }]),
    Student.aggregate([{ $group: { _id: '$classLevel', count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    Result.aggregate([
      { $group: { _id: null, avg: { $avg: '$percentage' }, max: { $max: '$percentage' } } },
    ]),
    School.find({}).sort({ createdAt: -1 }).limit(6).lean(),
    Result.find({ isPublished: true }).sort({ percentage: -1 }).limit(6).lean(),
  ]);

  return json({
    success: true,
    stats: {
      totalSchools,
      activeSchools,
      pendingSchools,
      totalStudents,
      publishedResults,
      pendingEnquiries,
      avgScore: Math.round((avgAgg[0]?.avg || 0) * 100) / 100,
      topScore: Math.round((avgAgg[0]?.max || 0) * 100) / 100,
    },
    bySubject: bySubject.map((r) => ({ key: r._id || 'unknown', count: r.count })),
    byClass: byClass.map((r) => ({ key: r._id || '—', count: r.count })),
    recentSchools: recentSchools.map((s) => ({ ...s, _id: String(s._id) })),
    topPerformers: topPerformers.map((r) => ({ ...r, _id: String(r._id) })),
  });
}
