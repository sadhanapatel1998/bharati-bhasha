'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, Download, Pencil, Trash2, Upload, Eye, EyeOff, RefreshCcw, Globe, AlertTriangle } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { usePanel } from '../../../components/panel/PanelProvider';
import { useResource, downloadCSV } from '../../../components/panel/useResource';
import {
  Card,
  PageHeader,
  Button,
  Input,
  Select,
  Textarea,
  Field,
  Badge,
  Toggle,
  Modal,
  ConfirmDialog,
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
  schoolName?: string;
  classLevel?: string;
  subject: 'hindi' | 'sanskrit' | 'both';
  examName?: string;
  examId?: string | null;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  rankSchool: number;
  rankNational: number;
  remark?: string;
  isPublished: boolean;
}

export default function SuperAdminResults() {
  const { t, n } = useI18n();
  const { api, toast } = usePanel();
  const r = useResource<ResultRow>('/api/superadmin/results');

  const [exams, setExams] = useState<{ _id: string; name: string }[]>([]);
  const [schools, setSchools] = useState<{ _id: string; name: string }[]>([]);
  const [modal, setModal] = useState<{ open: boolean; row?: ResultRow }>({ open: false });
  const [form, setForm] = useState({ rollNo: '', examId: '', marksObtained: '', totalMarks: '100', remark: '', isPublished: false });
  const [bulk, setBulk] = useState({ open: false, examId: '', totalMarks: '100', publish: true, rows: '', busy: false });
  const [del, setDel] = useState<ResultRow | null>(null);
  const [recomputing, setRecomputing] = useState(false);
  const [resultsPublic, setResultsPublic] = useState<boolean | null>(null);
  const [togglingPublic, setTogglingPublic] = useState(false);

  useEffect(() => {
    api<{ settings: { resultsPublic: boolean } }>('/api/superadmin/settings', { silent: true })
      .then((res) => setResultsPublic(Boolean(res.settings?.resultsPublic)))
      .catch(() => setResultsPublic(null));
  }, [api]);

  const enablePublicResults = async () => {
    setTogglingPublic(true);
    try {
      await api('/api/superadmin/settings', { method: 'PUT', body: JSON.stringify({ resultsPublic: true }) });
      setResultsPublic(true);
      toast(t('result.publicOn'), 'success');
    } finally {
      setTogglingPublic(false);
    }
  };

  const recompute = async () => {
    setRecomputing(true);
    try {
      const res = await api<{ updated: number }>('/api/superadmin/results/recompute', {
        method: 'POST',
        body: JSON.stringify(r.filters.examId ? { examId: r.filters.examId } : {}),
      });
      toast(`${t('result.recomputeDone')} — ${res.updated}`, 'success');
      r.reload();
    } finally {
      setRecomputing(false);
    }
  };

  useEffect(() => {
    api<{ items: { _id: string; name: string }[] }>('/api/superadmin/exams?limit=100', { silent: true })
      .then((res) => setExams(res.items || []))
      .catch(() => setExams([]));
    api<{ items: { _id: string; name: string }[] }>('/api/superadmin/schools?limit=200', { silent: true })
      .then((res) => setSchools(res.items || []))
      .catch(() => setSchools([]));
  }, [api]);

  const openCreate = () => {
    setForm({ rollNo: '', examId: '', marksObtained: '', totalMarks: '100', remark: '', isPublished: false });
    setModal({ open: true });
  };

  const openEdit = (row: ResultRow) => {
    setForm({
      rollNo: row.rollNo,
      examId: row.examId || '',
      marksObtained: String(row.marksObtained),
      totalMarks: String(row.totalMarks),
      remark: row.remark || '',
      isPublished: row.isPublished,
    });
    setModal({ open: true, row });
  };

  const save = async () => {
    if (!form.rollNo || form.marksObtained === '') return;
    const payload = {
      rollNo: form.rollNo,
      examId: form.examId || null,
      marksObtained: Number(form.marksObtained),
      totalMarks: Number(form.totalMarks) || 100,
      remark: form.remark,
      isPublished: form.isPublished,
    };
    const ok = modal.row
      ? await r.update(modal.row._id, payload, t('common.updated'))
      : await r.create(payload, t('common.created'));
    if (ok) setModal({ open: false });
  };

  const runBulk = async () => {
    if (!bulk.rows.trim()) return;
    setBulk((p) => ({ ...p, busy: true }));
    try {
      const res = await api<{ imported: number; failedCount: number }>('/api/superadmin/results/bulk', {
        method: 'POST',
        body: JSON.stringify({
          examId: bulk.examId || null,
          totalMarks: Number(bulk.totalMarks) || 100,
          publish: bulk.publish,
          rows: bulk.rows,
        }),
      });
      toast(`${res.imported} ${t('result.rowsImported')}, ${res.failedCount} ${t('result.rowsFailed')}`, res.failedCount ? 'warning' : 'success');
      setBulk({ open: false, examId: '', totalMarks: '100', publish: true, rows: '', busy: false });
      r.reload();
    } catch {
      setBulk((p) => ({ ...p, busy: false }));
    }
  };

  const gradeTone = (g: string) => (g === 'A+' || g === 'A' ? 'success' : g === 'E' ? 'danger' : 'gold');

  return (
    <>
      <PageHeader title={t('result.title')} subtitle={t('result.subtitle')}>
        <Button
          variant="secondary"
          icon={Download}
          onClick={() =>
            downloadCSV('results.csv', r.items as unknown as Record<string, unknown>[], [
              { key: 'rollNo', label: 'Roll No' },
              { key: 'studentName', label: 'Student' },
              { key: 'schoolName', label: 'School' },
              { key: 'marksObtained', label: 'Marks' },
              { key: 'totalMarks', label: 'Total' },
              { key: 'percentage', label: 'Percentage' },
              { key: 'grade', label: 'Grade' },
              { key: 'rankNational', label: 'National Rank' },
            ])
          }
        >
          {t('common.export')}
        </Button>
        <Button variant="secondary" icon={RefreshCcw} loading={recomputing} onClick={recompute}>
          {t('result.recompute')}
        </Button>
        <Button variant="secondary" icon={Upload} onClick={() => setBulk((p) => ({ ...p, open: true }))}>
          {t('result.bulkUpload')}
        </Button>
        <Button icon={Plus} onClick={openCreate}>
          {t('result.addTitle')}
        </Button>
      </PageHeader>

      {resultsPublic === false && (
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-300" />
          <p className="min-w-[200px] flex-1 text-sm font-semibold text-amber-800 dark:text-amber-200">
            {t('result.publicOff')}
          </p>
          <Button size="sm" icon={Globe} loading={togglingPublic} onClick={enablePublicResults}>
            {t('result.enablePublic')}
          </Button>
        </div>
      )}

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-stone-200/80 p-4 dark:border-white/10">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input value={r.q} onChange={(e) => r.search(e.target.value)} placeholder={t('common.searchPlaceholder')} className="pl-9" />
          </div>
          <Select
            className="w-auto min-w-[180px]"
            value={r.filters.schoolId || ''}
            onChange={(e) => r.setFilter('schoolId', e.target.value)}
            options={[{ value: '', label: t('common.all') }, ...schools.map((s) => ({ value: s._id, label: s.name }))]}
          />
          <Select
            className="w-auto min-w-[170px]"
            value={r.filters.examId || ''}
            onChange={(e) => r.setFilter('examId', e.target.value)}
            options={[{ value: '', label: t('result.exam') }, ...exams.map((e2) => ({ value: e2._id, label: e2.name }))]}
          />
          <Select
            className="w-auto min-w-[150px]"
            value={r.filters.status || ''}
            onChange={(e) => r.setFilter('status', e.target.value)}
            options={[
              { value: '', label: t('common.all') },
              { value: 'published', label: t('result.published') },
              { value: 'draft', label: t('result.draft') },
            ]}
          />
        </div>

        {r.loading ? (
          <TableSkeleton cols={8} />
        ) : !r.items.length ? (
          <EmptyState action={<Button icon={Upload} onClick={() => setBulk((p) => ({ ...p, open: true }))}>{t('result.bulkUpload')}</Button>} />
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <Th>{t('student.rollNo')}</Th>
                <Th>{t('student.name')}</Th>
                <Th>{t('result.marks')}</Th>
                <Th>{t('result.percentage')}</Th>
                <Th>{t('result.grade')}</Th>
                <Th>{t('result.rankSchool')}</Th>
                <Th>{t('result.rankNational')}</Th>
                <Th>{t('common.status')}</Th>
                <Th className="text-right">{t('common.actions')}</Th>
              </tr>
            </thead>
            <tbody>
              {r.items.map((row) => (
                <tr key={row._id} className="transition hover:bg-stone-50/70 dark:hover:bg-white/[0.03]">
                  <Td className="font-mono text-xs font-bold text-[#7B1E1E] dark:text-[#d9b45f]">{row.rollNo}</Td>
                  <Td>
                    <span className="block font-semibold">{row.studentName || '—'}</span>
                    <span className="block max-w-[200px] truncate text-xs text-stone-500">{row.schoolName}</span>
                  </Td>
                  <Td className="tabular-nums font-semibold">
                    {n(row.marksObtained)}/{n(row.totalMarks)}
                  </Td>
                  <Td className="tabular-nums font-bold">{row.percentage}%</Td>
                  <Td>
                    <Badge tone={gradeTone(row.grade)}>{row.grade}</Badge>
                  </Td>
                  <Td className="tabular-nums">{row.rankSchool || '—'}</Td>
                  <Td className="tabular-nums">{row.rankNational || '—'}</Td>
                  <Td>
                    <Badge tone={row.isPublished ? 'success' : 'neutral'}>
                      {row.isPublished ? t('result.published') : t('result.draft')}
                    </Badge>
                  </Td>
                  <Td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        title={row.isPublished ? t('result.unpublish') : t('result.publish')}
                        onClick={() => r.update(row._id, { isPublished: !row.isPublished }, t('common.updated'))}
                        className="rounded-lg p-2 text-stone-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10"
                      >
                        {row.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => openEdit(row)}
                        className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 hover:text-[#7B1E1E] dark:hover:bg-white/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDel(row)}
                        className="rounded-lg p-2 text-stone-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}

        <Pagination page={r.page} pages={r.pages} total={r.total} onPage={r.setPage} />
      </Card>

      {/* single result */}
      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.row ? t('result.editTitle') : t('result.addTitle')}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal({ open: false })}>
              {t('common.cancel')}
            </Button>
            <Button loading={r.busy} onClick={save}>
              {t('common.save')}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t('student.rollNo')} required className="sm:col-span-2">
            <Input
              value={form.rollNo}
              disabled={!!modal.row}
              onChange={(e) => setForm((p) => ({ ...p, rollNo: e.target.value.toUpperCase() }))}
              placeholder="BBO26-000001"
            />
          </Field>
          <Field label={t('result.exam')} className="sm:col-span-2">
            <Select
              value={form.examId}
              onChange={(e) => setForm((p) => ({ ...p, examId: e.target.value }))}
              placeholder={t('common.selectPlaceholder')}
              options={exams.map((e2) => ({ value: e2._id, label: e2.name }))}
            />
          </Field>
          <Field label={t('result.marksObtained')} required>
            <Input
              type="number"
              value={form.marksObtained}
              onChange={(e) => setForm((p) => ({ ...p, marksObtained: e.target.value }))}
            />
          </Field>
          <Field label={t('result.totalMarks')} required>
            <Input type="number" value={form.totalMarks} onChange={(e) => setForm((p) => ({ ...p, totalMarks: e.target.value }))} />
          </Field>
          <Field label={t('result.remark')} className="sm:col-span-2">
            <Input value={form.remark} onChange={(e) => setForm((p) => ({ ...p, remark: e.target.value }))} />
          </Field>
          <div className="sm:col-span-2">
            <Toggle
              checked={form.isPublished}
              onChange={(v) => setForm((p) => ({ ...p, isPublished: v }))}
              label={t('result.published')}
            />
          </div>
        </div>
      </Modal>

      {/* bulk */}
      <Modal
        open={bulk.open}
        onClose={() => setBulk((p) => ({ ...p, open: false }))}
        title={t('result.bulkUpload')}
        subtitle={t('result.bulkHint')}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setBulk((p) => ({ ...p, open: false }))}>
              {t('common.cancel')}
            </Button>
            <Button loading={bulk.busy} onClick={runBulk} icon={Upload}>
              {t('result.upload')}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t('result.exam')}>
            <Select
              value={bulk.examId}
              onChange={(e) => setBulk((p) => ({ ...p, examId: e.target.value }))}
              placeholder={t('common.selectPlaceholder')}
              options={exams.map((e2) => ({ value: e2._id, label: e2.name }))}
            />
          </Field>
          <Field label={t('result.totalMarks')}>
            <Input type="number" value={bulk.totalMarks} onChange={(e) => setBulk((p) => ({ ...p, totalMarks: e.target.value }))} />
          </Field>
          <Field label="CSV" className="sm:col-span-2" hint="BBO26-000001,78,100">
            <Textarea
              rows={10}
              value={bulk.rows}
              onChange={(e) => setBulk((p) => ({ ...p, rows: e.target.value }))}
              placeholder={'BBO26-000001,78,100\nBBO26-000002,91,100'}
              className="font-mono text-xs"
            />
          </Field>
          <div className="sm:col-span-2">
            <Toggle checked={bulk.publish} onChange={(v) => setBulk((p) => ({ ...p, publish: v }))} label={t('result.publish')} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!del}
        title={t('common.delete')}
        message={t('common.deleteConfirm')}
        loading={r.busy}
        onCancel={() => setDel(null)}
        onConfirm={async () => {
          if (del) await r.remove(del._id, t('common.deleted'));
          setDel(null);
        }}
      />
    </>
  );
}
