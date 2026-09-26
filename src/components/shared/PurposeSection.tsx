'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Target,
  BookOpen,
  BarChart3,
  Award,
  Globe,
  Sparkles,
  GraduationCap,
  Heart,
} from 'lucide-react';
import Image from 'next/image';
import SectionHeader from './SectionHeader';

const purposeData = [
  {
    id: 1,
    icon: BookOpen,
    title: 'भाषा संरक्षण एवं संवर्धन',
    description:
      'हिंदी और संस्कृत का प्रचार-प्रसार कर इन भाषाओं को नई पीढ़ी तक पहुँचाना एवं उनके प्रति प्रेम, सम्मान और गर्व की भावना जागृत करना।',
    color: 'from-red-800 to-red-900',
    hoverBg: 'from-red-700 via-red-800 to-red-950',
    hoverBorder: 'border-red-400',
    hoverGlow: 'shadow-red-500/40',
    hoverShadow: 'hover:shadow-red-500/30',
    accent: 'bg-red-500',
  },
  {
    id: 2,
    icon: BarChart3,
    title: 'बेंचमार्क आधारित मूल्यांकन',
    description:
      'रैंकिंग पर नहीं, बल्कि सीखने की प्रगति, क्षमताओं और कमियों की सकारात्मक पहचान पर ध्यान केंद्रित करना।',
    color: 'from-amber-600 to-amber-700',
    hoverBg: 'from-amber-500 via-amber-600 to-amber-800',
    hoverBorder: 'border-amber-400',
    hoverGlow: 'shadow-amber-500/40',
    hoverShadow: 'hover:shadow-amber-500/30',
    accent: 'bg-amber-500',
  },
  {
    id: 3,
    icon: GraduationCap,
    title: 'राष्ट्रीय शिक्षा नीति 2020',
    description:
      'बहुभाषिक शिक्षा, भारतीय ज्ञान परंपरा, समग्र एवं योग्यता आधारित शिक्षा के NEP 2020 सिद्धांतों से पूर्णतः संरेखित।',
    color: 'from-emerald-700 to-emerald-800',
    hoverBg: 'from-emerald-600 via-emerald-700 to-emerald-900',
    hoverBorder: 'border-emerald-400',
    hoverGlow: 'shadow-emerald-500/40',
    hoverShadow: 'hover:shadow-emerald-500/30',
    accent: 'bg-emerald-500',
  },
  {
    id: 4,
    icon: Award,
    title: 'प्रतिभा का सम्मान',
    description:
      'प्रत्येक विद्यार्थी की मेहनत को पुरस्कार, छात्रवृत्ति, प्रमाण-पत्र और राष्ट्रीय स्तर की पहचान के माध्यम से सराहना।',
    color: 'from-blue-700 to-blue-800',
    hoverBg: 'from-blue-600 via-blue-700 to-blue-900',
    hoverBorder: 'border-blue-400',
    hoverGlow: 'shadow-blue-500/40',
    hoverShadow: 'hover:shadow-blue-500/30',
    accent: 'bg-blue-500',
  },
  {
    id: 5,
    icon: Heart,
    title: 'सांस्कृतिक जड़ों से जुड़ाव',
    description:
      'भारतीय ज्ञान परंपरा, संस्कृति और विरासत से विद्यार्थियों को परिचित कराना तथा उनमें राष्ट्रीय गर्व का संचार करना।',
    color: 'from-rose-700 to-rose-800',
    hoverBg: 'from-rose-600 via-rose-700 to-rose-900',
    hoverBorder: 'border-rose-400',
    hoverGlow: 'shadow-rose-500/40',
    hoverShadow: 'hover:shadow-rose-500/30',
    accent: 'bg-rose-500',
  },
  {
    id: 6,
    icon: Globe,
    title: 'समग्र विकास',
    description:
      'भाषाई दक्षता, बौद्धिक क्षमता, विश्लेषणात्मक चिंतन, आत्मविश्वास एवं व्यक्तित्व विकास का समग्र संवर्धन।',
    color: 'from-purple-700 to-purple-800',
    hoverBg: 'from-purple-600 via-purple-700 to-purple-900',
    hoverBorder: 'border-purple-400',
    hoverGlow: 'shadow-purple-500/40',
    hoverShadow: 'hover:shadow-purple-500/30',
    accent: 'bg-purple-500',
  },
];

