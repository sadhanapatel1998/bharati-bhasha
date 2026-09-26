'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { AWARDS_DATA as AWARDS_DATA_STATIC } from '../data/olympiadData';
import {
  Trophy,
  Medal,
  Award,
  Star,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Heart,
  Building2,
  User,
  Users,
  BarChart2,
  TrendingUp,
  Target,
  Lightbulb,
  Activity,
  Crown,
  BookOpen,
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CtaSection from '@/components/shared/CtaSection';

import { useSiteContent } from '@/hooks/useSiteContent';

// Icon map
const iconMap: Record<string, React.ElementType> = {
  Trophy, Medal, Award, Star, ShieldCheck, Sparkles,
  GraduationCap, Heart, Building2, User, Users, BarChart2,
  TrendingUp, Target, Lightbulb, Activity,
};

const RIBBON_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 50% 68%, 0 100%)';
const PENNANT_CLIP =
  'polygon(0 0, calc(100% - 7px) 0, 100% 50%, calc(100% - 7px) 100%, 0 100%)';

const ChakraMark: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <circle cx="20" cy="20" r="3.5" fill="#C79A2D" />
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = 20 + Math.cos(angle) * 7;
      const y1 = 20 + Math.sin(angle) * 7;
      const x2 = 20 + Math.cos(angle) * 17;
      const y2 = 20 + Math.sin(angle) * 17;
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#C79A2D"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      );
    })}
    <circle cx="20" cy="20" r="18" stroke="#C79A2D" strokeWidth="1.4" opacity="0.5" />
  </svg>
);

const OrnamentalDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-3">
    <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#C79A2D]" />
    <span className="w-2.5 h-2.5 rotate-45 bg-[#C79A2D] shadow-sm" />
    <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#C79A2D]" />
  </div>
);

