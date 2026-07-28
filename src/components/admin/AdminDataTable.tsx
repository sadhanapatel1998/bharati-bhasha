'use client';

import React, { useEffect, useState } from 'react';
import { RefreshCcw, Database } from 'lucide-react';
import { SkeletonTable } from '../shared/Skeleton';

interface Column {
  key: string;
  labelHi: string;
}

interface AdminDataTableProps {
  titleHi: string;
  apiEndpoint: string;
  columns: Column[];
}

export const AdminDataTable: React.FC<AdminDataTableProps> = ({ titleHi, apiEndpoint, columns }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [source, setSource] = useState<'mock' | 'db' | null>(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(apiEndpoint);
      const data = await res.json();
      setRows(Array.isArray(data.data) ? data.data : []);
      setSource(data.source ?? null);
    } catch {
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiEndpoint]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white">{titleHi}</h2>
        <div className="flex items-center gap-2">
          {source && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
              <Database className="w-3 h-3" />
              {source === 'db' ? 'Live DB' : 'Demo Data'}
            </span>
          )}
          <button
            onClick={load}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            aria-label="Refresh"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable rows={5} cols={columns.length} />
      ) : rows.length === 0 ? (
        <div className="p-8 text-center text-xs text-gray-500 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
          कोई डेटा उपलब्ध नहीं है।
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 dark:bg-[#1A1414] text-gray-500">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="text-left font-bold px-4 py-3 whitespace-nowrap">
                    {col.labelHi}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id || row._id || idx} className="border-t border-gray-100 dark:border-gray-800">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {String(row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
