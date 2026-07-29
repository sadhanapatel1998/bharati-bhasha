'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; route?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { language, navigateTo } = useApp();

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 my-4 flex-wrap rounded-full border border-[#7B1E1E]/10 dark:border-[#C79A2D]/20 bg-white dark:bg-white/[0.03] px-3 py-1.5 w-fit max-w-full text-xs font-medium"
    >
      <button
        onClick={() => navigateTo('/')}
        className="text-sm group flex items-center gap-1.5 rounded-full px-2 py-1 text-gray-800 dark:text-gray-400 transition-colors hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] hover:bg-[#7B1E1E]/[0.06] dark:hover:bg-[#C79A2D]/[0.08]"
      >
        <Home className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:-translate-y-px" />
        <span>मुख्य पृष्ठ</span>
      </button>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 shrink-0 text-[#7B1E1E]/30 dark:text-[#C79A2D]/30" />
            {item.route ? (
              <button
                onClick={() => navigateTo(item.route!)}
                className="text-sm relative rounded-full px-2 py-1 text-gray-800 dark:text-gray-400 transition-colors hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] hover:bg-[#7B1E1E]/[0.06] dark:hover:bg-[#C79A2D]/[0.08]"
              >
                {item.label}
              </button>
            ) : (
              <span
                aria-current="page"
                className="flex items-center text-sm gap-1.5 truncate max-w-xs px-2 py-1 font-semibold text-[#7B1E1E] dark:text-[#C79A2D]"
              >
                <span className="w-1 h-1 rounded-full bg-[#C79A2D] dark:bg-[#C79A2D] shrink-0" />
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};