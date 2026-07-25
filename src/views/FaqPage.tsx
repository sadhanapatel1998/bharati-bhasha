'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { FAQS } from '../data/olympiadData';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { language } = useApp();
  const [activeId, setActiveId] = useState<string | null>('faq1');
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(f => 
    f.question[language].toLowerCase().includes(search.toLowerCase()) || 
    f.answer[language].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: language === 'hi' ? 'सामान्य प्रश्न' : 'FAQs' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="bg-[#C79A2D]/10 text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {language === 'hi' ? 'जिज्ञासा समाधान' : 'Help & FAQs'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'सामान्य प्रश्नोत्तर (FAQs)' : 'Frequently Asked Questions'}
        </h1>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={language === 'hi' ? 'प्रश्न खोजें...' : 'Search questions...'}
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-[#1A1414] border border-gray-200 dark:border-gray-800 text-sm font-medium focus:outline-none focus:border-[#C79A2D]"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((faq) => {
          const isOpen = activeId === faq.id;
          return (
            <div key={faq.id} className="bg-white dark:bg-[#1A1414] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
              <button
                onClick={() => setActiveId(isOpen ? null : faq.id)}
                className="w-full text-left p-5 font-bold text-xs sm:text-sm text-gray-900 dark:text-white flex items-center justify-between gap-4"
              >
                <span>{faq.question[language]}</span>
                <ChevronDown className={`w-4 h-4 text-[#C79A2D] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="p-5 pt-0 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-50 dark:border-gray-800 leading-relaxed">
                  {faq.answer[language]}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
