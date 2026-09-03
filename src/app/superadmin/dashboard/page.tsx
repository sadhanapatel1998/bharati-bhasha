'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Award,
  Clock,
  TrendingUp,
  Trophy,
  Inbox,
  ArrowRight,
  UserPlus,
  Upload,
  CalendarDays,
} from 'lucide-react';
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
  TableSkeleton,
} from '../../../components/panel/ui';

interface StatsPayload {
  stats: {
    totalSchools: number;
    activeSchools: number;
    pendingSchools: number;
    totalStudents: number;
    publishedResults: number;
    pendingEnquiries: number;
    avgScore: number;
    topScore: number;
  };
  bySubject: { key: string; count: number }[];
  byClass: { key: string; count: number }[];
  recentSchools: { _id: string; name: string; code: string; city?: string; status: string; createdAt: string }[];
  topPerformers: { _id: string; rollNo: string; studentName: string; schoolName: string; percentage: number; grade: string }[];
}

const statusTone = (s: string) =>
  s === 'active' ? 'success' : s === 'pending' ? 'warning' : s === 'suspended' ? 'danger' : 'neutral';

export default function SuperAdminDashboard() {
  const { t, n, d } = useI18n();
  const { api, user } = usePanel();
  const [data, setData] = useState<StatsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<StatsPayload>('/api/superadmin/stats')
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [api]);

  const subjectLabels: Record<string, string> = {
    hindi: t('student.subject.hindi'),
    sanskrit: t('student.subject.sanskrit'),
    both: t('student.subject.both'),
  };

  const quickLinks = [
    { href: '/superadmin/schools', icon: Building2, label: t('nav.schools') },
    { href: '/superadmin/students', icon: UserPlus, label: t('student.addTitle') },
    { href: '/superadmin/results', icon: Upload, label: t('result.upload') },
    { href: '/superadmin/exams', icon: CalendarDays, label: t('nav.exams') },
  ];

  return (
    <>
      <PageHeader title={`${t('dash.welcome')}, ${user?.name || ''}`} subtitle={t('dash.subtitle')} />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[118px] animate-pulse rounded-2xl bg-white dark:bg-white/5" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label={t('dash.totalSchools')} value={n(data?.stats.totalSchools || 0)} icon={Building2} tone="info" />
            <StatCard label={t('dash.activeSchools')} value={n(data?.stats.activeSchools || 0)} icon={Award} tone="success" />
            <StatCard label={t('dash.pendingSchools')} value={n(data?.stats.pendingSchools || 0)} icon={Clock} tone="warning" />
            <StatCard label={t('dash.totalStudents')} value={n(data?.stats.totalStudents || 0)} icon={Users} tone="gold" />
            <StatCard label={t('dash.totalResults')} value={n(data?.stats.publishedResults || 0)} icon={Trophy} tone="success" />
            <StatCard label={t('dash.avgScore')} value={`${data?.stats.avgScore ?? 0}%`} icon={TrendingUp} tone="info" />
            <StatCard label={t('dash.topScore')} value={`${data?.stats.topScore ?? 0}%`} icon={Award} tone="gold" />
            <StatCard label={t('nav.enquiries')} value={n(data?.stats.pendingEnquiries || 0)} icon={Inbox} tone="danger" />
          </div>

          <Card className="mt-6 p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {t('dash.quickActions')}
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((l) => (
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
                title={t('dash.recentSchools')}
                action={
                  <Link href="/superadmin/schools" className="text-xs font-bold text-[#7B1E1E] hover:underline dark:text-[#d9b45f]">
                    {t('dash.viewAll')}
                  </Link>
                }
              />
              {!data?.recentSchools?.length ? (
                <EmptyState />
              ) : (
                <TableWrap>
                  <thead>
                    <tr>
                      <Th>{t('school.name')}</Th>
                      <Th>{t('school.code')}</Th>
                      <Th>{t('common.status')}</Th>
                      <Th>{t('school.registeredOn')}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentSchools.map((s) => (
                      <tr key={s._id}>
                        <Td className="font-semibold">{s.name}</Td>
                        <Td className="font-mono text-xs">{s.code}</Td>
                        <Td>
                          <Badge tone={statusTone(s.status)}>{t(`school.status.${s.status}` as never)}</Badge>
                        </Td>
                        <Td className="text-xs text-stone-500">{d(s.createdAt)}</Td>
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
                  <Link href="/superadmin/results" className="text-xs font-bold text-[#7B1E1E] hover:underline dark:text-[#d9b45f]">
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
      {loading && <TableSkeleton />}
    </>
  );
}
