'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, Plus, Copy } from 'lucide-react';
import { useI18n } from '../../i18n/LangProvider';
import { Input, Textarea, Select, Field, Button } from './ui';
import { ImageUploadField, UploadFolder } from './ImageUploadField';
import { FileUploadField, FileFolder } from './FileUploadField';

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
const IMAGE_FIELDS = ['image', 'img', 'photo', 'picture', 'thumbnail', 'thumb', 'logo', 'banner', 'cover', 'avatar', 'src'];
export const isImageField = (name: string) => IMAGE_FIELDS.includes(name.toLowerCase().replace(/url$/, ''));

/** fields that should be a dropdown instead of free text */
const ENUM_FIELDS: Record<string, { value: string; label: string }[]> = {
  heightmode: [
    { value: 'natural', label: 'Natural (follow the image)' },
    { value: 'fixed', label: 'Fixed height' },
  ],
  level: [
    { value: 'school', label: 'School' },
    { value: 'state', label: 'State' },
    { value: 'national', label: 'National' },
  ],
  subject: [
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Sanskrit', label: 'Sanskrit' },
    { value: 'Both', label: 'Both' },
  ],
  type: [
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Video' },
  ],
};

/** fields that hold a downloadable document rather than an image */
const FILE_FIELDS = ['pdfurl', 'pdf', 'fileurl', 'file', 'downloadurl', 'download', 'document', 'attachment', 'paperurl', 'syllabuspdf', 'prospectuspdf', 'omrpdf', 'brochure'];
export const isFileField = (name: string) => FILE_FIELDS.includes(name.toLowerCase());

const LONG_FIELDS = ['description', 'body', 'content', 'excerpt', 'answer', 'message', 'quote', 'summary', 'text', 'note'];
const isLongField = (name: string) => LONG_FIELDS.some((f) => name.toLowerCase().includes(f));

/** turns "authorRole" / "exam_date" into "Author role" / "Exam date" */
export function humanize(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase());
}

const rowTitle = (row: Record<string, unknown>, index: number, titleField?: string | null) => {
  const candidates = [titleField, 'title', 'name', 'question', 'label', 'heading', 'state', 'alt', 'classLevel', 'id'];
  for (const c of candidates) {
    if (c && typeof row[c] === 'string' && (row[c] as string).trim()) return row[c] as string;
  }
  return `#${index + 1}`;
};

/** builds a blank row shaped like the existing ones */
export function blankLike(sample: unknown): unknown {
  if (Array.isArray(sample)) return [];
  if (sample !== null && typeof sample === 'object') {
    const out: Record<string, unknown> = {};
    Object.entries(sample as Record<string, unknown>).forEach(([k, v]) => {
      out[k] = k === 'id' ? `id-${Math.random().toString(36).slice(2, 7)}` : blankLike(v);
    });
    return out;
  }
  if (typeof sample === 'number') return 0;
  if (typeof sample === 'boolean') return true;
  return '';
}

