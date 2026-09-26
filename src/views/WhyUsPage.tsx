"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Breadcrumb } from "../components/shared/Breadcrumb";
import { WHY_US_DATA as WHY_US_DATA_STATIC } from "../data/olympiadData";
import {
  Cpu,
  Award,
  Trophy,
  GraduationCap,
  ShieldCheck,
  Users,
  CheckCircle2,
  Sparkles,
  Star,
  Target,
  Zap,
  Crown,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

import { useSiteContent } from '@/hooks/useSiteContent';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Award,
  Trophy,
  GraduationCap,
  ShieldCheck,
  Users,
};

// 6 pastel themes matching the reference image + NEW border colors
const CARD_THEMES = [
  {
    // Blue
    cardBg: "from-blue-50 to-blue-100",
    cardBorder: "border-blue-300 hover:border-blue-400",
    iconBg: "from-blue-400 via-blue-500 to-blue-600",
    dashedRing: "border-blue-300/60",
    titleColor: "text-blue-800",
    descColor: "text-slate-700",
    divider: "via-blue-300",
    underline: "bg-blue-500",
    cornerShape: "bg-blue-300/30",
    spark: "text-blue-400",
    shadow: "hover:shadow-blue-500/30",
  },
  {
    // Orange
    cardBg: "from-orange-50 to-orange-100",
    cardBorder: "border-orange-300 hover:border-orange-400",
    iconBg: "from-orange-400 via-orange-500 to-orange-600",
    dashedRing: "border-orange-300/60",
    titleColor: "text-orange-800",
    descColor: "text-slate-700",
    divider: "via-orange-300",
    underline: "bg-orange-500",
    cornerShape: "bg-orange-300/30",
    spark: "text-orange-400",
    shadow: "hover:shadow-orange-500/30",
  },
  {
    // Purple
    cardBg: "from-purple-50 to-purple-100",
    cardBorder: "border-purple-300 hover:border-purple-400",
    iconBg: "from-fuchsia-400 via-purple-500 to-purple-600",
    dashedRing: "border-purple-300/60",
    titleColor: "text-purple-800",
    descColor: "text-slate-700",
    divider: "via-purple-300",
    underline: "bg-purple-500",
    cornerShape: "bg-purple-300/30",
    spark: "text-purple-400",
    shadow: "hover:shadow-purple-500/30",
  },
  {
    // Green
    cardBg: "from-green-50 to-green-100",
    cardBorder: "border-green-300 hover:border-green-400",
    iconBg: "from-emerald-400 via-green-500 to-green-600",
    dashedRing: "border-green-300/60",
    titleColor: "text-green-800",
    descColor: "text-slate-700",
    divider: "via-green-300",
    underline: "bg-green-500",
    cornerShape: "bg-green-300/30",
    spark: "text-green-400",
    shadow: "hover:shadow-green-500/30",
  },
  {
    // Rose
    cardBg: "from-rose-50 to-rose-100",
    cardBorder: "border-rose-300 hover:border-rose-400",
    iconBg: "from-rose-400 via-rose-500 to-rose-600",
    dashedRing: "border-rose-300/60",
    titleColor: "text-rose-800",
    descColor: "text-slate-700",
    divider: "via-rose-300",
    underline: "bg-rose-500",
    cornerShape: "bg-rose-300/30",
    spark: "text-rose-400",
    shadow: "hover:shadow-rose-500/30",
  },
  {
    // Cyan
    cardBg: "from-cyan-50 to-cyan-100",
    cardBorder: "border-cyan-300 hover:border-cyan-400",
    iconBg: "from-cyan-400 via-cyan-500 to-cyan-600",
    dashedRing: "border-cyan-300/60",
    titleColor: "text-cyan-800",
    descColor: "text-slate-700",
    divider: "via-cyan-300",
    underline: "bg-cyan-500",
    cornerShape: "bg-cyan-300/30",
    spark: "text-cyan-400",
    shadow: "hover:shadow-cyan-500/30",
  },
];

