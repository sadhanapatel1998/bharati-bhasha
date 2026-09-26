'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SectionHeader from '../components/shared/SectionHeader';
import { FAQS as FAQS_STATIC } from '../data/olympiadData';
import {
  ChevronDown,
  Search,
  HelpCircle,
  Trophy,
  Medal,
  Award,
  BookOpen,
  GraduationCap,
  Star,
  Sparkles,
  Target,
  Lightbulb,
} from 'lucide-react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

import { useSiteContent } from '@/hooks/useSiteContent';

// 8 colorful themes for FAQ items (rotating)
const FAQ_THEMES = [
  {
    openBorder: "border-blue-400",
    openBg: "bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100",
    closedHover: "hover:border-blue-300 hover:bg-blue-50/60",
    badgeBg: "bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600",
    badgeText: "text-white",
    questionOpen: "text-blue-900",
    questionHover: "group-hover:text-blue-800",
    chevron: "text-blue-500",
    accent: "bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-600",
    divider: "border-blue-200/60",
    glow: "shadow-blue-300/50",
    spark: "text-blue-500",
  },
  {
    openBorder: "border-orange-400",
    openBg: "bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100",
    closedHover: "hover:border-orange-300 hover:bg-orange-50/60",
    badgeBg: "bg-gradient-to-br from-orange-500 via-amber-500 to-red-500",
    badgeText: "text-white",
    questionOpen: "text-orange-900",
    questionHover: "group-hover:text-orange-800",
    chevron: "text-orange-500",
    accent: "bg-gradient-to-b from-orange-500 via-amber-500 to-orange-600",
    divider: "border-orange-200/60",
    glow: "shadow-orange-300/50",
    spark: "text-orange-500",
  },
  {
    openBorder: "border-purple-400",
    openBg: "bg-gradient-to-br from-purple-50 via-fuchsia-50 to-purple-100",
    closedHover: "hover:border-purple-300 hover:bg-purple-50/60",
    badgeBg: "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-violet-600",
    badgeText: "text-white",
    questionOpen: "text-purple-900",
    questionHover: "group-hover:text-purple-800",
    chevron: "text-purple-500",
    accent: "bg-gradient-to-b from-purple-500 via-fuchsia-500 to-purple-600",
    divider: "border-purple-200/60",
    glow: "shadow-purple-300/50",
    spark: "text-purple-500",
  },
  {
    openBorder: "border-emerald-400",
    openBg: "bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100",
    closedHover: "hover:border-emerald-300 hover:bg-emerald-50/60",
    badgeBg: "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600",
    badgeText: "text-white",
    questionOpen: "text-emerald-900",
    questionHover: "group-hover:text-emerald-800",
    chevron: "text-emerald-500",
    accent: "bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-600",
    divider: "border-emerald-200/60",
    glow: "shadow-emerald-300/50",
    spark: "text-emerald-500",
  },
  {
    openBorder: "border-rose-400",
    openBg: "bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100",
    closedHover: "hover:border-rose-300 hover:bg-rose-50/60",
    badgeBg: "bg-gradient-to-br from-rose-500 via-pink-500 to-red-600",
    badgeText: "text-white",
    questionOpen: "text-rose-900",
    questionHover: "group-hover:text-rose-800",
    chevron: "text-rose-500",
    accent: "bg-gradient-to-b from-rose-500 via-pink-500 to-rose-600",
    divider: "border-rose-200/60",
    glow: "shadow-rose-300/50",
    spark: "text-rose-500",
  },
  {
    openBorder: "border-cyan-400",
    openBg: "bg-gradient-to-br from-cyan-50 via-sky-50 to-cyan-100",
    closedHover: "hover:border-cyan-300 hover:bg-cyan-50/60",
    badgeBg: "bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600",
    badgeText: "text-white",
    questionOpen: "text-cyan-900",
    questionHover: "group-hover:text-cyan-800",
    chevron: "text-cyan-500",
    accent: "bg-gradient-to-b from-cyan-500 via-sky-500 to-cyan-600",
    divider: "border-cyan-200/60",
    glow: "shadow-cyan-300/50",
    spark: "text-cyan-500",
  },
  {
    openBorder: "border-indigo-400",
    openBg: "bg-gradient-to-br from-indigo-50 via-violet-50 to-indigo-100",
    closedHover: "hover:border-indigo-300 hover:bg-indigo-50/60",
    badgeBg: "bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600",
    badgeText: "text-white",
    questionOpen: "text-indigo-900",
    questionHover: "group-hover:text-indigo-800",
    chevron: "text-indigo-500",
    accent: "bg-gradient-to-b from-indigo-500 via-violet-500 to-indigo-600",
    divider: "border-indigo-200/60",
    glow: "shadow-indigo-300/50",
    spark: "text-indigo-500",
  },
  {
    openBorder: "border-amber-400",
    openBg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100",
    closedHover: "hover:border-amber-300 hover:bg-amber-50/60",
    badgeBg: "bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-600",
    badgeText: "text-white",
    questionOpen: "text-amber-900",
    questionHover: "group-hover:text-amber-800",
    chevron: "text-amber-500",
    accent: "bg-gradient-to-b from-amber-500 via-yellow-500 to-amber-600",
    divider: "border-amber-200/60",
    glow: "shadow-amber-300/50",
    spark: "text-amber-500",
  },
];

