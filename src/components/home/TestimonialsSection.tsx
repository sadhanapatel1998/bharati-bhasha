'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { TESTIMONIALS } from '@/data/olympiadData';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { language } = useApp();

  return (
    <section className="bg-gray-50 dark:bg-[#1A1414] py-16 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C79A2D]">
            {language === 'hi' ? 'प्रधानाचार्य व विजेताओं के विचार' : 'Testimonials & Reviews'}
          </span>
          <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {language === 'hi' ? 'शिक्षाविदों एवं छात्रों का अनुभव' : 'What School Leaders Say'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((ts) => (
            <div key={ts.id} className="bg-white dark:bg-[#121010] p-6 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(ts.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  "{ts.quote[language]}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <img src={ts.avatar} alt={ts.name} className="w-10 h-10 rounded-full object-cover border border-[#C79A2D]" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">{ts.name}</h4>
                  <p className="text-[10px] text-gray-500">{ts.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};