'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { AWARDS_DATA } from '../data/olympiadData';
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
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CtaSection from '@/components/shared/CtaSection';

// Icon map
const iconMap: Record<string, React.ElementType> = {
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
};

// Ribbon-tail clip path shared by every medal seal
const RIBBON_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 50% 68%, 0 100%)';
const PENNANT_CLIP =
  'polygon(0 0, calc(100% - 7px) 0, 100% 50%, calc(100% - 7px) 100%, 0 100%)';

/** Small gold chakra-style ornament used above headings and in corners */
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

/** Gold line – diamond – gold line divider used under every section title */
const OrnamentalDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-3">
    <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#C79A2D]" />
    <span className="w-2.5 h-2.5 rotate-45 bg-[#C79A2D] shadow-sm" />
    <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#C79A2D]" />
  </div>
);

/** The signature element: a wax-seal medal with a two-strand ribbon tail */
const MedalSeal: React.FC<{ gradient: string; Icon: React.ElementType }> = ({
  gradient,
  Icon,
}) => (
  <div className="absolute -top-7 right-6 flex flex-col items-center pointer-events-none">
    <div
      className={`w-14 h-14 rounded-full ring-[3px] ring-white dark:ring-[#1A1414] bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500`}
    >
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="flex -mt-1 gap-[3px] z-4">
      <div className={`w-3 h-5 bg-gradient-to-b ${gradient} opacity-90`} style={{ clipPath: RIBBON_CLIP }} />
      <div className={`w-3 h-5 bg-gradient-to-b ${gradient}`} style={{ clipPath: RIBBON_CLIP }} />
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
  const { language, navigateTo } = useApp();
  const { awards, scholarships, schoolTeacherAwards, performanceFeatures, quote } = AWARDS_DATA;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb */}
      <Breadcrumb
        title="पुरस्कार एवं सम्मान"
        items={[
          {
            label: "पुरस्कार एवं सम्मान",
          },
        ]}
      />
      {/* Hero Section */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {awards.map((aw) => {
            const Icon = iconMap[aw.icon] || Award;
            const gradient = aw.color || 'from-gray-600 to-gray-700';
            return (
              <div
                key={aw.id}
                className="group relative bg-gradient-to-b from-white to-amber-50/60 dark:from-[#1A1414] dark:to-[#140F0F] pt-9 pb-6 px-6 rounded-2xl border border-amber-200/70 dark:border-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <MedalSeal gradient={gradient} Icon={Icon} />
                <div className=" space-y-3">
                  <span
                    className="inline-block text-[12px] pt-2 font-bold uppercase tracking-wider text-white px-3 py-1 bg-gradient-to-r from-blue-950 to-blue-900"
                    style={{ clipPath: PENNANT_CLIP }}
                  >
                    {levelLabel[aw.level] || aw.level}
                  </span>
                  <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                    {aw.title}
                  </h3>
                  {aw.description && (
                    <p className="text-base text-gray-800 dark:text-gray-400 leading-relaxed">
                      {aw.description}
                    </p>
                  )}

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

      {/* Scholarships Section */}
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading-hi text-red-950 dark:text-white">
            छात्रवृत्ति (Scholarships)
          </h2>
          <OrnamentalDivider />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scholarships.map((s) => {
            const Icon = iconMap[s.icon] || Sparkles;
            return (
              <div
                key={s.id}
                className="group bg-white/90 dark:bg-[#1A1414] p-6 rounded-2xl border border-amber-200/60 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center space-y-3"
              >
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/70 group-hover:rotate-45 transition-transform duration-700" />
                  <div
                    className={`absolute inset-1.5 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-medium text-gray-800 dark:text-gray-400 leading-relaxed">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
          {schoolTeacherAwards.map((aw) => {
            const Icon = iconMap[aw.icon] || Award;
            const gradient = aw.color || 'from-gray-600 to-gray-700';
            return (
              <div
                key={aw.id}
                className="group relative bg-gradient-to-b from-white to-amber-50/60 dark:from-[#1A1414] dark:to-[#140F0F] pt-9 pb-6 px-6 rounded-2xl border border-amber-200/70 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <MedalSeal gradient={gradient} Icon={Icon} />
                <div className=" space-y-3">
                  <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                    {aw.title}
                  </h3>
                  <p className="text-medium text-gray-800 dark:text-gray-400 leading-relaxed">
                    {aw.description}
                  </p>
                  {/* {aw.cashPrize && (
                    <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                      {aw.cashPrize}
                    </div>
                  )}
                  {aw.perks && (
                    <ul className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      {aw.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#C79A2D]">◆</span>
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Report Features */}
      <div className="relative bg-gradient-to-br from-[#7B1E1E] via-[#541313] to-[#2A0A0A] text-[#F5F0E6] rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden border border-[#C79A2D]/30">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#C79A2D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#C79A2D]/10 rounded-full blur-3xl pointer-events-none" />
        {/* gold hairline frame with corner chakras, like a certificate seal */}
        <div className="absolute inset-4 border border-[#C79A2D]/25 rounded-2xl pointer-events-none hidden sm:block" />
        <ChakraMark className="w-6 h-6 absolute top-6 left-6 opacity-70 hidden sm:block" />
        <ChakraMark className="w-6 h-6 absolute top-6 right-6 opacity-70 hidden sm:block" />

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
                  className="group bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-[#C79A2D]/40 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 text-center space-y-3"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pf.color} mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-white">{pf.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
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
          <span className="absolute top-1 left-4 font-playfair text-7xl text-[#C79A2D]/25 select-none leading-none">
            “
          </span>
          <span className="absolute bottom-1 right-4 font-playfair text-7xl text-[#C79A2D]/25 select-none leading-none">
            ”
          </span>
          <div className="relative z-10 space-y-4">
            <ChakraMark className="w-6 h-6 mx-auto opacity-80" />
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
  );
};

export default AwardsPage;