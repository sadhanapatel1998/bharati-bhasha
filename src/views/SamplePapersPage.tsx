'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SectionHeader from '../components/shared/SectionHeader';
import { SAMPLE_PAPERS } from '../data/olympiadData';
import {
  FileText,
  Download,
  BookOpen,
  Sparkles,
  ChevronRight,
  Award,
  Filter,
} from 'lucide-react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

export const SamplePapersPage: React.FC = () => {
  const { language, showToast } = useApp();
  const [filterSubject, setFilterSubject] = useState<string>('सभी');

  const filtered =
    filterSubject === 'सभी'
      ? SAMPLE_PAPERS
      : SAMPLE_PAPERS.filter((sp) => sp.subject === filterSubject);

  const handleDownload = (title: string) => {
    showToast(`"${title}" डाउनलोड होना प्रारम्भ हुआ।`, 'success');
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
          title="मॉडल पेपर"
          items={[
            {
              label: "विद्यार्थी मंच",
              route: "/sample-papers",
            },
            {
              label: "मॉडल पेपर",
            },
          ]}
        />

        {/* Hero Section – fully in Hindi */}
        <SectionHeader
          icon={BookOpen}
          badge="निःशुल्क अभ्यास सामग्री"
          title="अभ्यास प्रश्न पत्र (Sample Papers)"
          description="ओलंपियाड की तैयारी हेतु कक्षा 1 से 10 तक के विद्यार्थियों के लिए निःशुल्क मॉडल प्रश्न पत्र, अभ्यास सेट एवं उत्तर कुंजी।"
        />

        {/* Filter Tabs – in Hindi */}
        <div className="flex flex-wrap justify-center gap-3">
          {['सभी', 'हिंदी', 'संस्कृत'].map((sub) => (
            <button
              key={sub}
              onClick={() => setFilterSubject(sub)}
              className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-bold transition-all duration-300 ${filterSubject === sub
                ? 'bg-gradient-to-r from-red-900 to-amber-800 text-white shadow-lg scale-105'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-2 border-amber-200/60 dark:border-gray-700 hover:border-amber-400 hover:shadow-md'
                }`}
            >
              <Filter className="w-5 h-5" />
              <span>{sub}</span>
              {filterSubject === sub && <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />}
            </button>
          ))}
        </div>

        {/* Sample Papers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((paper) => (
            <div
              key={paper.id}
              className="group relative bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm p-6 rounded-3xl border-2 border-amber-200/60 dark:border-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              {/* Decorative top accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-800 via-amber-500 to-red-800" />

              <div className="relative z-10 flex-1 space-y-4">
                {/* Badges row */}
                <div className="flex items-center justify-between">
                  <span className="text-base **:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-800/10 dark:bg-red-900/30 text-red-800 dark:text-[#C79A2D] text-sm font-bold uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" />
                    {paper.subject}
                  </span>
                  <span className="text-base font-medium text-amber-600 dark:text-amber-400">
                    {paper.classLevel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-playfair text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
                  {paper.title}
                </h3>

                {/* Details */}
                <div className="space-y-1.5 text-base text-gray-800 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C79A2D]" />
                    <span>{paper.questionsCount} बहुविकल्पीय प्रश्न</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C79A2D]" />
                    <span>उत्तर कुंजी सहित</span>
                  </p>
                </div>

                {/* Edition tag */}
                <span className="inline-block text-base text-gray-800 dark:text-gray-400 font-medium">
                  {paper.year} संस्करण
                </span>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(paper.title)}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7B1E1E] to-red-800 hover:from-red-800 hover:to-[#7B1E1E] text-white font-bold text-base rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
              >
                <Download className="w-5 h-5 text-amber-300" />
                <span>PDF डाउनलोड करें</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              इस विषय के लिए कोई नमूना प्रश्नपत्र उपलब्ध नहीं है।
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-3 bg-amber-100/70 dark:bg-amber-900/30 backdrop-blur-sm px-8 py-4 rounded-2xl border border-amber-300 dark:border-amber-700 shadow-sm">
            <Sparkles className="w-6 h-6 text-[#C79A2D]" />
            <p className="text-medium text-gray-700 dark:text-gray-300 font-semibold">
              अधिक अभ्यास सामग्री हेतु <strong className="text-red-800 dark:text-[#C79A2D]">मॉक टेस्ट</strong> आज़माएँ।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplePapersPage;