'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export interface PanelUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'school';
  permissions?: string[];
  designation?: string;
  avatar?: string;
  lastLogin?: string;
  schoolId?: string | null;
  school?: { id: string; name: string; code: string; status: string; city?: string; state?: string } | null;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';
interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface PanelCtx {
  user: PanelUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toast: (message: string, type?: ToastType) => void;
  /** thin fetch wrapper that unwraps JSON + surfaces API errors as toasts */
  api: <T = unknown>(url: string, init?: RequestInit & { silent?: boolean }) => Promise<T>;
}

const Ctx = createContext<PanelCtx | undefined>(undefined);

export const PanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<PanelUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  /* ---------------- theme ---------------- */
  useEffect(() => {
    // the console has a real dark theme, so on first visit follow the
    // browser; after that the toggle wins
    const saved = localStorage.getItem('bbo_theme') as 'light' | 'dark' | null;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('bbo_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((p) => (p === 'light' ? 'dark' : 'light')), []);

  /* ---------------- toasts ---------------- */
  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4200);
  }, []);

  /* ---------------- api ---------------- */
  const api = useCallback(
    async <T,>(url: string, init: RequestInit & { silent?: boolean } = {}): Promise<T> => {
      const { silent, ...rest } = init;
      const res = await fetch(url, {
        credentials: 'include',
        headers:
          rest.body && !(rest.body instanceof FormData)
            ? { 'Content-Type': 'application/json', ...(rest.headers || {}) }
            : rest.headers,
        ...rest,
      });

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        /* empty body */
      }

      if (!res.ok) {
        const message = (data as { message?: string })?.message || `Request failed (${res.status})`;
        if (res.status === 401) {
          setUser(null);
          router.push('/login');
        }
        if (!silent) toast(message, 'error');
        throw new Error(message);
      }
      return data as T;
    },
    [router, toast]
  );

  /* ---------------- session ---------------- */
  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<{ authenticated: boolean; user: PanelUser }>('/api/auth/me', { silent: true });
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } finally {
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  const icons = { success: CheckCircle2, error: XCircle, warning: AlertTriangle, info: Info };
  const tones = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200',
    error: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200',
    warning: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200',
    info: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200',
  };

  return (
    <Ctx.Provider value={{ user, loading, refreshUser, logout, theme, toggleTheme, toast, api }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[200] flex w-[min(92vw,360px)] flex-col gap-2">
        {toasts.map((t) => {
          const Icon = icons[t.type];
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur ${tones[t.type]}`}
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="flex-1">{t.message}</span>
              <button onClick={() => setToasts((p) => p.filter((x) => x.id !== t.id))} className="opacity-60 hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
};

export const usePanel = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePanel must be used inside <PanelProvider>');
  return ctx;
};
