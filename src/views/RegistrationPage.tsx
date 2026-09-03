'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Loader2, School, MapPin, KeyRound, CheckCircle2, Copy } from 'lucide-react';
import { LangProvider, useI18n, LanguageToggle } from '../i18n/LangProvider';

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Jammu & Kashmir', 'Other',
];

const initial = {
  schoolName: '',
  principal: '',
  board: 'CBSE',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  password: '',
  confirm: '',
};

function RegistrationInner() {
  const { t } = useI18n();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initial);
  const [subjects, setSubjects] = useState<string[]>(['hindi']);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState<{ code: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const set = (k: keyof typeof initial, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const steps = [
    { icon: School, label: t('school.name') },
    { icon: MapPin, label: t('common.address') },
    { icon: KeyRound, label: t('common.password') },
  ];

  const validateStep = () => {
    setError('');
    if (step === 0) {
      if (!form.schoolName || !form.email) {
        setError(t('common.required'));
        return false;
      }
    }
    if (step === 1 && (!form.city || !form.state)) {
      setError(t('common.required'));
      return false;
    }
    if (step === 2) {
      if (form.password.length < 6) {
        setError(t('auth.passwordMin'));
        return false;
      }
      if (form.password !== form.confirm) {
        setError(t('auth.passwordMismatch'));
        return false;
      }
    }
    return true;
  };

  const next = () => validateStep() && setStep((s) => Math.min(2, s + 1));

  const submit = async () => {
    if (!validateStep()) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register-school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subjects }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || t('common.error'));
        return;
      }
      setDone({ code: data.schoolCode });
    } catch {
      setError(t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    'w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[#7B1E1E] focus:ring-2 focus:ring-[#7B1E1E]/15 dark:border-white/10 dark:bg-white/5 dark:text-stone-100';

  const Label: React.FC<{ text: string; required?: boolean; children: React.ReactNode; wide?: boolean }> = ({
    text,
    required,
    children,
    wide,
  }) => (
    <label className={`block ${wide ? 'sm:col-span-2' : ''}`}>
      <span className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-300">
        {text}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </span>
      {children}
    </label>
  );

  if (done) {
    return (
      <div className="grid min-h-screen place-items-center bg-stone-50 p-6 dark:bg-[#0F0C0C]">
        <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-xl dark:border-white/10 dark:bg-[#171313]">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="mt-5 font-serif text-xl font-bold text-stone-900 dark:text-stone-50">{t('auth.registerSuccess')}</h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{t('auth.pendingNotice')}</p>

          <div className="mt-6 rounded-xl border border-dashed border-[#C79A2D]/50 bg-[#C79A2D]/10 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">{t('auth.schoolCodeIssued')}</p>
            <div className="mt-1.5 flex items-center justify-center gap-2">
              <p className="font-mono text-xl font-bold text-[#7B1E1E] dark:text-[#e8c877]">{done.code}</p>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(done.code);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-white/60 hover:text-stone-700"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            onClick={() => router.push('/login')}
            className="mt-6 w-full rounded-xl bg-[#7B1E1E] px-4 py-3 text-sm font-bold text-white hover:bg-[#6a1919]"
          >
            {t('auth.login')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-8 dark:bg-[#0F0C0C] sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-[#7B1E1E]">
            <ArrowLeft className="h-4 w-4" />
            {t('common.back')}
          </Link>
          <LanguageToggle />
        </div>

        <div className="mt-8 text-center">
          <Image src="/logo/logo.png" alt="BBO" width={56} height={56} priority className="mx-auto rounded-xl object-contain" />
          <h1 className="mt-4 font-serif text-2xl font-bold text-stone-900 dark:text-stone-50 sm:text-3xl">
            {t('auth.registerSchool')}
          </h1>
          <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">{t('auth.registerSubtitle')}</p>
        </div>

        {/* stepper */}
        <div className="mx-auto mt-8 flex max-w-lg items-center">
          {steps.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full border-2 transition ${
                    i <= step
                      ? 'border-[#7B1E1E] bg-[#7B1E1E] text-white'
                      : 'border-stone-200 bg-white text-stone-400 dark:border-white/10 dark:bg-white/5'
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                </span>
                <span className="hidden text-[11px] font-semibold text-stone-500 sm:block">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <span className={`mx-2 h-0.5 flex-1 rounded ${i < step ? 'bg-[#7B1E1E]' : 'bg-stone-200 dark:bg-white/10'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#171313] sm:p-8">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Label text={t('school.name')} required wide>
                <input className={inputCls} value={form.schoolName} onChange={(e) => set('schoolName', e.target.value)} />
              </Label>
              <Label text={t('school.principal')}>
                <input className={inputCls} value={form.principal} onChange={(e) => set('principal', e.target.value)} />
              </Label>
              <Label text={t('school.board')}>
                <select className={inputCls} value={form.board} onChange={(e) => set('board', e.target.value)}>
                  {['CBSE', 'ICSE', 'State Board', 'IB', 'Other'].map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Label>
              <Label text={t('common.email')} required>
                <input type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} />
              </Label>
              <Label text={t('common.phone')}>
                <input className={inputCls} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              </Label>
              <div className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-300">
                  {t('student.subject')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: 'hindi', l: t('student.subject.hindi') },
                    { v: 'sanskrit', l: t('student.subject.sanskrit') },
                  ].map((s) => {
                    const on = subjects.includes(s.v);
                    return (
                      <button
                        key={s.v}
                        type="button"
                        onClick={() => setSubjects((p) => (on ? p.filter((x) => x !== s.v) : [...p, s.v]))}
                        className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                          on
                            ? 'border-[#7B1E1E] bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#e8c877]'
                            : 'border-stone-200 text-stone-500 dark:border-white/10'
                        }`}
                      >
                        {s.l}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Label text={t('common.address')} wide>
                <input className={inputCls} value={form.address} onChange={(e) => set('address', e.target.value)} />
              </Label>
              <Label text={t('common.city')} required>
                <input className={inputCls} value={form.city} onChange={(e) => set('city', e.target.value)} />
              </Label>
              <Label text={t('common.state')} required>
                <select className={inputCls} value={form.state} onChange={(e) => set('state', e.target.value)}>
                  <option value="">{t('common.selectPlaceholder')}</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Label>
              <Label text={t('common.pincode')}>
                <input className={inputCls} value={form.pincode} onChange={(e) => set('pincode', e.target.value)} />
              </Label>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Label text={t('common.password')} required>
                <input type="password" className={inputCls} value={form.password} onChange={(e) => set('password', e.target.value)} />
              </Label>
              <Label text={t('auth.passwordConfirm')} required>
                <input type="password" className={inputCls} value={form.confirm} onChange={(e) => set('confirm', e.target.value)} />
              </Label>
              <div className="rounded-xl bg-stone-50 p-4 text-xs text-stone-500 dark:bg-white/5 sm:col-span-2">
                <p className="font-bold text-stone-700 dark:text-stone-200">{form.schoolName}</p>
                <p className="mt-1">
                  {form.email} · {form.city}
                  {form.state ? `, ${form.state}` : ''}
                </p>
              </div>
            </div>
          )}

          {error && (
            <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              {error}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-50 disabled:opacity-40 dark:border-white/10 dark:text-stone-300"
            >
              {t('common.prev')}
            </button>

            {step < 2 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-xl bg-[#7B1E1E] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#6a1919]"
              >
                {t('common.next')}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-xl bg-[#7B1E1E] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#6a1919] disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {t('auth.register')}
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
          {t('auth.haveAccount')}{' '}
          <Link href="/login" className="font-bold text-[#7B1E1E] hover:underline dark:text-[#d9b45f]">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export const RegistrationPage: React.FC = () => (
  <LangProvider>
    <RegistrationInner />
  </LangProvider>
);

export default RegistrationPage;
