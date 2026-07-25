import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { TESTIMONIALS } from '../data/olympiadData';
import { Star, Quote } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: language === 'hi' ? 'अनुभव व विचार' : 'Testimonials' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#C79A2D]/10 text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {language === 'hi' ? 'अभिभावक व शिक्षक प्रतिक्रिया' : 'Voices of Trust'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'प्रधानाचार्यों, शिक्षकों व विजेताओं के अनुभव' : 'Testimonials & Reviews'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#C79A2D] gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
                "{t.quote[language]}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#C79A2D]/40" />
              <div>
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">{t.name}</h4>
                <p className="text-[10px] text-gray-500">{t.role} • {t.school}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
