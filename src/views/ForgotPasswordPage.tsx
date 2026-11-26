'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react';
import { LangProvider, useI18n, LanguageToggle } from '../i18n/LangProvider';

function Inner() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) return setError(t('common.required'));
    setBusy(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data?.message || t('common.error'));
      setDone(true);
    } catch {
      setError(t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 px-6 py-8 sm:px-12 dark:bg-[#0F0C0C]">
      <div className="flex items-center justify-between">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-[#7B1E1E]">
          <ArrowLeft className="h-4 w-4" />
          {t('auth.backToLogin')}
        </Link>
        <LanguageToggle />
      </div>
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
        <Image src="/logo/logo.png" alt="BBO" width={56} height={56} priority className="rounded-xl object-contain" />
        <h1 className="mt-6 font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">{t('auth.forgotTitle')}</h1>
        <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">{t('auth.forgotSubtitle')}</p>

        {done ? (
          <p className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-700">
            {t('auth.linkSent')}
          </p>
        ) : (
          <form onSubmit={submit} className="mt-7 space-y-4">
            <span className="relative block">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu.in"
                className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#7B1E1E] focus:ring-2 focus:ring-[#7B1E1E]/15 dark:border-white/10 dark:bg-white/5 dark:text-stone-100"
              />
            </span>
            {error && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700">{error}</p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7B1E1E] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#6a1919] disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {busy ? t('auth.sending') : t('auth.sendLink')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export const ForgotPasswordPage: React.FC = () => (
  <LangProvider>
    <Inner />
  </LangProvider>
);

export default ForgotPasswordPage;
