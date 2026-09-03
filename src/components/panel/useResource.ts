'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePanel } from './PanelProvider';

export interface ListResponse<T> {
  success: boolean;
  items: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export function useResource<T extends { _id: string }>(endpoint: string, initialFilters: Record<string, string> = {}) {
  const { api, toast } = usePanel();

  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [q, setQ] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const query = useMemo(() => {
    const sp = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (q.trim()) sp.set('q', q.trim());
    Object.entries(filters).forEach(([k, v]) => v && sp.set(k, v));
    return sp.toString();
  }, [page, limit, q, filters]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<ListResponse<T>>(`${endpoint}?${query}`);
      setItems(data.items || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [api, endpoint, query]);

  // debounce search, immediate for everything else
  useEffect(() => {
    const timer = setTimeout(load, q ? 350 : 0);
    return () => clearTimeout(timer);
  }, [load, q]);

  const create = useCallback(
    async (payload: Record<string, unknown>, successMsg: string) => {
      setBusy(true);
      try {
        await api(endpoint, { method: 'POST', body: JSON.stringify(payload) });
        toast(successMsg, 'success');
        await load();
        return true;
      } catch {
        return false;
      } finally {
        setBusy(false);
      }
    },
    [api, endpoint, load, toast]
  );

  const update = useCallback(
    async (id: string, payload: Record<string, unknown>, successMsg: string) => {
      setBusy(true);
      try {
        await api(`${endpoint}/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
        toast(successMsg, 'success');
        await load();
        return true;
      } catch {
        return false;
      } finally {
        setBusy(false);
      }
    },
    [api, endpoint, load, toast]
  );

  const remove = useCallback(
    async (id: string, successMsg: string) => {
      setBusy(true);
      try {
        await api(`${endpoint}/${id}`, { method: 'DELETE' });
        toast(successMsg, 'success');
        await load();
        return true;
      } catch {
        return false;
      } finally {
        setBusy(false);
      }
    },
    [api, endpoint, load, toast]
  );

  const setFilter = useCallback((key: string, value: string) => {
    setPage(1);
    setFilters((p) => ({ ...p, [key]: value }));
  }, []);

  const search = useCallback((value: string) => {
    setPage(1);
    setQ(value);
  }, []);

  return {
    items,
    total,
    page,
    pages,
    loading,
    busy,
    q,
    filters,
    setPage,
    search,
    setFilter,
    reload: load,
    create,
    update,
    remove,
  };
}

/** turns any array of flat objects into a downloadable CSV */
export function downloadCSV(filename: string, rows: Record<string, unknown>[], columns: { key: string; label: string }[]) {
  if (!rows.length) return;
  const escape = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [
    columns.map((c) => escape(c.label)).join(','),
    ...rows.map((r) => columns.map((c) => escape(r[c.key])).join(',')),
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
