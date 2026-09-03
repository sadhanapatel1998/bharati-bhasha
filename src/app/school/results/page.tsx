'use client';

import React from 'react';
import { Search, Download } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { useResource, downloadCSV } from '../../../components/panel/useResource';
import {
  Card,
  PageHeader,
  Button,
  Input,
  Select,
  Badge,
  TableWrap,
  Th,
  Td,
  EmptyState,
  TableSkeleton,
  Pagination,
} from '../../../components/panel/ui';

interface ResultRow {
  _id: string;
  rollNo: string;
  studentName?: string;
  classLevel?: string;
  subject: 'hindi' | 'sanskrit' | 'both';
  examName?: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  rankSchool: number;
  rankState: number;
  rankNational: number;
  remark?: string;
}

const CLASSES = ['1','2','3','4','5','6','7','8','9','10','11','12'];

export default function SchoolResults() {
  const { t, n } = useI18n();
  const r = useResource<ResultRow>('/api/school/results');

  const gradeTone = (g: string) => (g === 'A+' || g === 'A' ? 'success' : g === 'E' ? 'danger' : 'gold');

  return (
    <>
      <PageHeader title={t('result.title')} subtitle={t('result.schoolSubtitle')}>
        <Button
          variant="secondary"
          icon={Download}
          onClick={() =>
            downloadCSV('my-results.csv', r.items as unknown as Record<string, unknown>[], [
              { key: 'rollNo', label: 'Roll No' },
              { key: 'studentName', label: 'Student' },
              { key: 'classLevel', label: 'Class' },
              { key: 'marksObtained', label: 'Marks' },
              { key: 'totalMarks', label: 'Total' },
              { key: 'percentage', label: 'Percentage' },
              { key: 'grade', label: 'Grade' },
              { key: 'rankSchool', label: 'School Rank' },
              { key: 'rankState', label: 'State Rank' },
              { key: 'rankNational', label: 'National Rank' },
            ])
          }
        >
          {t('common.export')}
        </Button>
      </PageHeader>

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-stone-200/80 p-4 dark:border-white/10">
          <div className="relative w-full min-w-0 sm:min-w-[200px] sm:flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input value={r.q} onChange={(e) => r.search(e.target.value)} placeholder={t('common.searchPlaceholder')} className="pl-9" />
          </div>
          <Select
            className="w-full sm:w-auto sm:min-w-[140px]"
            value={r.filters.classLevel || ''}
            onChange={(e) => r.setFilter('classLevel', e.target.value)}
            options={[{ value: '', label: t('student.class') }, ...CLASSES.map((c) => ({ value: c, label: c }))]}
          />
          <Select
            className="w-full sm:w-auto sm:min-w-[150px]"
            value={r.filters.subject || ''}
            onChange={(e) => r.setFilter('subject', e.target.value)}
            options={[
              { value: '', label: t('student.subject') },
              { value: 'hindi', label: t('student.subject.hindi') },
              { value: 'sanskrit', label: t('student.subject.sanskrit') },
              { value: 'both', label: t('student.subject.both') },
            ]}
          />
        </div>

        {r.loading ? (
          <TableSkeleton cols={7} />
        ) : !r.items.length ? (
          <EmptyState hint={t('result.notPublishedYet')} />
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <Th>{t('student.rollNo')}</Th>
                <Th>{t('student.name')}</Th>
                <Th>{t('result.exam')}</Th>
                <Th>{t('result.marks')}</Th>
                <Th>{t('result.percentage')}</Th>
                <Th>{t('result.grade')}</Th>
                <Th>{t('result.rankSchool')}</Th>
                <Th>{t('result.rankState')}</Th>
                <Th>{t('result.rankNational')}</Th>
              </tr>
            </thead>
            <tbody>
              {r.items.map((row) => (
                <tr key={row._id} className="transition hover:bg-stone-50/70 dark:hover:bg-white/[0.03]">
                  <Td className="font-mono text-xs font-bold text-[#7B1E1E] dark:text-[#d9b45f]">{row.rollNo}</Td>
                  <Td className="font-semibold">{row.studentName || '—'}</Td>
                  <Td className="text-xs">{row.examName || '—'}</Td>
                  <Td className="tabular-nums font-semibold">
                    {n(row.marksObtained)}/{n(row.totalMarks)}
                  </Td>
                  <Td className="tabular-nums font-bold">{row.percentage}%</Td>
                  <Td>
                    <Badge tone={gradeTone(row.grade)}>{row.grade}</Badge>
                  </Td>
                  <Td className="tabular-nums font-semibold">{row.rankSchool || '—'}</Td>
                  <Td className="tabular-nums">{row.rankState || '—'}</Td>
                  <Td className="tabular-nums">{row.rankNational || '—'}</Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}

        {r.items.some((x) => !x.rankNational) && (
          <p className="border-t border-stone-200/80 px-4 py-3 text-xs text-stone-500 dark:border-white/10 dark:text-stone-400">
            {t('result.rankPending')}
          </p>
        )}

        <Pagination page={r.page} pages={r.pages} total={r.total} onPage={r.setPage} />
      </Card>
    </>
  );
}
