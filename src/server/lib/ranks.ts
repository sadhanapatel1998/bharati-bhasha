import { Result } from '../models/Result';
import { School } from '../models/School';
import { computeRanks, RankableRow } from './rankMath';

export { computeRanks } from './rankMath';
export type { RankableRow, RankResult } from './rankMath';

/**
 * Recomputes school / state / national ranks and writes them back.
 * Pass an examId to rescore one exam, or nothing to rescore everything.
 */
export async function recomputeRanks(examId?: string | null) {
  const filter: Record<string, unknown> = {};
  if (examId !== undefined) filter.examId = examId || null;

  const results = await Result.find(filter)
    .sort({ percentage: -1, marksObtained: -1, createdAt: 1 })
    .lean();

  if (!results.length) return { updated: 0 };

  // school -> state lookup (one query, not one per row)
  const schoolIds = [...new Set(results.map((r) => String(r.schoolId)))];
  const schools = await School.find({ _id: { $in: schoolIds } })
    .select('state')
    .lean();
  const stateOf: Record<string, string> = {};
  schools.forEach((s) => {
    stateOf[String(s._id)] = (s as { state?: string }).state || 'UNKNOWN';
  });

  const ranks = computeRanks(results as unknown as RankableRow[], stateOf);

  const ops = results.map((r) => ({
    updateOne: {
      filter: { _id: r._id },
      update: { $set: ranks[String(r._id)] || { rankNational: 0, rankState: 0, rankSchool: 0 } },
    },
  }));

  if (ops.length) await Result.bulkWrite(ops);
  return { updated: ops.length };
}
