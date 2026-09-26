'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
// NOTE: adjust this import to wherever HindiSyllabusAccordion actually lives in your project.
import {
  BookOpenCheck,
  MessagesSquare,
  SpellCheck2,
  Brain,
  ChevronDown,
  Download,
  Sparkles,
  ScrollText,
  GraduationCap,
} from 'lucide-react';

/* ---------------- Shared data: every list below is keyed by the same
   grade `id`, so Skills / Curriculum / Sample Paper all stay linked. ---------------- */

const TABS = [
  { id: 'skills', label: 'कौशल आकलन' },
  { id: 'curriculum', label: 'पाठ्यक्रम' },
  { id: 'sample-paper', label: 'प्रतिदर्श प्रश्नपत्र' },
];

const SKILLS = [
  { icon: BookOpenCheck, label: 'व्याकरण', color: 'from-rose-500 to-pink-500' },
  { icon: MessagesSquare, label: 'वाचन-बोध', color: 'from-blue-500 to-cyan-500' },
  { icon: SpellCheck2, label: 'शब्दावली', color: 'from-emerald-500 to-teal-500' },
  { icon: Brain, label: 'सामान्य ज्ञान', color: 'from-purple-500 to-fuchsia-500' },
];

const GRADE_COLORS = [
  'from-blue-500 to-cyan-500',
  'from-orange-500 to-amber-500',
  'from-purple-500 to-fuchsia-500',
  'from-emerald-500 to-teal-500',
  'from-rose-500 to-pink-500',
  'from-indigo-500 to-violet-500',
  'from-amber-500 to-yellow-500',
  'from-teal-500 to-cyan-500',
  'from-fuchsia-500 to-pink-500',
  'from-red-500 to-rose-600',
];

// One entry per grade — id links Curriculum quick-nav rows to the
// Sample Paper accordion rows below. Only Class 1 & 2 have a PDF ready right now.
const AVAILABLE_SAMPLE_GRADES = ['1', '2'];

const GRADES = Array.from({ length: 10 }, (_, i) => {
  const id = String(i + 1);
  return {
    id,
    label: `कक्षा ${id}`,
    color: GRADE_COLORS[i % GRADE_COLORS.length],
    samplePaperHref: `/downloads/hindi-sample-paper-class-${id}.pdf`,
    samplePaperAvailable: AVAILABLE_SAMPLE_GRADES.includes(id),
  };
});

/* ---------------- Small helpers ---------------- */

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const HindiSubject: React.FC = () => {
  const [openSampleGrade, setOpenSampleGrade] = useState<string>(GRADES[0].id);

  return (
    <section className="mb-0 relative pb-16 overflow-hidden">
      {/* Decorative background pattern */}
      <div
        className="
    absolute inset-0 pointer-events-none opacity-[0.04]
    bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
    bg-[length:60px_60px,80px_80px]
    bg-[position:0_0,40px_40px]
  "
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-14 z-10">
        <Breadcrumb
          title="हिंदी"
          items={[
            { label: 'विषय', route: '#' },
            { label: 'हिंदी' },
          ]}
        />

        {/* ============ Tab navigation (Skills / Curriculum / Sample Paper) ============ */}
        <nav
          className="sticky top-2 z-20 flex flex-wrap gap-2 rounded-2xl
            bg-white/80 backdrop-blur border border-slate-200 shadow-md p-2 w-fit"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToId(tab.id)}
              className="px-4 py-2 rounded-xl text-sm font-bold text-white
                bg-gradient-to-r from-rose-600 to-amber-500
                hover:from-rose-700 hover:to-amber-600
                shadow transition-all duration-300 hover:scale-105"
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ============ Skills Assessed ============ */}
        <div id="skills" className="scroll-mt-24 space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C79A2D]" />
            <h2 className="font-playfair text-2xl font-bold text-gray-900">
              हिंदी ओलंपियाड में परखे जाने वाले कौशल
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SKILLS.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.label}
                  className={`rounded-2xl p-4 text-white shadow-md flex flex-col items-center
                    gap-2 text-center bg-gradient-to-br ${skill.color}
                    hover:scale-105 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-bold">{skill.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============ Curriculum (quick index + full dynamic syllabus) ============ */}
        <div id="curriculum" className="scroll-mt-24 space-y-5">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#C79A2D]" />
            <h2 className="font-playfair text-2xl font-bold text-gray-900">पाठ्यक्रम</h2>
          </div>

          {/* Quick index: one row per grade, linked by the same `id` used below */}
          <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden bg-white shadow-sm">
            {GRADES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => scrollToId(`curriculum-${g.id}`)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${g.color}`} />
                  <span className="font-semibold text-slate-800">{g.label}</span>
                </div>
                <ChevronDown className="w-5 h-5 text-slate-400 -rotate-90" />
              </button>
            ))}
          </div>

          {/* Full syllabus accordion — no breadcrumb/hero, just the class-by-class content */}
          <div id="curriculum-detail" className="scroll-mt-24">
            <HindiSyllabusAccordion />
          </div>
        </div>

        {/* ============ Sample Paper ============ */}
        <div id="sample-paper" className="scroll-mt-24 space-y-5">
          <div className="flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-[#C79A2D]" />
            <h2 className="font-playfair text-2xl font-bold text-gray-900">प्रतिदर्श प्रश्नपत्र</h2>
          </div>

          <div className="space-y-5">
            {GRADES.map((g) => {
              const isOpen = g.id === openSampleGrade;
              return (
                <div
                  key={g.id}
                  id={`sample-${g.id}`}
                  className={`relative rounded-3xl overflow-hidden scroll-mt-24
                    bg-white border-2 transition-all duration-500
                    ${isOpen
                      ? 'border-transparent shadow-2xl'
                      : 'border-slate-200/70 hover:border-slate-300 shadow-md hover:shadow-xl'
                    }`}
                >
                  {/* Gradient rainbow border (only when open and a paper actually exists) */}
                  {isOpen && g.samplePaperAvailable && (
                    <div
                      aria-hidden
                      className={`absolute inset-0 rounded-3xl p-[2px] -z-10
                        bg-gradient-to-r ${g.color} hsyl-border-flow`}
                    />
                  )}

                  {/* Accordion header */}
                  <button
                    type="button"
                    onClick={() => setOpenSampleGrade(isOpen ? '' : g.id)}
                    aria-expanded={isOpen}
                    className={`w-full flex items-center justify-between gap-4 p-3 sm:p-5 text-left
                      transition-all duration-500 group relative overflow-hidden
                      ${isOpen
                        ? g.samplePaperAvailable
                          ? `bg-gradient-to-r ${g.color} bg-opacity-10`
                          : 'bg-slate-50'
                        : 'bg-white hover:bg-slate-50'
                      }`}
                  >
                    {/* Shine sweep on hover */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 -left-full h-full w-1/2
                        bg-gradient-to-r from-transparent via-white/60 to-transparent
                        skew-x-[-25deg] group-hover:animate-[hsyl-sweep_1.2s_ease-out]" />
                    </div>

                    <div className="flex items-center gap-4 relative z-[2]">
                      {/* Grade number badge */}
                      <span
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl
                          text-xl font-extrabold border-2 transition-all duration-500
                          text-white border-white/50 shadow-md
                          ${g.samplePaperAvailable ? `bg-gradient-to-br ${g.color}` : 'bg-slate-300'}
                          ${isOpen ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}`}
                      >
                        {g.id}
                      </span>

                      <div>
                        <h3 className="font-playfair text-2xl font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                          {g.label + ' — प्रतिदर्श प्रश्नपत्र'}
                          {!g.samplePaperAvailable && (
                            <span className="text-xs font-bold bg-slate-200 text-slate-600 rounded-full px-2.5 py-1">
                              जल्द उपलब्ध होगा
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5 font-medium">
                          {'भारती भाषा ओलंपियाड · हिंदी नमूना पत्र'}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`relative z-[2] h-6 w-6 shrink-0 transition-all duration-500
                        ${isOpen ? 'rotate-180 scale-110 text-slate-700' : 'text-slate-500 group-hover:text-slate-700'}`}
                    />
                  </button>

                  {/* Accordion content */}
                  {isOpen && (
                    <div className="px-6 sm:px-10 pb-6 sm:pb-8 pt-2 relative">
                      {g.samplePaperAvailable ? (
                        <a
                          href={g.samplePaperHref}
                          download
                          className={`inline-flex items-center gap-2 rounded-full text-white
                            px-4 py-2 text-sm font-bold shadow bg-gradient-to-r ${g.color}
                            hover:scale-105 transition-transform duration-300`}
                        >
                          <Download className="w-4 h-4" />
                          {`${g.label} — हिंदी प्रतिदर्श प्रश्नपत्र डाउनलोड करें`}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-slate-500">
                          {`${g.label} का प्रतिदर्श प्रश्नपत्र जल्द ही उपलब्ध कराया जाएगा।`}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HindiSubject;