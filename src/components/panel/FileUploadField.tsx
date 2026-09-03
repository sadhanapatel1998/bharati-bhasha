'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, X, FileText, Loader2, Library, Trash2, Link2, Check, ExternalLink } from 'lucide-react';
import { useI18n } from '../../i18n/LangProvider';
import { usePanel } from './PanelProvider';
import { Button, Input, Modal } from './ui';

export type FileFolder = 'papers' | 'docs' | 'content';

interface LibraryFile {
  url: string;
  filename: string;
  size: number;
  mtime: string;
  isImage?: boolean;
}

const prettySize = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);

/**
 * Upload a PDF (or doc/xls) and store its public path, e.g.
 * "/uploads/papers/hindi-model-paper-1712345678-a1b2.pdf".
 */
export const FileUploadField: React.FC<{
  value: string;
  onChange: (url: string) => void;
  folder?: FileFolder;
  disabled?: boolean;
}> = ({ value, onChange, folder = 'papers', disabled }) => {
  const { t, lang } = useI18n();
  const { toast } = usePanel();
  const inputRef = useRef<HTMLInputElement>(null);

  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [libOpen, setLibOpen] = useState(false);

  const hasFile = Boolean(value && value !== '#');

  const upload = useCallback(
    async (file: File) => {
      setBusy(true);
      try {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', folder);
        const res = await fetch('/api/superadmin/uploads', { method: 'POST', body: fd, credentials: 'include' });
        const data = await res.json();
        if (!res.ok) {
          toast(data?.message || t('common.error'), 'error');
          return;
        }
        onChange(data.url);
        toast(lang === 'hi' ? 'फ़ाइल अपलोड हुई' : 'File uploaded', 'success');
      } catch {
        toast(t('common.error'), 'error');
      } finally {
        setBusy(false);
      }
    },
    [folder, lang, onChange, t, toast]
  );

  return (
    <>
      <div className="w-full min-w-0 space-y-2">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            if (disabled) return;
            const f = e.dataTransfer.files?.[0];
            if (f) upload(f);
          }}
          className={`rounded-xl border-2 border-dashed p-3 transition ${
            drag ? 'border-[#7B1E1E] bg-[#7B1E1E]/[0.05]' : 'border-stone-200 bg-stone-50 dark:border-white/10 dark:bg-white/[0.03]'
          }`}
        >
          {hasFile ? (
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/15">
                <FileText className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block break-all text-sm font-semibold text-stone-800 dark:text-stone-100">
                  {value.split('/').pop()}
                </span>
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7B1E1E] hover:underline dark:text-[#d9b45f]"
                >
                  <ExternalLink className="h-3 w-3" />
                  {lang === 'hi' ? 'खोलें' : 'Open'}
                </a>
              </span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="rounded-lg p-1.5 text-stone-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              disabled={disabled || busy}
              onClick={() => inputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-1.5 px-4 py-5 text-center"
            >
              {busy ? (
                <Loader2 className="h-5 w-5 animate-spin text-[#7B1E1E]" />
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-stone-400 shadow-sm dark:bg-white/10">
                  <FileText className="h-5 w-5" />
                </span>
              )}
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                {lang === 'hi' ? 'PDF यहाँ छोड़ें या चुनें' : 'Drop a PDF here, or click to choose'}
              </span>
              <span className="text-[11px] text-stone-400">PDF · DOC · DOCX · XLS · XLSX — max 25 MB</span>
            </button>
          )}
        </div>

        <div className="flex w-full min-w-0 flex-wrap items-center gap-2">
          <Button size="sm" variant="secondary" icon={Upload} loading={busy} disabled={disabled} onClick={() => inputRef.current?.click()}>
            {lang === 'hi' ? 'अपलोड' : 'Upload'}
          </Button>
          <Button size="sm" variant="secondary" icon={Library} disabled={disabled} onClick={() => setLibOpen(true)}>
            {lang === 'hi' ? 'फ़ाइलें' : 'Files'}
          </Button>
          <span className="relative w-full min-w-0 sm:w-auto sm:min-w-[180px] sm:flex-1">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
            <Input
              value={value}
              disabled={disabled}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/uploads/papers/... or https://..."
              className="pl-8 text-xs"
            />
          </span>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = '';
        }}
      />

      <FileLibrary
        open={libOpen}
        folder={folder}
        onClose={() => setLibOpen(false)}
        onPick={(url) => {
          onChange(url);
          setLibOpen(false);
        }}
      />
    </>
  );
};

const FileLibrary: React.FC<{
  open: boolean;
  folder: FileFolder;
  onClose: () => void;
  onPick: (url: string) => void;
}> = ({ open, folder, onClose, onPick }) => {
  const { t, lang, d } = useI18n();
  const { api, toast } = usePanel();
  const [items, setItems] = useState<LibraryFile[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<{ items: LibraryFile[] }>(`/api/superadmin/uploads?folder=${folder}`);
      setItems(res.items || []);
    } finally {
      setLoading(false);
    }
  }, [api, folder]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  return (
    <Modal open={open} onClose={onClose} title={lang === 'hi' ? 'अपलोड की गई फ़ाइलें' : 'Uploaded files'} subtitle={`/public/uploads/${folder}`}>
      {loading ? (
        <div className="grid h-32 place-items-center text-stone-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : !items.length ? (
        <p className="py-10 text-center text-sm text-stone-500">
          {lang === 'hi' ? 'अभी कोई फ़ाइल अपलोड नहीं हुई।' : 'No files uploaded yet.'}
        </p>
      ) : (
        <div className="w-full min-w-0 space-y-2">
          {items.map((f) => (
            <div key={f.url} className="flex items-center gap-3 rounded-xl border border-stone-200 px-3 py-2.5 dark:border-white/10">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-stone-100 text-stone-500 dark:bg-white/10">
                <FileText className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{f.filename}</span>
                <span className="block text-[11px] text-stone-400">
                  {prettySize(f.size)} · {d(f.mtime)}
                </span>
              </span>
              <button onClick={() => onPick(f.url)} className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10">
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={async () => {
                  await api(`/api/superadmin/uploads?url=${encodeURIComponent(f.url)}`, { method: 'DELETE' });
                  toast(t('common.deleted'), 'success');
                  load();
                }}
                className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};