export const PurposeSection: React.FC = () => {
  const { language } = useApp();

  return (
    <>
      <section className="relative py-16 overflow-hidden
        bg-gradient-to-b from-amber-50/40 via-white to-amber-100/30">

        {/* ============ Background Layers ============ */}

        {/* Animated dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]
            bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
            bg-[length:60px_60px,80px_80px] purpose-grid-pan"
        />

        {/* Diagonal stripes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]
            bg-[repeating-linear-gradient(45deg,#790e03_0px,#790e03_1px,transparent_1px,transparent:20px)]"
        />

        {/* Drifting color orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-red-300/25 blur-3xl purpose-orb-a" />
          <div className="absolute top-[35%] right-[5%] w-80 h-80 rounded-full bg-amber-300/25 blur-3xl purpose-orb-b" />
          <div className="absolute bottom-[8%] left-[30%] w-80 h-80 rounded-full bg-emerald-300/20 blur-3xl purpose-orb-a [animation-delay:-5s]" />
          <div className="absolute bottom-[20%] right-[20%] w-64 h-64 rounded-full bg-purple-300/20 blur-3xl purpose-orb-b [animation-delay:-8s]" />
        </div>

        {/* Rotating dashed rings */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[12%] right-[8%] w-44 h-44 rounded-full border-2 border-dashed border-amber-300/40 purpose-spin-slow" />
          <div className="absolute bottom-[12%] left-[6%] w-52 h-52 rounded-full border border-dashed border-red-300/35 purpose-spin-rev" />
        </div>

        {/* Floating decorative icons */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[8%] left-[8%] text-amber-400/25 purpose-float">
            <Sparkles className="w-10 h-10" />
          </div>
          <div className="absolute top-[18%] right-[10%] text-red-400/25 purpose-float-slow">
            <Target className="w-12 h-12" />
          </div>
          <div className="absolute bottom-[15%] left-[12%] text-emerald-400/20 purpose-drift">
            <BookOpen className="w-10 h-10" />
          </div>
          <div className="absolute bottom-[10%] right-[15%] text-purple-400/20 purpose-float [animation-delay:-3s]">
            <Award className="w-11 h-11" />
          </div>
        </div>

        {/* Twinkling stars */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[25%] left-[22%] w-2 h-2 rounded-full bg-amber-400 purpose-twinkle" />
          <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 rounded-full bg-red-400 purpose-twinkle [animation-delay:0.8s]" />
          <div className="absolute bottom-[30%] left-[40%] w-2 h-2 rounded-full bg-emerald-400 purpose-twinkle [animation-delay:1.6s]" />
          <div className="absolute top-[45%] right-[40%] w-1.5 h-1.5 rounded-full bg-purple-400 purpose-twinkle [animation-delay:2.4s]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Section Heading */}
          <SectionHeader
            icon={Target}
            badge="हमारा संकल्प"
            title="हमारा उद्देश्य"
            description='भारती भाषा ओलंपियाड का लक्ष्य भारतीय भाषाओं को नई पीढ़ी से जोड़ना,
              उनकी क्षमताओं को वैज्ञानिक तरीके से आँकना और उन्हें समग्र रूप से
              विकसित करना है।'
          />

          {/* Purpose Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purposeData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`group relative p-6 rounded-2xl cursor-pointer
                    bg-white/90 backdrop-blur-sm border-2 border-amber-200/60
                    shadow-md transition-all duration-500 overflow-hidden
                    hover:-translate-y-3 hover:scale-[1.02]
                    hover:border-transparent ${item.hoverShadow}`}
                >
                  {/* ============ Hover: Dark colored background layer ============ */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.hoverBg}
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0`}
                  />

                  {/* ============ Top accent bar ============ */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}
                      transition-all duration-500
                      group-hover:h-1.5 group-hover:shadow-lg`}
                  />

                  {/* ============ Bottom accent bar (appears on hover) ============ */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0 ${item.accent}
                      opacity-0 group-hover:h-1.5 group-hover:opacity-100
                      transition-all duration-500`}
                  />

                  {/* ============ Shine sweep on hover ============ */}
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div
                      className={`absolute top-0 -left-full h-full w-1/2
                        bg-gradient-to-r from-transparent via-white/40 to-transparent
                        skew-x-[-25deg] group-hover:animate-[purpose-sweep_1.2s_ease-out]`}
                    />
                  </div>

                  {/* ============ Decorative corner dot (light mode) ============ */}
                  <div
                    className={`absolute bottom-3 right-3 w-2 h-2 rounded-full ${item.accent}/50
                      group-hover:bg-white/60 group-hover:scale-150
                      transition-all duration-500`}
                  />

                  {/* ============ Icon box ============ */}
                  <div
                    className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color}
                      flex items-center justify-center shadow-lg
                      transform group-hover:scale-110 group-hover:rotate-6
                      transition-transform duration-500
                      group-hover:shadow-2xl`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* ============ Title ============ */}
                  <h3
                    className="relative z-10 text-2xl font-bold font-heading-hi text-red-950 mt-4
                      transition-colors duration-500
                      group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                  >
                    {item.title}
                  </h3>

                  {/* ============ Description ============ */}
                  <p
                    className="relative z-10 text-lg text-slate-900 font-devanagari leading-relaxed mt-2
                      transition-colors duration-500
                      group-hover:text-white/95"
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ============ Bottom Quote / Callout ============ */}
          <div className="mt-16 text-center">
            <div
              className="group relative inline-block overflow-hidden w-full max-w-4xl mx-auto
      bg-gradient-to-br from-red-950 via-red-950 to-red-900
      px-8 sm:px-16 py-10 sm:py-12 rounded-[32px]
      border border-amber-400/25
      shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8),0_0_50px_-15px_rgba(251,191,36,0.25)]
      hover:scale-[1.02]
      hover:border-amber-400/50
      hover:shadow-[0_25px_70px_-20px_rgba(0,0,0,0.9),0_0_80px_-15px_rgba(251,191,36,0.5)]
      transition-all duration-500 ease-out"
            >
              {/* ===== Elegant gold top border ===== */}
              <div
                aria-hidden
                className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-3/4
        bg-gradient-to-r from-transparent via-amber-400 to-transparent
        purpose-shimmer"
              />

              {/* ===== Elegant gold bottom border ===== */}
              <div
                aria-hidden
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-3/4
        bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              />

              {/* ===== Soft aurora glows ===== */}
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
                <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-amber-500/20 blur-[80px] purpose-orb-a" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-rose-600/20 blur-[80px] purpose-orb-b" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full bg-purple-500/15 blur-[80px] purpose-orb-a [animation-delay:-8s]" />
              </div>

              {/* ===== Subtle radial spotlight ===== */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[32px]
        bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08),transparent_65%)]"
              />

              {/* ===== Decorative quote marks ===== */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-4 left-6 text-[100px] sm:text-[120px] font-serif leading-none select-none
        bg-gradient-to-br from-amber-300/40 to-amber-500/10 bg-clip-text text-transparent
        group-hover:from-amber-300/70 group-hover:to-amber-500/30
        transition-all duration-700"
              >
                "
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-6 text-[100px] sm:text-[120px] font-serif leading-none select-none rotate-180
        bg-gradient-to-br from-amber-300/40 to-amber-500/10 bg-clip-text text-transparent
        group-hover:from-amber-300/70 group-hover:to-amber-500/30
        transition-all duration-700"
              >
                "
              </div>

              {/* ===== Twinkling sparkles ===== */}
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
                <Sparkles className="absolute top-6 right-10 w-5 h-5 text-amber-300/80 purpose-twinkle" />
                <Sparkles className="absolute bottom-8 left-12 w-4 h-4 text-rose-400/70 purpose-twinkle [animation-delay:1s]" />
                <Sparkles className="absolute top-1/2 right-16 w-4 h-4 text-purple-300/60 purpose-twinkle [animation-delay:2s]" />
              </div>

              {/* ===== Main quote text ===== */}
              <p className="relative z-10 text-xl sm:text-2xl md:text-[28px] font-bold font-devanagari leading-[1.6] tracking-tight">
                <span className="text-amber-50/90">
                  "हम रैंकिंग में नहीं, बल्कि विकास और प्रगति में विश्वास करते हैं।"
                </span>
                <br />
                <span className="inline-block mt-2
        bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200
        bg-clip-text text-transparent
        drop-shadow-[0_0_20px_rgba(251,191,36,0.35)]">
                  हर बच्चा अद्वितीय है
                </span>
                <span className="text-amber-100/70 font-medium">
                  {" "}– हम उसे उसकी गति से आगे बढ़ने देते हैं।
                </span>
              </p>

              {/* ===== Signature divider ===== */}
              <div className="relative z-10 flex items-center justify-center gap-4 mt-7">
                <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full
        bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400
        text-[#7B1E1E] text-xs sm:text-sm font-black tracking-widest uppercase
        shadow-[0_0_25px_rgba(251,191,36,0.5)]
        group-hover:shadow-[0_0_40px_rgba(251,191,36,0.8)]
        group-hover:scale-105
        transition-all duration-500">
                  <Sparkles className="w-3.5 h-3.5" />
                  भारती भाषा ओलंपियाड
                </span>

                <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-amber-400/70 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PurposeSection;