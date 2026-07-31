'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import SectionHeader from '../components/shared/SectionHeader';
import { EXAM_SCHEDULE } from '../data/olympiadData';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  LogIn,
  Trophy,
  Sparkles,
  ChevronRight,
  Bell,
} from 'lucide-react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

export const ExamDatesPage: React.FC = () => {
  const { language, navigateTo, showToast } = useApp();

  const handleAddToCalendar = (title: string, date: string) => {
    showToast(`${title} – ${date} को कैलेंडर में जोड़ा गया।`, 'success');
  };

  return (
    <div className="pb-8 relative min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-100/30 overflow-hidden">
      {/* Decorative pattern */}
      <div
        className="
    absolute inset-0 pointer-events-none opacity-[0.04]
    bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
    bg-[length:60px_60px,80px_80px]
    bg-[position:0_0,40px_40px]
  "
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 z-10">
        <Breadcrumb
          title="परीक्षा कार्यक्रम"
          items={[
            {
              label: "परीक्षाएँ",
              route: "/syllabus",
            },
            {
              label: "परीक्षा कार्यक्रम",
            },
          ]}
        />
        {/* Hero with SectionHeader and Login Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <SectionHeader
            icon={Calendar}
            badge="समय सारणी 2026"
            title="ओलंपियाड परीक्षा तिथियाँ व समय सारणी"
            description="विद्यालय अपनी सुविधा अनुसार हिंदी एवं संस्कृत ओलंपियाड के लिए दिए गए दो विकल्पों में से किसी एक तिथि का चयन कर सकते हैं।"
            className="flex-1"
          />
        </div>

        {/* Exam Schedule Cards */}
        <div className="space-y-6">
          {EXAM_SCHEDULE.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm rounded-3xl p-6 sm:p-8 border-2 border-amber-200/60 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Decorative left accent */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-800 to-amber-500 rounded-l-3xl" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Left: Details */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-800/10 dark:bg-red-900/30 text-red-800 dark:text-[#C79A2D] text-sm font-bold uppercase tracking-wider">
                      <Bell className="w-3.5 h-3.5" />
                      {item.subject}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-400">
                      • {item.eligibleClasses}
                    </span>
                    {/* Status badge – you can add logic if needed */}
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      उपलब्ध
                    </span>
                  </div>

                  <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#C79A2D]" />
                      <span className="font-medium text-gray-800">{item.date}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#C79A2D]" />
                      <span className="font-medium text-gray-800">{item.time}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#C79A2D]" />
                      <span className="font-medium text-gray-800">{item.mode}</span>
                    </span>
                  </div>
                </div>

                {/* Right: Action Button */}
                <button
                  onClick={() => handleAddToCalendar(item.title, item.date)}
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#7B1E1E] to-red-800 hover:from-red-800 hover:to-[#7B1E1E] text-white font-bold text-base rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Calendar className="w-5 h-5 text-amber-300" />
                  <span className='pt-2'>कैलेंडर में जोड़ें</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA – extra */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-3 bg-amber-100/70 dark:bg-amber-900/30 backdrop-blur-sm px-8 py-4 rounded-2xl border border-amber-300 dark:border-amber-700 shadow-sm">
            <Sparkles className="w-6 h-6 text-[#C79A2D]" />
            <p className="text-base text-gray-700 dark:text-gray-300 font-semibold ">
              किसी भी परीक्षा तिथि में परिवर्तन के लिए <strong className="text-red-800 dark:text-[#C79A2D]">1800-123-9876</strong> पर संपर्क करें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDatesPage;