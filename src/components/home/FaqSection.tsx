"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { FAQS as FAQS_STATIC } from "@/data/olympiadData";
import {
  ChevronDown,
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
} from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

import { useSiteContent } from '@/hooks/useSiteContent';

// 6 colorful themes for FAQ items (rotating)
const FAQ_THEMES = [
  {
    // Blue
    openBorder: "border-blue-400",
    openBg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    closedHover: "hover:border-blue-300 hover:bg-blue-50/60",
    badgeBg: "bg-gradient-to-br from-blue-500 to-blue-700",
    badgeText: "text-white",
    questionOpen: "text-blue-900",
    questionHover: "group-hover:text-blue-800",
    chevron: "text-blue-500",
    accent: "bg-gradient-to-b from-blue-500 to-cyan-500",
    divider: "border-blue-200/60",
    glow: "shadow-blue-300/40",
  },
  {
    // Orange
    openBorder: "border-orange-400",
    openBg: "bg-gradient-to-br from-orange-50 to-amber-50",
    closedHover: "hover:border-orange-300 hover:bg-orange-50/60",
    badgeBg: "bg-gradient-to-br from-orange-500 to-amber-600",
    badgeText: "text-white",
    questionOpen: "text-orange-900",
    questionHover: "group-hover:text-orange-800",
    chevron: "text-orange-500",
    accent: "bg-gradient-to-b from-orange-500 to-amber-500",
    divider: "border-orange-200/60",
    glow: "shadow-orange-300/40",
  },
  {
    // Purple
    openBorder: "border-purple-400",
    openBg: "bg-gradient-to-br from-purple-50 to-fuchsia-50",
    closedHover: "hover:border-purple-300 hover:bg-purple-50/60",
    badgeBg: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
    badgeText: "text-white",
    questionOpen: "text-purple-900",
    questionHover: "group-hover:text-purple-800",
    chevron: "text-purple-500",
    accent: "bg-gradient-to-b from-purple-500 to-fuchsia-500",
    divider: "border-purple-200/60",
    glow: "shadow-purple-300/40",
  },
  {
    // Green
    openBorder: "border-green-400",
    openBg: "bg-gradient-to-br from-green-50 to-emerald-50",
    closedHover: "hover:border-green-300 hover:bg-green-50/60",
    badgeBg: "bg-gradient-to-br from-green-500 to-emerald-600",
    badgeText: "text-white",
    questionOpen: "text-green-900",
    questionHover: "group-hover:text-green-800",
    chevron: "text-green-500",
    accent: "bg-gradient-to-b from-green-500 to-emerald-500",
    divider: "border-green-200/60",
    glow: "shadow-green-300/40",
  },
  {
    // Rose
    openBorder: "border-rose-400",
    openBg: "bg-gradient-to-br from-rose-50 to-pink-50",
    closedHover: "hover:border-rose-300 hover:bg-rose-50/60",
    badgeBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    badgeText: "text-white",
    questionOpen: "text-rose-900",
    questionHover: "group-hover:text-rose-800",
    chevron: "text-rose-500",
    accent: "bg-gradient-to-b from-rose-500 to-pink-500",
    divider: "border-rose-200/60",
    glow: "shadow-rose-300/40",
  },
  {
    // Cyan
    openBorder: "border-cyan-400",
    openBg: "bg-gradient-to-br from-cyan-50 to-sky-50",
    closedHover: "hover:border-cyan-300 hover:bg-cyan-50/60",
    badgeBg: "bg-gradient-to-br from-cyan-500 to-sky-600",
    badgeText: "text-white",
    questionOpen: "text-cyan-900",
    questionHover: "group-hover:text-cyan-800",
    chevron: "text-cyan-500",
    accent: "bg-gradient-to-b from-cyan-500 to-sky-500",
    divider: "border-cyan-200/60",
    glow: "shadow-cyan-300/40",
  },
];

