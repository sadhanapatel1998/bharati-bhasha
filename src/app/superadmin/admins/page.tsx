'use client';

import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2, Check } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { usePanel } from '../../../components/panel/PanelProvider';
import { useResource } from '../../../components/panel/useResource';
import {
  PERMISSION_GROUPS,
  ALL_PERMISSIONS,
  DEFAULT_ADMIN_PERMISSIONS,
  normalizePermissions,
} from '../../../server/lib/permissions';
import {
  Card,
  PageHeader,
  Button,
  Input,
  Select,
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

interface AdminRow {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  designation?: string;
  role: 'superadmin' | 'admin';
  permissions?: string[];
  isActive: boolean;
  lastLogin?: string;
}

const permLabel = (p: string, t: (k: never) => string) => {
  if (p.endsWith('.manage')) return t('perm.manage' as never);
  if (p.endsWith('.publish')) return t('perm.publish' as never);
  return t('perm.view' as never);
};

const empty = { name: '', email: '', phone: '', designation: '', role: 'admin', password: '' };

export default function SuperAdminAdmins() {
  const { t, d } = useI18n();
  const { user, toast } = usePanel();
  const r = useResource<AdminRow>('/api/superadmin/admins');

  const [modal, setModal] = useState<{ open: boolean; row?: AdminRow }>({ open: false });
  const [form, setForm] = useState<Record<string, string>>(empty);
  const [active, setActive] = useState(true);
  const [perms, setPerms] = useState<string[]>(DEFAULT_ADMIN_PERMISSIONS as string[]);
  const [del, setDel] = useState<AdminRow | null>(null);

  const togglePerm = (p: string) =>
    setPerms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : normalizePermissions([...prev, p])));

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openEdit = (row: AdminRow) => {
    setForm({
      name: row.name,
      email: row.email,
      phone: row.phone || '',
      designation: row.designation || '',
      role: row.role,
      password: '',
    });
    setActive(row.isActive);
    setPerms(row.permissions || []);
    setModal({ open: true, row });
  };

  const save = async () => {
    if (!form.name || !form.email) return;
    if (!modal.row && form.password.length < 6) {
      toast(t('auth.passwordMin'), 'error');
      return;
    }
    const payload: Record<string, unknown> = {
      ...form,
      isActive: active,
      permissions: form.role === 'superadmin' ? [] : perms,
    };
    if (modal.row && !form.password) delete payload.password;
    const ok = modal.row
      ? await r.update(modal.row._id, payload, t('common.updated'))
      : await r.create(payload, t('common.created'));
    if (ok) setModal({ open: false });
  };

  return (
    <>
      <PageHeader title={t('admin.title')} subtitle={t('admin.subtitle')}>
        <Button
          icon={Plus}
          onClick={() => {
            setForm(empty);
            setActive(true);
            setPerms(DEFAULT_ADMIN_PERMISSIONS as string[]);
            setModal({ open: true });
          }}
        >
          {t('admin.addTitle')}
        </Button>
      </PageHeader>

      <Card>
        <div className="border-b border-stone-200/80 p-4 dark:border-white/10">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input value={r.q} onChange={(e) => r.search(e.target.value)} placeholder={t('common.searchPlaceholder')} className="pl-9" />
          </div>
        </div>

        {r.loading ? (
          <TableSkeleton cols={5} />
        ) : !r.items.length ? (
          <EmptyState />
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <Th>{t('common.name')}</Th>
                <Th>{t('admin.designation')}</Th>
                <Th>{t('common.role')}</Th>
                <Th>{t('admin.lastLogin')}</Th>
                <Th>{t('common.status')}</Th>
                <Th className="text-right">{t('common.actions')}</Th>
              </tr>
            </thead>
            <tbody>
              {r.items.map((row) => (
                <tr key={row._id} className="transition hover:bg-stone-50/70 dark:hover:bg-white/[0.03]">
                  <Td>
                    <span className="block font-semibold">{row.name}</span>
                    <span className="block text-xs text-stone-500">{row.email}</span>
                  </Td>
                  <Td className="text-xs">
                    {row.designation || '—'}
                    <span className="mt-0.5 block text-[11px] text-stone-400">
                      {row.role === 'superadmin'
                        ? t('admin.selectAll')
                        : `${(row.permissions || []).length} ${t('admin.permCount')}`}
                    </span>
                  </Td>
                  <Td>
                    <Badge tone={row.role === 'superadmin' ? 'gold' : 'info'}>
                      {t(`admin.role.${row.role}` as never)}
                    </Badge>
                  </Td>
                  <Td className="whitespace-nowrap text-xs text-stone-500">{row.lastLogin ? d(row.lastLogin) : '—'}</Td>
                  <Td>
                    <Badge tone={row.isActive ? 'success' : 'danger'}>
                      {row.isActive ? t('school.status.active') : t('school.status.suspended')}
                    </Badge>
                  </Td>
                  <Td>
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(row)}
                        className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 hover:text-[#7B1E1E] dark:hover:bg-white/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        disabled={row._id === user?.id}
                        onClick={() => (row._id === user?.id ? toast(t('admin.cannotDeleteSelf'), 'warning') : setDel(row))}
                        className="rounded-lg p-2 text-stone-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 dark:hover:bg-rose-500/10"
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
        title={modal.row ? t('admin.editTitle') : t('admin.addTitle')}
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
          <Field label={t('common.name')} required>
            <Input value={form.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label={t('common.email')} required>
            <Input type="email" value={form.email} disabled={!!modal.row} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label={t('common.phone')}>
            <Input value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label={t('admin.designation')}>
            <Input value={form.designation} onChange={(e) => set('designation', e.target.value)} />
          </Field>
          <Field label={t('common.role')}>
            <Select
              value={form.role}
              onChange={(e) => set('role', e.target.value)}
              options={[
                { value: 'admin', label: t('admin.role.admin') },
                { value: 'superadmin', label: t('admin.role.superadmin') },
              ]}
            />
          </Field>
          <Field label={t('common.password')} required={!modal.row} hint={modal.row ? t('common.optional') : t('auth.passwordMin')}>
            <Input value={form.password} onChange={(e) => set('password', e.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Toggle checked={active} onChange={setActive} label={t('school.status.active')} />
          </div>

          {form.role !== 'superadmin' && (
            <div className="sm:col-span-2">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-100">{t('admin.permissions')}</p>
                  <p className="text-[11px] text-stone-500">{t('admin.permissionsHint')}</p>
                </div>
                <div className="flex gap-1.5">
                  <Button size="sm" variant="secondary" onClick={() => setPerms([...(ALL_PERMISSIONS as string[])])}>
                    {t('admin.selectAll')}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setPerms([])}>
                    {t('admin.clearAll')}
                  </Button>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {PERMISSION_GROUPS.map((g) => (
                  <div key={g.group} className="rounded-xl border border-stone-200 p-3 dark:border-white/10">
                    <p className="mb-2 text-xs font-bold text-stone-700 dark:text-stone-200">{g.group}</p>
                    <div className="space-y-1.5">
                      {g.items.map((p) => {
                        const on = perms.includes(p);
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => togglePerm(p)}
                            className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-semibold transition ${
                              on
                                ? 'bg-[#7B1E1E]/10 text-[#7B1E1E] dark:bg-[#7B1E1E]/25 dark:text-[#e8c877]'
                                : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-white/[0.06]'
                            }`}
                          >
                            <span
                              className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${
                                on ? 'border-[#7B1E1E] bg-[#7B1E1E] text-white' : 'border-stone-300 dark:border-white/20'
                              }`}
                            >
                              {on && <Check className="h-3 w-3" />}
                            </span>
                            {permLabel(p, t as never)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
