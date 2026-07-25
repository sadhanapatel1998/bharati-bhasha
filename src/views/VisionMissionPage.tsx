'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { Sparkles, Target, Compass, Heart, ShieldCheck, Award } from 'lucide-react';

export const VisionMissionPage: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: language === 'hi' ? 'लक्ष्य एवं दूरदृष्टि' : 'Vision & Mission' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#C79A2D]/10 text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {language === 'hi' ? 'हमारा ध्येय' : 'Our Creed'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'लक्ष्य, दूरदृष्टि एवं मूल मूल्य' : 'Vision, Mission & Core Values'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Vision Card */}
        <div className="bg-white dark:bg-[#1A1414] p-8 rounded-3xl border border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center font-bold text-xl">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'hi' ? 'दूरदृष्टि (Our Vision)' : 'Our Vision'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {language === 'hi' 
              ? 'भारत के प्रत्येक विद्यालय में अध्ययनरत विद्यार्थी को अपनी भाषा हिंदी तथा देववाणी संस्कृत में पूर्ण प्रवीण, आत्मविश्वासी एवं सांस्कृतिक रूप से गौरवान्वित बनाना, ताकि वे 21वीं सदी के वैश्विक ज्ञान युग में भारत का नेतृत्व कर सकें।'
              : 'To empower every student in India with mastery over Hindi & Sanskrit, fostering pride in indigenous knowledge systems and producing linguistically adept, confident leaders.'}
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white dark:bg-[#1A1414] p-8 rounded-3xl border border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center font-bold text-xl">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'hi' ? 'हमारा लक्ष्य (Our Mission)' : 'Our Mission'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {language === 'hi'
              ? '1. राष्ट्रीय स्तर पर वैज्ञानिक व 12-आयामी भाषा परीक्षा आयोजित करना।\n2. शिक्षकों एवं विद्यालयों को उत्कृष्ट भाषा शिक्षण हेतु सम्मानित करना।\n3. NEP 2020 की त्रि-भाषा सूत्र नीति को जमीनी स्तर पर क्रियान्वित करना।'
              : '1. Conduct scientific, transparent 12-dimensional national language olympiads.\n2. Honor educators and school leaders driving indigenous language excellence.\n3. Implement NEP 2020’s multilingual vision seamlessly across CBSE & ICSE schools.'}
          </p>
        </div>

      </div>

      {/* Core Values */}
      <div className="bg-gradient-to-br from-[#7B1E1E] to-[#541313] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
        <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-center text-[#C79A2D]">
          {language === 'hi' ? 'संस्था के ५ मूल सिद्धांत (Core Values)' : '5 Pillars of Excellence'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xl">🏛️</div>
            <div className="font-bold text-xs">{language === 'hi' ? 'सत्य व शुद्धता' : 'Authenticity'}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xl">🔬</div>
            <div className="font-bold text-xs">{language === 'hi' ? 'वैज्ञानिकता' : 'Scientific Rigor'}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xl">🏆</div>
            <div className="font-bold text-xs">{language === 'hi' ? 'प्रतिभा प्रोत्साहन' : 'Talent Merit'}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xl">🌿</div>
            <div className="font-bold text-xs">{language === 'hi' ? 'संस्कृति संरक्षण' : 'Cultural Heritage'}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xl">🤝</div>
            <div className="font-bold text-xs">{language === 'hi' ? 'पारदर्शिता' : 'Total Transparency'}</div>
          </div>
        </div>
      </div>

    </div>
  );
};
