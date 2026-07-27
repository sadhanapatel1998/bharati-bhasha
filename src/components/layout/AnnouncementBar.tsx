'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ANNOUNCEMENTS } from '../../data/olympiadData';
import { Bell, Sparkles, ChevronRight, Phone, Mail } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = ANNOUNCEMENTS.length;

  // Auto-slide every 5 seconds (if more than one)
  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  const announcement = ANNOUNCEMENTS[currentIndex];
  const text = language === 'hi' ? announcement.text.hi : announcement.text.en;

  return (
    <div className="relative bg-gradient-to-r from-[#000a2e] via-[#000a2e] to-[#000a2e] text-[#F5F0E6] text-xs py-2  border-b-2 border-[#C79A2D]/40 shadow-md transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Left: Icon + Announcement Text with smooth slider */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-hidden px-4 sm:px-6 lg:px-8">
          <span className="bg-[#C79A2D] text-[#7B1E1E] px-2.5 py-1 rounded-full font-bold text-[10px] tracking-wider uppercase flex items-center gap-1.5 shrink-0">
            <Bell className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Alert</span>
          </span>

          {/* Announcement Carousel – only the text slides smoothly */}
          <div className="relative flex-1 min-w-0 overflow-hidden">
            <div
              key={currentIndex}
              className="flex items-center gap-2 animate-fadeSlide"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C79A2D] shrink-0 animate-pulse" />
              <p
                className="truncate font-medium hover:text-[#C79A2D] cursor-pointer transition-colors duration-200 text-xs sm:text-sm"
                onClick={() => navigateTo('registration')}
              >
                {text}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Contact & CTA – unchanged, still prominent */}
        <div className="flex items-center gap-4 text-[13px] shrink-0 font-medium">
          <a
            href="tel:18001239876"
            className="hidden md:flex items-center  gap-1.5 hover:text-[#C79A2D] transition-colors bg-white/5 px-2.5 py-1 rounded-full hover:bg-white/10"
          >
            <Phone className="w-4.5 h-4.5 text-[#C79A2D]" />
            <span className='text-white'>1800-123-9876</span>
          </a>
          <a
            href="mailto:info@bharatibhasha.org"
            className="hidden lg:flex items-center gap-1.5 hover:text-[#C79A2D] transition-colors bg-white/5 px-2.5 py-1 rounded-full hover:bg-white/10"
          >
            <Mail className="w-3.5 h-3.5 text-[#C79A2D]" />
            <span className='text-white'>info@bharatibhasha.org</span>
          </a>

          <button
            onClick={() => navigateTo('registration')}
            className="flex items-center gap-1.5 bg-[#C79A2D] text-[#7B1E1E] px-3.5 py-1.5 rounded-full font-bold text-xs hover:bg-[#d4af37] hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>{language === 'hi' ? 'अभी पंजीकरण करें' : 'Register Now'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subtle animated gradient overlay for extra flair */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#C79A2D]/5 to-transparent animate-shimmer" />
    </div>
  );
};