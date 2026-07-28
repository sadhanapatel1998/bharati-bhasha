'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
export const ComparisonSection: React.FC = () => {
  const {
    language,
    navigateTo
  } = useApp();
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#1A1414] rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C79A2D]">
            {'वैज्ञानिक मूल्यांकन'}
          </span>
          <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {'बेंचमार्क रिपोर्ट क्यों पारंपरिक अंक तालिका से श्रेष्ठ है?'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 space-y-3">
            <h3 className="font-bold text-base text-red-700 dark:text-red-400 flex items-center gap-2">
              ❌ {'पारंपरिक अंक प्रणाली (Old Marks System)'}
            </h3>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li>• केवल एक संख्या (जैसे 80/100) देती है।</li>
              <li>• छात्र की वास्तविक भाषाई कमजोरी का पता नहीं चलता।</li>
              <li>• सुधार का कोई विशिष्ट मार्गदर्शन नहीं मिलता।</li>
              <li>• केवल रटने की प्रवृत्ति को बढ़ावा देती है।</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-3">
            <h3 className="font-bold text-base text-[#2E8B57] flex items-center gap-2">
              ✅ {'BBO वैज्ञानिक बेंचमार्क रिपोर्ट (Our Report)'}
            </h3>
            <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300 font-medium">
              <li>• 12 अलग-अलग भाषाई आयामों (व्याकरण, वर्तनी, शब्दज्ञान, साहित्य) का सटीक विश्लेषण।</li>
              <li>• राष्ट्रीय एवं राज्य स्तरीय पर्सेंटाइल रैंक।</li>
              <li>• छात्र की शक्ति (Strengths) व सुधार क्षेत्रों की स्पष्ट रिपोर्ट।</li>
              <li>• शिक्षकों एवं अभिभावकों हेतु विशिष्ट सुझाव परामर्श।</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => navigateTo('/benchmark')} className="bg-[#7B1E1E] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#541313] transition-colors">
            {'नमूना बेंचमार्क रिपोर्ट डाउनलोड करें'}
          </button>
        </div>
      </div>
    </section>;
};