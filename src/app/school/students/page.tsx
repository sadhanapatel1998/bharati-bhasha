'use client';

import React, { useState } from 'react';
import { Plus, Search, Download, Pencil, Trash2 } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { useResource, downloadCSV } from '../../../components/panel/useResource';
import {
  Card,
  PageHeader,
  Button,
  Input,
  Select,
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

interface StudentRow {
  _id: string;
  rollNo: string;
  name: string;
  fatherName?: string;
  motherName?: string;
  dob?: string;
  gender?: string;
  classLevel: string;
  section?: string;
  subject: 'hindi' | 'sanskrit' | 'both';
  phone?: string;
  email?: string;
  examCenter?: string;
  status: string;
  createdAt: string;
}

const CLASSES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const empty = {
  name: '',
  fatherName: '',
  motherName: '',
  dob: '',
  gender: '',
  classLevel: '',
  section: '',
  subject: 'hindi',
  phone: '',
  email: '',
  examCenter: '',
};

export default function SchoolStudents() {
  const { t, d } = useI18n();
  const r = useResource<StudentRow>('/api/school/students');
  const [modal, setModal] = useState<{ open: boolean; row?: StudentRow }>({ open: false });
  const [form, setForm] = useState<Record<string, string>>(empty);
  const [del, setDel] = useState<StudentRow | null>(null);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openEdit = (row: StudentRow) => {
    setForm({
      name: row.name || '',
      fatherName: row.fatherName || '',
      motherName: row.motherName || '',
      dob: row.dob || '',
      gender: row.gender || '',
      classLevel: row.classLevel || '',
      section: row.section || '',
      subject: row.subject || 'hindi',
      phone: row.phone || '',
      email: row.email || '',
      examCenter: row.examCenter || '',
    });
    setModal({ open: true, row });
  };

  const save = async () => {
    if (!form.name || !form.classLevel) return;
    const ok = modal.row
      ? await r.update(modal.row._id, form, t('common.updated'))
      : await r.create(form, t('common.created'));
    if (ok) setModal({ open: false });
  };

  const subjectOptions = [
    { value: 'hindi', label: t('student.subject.hindi') },
    { value: 'sanskrit', label: t('student.subject.sanskrit') },
    { value: 'both', label: t('student.subject.both') },
  ];

  return (
    <>
      <PageHeader title={t('student.title')} subtitle={t('student.schoolSubtitle')}>
        <Button
          variant="secondary"
          icon={Download}
          onClick={() =>
            downloadCSV('my-students.csv', r.items as unknown as Record<string, unknown>[], [
              { key: 'rollNo', label: 'Roll No' },
              { key: 'name', label: 'Name' },
              { key: 'fatherName', label: 'Father' },
              { key: 'classLevel', label: 'Class' },
              { key: 'subject', label: 'Subject' },
              { key: 'status', label: 'Status' },
            ])
          }
        >
          {t('common.export')}
        </Button>
        <Button
          icon={Plus}
          onClick={() => {
            setForm(empty);
            setModal({ open: true });
          }}
        >
          {t('student.addTitle')}
        </Button>
      </PageHeader>

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-stone-200/80 p-4 dark:border-white/10">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input value={r.q} onChange={(e) => r.search(e.target.value)} placeholder={t('common.searchPlaceholder')} className="pl-9" />
          </div>
          <Select
            className="w-auto min-w-[140px]"
            value={r.filters.classLevel || ''}
            onChange={(e) => r.setFilter('classLevel', e.target.value)}
            options={[{ value: '', label: t('student.class') }, ...CLASSES.map((c) => ({ value: c, label: c }))]}
          />
          <Select
            className="w-auto min-w-[150px]"
            value={r.filters.subject || ''}
            onChange={(e) => r.setFilter('subject', e.target.value)}
            options={[{ value: '', label: t('student.subject') }, ...subjectOptions]}
          />
        </div>

        {r.loading ? (
          <TableSkeleton cols={6} />
        ) : !r.items.length ? (
          <EmptyState
            action={
              <Button
                icon={Plus}
                onClick={() => {
                  setForm(empty);
                  setModal({ open: true });
                }}
              >
                {t('student.addTitle')}
              </Button>
            }
          />
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <Th>{t('student.rollNo')}</Th>
                <Th>{t('student.name')}</Th>
                <Th>{t('student.class')}</Th>
                <Th>{t('student.subject')}</Th>
                <Th>{t('common.status')}</Th>
                <Th>{t('common.date')}</Th>
                <Th className="text-right">{t('common.actions')}</Th>
              </tr>
            </thead>
            <tbody>
              {r.items.map((row) => (
                <tr key={row._id} className="transition hover:bg-stone-50/70 dark:hover:bg-white/[0.03]">
                  <Td className="font-mono text-xs font-bold text-[#7B1E1E] dark:text-[#d9b45f]">{row.rollNo}</Td>
                  <Td>
                    <span className="block font-semibold">{row.name}</span>
                    <span className="block text-xs text-stone-500">{row.fatherName || '—'}</span>
                  </Td>
                  <Td>
                    {row.classLevel}
                    {row.section ? `-${row.section}` : ''}
                  </Td>
                  <Td>
                    <Badge tone="info">{t(`student.subject.${row.subject}` as never)}</Badge>
                  </Td>
                  <Td>
                    <Badge tone={row.status === 'appeared' ? 'success' : 'neutral'}>
                      {t(`student.status.${row.status}` as never)}
                    </Badge>
                  </Td>
                  <Td className="whitespace-nowrap text-xs text-stone-500">{d(row.createdAt)}</Td>
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
        title={modal.row ? t('student.editTitle') : t('student.addTitle')}
        subtitle={modal.row ? modal.row.rollNo : t('student.rollAuto')}
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
          <Field label={t('student.name')} required>
            <Input value={form.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label={t('student.fatherName')}>
            <Input value={form.fatherName} onChange={(e) => set('fatherName', e.target.value)} />
          </Field>
          <Field label={t('student.motherName')}>
            <Input value={form.motherName} onChange={(e) => set('motherName', e.target.value)} />
          </Field>
          <Field label={t('student.dob')}>
            <Input type="date" value={form.dob} onChange={(e) => set('dob', e.target.value)} />
          </Field>
          <Field label={t('student.gender')}>
            <Select
              value={form.gender}
              onChange={(e) => set('gender', e.target.value)}
              placeholder={t('common.selectPlaceholder')}
              options={[
                { value: 'male', label: t('student.gender.male') },
                { value: 'female', label: t('student.gender.female') },
                { value: 'other', label: t('student.gender.other') },
              ]}
            />
          </Field>
          <Field label={t('student.class')} required>
            <Select
              value={form.classLevel}
              onChange={(e) => set('classLevel', e.target.value)}
              placeholder={t('common.selectPlaceholder')}
              options={CLASSES.map((c) => ({ value: c, label: c }))}
            />
          </Field>
          <Field label={t('student.section')}>
            <Input value={form.section} onChange={(e) => set('section', e.target.value)} />
          </Field>
          <Field label={t('student.subject')} required>
            <Select value={form.subject} onChange={(e) => set('subject', e.target.value)} options={subjectOptions} />
          </Field>
          <Field label={t('common.phone')}>
            <Input value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label={t('common.email')}>
            <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label={t('student.examCenter')} className="sm:col-span-2">
            <Input value={form.examCenter} onChange={(e) => set('examCenter', e.target.value)} />
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
