'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Trophy, TrendingUp, Award, ArrowRight, UserPlus, Building2, AlertCircle } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { usePanel } from '../../../components/panel/PanelProvider';
import {
  Card,
  CardHeader,
  PageHeader,
  StatCard,
  Badge,
  BarList,
  TableWrap,
  Th,
  Td,
  EmptyState,
} from '../../../components/panel/ui';

interface Payload {
  school: { name: string; code: string; status: string; city?: string; state?: string } | null;
  stats: { totalStudents: number; publishedResults: number; avgScore: number; topScore: number; passRate: number };
  bySubject: { key: string; count: number }[];
  byClass: { key: string; count: number }[];
  recentStudents: { _id: string; rollNo: string; name: string; classLevel: string; subject: string; status: string }[];
  topPerformers: { _id: string; rollNo: string; studentName: string; percentage: number; grade: string }[];
}

export default function SchoolDashboard() {
  const { t, n } = useI18n();
  const { api, user } = usePanel();
  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Payload>('/api/school/stats')
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [api]);

  const subjectLabels: Record<string, string> = {
    hindi: t('student.subject.hindi'),
    sanskrit: t('student.subject.sanskrit'),
    both: t('student.subject.both'),
  };

  return (
    <>
      <PageHeader title={`${t('dash.welcome')}, ${user?.name || ''}`} subtitle={t('dash.schoolSubtitle')} />

      {data?.school?.status === 'pending' && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{t('auth.pendingNotice')}</p>
        </div>
      )}

      {data?.school && (
        <Card className="mb-5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:bg-[#7B1E1E]/25 dark:text-[#d9b45f]">
                <Building2 className="h-6 w-6" />
              </span>
              <div>
                <p className="font-serif text-lg font-bold">{data.school.name}</p>
                <p className="text-xs text-stone-500">
                  <span className="font-mono font-bold">{data.school.code}</span>
                  {data.school.city ? ` · ${data.school.city}` : ''}
                  {data.school.state ? `, ${data.school.state}` : ''}
                </p>
              </div>
            </div>
            <Badge tone={data.school.status === 'active' ? 'success' : data.school.status === 'pending' ? 'warning' : 'danger'}>
              {t(`school.status.${data.school.status}` as never)}
            </Badge>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[118px] animate-pulse rounded-2xl bg-white dark:bg-white/5" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label={t('dash.myStudents')} value={n(data?.stats.totalStudents || 0)} icon={Users} tone="info" />
            <StatCard label={t('dash.myResults')} value={n(data?.stats.publishedResults || 0)} icon={Trophy} tone="gold" />
            <StatCard label={t('dash.avgScore')} value={`${data?.stats.avgScore ?? 0}%`} icon={TrendingUp} tone="success" />
            <StatCard label={t('dash.passRate')} value={`${data?.stats.passRate ?? 0}%`} icon={Award} tone="success" />
          </div>

          <Card className="mt-6 p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {t('dash.quickActions')}
            </p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {[
                { href: '/school/students', icon: UserPlus, label: t('student.addTitle') },
                { href: '/school/results', icon: Trophy, label: t('nav.myResults') },
                { href: '/school/profile', icon: Building2, label: t('nav.schoolProfile') },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 transition hover:border-[#7B1E1E]/40 hover:bg-[#7B1E1E]/[0.04] dark:border-white/10 dark:text-stone-200 dark:hover:bg-white/5"
                >
                  <l.icon className="h-4 w-4 text-[#7B1E1E] dark:text-[#d9b45f]" />
                  <span className="flex-1 truncate">{l.label}</span>
                  <ArrowRight className="h-4 w-4 text-stone-300 transition group-hover:translate-x-0.5 group-hover:text-[#7B1E1E]" />
                </Link>
              ))}
            </div>
          </Card>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader title={t('dash.studentsBySubject')} />
              <BarList data={data?.bySubject || []} labelMap={subjectLabels} />
            </Card>
            <Card>
              <CardHeader title={t('dash.studentsByClass')} />
              <BarList data={data?.byClass || []} />
            </Card>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader
                title={t('dash.recentStudents')}
                action={
                  <Link href="/school/students" className="text-xs font-bold text-[#7B1E1E] hover:underline dark:text-[#d9b45f]">
                    {t('dash.viewAll')}
                  </Link>
                }
              />
              {!data?.recentStudents?.length ? (
                <EmptyState />
              ) : (
                <TableWrap>
                  <thead>
                    <tr>
                      <Th>{t('student.rollNo')}</Th>
                      <Th>{t('student.name')}</Th>
                      <Th>{t('student.class')}</Th>
                      <Th>{t('student.subject')}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentStudents.map((s) => (
                      <tr key={s._id}>
                        <Td className="font-mono text-xs">{s.rollNo}</Td>
                        <Td className="font-semibold">{s.name}</Td>
                        <Td>{s.classLevel}</Td>
                        <Td>
                          <Badge tone="info">{t(`student.subject.${s.subject}` as never)}</Badge>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </TableWrap>
              )}
            </Card>

            <Card>
              <CardHeader
                title={t('dash.topPerformers')}
                action={
                  <Link href="/school/results" className="text-xs font-bold text-[#7B1E1E] hover:underline dark:text-[#d9b45f]">
                    {t('dash.viewAll')}
                  </Link>
                }
              />
              {!data?.topPerformers?.length ? (
                <EmptyState hint={t('result.notPublishedYet')} />
              ) : (
                <TableWrap>
                  <thead>
                    <tr>
                      <Th>{t('student.rollNo')}</Th>
                      <Th>{t('student.name')}</Th>
                      <Th>{t('result.percentage')}</Th>
                      <Th>{t('result.grade')}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPerformers.map((r) => (
                      <tr key={r._id}>
                        <Td className="font-mono text-xs">{r.rollNo}</Td>
                        <Td className="font-semibold">{r.studentName}</Td>
                        <Td className="tabular-nums font-bold">{r.percentage}%</Td>
                        <Td>
                          <Badge tone="gold">{r.grade}</Badge>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </TableWrap>
              )}
            </Card>
          </div>
        </>
      )}
    </>
  );
}
