'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X, ImageIcon, Loader2, Library, Trash2, Link2, Check } from 'lucide-react';
import { useI18n } from '../../i18n/LangProvider';
import { usePanel } from './PanelProvider';
import { Button, Input, Modal } from './ui';

export type UploadFolder = 'content' | 'banner' | 'gallery' | 'schools' | 'blog' | 'papers' | 'docs';

interface LibraryItem {
  url: string;
  filename: string;
  size: number;
  mtime: string;
}

/**
 * Single image field: drop a file, pick one already uploaded, or paste a URL.
 * Files land in /public/uploads/<folder>/ and the value stored is the public
 * path, e.g. "/uploads/banner/hero-1712345678-a1b2c3.jpg".
 */
export const ImageUploadField: React.FC<{
  value: string;
  onChange: (url: string) => void;
  folder?: UploadFolder;
  /** aspect ratio of the preview box */
  ratio?: string;
  disabled?: boolean;
}> = ({ value, onChange, folder = 'content', ratio = '16 / 9', disabled }) => {
  const { t, lang } = useI18n();
  const { toast } = usePanel();
  const inputRef = useRef<HTMLInputElement>(null);

  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [libOpen, setLibOpen] = useState(false);

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
        toast(lang === 'hi' ? 'चित्र अपलोड हुआ' : 'Image uploaded', 'success');
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
      <div className="space-y-2">
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
          className={`relative overflow-hidden rounded-xl border-2 border-dashed transition ${
            drag
              ? 'border-[#7B1E1E] bg-[#7B1E1E]/[0.05]'
              : 'border-stone-200 bg-stone-50 dark:border-white/10 dark:bg-white/[0.03]'
          }`}
          style={{ aspectRatio: value ? ratio : undefined }}
        >
          {value ? (
            <>
              {/* plain <img> keeps arbitrary remote URLs working without next.config domains */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="" className="h-full w-full object-cover" />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="absolute right-2 top-2 rounded-lg bg-stone-900/70 p-1.5 text-white backdrop-blur transition hover:bg-rose-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              disabled={disabled || busy}
              onClick={() => inputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-2 px-4 py-8 text-center"
            >
              {busy ? (
                <Loader2 className="h-6 w-6 animate-spin text-[#7B1E1E]" />
              ) : (
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-stone-400 shadow-sm dark:bg-white/10">
                  <ImageIcon className="h-5 w-5" />
                </span>
              )}
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                {lang === 'hi' ? 'चित्र यहाँ छोड़ें या चुनें' : 'Drop an image here, or click to choose'}
              </span>
              <span className="text-[11px] text-stone-400">JPG · PNG · WEBP · SVG — max 6 MB</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            icon={Upload}
            loading={busy}
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            {lang === 'hi' ? 'अपलोड' : 'Upload'}
          </Button>
          <Button size="sm" variant="secondary" icon={Library} disabled={disabled} onClick={() => setLibOpen(true)}>
            {lang === 'hi' ? 'गैलरी' : 'Library'}
          </Button>
          <span className="relative min-w-[180px] flex-1">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
            <Input
              value={value}
              disabled={disabled}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/uploads/... or https://..."
              className="pl-8 text-xs"
            />
          </span>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = '';
          }}
        />
      </div>

      <MediaLibrary
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

/* ------------------------------------------------------------------ */
/* media library                                                       */
/* ------------------------------------------------------------------ */
export const MediaLibrary: React.FC<{
  open: boolean;
  folder: UploadFolder;
  onClose: () => void;
  onPick: (url: string) => void;
}> = ({ open, folder, onClose, onPick }) => {
  const { t, lang } = useI18n();
  const { api, toast } = usePanel();
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<{ items: LibraryItem[] }>(`/api/superadmin/uploads?folder=${folder}`);
      setItems(res.items || []);
    } finally {
      setLoading(false);
    }
  }, [api, folder]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  const remove = async (url: string) => {
    try {
      await api(`/api/superadmin/uploads?url=${encodeURIComponent(url)}`, { method: 'DELETE' });
      toast(t('common.deleted'), 'success');
      load();
    } catch {
      /* toast already shown */
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={lang === 'hi' ? 'मीडिया गैलरी' : 'Media library'}
      subtitle={`/public/uploads/${folder}`}
      size="lg"
    >
      {loading ? (
        <div className="grid h-40 place-items-center text-stone-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : !items.length ? (
        <p className="py-10 text-center text-sm text-stone-500">
          {lang === 'hi' ? 'अभी कोई चित्र अपलोड नहीं हुआ।' : 'No images uploaded yet.'}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((it) => (
            <div key={it.url} className="group relative overflow-hidden rounded-xl border border-stone-200 dark:border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.url} alt={it.filename} className="aspect-square w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-stone-900/60 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                <button
                  onClick={() => onPick(it.url)}
                  className="rounded-lg bg-white p-2 text-emerald-600 hover:bg-emerald-50"
                  title={t('common.confirm')}
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(it.url)}
                  className="rounded-lg bg-white p-2 text-rose-600 hover:bg-rose-50"
                  title={t('common.delete')}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="truncate px-2 py-1.5 text-[10px] text-stone-500">{it.filename}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

/** Small helper so other panels can render a stored path safely. */
export const PreviewImage: React.FC<{ src?: string; alt?: string; className?: string }> = ({
  src,
  alt = '',
  className = '',
}) => {
  if (!src) return null;
  if (src.startsWith('/uploads/') || src.startsWith('/')) {
    return <Image src={src} alt={alt} width={320} height={180} className={className} unoptimized />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
};
