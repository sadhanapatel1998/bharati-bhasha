'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Languages } from 'lucide-react';
import { dictionary, Lang, TKey } from './dictionary';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: TKey, fallback?: string) => string;
  /** picks the right side of a {en,hi} pair coming from the DB */
  pick: (pair?: { en?: string; hi?: string } | null) => string;
  /** locale-aware number */
  n: (value: number) => string;
  /** locale-aware date */
  d: (value?: string | Date | null) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

const STORAGE_KEY = 'bbo_lang';

export const LangProvider: React.FC<{ children: React.ReactNode; defaultLang?: Lang }> = ({
  children,
  defaultLang = 'hi',
}) => {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === 'en' || saved === 'hi') setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('data-lang', lang);
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState((p) => (p === 'hi' ? 'en' : 'hi')), []);

  const t = useCallback(
    (key: TKey, fallback?: string) => {
      const table = dictionary[lang] as Record<string, string>;
      return table[key] ?? (dictionary.en as Record<string, string>)[key] ?? fallback ?? String(key);
    },
    [lang]
  );

  const pick = useCallback(
    (pair?: { en?: string; hi?: string } | null) => {
      if (!pair) return '';
      return (lang === 'hi' ? pair.hi || pair.en : pair.en || pair.hi) || '';
    },
    [lang]
  );

  const n = useCallback(
    (value: number) => new Intl.NumberFormat(lang === 'hi' ? 'hi-IN' : 'en-IN').format(value || 0),
    [lang]
  );

  const d = useCallback(
    (value?: string | Date | null) => {
      if (!value) return '—';
      const dt = new Date(value);
      if (Number.isNaN(dt.getTime())) return String(value);
      return dt.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t, pick, n, d }}>
      {children}
    </LangContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useI18n must be used inside <LangProvider>');
  return ctx;
};

/** Compact EN / हिं segmented toggle used in both panel headers. */
export const LanguageToggle: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { lang, setLang } = useI18n();

  if (compact) {
    return (
      <button
        onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
        className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-bold text-stone-700 transition hover:border-[#7B1E1E]/40 hover:text-[#7B1E1E] dark:border-white/10 dark:bg-white/5 dark:text-stone-200"
        aria-label="Toggle language"
      >
        <Languages className="h-4 w-4" />
        {lang === 'hi' ? 'EN' : 'हिं'}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-xl border border-stone-200 bg-stone-100/70 p-0.5 dark:border-white/10 dark:bg-white/5"
    >
      <button
        onClick={() => setLang('en')}
        className={`rounded-[10px] px-3 py-1.5 text-xs font-bold transition ${
          lang === 'en'
            ? 'bg-white text-[#7B1E1E] shadow-sm dark:bg-white/15 dark:text-amber-300'
            : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('hi')}
        className={`rounded-[10px] px-3 py-1.5 text-xs font-bold transition ${
          lang === 'hi'
            ? 'bg-white text-[#7B1E1E] shadow-sm dark:bg-white/15 dark:text-amber-300'
            : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100'
        }`}
      >
        हिं
      </button>
    </div>
  );
};
