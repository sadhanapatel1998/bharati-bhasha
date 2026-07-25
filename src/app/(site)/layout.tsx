'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Header } from '../../components/layout/Header';
import { MobileMenu } from '../../components/layout/MobileMenu';
import { Footer } from '../../components/layout/Footer';
import { SearchModal } from '../../components/shared/SearchModal';
import { ScrollToTop } from '../../components/shared/ScrollToTop';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] dark:bg-[#120D0D] text-gray-900 dark:text-gray-100 font-poppins selection:bg-[#C79A2D] selection:text-[#7B1E1E]">
      <AnnouncementBar />
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
      <SearchModal />
      <ScrollToTop />
    </div>
  );
}
