'use client';

import React from "react";
import Image from "next/image";
import { EXAM_SCHEDULES as EXAM_SCHEDULES_STATIC } from "@/data/olympiadData";

import { useSiteContent } from '@/hooks/useSiteContent';

// Distinct color themes cycled per subject card, olympiad-style (podium/medal palette)
const CARD_THEMES = [
  {
    bg: "from-red-600 via-red-800 to-red-900",
    ring: "border-fuchsia-300",
    badge: "from-yellow-300 to-amber-400 text-purple-900",
    chip: "bg-red-100 text-red-700 border-red-300",
    glow: "hover:shadow-red-500/40",
  },
  {
    bg: "from-blue-600 via-blue-500 to-blue-900",
    ring: "border-cyan-300",
    badge: "from-yellow-300 to-amber-400 text-teal-900",
    chip: "bg-blue-100 text-blue-700 border-blue-300",
    glow: "hover:shadow-blue-500/40",
  },
  {
    bg: "from-orange-500 via-rose-500 to-pink-600",
    ring: "border-rose-300",
    badge: "from-yellow-300 to-amber-400 text-rose-900",
    chip: "bg-rose-100 text-rose-700 border-rose-300",
    glow: "hover:shadow-rose-500/40",
  },
  {
    bg: "from-emerald-500 via-green-500 to-lime-500",
    ring: "border-emerald-300",
    badge: "from-yellow-300 to-amber-400 text-emerald-900",
    chip: "bg-emerald-100 text-emerald-700 border-emerald-300",
    glow: "hover:shadow-emerald-500/40",
  },
];

export const ExamScheduleDates: React.FC = () => {
  const EXAM_SCHEDULES = useSiteContent<typeof EXAM_SCHEDULES_STATIC>('exam_schedules_subject', EXAM_SCHEDULES_STATIC);
  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-white to-pink-50 rounded-3xl border-2 border-indigo-200 p-6 sm:p-8 shadow-2xl space-y-8 mb-12 overflow-hidden esd-fade-in">
      {/* Confetti dots */}
      <span className="esd-confetti absolute top-6 left-10 w-2.5 h-2.5 rounded-full bg-amber-400" />
      <span className="esd-confetti-b absolute top-16 right-16 w-3 h-3 rounded-full bg-fuchsia-400" />
      <span className="esd-confetti-c absolute bottom-10 left-1/3 w-2 h-2 rounded-full bg-cyan-400" />
      <span className="esd-confetti absolute bottom-24 right-1/4 w-2.5 h-2.5 rounded-sm rotate-45 bg-emerald-400" />
      <span className="esd-confetti-b absolute top-1/2 left-6 w-2 h-2 rounded-sm rotate-12 bg-rose-400" />

      <div className="relative flex items-center justify-between border-b-2 border-indigo-100 pb-4">
        <div>
          <h3 className="text-3xl font-bold font-heading-hi bg-gradient-to-r from-red-900 via-red-900 to-red-950 bg-clip-text text-transparent bg-[length:200%_auto] esd-text-shine">
            विषयवार परीक्षा तिथियाँ (Exam Schedule 2026)
          </h3>
          <p className="text-lg text-indigo-700 font-bold font-devanagari">
            प्रत्येक विषय हेतु दो लचीले विकल्प उपलब्ध हैं
          </p>
        </div>
        <span className="hidden sm:inline-block relative px-4 pb-1 pt-2 bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold text-base rounded-2xl shadow-lg shadow-indigo-500/30 esd-pulse-ring">
          ऑफलाइन ओएमआर आधारित
        </span>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXAM_SCHEDULES.map((sched, idx) => {
          const theme = CARD_THEMES[idx % CARD_THEMES.length];
          return (
            <div
              key={sched.subject}
              style={{ animationDelay: `${idx * 150}ms` }}
              className={`esd-card-in group bg-gradient-to-br ${theme.bg} p-6 rounded-2xl border-2 ${theme.ring} shadow-md space-y-6 transition-all duration-500 hover:shadow-2xl ${theme.glow} hover:-translate-y-2`}
            >
              {/* Subject Header */}
              <div className="relative overflow-hidden rounded-xl border border-white/30 bg-black/10 backdrop-blur-sm">
                <div className="absolute inset-0 esd-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-between gap-4 p-4 sm:p-5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`esd-badge-bounce font-heading-hi w-15 h-15 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${theme.badge} flex items-center justify-center font-bold text-2xl shadow-md flex-shrink-0 ring-4 ring-white/40 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      {sched.subject === "Hindi" ? "हिं" : "सं"}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xl sm:text-2xl font-bold font-heading-hi text-white leading-tight drop-shadow-sm">
                        {sched.subjectHindi}
                      </h4>
                      <p className="text-lg text-white/90 font-devanagari">
                        कक्षा 1 से 10 के विद्यार्थियों हेतु
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-shrink-0 items-end esd-float">
                    <Image
                      src={sched.image}
                      alt={sched.subjectHindi}
                      width={140}
                      height={90}
                      className="w-30 md:w-40 lg:w-40 h-auto object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105"
                      priority={sched.subject === "Hindi"}
                    />
                  </div>
                </div>
                <img
                  src={sched.image}
                  alt={sched.subjectHindi}
                  className="absolute right-2 bottom-0 w-20 opacity-90 sm:hidden esd-float"
                />
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border-2 border-white/70 space-y-1 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <span className={`text-base font-black uppercase tracking-wider block border-b pb-1 px-1 -mx-1 rounded-t ${theme.chip}`}>
                    विकल्प – I
                  </span>
                  <p className="text-xl font-bold text-slate-900 font-devanagari pt-1">
                    {sched.option1Date}
                  </p>
                  <p className="text-base font-semibold text-blue-800">
                    ({sched.option1Day})
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border-2 border-white/70 space-y-1 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <span className={`text-base font-black uppercase tracking-wider block border-b pb-1 px-1 -mx-1 rounded-t ${theme.chip}`}>
                    विकल्प – II
                  </span>
                  <p className="text-xl font-bold text-slate-900 font-devanagari pt-1">
                    {sched.option2Date}
                  </p>
                  <p className="text-base font-semibold text-blue-800">
                    ({sched.option2Day})
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};