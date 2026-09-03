'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { LangProvider, useI18n, LanguageToggle } from '../i18n/LangProvider';

function LoginInner() {
  const { t } = useI18n();
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError(t('common.required'));
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || t('auth.invalid'));
        return;
      }
      router.push(data.redirect || '/');
      router.refresh();
    } catch {
      setError(t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    'w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#7B1E1E] focus:ring-2 focus:ring-[#7B1E1E]/15 dark:border-white/10 dark:bg-white/5 dark:text-stone-100';

  return (
    <div className="grid min-h-screen bg-stone-50 lg:grid-cols-2 dark:bg-[#0F0C0C]">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-[#7B1E1E]">
            <ArrowLeft className="h-4 w-4" />
            {t('common.back')}
          </Link>
          <LanguageToggle />
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <Image src="/logo/logo.png" alt="BBO" width={56} height={56} priority className="rounded-xl object-contain" />
          <h1 className="mt-6 font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">{t('auth.loginTitle')}</h1>
          <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">{t('auth.loginSubtitle')}</p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-300">{t('common.email')}</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={inputCls}
                  placeholder="you@school.edu.in"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-300">{t('common.password')}</span>
              <span className="relative block">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type={show ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  className={`${inputCls} pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            {error && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7B1E1E] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#6a1919] disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              {busy ? t('auth.loggingIn') : t('auth.login')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
            {t('auth.noAccount')}{' '}
            <Link href="/registration" className="font-bold text-[#7B1E1E] hover:underline dark:text-[#d9b45f]">
              {t('auth.registerSchool')}
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-[#7B1E1E] lg:block">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, #fff 1.5px, transparent 1.5px), radial-gradient(circle at 80% 70%, #C79A2D 1.5px, transparent 1.5px)',
            backgroundSize: '48px 48px, 72px 72px',
          }}
        />
        <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-[#C79A2D]/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center px-14 text-white">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold">
            <ShieldCheck className="h-3.5 w-3.5 text-[#e8c877]" />
            {t('app.name')}
          </span>
          <h2 className="mt-6 max-w-md font-serif text-4xl font-bold leading-tight">
            {t('app.superAdmin')} <span className="text-[#e8c877]">&amp;</span> {t('app.schoolAdmin')}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">{t('auth.loginSubtitle')}</p>
        </div>
      </div>
    </div>
  );
}

export const LoginPage: React.FC = () => (
  <LangProvider>
    <LoginInner />
  </LangProvider>
);

export default LoginPage;
