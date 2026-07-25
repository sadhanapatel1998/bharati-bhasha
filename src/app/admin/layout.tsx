'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminLayout } from '../../components/admin/AdminLayout';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginRoute = pathname === '/admin/login' || pathname === '/admin-login';

  // The admin login screen renders its own full-page chrome (no sidebar/topbar).
  // Every other /admin/* URL renders the self-contained admin dashboard shell,
  // which manages its own internal section switching (matches original design).
  if (isLoginRoute) {
    return <div className="admin-next-app-layout">{children}</div>;
  }

  return (
    <div className="admin-next-app-layout">
      <AdminLayout />
    </div>
  );
}
