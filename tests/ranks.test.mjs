import { build } from 'esbuild';
import os from 'node:os'; import path from 'node:path'; import fs from 'node:fs';

const tmp = path.join(process.cwd(), '.ranks-test.mjs');
await build({ stdin: { contents: `export { computeRanks } from './src/server/lib/rankMath';`, resolveDir: process.cwd(), loader: 'ts' },
  bundle: true, format: 'esm', platform: 'node', outfile: path.join(process.cwd(),'.ranks-test.mjs'),  logLevel: 'error' });
const { computeRanks } = await import(`file://${tmp}`);

let pass = 0, fail = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : `\n   got  ${JSON.stringify(got)}\n   want ${JSON.stringify(want)}`}`);
};

const stateOf = { s1: 'Delhi', s2: 'Delhi', s3: 'Bihar' };

// single result -> everything is rank 1
eq('single result gets rank 1',
  computeRanks([{ _id: 'r1', schoolId: 's1', examId: 'e1', percentage: 100 }], stateOf).r1,
  { rankNational: 1, rankState: 1, rankSchool: 1 });

// ordering across schools and states
const rows = [
  { _id: 'a', schoolId: 's1', examId: 'e1', percentage: 90 },
  { _id: 'b', schoolId: 's1', examId: 'e1', percentage: 95 },
  { _id: 'c', schoolId: 's2', examId: 'e1', percentage: 92 },
  { _id: 'd', schoolId: 's3', examId: 'e1', percentage: 99 },
];
const r = computeRanks(rows, stateOf);
eq('national order', [r.d.rankNational, r.b.rankNational, r.c.rankNational, r.a.rankNational], [1, 2, 3, 4]);
eq('school rank inside s1', [r.b.rankSchool, r.a.rankSchool], [1, 2]);
eq('school rank alone in s2', r.c.rankSchool, 1);
eq('state rank Delhi (s1+s2)', [r.b.rankState, r.c.rankState, r.a.rankState], [1, 2, 3]);
eq('state rank Bihar has own #1', r.d.rankState, 1);

// ties share a rank, next value skips
const tied = computeRanks([
  { _id: 't1', schoolId: 's1', examId: 'e1', percentage: 80 },
  { _id: 't2', schoolId: 's1', examId: 'e1', percentage: 80 },
  { _id: 't3', schoolId: 's1', examId: 'e1', percentage: 70 },
], stateOf);
eq('ties share rank', [tied.t1.rankNational, tied.t2.rankNational, tied.t3.rankNational], [1, 1, 3]);

// exams never bleed into each other
const twoExams = computeRanks([
  { _id: 'x1', schoolId: 's1', examId: 'e1', percentage: 50 },
  { _id: 'x2', schoolId: 's1', examId: 'e2', percentage: 99 },
], stateOf);
eq('each exam ranks independently', [twoExams.x1.rankNational, twoExams.x2.rankNational], [1, 1]);

// unsorted input still ranks correctly
const unsorted = computeRanks([
  { _id: 'u1', schoolId: 's1', examId: 'e1', percentage: 10 },
  { _id: 'u2', schoolId: 's1', examId: 'e1', percentage: 90 },
], stateOf);
eq('unsorted input handled', [unsorted.u2.rankNational, unsorted.u1.rankNational], [1, 2]);

// school with no state falls into UNKNOWN, does not crash
const noState = computeRanks([{ _id: 'n1', schoolId: 'sX', examId: 'e1', percentage: 60 }], stateOf);
eq('missing state handled', noState.n1, { rankNational: 1, rankState: 1, rankSchool: 1 });

fs.rmSync(tmp, { force: true });
console.log(`\n${pass}/${pass + fail} passed`);
process.exit(fail ? 1 : 0);
