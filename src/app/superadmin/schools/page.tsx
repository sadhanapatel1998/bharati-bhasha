'use client';

import React, { useState } from 'react';
import { Plus, Search, Download, Pencil, Trash2, Check, Ban, KeyRound, RotateCcw } from 'lucide-react';
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

interface SchoolRow {
  _id: string;
  code: string;
  name: string;
  principal?: string;
  email: string;
  phone?: string;
  board?: string;
  city?: string;
  state?: string;
  address?: string;
  pincode?: string;
  status: 'pending' | 'active' | 'rejected' | 'suspended';
  studentCount: number;
  createdAt: string;
}

const empty = {
  name: '',
  principal: '',
  email: '',
  phone: '',
  board: 'CBSE',
  address: '',
  city: '',
  state: '',
  pincode: '',
  password: '',
  status: 'active',
};

const tone = (s: string) =>
  s === 'active' ? 'success' : s === 'pending' ? 'warning' : s === 'suspended' ? 'danger' : 'neutral';

export default function SuperAdminSchools() {
  const { t, n, d } = useI18n();
  const r = useResource<SchoolRow>('/api/superadmin/schools');

  const [modal, setModal] = useState<{ open: boolean; row?: SchoolRow }>({ open: false });
  const [form, setForm] = useState<Record<string, string>>(empty);
  const [pwd, setPwd] = useState<{ open: boolean; row?: SchoolRow; value: string }>({ open: false, value: '' });
  const [del, setDel] = useState<SchoolRow | null>(null);

  const openCreate = () => {
    setForm(empty);
    setModal({ open: true });
  };

  const openEdit = (row: SchoolRow) => {
    setForm({
      name: row.name || '',
      principal: row.principal || '',
      email: row.email || '',
      phone: row.phone || '',
      board: row.board || 'CBSE',
      address: row.address || '',
      city: row.city || '',
      state: row.state || '',
      pincode: row.pincode || '',
      password: '',
      status: row.status,
    });
    setModal({ open: true, row });
  };

  const save = async () => {
    if (!form.name || !form.email) return;
    const ok = modal.row
      ? await r.update(modal.row._id, form, t('common.updated'))
      : await r.create(form, t('common.created'));
    if (ok) setModal({ open: false });
  };

  const setStatus = (row: SchoolRow, status: string) =>
    r.update(row._id, { status }, status === 'active' ? t('school.approved') : t('common.updated'));

  const resetPassword = async () => {
    if (!pwd.row || pwd.value.length < 6) return;
    const ok = await r.update(pwd.row._id, { newPassword: pwd.value }, t('common.updated'));
    if (ok) setPwd({ open: false, value: '' });
  };

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const statusOptions = [
    { value: '', label: t('common.all') },
    { value: 'pending', label: t('school.status.pending') },
    { value: 'active', label: t('school.status.active') },
    { value: 'suspended', label: t('school.status.suspended') },
    { value: 'rejected', label: t('school.status.rejected') },
  ];

  return (
    <>
      <PageHeader title={t('school.title')} subtitle={t('school.subtitle')}>
        <Button
          variant="secondary"
          icon={Download}
          onClick={() =>
            downloadCSV('schools.csv', r.items as unknown as Record<string, unknown>[], [
              { key: 'code', label: 'Code' },
              { key: 'name', label: 'Name' },
              { key: 'principal', label: 'Principal' },
              { key: 'email', label: 'Email' },
              { key: 'phone', label: 'Phone' },
              { key: 'city', label: 'City' },
              { key: 'state', label: 'State' },
              { key: 'status', label: 'Status' },
              { key: 'studentCount', label: 'Students' },
            ])
          }
        >
          {t('common.export')}
        </Button>
        <Button icon={Plus} onClick={openCreate}>
          {t('school.addTitle')}
        </Button>
      </PageHeader>

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-stone-200/80 p-4 dark:border-white/10">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input
              value={r.q}
              onChange={(e) => r.search(e.target.value)}
              placeholder={t('common.searchPlaceholder')}
              className="pl-9"
            />
          </div>
          <Select
            className="w-auto min-w-[170px]"
            value={r.filters.status || ''}
            onChange={(e) => r.setFilter('status', e.target.value)}
            options={statusOptions}
          />
        </div>

        {r.loading ? (
          <TableSkeleton cols={6} />
        ) : !r.items.length ? (
          <EmptyState action={<Button icon={Plus} onClick={openCreate}>{t('school.addTitle')}</Button>} />
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <Th>{t('school.code')}</Th>
                <Th>{t('school.name')}</Th>
                <Th>{t('school.principal')}</Th>
                <Th>{t('common.city')}</Th>
                <Th>{t('school.students')}</Th>
                <Th>{t('common.status')}</Th>
                <Th>{t('school.registeredOn')}</Th>
                <Th className="text-right">{t('common.actions')}</Th>
              </tr>
            </thead>
            <tbody>
              {r.items.map((row) => (
                <tr key={row._id} className="transition hover:bg-stone-50/70 dark:hover:bg-white/[0.03]">
                  <Td className="font-mono text-xs font-bold text-[#7B1E1E] dark:text-[#d9b45f]">{row.code}</Td>
                  <Td>
                    <span className="block font-semibold">{row.name}</span>
                    <span className="block text-xs text-stone-500">{row.email}</span>
                  </Td>
                  <Td>{row.principal || '—'}</Td>
                  <Td>
                    {row.city || '—'}
                    {row.state ? <span className="block text-xs text-stone-400">{row.state}</span> : null}
                  </Td>
                  <Td className="tabular-nums font-bold">{n(row.studentCount || 0)}</Td>
                  <Td>
                    <Badge tone={tone(row.status)}>{t(`school.status.${row.status}` as never)}</Badge>
                  </Td>
                  <Td className="whitespace-nowrap text-xs text-stone-500">{d(row.createdAt)}</Td>
                  <Td>
                    <div className="flex items-center justify-end gap-1">
                      {row.status === 'pending' && (
                        <>
                          <Button size="sm" variant="success" icon={Check} onClick={() => setStatus(row, 'active')}>
                            {t('school.approve')}
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => setStatus(row, 'rejected')}>
                            {t('school.reject')}
                          </Button>
                        </>
                      )}
                      {row.status === 'active' && (
                        <button
                          title={t('school.suspend')}
                          onClick={() => setStatus(row, 'suspended')}
                          className="rounded-lg p-2 text-stone-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      )}
                      {(row.status === 'suspended' || row.status === 'rejected') && (
                        <button
                          title={t('school.reactivate')}
                          onClick={() => setStatus(row, 'active')}
                          className="rounded-lg p-2 text-stone-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        title={t('school.resetPassword')}
                        onClick={() => setPwd({ open: true, row, value: '' })}
                        className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-white/10"
                      >
                        <KeyRound className="h-4 w-4" />
                      </button>
                      <button
                        title={t('common.edit')}
                        onClick={() => openEdit(row)}
                        className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 hover:text-[#7B1E1E] dark:hover:bg-white/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        title={t('common.delete')}
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

      {/* create / edit */}
      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.row ? t('school.editTitle') : t('school.addTitle')}
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
          <Field label={t('school.name')} required className="sm:col-span-2">
            <Input value={form.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label={t('school.principal')}>
            <Input value={form.principal} onChange={(e) => set('principal', e.target.value)} />
          </Field>
          <Field label={t('common.email')} required>
            <Input type="email" value={form.email} disabled={!!modal.row} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label={t('common.phone')}>
            <Input value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label={t('school.board')}>
            <Select
              value={form.board}
              onChange={(e) => set('board', e.target.value)}
              options={['CBSE', 'ICSE', 'State Board', 'IB', 'Other'].map((v) => ({ value: v, label: v }))}
            />
          </Field>
          <Field label={t('common.address')} className="sm:col-span-2">
            <Input value={form.address} onChange={(e) => set('address', e.target.value)} />
          </Field>
          <Field label={t('common.city')}>
            <Input value={form.city} onChange={(e) => set('city', e.target.value)} />
          </Field>
          <Field label={t('common.state')}>
            <Input value={form.state} onChange={(e) => set('state', e.target.value)} />
          </Field>
          <Field label={t('common.pincode')}>
            <Input value={form.pincode} onChange={(e) => set('pincode', e.target.value)} />
          </Field>
          <Field label={t('common.status')}>
            <Select
              value={form.status}
              onChange={(e) => set('status', e.target.value)}
              options={statusOptions.filter((o) => o.value)}
            />
          </Field>
          {!modal.row && (
            <Field label={t('common.password')} hint="school@123" className="sm:col-span-2">
              <Input type="text" value={form.password} onChange={(e) => set('password', e.target.value)} />
            </Field>
          )}
        </div>
      </Modal>

      {/* reset password */}
      <Modal
        open={pwd.open}
        onClose={() => setPwd({ open: false, value: '' })}
        title={t('school.resetPassword')}
        subtitle={pwd.row?.name}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setPwd({ open: false, value: '' })}>
              {t('common.cancel')}
            </Button>
            <Button loading={r.busy} onClick={resetPassword}>
              {t('common.save')}
            </Button>
          </>
        }
      >
        <Field label={t('school.newPassword')} required hint={t('auth.passwordMin')}>
          <Input value={pwd.value} onChange={(e) => setPwd((p) => ({ ...p, value: e.target.value }))} />
        </Field>
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
