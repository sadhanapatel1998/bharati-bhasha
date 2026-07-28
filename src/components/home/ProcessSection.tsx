'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
export const ProcessSection: React.FC = () => {
  const {
    language
  } = useApp();
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C79A2D]">
          {'सरल एवं पारदर्शी प्रक्रिया'}
        </span>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1">
          {'ओलंपियाड में भाग कैसे लें?'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
          {'विद्यालय या व्यक्तिगत स्तर पर 4 आसान चरणों में पंजीकरण से पुरस्कार तक का सफर'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all relative group">
          <div className="w-12 h-12 rounded-2xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] font-extrabold text-xl flex items-center justify-center mb-4">
            01
          </div>
          <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
            {'1. पंजीकरण (Registration)'}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {'विद्यालय अथवा छात्र हमारी वेबसाइट पर ऑनलाइन फॉर्म भरें।'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all relative group">
          <div className="w-12 h-12 rounded-2xl bg-[#C79A2D]/10 text-[#C79A2D] font-extrabold text-xl flex items-center justify-center mb-4">
            02
          </div>
          <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
            {'2. अध्ययन व अभ्यास (Preparation)'}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {'निःशुल्क सैंपल पेपर व ऑनलाइन मॉक टेस्ट से तैयारी करें।'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all relative group">
          <div className="w-12 h-12 rounded-2xl bg-[#2E8B57]/10 text-[#2E8B57] font-extrabold text-xl flex items-center justify-center mb-4">
            03
          </div>
          <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
            {'3. परीक्षा (Examination)'}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {'विद्यालय केंद्र (OMR) अथवा ऑनलाइन प्रोक्टर्ड पोर्टल पर परीक्षा दें।'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all relative group">
          <div className="w-12 h-12 rounded-2xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] font-extrabold text-xl flex items-center justify-center mb-4">
            04
          </div>
          <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
            {'4. परिणाम व पुरस्कार (Awards)'}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {'12-आयामी रिपोर्ट कार्ड, छात्रवृत्ति एवं राष्ट्रीय पदक प्राप्त करें।'}
          </p>
        </div>

      </div>
    </section>;
};