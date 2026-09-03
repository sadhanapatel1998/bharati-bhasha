'use client';

import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { useI18n } from '../../../i18n/LangProvider';
import { usePanel } from '../../../components/panel/PanelProvider';
import { Card, CardHeader, PageHeader, Button, Input, Select, Field, Badge } from '../../../components/panel/ui';
import { ImageUploadField } from '../../../components/panel/ImageUploadField';

interface SchoolProfile {
  _id: string;
  code: string;
  name: string;
  nameHi?: string;
  principal?: string;
  email: string;
  phone?: string;
  board?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  website?: string;
  logo?: string;
  status: string;
  studentCount: number;
}

export default function SchoolProfilePage() {
  const { t } = useI18n();
  const { api, toast } = usePanel();
  const [s, setS] = useState<SchoolProfile | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<{ item: SchoolProfile }>('/api/school/profile')
      .then((r) => setS(r.item))
      .catch(() => setS(null));
  }, [api]);

  const set = (k: keyof SchoolProfile, v: string) => setS((p) => (p ? { ...p, [k]: v } : p));

  const save = async () => {
    if (!s) return;
    setBusy(true);
    try {
      await api('/api/school/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          name: s.name,
          nameHi: s.nameHi,
          principal: s.principal,
          phone: s.phone,
          board: s.board,
          address: s.address,
          city: s.city,
          state: s.state,
          pincode: s.pincode,
          website: s.website,
          logo: s.logo,
        }),
      });
      toast(t('common.updated'), 'success');
    } finally {
      setBusy(false);
    }
  };

  if (!s) return <div className="h-64 animate-pulse rounded-2xl bg-white dark:bg-white/5" />;

  return (
    <>
      <PageHeader title={t('school.profileTitle')} subtitle={t('school.profileSubtitle')}>
        <Button icon={Save} loading={busy} onClick={save}>
          {t('common.save')}
        </Button>
      </PageHeader>

      <Card className="mb-5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{t('school.code')}</p>
            <p className="font-mono text-lg font-bold text-[#7B1E1E] dark:text-[#d9b45f]">{s.code}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{t('school.students')}</p>
            <p className="font-serif text-lg font-bold tabular-nums">{s.studentCount}</p>
          </div>
          <Badge tone={s.status === 'active' ? 'success' : s.status === 'pending' ? 'warning' : 'danger'}>
            {t(`school.status.${s.status}` as never)}
          </Badge>
        </div>
      </Card>

      <Card>
        <CardHeader title={t('school.profileTitle')} />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <Field label={`${t('school.name')} (EN)`} required>
            <Input value={s.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label={`${t('school.name')} (हिं)`}>
            <Input value={s.nameHi || ''} onChange={(e) => set('nameHi', e.target.value)} />
          </Field>
          <Field label={t('school.principal')}>
            <Input value={s.principal || ''} onChange={(e) => set('principal', e.target.value)} />
          </Field>
          <Field label={t('common.email')} hint={t('common.optional')}>
            <Input value={s.email} disabled />
          </Field>
          <Field label={t('common.phone')}>
            <Input value={s.phone || ''} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label={t('school.board')}>
            <Select
              value={s.board || 'CBSE'}
              onChange={(e) => set('board', e.target.value)}
              options={['CBSE', 'ICSE', 'State Board', 'IB', 'Other'].map((v) => ({ value: v, label: v }))}
            />
          </Field>
          <Field label={t('common.address')} className="sm:col-span-2">
            <Input value={s.address || ''} onChange={(e) => set('address', e.target.value)} />
          </Field>
          <Field label={t('common.city')}>
            <Input value={s.city || ''} onChange={(e) => set('city', e.target.value)} />
          </Field>
          <Field label={t('common.state')}>
            <Input value={s.state || ''} onChange={(e) => set('state', e.target.value)} />
          </Field>
          <Field label={t('common.pincode')}>
            <Input value={s.pincode || ''} onChange={(e) => set('pincode', e.target.value)} />
          </Field>
          <Field label="Website">
            <Input value={s.website || ''} onChange={(e) => set('website', e.target.value)} />
          </Field>
          <Field label={t('school.logo')} className="sm:col-span-2">
            <ImageUploadField
              value={s.logo || ''}
              folder="schools"
              ratio="3 / 1"
              onChange={(url) => set('logo', url)}
            />
          </Field>
        </div>
      </Card>
    </>
  );
}