export const FaqSection: React.FC = () => {
  const FAQS = useSiteContent<typeof FAQS_STATIC>('faqs', FAQS_STATIC);
  const { language } = useApp();
  const [activeFaq, setActiveFaq] = useState<string | null>("faq1");

  return (
    <>

      <section className="mb-0 relative py-16 overflow-hidden pb-0
        bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50">

        {/* ============ OLYMPIAD-THEMED BACKGROUND ============ */}

        {/* Animated gradient orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[8%] left-[6%] w-72 h-72 rounded-full bg-blue-300/25 blur-3xl faq-orb-a" />
          <div className="absolute top-[40%] right-[5%] w-80 h-80 rounded-full bg-purple-300/25 blur-3xl faq-orb-b" />
          <div className="absolute bottom-[8%] left-[30%] w-72 h-72 rounded-full bg-amber-300/25 blur-3xl faq-orb-a [animation-delay:-5s]" />
        </div>

        {/* Rotating dashed rings */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[15%] right-[8%] w-44 h-44 rounded-full border-2 border-dashed border-blue-300/40 faq-spin-slow" />
          <div className="absolute bottom-[15%] left-[5%] w-52 h-52 rounded-full border border-dashed border-purple-300/35 faq-spin-rev" />
          <div className="absolute top-[55%] left-[10%] w-28 h-28 rounded-full border-2 border-dotted border-amber-300/40 faq-spin-slow [animation-duration:30s]" />
        </div>

        {/* ============ FLOATING OLYMPIAD ICONS ============ */}

        {/* Trophy — top-left */}
        <div aria-hidden className="pointer-events-none absolute top-[8%] left-[4%] text-amber-400/35 faq-float">
          <Trophy className="w-14 h-14" />
        </div>

        {/* Medal — top-right */}
        <div aria-hidden className="pointer-events-none absolute top-[12%] right-[6%] text-orange-400/35 faq-float-slow">
          <Medal className="w-16 h-16" />
        </div>

        {/* Award — mid-left */}
        <div aria-hidden className="pointer-events-none absolute top-[40%] left-[3%] text-purple-400/30 faq-drift">
          <Award className="w-12 h-12" />
        </div>

        {/* BookOpen — mid-right */}
        <div aria-hidden className="pointer-events-none absolute top-[48%] right-[4%] text-blue-400/30 faq-drift [animation-delay:2s]">
          <BookOpen className="w-14 h-14" />
        </div>

        {/* GraduationCap — bottom-left */}
        <div aria-hidden className="pointer-events-none absolute bottom-[12%] left-[6%] text-emerald-400/30 faq-float [animation-delay:1s]">
          <GraduationCap className="w-16 h-16" />
        </div>

        {/* Target — bottom-right */}
        <div aria-hidden className="pointer-events-none absolute bottom-[15%] right-[8%] text-rose-400/30 faq-float-slow [animation-delay:2s]">
          <Target className="w-12 h-12" />
        </div>

        {/* Lightbulb — center-left */}
        <div aria-hidden className="pointer-events-none absolute top-[65%] left-[14%] text-yellow-400/30 faq-drift [animation-delay:3s]">
          <Lightbulb className="w-10 h-10" />
        </div>

        {/* Star sparkles (small) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Star className="absolute top-[22%] left-[22%] w-4 h-4 text-yellow-400/50 fill-current faq-twinkle" />
          <Star className="absolute top-[75%] right-[20%] w-5 h-5 text-amber-400/50 fill-current faq-twinkle [animation-delay:0.8s]" />
          <Star className="absolute top-[55%] right-[35%] w-3 h-3 text-blue-400/50 fill-current faq-twinkle [animation-delay:1.6s]" />
          <Star className="absolute bottom-[30%] left-[40%] w-4 h-4 text-purple-400/50 fill-current faq-twinkle [animation-delay:2.4s]" />
          <Sparkles className="absolute top-[35%] left-[45%] w-5 h-5 text-fuchsia-400/40 faq-sparkle" />
          <Sparkles className="absolute bottom-[40%] right-[30%] w-6 h-6 text-cyan-400/40 faq-sparkle [animation-delay:1.2s]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Section Header */}
          <SectionHeader
            icon={HelpCircle}
            badge="जिज्ञासा व समाधान"
            title="सामान्य प्रश्नोत्तर"
            description="ओलंपियाड से संबंधित सभी सामान्य प्रश्नों के उत्तर यहाँ प्राप्त करें"
          />

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === faq.id;
              const theme = FAQ_THEMES[index % FAQ_THEMES.length];

              return (
                <div
                  key={faq.id}
                  className={`relative rounded-2xl border-2 shadow-sm transition-all duration-500 overflow-hidden
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

                  {/* Top-right sparkle (only when open) */}
                  {isOpen && (
                    <Sparkles className="absolute top-3 right-3 w-4 h-4 text-amber-400 faq-sparkle" />
                  )}

                  {/* Question Button */}
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
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
                            ? `${theme.badgeBg} ${theme.badgeText} ${theme.glow} shadow-lg faq-badge-bounce`
                            : `bg-slate-100 text-slate-700`
                          }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{faq.question}</span>
                    </span>

                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-all duration-500
                        ${isOpen ? `rotate-180 scale-110 ${theme.chevron}` : "text-slate-400"}
                        group-hover:scale-125`}
                    />
                  </button>

                  {/* Answer (collapsible) */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out
                      ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
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

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 flex-wrap justify-center
              px-6 py-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border-2 border-amber-200">
              <Sparkles className="w-5 h-5 text-amber-500 faq-sparkle" />
              <p className="text-xl text-amber-800 font-devanagari font-semibold">
                {language === "hi"
                  ? "क्या आपका प्रश्न सूची में नहीं है?"
                  : "Still have a question?"}
              </p>
              <button
                className="text-red-800 cursor-pointer font-bold hover:text-amber-700 transition-all duration-300 underline-offset-2 hover:underline hover:scale-105"
                onClick={() => window.location.href = "/contact"}
              >
                {language === "hi" ? "हमसे संपर्क करें" : "Contact us"}
              </button>
              <Sparkles className="w-5 h-5 text-amber-500 faq-sparkle [animation-delay:0.8s]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqSection;