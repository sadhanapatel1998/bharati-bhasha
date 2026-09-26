'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
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
import HindiSyllabusAccordion from './HindisyllabusAccordion';

/* ---------------- Shared data ---------------- */

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

/* ---------------- Helpers ---------------- */

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ---------------- Attractive h2 heading component ---------------- */
const SectionHeading: React.FC<{
  icon: React.ElementType;
  title: string;
  gradient: string;
  ring: string;
}> = ({ icon: Icon, title, gradient, ring }) => (
  <div className="relative flex items-center gap-4 flex-wrap">
    {/* Icon medallion */}
    <span
      className={`relative inline-flex w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
      bg-gradient-to-br ${gradient}
      items-center justify-center shadow-lg text-white
      ring-4 ${ring} shrink-0`}
    >
      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />

      {/* Small sparkle badge */}
      <span
        className="absolute -top-1 -right-1 w-4 h-4 rounded-full
        bg-white shadow-md flex items-center justify-center
        text-[10px] text-amber-500 skh-sparkle"
      >
        ✦
      </span>
    </span>

    {/* Single Color Title */}
    <h2 className="relative font-playfair text-3xl sm:text-4xl font-bold text-[#052B6B] leading-tight drop-shadow-sm">
      {title}

      {/* Underline */}
      <span
        className={`absolute -bottom-1 left-0 h-1 w-16 rounded-full bg-gradient-to-r ${gradient} opacity-70 skh-underline`}
      />
    </h2>

    {/* Right decorative divider */}
    <div className="hidden md:flex items-center gap-2 flex-1">
      <span className="h-px flex-1 bg-gradient-to-r from-amber-400/60 via-amber-300/40 to-transparent" />
      <span className="w-2 h-2 rotate-45 bg-amber-400" />
      <span className="w-1.5 h-1.5 rotate-45 bg-amber-400/60" />
    </div>
  </div>
);

