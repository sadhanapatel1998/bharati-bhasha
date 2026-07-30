'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import SectionHeader from '../components/shared/SectionHeader';
import { FAQS } from '../data/olympiadData';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { language } = useApp();
  const [activeId, setActiveId] = useState<string | null>('faq1');
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="mb-0 relative py-16 overflow-hidden bg-white">
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #790e03 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, #C79A2D 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 80px 80px',
          backgroundPosition: '0 0, 40px 40px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <SectionHeader
          icon={HelpCircle}
          badge="जिज्ञासा व समाधान"
          title="सामान्य प्रश्नोत्तर (FAQs)"
          description="ओलंपियाड से संबंधित सभी सामान्य प्रश्नों के उत्तर यहाँ प्राप्त करें"
        />

        {/* Search Box – styled to match the section */}
        {/* <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'hi' ? 'प्रश्न खोजें...' : 'Search questions...'}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-amber-50/50 dark:bg-gray-800/50 border-2 border-amber-200/60 dark:border-gray-700 text-base font-medium text-gray-900 dark:text-white focus:outline-none focus:border-[#C79A2D] transition-colors"
            />
          </div>
        </div> */}

        {/* FAQ Accordion – exactly like the section design */}
        <div className="space-y-4">
          {filtered.map((faq, index) => {
            const isOpen = activeId === faq.id;

            return (
              <div
                key={faq.id}
                className={`relative rounded-2xl border shadow-sm transition-all duration-300 ${
                  isOpen
                    ? 'border-amber-400 bg-white shadow-lg'
                    : 'border-amber-200/60 bg-white/80 hover:bg-white hover:shadow-md hover:border-amber-300'
                }`}
              >
                {/* Decorative left accent (only when open) */}
                {isOpen && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5rounded-l-2xl" />
                )}

                {/* Question Button */}
                <button
                  onClick={() => setActiveId(isOpen ? null : faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                >
                  <span
                    className={`text-lg font-bold font-heading-hi transition-colors duration-200 ${
                      isOpen
                        ? 'text-red-900'
                        : 'text-slate-800 group-hover:text-red-800'
                    }`}
                  >
                    <span className="inline-block w-10 h-10 rounded-full bg-amber-100 text-red-800 text-base font-black text-center leading-10 mr-3 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    } group-hover:scale-110`}
                  />
                </button>

                {/* Answer (collapsible) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-1 border-t border-amber-200/40">
                    <p className="text-lg text-slate-800 font-devanagari leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state when no results */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {language === 'hi'
                ? 'कोई प्रश्न नहीं मिला। कृपया दूसरे कीवर्ड से खोजें।'
                : 'No questions found. Please try a different keyword.'}
            </p>
          </div>
        )}

        {/* Bottom CTA – exactly like the section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50/80 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-200/60 shadow-sm">
            <HelpCircle className="w-5 h-5 text-[#C79A2D]" />
            <p className="text-base sm:text-lg text-gray-700 font-semibold">
              {language === 'hi'
                ? 'क्या आपका प्रश्न सूची में नहीं है?'
                : 'Still have a question?'}
              <button
                className="ml-2 text-red-800 font-bold hover:text-amber-700 transition-colors underline-offset-2 hover:underline"
                onClick={() => (window.location.href = '/contact')}
              >
                {language === 'hi' ? 'हमसे संपर्क करें' : 'Contact us'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqPage;