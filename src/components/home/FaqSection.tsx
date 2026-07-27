'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FAQS } from '@/data/olympiadData';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { language } = useApp();
  const [activeFaq, setActiveFaq] = useState<string | null>('faq1');

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C79A2D]">
          {language === 'hi' ? 'जिज्ञासा व समाधान' : 'Got Questions?'}
        </span>
        <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mt-1">
          {language === 'hi' ? 'सामान्य प्रश्नोत्तर (FAQs)' : 'Frequently Asked Questions'}
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq) => {
          const isOpen = activeFaq === faq.id;
          return (
            <div key={faq.id} className="bg-white dark:bg-[#1A1414] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
              <button
                onClick={() => setActiveFaq(isOpen ? null : faq.id)}
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
    </section>
  );
};