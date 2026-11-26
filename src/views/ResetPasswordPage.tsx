'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, ArrowLeft, Loader2, KeyRound } from 'lucide-react';
import { LangProvider, useI18n, LanguageToggle } from '../i18n/LangProvider';

function Inner() {
  const { t } = useI18n();
  const router = useRouter();
  const token = useSearchParams().get('token') || '';
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) return setError(t('auth.passwordMin'));
    if (form.password !== form.confirm) return setError(t('auth.passwordMismatch'));
    setBusy(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data?.message || t('common.error'));
      setDone(true);
      setTimeout(() => router.push('/login'), 1500);
    } catch {
      setError(t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    'w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#7B1E1E] focus:ring-2 focus:ring-[#7B1E1E]/15 dark:border-white/10 dark:bg-white/5 dark:text-stone-100';

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
        <h1 className="mt-6 font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">{t('auth.resetTitle')}</h1>

        {done ? (
          <p className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-700">
            {t('auth.resetSuccess')}
          </p>
        ) : (
          <form onSubmit={submit} className="mt-7 space-y-4">
            {(['password', 'confirm'] as const).map((k) => (
              <span key={k} className="relative block">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  autoComplete="new-password"
                  value={form[k]}
                  onChange={(e) => setForm((p) => ({ ...p, [k]: e.target.value }))}
                  placeholder={k === 'password' ? t('auth.newPassword') : t('auth.passwordConfirm')}
                  className={inputCls}
                />
              </span>
            ))}
            {error && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700">{error}</p>
            )}
            <button
              type="submit"
              disabled={busy || !token}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7B1E1E] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#6a1919] disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              {t('auth.resetBtn')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export const ResetPasswordPage: React.FC = () => (
  <LangProvider>
    <Suspense>
      <Inner />
    </Suspense>
  </LangProvider>
);

export default ResetPasswordPage;
