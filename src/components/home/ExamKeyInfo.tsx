'use client';

import React from "react";
import {
  BookMarked,
  FileCheck,
  HelpCircle,
  Clock,
  Award,
  Scroll,
  Info,
  Sparkles,
} from "lucide-react";
import { EXAM_DETAILS as EXAM_DETAILS_STATIC } from "@/data/olympiadData";
import SectionHeader from "../shared/SectionHeader";

import { useSiteContent } from '@/hooks/useSiteContent';

const ICONS = {
  BookMarked,
  FileCheck,
  HelpCircle,
  Clock,
  Award,
  Scroll,
};

// 6 unique color themes — every class is a static Tailwind string
const THEMES = [
  // 1. Blue
  {
    border: "border-blue-200 group-hover:border-blue-500",
    darkOverlay: "from-[#0A1F4D] to-[#123C8C]",
    corner: "bg-blue-600",
    number: "text-blue-600 group-hover:text-white",
    iconRing: "border-blue-600 group-hover:border-white/70",
    iconInner: "bg-gradient-to-br from-blue-400 to-blue-700 border-blue-500 shadow-blue-500/40 group-hover:from-white/25 group-hover:to-white/10 group-hover:border-white/85",
    iconSvg: "text-white",
    underline: "bg-blue-600 group-hover:bg-white/90",
    value: "text-blue-700 group-hover:text-white",
    chip: "bg-blue-600 group-hover:bg-white/20",
    spark: "text-blue-600 group-hover:text-white",
    shadow: "hover:shadow-blue-500/30",
  },
  // 2. Emerald
  {
    border: "border-emerald-200 group-hover:border-emerald-500",
    darkOverlay: "from-[#052E24] to-[#0B5C42]",
    corner: "bg-emerald-600",
    number: "text-emerald-600 group-hover:text-white",
    iconRing: "border-emerald-600 group-hover:border-white/70",
    iconInner: "bg-gradient-to-br from-emerald-400 to-emerald-700 border-emerald-500 shadow-emerald-500/40 group-hover:from-white/25 group-hover:to-white/10 group-hover:border-white/85",
    iconSvg: "text-white",
    underline: "bg-emerald-600 group-hover:bg-white/90",
    value: "text-emerald-700 group-hover:text-white",
    chip: "bg-emerald-600 group-hover:bg-white/20",
    spark: "text-emerald-600 group-hover:text-white",
    shadow: "hover:shadow-emerald-500/30",
  },
  // 3. Amber
  {
    border: "border-amber-200 group-hover:border-amber-500",
    darkOverlay: "from-[#3B1F03] to-[#7A4008]",
    corner: "bg-amber-500",
    number: "text-amber-500 group-hover:text-white",
    iconRing: "border-amber-500 group-hover:border-white/70",
    iconInner: "bg-gradient-to-br from-amber-300 to-amber-600 border-amber-500 shadow-amber-500/40 group-hover:from-white/25 group-hover:to-white/10 group-hover:border-white/85",
    iconSvg: "text-white",
    underline: "bg-amber-500 group-hover:bg-white/90",
    value: "text-amber-700 group-hover:text-white",
    chip: "bg-amber-500 group-hover:bg-white/20",
    spark: "text-amber-500 group-hover:text-white",
    shadow: "hover:shadow-amber-500/30",
  },
  // 4. Violet
  {
    border: "border-violet-200 group-hover:border-violet-500",
    darkOverlay: "from-[#220B4F] to-[#4C1D95]",
    corner: "bg-violet-600",
    number: "text-violet-600 group-hover:text-white",
    iconRing: "border-violet-600 group-hover:border-white/70",
    iconInner: "bg-gradient-to-br from-violet-400 to-violet-700 border-violet-500 shadow-violet-500/40 group-hover:from-white/25 group-hover:to-white/10 group-hover:border-white/85",
    iconSvg: "text-white",
    underline: "bg-violet-600 group-hover:bg-white/90",
    value: "text-violet-700 group-hover:text-white",
    chip: "bg-violet-600 group-hover:bg-white/20",
    spark: "text-violet-600 group-hover:text-white",
    shadow: "hover:shadow-violet-500/30",
  },
  // 5. Rose
  {
    border: "border-rose-200 group-hover:border-rose-500",
    darkOverlay: "from-[#4C0519] to-[#881337]",
    corner: "bg-rose-600",
    number: "text-rose-600 group-hover:text-white",
    iconRing: "border-rose-600 group-hover:border-white/70",
    iconInner: "bg-gradient-to-br from-rose-400 to-rose-700 border-rose-500 shadow-rose-500/40 group-hover:from-white/25 group-hover:to-white/10 group-hover:border-white/85",
    iconSvg: "text-white",
    underline: "bg-rose-600 group-hover:bg-white/90",
    value: "text-rose-700 group-hover:text-white",
    chip: "bg-rose-600 group-hover:bg-white/20",
    spark: "text-rose-600 group-hover:text-white",
    shadow: "hover:shadow-rose-500/30",
  },
  // 6. Cyan
  {
    border: "border-cyan-200 group-hover:border-cyan-500",
    darkOverlay: "from-[#083344] to-[#155E75]",
    corner: "bg-cyan-600",
    number: "text-cyan-600 group-hover:text-white",
    iconRing: "border-cyan-600 group-hover:border-white/70",
    iconInner: "bg-gradient-to-br from-cyan-400 to-cyan-700 border-cyan-500 shadow-cyan-500/40 group-hover:from-white/25 group-hover:to-white/10 group-hover:border-white/85",
    iconSvg: "text-white",
    underline: "bg-cyan-600 group-hover:bg-white/90",
    value: "text-cyan-700 group-hover:text-white",
    chip: "bg-cyan-600 group-hover:bg-white/20",
    spark: "text-cyan-600 group-hover:text-white",
    shadow: "hover:shadow-cyan-500/30",
  },
];

