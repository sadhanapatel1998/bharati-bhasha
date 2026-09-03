'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Save, RotateCcw, FileJson, LayoutList, SlidersHorizontal, Loader2, Code2, Table2 } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { usePanel } from '../../../components/panel/PanelProvider';
import { SchemaForm } from '../../../components/panel/SchemaForm';
import { UploadFolder } from '../../../components/panel/ImageUploadField';
import { invalidateSiteContent } from '../../../hooks/useSiteContent';
import { Card, PageHeader, Button, Textarea, Field, Badge, ConfirmDialog } from '../../../components/panel/ui';

interface BlockSummary {
  key: string;
  label: string;
  labelHi: string;
  group: string;
  shape: 'list' | 'object' | 'raw';
  titleField: string | null;
  seeded: boolean;
  count: number | null;
  updatedAt: string | null;
  updatedBy: string | null;
}

interface BlockDetail extends BlockSummary {
  data: unknown;
  original: unknown;
}

/** which upload folder each block writes its images into */
const FOLDER_FOR: Record<string, UploadFolder> = {
  hero_banners: 'banner',
  gallery: 'gallery',
  blog_posts: 'blog',
  partner_schools: 'schools',
  sample_papers: 'papers',
  syllabus: 'papers',
  downloads: 'papers',
};

const GROUP_LABEL: Record<string, { en: string; hi: string }> = {
  homepage: { en: 'Homepage', hi: 'मुखपृष्ठ' },
  exams: { en: 'Exams', hi: 'परीक्षाएँ' },
  academics: { en: 'Academics', hi: 'शैक्षणिक' },
  community: { en: 'Community', hi: 'समुदाय' },
  pages: { en: 'Pages', hi: 'पृष्ठ' },
  config: { en: 'Configuration', hi: 'कॉन्फ़िगरेशन' },
};

export default function SiteContentPage() {
  const { t, lang, d } = useI18n();
  const { api, toast, user } = usePanel();

  const [blocks, setBlocks] = useState<BlockSummary[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');
  const [detail, setDetail] = useState<BlockDetail | null>(null);
  const [draft, setDraft] = useState<unknown>(null);
  const [dirty, setDirty] = useState(false);

  const [jsonMode, setJsonMode] = useState(false);
  const [rawText, setRawText] = useState('');
  const [rawError, setRawError] = useState('');

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [restore, setRestore] = useState(false);

  const canEdit = user?.role === 'superadmin' || (user?.permissions || []).includes('content.manage');

  const loadList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<{ items: BlockSummary[] }>('/api/superadmin/content');
      setBlocks(res.items || []);
      setActiveKey((prev) => prev || res.items?.[0]?.key || '');
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  useEffect(() => {
    if (!activeKey) return;
    setDetail(null);
    setDirty(false);
    setJsonMode(false);
    api<{ item: BlockDetail }>(`/api/superadmin/content/${activeKey}`)
      .then((res) => {
        setDetail(res.item);
        setDraft(res.item.data);
        setRawText(JSON.stringify(res.item.data, null, 2));
        setRawError('');
      })
      .catch(() => setDetail(null));
  }, [activeKey, api]);

  const grouped = useMemo(() => {
    const map: Record<string, BlockSummary[]> = {};
    blocks.forEach((b) => {
      (map[b.group] ||= []).push(b);
    });
    return map;
  }, [blocks]);

  const setValue = (v: unknown) => {
    setDraft(v);
    setDirty(true);
    setRawText(JSON.stringify(v, null, 2));
  };

  const save = async () => {
    if (!detail) return;
    let payload = draft;

    if (jsonMode) {
      try {
        payload = JSON.parse(rawText);
      } catch {
        setRawError(lang === 'hi' ? 'JSON मान्य नहीं है' : 'Invalid JSON');
        return;
      }
    }

    setBusy(true);
    try {
      await api(`/api/superadmin/content/${detail.key}`, {
        method: 'PUT',
        body: JSON.stringify({ data: payload }),
      });
      invalidateSiteContent();
      setDraft(payload);
      setDirty(false);
      toast(t('common.updated'), 'success');
      loadList();
    } finally {
      setBusy(false);
    }
  };

  const doRestore = async () => {
    if (!detail) return;
    setBusy(true);
    try {
      const res = await api<{ data: unknown }>(`/api/superadmin/content/${detail.key}`, { method: 'DELETE' });
      invalidateSiteContent();
      setDraft(res.data);
      setRawText(JSON.stringify(res.data, null, 2));
      setDirty(false);
      toast(t('common.updated'), 'success');
    } finally {
      setBusy(false);
      setRestore(false);
    }
  };

  const ShapeIcon = detail?.shape === 'list' ? LayoutList : detail?.shape === 'object' ? SlidersHorizontal : FileJson;
  const itemCount = Array.isArray(draft) ? draft.length : null;

  return (
    <>
      <PageHeader
        title={lang === 'hi' ? 'वेबसाइट सामग्री' : 'Website content'}
        subtitle={
          lang === 'hi'
            ? 'वेबसाइट पर दिख रहा सारा मुख्य डेटा यहीं से बदलें — मूल सामग्री सुरक्षित रहती है।'
            : 'Edit everything the public site shows. The original content is always kept as a fallback.'
        }
      >
        {detail && canEdit && (
          <>
            <Button variant="secondary" icon={RotateCcw} onClick={() => setRestore(true)}>
              {lang === 'hi' ? 'मूल पर लौटाएँ' : 'Restore original'}
            </Button>
            <Button icon={Save} loading={busy} onClick={save}>
              {t('common.save')}
              {dirty ? ' •' : ''}
            </Button>
          </>
        )}
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-[290px_1fr]">
        {/* block list */}
        <Card className="h-fit p-3 lg:sticky lg:top-[88px]">
          {loading ? (
            <div className="space-y-2 p-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-9 animate-pulse rounded-lg bg-stone-100 dark:bg-white/5" />
              ))}
            </div>
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <div key={group} className="mb-4">
                <p className="mb-1.5 flex items-center gap-1.5 px-2 text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                  <span className="h-2.5 w-1 rounded-full bg-[#C79A2D]" />
                  {lang === 'hi' ? GROUP_LABEL[group]?.hi || group : GROUP_LABEL[group]?.en || group}
                </p>
                <div className="space-y-0.5">
                  {items.map((b) => (
                    <button
                      key={b.key}
                      onClick={() => setActiveKey(b.key)}
                      className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-semibold transition ${
                        activeKey === b.key
                          ? 'bg-[#7B1E1E] text-white'
                          : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className="min-w-0 truncate">{lang === 'hi' ? b.labelHi : b.label}</span>
                      {b.count !== null && (
                        <span
                          className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                            activeKey === b.key ? 'bg-white/20' : 'bg-stone-100 text-stone-500 dark:bg-white/10'
                          }`}
                        >
                          {b.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </Card>

        {/* editor */}
        <Card className="min-h-[400px]">
          {!detail ? (
            <div className="grid h-64 place-items-center text-stone-400">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 px-5 py-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:bg-[#7B1E1E]/25 dark:text-[#d9b45f]">
                    <ShapeIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold">{lang === 'hi' ? detail.labelHi : detail.label}</h3>
                    <p className="font-mono text-[11px] text-stone-400">
                      {detail.key}
                      {itemCount !== null ? ` · ${itemCount} ${lang === 'hi' ? 'प्रविष्टियाँ' : 'items'}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {dirty && <Badge tone="warning">{lang === 'hi' ? 'असहेजे बदलाव' : 'Unsaved'}</Badge>}
                  {detail.updatedBy && (
                    <Badge tone="neutral">
                      {detail.updatedBy} · {d(detail.updatedAt)}
                    </Badge>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (jsonMode) {
                        try {
                          setDraft(JSON.parse(rawText));
                          setRawError('');
                        } catch {
                          setRawError(lang === 'hi' ? 'JSON मान्य नहीं है' : 'Invalid JSON');
                          return;
                        }
                      } else {
                        setRawText(JSON.stringify(draft, null, 2));
                      }
                      setJsonMode((p) => !p);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-xs font-bold text-stone-600 transition hover:bg-stone-50 dark:border-white/10 dark:text-stone-300 dark:hover:bg-white/10"
                    title={lang === 'hi' ? 'उन्नत मोड' : 'Advanced mode'}
                  >
                    {jsonMode ? <Table2 className="h-4 w-4" /> : <Code2 className="h-4 w-4" />}
                    {jsonMode ? (lang === 'hi' ? 'फ़ॉर्म' : 'Form') : 'JSON'}
                  </button>
                </div>
              </div>

              <div className="p-5">
                {!canEdit && (
                  <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                    {lang === 'hi' ? 'आपके पास केवल देखने की अनुमति है।' : 'You have view-only access to this section.'}
                  </p>
                )}

                <fieldset disabled={!canEdit}>
                  {jsonMode ? (
                    <Field
                      label="JSON"
                      error={rawError}
                      hint={lang === 'hi' ? 'केवल उन्नत उपयोगकर्ताओं हेतु।' : 'For advanced users only.'}
                    >
                      <Textarea
                        rows={22}
                        className="font-mono text-xs"
                        value={rawText}
                        onChange={(e) => {
                          setRawText(e.target.value);
                          setRawError('');
                          setDirty(true);
                        }}
                      />
                    </Field>
                  ) : (
                    <SchemaForm
                      value={draft}
                      folder={FOLDER_FOR[detail.key] || 'content'}
                      titleField={detail.titleField}
                      onChange={setValue}
                    />
                  )}
                </fieldset>
              </div>

              {canEdit && (
                <div className="flex justify-end gap-2 border-t border-stone-200/80 bg-stone-50/60 px-5 py-3.5 dark:border-white/10 dark:bg-white/[0.03]">
                  <Button variant="secondary" icon={RotateCcw} onClick={() => setRestore(true)}>
                    {lang === 'hi' ? 'मूल पर लौटाएँ' : 'Restore original'}
                  </Button>
                  <Button icon={Save} loading={busy} onClick={save}>
                    {t('common.save')}
                  </Button>
                </div>
              )}
            </>
          )}
        </Card>
      </div>

      <ConfirmDialog
        open={restore}
        title={lang === 'hi' ? 'मूल पर लौटाएँ' : 'Restore original'}
        message={
          lang === 'hi'
            ? 'यह ब्लॉक वेबसाइट की मूल सामग्री पर वापस चला जाएगा।'
            : 'This block will be reset to the content the website originally shipped with.'
        }
        loading={busy}
        onCancel={() => setRestore(false)}
        onConfirm={doRestore}
      />
    </>
  );
}
