'use client';

import React, { useEffect } from 'react';
import { X, Loader2, ChevronLeft, ChevronRight, Inbox, AlertTriangle } from 'lucide-react';
import { useI18n } from '../../i18n/LangProvider';

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-stone-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] dark:border-white/10 dark:bg-[#171313] ${className}`}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({
  title,
  subtitle,
  action,
}) => (
  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-200/80 px-5 py-4 dark:border-white/10">
    <div className="min-w-0">
      <h3 className="truncate text-[15px] font-bold text-stone-900 dark:text-stone-100">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">{subtitle}</p>}
    </div>
    {action}
  </div>
);

/* ------------------------------------------------------------------ */
/* Page header                                                         */
/* ------------------------------------------------------------------ */
export const PageHeader: React.FC<{ title: string; subtitle?: string; children?: React.ReactNode }> = ({
  title,
  subtitle,
  children,
}) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-[28px]">
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{subtitle}</p>}
    </div>
    <div className="flex flex-wrap items-center gap-2">{children}</div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */
type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: BtnVariant;
    loading?: boolean;
    icon?: React.ElementType;
    size?: 'sm' | 'md';
  }
> = ({ variant = 'primary', loading, icon: Icon, size = 'md', className = '', children, disabled, ...rest }) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#7B1E1E]/30 dark:focus:ring-offset-[#171313]';
  const sizes = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm';
  const variants: Record<BtnVariant, string> = {
    primary:
      'bg-[#7B1E1E] text-white shadow-sm hover:bg-[#6a1919] active:scale-[0.98]',
    secondary:
      'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-white/10 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10',
    ghost: 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-white/10',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98]',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]',
  };

  return (
    <button className={`${base} ${sizes} ${variants[variant]} ${className}`} disabled={disabled || loading} {...rest}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
};

/* ------------------------------------------------------------------ */
/* Form fields                                                         */
/* ------------------------------------------------------------------ */
const fieldClass =
  'w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#7B1E1E] focus:ring-2 focus:ring-[#7B1E1E]/15 disabled:bg-stone-50 dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:placeholder:text-stone-500';

export const Field: React.FC<{
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ label, required, hint, error, className = '', children }) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-300">
      {label}
      {required && <span className="ml-0.5 text-rose-500">*</span>}
    </span>
    {children}
    {hint && !error && <span className="mt-1 block text-[11px] text-stone-400">{hint}</span>}
    {error && <span className="mt-1 block text-[11px] font-medium text-rose-500">{error}</span>}
  </label>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...rest }) => (
  <input className={`${fieldClass} ${className}`} {...rest} />
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...rest }) => (
  <textarea className={`${fieldClass} min-h-[96px] resize-y ${className}`} {...rest} />
);

export const Select: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[]; placeholder?: string }
> = ({ options, placeholder, className = '', ...rest }) => (
  <select className={`${fieldClass} ${className}`} {...rest}>
    {placeholder !== undefined && <option value="">{placeholder}</option>}
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

export const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label?: string }> = ({
  checked,
  onChange,
  label,
}) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="flex items-center gap-3"
    aria-pressed={checked}
  >
    <span
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-white/20'
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </span>
    {label && <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{label}</span>}
  </button>
);

/* ------------------------------------------------------------------ */
/* Badge                                                               */
/* ------------------------------------------------------------------ */
export type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'gold';