export const ExamKeyInfo: React.FC = () => {
  const EXAM_DETAILS = useSiteContent<typeof EXAM_DETAILS_STATIC>('exam_details', EXAM_DETAILS_STATIC);

  return (
    <div className="space-y-6 mb-16">
      <div className="text-center mt-25">
        <SectionHeader
          icon={Info}
          badge="परीक्षा की मुख्य विशेषताएँ"
          title="महत्वपूर्ण जानकारी"
        />
      </div>

      {/* 6 cards · 3 per row on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {EXAM_DETAILS.map((detail, index) => {
          const Icon = ICONS[detail.icon as keyof typeof ICONS];
          const theme = THEMES[index % THEMES.length];

          return (
            <div
              key={detail.id}
              className={`group relative bg-white rounded-3xl overflow-hidden
                border-2 ${theme.border}
                shadow-[0_6px_24px_-8px_rgba(15,23,42,0.12)]
                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-2.5 hover:shadow-2xl ${theme.shadow}`}
            >
              {/* Dark themed overlay (fades in on hover) */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${theme.darkOverlay}
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`}
              />

              {/* Dotted texture overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none z-[1]
                  bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px]"
              />

              {/* Top-right diagonal corner accent (larger to fit number) */}
              <span
                aria-hidden="true"
                className={`absolute top-0 right-0 w-32 h-32 ${theme.corner}
                  [clip-path:polygon(100%_0,0_0,100%_100%)]
                  transition-all duration-500 origin-top-right
                  group-hover:opacity-0 group-hover:scale-50 group-hover:rotate-12 z-[2]`}
              />

              {/* Sparkle accent (top-left) */}
              <span
                aria-hidden="true"
                className={`absolute top-5 left-5 z-[5] opacity-70 animate-pulse
                  transition-all duration-500
                  group-hover:rotate-180 group-hover:scale-125 group-hover:opacity-100 ${theme.spark}`}
              >
                <Sparkles className="w-5 h-5" />
              </span>

              {/* Big number (top-right) — correctly positioned inside corner */}
              <span
                className={`absolute top-4 right-4 text-5xl sm:text-4xl font-black leading-none tracking-tighter z-[5]
                  transition-all duration-500
                  group-hover:-translate-y-0.5 group-hover:scale-105
                  group-hover:[text-shadow:0_4px_20px_rgba(0,0,0,0.35)]
                  ${theme.number}`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="relative z-[3] px-6 pt-10 pb-10">
                {/* Icon medallion — solid vibrant gradient with white icon */}
                <div className="relative w-[108px] h-[108px] mx-auto mb-7">
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-full border-2 border-dashed
                      animate-spin [animation-duration:22s] opacity-60
                      transition-all duration-500 ${theme.iconRing}`}
                  />
                  <span
                    className={`absolute inset-3.5 rounded-full border-[3px] flex items-center justify-center
                      shadow-lg
                      transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]
                      ${theme.iconInner}`}
                  >
                    <Icon className={`w-10 h-10 drop-shadow-md transition-colors duration-500 ${theme.iconSvg}`} />
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-2xl sm:text-[26px] font-extrabold text-center leading-tight font-devanagari
                  text-slate-900 group-hover:text-white transition-colors duration-500`}>
                  {detail.label.split("(")[0]}
                </h3>

                {/* Underline */}
                <div
                  className={`h-1 w-14 mx-auto mt-4 rounded-full
                    transition-all duration-500 ease-out
                    group-hover:w-28 ${theme.underline}`}
                />

                {/* Description */}
                <p className="mt-5 text-lg leading-relaxed text-center font-devanagari
                  text-slate-800 group-hover:text-white/90 transition-colors duration-500">
                  {detail.subtext}
                </p>

                {/* Value */}
                <p className={`mt-1 text-xl font-extrabold text-center font-devanagari
                  transition-colors duration-500 ${theme.value}`}>
                  {detail.value}
                </p>
              </div>

              {/* Bottom-left chip */}
              {/* <span
                className={`absolute bottom-0 left-0 w-14 h-10 rounded-tr-3xl
                  flex items-end justify-start pl-2.5 pb-1.5
                  text-white text-sm font-extrabold tracking-wider z-[4]
                  transition-all duration-500 group-hover:-translate-y-0.5
                  backdrop-blur-md ${theme.chip}`}
              >
                {String(index + 1).padStart(2, '0')}
              </span> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};