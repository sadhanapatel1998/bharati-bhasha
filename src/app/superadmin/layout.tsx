'use client';

import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  Award,
  CalendarDays,
  Megaphone,
  Inbox,
  UserCog,
  History,
  Settings,
  FileText,
} from 'lucide-react';
import { LangProvider } from '../../i18n/LangProvider';
import { PanelProvider } from '../../components/panel/PanelProvider';
import { PanelShell, NavGroup } from '../../components/panel/PanelShell';

const nav: NavGroup[] = [
  {
    titleKey: 'nav.overview',
    items: [{ href: '/superadmin/dashboard', labelKey: 'common.dashboard', icon: LayoutDashboard }],
  },
  {
    titleKey: 'nav.participation',
    items: [
      { href: '/superadmin/schools', labelKey: 'nav.schools', icon: Building2, permission: 'schools.view' },
      { href: '/superadmin/students', labelKey: 'nav.students', icon: Users, permission: 'students.view' },
    ],
  },
  {
    titleKey: 'nav.academics',
    items: [
      { href: '/superadmin/results', labelKey: 'nav.results', icon: Award, permission: 'results.view' },
      { href: '/superadmin/exams', labelKey: 'nav.exams', icon: CalendarDays, permission: 'exams.view' },
    ],
  },
  {
    titleKey: 'nav.content',
    items: [
      { href: '/superadmin/site-content', labelKey: 'nav.siteContent', icon: FileText, permission: 'content.view' },
      { href: '/superadmin/announcements', labelKey: 'nav.announcements', icon: Megaphone, permission: 'announcements.view' },
      { href: '/superadmin/enquiries', labelKey: 'nav.enquiries', icon: Inbox, permission: 'enquiries.view' },
    ],
  },
  {
    titleKey: 'nav.system',
    items: [
      { href: '/superadmin/admins', labelKey: 'nav.admins', icon: UserCog, permission: 'admins.view' },
      { href: '/superadmin/audit-logs', labelKey: 'nav.auditLogs', icon: History, permission: 'audit.view' },
      { href: '/superadmin/settings', labelKey: 'nav.settings', icon: Settings, permission: 'settings.view' },
    ],
  },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <PanelProvider>
        <PanelShell nav={nav} brandKey="app.superAdmin" allowedRoles={['superadmin', 'admin']}>
          {children}
        </PanelShell>
      </PanelProvider>
    </LangProvider>
  );
}
