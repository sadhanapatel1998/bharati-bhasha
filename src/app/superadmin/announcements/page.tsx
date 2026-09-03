'use client';

import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { useResource } from '../../../components/panel/useResource';
import {
  Card,
  PageHeader,
  Button,
  Input,
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

interface AnnRow {
  _id: string;
  title: string;
  titleHi?: string;
  body?: string;
  bodyHi?: string;
  category?: string;
  audience?: string;
  isPublished: boolean;
  views: number;
  createdAt: string;
}

const empty = { title: '', titleHi: '', body: '', bodyHi: '', category: 'general', audience: 'all' };

export default function SuperAdminAnnouncements() {
  const { t, d, pick } = useI18n();
  const r = useResource<AnnRow>('/api/superadmin/announcements');
  const [modal, setModal] = useState<{ open: boolean; row?: AnnRow }>({ open: false });
  const [form, setForm] = useState<Record<string, string>>(empty);
  const [published, setPublished] = useState(true);
  const [del, setDel] = useState<AnnRow | null>(null);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openEdit = (row: AnnRow) => {
    setForm({
      title: row.title || '',
      titleHi: row.titleHi || '',
      body: row.body || '',
      bodyHi: row.bodyHi || '',
      category: row.category || 'general',
      audience: row.audience || 'all',
    });
    setPublished(row.isPublished);
    setModal({ open: true, row });
  };

  const save = async () => {
    if (!form.title && !form.titleHi) return;
    const payload = { ...form, isPublished: published };
    const ok = modal.row
      ? await r.update(modal.row._id, payload, t('common.updated'))
      : await r.create(payload, t('common.created'));
    if (ok) setModal({ open: false });
  };

  return (
    <>
      <PageHeader title={t('ann.title')} subtitle={t('ann.subtitle')}>
        <Button
          icon={Plus}
          onClick={() => {
            setForm(empty);
            setPublished(true);
            setModal({ open: true });
          }}
        >
          {t('ann.addTitle')}
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
                <Th>{t('ann.heading')}</Th>
                <Th>{t('ann.category')}</Th>
                <Th>{t('ann.audience')}</Th>
                <Th>{t('common.date')}</Th>
                <Th>{t('common.status')}</Th>
                <Th className="text-right">{t('common.actions')}</Th>
              </tr>
            </thead>
            <tbody>
              {r.items.map((row) => (
                <tr key={row._id} className="transition hover:bg-stone-50/70 dark:hover:bg-white/[0.03]">
                  <Td className="max-w-[360px]">
                    <span className="block truncate font-semibold">{pick({ en: row.title, hi: row.titleHi })}</span>
                    <span className="block truncate text-xs text-stone-500">{pick({ en: row.body, hi: row.bodyHi })}</span>
                  </Td>
                  <Td className="text-xs">{row.category}</Td>
                  <Td className="text-xs">{row.audience}</Td>
                  <Td className="whitespace-nowrap text-xs text-stone-500">{d(row.createdAt)}</Td>
                  <Td>
                    <Badge tone={row.isPublished ? 'success' : 'neutral'}>
                      {row.isPublished ? t('ann.published') : t('result.draft')}
                    </Badge>
                  </Td>
                  <Td>
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      <button
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

      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.row ? t('ann.editTitle') : t('ann.addTitle')}
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
          <Field label={`${t('ann.heading')} (EN)`} required>
            <Input value={form.title} onChange={(e) => set('title', e.target.value)} />
          </Field>
          <Field label={`${t('ann.heading')} (हिं)`}>
            <Input value={form.titleHi} onChange={(e) => set('titleHi', e.target.value)} />
          </Field>
          <Field label={`${t('ann.body')} (EN)`}>
            <Textarea value={form.body} onChange={(e) => set('body', e.target.value)} />
          </Field>
          <Field label={`${t('ann.body')} (हिं)`}>
            <Textarea value={form.bodyHi} onChange={(e) => set('bodyHi', e.target.value)} />
          </Field>
          <Field label={t('ann.category')}>
            <Input value={form.category} onChange={(e) => set('category', e.target.value)} />
          </Field>
          <Field label={t('ann.audience')}>
            <Input value={form.audience} onChange={(e) => set('audience', e.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Toggle checked={published} onChange={setPublished} label={t('ann.published')} />
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
