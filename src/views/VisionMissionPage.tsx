'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { VISION_MISSION as VISION_MISSION_STATIC } from '../data/olympiadData';
import {
  Compass,
  Target,
  ChevronRight,
  Quote,
  ShieldCheck,
  Sparkles,
  Award,
  Heart,
  Star,
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

import { useSiteContent } from '@/hooks/useSiteContent';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Sparkles,
  Award,
  Heart,
  Star,
  Compass,
  Target,
};

// Vibrant gradient map for each core value
const colorMap: Record<string, string> = {
  emerald: 'from-emerald-400 via-emerald-500 to-teal-600',
  blue: 'from-blue-400 via-blue-500 to-cyan-600',
  amber: 'from-amber-400 via-orange-500 to-amber-600',
  rose: 'from-rose-400 via-pink-500 to-rose-600',
  purple: 'from-purple-400 via-violet-500 to-fuchsia-600',
};

// Glow colors for each value theme
const glowMap: Record<string, string> = {
  emerald: 'shadow-emerald-500/50 hover:shadow-emerald-500/80 hover:border-emerald-400/60',
  blue: 'shadow-blue-500/50 hover:shadow-blue-500/80 hover:border-blue-400/60',
  amber: 'shadow-amber-500/50 hover:shadow-amber-500/80 hover:border-amber-400/60',
  rose: 'shadow-rose-500/50 hover:shadow-rose-500/80 hover:border-rose-400/60',
  purple: 'shadow-purple-500/50 hover:shadow-purple-500/80 hover:border-purple-400/60',
};

export const VisionMissionPage: React.FC = () => {
  const VISION_MISSION = useSiteContent<typeof VISION_MISSION_STATIC>('vision_mission_page', VISION_MISSION_STATIC);
  const { language } = useApp();
  const { vision, mission, coreValues, quote } = VISION_MISSION;

  return (
    <>
      <div className="relative overflow-hidden">
        {/* ============ BACKGROUND LAYERS ============ */}

        {/* 1) Animated dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]
            bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
            bg-[length:60px_60px,80px_80px] vm-grid-pan"
        />

        {/* 2) Diagonal color stripes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]
            bg-[repeating-linear-gradient(45deg,#7c3aed_0px,#7c3aed_1px,transparent_1px,transparent:22px)]"
        />

        {/* 3) Cross grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]
            bg-[linear-gradient(#64748b_1px,transparent_1px),linear-gradient(90deg,#64748b_1px,transparent_1px)]
            bg-[length:90px_90px]"
        />

        {/* 4) Drifting color orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[8%] left-[5%] w-80 h-80 rounded-full bg-blue-300/30 blur-3xl vm-orb-a" />
          <div className="absolute top-[35%] right-[4%] w-72 h-72 rounded-full bg-purple-300/30 blur-3xl vm-orb-b" />
          <div className="absolute bottom-[15%] left-[30%] w-80 h-80 rounded-full bg-amber-300/25 blur-3xl vm-orb-c" />
          <div className="absolute bottom-[5%] right-[20%] w-64 h-64 rounded-full bg-emerald-300/25 blur-3xl vm-orb-a [animation-delay:-5s]" />
          <div className="absolute top-[55%] left-[3%] w-56 h-56 rounded-full bg-rose-300/20 blur-3xl vm-orb-b [animation-delay:-8s]" />
        </div>

        {/* 5) Rotating dashed rings */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] right-[8%] w-44 h-44 rounded-full border-2 border-dashed border-blue-300/40 vm-spin-slow" />
          <div className="absolute bottom-[15%] left-[6%] w-56 h-56 rounded-full border border-dashed border-amber-300/40 vm-spin-rev" />
          <div className="absolute top-[50%] right-[15%] w-32 h-32 rounded-full border-2 border-dotted border-purple-300/40 vm-spin-slow [animation-duration:30s]" />
        </div>

        {/* 6) Light sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3
            bg-gradient-to-r from-transparent via-white/50 to-transparent
            skew-x-[-25deg] vm-sweep"
        />

        {/* 7) Twinkling stars */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[15%] left-[14%] w-2 h-2 rounded-full bg-amber-400 vm-twinkle" />
          <div className="absolute top-[45%] right-[22%] w-1.5 h-1.5 rounded-full bg-blue-400 vm-twinkle [animation-delay:0.8s]" />
          <div className="absolute bottom-[25%] left-[45%] w-2 h-2 rounded-full bg-emerald-400 vm-twinkle [animation-delay:1.6s]" />
          <div className="absolute top-[70%] right-[10%] w-1.5 h-1.5 rounded-full bg-purple-400 vm-twinkle [animation-delay:2.4s]" />
          <div className="absolute top-[35%] left-[55%] w-1.5 h-1.5 rounded-full bg-rose-400 vm-twinkle [animation-delay:3.2s]" />
        </div>

        {/* 8) Floating decorative icons */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[12%] left-[8%] text-amber-400/20 vm-float">
            <Compass className="w-16 h-16" />
          </div>
          <div className="absolute top-[20%] right-[12%] text-blue-400/20 vm-float-slow">
            <Target className="w-16 h-16" />
          </div>
          <div className="absolute bottom-[18%] left-[12%] text-emerald-400/20 vm-drift">
            <Award className="w-14 h-14" />
          </div>
          <div className="absolute bottom-[12%] right-[10%] text-purple-400/20 vm-float [animation-delay:-3s]">
            <Heart className="w-14 h-14" />
          </div>
          <div className="absolute top-[45%] left-[48%] text-rose-400/15 vm-drift [animation-delay:-4s]">
            <Star className="w-12 h-12" />
          </div>
        </div>

        {/* Content wrapper */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 z-10">
          <Breadcrumb
            title="दृष्टि एवं उद्देश्य"
            items={[
              {
                label: "परिचय",
                route: "/about",
              },
              {
                label: "दृष्टि एवं उद्देश्य",
              },
            ]}
          />

          {/* Page Hero */}
          <SectionHeader
            icon={Compass}
            badge="हमारी सोच • हमारा संकल्प"
            title="दृष्टि एवं उद्देश्य"
          />

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ============ VISION CARD — Dark + Amber accent ============ */}
            <div className="group relative rounded-[32px] p-8 sm:p-10 overflow-hidden
    bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950
    border border-amber-500/25
    shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6),0_0_50px_-20px_rgba(251,191,36,0.3)]
    hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_80px_-20px_rgba(251,191,36,0.55)]
    hover:-translate-y-3 transition-all duration-500">

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px]
      bg-gradient-to-r from-transparent via-amber-400 to-transparent vm-shimmer" />

              {/* Giant watermark number */}
              <span aria-hidden
                className="absolute -top-6 right-4 text-[180px] sm:text-[220px] font-black leading-none select-none
        text-amber-400/[0.07] group-hover:text-amber-400/[0.12] transition-colors duration-700">
                01
              </span>

              {/* Floating gradient orbs */}
              <div aria-hidden className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full
      bg-amber-500/25 blur-3xl vm-orb-a" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full
      bg-rose-500/20 blur-3xl vm-orb-b" />

              {/* Rotating ring */}
              <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full
      border border-dashed border-amber-400/20 vm-spin-slow" />

              {/* Shine sweep on hover */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
                <div className="absolute top-0 -left-full h-full w-1/2
        bg-gradient-to-r from-transparent via-amber-200/20 to-transparent
        skew-x-[-25deg] group-hover:animate-[vm-sweep_1.2s_ease-out]" />
              </div>

              {/* Twinkling sparkles */}
              <Sparkles className="absolute top-6 right-8 w-5 h-5 text-amber-400/80 vm-twinkle" />
              <Star className="absolute top-1/2 right-12 w-4 h-4 text-amber-300/60 vm-twinkle [animation-delay:1.2s]" />

              <div className="relative z-10 space-y-6">
                {/* Label + Icon */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl
          bg-gradient-to-br from-amber-400 to-orange-500
          flex items-center justify-center
          shadow-lg shadow-amber-500/50
          text-[#0B0B1A]
          group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Compass className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-400/80">
                      Vision
                    </p>
                    <h2 className="font-playfair text-3xl sm:text-4xl font-black text-amber-50 mt-1 leading-tight">
                      {vision.title}
                    </h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

                {/* Description */}
                <p className="text-lg text-amber-50/85 leading-relaxed font-devanagari">
                  {vision.description}
                </p>

                {/* Footer link */}
                <div className="flex items-center gap-2 pt-2 text-amber-300 font-bold text-sm
        group-hover:gap-4 transition-all duration-500">
                  <span className="tracking-widest uppercase">हमारी दूरदृष्टि</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* ============ MISSION CARD — Light + Rose/Amber accent ============ */}
            <div className="group relative rounded-[32px] p-8 sm:p-10 overflow-hidden
    bg-gradient-to-br from-white via-rose-50 to-amber-50
    border border-rose-200/70
    shadow-[0_20px_60px_-20px_rgba(244,63,94,0.3)]
    hover:shadow-[0_30px_80px_-20px_rgba(244,63,94,0.5)]
    hover:-translate-y-3 transition-all duration-500">

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px]
      bg-gradient-to-r from-transparent via-rose-500 to-transparent vm-shimmer [animation-delay:1s]" />

              {/* Giant watermark number */}
              <span aria-hidden
                className="absolute -top-6 right-4 text-[180px] sm:text-[220px] font-black leading-none select-none
        bg-gradient-to-br from-rose-500 to-amber-500 bg-clip-text text-transparent opacity-[0.12]
        group-hover:opacity-25 transition-opacity duration-700">
                02
              </span>

              {/* Corner gradient glow */}
              <div aria-hidden className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full
      bg-rose-300/40 blur-3xl vm-orb-b" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full
      bg-amber-300/40 blur-3xl vm-orb-c" />

              {/* Rotating ring */}
              <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full
      border border-dashed border-rose-400/25 vm-spin-rev" />

              {/* Shine sweep on hover */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
                <div className="absolute top-0 -left-full h-full w-1/2
        bg-gradient-to-r from-transparent via-white/60 to-transparent
        skew-x-[-25deg] group-hover:animate-[vm-sweep_1.2s_ease-out]" />
              </div>

              {/* Twinkling sparkles */}
              <Sparkles className="absolute top-6 right-8 w-5 h-5 text-rose-500/70 vm-twinkle [animation-delay:0.6s]" />
              <Star className="absolute top-1/2 right-12 w-4 h-4 text-amber-500/60 vm-twinkle [animation-delay:1.8s]" />

              <div className="relative z-10 space-y-6">
                {/* Label + Icon */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl
          bg-gradient-to-br from-rose-500 to-amber-500
          flex items-center justify-center
          shadow-lg shadow-rose-500/50 text-white
          group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-rose-500">
                      Mission
                    </p>
                    <h2 className="font-playfair text-3xl sm:text-4xl font-black text-[#0B0B1A] mt-1 leading-tight">
                      {mission.title}
                    </h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-rose-300 to-transparent" />

                {/* Items list — numbered pills */}
                <ul className="space-y-3">
                  {mission.items.map((item, idx) => (
                    <li key={idx} className="group/item flex gap-3 items-start">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-500 to-amber-500
              text-white text-lg font-black flex items-center justify-center shrink-0 mt-0.5
              shadow-md shadow-rose-500/40
              group-hover/item:scale-110 group-hover/item:rotate-6 transition-transform duration-300">
                        {idx + 1}
                      </span>
                      <span className="text-medium sm:text-lg text-[#0B0B1A]/80 font-devanagari leading-relaxed
              group-hover/item:text-[#0B0B1A] transition-colors duration-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer link */}
                <div className="flex items-center gap-2 pt-2 text-rose-600 font-bold text-sm
        group-hover:gap-4 transition-all duration-500">
                  <span className="tracking-widest uppercase">हमारे लक्ष्य</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="relative rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden
  bg-gradient-to-br from-[#1A0A0A] via-[#2A0E0E] to-[#0F0505]
  border-2 border-transparent vm-glow-pulse">

            {/* Animated rainbow border */}
            <div aria-hidden className="absolute inset-0 rounded-3xl p-[2px] -z-10
    bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 via-blue-500 via-purple-500 to-red-500 vm-border-flow">
              <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-[#1A0A0A] via-[#2A0E0E] to-[#0F0505]" />
            </div>

            {/* Dot texture overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.08] rounded-3xl
      bg-[radial-gradient(#FBBF24_1px,transparent_1px)]
      [bg-size:26px_26px] vm-grid-pan"
            />

            {/* Drifting glow orbs */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#C79A2D]/25 rounded-full blur-3xl vm-orb-a" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#C79A2D]/25 rounded-full blur-3xl vm-orb-b" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl vm-orb-c" />
            </div>

            {/* Rotating dashed rings */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-[15%] right-[10%] w-40 h-40 rounded-full border-2 border-dashed border-amber-400/20 vm-spin-slow" />
              <div className="absolute bottom-[10%] left-[8%] w-48 h-48 rounded-full border border-dashed border-amber-400/15 vm-spin-rev" />
            </div>

            {/* Twinkling stars */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-[12%] left-[18%] w-2 h-2 rounded-full bg-amber-400 vm-twinkle" />
              <div className="absolute top-[55%] right-[15%] w-1.5 h-1.5 rounded-full bg-amber-300 vm-twinkle [animation-delay:1s]" />
              <div className="absolute bottom-[15%] left-[40%] w-2 h-2 rounded-full bg-amber-400 vm-twinkle [animation-delay:2s]" />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="text-center space-y-3">
                <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-white">
                  संस्था के <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">५ मूल सिद्धांत</span>
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C79A2D] to-transparent mx-auto rounded-full" />
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  ये पाँच सिद्धांत हमारी हर पहल, मूल्यांकन और निर्णय का आधार हैं।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {coreValues.map((value) => {
                  const Icon = iconMap[value.icon] || ShieldCheck;

                  // Vibrant colorful card themes (one per value)
                  const CARD_COLORS: Record<string, {
                    bg: string;
                    hoverBg: string;
                    glow: string;
                    ring: string;
                    iconBg: string;
                    dot: string;
                  }> = {
                    emerald: {
                      bg: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700',
                      hoverBg: 'hover:from-emerald-400 hover:via-emerald-500 hover:to-teal-600',
                      glow: 'shadow-emerald-500/40 hover:shadow-emerald-400/60',
                      ring: 'ring-emerald-300/40',
                      iconBg: 'bg-white/25',
                      dot: 'bg-emerald-200',
                    },
                    blue: {
                      bg: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700',
                      hoverBg: 'hover:from-blue-400 hover:via-blue-500 hover:to-indigo-600',
                      glow: 'shadow-blue-500/40 hover:shadow-blue-400/60',
                      ring: 'ring-blue-300/40',
                      iconBg: 'bg-white/25',
                      dot: 'bg-blue-200',
                    },
                    amber: {
                      bg: 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-600',
                      hoverBg: 'hover:from-amber-400 hover:via-orange-400 hover:to-red-500',
                      glow: 'shadow-amber-500/40 hover:shadow-amber-400/60',
                      ring: 'ring-amber-300/40',
                      iconBg: 'bg-white/25',
                      dot: 'bg-amber-200',
                    },
                    rose: {
                      bg: 'bg-gradient-to-br from-rose-500 via-pink-600 to-red-700',
                      hoverBg: 'hover:from-rose-400 hover:via-pink-500 hover:to-red-600',
                      glow: 'shadow-rose-500/40 hover:shadow-rose-400/60',
                      ring: 'ring-rose-300/40',
                      iconBg: 'bg-white/25',
                      dot: 'bg-rose-200',
                    },
                    purple: {
                      bg: 'bg-gradient-to-br from-purple-500 via-violet-600 to-fuchsia-700',
                      hoverBg: 'hover:from-purple-400 hover:via-violet-500 hover:to-fuchsia-600',
                      glow: 'shadow-purple-500/40 hover:shadow-purple-400/60',
                      ring: 'ring-purple-300/40',
                      iconBg: 'bg-white/25',
                      dot: 'bg-purple-200',
                    },
                  };

                  const card = CARD_COLORS[value.color] || CARD_COLORS.amber;

                  return (
                    <div
                      key={value.id}
                      className={`group relative ${card.bg} ${card.hoverBg} p-6 rounded-2xl
              border border-white/20 ${card.ring} ring-1
              shadow-xl ${card.glow}
              transition-all duration-500
              hover:-translate-y-3 hover:scale-[1.03]
              text-center space-y-3 overflow-hidden`}
                    >
                      {/* Shine sweep on hover */}
                      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                        <div className="absolute top-0 -left-full h-full w-1/2
                bg-gradient-to-r from-transparent via-white/40 to-transparent
                skew-x-[-25deg] group-hover:animate-[vm-sweep_1.2s_ease-out]" />
                      </div>

                      {/* Soft inner glow blob */}
                      <div aria-hidden className="pointer-events-none absolute -top-12 -right-12 w-32 h-32
              rounded-full bg-white/20 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-12 w-28 h-28
              rounded-full bg-white/15 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Twinkling sparkles */}
                      <Sparkles className="absolute top-3 right-3 w-3.5 h-3.5 text-white/80 vm-twinkle" />
                      <Star className="absolute bottom-3 left-3 w-3 h-3 text-white/60 vm-twinkle [animation-delay:1.2s]" />

                      {/* Number badge */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full
              bg-white/25 backdrop-blur-sm text-white text-[10px] font-black tracking-widest">
                        {String(value.id).padStart(2, '0')}
                      </span>

                      {/* Icon medallion */}
                      <div
                        className={`relative w-14 h-14 rounded-2xl ${card.iconBg} backdrop-blur-sm
                mx-auto flex items-center justify-center
                border border-white/30
                shadow-lg group-hover:scale-110 group-hover:rotate-6
                transition-transform duration-500`}
                      >
                        <Icon className="w-7 h-7 text-white drop-shadow-md" />
                      </div>

                      {/* Title */}
                      <h4 className="relative font-bold text-lg text-white drop-shadow-sm">
                        {value.title}
                      </h4>

                      {/* Underline */}
                      <div className={`relative h-1 w-8 mx-auto rounded-full ${card.dot}
              group-hover:w-16 transition-all duration-500`} />

                      {/* Description */}
                      <p className="relative text-base text-white/90 leading-relaxed drop-shadow-sm">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quote */}
              <div className="relative pt-6 border-t border-white/10 flex flex-col items-center gap-3">
                <Quote className="w-10 h-10 text-[#C79A2D]/60 vm-float" />
                <p className="text-lg text-gray-200 italic text-center max-w-2xl
        bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
                  {quote.text}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-10 h-0.5 bg-gradient-to-r from-transparent to-[#C79A2D] rounded-full" />
                  <span className="text-xs text-[#C79A2D] font-bold tracking-widest uppercase">
                    {quote.author}
                  </span>
                  <span className="w-10 h-0.5 bg-gradient-to-l from-transparent to-[#C79A2D] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionMissionPage;