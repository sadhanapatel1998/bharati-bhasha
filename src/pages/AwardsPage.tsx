import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { AWARDS_LIST } from '../data/olympiadData';
import { Trophy, Medal, Award, Star, ShieldCheck, Sparkles } from 'lucide-react';

export const AwardsPage: React.FC = () => {
  const { language, navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: language === 'hi' ? 'पुरस्कार एवं सम्मान' : 'Awards & Medals' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#C79A2D]/10 text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {language === 'hi' ? 'राष्ट्रीय स्तर सम्मान' : 'National Recognition'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'राष्ट्रीय पुरस्कार एवं छात्रवृत्ति' : 'National Awards & Medals'}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {language === 'hi' ? 'विज्ञान भवन नई दिल्ली में आयोजित भव्य राष्ट्रीय समारोह में ₹1 करोड़ मूल्य के पुरस्कार' : 'Felicitation ceremony at Vigyan Bhawan, New Delhi with ₹1 Crore total prize pool'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AWARDS_LIST.map((aw) => (
          <div key={aw.id} className="bg-white dark:bg-[#1A1414] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center font-bold text-2xl mb-3">
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

    </div>
  );
};