export const WhyUsPage: React.FC = () => {
  const WHY_US_DATA = useSiteContent<typeof WHY_US_DATA_STATIC>('why_us_page', WHY_US_DATA_STATIC);
  const { language, navigateTo } = useApp();
  const { advantages } = WHY_US_DATA;

  return (
    <>
      <div className="relative min-h-screen overflow-hidden pb-15
        bg-gradient-to-br from-amber-50/60 via-white to-amber-50/40">


        {/* Animated dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]
            bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
            bg-[length:60px_60px,80px_80px] wh-grid-pan"
        />

        {/* Diagonal stripes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]
            bg-[repeating-linear-gradient(45deg,#7c3aed_0px,#7c3aed_1px,transparent_1px,transparent:22px)]"
        />

        {/* Cross grid (paper pattern) — NEW section-level pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]
            bg-[linear-gradient(#64748b_1px,transparent_1px),linear-gradient(90deg,#64748b_1px,transparent_1px)]
            bg-[length:80px_80px] wh-bg-pattern-pan"
        />

        {/* Fine dot cluster pattern — NEW section-level pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]
            bg-[radial-gradient(circle,#94a3b8_1px,transparent_1px)]
            bg-[length:24px_24px]"
        />

        {/* Drifting orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[8%] left-[5%] w-80 h-80 rounded-full bg-blue-300/25 blur-3xl wh-orb-a" />
          <div className="absolute top-[25%] right-[4%] w-72 h-72 rounded-full bg-purple-300/25 blur-3xl wh-orb-b" />
          <div className="absolute bottom-[15%] left-[30%] w-80 h-80 rounded-full bg-amber-300/25 blur-3xl wh-orb-a [animation-delay:-5s]" />
          <div className="absolute bottom-[5%] right-[20%] w-64 h-64 rounded-full bg-emerald-300/20 blur-3xl wh-orb-b [animation-delay:-8s]" />
        </div>

        {/* Rotating dashed rings */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] right-[8%] w-44 h-44 rounded-full border-2 border-dashed border-blue-300/40 wh-spin-slow" />
          <div className="absolute bottom-[12%] left-[6%] w-56 h-56 rounded-full border border-dashed border-amber-300/40 wh-spin-rev" />
        </div>

        {/* Light sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3
            bg-gradient-to-r from-transparent via-white/50 to-transparent
            skew-x-[-25deg] wh-sweep"
        />

        {/* Twinkling stars */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[15%] left-[14%] w-2 h-2 rounded-full bg-amber-400 wh-twinkle" />
          <div className="absolute top-[45%] right-[22%] w-1.5 h-1.5 rounded-full bg-blue-400 wh-twinkle [animation-delay:0.8s]" />
          <div className="absolute bottom-[25%] left-[45%] w-2 h-2 rounded-full bg-emerald-400 wh-twinkle [animation-delay:1.6s]" />
          <div className="absolute top-[70%] right-[10%] w-1.5 h-1.5 rounded-full bg-purple-400 wh-twinkle [animation-delay:2.4s]" />
        </div>

        {/* Floating decorative icons */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[12%] left-[8%] text-amber-400/20 wh-float">
            <Trophy className="w-16 h-16" />
          </div>
          <div className="absolute top-[20%] right-[12%] text-blue-400/20 wh-float-slow">
            <Award className="w-16 h-16" />
          </div>
          <div className="absolute bottom-[18%] left-[12%] text-emerald-400/20 wh-drift">
            <GraduationCap className="w-14 h-14" />
          </div>
          <div className="absolute bottom-[12%] right-[10%] text-purple-400/20 wh-float [animation-delay:-3s]">
            <Crown className="w-14 h-14" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 z-10">
          <Breadcrumb
            title="हमारी विशेषताएँ"
            items={[
              { label: "परिचय", route: "/about" },
              { label: "हमारी विशेषताएँ" },
            ]}
          />

          <SectionHeader
            icon={Sparkles}
            badge="हमें क्या बनाता है विशेष"
            title="हमारी विशेषताएँ"
            className="pb-4"
          />

          {/* ============ Pastel Soft Cards (like reference image) ============ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((adv, idx) => {
              const Icon = iconMap[adv.icon] || CheckCircle2;
              const theme = CARD_THEMES[idx % CARD_THEMES.length];

              return (
                <div
                  key={adv.id}
                  className={`group relative pt-10 ${idx % 2 === 0 ? "lg:translate-y-0" : "lg:translate-y-0"}`}
                >
                  {/* ===== Floating Icon Medallion (sits above the card) ===== */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                    <div className="relative w-[88px] h-[88px]">
                      {/* Rotating dashed outer ring */}
                      <span
                        aria-hidden
                        className={`absolute inset-0 rounded-full border-2 border-dashed ${theme.dashedRing} wh-ring-rotate`}
                      />
                      {/* Solid icon circle */}
                      <div
                        className={`absolute inset-[7px] rounded-full bg-gradient-to-br ${theme.iconBg}
                          flex items-center justify-center
                          shadow-lg group-hover:scale-110 group-hover:rotate-6
                          transition-transform duration-500`}
                      >
                        <Icon className="w-9 h-9 text-white drop-shadow-md wh-icon-float" />
                      </div>
                    </div>
                  </div>

                  {/* ===== Card Body ===== */}
                  <div
                    className={`relative rounded-3xl overflow-hidden
                      bg-gradient-to-b ${theme.cardBg}
                      border-2 ${theme.cardBorder}
                      shadow-[0_10px_30px_-12px_rgba(15,23,42,0.15)]
                      hover:shadow-2xl ${theme.shadow}
                      hover:-translate-y-2
                      transition-all duration-500
                      pt-14 pb-7 px-6`}
                  >
                    {/* Faint diagonal corner shape (like reference) */}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute -top-4 -right-4 w-32 h-32 rounded-full ${theme.cornerShape} blur-2xl`}
                    />
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute -bottom-6 -left-6 w-24 h-24 rounded-full ${theme.cornerShape} blur-2xl`}
                    />

                    {/* Top diagonal shape behind the icon (subtle) */}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute top-0 left-0 right-0 h-20 ${theme.cornerShape}
                        [clip-path:polygon(0_0,100%_0,55%_100%,0_55%)] opacity-40`}
                    />

                    {/* Shine sweep on hover */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                      <div
                        className="absolute top-0 -left-full h-full w-1/2
                          bg-gradient-to-r from-transparent via-white/50 to-transparent
                          skew-x-[-25deg] group-hover:animate-[wh-sweep_1.2s_ease-out]"
                      />
                    </div>

                    {/* Sparkles */}
                    <Sparkles
                      className={`absolute top-4 right-4 w-4 h-4 ${theme.spark} opacity-70 wh-twinkle`}
                    />
                    <Star
                      className={`absolute top-8 right-9 w-2.5 h-2.5 ${theme.spark} opacity-50 wh-twinkle [animation-delay:1s]`}
                    />

                    {/* Content */}
                    <div className="relative z-[2] text-center">
                      {/* Title */}
                      <h3
                        className={`text-xl sm:text-2xl font-black ${theme.titleColor} font-devanagari leading-snug mt-2`}
                      >
                        {adv.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-[18px] ${theme.descColor} leading-relaxed font-devanagari mt-2`}>
                        {adv.description}
                      </p>
                      {/* Divider */}
                      <div className="flex items-center justify-center my-4">
                        <span className={`h-[1px] w-16 bg-gradient-to-r from-transparent ${theme.divider} to-transparent`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyUsPage;