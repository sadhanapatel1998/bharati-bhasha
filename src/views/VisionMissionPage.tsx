'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { VISION_MISSION } from '../data/olympiadData';
import Image from 'next/image';
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

// Map color strings to gradient classes
const colorMap: Record<string, string> = {
  emerald: 'from-emerald-600 to-emerald-700',
  blue: 'from-blue-600 to-blue-700',
  amber: 'from-amber-600 to-amber-700',
  rose: 'from-rose-600 to-rose-700',
  purple: 'from-purple-600 to-purple-700',
};

export const VisionMissionPage: React.FC = () => {
  const { language } = useApp();
  const { vision, mission, coreValues, quote } = VISION_MISSION;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      <Breadcrumb
        title="लक्ष्य एवं उद्देश्य"
        items={[
          {
            label: "परिचय",
            route: "/about",
          },
          {
            label: "लक्ष्य एवं उद्देश्य",
          },
        ]}
      />

      {/* Page Hero */}
      <SectionHeader
        icon={Compass}
        badge="हमारी सोच • हमारा संकल्प"
        title="दृष्टि एवं उद्देश्य"
        className="py-6"
      />

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div className="group relative bg-white/90 dark:bg-[#1A1414] p-8 rounded-3xl border border-amber-200/60 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-800 to-amber-500" />
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-800 to-amber-700 text-white flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-red-950 dark:text-white mb-3">
            {vision.title} <span className="text-amber-600 text-lg">(Vision)</span>
          </h2>
          <p className="text-lg text-slate-700 dark:text-gray-300 leading-relaxed font-devanagari">
            {vision.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-amber-600 text-sm font-bold">
            <span>हमारी दूरदृष्टि</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Mission Card */}
        <div className="group relative bg-white/90 dark:bg-[#1A1414] p-8 rounded-3xl border border-amber-200/60 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-red-800" />
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-red-950 dark:text-white mb-3">
            {mission.title} <span className="text-amber-600 text-lg">(Mission)</span>
          </h2>
          <ul className="space-y-3 text-lg text-slate-700 dark:text-gray-300 font-devanagari list-disc list-inside">
            {mission.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 text-amber-600 text-sm font-bold">
            <span>हमारे लक्ष्य</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="relative bg-gradient-to-br from-[#7B1E1E] via-[#541313] to-[#2A0A0A] text-[#F5F0E6] rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden border border-[#C79A2D]/30">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#C79A2D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#C79A2D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-white">
              संस्था के <span className="text-[#C79A2D]">५ मूल सिद्धांत</span>
            </h3>
            <div className="w-20 h-1 bg-[#C79A2D] mx-auto rounded-full" />
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              ये पाँच सिद्धांत हमारी हर पहल, मूल्यांकन और निर्णय का आधार हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value) => {
              const Icon = iconMap[value.icon] || ShieldCheck;
              const gradientClass = colorMap[value.color] || 'from-gray-600 to-gray-700';
              return (
                <div
                  key={value.id}
                  className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-[#C79A2D]/40 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 text-center space-y-3"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientClass} mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-white">{value.title}</h4>
                  <p className="text-base text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-3">
            <Quote className="w-8 h-8 text-[#C79A2D]/40" />
            <p className="text-lg text-gray-300 italic text-center max-w-2xl">
              {quote.text}
            </p>
            <span className="text-xs text-[#C79A2D] font-bold tracking-widest">
              – {quote.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionPage;