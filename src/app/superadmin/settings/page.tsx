'use client';

import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { usePanel } from '../../../components/panel/PanelProvider';
import { Card, CardHeader, PageHeader, Button, Input, Field, Toggle } from '../../../components/panel/ui';

interface Settings {
  siteName: string;
  siteNameHi: string;
  tagline: string;
  taglineHi: string;
  contactEmail: string;
  contactPhone: string;
  currentSession: string;
  feePerStudent: number;
  registrationOpen: boolean;
  resultsPublic: boolean;
}

export default function SettingsPage() {
  const { t } = useI18n();
  const { api, toast } = usePanel();
  const [s, setS] = useState<Settings | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<{ settings: Settings }>('/api/superadmin/settings')
      .then((r) => setS(r.settings))
      .catch(() => setS(null));
  }, [api]);

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setS((p) => (p ? { ...p, [k]: v } : p));

  const save = async () => {
    if (!s) return;
    setBusy(true);
    try {
      await api('/api/superadmin/settings', { method: 'PUT', body: JSON.stringify(s) });
      toast(t('settings.saved'), 'success');
    } finally {
      setBusy(false);
    }
  };

  if (!s) return <div className="h-64 animate-pulse rounded-2xl bg-white dark:bg-white/5" />;

  return (
    <>
      <PageHeader title={t('settings.title')} subtitle={t('settings.subtitle')}>
        <Button icon={Save} loading={busy} onClick={save}>
          {t('common.save')}
        </Button>
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title={t('settings.siteName')} />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label={`${t('settings.siteName')} (EN)`}>
              <Input value={s.siteName} onChange={(e) => set('siteName', e.target.value)} />
            </Field>
            <Field label={`${t('settings.siteName')} (हिं)`}>
              <Input value={s.siteNameHi} onChange={(e) => set('siteNameHi', e.target.value)} />
            </Field>
            <Field label={`${t('settings.tagline')} (EN)`}>
              <Input value={s.tagline} onChange={(e) => set('tagline', e.target.value)} />
            </Field>
            <Field label={`${t('settings.tagline')} (हिं)`}>
              <Input value={s.taglineHi} onChange={(e) => set('taglineHi', e.target.value)} />
            </Field>
            <Field label={t('settings.contactEmail')}>
              <Input value={s.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} />
            </Field>
            <Field label={t('settings.contactPhone')}>
              <Input value={s.contactPhone} onChange={(e) => set('contactPhone', e.target.value)} />
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader title={t('exam.session')} />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label={t('settings.currentSession')}>
              <Input value={s.currentSession} onChange={(e) => set('currentSession', e.target.value)} />
            </Field>
            {/* <Field label={t('settings.feePerStudent')}>
              <Input
                type="number"
                value={s.feePerStudent}
                onChange={(e) => set('feePerStudent', Number(e.target.value) || 0)}
              />
            </Field> */}
            <div className="space-y-4 sm:col-span-2">
              <Toggle
                checked={s.registrationOpen}
                onChange={(v) => set('registrationOpen', v)}
                label={t('settings.registrationOpen')}
              />
              <Toggle checked={s.resultsPublic} onChange={(v) => set('resultsPublic', v)} label={t('settings.resultsPublic')} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