/* ------------------------------------------------------------------ */
/* scalar / list-of-strings editor                                     */
/* ------------------------------------------------------------------ */
const ScalarEditor: React.FC<{
  name: string;
  value: unknown;
  folder: UploadFolder;
  onChange: (v: unknown) => void;
}> = ({ name, value, folder, onChange }) => {
  const { lang } = useI18n();

  if (isImageField(name)) {
    return <ImageUploadField value={(value as string) || ''} folder={folder} onChange={onChange} />;
  }

  if (isFileField(name)) {
    const fileFolder: FileFolder = folder === 'blog' || folder === 'content' ? 'docs' : 'papers';
    return <FileUploadField value={(value as string) || ''} folder={fileFolder} onChange={onChange} />;
  }

  const enumOptions = ENUM_FIELDS[name.toLowerCase()];
  if (enumOptions && typeof value === 'string') {
    const known = enumOptions.some((o) => o.value.toLowerCase() === value.toLowerCase());
    return (
      <Select
        value={known ? enumOptions.find((o) => o.value.toLowerCase() === value.toLowerCase())!.value : ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={known ? undefined : value || '—'}
        options={enumOptions}
      />
    );
  }

  if (typeof value === 'boolean') {
    return (
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="flex items-center gap-2.5"
        aria-pressed={value}
      >
        <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${value ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-white/20'}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${value ? 'left-[22px]' : 'left-0.5'}`} />
        </span>
        <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">
          {value ? (lang === 'hi' ? 'चालू' : 'On') : lang === 'hi' ? 'बंद' : 'Off'}
        </span>
      </button>
    );
  }

  if (typeof value === 'number') {
    return <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />;
  }

  const str = (value ?? '') as string;
  if (isLongField(name) || str.length > 110) {
    return <Textarea rows={3} value={str} onChange={(e) => onChange(e.target.value)} />;
  }
  return <Input value={str} onChange={(e) => onChange(e.target.value)} placeholder={humanize(name)} />;
};

/** array of plain strings — one line each, with add/remove */
const StringListEditor: React.FC<{ value: string[]; onChange: (v: string[]) => void }> = ({ value, onChange }) => {
  const { t } = useI18n();
  return (
    <div className="min-w-0 space-y-1.5">
      {value.map((item, i) => (
        <div key={i} className="flex min-w-0 items-center gap-1.5">
          <span className="w-5 shrink-0 text-center text-[11px] font-bold text-stone-400">{i + 1}</span>
          <span className="min-w-0 flex-1">
            <Input value={item} onChange={(e) => onChange(value.map((x, j) => (j === i ? e.target.value : x)))} />
          </span>
          <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="rounded-lg p-2 text-stone-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Button size="sm" variant="secondary" icon={Plus} onClick={() => onChange([...value, ''])}>
        {t('common.add')}
      </Button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* repeatable object rows                                              */
/* ------------------------------------------------------------------ */
const ObjectListEditor: React.FC<{
  value: Record<string, unknown>[];
  folder: UploadFolder;
  titleField?: string | null;
  depth: number;
  onChange: (v: Record<string, unknown>[]) => void;
}> = ({ value, folder, titleField, depth, onChange }) => {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="min-w-0 space-y-2">
      {value.map((row, i) => (
        <div key={i} className="min-w-0 overflow-hidden rounded-xl border border-stone-200 dark:border-white/10">
          <div className="flex items-center gap-1 px-2 py-2 sm:gap-2 sm:px-3 sm:py-2.5">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-stone-100 text-[11px] font-bold text-stone-500 dark:bg-white/10">
              {i + 1}
            </span>
            <button
              type="button"
              onClick={() => setOpen((p) => ({ ...p, [i]: !p[i] }))}
              className="min-w-0 flex-1 truncate text-left text-sm font-semibold"
            >
              {String(rowTitle(row, i, titleField)).slice(0, 90)}
            </button>
            <button type="button" onClick={() => move(i, -1)} className="shrink-0 rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 dark:hover:bg-white/10">
              <ChevronUp className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => move(i, 1)} className="shrink-0 rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 dark:hover:bg-white/10">
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              title={lang === 'hi' ? 'प्रतिलिपि' : 'Duplicate'}
              onClick={() => {
                const copy = JSON.parse(JSON.stringify(row));
                if (typeof copy.id === 'string') copy.id = `${copy.id}-copy`;
                onChange([...value.slice(0, i + 1), copy, ...value.slice(i + 1)]);
              }}
              className="hidden shrink-0 rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 sm:block dark:hover:bg-white/10"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="shrink-0 rounded-lg p-1.5 text-stone-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {open[i] && (
            <div className="border-t border-stone-200 p-3 sm:p-4 dark:border-white/10">
              <SchemaForm
                value={row}
                folder={folder}
                depth={depth + 1}
                onChange={(v) => onChange(value.map((x, j) => (j === i ? (v as Record<string, unknown>) : x)))}
              />
            </div>
          )}
        </div>
      ))}

      <Button
        size="sm"
        variant="secondary"
        icon={Plus}
        onClick={() => onChange([...value, (blankLike(value[0] || {}) as Record<string, unknown>)])}
      >
        {t('common.add')}
      </Button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* the recursive form                                                  */
/* ------------------------------------------------------------------ */
export const SchemaForm: React.FC<{
  value: unknown;
  onChange: (v: unknown) => void;
  folder?: UploadFolder;
  titleField?: string | null;
  depth?: number;
}> = ({ value, onChange, folder = 'content', titleField, depth = 0 }) => {
  // array
  if (Array.isArray(value)) {
    const allStrings = value.length > 0 && value.every((v) => typeof v === 'string');
    if (allStrings || value.length === 0) {
      return <StringListEditor value={value as string[]} onChange={(v) => onChange(v)} />;
    }
    return (
      <ObjectListEditor
        value={value as Record<string, unknown>[]}
        folder={folder}
        titleField={titleField}
        depth={depth}
        onChange={(v) => onChange(v)}
      />
    );
  }

  // object
  if (value !== null && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);

    return (
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        {keys.map((k) => {
          const v = obj[k];
          const nested = v !== null && typeof v === 'object';
          const wide = nested || isImageField(k) || isFileField(k) || isLongField(k) || String(v ?? '').length > 110;

          if (nested) {
            return (
              <div key={k} className="min-w-0 sm:col-span-2">
                <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                  <span className="h-2.5 w-1 rounded-full bg-[#C79A2D]" />
                  {humanize(k)}
                  {Array.isArray(v) && (
                    <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] tabular-nums dark:bg-white/10">
                      {v.length}
                    </span>
                  )}
                </p>
                <div className={`min-w-0 ${depth < 2 ? 'rounded-xl border border-stone-200 p-3 dark:border-white/10' : ''}`}>
                  <SchemaForm
                    value={v}
                    folder={folder}
                    depth={depth + 1}
                    onChange={(nv) => onChange({ ...obj, [k]: nv })}
                  />
                </div>
              </div>
            );
          }

          return (
            <Field key={k} label={humanize(k)} className={`min-w-0 ${wide ? 'sm:col-span-2' : ''}`}>
              <ScalarEditor name={k} value={v} folder={folder} onChange={(nv) => onChange({ ...obj, [k]: nv })} />
            </Field>
          );
        })}
      </div>
    );
  }

  // primitive at the root
  return <ScalarEditor name="value" value={value} folder={folder} onChange={onChange} />;
};
