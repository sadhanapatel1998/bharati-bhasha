'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ANNOUNCEMENTS } from '../../data/olympiadData';
import { Bell, Sparkles, ChevronRight, Phone, Mail } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const announcement = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="bg-[#7B1E1E] text-[#F5F0E6] text-xs py-2 px-4 border-b border-[#C79A2D]/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
          <span className="bg-[#C79A2D] text-[#7B1E1E] px-2 py-0.5 rounded-full font-semibold text-[10px] tracking-wider uppercase flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3" />
            नवीनतम सूचना
          </span>
          <p className="truncate font-medium hover:text-[#C79A2D] cursor-pointer transition-colors" onClick={() => navigateTo('registration')}>
            {announcement.text.hi}
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px] shrink-0 font-medium opacity-90">
          <a href="tel:18001239876" className="hidden md:flex items-center gap-1.5 hover:text-[#C79A2D] transition-colors">
            <Phone className="w-3 h-3 text-[#C79A2D]" />
            टोल-फ्री: 1800-123-9876
          </a>
          <a href="mailto:info@bharatibhasha.org" className="hidden lg:flex items-center gap-1.5 hover:text-[#C79A2D] transition-colors">
            <Mail className="w-3 h-3 text-[#C79A2D]" />
            info@bharatibhasha.org
          </a>
          <button 
            onClick={() => navigateTo('registration')} 
            className="flex items-center gap-1 text-[#C79A2D] font-semibold hover:underline"
          >
            अभी पंजीकरण करें
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
