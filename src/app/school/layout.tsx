'use client';

import React from 'react';
import { LayoutDashboard, Users, Award, Building2 } from 'lucide-react';
import { LangProvider } from '../../i18n/LangProvider';
import { PanelProvider } from '../../components/panel/PanelProvider';
import { PanelShell, NavGroup } from '../../components/panel/PanelShell';

const nav: NavGroup[] = [
  {
    titleKey: 'nav.overview',
    items: [{ href: '/school/dashboard', labelKey: 'common.dashboard', icon: LayoutDashboard }],
  },
  {
    titleKey: 'nav.participation',
    items: [
      { href: '/school/students', labelKey: 'nav.myStudents', icon: Users },
      { href: '/school/results', labelKey: 'nav.myResults', icon: Award },
    ],
  },
  {
    titleKey: 'nav.system',
    items: [{ href: '/school/profile', labelKey: 'nav.schoolProfile', icon: Building2 }],
  },
];

export default function SchoolPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <PanelProvider>
        <PanelShell nav={nav} brandKey="app.schoolAdmin" allowedRoles={['school']}>
          {children}
        </PanelShell>
      </PanelProvider>
    </LangProvider>
  );
}
