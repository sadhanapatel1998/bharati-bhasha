/**
 * Pure ranking maths — no database imports, so it can be unit tested directly
 * (`npm run test:ranks`).
 */
export interface RankableRow {
  _id: unknown;
  schoolId: unknown;
  examId?: unknown;
  percentage?: number;
  marksObtained?: number;
}

export interface RankResult {
  rankNational: number;
  rankState: number;
  rankSchool: number;
}

/**
 * Pure ranking, kept separate from the database so it can be unit tested.
 * Rows may arrive in any order. Ties share a rank (1, 2, 2, 4).
 */
export function computeRanks(
  rows: RankableRow[],
  stateOf: Record<string, string>
): Record<string, RankResult> {
  const out: Record<string, RankResult> = {};

  const sorted = [...rows].sort(
    (a, b) => (b.percentage ?? 0) - (a.percentage ?? 0) || (b.marksObtained ?? 0) - (a.marksObtained ?? 0)
  );

  // rows are ranked inside their own exam only
  const byExam: Record<string, RankableRow[]> = {};
  sorted.forEach((r) => {
    const k = r.examId ? String(r.examId) : 'none';
    (byExam[k] ||= []).push(r);
  });

  const rank = (list: RankableRow[]) => {
    const map: Record<string, number> = {};
    let lastScore: number | null = null;
    let lastRank = 0;
    list.forEach((r, i) => {
      const score = r.percentage ?? 0;
      const position = score === lastScore ? lastRank : i + 1;
      map[String(r._id)] = position;
      lastScore = score;
      lastRank = position;
    });
    return map;
  };

  for (const list of Object.values(byExam)) {
    const national = rank(list);

    const perState: Record<string, RankableRow[]> = {};
    const perSchool: Record<string, RankableRow[]> = {};
    list.forEach((r) => {
      const st = stateOf[String(r.schoolId)] || 'UNKNOWN';
      (perState[st] ||= []).push(r);
      (perSchool[String(r.schoolId)] ||= []).push(r);
    });

    const state: Record<string, number> = {};
    Object.values(perState).forEach((l) => Object.assign(state, rank(l)));

    const school: Record<string, number> = {};
    Object.values(perSchool).forEach((l) => Object.assign(school, rank(l)));

    list.forEach((r) => {
      const id = String(r._id);
      out[id] = {
        rankNational: national[id] || 0,
        rankState: state[id] || 0,
        rankSchool: school[id] || 0,
      };
    });
  }

  return out;
}

