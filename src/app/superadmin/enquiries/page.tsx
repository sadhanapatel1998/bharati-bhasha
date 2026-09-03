'use client';

import React, { useState } from 'react';
import { Search, Trash2, MessageSquareReply, Check } from 'lucide-react';
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

interface EnqRow {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  schoolOrCity?: string;
  subject?: string;
  message?: string;
  reply?: string;
  status: 'pending' | 'resolved';
  createdAt: string;
}

export default function SuperAdminEnquiries() {
  const { t, d } = useI18n();
  const r = useResource<EnqRow>('/api/superadmin/enquiries');
  const [view, setView] = useState<EnqRow | null>(null);
  const [reply, setReply] = useState('');
  const [del, setDel] = useState<EnqRow | null>(null);

  const open = (row: EnqRow) => {
    setReply(row.reply || '');
    setView(row);
  };

  const send = async () => {
    if (!view) return;
    const ok = await r.update(view._id, { reply, status: 'resolved' }, t('common.updated'));
    if (ok) setView(null);
  };

  return (
    <>
      <PageHeader title={t('enq.title')} subtitle={t('enq.subtitle')} />

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-stone-200/80 p-4 dark:border-white/10">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input value={r.q} onChange={(e) => r.search(e.target.value)} placeholder={t('common.searchPlaceholder')} className="pl-9" />
          </div>
          <Select
            className="w-auto min-w-[170px]"
            value={r.filters.status || ''}
            onChange={(e) => r.setFilter('status', e.target.value)}
            options={[
              { value: '', label: t('common.all') },
              { value: 'pending', label: t('enq.status.pending') },
              { value: 'resolved', label: t('enq.status.resolved') },
            ]}
          />
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
                <Th>{t('enq.subject')}</Th>
                <Th>{t('common.phone')}</Th>
                <Th>{t('common.date')}</Th>
                <Th>{t('common.status')}</Th>
                <Th className="text-right">{t('common.actions')}</Th>
              </tr>
            </thead>
            <tbody>
              {r.items.map((row) => (
                <tr key={row._id} className="transition hover:bg-stone-50/70 dark:hover:bg-white/[0.03]">
                  <Td>
                    <span className="block font-semibold">{row.name}</span>
                    <span className="block text-xs text-stone-500">{row.email || row.schoolOrCity}</span>
                  </Td>
                  <Td className="max-w-[300px]">
                    <span className="block truncate">{row.subject || '—'}</span>
                    <span className="block truncate text-xs text-stone-500">{row.message}</span>
                  </Td>
                  <Td className="text-xs">{row.phone || '—'}</Td>
                  <Td className="whitespace-nowrap text-xs text-stone-500">{d(row.createdAt)}</Td>
                  <Td>
                    <Badge tone={row.status === 'resolved' ? 'success' : 'warning'}>
                      {t(`enq.status.${row.status}` as never)}
                    </Badge>
                  </Td>
                  <Td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        title={t('enq.reply')}
                        onClick={() => open(row)}
                        className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 hover:text-[#7B1E1E] dark:hover:bg-white/10"
                      >
                        <MessageSquareReply className="h-4 w-4" />
                      </button>
                      {row.status === 'pending' && (
                        <button
                          title={t('enq.markResolved')}
                          onClick={() => r.update(row._id, { status: 'resolved' }, t('common.updated'))}
                          className="rounded-lg p-2 text-stone-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
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
        open={!!view}
        onClose={() => setView(null)}
        title={view?.subject || t('enq.title')}
        subtitle={view ? `${view.name} · ${view.email || view.phone || ''}` : ''}
        footer={
          <>
            <Button variant="secondary" onClick={() => setView(null)}>
              {t('common.close')}
            </Button>
            <Button loading={r.busy} onClick={send}>
              {t('common.save')}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="rounded-xl bg-stone-50 p-4 text-sm text-stone-700 dark:bg-white/5 dark:text-stone-200">
            {view?.message}
          </div>
          <Field label={t('enq.reply')}>
            <Textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={5} />
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