export const HindiSubject: React.FC = () => {
  const [openSampleGrade, setOpenSampleGrade] = useState<string>(GRADES[0].id);
  const [activeTab, setActiveTab] = useState<string>(TABS[0]?.id);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    scrollToId(id);
  };

  return (
    <section className="mb-0 relative pb-16 overflow-hidden">

      {/* ============ Background patterns (elegant + minimal) ============ */}

      {/* 1) Old brand dot grid (kept) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]
          bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
          bg-[length:60px_60px,80px_80px]
          bg-[position:0_0,40px_40px]"
      />

      {/* 2) NEW elegant Art Deco fan pattern (slow drift) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05] hsbg-fan"
      />

      {/* 3) NEW diagonal soft gold stripes */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]
          bg-[repeating-linear-gradient(45deg,#C79A2D_0px,#C79A2D_1px,transparent_1px,transparent:26px)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-14 z-10">
        <Breadcrumb
          title="हिंदी"
          items={[
            { label: 'विषय', route: '#' },
            { label: 'हिंदी' },
          ]}
        />

        {/* ============ Tab navigation ============ */}
        <nav
          className="sticky top-2 z-20 rounded-2xl mt-3
    bg-white/90
    w-full sm:w-fit sm:mx-auto
     
    relative">
          {/* Scroll container */}
          <div
            className="flex gap-2 sm:gap-2.5
      overflow-x-auto no-scrollbar
      scroll-smooth
      -mx-2 px-2 py-0.5
      sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:justify-center"
          >
            {TABS.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={`group relative shrink-0
            px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl
            text-sm sm:text-lg lg:text-xl font-black tracking-wide
            whitespace-nowrap
            transition-all duration-500 ease-out
            overflow-hidden active:scale-95 snav-slide-in
            ${isActive
                      ? `text-white
                 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950
                 shadow-xl shadow-blue-700/50
                 sm:scale-[1.06] sm:-translate-y-0.5
                 ring-2 ring-blue-300/60
                 snav-glow`
                      : `text-blue-900
                 bg-gradient-to-br from-blue-50 via-white to-blue-50
                 hover:from-blue-100 hover:via-blue-50 hover:to-blue-100
                 shadow-md shadow-blue-200/50
                 hover:shadow-xl hover:shadow-blue-400/40
                 sm:hover:scale-[1.04] sm:hover:-translate-y-0.5
                 ring-1 ring-blue-200/70 hover:ring-blue-400/70`
                    }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                    <span className={`absolute top-0 -left-full h-full w-1/2
              bg-gradient-to-r from-transparent ${isActive ? 'via-white/50' : 'via-blue-200/60'} to-transparent
              skew-x-[-25deg]
              group-hover:animate-[snav-shine_1s_ease-out]`} />
                  </span>

                  {isActive && (
                    <span className="pointer-events-none absolute top-1 right-1.5
              w-1.5 h-1.5 rounded-full bg-amber-300
              shadow-[0_0_8px_rgba(251,191,36,0.9)] snav-sparkle" />
                  )}
                  {!isActive && (
                    <span className="pointer-events-none absolute top-0.5 right-1.5
              text-[10px] text-blue-400/60 snav-sparkle">✦</span>
                  )}

                  <span className="relative z-10">{tab.label}</span>

                  {isActive ? (
                    <span className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2
              h-0.5 w-8 sm:w-12 bg-amber-300 rounded-full
              shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                  ) : (
                    <span className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2
              h-0.5 w-0 group-hover:w-10 bg-blue-500 rounded-full
              transition-all duration-500" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* ============ Skills Assessed ============ */}
        <div id="skills" className="scroll-mt-24 space-y-6">

          {/* ===== Attractive Heading ===== */}
          <SectionHeading
            icon={Sparkles}
            title="हिंदी ओलंपियाड में परखे जाने वाले कौशल"
            gradient="from-amber-500 via-rose-500 to-purple-600"
            ring="ring-amber-200/60"
          />

          {/* ===== Skills Grid ===== */}
          <div className="relative">
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-rose-300/25 blur-3xl sk-orb-a" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-300/25 blur-3xl sk-orb-b" />
            </div>

            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-[10%] right-[8%] w-32 h-32 rounded-full border-2 border-dashed border-amber-300/40 sk-spin-slow" />
              <div className="absolute bottom-[8%] left-[6%] w-28 h-28 rounded-full border-2 border-dashed border-purple-300/40 sk-spin-rev" />
            </div>

            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-[15%] left-[18%] w-2 h-2 rounded-full bg-amber-400 sk-twinkle" />
              <div className="absolute top-[70%] right-[22%] w-1.5 h-1.5 rounded-full bg-rose-400 sk-twinkle [animation-delay:1s]" />
              <div className="absolute top-[40%] left-[50%] w-1.5 h-1.5 rounded-full bg-emerald-400 sk-twinkle [animation-delay:2s]" />
            </div>

            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
              {SKILLS.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.label}
                    className={`group relative rounded-3xl p-6 sm:p-7 overflow-hidden
                      bg-gradient-to-br ${skill.color} sk-gradient-flow
                      text-white shadow-xl
                      hover:-translate-y-2 hover:scale-[1.04] hover:shadow-2xl
                      transition-all duration-500 ease-out
                      flex flex-col items-center gap-3 text-center
                      ring-2 ring-white/30 hover:ring-white/60
                      sk-pop-in`}
                    style={{ animationDelay: `${idx * 120}ms` }}
                  >
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                      <div className="absolute top-0 -left-full h-full w-1/2
                        bg-gradient-to-r from-transparent via-white/40 to-transparent
                        skew-x-[-25deg] group-hover:animate-[sk-shine_1.2s_ease-out]" />
                    </div>

                    <div aria-hidden
                      className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/25 blur-2xl
                        opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />

                    <div className="relative">
                      <span aria-hidden
                        className="absolute inset-0 rounded-2xl bg-white/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl
                        bg-white/25 backdrop-blur-sm border-2 border-white/50
                        flex items-center justify-center
                        shadow-lg group-hover:scale-110 group-hover:rotate-6
                        transition-transform duration-500">
                        <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-white drop-shadow-md sk-icon-bounce" />
                      </div>
                    </div>

                    <span className="relative text-lg sm:text-xl font-black tracking-wide drop-shadow-md">
                      {skill.label}
                    </span>

                    <span className="relative h-1 w-10 rounded-full bg-white/70
                      group-hover:w-20 transition-all duration-500" />

                    <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/25 backdrop-blur-sm
                      flex items-center justify-center text-[11px] font-black tracking-wider
                      border border-white/40">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============ Curriculum ============ */}
        <div id="curriculum" className="scroll-mt-24 space-y-5">
          <SectionHeading
            icon={GraduationCap}
            title="पाठ्यक्रम"
            gradient="from-blue-600 via-indigo-600 to-purple-600"
            ring="ring-blue-200"
          />

          <div id="curriculum-detail" className="scroll-mt-24">
            <HindiSyllabusAccordion />
          </div>
        </div>

        {/* ============ Sample Paper ============ */}
        {/* ============ Sample Paper ============ */}
        <div id="sample-paper" className="scroll-mt-24 space-y-5">
          <SectionHeading
            icon={ScrollText}
            title="प्रतिदर्श प्रश्नपत्र"
            gradient="from-emerald-600 via-teal-600 to-cyan-600"
            ring="ring-emerald-200/60"
          />

          <div className="space-y-4">
            {/* Show ALL grades — but only 1 & 2 have real downloads */}
            {GRADES.map((g) => {
              const isOpen = g.id === openSampleGrade;
              const isAvailable = g.samplePaperAvailable;

              return (
                <div
                  key={g.id}
                  id={`sample-${g.id}`}
                  className="relative rounded-3xl overflow-hidden scroll-mt-24
            bg-white border border-slate-200/80
            shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)]
            hover:shadow-[0_12px_36px_-10px_rgba(15,23,42,0.15)]
            transition-all duration-500"
                >
                  {/* Header */}
                  <button
                    type="button"
                    onClick={() => setOpenSampleGrade(isOpen ? '' : g.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4
              p-5 sm:p-6 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon badge */}
                      <span
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl
                  text-white shadow-lg transition-transform duration-500
                  ${isAvailable
                            ? `bg-gradient-to-br ${g.color} shadow-rose-500/20`
                            : `bg-slate-300 shadow-slate-200`
                          }
                  ${isOpen ? 'rotate-6 scale-110' : 'group-hover:rotate-6 group-hover:scale-110'}`}
                      >
                        <GraduationCap className="w-7 h-7" />
                      </span>

                      <div>
                        <h3
                          className={`font-playfair text-2xl font-black tracking-tight
                    ${isAvailable
                              ? `bg-gradient-to-r ${g.color} bg-clip-text text-transparent`
                              : 'text-slate-400'
                            }`}
                        >
                          {`कक्षा ${g.id}`}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                          <span>{'भारती भाषा ओलंपियाड · हिंदी'}</span>
                          {!isAvailable && (
                            <span className="text-[11px] font-bold bg-slate-100 text-slate-500 rounded-full px-2 py-0.5">
                              जल्द उपलब्ध
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-6 w-6 shrink-0 transition-all duration-500
                ${isOpen ? 'rotate-180 text-slate-700' : 'text-slate-400 group-hover:text-slate-700'}`}
                    />
                  </button>

                  {/* Content — only when open */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0">
                      <div className="border-t border-slate-100 pt-5">
                        {isAvailable ? (
                          /* ===== Real download for classes 1 & 2 ===== */
                          <a
                            href={g.samplePaperHref}
                            download
                            className={`group/btn relative flex sm:inline-flex items-center justify-between gap-2 sm:gap-3
                      w-full sm:w-auto rounded-full
                      bg-gradient-to-r ${g.color}
                      pl-5 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2
                      text-white font-bold text-sm sm:text-base
                      shadow-lg shadow-rose-500/30
                      hover:shadow-xl hover:shadow-rose-500/40
                      sm:hover:scale-[1.03] active:scale-95
                      transition-all duration-500 ease-out overflow-hidden`}
                          >
                            {/* Shine sweep */}
                            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                              <span className="absolute top-0 -left-full h-full w-1/2
                        bg-gradient-to-r from-transparent via-white/40 to-transparent
                        skew-x-[-25deg]
                        group-hover/btn:animate-[hsyl-sweep_1s_ease-out]" />
                            </span>

                            {/* Label */}
                            <span className="relative z-10 text-left leading-tight">
                              <span className="hidden sm:inline">
                                {`कक्षा ${g.id} का प्रतिदर्श प्रश्नपत्र डाउनलोड करें`}
                              </span>
                              <span className="inline sm:hidden">
                                {`कक्षा ${g.id} प्रश्नपत्र डाउनलोड करें`}
                              </span>
                            </span>

                            {/* Circular icon badge */}
                            <span className="relative z-10 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0
                      items-center justify-center rounded-full bg-white/20 backdrop-blur-sm
                      ring-1 ring-white/40
                      group-hover/btn:bg-white/30 group-hover/btn:rotate-12
                      transition-all duration-500">
                              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                          </a>
                        ) : (
                          /* ===== Coming soon — disabled # link ===== */
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="group/btn relative flex sm:inline-flex items-center justify-between gap-2 sm:gap-3
                      w-full sm:w-auto rounded-full
                      bg-slate-200 text-slate-500 cursor-not-allowed
                      pl-5 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2
                      font-bold text-sm sm:text-base
                      border border-slate-300
                      transition-all duration-300"
                          >
                            <span className="relative z-10 text-left leading-tight">
                              {`कक्षा ${g.id} का प्रतिदर्श प्रश्नपत्र जल्द उपलब्ध होगा`}
                            </span>

                            <span className="relative z-10 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0
                      items-center justify-center rounded-full bg-white/60
                      ring-1 ring-slate-300">
                              <Download className="w-4 h-4 sm:w-5 sm:h-5 opacity-50" />
                            </span>
                          </a>
                        )}
                      </div>
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