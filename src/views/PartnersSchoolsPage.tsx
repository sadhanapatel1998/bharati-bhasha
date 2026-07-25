'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { PARTNER_SCHOOLS } from '../data/olympiadData';
import { Building2, Award, MapPin, CheckCircle2 } from 'lucide-react';

export const PartnersSchoolsPage: React.FC = () => {
  const { language, navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: language === 'hi' ? 'सहयोगी विद्यालय' : 'Affiliated Schools' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {language === 'hi' ? '2850+ विद्यालय नेटवर्क' : 'National School Network'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'सहयोगी एवं अग्रणी विद्यालय' : 'Affiliated Schools & Educational Partners'}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {language === 'hi' ? 'देश के शीर्ष सीबीएसई, आईसीएसई एवं राज्य बोर्ड विद्यालय जो भाषा ओलंपियाड से संबद्ध हैं' : 'Prominent CBSE, ICSE, and Kendriya Vidyalayas participating in National Bhasha Olympiad'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PARTNER_SCHOOLS.map((sc) => (
          <div key={sc.id} className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#C79A2D]/10 text-[#C79A2D]">
                {sc.studentsCount}+ Students
              </span>
            </div>

            <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-snug">
              {sc.name}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-[#C79A2D]" />
              <span>{sc.city}, {sc.state}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#7B1E1E] to-[#A32A2A] text-white p-8 sm:p-10 rounded-3xl text-center space-y-4">
        <h2 className="font-playfair text-2xl font-bold">
          {language === 'hi' ? 'क्या आपका विद्यालय अभी तक पंजीकृत नहीं है?' : 'Is Your School Registered for 2026?'}
        </h2>
        <p className="text-xs text-gray-200 max-w-xl mx-auto">
          {language === 'hi' ? 'अपने विद्यालय के विद्यार्थियों को राष्ट्रीय मंच प्रदान करने हेतु आज ही विद्यालय ऑनलाइन आवेदन पत्र भरें।' : 'Empower your students with national language evaluation. Enroll your institution today.'}
        </p>
        <button 
          onClick={() => navigateTo('registration')}
          className="bg-[#C79A2D] text-[#7B1E1E] font-bold px-8 py-3 rounded-2xl text-xs shadow-lg hover:bg-[#E2B855] transition-colors"
        >
          {language === 'hi' ? 'विद्यालय पंजीकरण हेतु क्लिक करें' : 'Register School Online'}
        </button>
      </div>

    </div>
  );
};
