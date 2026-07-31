'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SYLLABUS_DATA } from '../data/olympiadData';
import { Download, CheckCircle2, BookOpen, GraduationCap, Sparkles, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

export const SyllabusPage: React.FC = () => {
  const { language, showToast } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const selected = SYLLABUS_DATA[activeTab];

  const classLabels = SYLLABUS_DATA.map((item) => item.classLevel);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-100/30 overflow-hidden pb-8">
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
          title="ओलंपियाड पाठ्यक्रम"
          items={[
            {
              label: "परीक्षाएँ",
              route: "/syllabus",
            },
            {
              label: "पाठ्यक्रम",
            },
          ]}
        />

        {/* Hero Section */}
        <SectionHeader
          icon={BookOpen}
          badge="पाठ्यक्रम रूपरेखा"
          title="कक्षा 1 से 12 आधिकारिक पाठ्यक्रम"
          description='एनसीईआरटी एवं प्रमुख राज्य बोर्डों के स्तरानुसार निर्मित हिंदी एवं संस्कृत भाषा का विस्तृत पाठ्यक्रम'
        />

        {/* Class Level Selector Tabs – with icons and larger text */}
        <div className="flex flex-wrap justify-center gap-3">
          {classLabels.map((label, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`cursor-pointer group flex items-center gap-2 px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${activeTab === idx
                ? 'bg-gradient-to-r from-[#790e03] to-[#A32A2A] text-white shadow-lg scale-105'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-300 border-2 border-amber-200/60 dark:border-gray-700 hover:border-amber-400 hover:shadow-md'
                }`}
            >
              <GraduationCap className={`w-5 h-5 ${activeTab === idx ? 'text-amber-300' : 'text-amber-500'}`} />
              <span>{label}</span>
              {activeTab === idx && <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />}
            </button>
          ))}
        </div>

        {/* Syllabus Card – with refined two-column layout */}
        <div className="bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm rounded-3xl p-8 sm:p-10 border-2 border-amber-200/60 dark:border-gray-800 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#C79A2D]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-red-800/5 rounded-full blur-2xl pointer-events-none" />

          {/* Hindi Topics */}
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-3 border-b-2 border-amber-200/40 pb-3">
              <div className="w-15 h-15 rounded-xl bg-gradient-to-br from-red-900 to-amber-700 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-3xl">हिं</span>
              </div>
              <h2 className="font-playfair text-3xl font-bold text-red-950 dark:text-[#C79A2D]">
                हिंदी भाषा पाठ्यक्रम
              </h2>
            </div>
            <ul className="space-y-3">
              {selected.hindiTopics.map((topic, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 bg-amber-50/50 dark:bg-gray-800/30 rounded-xl border border-amber-200/40 dark:border-gray-700 hover:border-amber-400 transition-all group"
                >
                  <CheckCircle2 className="w-6 h-6 text-red-800 dark:text-[#C79A2D] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-medium text-gray-800 dark:text-gray-200 leading-relaxed font-semibold">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sanskrit Topics */}
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-3 border-b-2 border-amber-200/40 pb-3">
              <div className="w-15 h-15 rounded-xl bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-3xl">सं</span>
              </div>
              <h2 className="font-playfair text-3xl font-bold text-blue-950">
                संस्कृत भाषा पाठ्यक्रम
              </h2>
            </div>
            <ul className="space-y-3">
              {selected.sanskritTopics.map((topic, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 bg-amber-50/50 dark:bg-gray-800/30 rounded-xl border border-amber-200/40 dark:border-gray-700 hover:border-amber-400 transition-all group"
                >
                  <CheckCircle2 className="w-6 h-6 text-blue-900 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-medium text-gray-800 dark:text-gray-200 leading-relaxed font-semibold">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Download Button – with gradient and larger text */}
        <div className="text-center pt-4">
          <button
            onClick={() => showToast('पाठ्यक्रम डाउनलोड होना प्रारम्भ हुआ।', 'success')}
            className="cursor-pointer inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#eca809] to-amber-500 hover:from-amber-500 hover:to-[#C79A2D] text-red-950 font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <Download className="w-6 h-6" />
            <span>पूर्ण पाठ्यक्रम PDF डाउनलोड करें</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-3 text-medium text-amber-700 dark:text-amber-400 font-medium">
            PDF में विस्तृत पाठ्यक्रम, अध्यायवार विभाजन एवं संदर्भ सामग्री उपलब्ध
          </p>
        </div>
      </div>
    </div>
  );
};

export default SyllabusPage;