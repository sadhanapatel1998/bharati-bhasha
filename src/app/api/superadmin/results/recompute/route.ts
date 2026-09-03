import { NextRequest } from 'next/server';
import { requirePermission, json, audit } from '@/server/lib/guard';
import { recomputeRanks } from '@/server/lib/ranks';

export const runtime = 'nodejs';

/** POST { examId?: string } — rebuilds school/state/national ranks. */
export async function POST(req: NextRequest) {
  const g = await requirePermission(req, 'results.manage');
  if (g.response) return g.response;

  const body = await req.json().catch(() => ({}));
  const examId = body.examId === undefined ? undefined : body.examId || null;

  const { updated } = await recomputeRanks(examId);
  await audit(g.session, 'recompute-ranks', 'Result', `${updated} rows`);

  return json({ success: true, updated });
}