export const Badge: React.FC<{ tone?: Tone; children: React.ReactNode; className?: string }> = ({
  tone = 'neutral',
  children,
  className = '',
}) => {
  const tones: Record<Tone, string> = {
    neutral: 'bg-stone-100 text-stone-700 dark:bg-white/10 dark:text-stone-300',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    danger: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
    info: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
    gold: 'bg-[#C79A2D]/15 text-[#8a6a13] dark:bg-[#C79A2D]/20 dark:text-[#e0be6a]',
  };
  return (
    <span className={`inline-flex items-center rounded-lg px-2 py-1 text-[11px] font-bold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Stat card                                                           */
/* ------------------------------------------------------------------ */
export const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon: React.ElementType;
  tone?: Tone;
  hint?: string;
}> = ({ label, value, icon: Icon, tone = 'neutral', hint }) => {
  const ring: Record<Tone, string> = {
    neutral: 'bg-stone-100 text-stone-600 dark:bg-white/10 dark:text-stone-300',
    success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
    danger: 'bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
    info: 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300',
    gold: 'bg-[#C79A2D]/15 text-[#8a6a13] dark:bg-[#C79A2D]/20 dark:text-[#e0be6a]',
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {label}
          </p>
          <p className="mt-2 font-serif text-3xl font-bold tabular-nums text-stone-900 dark:text-stone-50">{value}</p>
          {hint && <p className="mt-1 text-xs text-stone-400">{hint}</p>}
        </div>
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${ring[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */
export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  footer?: React.ReactNode;
  children: React.ReactNode;
}> = ({ open, onClose, title, subtitle, size = 'md', footer, children }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const widths = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative z-10 my-8 w-full ${widths[size]} overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#171313]`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-200/80 px-5 py-4 dark:border-white/10">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5 py-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-stone-200/80 bg-stone-50/60 px-5 py-3.5 dark:border-white/10 dark:bg-white/[0.03]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export const ConfirmDialog: React.FC<{
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}> = ({ open, title, message, onCancel, onConfirm, loading }) => {
  const { t } = useI18n();
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
          <Button variant="danger" loading={loading} onClick={onConfirm}>
            {t('common.confirm')}
          </Button>
        </>
      }
    >
      <div className="flex gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/15">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <p className="pt-1.5 text-sm text-stone-600 dark:text-stone-300">{message}</p>
      </div>
    </Modal>
  );
};

/* ------------------------------------------------------------------ */
/* Table shell                                                         */
/* ------------------------------------------------------------------ */
export const TableWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[720px] border-collapse text-sm">{children}</table>
  </div>
);

export const Th: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <th
    className={`border-b border-stone-200/80 bg-stone-50/70 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-stone-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-stone-400 ${className}`}
  >
    {children}
  </th>
);

export const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <td className={`border-b border-stone-100 px-4 py-3 align-middle text-stone-700 dark:border-white/5 dark:text-stone-200 ${className}`}>
    {children}
  </td>
);

export const EmptyState: React.FC<{ title?: string; hint?: string; action?: React.ReactNode }> = ({
  title,
  hint,
  action,
}) => {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-stone-100 text-stone-400 dark:bg-white/5">
        <Inbox className="h-7 w-7" />
      </span>
      <div>
        <p className="font-semibold text-stone-700 dark:text-stone-200">{title || t('common.noData')}</p>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{hint || t('common.noDataHint')}</p>
      </div>
      {action}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ rows = 6, cols = 5 }) => (
  <div className="space-y-2 p-4">
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="flex gap-3">
        {Array.from({ length: cols }).map((__, c) => (
          <div
            key={c}
            className="h-9 flex-1 animate-pulse rounded-lg bg-stone-100 dark:bg-white/5"
            style={{ animationDelay: `${(r * cols + c) * 30}ms` }}
          />
        ))}
      </div>
    ))}
  </div>
);

export const Pagination: React.FC<{
  page: number;
  pages: number;
  total: number;
  onPage: (p: number) => void;
}> = ({ page, pages, total, onPage }) => {
  const { t, n } = useI18n();
  if (pages <= 1) return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/80 px-4 py-3 dark:border-white/10">
      <p className="text-xs text-stone-500 dark:text-stone-400">
        {t('common.total')}: <span className="font-bold tabular-nums">{n(total)}</span> · {t('common.page')} {n(page)}{' '}
        {t('common.of')} {n(pages)}
      </p>
      <div className="flex items-center gap-1.5">
        <Button size="sm" variant="secondary" disabled={page <= 1} onClick={() => onPage(page - 1)} icon={ChevronLeft}>
          {t('common.prev')}
        </Button>
        <Button size="sm" variant="secondary" disabled={page >= pages} onClick={() => onPage(page + 1)}>
          {t('common.next')}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Tiny horizontal bar chart (no chart lib needed)                     */
/* ------------------------------------------------------------------ */
export const BarList: React.FC<{ data: { key: string; count: number }[]; labelMap?: Record<string, string> }> = ({
  data,
  labelMap,
}) => {
  const { n } = useI18n();
  const max = Math.max(1, ...data.map((d) => d.count));
  if (!data.length) return <EmptyState />;
  return (
    <div className="space-y-3 p-5">
      {data.map((d) => (
        <div key={d.key}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-700 dark:text-stone-200">{labelMap?.[d.key] || d.key}</span>
            <span className="tabular-nums font-bold text-stone-500 dark:text-stone-400">{n(d.count)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7B1E1E] to-[#C79A2D] transition-all"
              style={{ width: `${(d.count / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
