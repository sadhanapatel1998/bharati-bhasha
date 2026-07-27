'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const OlympiadShowcaseSection: React.FC = () => {
  const { language, navigateTo } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Hindi Olympiad Card */}
        <div className="bg-gradient-to-br from-[#7B1E1E] to-[#541313] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <span className="bg-[#C79A2D] text-[#7B1E1E] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              Classes 1st to 12th
            </span>
            <h3 className="font-playfair text-3xl font-bold">
              {language === 'hi' ? 'राष्ट्रीय हिंदी भाषा ओलंपियाड' : 'National Hindi Bhasha Olympiad'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              {language === 'hi' ? 'व्याकरण, शुद्ध वर्तनी, साहित्य परिचय, मुहावरे एवं रचनात्मक अभिव्यक्ति की राष्ट्रीय स्तर पर वैज्ञानिक परख।' : 'Fostering Hindi grammar precision, vocabulary depth, literature appreciation, and creative expression in school children.'}
            </p>
            <ul className="space-y-2 text-xs text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C79A2D]" />
                <span>{language === 'hi' ? 'एनईपी 2020 पाठ्यचर्या आधारित प्रश्न' : 'NCERT & NEP 2020 Aligned Pattern'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C79A2D]" />
                <span>{language === 'hi' ? 'वस्तुनिष्ठ बहुविकल्पीय प्रश्नोत्तरी' : 'Objective Multiple Choice Structure'}</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button 
              onClick={() => navigateTo('hindi-olympiad')}
              className="bg-[#C79A2D] hover:bg-[#E2B855] text-[#7B1E1E] px-6 py-3 rounded-xl font-bold text-xs transition-colors flex items-center gap-2"
            >
              <span>{language === 'hi' ? 'हिंदी ओलंपियाड विवरण पढ़ें' : 'View Hindi Olympiad Details'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sanskrit Olympiad Card */}
        <div className="bg-gradient-to-br from-[#1A1414] to-[#2B1F1F] text-white p-8 rounded-3xl shadow-xl border border-[#C79A2D]/30 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <span className="bg-[#2E8B57] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              Classes 3rd to 12th
            </span>
            <h3 className="font-playfair text-3xl font-bold text-[#C79A2D]">
              {language === 'hi' ? 'राष्ट्रीय संस्कृत भाषा ओलंपियाड' : 'National Sanskrit Bhasha Olympiad'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {language === 'hi' ? 'देववाणी संस्कृत के व्याकरण (शब्दरूप, धातुरूप), श्लोक बोध एवं वैदिक-लौकिक साहित्य की वैज्ञानिक परीक्षा।' : 'Reviving classical Sanskrit grammar, shloka wisdom, subhashitas, and Paninian linguistic logic for young scholars.'}
            </p>
            <ul className="space-y-2 text-xs text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C79A2D]" />
                <span>{language === 'hi' ? 'संस्कृत व्याकरण व सुभाषित ज्ञान' : 'Grammar (Vyakaran) & Subhashita Wisdom'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C79A2D]" />
                <span>{language === 'hi' ? 'भारतीय ज्ञान परंपरा का पुनरोद्धार' : 'Bharatiya Jnana Parampara Core'}</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button 
              onClick={() => navigateTo('sanskrit-olympiad')}
              className="bg-[#7B1E1E] hover:bg-[#A32A2A] text-white px-6 py-3 rounded-xl font-bold text-xs transition-colors flex items-center gap-2"
            >
              <span>{language === 'hi' ? 'संस्कृत ओलंपियाड विवरण पढ़ें' : 'View Sanskrit Olympiad Details'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};