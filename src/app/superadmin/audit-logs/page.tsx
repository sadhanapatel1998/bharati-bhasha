'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { useResource } from '../../../components/panel/useResource';
import {
  Card,
  PageHeader,
  Input,
  Badge,
  TableWrap,
  Th,
  Td,
  EmptyState,
  TableSkeleton,
  Pagination,
} from '../../../components/panel/ui';

interface LogRow {
  _id: string;
  actorName?: string;
  actorRole?: string;
  action: string;
  entity: string;
  entityLabel?: string;
  createdAt: string;
}

const actionTone = (a: string) =>
  a === 'delete' ? 'danger' : a === 'create' ? 'success' : a.startsWith('bulk') ? 'gold' : 'info';

export default function AuditLogsPage() {
  const { t, d } = useI18n();
  const r = useResource<LogRow>('/api/superadmin/audit-logs');

  return (
    <>
      <PageHeader title={t('audit.title')} subtitle={t('audit.subtitle')} />

      <Card>
        <div className="border-b border-stone-200/80 p-4 dark:border-white/10">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input value={r.q} onChange={(e) => r.search(e.target.value)} placeholder={t('common.searchPlaceholder')} className="pl-9" />
          </div>
        </div>

        {r.loading ? (
          <TableSkeleton cols={4} />
        ) : !r.items.length ? (
          <EmptyState />
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <Th>{t('audit.actor')}</Th>
                <Th>{t('audit.action')}</Th>
                <Th>{t('audit.entity')}</Th>
                <Th>{t('audit.time')}</Th>
              </tr>
            </thead>
            <tbody>
              {r.items.map((row) => (
                <tr key={row._id} className="transition hover:bg-stone-50/70 dark:hover:bg-white/[0.03]">
                  <Td>
                    <span className="block font-semibold">{row.actorName || '—'}</span>
                    <span className="block text-xs text-stone-500">{row.actorRole}</span>
                  </Td>
                  <Td>
                    <Badge tone={actionTone(row.action)}>{row.action}</Badge>
                  </Td>
                  <Td>
                    <span className="font-semibold">{row.entity}</span>
                    {row.entityLabel && <span className="block text-xs text-stone-500">{row.entityLabel}</span>}
                  </Td>
                  <Td className="whitespace-nowrap text-xs text-stone-500">{d(row.createdAt)}</Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}

        <Pagination page={r.page} pages={r.pages} total={r.total} onPage={r.setPage} />
      </Card>
    </>
  );
}
