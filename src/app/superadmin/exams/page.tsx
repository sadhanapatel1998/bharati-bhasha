'use client';

import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { useResource } from '../../../components/panel/useResource';
import {
  Card,
  PageHeader,
  Button,
  Input,
  Select,
  Textarea,
  Field,
  Badge,
  Modal,
  ConfirmDialog,
  TableWrap,
  Th,
  Td,
  EmptyState,
  TableSkeleton,
  Pagination,
} from '../../../components/panel/ui';

interface ExamRow {
  _id: string;
  name: string;
  nameHi?: string;
  session: string;
  level: 'school' | 'state' | 'national';
  subject: 'hindi' | 'sanskrit' | 'both';
  examDate?: string;
  durationMinutes: number;
  totalMarks: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  notes?: string;
}

const empty = {
  name: '',
  nameHi: '',
  session: '2026',
  level: 'school',
  subject: 'both',
  examDate: '',
  durationMinutes: '60',
  totalMarks: '100',
  status: 'upcoming',
  notes: '',
};

export default function SuperAdminExams() {
  const { t, d } = useI18n();
  const r = useResource<ExamRow>('/api/superadmin/exams');
  const [modal, setModal] = useState<{ open: boolean; row?: ExamRow }>({ open: false });
  const [form, setForm] = useState<Record<string, string>>(empty);
  const [del, setDel] = useState<ExamRow | null>(null);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openEdit = (row: ExamRow) => {
    setForm({
      name: row.name || '',
      nameHi: row.nameHi || '',
      session: row.session || '2026',
      level: row.level,
      subject: row.subject,
      examDate: row.examDate || '',
      durationMinutes: String(row.durationMinutes || 60),
      totalMarks: String(row.totalMarks || 100),
      status: row.status,
      notes: row.notes || '',
    });
    setModal({ open: true, row });
  };

  const save = async () => {
    if (!form.name) return;
    const payload = {
      ...form,
      durationMinutes: Number(form.durationMinutes) || 60,
      totalMarks: Number(form.totalMarks) || 100,
    };
    const ok = modal.row
      ? await r.update(modal.row._id, payload, t('common.updated'))
      : await r.create(payload, t('common.created'));
    if (ok) setModal({ open: false });
  };

  const levelOptions = [
    { value: 'school', label: t('exam.level.school') },
    { value: 'state', label: t('exam.level.state') },
    { value: 'national', label: t('exam.level.national') },
  ];
  const statusOptions = [
    { value: 'upcoming', label: t('exam.status.upcoming') },
    { value: 'ongoing', label: t('exam.status.ongoing') },
    { value: 'completed', label: t('exam.status.completed') },
  ];
  const subjectOptions = [
    { value: 'hindi', label: t('student.subject.hindi') },
    { value: 'sanskrit', label: t('student.subject.sanskrit') },
    { value: 'both', label: t('student.subject.both') },
  ];

  return (
    <>
      <PageHeader title={t('exam.title')} subtitle={t('exam.subtitle')}>
        <Button
          icon={Plus}
          onClick={() => {
            setForm(empty);
            setModal({ open: true });
          }}
        >
          {t('exam.addTitle')}
        </Button>
      </PageHeader>

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-stone-200/80 p-4 dark:border-white/10">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input value={r.q} onChange={(e) => r.search(e.target.value)} placeholder={t('common.searchPlaceholder')} className="pl-9" />
          </div>
          <Select
            className="w-auto min-w-[160px]"
            value={r.filters.status || ''}
            onChange={(e) => r.setFilter('status', e.target.value)}
            options={[{ value: '', label: t('common.all') }, ...statusOptions]}
          />
        </div>

        {r.loading ? (
          <TableSkeleton cols={6} />
        ) : !r.items.length ? (
          <EmptyState />
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <Th>{t('exam.examName')}</Th>
                <Th>{t('exam.level')}</Th>
                <Th>{t('student.subject')}</Th>
                <Th>{t('exam.examDate')}</Th>
                <Th>{t('result.totalMarks')}</Th>
                <Th>{t('common.status')}</Th>
                <Th className="text-right">{t('common.actions')}</Th>
              </tr>
            </thead>
            <tbody>
              {r.items.map((row) => (
                <tr key={row._id} className="transition hover:bg-stone-50/70 dark:hover:bg-white/[0.03]">
                  <Td>
                    <span className="block font-semibold">{row.name}</span>
                    <span className="block text-xs text-stone-500">{row.nameHi || `${t('exam.session')} ${row.session}`}</span>
                  </Td>
                  <Td>
                    <Badge tone="info">{t(`exam.level.${row.level}` as never)}</Badge>
                  </Td>
                  <Td>{t(`student.subject.${row.subject}` as never)}</Td>
                  <Td className="whitespace-nowrap text-xs">{row.examDate ? d(row.examDate) : '—'}</Td>
                  <Td className="tabular-nums">{row.totalMarks}</Td>
                  <Td>
                    <Badge tone={row.status === 'completed' ? 'success' : row.status === 'ongoing' ? 'warning' : 'neutral'}>
                      {t(`exam.status.${row.status}` as never)}
                    </Badge>
                  </Td>
                  <Td>
                    <div className="flex items-center justify-end gap-1">
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

      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.row ? t('exam.editTitle') : t('exam.addTitle')}
        size="lg"
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
          <Field label={`${t('exam.examName')} (EN)`} required>
            <Input value={form.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label={`${t('exam.examName')} (हिं)`}>
            <Input value={form.nameHi} onChange={(e) => set('nameHi', e.target.value)} />
          </Field>
          <Field label={t('exam.session')}>
            <Input value={form.session} onChange={(e) => set('session', e.target.value)} />
          </Field>
          <Field label={t('exam.level')}>
            <Select value={form.level} onChange={(e) => set('level', e.target.value)} options={levelOptions} />
          </Field>
          <Field label={t('student.subject')}>
            <Select value={form.subject} onChange={(e) => set('subject', e.target.value)} options={subjectOptions} />
          </Field>
          <Field label={t('exam.examDate')}>
            <Input type="date" value={form.examDate} onChange={(e) => set('examDate', e.target.value)} />
          </Field>
          <Field label={t('exam.duration')}>
            <Input type="number" value={form.durationMinutes} onChange={(e) => set('durationMinutes', e.target.value)} />
          </Field>
          <Field label={t('result.totalMarks')}>
            <Input type="number" value={form.totalMarks} onChange={(e) => set('totalMarks', e.target.value)} />
          </Field>
          <Field label={t('common.status')}>
            <Select value={form.status} onChange={(e) => set('status', e.target.value)} options={statusOptions} />
          </Field>
          <Field label={t('common.notes')} className="sm:col-span-2">
            <Textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} />
          </Field>
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