/** Top-right hanging medal with ribbon tails */
const MedalSeal: React.FC<{ gradient: string; Icon: React.ElementType }> = ({
  gradient,
  Icon,
}) => (
  <div className="absolute -top-2 right-6 flex flex-col items-center pointer-events-none z-20">
    <div
      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full
        bg-gradient-to-br ${gradient}
        flex items-center justify-center
        shadow-[0_8px_22px_-6px_rgba(0,0,0,0.35)]
        ring-[3px] ring-white
        group-hover:scale-110 group-hover:rotate-6
        transition-all duration-500`}
    >
      <span aria-hidden className="absolute inset-1 rounded-full border border-white/40" />
      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-md" />
      <span
        aria-hidden
        className="absolute top-1.5 left-2 w-2 h-2 rounded-full bg-white/70 blur-[2px]"
      />
    </div>
    <div className="flex -mt-1 gap-[3px]">
      <div
        className={`w-3 h-5 bg-gradient-to-b ${gradient} opacity-95`}
        style={{ clipPath: RIBBON_CLIP }}
      />
      <div
        className={`w-3 h-5 bg-gradient-to-b ${gradient}`}
        style={{ clipPath: RIBBON_CLIP }}
      />
    </div>
  </div>
);

const levelLabel: Record<string, string> = {
  national: 'राष्ट्रीय स्तर',
  state: 'राज्य स्तर',
  district: 'जिला स्तर',
  school: 'विद्यालय स्तर',
  participation: 'सहभागिता',
};

export const AwardsPage: React.FC = () => {
  const AWARDS_DATA = useSiteContent<typeof AWARDS_DATA_STATIC>('awards_page', AWARDS_DATA_STATIC);
  const { language, navigateTo } = useApp();
  const { awards, scholarships, schoolTeacherAwards, performanceFeatures, quote } = AWARDS_DATA;

  return (
    <>
      {/* ============ Custom Keyframes + ONE clean pattern ============ */}
      <style>{`
        /* ===== Ambient motion ===== */
        @keyframes aw3-orb-a {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(60px, -40px) scale(1.15); }
        }
        @keyframes aw3-orb-b {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-50px, 40px) scale(1.1); }
        }
        @keyframes aw3-orb-c {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes aw3-twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50%      { opacity: 1;   transform: scale(1.25); }
        }
        @keyframes aw3-float {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50%      { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes aw3-float-slow {
          0%, 100% { transform: translateY(0) rotate(8deg); }
          50%      { transform: translateY(-20px) rotate(-2deg); }
        }
        @keyframes aw3-sweep {
          0%   { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(400%) skewX(-25deg); opacity: 0; }
        }
        @keyframes aw3-border-flow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes aw3-seal-pop {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50%      { transform: scale(1.06) rotate(3deg); }
        }
        @keyframes aw3-chakra-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes aw3-ring-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(199,154,45,0.35); }
          70%      { box-shadow: 0 0 0 14px rgba(199,154,45,0); }
          100%     { box-shadow: 0 0 0 0 rgba(199,154,45,0); }
        }
        @keyframes aw3-fan-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }

        .aw3-orb-a        { animation: aw3-orb-a 18s ease-in-out infinite; }
        .aw3-orb-b        { animation: aw3-orb-b 22s ease-in-out infinite; }
        .aw3-orb-c        { animation: aw3-orb-c 20s ease-in-out infinite; }
        .aw3-twinkle      { animation: aw3-twinkle 3s ease-in-out infinite; }
        .aw3-float        { animation: aw3-float 7s ease-in-out infinite; }
        .aw3-float-slow   { animation: aw3-float-slow 9s ease-in-out infinite; }
        .aw3-sweep        { animation: aw3-sweep 6s linear infinite; }
        .aw3-border-flow  { background-size: 200% 100%; animation: aw3-border-flow 8s linear infinite; }
        .aw3-seal-pop     { animation: aw3-seal-pop 3s ease-in-out infinite; }
        .aw3-chakra-spin  { animation: aw3-chakra-spin 25s linear infinite; }
        .aw3-ring-pulse   { animation: aw3-ring-pulse 2.5s ease-out infinite; }

        .aw3-pattern {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><g fill='none' stroke='%23C79A2D' stroke-width='0.7' stroke-linecap='round'><path d='M0 60 A40 40 0 0 1 80 60'/><path d='M10 60 A30 30 0 0 1 70 60'/><path d='M20 60 A20 20 0 0 1 60 60'/><path d='M30 60 A10 10 0 0 1 50 60'/></g></svg>");
          background-size: 80px 60px;
          animation: aw3-fan-drift 30s linear infinite;
        }
      `}</style>

      <div className="relative overflow-hidden min-h-screen pb-16
        bg-gradient-to-br from-amber-50/70 via-white to-rose-50/60">

        {/* Rainbow animated top border */}
        <div className="absolute top-0 left-0 right-0 h-1
          bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-blue-500 via-purple-500 to-rose-500 aw3-border-flow" />

        {/* Background pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] aw3-pattern"
        />

        {/* Drifting color orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[8%] left-[6%] w-72 h-72 rounded-full bg-amber-300/25 blur-3xl aw3-orb-a" />
          <div className="absolute top-[28%] right-[6%] w-64 h-64 rounded-full bg-rose-300/20 blur-3xl aw3-orb-b" />
          <div className="absolute bottom-[12%] left-[35%] w-72 h-72 rounded-full bg-purple-300/20 blur-3xl aw3-orb-c" />
        </div>

        {/* Light sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3
            bg-gradient-to-r from-transparent via-white/40 to-transparent
            skew-x-[-25deg] aw3-sweep"
        />

        {/* Twinkling stars */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[18%] left-[18%] w-1.5 h-1.5 rounded-full bg-amber-400 aw3-twinkle" />
          <div className="absolute top-[48%] right-[20%] w-1.5 h-1.5 rounded-full bg-rose-400 aw3-twinkle [animation-delay:1s]" />
          <div className="absolute bottom-[30%] left-[45%] w-1.5 h-1.5 rounded-full bg-emerald-400 aw3-twinkle [animation-delay:2s]" />
        </div>

        {/* Floating olympiad icons */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[12%] left-[8%] text-amber-500/15 aw3-float">
            <Trophy className="w-14 h-14" />
          </div>
          <div className="absolute top-[22%] right-[10%] text-rose-500/15 aw3-float-slow">
            <Medal className="w-14 h-14" />
          </div>
          <div className="absolute bottom-[16%] left-[10%] text-emerald-500/15 aw3-float-slow [animation-delay:-3s]">
            <GraduationCap className="w-14 h-14" />
          </div>
          <div className="absolute bottom-[10%] right-[12%] text-purple-500/15 aw3-float [animation-delay:-2s]">
            <Crown className="w-14 h-14" />
          </div>
        </div>

        {/* ============ CONTENT ============ */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 z-10">
          <Breadcrumb
            title="पुरस्कार एवं सम्मान"
            items={[
              {
                label: "पुरस्कार एवं सम्मान",
              },
            ]}
          />

          <SectionHeader
            icon={Trophy}
            badge="राष्ट्रीय स्तर सम्मान"
            title="पुरस्कार एवं सम्मान"
            description='हमारा उद्देश्य प्रत्येक विद्यार्थी की प्रतिभा को पहचानना और उसे सही मंच प्रदान करना है। भारती भाषा ओलंपियाड में भाग लेने वाले सभी विद्यार्थियों को उनकी मेहनत और उपलब्धि के आधार पर प्रमाणपत्र, पुरस्कार और विस्तृत प्रदर्शन रिपोर्ट प्रदान की जाती है।'
          />

          {/* Awards Grid – by Level */}
          <div className="space-y-8">
            <div className="text-center space-y-3 mb-15">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading-hi text-red-950 dark:text-white">
                पुरस्कार एवं सम्मान
              </h2>
              <OrnamentalDivider />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
              {awards.map((aw, idx) => {
                const Icon = iconMap[aw.icon] || Award;
                const gradient = aw.color || 'from-gray-600 to-gray-700';

                const CARD_THEMES = [
                  { border: "border-amber-200/80", hoverBorder: "hover:border-amber-400", glow: "hover:shadow-amber-500/30", accent: "bg-amber-400", corner: "bg-amber-200/50" },
                  { border: "border-slate-200/90", hoverBorder: "hover:border-slate-400", glow: "hover:shadow-slate-400/30", accent: "bg-slate-400", corner: "bg-slate-200/60" },
                  { border: "border-orange-200/80", hoverBorder: "hover:border-orange-400", glow: "hover:shadow-orange-500/30", accent: "bg-orange-400", corner: "bg-orange-200/50" },
                  { border: "border-blue-200/80", hoverBorder: "hover:border-blue-400", glow: "hover:shadow-blue-500/30", accent: "bg-blue-400", corner: "bg-blue-200/50" },
                  { border: "border-emerald-200/80", hoverBorder: "hover:border-emerald-400", glow: "hover:shadow-emerald-500/30", accent: "bg-emerald-400", corner: "bg-emerald-200/50" },
                  { border: "border-purple-200/80", hoverBorder: "hover:border-purple-400", glow: "hover:shadow-purple-500/30", accent: "bg-purple-400", corner: "bg-purple-200/50" },
                  { border: "border-teal-200/80", hoverBorder: "hover:border-teal-400", glow: "hover:shadow-teal-500/30", accent: "bg-teal-400", corner: "bg-teal-200/50" },
                  { border: "border-rose-200/80", hoverBorder: "hover:border-rose-400", glow: "hover:shadow-rose-500/30", accent: "bg-rose-400", corner: "bg-rose-200/50" },
                ];
                const theme = CARD_THEMES[idx % CARD_THEMES.length];

                return (
                  <div
                    key={aw.id}
                    className={`group relative bg-gradient-to-b from-white to-amber-50/40
                      pt-14 pb-6 px-6 rounded-2xl border
                      ${theme.border} ${theme.hoverBorder}
                      shadow-md ${theme.glow}
                      hover:shadow-2xl hover:-translate-y-2
                      transition-all duration-500 overflow-visible`}
                  >
                    <MedalSeal gradient={gradient} Icon={Icon} />

                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute top-0 -left-full h-full w-1/2
                        bg-gradient-to-r from-transparent via-white/60 to-transparent
                        skew-x-[-25deg] group-hover:animate-[aw3-sweep_1.2s_ease-out]" />
                    </div>

                    <div
                      aria-hidden
                      className={`pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full ${theme.corner} blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                    />

                    <div className="relative space-y-3 z-10">
                      <span
                        className="inline-block text-[12px] font-bold uppercase tracking-wider text-white
                          px-3 py-1 bg-gradient-to-r from-blue-950 to-blue-900
                          shadow-sm group-hover:shadow-md group-hover:scale-105
                          transition-all duration-300"
                        style={{ clipPath: PENNANT_CLIP }}
                      >
                        {levelLabel[aw.level] || aw.level}
                      </span>

                      <h3 className="font-bold text-2xl text-gray-900 dark:text-white leading-snug
                        group-hover:text-blue-950 transition-colors duration-300">
                        {aw.title}
                      </h3>

                      {aw.description && (
                        <p className="text-base text-gray-800 dark:text-gray-400 leading-relaxed">
                          {aw.description}
                        </p>
                      )}

                      <div className={`h-[3px] w-8 rounded-full ${theme.accent}
                        group-hover:w-20 transition-all duration-500`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <CtaSection
            title="अपने विद्यालय को पंजीकृत करें"
            description="हिंदी एवं संस्कृत ओलंपियाड 2026-27 में सहभागिता हेतु आज ही पंजीकरण करें।"
            buttonText="अभी पंजीकरण करें"
            buttonRoute="/registration"
            badge="सीमित समय की पेशकश"
            className='mt-15'
          />

          {/* ============ Scholarships Section — NOW COLORFUL ============ */}
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading-hi text-red-950 dark:text-white">
                छात्रवृत्ति (Scholarships)
              </h2>
              <OrnamentalDivider />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scholarships.map((s, idx) => {
                const Icon = iconMap[s.icon] || Sparkles;

                // 6 colorful scholarship themes (rotating)
                const SCHOLARSHIP_THEMES = [
                  {
                    bg: "from-amber-50 via-yellow-50 to-orange-50",
                    border: "border-amber-300",
                    hoverBorder: "hover:border-amber-500",
                    ring: "border-amber-400",
                    glow: "hover:shadow-amber-500/40",
                    title: "text-amber-900",
                    iconShadow: "shadow-amber-500/50",
                    spark: "text-amber-500",
                    accent: "bg-amber-500",
                  },
                  {
                    bg: "from-blue-50 via-cyan-50 to-sky-50",
                    border: "border-blue-300",
                    hoverBorder: "hover:border-blue-500",
                    ring: "border-blue-400",
                    glow: "hover:shadow-blue-500/40",
                    title: "text-blue-900",
                    iconShadow: "shadow-blue-500/50",
                    spark: "text-blue-500",
                    accent: "bg-blue-500",
                  },
                  {
                    bg: "from-emerald-50 via-teal-50 to-green-50",
                    border: "border-emerald-300",
                    hoverBorder: "hover:border-emerald-500",
                    ring: "border-emerald-400",
                    glow: "hover:shadow-emerald-500/40",
                    title: "text-emerald-900",
                    iconShadow: "shadow-emerald-500/50",
                    spark: "text-emerald-500",
                    accent: "bg-emerald-500",
                  },
                  {
                    bg: "from-purple-50 via-fuchsia-50 to-violet-50",
                    border: "border-purple-300",
                    hoverBorder: "hover:border-purple-500",
                    ring: "border-purple-400",
                    glow: "hover:shadow-purple-500/40",
                    title: "text-purple-900",
                    iconShadow: "shadow-purple-500/50",
                    spark: "text-purple-500",
                    accent: "bg-purple-500",
                  },
                  {
                    bg: "from-rose-50 via-pink-50 to-red-50",
                    border: "border-rose-300",
                    hoverBorder: "hover:border-rose-500",
                    ring: "border-rose-400",
                    glow: "hover:shadow-rose-500/40",
                    title: "text-rose-900",
                    iconShadow: "shadow-rose-500/50",
                    spark: "text-rose-500",
                    accent: "bg-rose-500",
                  },
                  {
                    bg: "from-indigo-50 via-blue-50 to-violet-50",
                    border: "border-indigo-300",
                    hoverBorder: "hover:border-indigo-500",
                    ring: "border-indigo-400",
                    glow: "hover:shadow-indigo-500/40",
                    title: "text-indigo-900",
                    iconShadow: "shadow-indigo-500/50",
                    spark: "text-indigo-500",
                    accent: "bg-indigo-500",
                  },
                ];
                const theme = SCHOLARSHIP_THEMES[idx % SCHOLARSHIP_THEMES.length];

                return (
                  <div
                    key={s.id}
                    className={`group relative p-6 rounded-2xl border-2
                      bg-gradient-to-br ${theme.bg}
                      ${theme.border} ${theme.hoverBorder}
                      shadow-lg ${theme.glow}
                      hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
                      transition-all duration-500 ease-out
                      text-center space-y-3 overflow-hidden`}
                  >
                    {/* Shine sweep */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute top-0 -left-full h-full w-1/2
                        bg-gradient-to-r from-transparent via-white/70 to-transparent
                        skew-x-[-25deg] group-hover:animate-[aw3-sweep_1.2s_ease-out]" />
                    </div>

                    {/* Corner glow */}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full ${theme.accent} opacity-20 blur-3xl
                        group-hover:opacity-40 transition-opacity duration-500`}
                    />

                    {/* Bottom accent bar */}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-1 ${theme.accent}
                        w-8 group-hover:w-32 rounded-full transition-all duration-500`}
                    />

                    {/* Icon medallion with animated dashed ring */}
                    <div className="relative w-24 h-24 mx-auto">
                      <div
                        className={`absolute inset-0 rounded-full border-2 border-dashed ${theme.ring} opacity-80
                          group-hover:rotate-[135deg] transition-transform duration-700 aw3-ring-pulse`}
                      />
                      <div
                        aria-hidden
                        className={`absolute inset-2 rounded-full ${theme.accent} opacity-15 blur-md
                          group-hover:opacity-40 transition-opacity duration-500`}
                      />
                      <div
                        className={`absolute inset-3 rounded-full bg-gradient-to-br ${s.color}
                          flex items-center justify-center
                          shadow-xl ${theme.iconShadow} ring-4 ring-white/70
                          group-hover:scale-110 group-hover:rotate-12
                          transition-transform duration-500`}
                      >
                        <Icon className="w-8 h-8 text-white drop-shadow-md" />
                      </div>

                      {/* Sparkle badge */}
                      <span
                        aria-hidden
                        className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md
                          flex items-center justify-center text-xs font-black ${theme.spark}
                          group-hover:scale-110 group-hover:rotate-180 transition-all duration-500`}
                      >
                        ✦
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-2xl ${theme.title} relative z-10 leading-snug`}>
                      {s.title}
                    </h3>

                    {/* Colored underline under title */}
                    <div
                      className={`h-1 w-12 mx-auto rounded-full bg-gradient-to-r ${s.color}
                        group-hover:w-20 transition-all duration-500`}
                    />

                    {/* Description */}
                    <p className="text-medium text-gray-800 dark:text-gray-400 leading-relaxed relative z-10">
                      {s.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* School & Teacher Awards */}
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading-hi text-red-950 dark:text-white">
                विद्यालय एवं शिक्षक सम्मान
              </h2>
              <OrnamentalDivider />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16">
              {schoolTeacherAwards.map((aw) => {
                const Icon = iconMap[aw.icon] || Award;
                const gradient = aw.color || 'from-gray-600 to-gray-700';
                return (
                  <div
                    key={aw.id}
                    className="group relative bg-gradient-to-b from-white to-amber-50/60 dark:from-[#1A1414] dark:to-[#140F0F] pt-14 pb-6 px-6 rounded-2xl border border-amber-200/70 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-visible"
                  >
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute top-0 -left-full h-full w-1/2
                        bg-gradient-to-r from-transparent via-white/60 to-transparent
                        skew-x-[-25deg] group-hover:animate-[aw3-sweep_1.2s_ease-out]" />
                    </div>

                    <div aria-hidden className="pointer-events-none absolute -top-16 -left-16 w-40 h-40 rounded-full bg-rose-200/40 blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

                    <MedalSeal gradient={gradient} Icon={Icon} />
                    <div className="relative space-y-3 z-10">
                      <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                        {aw.title}
                      </h3>
                      <p className="text-medium text-gray-800 dark:text-gray-400 leading-relaxed">
                        {aw.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Report Features */}
          <div className="relative bg-gradient-to-br from-[#7B1E1E] via-[#541313] to-[#2A0A0A] text-[#F5F0E6] rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden border border-[#C79A2D]/30">

            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#C79A2D]/15 rounded-full blur-3xl pointer-events-none aw3-orb-a" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#C79A2D]/15 rounded-full blur-3xl pointer-events-none aw3-orb-b" />

            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] aw3-pattern rounded-3xl" />

            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-[12%] left-[18%] w-1.5 h-1.5 rounded-full bg-[#C79A2D] aw3-twinkle" />
              <div className="absolute top-[55%] right-[15%] w-1.5 h-1.5 rounded-full bg-amber-300 aw3-twinkle [animation-delay:1s]" />
              <div className="absolute bottom-[18%] left-[40%] w-1.5 h-1.5 rounded-full bg-[#C79A2D] aw3-twinkle [animation-delay:2s]" />
            </div>

            <div className="absolute inset-4 border border-[#C79A2D]/25 rounded-2xl pointer-events-none hidden sm:block" />
            <ChakraMark className="w-6 h-6 absolute top-6 left-6 opacity-70 hidden sm:block aw3-chakra-spin" />
            <ChakraMark className="w-6 h-6 absolute top-6 right-6 opacity-70 hidden sm:block aw3-chakra-spin [animation-duration:35s]" />

            <div className="relative z-10 space-y-8">
              <div className="text-center space-y-3">
                <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-white">
                  प्रदर्शन रिपोर्ट की <span className="text-[#C79A2D]">विशेषताएं</span>
                </h3>
                <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#C79A2D]" />
                  <span className="w-2 h-2 rotate-45 bg-[#C79A2D]" />
                  <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#C79A2D]" />
                </div>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  प्रत्येक विद्यार्थी को प्राप्त होने वाली रिपोर्ट की प्रमुख विशेषताएँ
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {performanceFeatures.map((pf) => {
                  const Icon = iconMap[pf.icon] || Activity;
                  return (
                    <div
                      key={pf.id}
                      className="group relative bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-[#C79A2D]/40 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/10 text-center space-y-3 overflow-hidden"
                    >
                      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                        <div className="absolute top-0 -left-full h-full w-1/2
                          bg-gradient-to-r from-transparent via-white/20 to-transparent
                          skew-x-[-25deg] group-hover:animate-[aw3-sweep_1.2s_ease-out]" />
                      </div>

                      <Star className={`absolute top-3 right-3 w-3.5 h-3.5 text-[#C79A2D]/60 aw3-twinkle`} />

                      <div
                        className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${pf.color} mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 aw3-seal-pop`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-white relative z-10">{pf.title}</h4>
                      <p className="text-sm text-gray-300 leading-relaxed relative z-10">
                        {pf.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quote – engraved plaque */}
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#014a7a] to-[#031c3d] rounded-2xl px-8 sm:px-14 py-10 text-center shadow-xl border border-[#C79A2D]/40 overflow-hidden">

              <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#C79A2D]/20 rounded-full blur-3xl pointer-events-none aw3-orb-a" />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#C79A2D]/20 rounded-full blur-3xl pointer-events-none aw3-orb-b" />

              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08] aw3-pattern rounded-2xl" />

              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute top-[20%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#C79A2D] aw3-twinkle" />
                <div className="absolute bottom-[25%] left-[12%] w-1.5 h-1.5 rounded-full bg-amber-300 aw3-twinkle [animation-delay:1s]" />
              </div>

              <span className="absolute top-1 left-4 font-playfair text-7xl text-[#C79A2D]/25 select-none leading-none">
                "
              </span>
              <span className="absolute bottom-1 right-4 font-playfair text-7xl text-[#C79A2D]/25 select-none leading-none">
                "
              </span>
              <div className="relative z-10 space-y-4">
                <ChakraMark className="w-6 h-6 mx-auto opacity-80 aw3-chakra-spin" />
                <p className="text-xl sm:text-2xl font-devanagari text-amber-50 italic leading-relaxed">
                  {quote.text}
                </p>
                <p className="text-sm text-[#C79A2D] font-bold tracking-widest">
                  – {quote.author}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AwardsPage;