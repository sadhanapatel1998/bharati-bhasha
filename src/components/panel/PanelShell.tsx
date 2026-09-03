'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { useI18n, LanguageToggle } from '../../i18n/LangProvider';
import { TKey } from '../../i18n/dictionary';
import { usePanel } from './PanelProvider';

export interface NavItem {
  href: string;
  labelKey: TKey;
  icon: React.ElementType;
  badge?: number;
  /** hide this item unless the user holds one of these permissions */
  permission?: string | string[];
}
export interface NavGroup {
  titleKey: TKey;
  items: NavItem[];
}

export const PanelShell: React.FC<{
  nav: NavGroup[];
  brandKey: TKey;
  allowedRoles: ('superadmin' | 'admin' | 'school')[];
  children: React.ReactNode;
}> = ({ nav, brandKey, allowedRoles, children }) => {
  const { t } = useI18n();
  const { user, loading, logout, theme, toggleTheme } = usePanel();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-stone-50 dark:bg-[#0F0C0C]">
        <div className="flex flex-col items-center gap-3 text-stone-500">
          <Loader2 className="h-7 w-7 animate-spin text-[#7B1E1E]" />
          <p className="text-sm font-medium">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="grid min-h-screen place-items-center bg-stone-50 p-6 dark:bg-[#0F0C0C]">
        <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-xl dark:border-white/10 dark:bg-[#171313]">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-500/15">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h2 className="mt-4 font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
            {t('auth.sessionExpired')}
          </h2>
          <button
            onClick={() => router.push('/login')}
            className="mt-5 w-full rounded-xl bg-[#7B1E1E] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#6a1919]"
          >
            {t('auth.login')}
          </button>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  // superadmin and school users see their full menu; admins see only what they
  // have been granted.
  const allowed = (item: NavItem) => {
    if (!item.permission || user.role !== 'admin') return true;
    const need = Array.isArray(item.permission) ? item.permission : [item.permission];
    const held = user.permissions || [];
    return need.some((p) => held.includes(p));
  };

  const visibleNav = nav
    .map((group) => ({ ...group, items: group.items.filter(allowed) }))
    .filter((group) => group.items.length > 0);

  const Sidebar = (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-3 pb-6 pt-4">
      <div className="rounded-2xl border border-[#7B1E1E]/15 bg-gradient-to-br from-[#7B1E1E]/[0.07] to-[#C79A2D]/[0.07] p-3.5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#7B1E1E] dark:text-[#d9b45f]">
          {t(brandKey)}
        </p>
        <p className="mt-1 truncate text-xs text-stone-500 dark:text-stone-400">
          {user.school ? `${user.school.code} · ${user.school.name}` : user.designation || user.email}
        </p>
      </div>

      {visibleNav.map((group) => (
        <div key={String(group.titleKey)}>
          <p className="mb-1.5 flex items-center gap-1.5 px-3 text-[10px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500">
            <span className="h-2.5 w-1 rounded-full bg-[#C79A2D]" />
            {t(group.titleKey)}
          </p>
          <nav className="space-y-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    active
                      ? 'bg-[#7B1E1E] text-white shadow-sm'
                      : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-[#e8c877]' : 'text-stone-400'}`} />
                    <span className="truncate">{t(item.labelKey)}</span>
                  </span>
                  {item.badge ? (
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                        active ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600 dark:bg-white/10 dark:text-stone-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    active && <ChevronRight className="h-3.5 w-3.5 text-white/70" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}

      <div className="mt-auto border-t border-stone-200 pt-3 dark:border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-white/[0.06]"
        >
          <ExternalLink className="h-4 w-4 text-stone-400" />
          {t('common.viewSite')}
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
        >
          <LogOut className="h-4 w-4" />
          {t('common.logout')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-[#0F0C0C] dark:text-stone-100">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/85 backdrop-blur-md dark:border-white/10 dark:bg-[#141010]/85">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl p-2 text-stone-600 hover:bg-stone-100 lg:hidden dark:text-stone-300 dark:hover:bg-white/10"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo/logo.png" alt="BBO" width={38} height={38} priority className="rounded-lg object-contain" />
              <span className="hidden min-w-0 sm:block">
                <span className="block truncate font-serif text-[15px] font-bold leading-tight text-[#7B1E1E] dark:text-stone-50">
                  {t('app.name')}
                </span>
                <span className="block truncate text-[11px] font-medium text-stone-500 dark:text-stone-400">
                  {t(brandKey)}
                </span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-stone-200 p-2 text-stone-600 transition hover:bg-stone-100 dark:border-white/10 dark:text-stone-300 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <div className="flex items-center gap-2.5 border-l border-stone-200 pl-3 dark:border-white/10">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#7B1E1E] to-[#C79A2D] text-xs font-bold text-white">
                {user.name?.slice(0, 2).toUpperCase()}
              </span>
              <span className="hidden text-left md:block">
                <span className="block text-[13px] font-bold leading-tight">{user.name}</span>
                <span className="block text-[11px] text-stone-500 dark:text-stone-400">
                  {t(('admin.role.' + user.role) as TKey)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] gap-6 px-4 py-6 sm:px-6">
        <aside className="sticky top-[88px] hidden h-[calc(100vh-112px)] w-[264px] shrink-0 rounded-2xl border border-stone-200 bg-white lg:block dark:border-white/10 dark:bg-[#171313]">
          {Sidebar}
        </aside>

        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-2xl dark:bg-[#171313]">
              <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3.5 dark:border-white/10">
                <span className="font-serif text-sm font-bold text-[#7B1E1E] dark:text-stone-100">{t(brandKey)}</span>
                <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-100 dark:hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="h-[calc(100%-57px)]">{Sidebar}</div>
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 pb-10">{children}</main>
      </div>
    </div>
  );
};
