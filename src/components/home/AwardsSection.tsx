'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { AWARDS_LIST } from '@/data/olympiadData';

export const AwardsSection: React.FC = () => {
  const { language } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C79A2D]">
          {language === 'hi' ? 'प्रतिभा सम्मान' : 'Honors & Prizes'}
        </span>
        <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mt-1">
          {language === 'hi' ? 'राष्ट्रीय पुरस्कार एवं छात्रवृत्ति योजना 2026' : 'National Awards & Scholarships 2026'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AWARDS_LIST.map((aw) => (
          <div key={aw.id} className="bg-white dark:bg-[#1A1414] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-2xl transition-all space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center font-bold text-xl mb-3">
                🏆
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1E1E] dark:text-[#C79A2D]">
                {aw.rank}
              </span>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mt-1">
                {aw.title[language]}
              </h3>
              <div className="mt-2 text-sm font-extrabold text-[#2E8B57]">
                {aw.cashPrize}
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                {aw.perks[language].map((perk, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#C79A2D]">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};