'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Language, Theme } from '../types';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  designation?: string;
  avatar?: string;
  lastLogin?: string;
  permissions?: string[];
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  currentRoute: string;
  navigateTo: (route: string, params?: Record<string, any>) => void;
  routeParams: Record<string, any>;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  // Admin Auth Context
  adminUser: AdminUser | null;
  adminToken: string | null;
  isLoggedInAdmin: boolean;
  loginAdmin: (token: string, user: AdminUser) => void;
  logoutAdmin: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [language, setLanguage] = useState<Language>('hi');
  const [theme, setTheme] = useState<Theme>('light');

  // The current route is simply the real Next.js folder-based route path.
  const currentRoute = pathname || '/';
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Admin auth state - initialized safely for SSR, hydrated from localStorage on mount.
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('bbo_admin_token');
    if (savedToken) setAdminToken(savedToken);

    const savedUser = localStorage.getItem('bbo_admin_user');
    if (savedUser) {
      try {
        setAdminUser(JSON.parse(savedUser));
      } catch (e) {
        /* ignore */
      }
    }
  }, []);

  const isLoggedInAdmin = Boolean(adminToken && adminUser);

  // Sync theme with document class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Client-side navigation via the real Next.js folder-based router.
  const navigateTo = (route: string, params: Record<string, any> = {}) => {
    setRouteParams(params);
    router.push(route);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const loginAdmin = (token: string, user: AdminUser) => {
    setAdminToken(token);
    setAdminUser(user);
    localStorage.setItem('bbo_admin_token', token);
    localStorage.setItem('bbo_admin_user', JSON.stringify(user));
    router.push('/admin');
  };

  const logoutAdmin = async () => {
    try {
      if (adminToken) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: adminToken })
        });
      }
    } catch (err) {
      console.warn('Logout API warning:', err);
    } finally {
      setAdminToken(null);
      setAdminUser(null);
      localStorage.removeItem('bbo_admin_token');
      localStorage.removeItem('bbo_admin_user');
      showToast('प्रशासक सत्र सफलतापूर्वक समाप्त हो गया।', 'info');
      router.push('/admin/login');
    }
  };

  const toggleLanguage = () => {
    setLanguage('hi');
    showToast('भारती भाषा ओलंपियाड सम्पूर्ण रूप से हिन्दी भाषा में ही उपलब्ध है।', 'info');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        currentRoute,
        navigateTo,
        routeParams,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        adminUser,
        adminToken,
        isLoggedInAdmin,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
