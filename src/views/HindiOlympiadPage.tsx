'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { BookOpen, Calendar, Clock, Trophy, FileText, CheckCircle2 } from 'lucide-react';
export const HindiOlympiadPage: React.FC = () => {
  const {
    language,
    navigateTo
  } = useApp();
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      <div className="bg-gradient-to-r from-[#7B1E1E] to-[#A32A2A] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="bg-[#C79A2D] text-[#7B1E1E] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block">
            Classes 1st to 12th
          </span>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold">
            {'राष्ट्रीय हिंदी भाषा ओलंपियाड 2026'}
          </h1>
          <p className="text-xs sm:text-base text-gray-200 leading-relaxed">
            {'हिंदी भाषा के शब्द सामर्थ्य, व्याकरण, शुद्ध लेखन, अपठित अवबोधन एवं साहित्यिक रुचि की वैज्ञानिक परीक्षा।'}
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button onClick={() => navigateTo('/registration')} className="bg-[#C79A2D] text-[#7B1E1E] font-bold px-6 py-3 rounded-xl text-xs hover:bg-[#E2B855] transition-colors">
              {'हिंदी ओलंपियाड हेतु पंजीकरण करें'}
            </button>
            <button onClick={() => navigateTo('/mock-test')} className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl text-xs border border-white/20 transition-colors">
              {'मॉक टेस्ट दें'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
          <Calendar className="w-6 h-6 text-[#7B1E1E] dark:text-[#C79A2D]" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">{'प्रथम चरण तिथि'}</h3>
          <p className="text-xs text-gray-500">October 18, 2026 (10:00 AM IST)</p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
          <Clock className="w-6 h-6 text-[#C79A2D]" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">{'समय अवधि व अंक'}</h3>
          <p className="text-xs text-gray-500">60 Minutes | 100 Total Marks</p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
          <Trophy className="w-6 h-6 text-[#2E8B57]" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">{'पुरस्कार व पदक'}</h3>
          <p className="text-xs text-gray-500">Gold Medals, Cash Prizes & Certificates</p>
        </div>
      </div>

    </div>;
};