export const FaqPage: React.FC = () => {
  const FAQS = useSiteContent<typeof FAQS_STATIC>('faqs', FAQS_STATIC);
  const { language } = useApp();
  const [activeId, setActiveId] = useState<string | null>('faq1');
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ============ Custom Keyframes ============ */}
      <style>{`
        @keyframes faqp-orb-a {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(70px, -50px) scale(1.18); }
        }
        @keyframes faqp-orb-b {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-60px, 45px) scale(1.12); }
        }
        @keyframes faqp-spin-slow { to { transform: rotate(360deg); } }
        @keyframes faqp-spin-rev  { to { transform: rotate(-360deg); } }
        @keyframes faqp-float {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50%      { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes faqp-float-slow {
          0%, 100% { transform: translateY(0) rotate(8deg); }
          50%      { transform: translateY(-20px) rotate(-2deg); }
        }
        @keyframes faqp-drift {
          0%, 100% { transform: translateX(0) translateY(0); }
          33%      { transform: translateX(25px) translateY(-15px); }
          66%      { transform: translateX(-18px) translateY(12px); }
        }
        @keyframes faqp-sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.85) rotate(0deg); }
          50%      { opacity: 1;   transform: scale(1.2)  rotate(180deg); }
        }
        @keyframes faqp-twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50%      { opacity: 1;   transform: scale(1.25); }
        }
        @keyframes faqp-badge-bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        @keyframes faqp-sweep {
          0%   { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(400%) skewX(-25deg); opacity: 0; }
        }
        @keyframes faqp-border-flow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes faqp-stars-pan {
          0%   { background-position: 0 0; }
          100% { background-position: 160px 160px; }
        }
        @keyframes faqp-chevron-move {
          0%   { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        @keyframes faqp-diamond-shift {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }

        .faqp-orb-a        { animation: faqp-orb-a 16s ease-in-out infinite; }
        .faqp-orb-b        { animation: faqp-orb-b 20s ease-in-out infinite; }
        .faqp-spin-slow    { animation: faqp-spin-slow 24s linear infinite; }
        .faqp-spin-rev     { animation: faqp-spin-rev 32s linear infinite; }
        .faqp-float        { animation: faqp-float 6s ease-in-out infinite; }
        .faqp-float-slow   { animation: faqp-float-slow 8s ease-in-out infinite; }
        .faqp-drift        { animation: faqp-drift 9s ease-in-out infinite; }
        .faqp-sparkle      { animation: faqp-sparkle 3s ease-in-out infinite; }
        .faqp-twinkle      { animation: faqp-twinkle 2.5s ease-in-out infinite; }
        .faqp-badge-bounce { animation: faqp-badge-bounce 2.5s ease-in-out infinite; }
        .faqp-sweep        { animation: faqp-sweep 6s linear infinite; }
        .faqp-border-flow  { background-size: 200% 100%; animation: faqp-border-flow 8s linear infinite; }

        /* Background patterns */
        .faqp-pattern-stars {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><path d='M40 20 Q42 38 60 40 Q42 42 40 60 Q38 42 20 40 Q38 38 40 20 Z' fill='%23C79A2D'/><path d='M120 80 Q122 92 134 94 Q122 96 120 108 Q118 96 106 94 Q118 92 120 80 Z' fill='%23C79A2D'/><path d='M80 120 Q82 132 94 134 Q82 136 80 148 Q78 136 66 134 Q78 132 80 120 Z' fill='%23C79A2D'/></svg>");
          background-size: 160px 160px;
          animation: faqp-stars-pan 40s linear infinite;
        }
        .faqp-pattern-chevron {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20' viewBox='0 0 40 20'><path d='M0 20 L20 4 L40 20' fill='none' stroke='%23C79A2D' stroke-width='1'/></svg>");
          background-size: 40px 20px;
          animation: faqp-chevron-move 12s linear infinite;
        }
        .faqp-pattern-diamond {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><path d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23C79A2D' stroke-width='0.8'/></svg>");
          background-size: 60px 60px;
          animation: faqp-diamond-shift 30s linear infinite;
        }
      `}</style>

      <section className="mb-0 relative pb-16 overflow-hidden
        bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50">

        {/* ============ RAINBOW TOP BORDER ============ */}
        <div className="absolute top-0 left-0 right-0 h-1
          bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-blue-500 via-purple-500 to-rose-500 faqp-border-flow" />

        {/* ============ ANIMATED BACKGROUND PATTERNS ============ */}

        {/* 1) Original brand dot grid (kept) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]
            bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
            bg-[length:60px_60px,80px_80px]
            bg-[position:0_0,40px_40px]"
        />

        {/* 2) Gold sparkle stars (pans diagonally) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] faqp-pattern-stars"
        />

        {/* 3) Chevron zigzag (moves upward) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] faqp-pattern-chevron"
        />

        {/* 4) Diamond lattice */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03] faqp-pattern-diamond"
        />

        {/* ============ ANIMATED GRADIENT ORBS ============ */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[8%] left-[6%] w-72 h-72 rounded-full bg-blue-400/25 blur-3xl faqp-orb-a" />
          <div className="absolute top-[40%] right-[5%] w-80 h-80 rounded-full bg-purple-400/25 blur-3xl faqp-orb-b" />
          <div className="absolute bottom-[8%] left-[30%] w-72 h-72 rounded-full bg-amber-400/25 blur-3xl faqp-orb-a [animation-delay:-5s]" />
          <div className="absolute top-[55%] left-[3%] w-64 h-64 rounded-full bg-rose-400/20 blur-3xl faqp-orb-b [animation-delay:-8s]" />
          <div className="absolute bottom-[15%] right-[15%] w-56 h-56 rounded-full bg-emerald-400/20 blur-3xl faqp-orb-a [animation-delay:-3s]" />
        </div>

        {/* ============ ROTATING DASHED RINGS ============ */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[15%] right-[8%] w-44 h-44 rounded-full border-2 border-dashed border-blue-400/35 faqp-spin-slow" />
          <div className="absolute bottom-[15%] left-[5%] w-52 h-52 rounded-full border border-dashed border-purple-400/30 faqp-spin-rev" />
          <div className="absolute top-[55%] left-[10%] w-28 h-28 rounded-full border-2 border-dotted border-amber-400/35 faqp-spin-slow [animation-duration:30s]" />
        </div>

        {/* ============ FLOATING OLYMPIAD ICONS ============ */}
        <div aria-hidden className="pointer-events-none absolute top-[8%] left-[4%] text-amber-400/35 faqp-float">
          <Trophy className="w-14 h-14" />
        </div>
        <div aria-hidden className="pointer-events-none absolute top-[12%] right-[6%] text-orange-400/35 faqp-float-slow">
          <Medal className="w-16 h-16" />
        </div>
        <div aria-hidden className="pointer-events-none absolute top-[40%] left-[3%] text-purple-400/30 faqp-drift">
          <Award className="w-12 h-12" />
        </div>
        <div aria-hidden className="pointer-events-none absolute top-[48%] right-[4%] text-blue-400/30 faqp-drift [animation-delay:2s]">
          <BookOpen className="w-14 h-14" />
        </div>
        <div aria-hidden className="pointer-events-none absolute bottom-[12%] left-[6%] text-emerald-400/30 faqp-float [animation-delay:1s]">
          <GraduationCap className="w-16 h-16" />
        </div>
        <div aria-hidden className="pointer-events-none absolute bottom-[15%] right-[8%] text-rose-400/30 faqp-float-slow [animation-delay:2s]">
          <Target className="w-12 h-12" />
        </div>
        <div aria-hidden className="pointer-events-none absolute top-[65%] left-[14%] text-yellow-400/30 faqp-drift [animation-delay:3s]">
          <Lightbulb className="w-10 h-10" />
        </div>

        {/* ============ TWINKLING STARS ============ */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Star className="absolute top-[22%] left-[22%] w-4 h-4 text-yellow-400/50 fill-current faqp-twinkle" />
          <Star className="absolute top-[75%] right-[20%] w-5 h-5 text-amber-400/50 fill-current faqp-twinkle [animation-delay:0.8s]" />
          <Star className="absolute top-[55%] right-[35%] w-3 h-3 text-blue-400/50 fill-current faqp-twinkle [animation-delay:1.6s]" />
          <Star className="absolute bottom-[30%] left-[40%] w-4 h-4 text-purple-400/50 fill-current faqp-twinkle [animation-delay:2.4s]" />
          <Sparkles className="absolute top-[35%] left-[45%] w-5 h-5 text-fuchsia-400/40 faqp-sparkle" />
          <Sparkles className="absolute bottom-[40%] right-[30%] w-6 h-6 text-cyan-400/40 faqp-sparkle [animation-delay:1.2s]" />
        </div>

        {/* ============ CONTENT ============ */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-14 z-10">
          <Breadcrumb
            title="प्रश्नोत्तर"
            items={[
              {
                label: "विद्यार्थी मंच",
                route: "/sample-papers",
              },
              {
                label: "प्रश्नोत्तर",
              },
            ]}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Section Header */}
          <SectionHeader
            icon={HelpCircle}
            badge="जिज्ञासा व समाधान"
            title="सामान्य प्रश्नोत्तर (FAQs)"
            description="ओलंपियाड से संबंधित सभी सामान्य प्रश्नों के उत्तर यहाँ प्राप्त करें"
          />

          {/* FAQ Accordion – colorful */}
          <div className="space-y-4">
            {filtered.map((faq, index) => {
              const isOpen = activeId === faq.id;
              const theme = FAQ_THEMES[index % FAQ_THEMES.length];

              return (
                <div
                  key={faq.id}
                  className={`group/item relative rounded-2xl border-2 shadow-sm transition-all duration-500 overflow-hidden
                    ${isOpen
                      ? `${theme.openBorder} ${theme.openBg} shadow-xl ${theme.glow}`
                      : `border-slate-200 bg-white hover:shadow-lg ${theme.closedHover}`
                    }`}
                >
                  {/* Animated left accent bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${theme.accent}
                      transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
                  />

                  {/* Shine sweep on hover */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className={`absolute top-0 -left-full h-full w-1/2
                      bg-gradient-to-r from-transparent ${isOpen ? 'via-white/30' : 'via-white/60'} to-transparent
                      skew-x-[-25deg] group-hover/item:animate-[faqp-sweep_1.2s_ease-out]`} />
                  </div>

                  {/* Top-right sparkle (only when open) */}
                  {isOpen && (
                    <Sparkles className={`absolute top-3 right-3 w-4 h-4 ${theme.spark} faqp-sparkle`} />
                  )}

                  {/* Tiny twinkle when closed */}
                  {!isOpen && (
                    <Star className={`absolute top-4 right-4 w-3 h-3 ${theme.spark} opacity-40 fill-current faqp-twinkle`} />
                  )}

                  {/* Question Button */}
                  <button
                    onClick={() => setActiveId(isOpen ? null : faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group relative z-10"
                  >
                    <span
                      className={`text-lg font-bold font-heading-hi transition-colors duration-300 flex items-center gap-3
                        ${isOpen ? theme.questionOpen : `text-slate-800 ${theme.questionHover}`}`}
                    >
                      {/* Colored number badge */}
                      <span
                        className={`inline-flex w-11 h-11 rounded-full items-center justify-center text-base font-black shrink-0
                          transition-all duration-500 shadow-md
                          ${isOpen
                            ? `${theme.badgeBg} ${theme.badgeText} ${theme.glow} shadow-lg faqp-badge-bounce`
                            : `${theme.badgeBg} ${theme.badgeText} opacity-90 group-hover:opacity-100 group-hover:scale-110`
                          }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{faq.question}</span>
                    </span>

                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-all duration-500
                        ${isOpen ? `rotate-180 scale-110 ${theme.chevron}` : `${theme.chevron} opacity-60`}
                        group-hover:scale-125 group-hover:opacity-100`}
                    />
                  </button>

                  {/* Answer (collapsible) */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out
                      ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className={`px-6 pb-5 pt-3 border-t-2 ${theme.divider} ml-[60px]`}>
                      <p className="text-lg text-slate-800 font-devanagari leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state when no results */}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {language === 'hi'
                  ? 'कोई प्रश्न नहीं मिला। कृपया दूसरे कीवर्ड से खोजें।'
                  : 'No questions found. Please try a different keyword.'}
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2
              bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full
              border-2 border-amber-200/60 shadow-lg
              hover:scale-[1.02] hover:shadow-xl transition-all duration-500">
              <HelpCircle className="w-5 h-5 text-[#C79A2D] faqp-sparkle" />
              <p className="text-base sm:text-lg text-gray-700 font-semibold">
                {language === 'hi'
                  ? 'क्या आपका प्रश्न सूची में नहीं है?'
                  : 'Still have a question?'}
                <button
                  className="cursor-pointer ml-2 text-red-800 font-bold hover:text-amber-700 transition-colors underline-offset-2 hover:underline hover:scale-105"
                  onClick={() => (window.location.href = '/contact')}
                >
                  {language === 'hi' ? 'हमसे संपर्क करें' : 'Contact us'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqPage;