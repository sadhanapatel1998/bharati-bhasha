'use client';

import React, { useState } from 'react';
import { Scroll, Heart, Flag, Trophy, TrendingUp, CheckCircle, XCircle, Sparkles, BookOpen, Brain, Users, Globe2, ArrowRightLeft, Star, Zap } from 'lucide-react';
import { FOUR_PILLARS as FOUR_PILLARS_STATIC, NEP_2020_PILLARS } from '@/data/olympiadData';
import SectionHeader from "@/components/shared/SectionHeader";

import { useSiteContent } from '@/hooks/useSiteContent';

// Scrapbook-journey concept: each pillar is a "sticker" stamped along a dotted trail,
// each with its own washi-tape colour instead of one repeated brand chip.
const PILLAR_THEMES = [
    {
        icon: Heart,
        tape: 'bg-rose-500',
        text: 'text-rose-700',
        rotateClass: '-rotate-[2.5deg]',
        cardHover: 'hover:bg-rose-900 hover:border-rose-900 hover:shadow-rose-300/70',
        ringBorder: 'border-rose-600',
        iconColor: 'text-rose-600',
        dotBg: 'bg-rose-600',
    },
    {
        icon: Flag,
        tape: 'bg-orange-500',
        text: 'text-orange-700',
        rotateClass: 'rotate-[1.5deg]',
        cardHover: 'hover:bg-orange-900 hover:border-orange-900 hover:shadow-orange-300/70',
        ringBorder: 'border-orange-500',
        iconColor: 'text-orange-600',
        dotBg: 'bg-orange-600',
    },
    {
        icon: Trophy,
        tape: 'bg-amber-500',
        text: 'text-amber-700',
        rotateClass: '-rotate-[1.5deg]',
        cardHover: 'hover:bg-amber-900 hover:border-amber-900 hover:shadow-amber-300/70',
        ringBorder: 'border-yellow-600',
        iconColor: 'text-yellow-600',
        dotBg: 'bg-yellow-600',
    },
    {
        icon: TrendingUp,
        tape: 'bg-teal-500',
        text: 'text-teal-700',
        rotateClass: 'rotate-[2.5deg]',
        cardHover: 'hover:bg-teal-900 hover:border-teal-900 hover:shadow-teal-300/70',
        ringBorder: 'border-teal-600',
        iconColor: 'text-teal-600',
        dotBg: 'bg-teal-600',
    },
];

const NEP_THEMES = [
    { icon: Globe2, ring: 'from-indigo-500 to-indigo-700' },
    { icon: BookOpen, ring: 'from-sky-500 to-blue-700' },
    { icon: Sparkles, ring: 'from-fuchsia-500 to-purple-700' },
    { icon: Brain, ring: 'from-emerald-500 to-teal-700' },
    { icon: Users, ring: 'from-amber-500 to-orange-700' },
];

// Static class maps (Tailwind JIT can't see dynamic interpolations)
const CARD_DELAYS = [
    '[animation-delay:0ms]',
    '[animation-delay:150ms]',
    '[animation-delay:300ms]',
    '[animation-delay:450ms]',
];

const NEP_DELAYS = [
    '[animation-delay:480ms]',
    '[animation-delay:600ms]',
    '[animation-delay:720ms]',
    '[animation-delay:840ms]',
    '[animation-delay:960ms]',
];

const SPARKLES = [
    { pos: 'left-[8%]', size: 'w-3.5 h-3.5', delay: '[animation-delay:0s]', duration: '[animation-duration:9s]' },
    { pos: 'left-[21%]', size: 'w-4.5 h-4.5', delay: '[animation-delay:1.3s]', duration: '[animation-duration:10s]' },
    { pos: 'left-[34%]', size: 'w-5.5 h-5.5', delay: '[animation-delay:2.6s]', duration: '[animation-duration:11s]' },
    { pos: 'left-[47%]', size: 'w-3.5 h-3.5', delay: '[animation-delay:3.9s]', duration: '[animation-duration:12s]' },
    { pos: 'left-[60%]', size: 'w-4.5 h-4.5', delay: '[animation-delay:5.2s]', duration: '[animation-duration:9s]' },
    { pos: 'left-[73%]', size: 'w-5.5 h-5.5', delay: '[animation-delay:6.5s]', duration: '[animation-duration:10s]' },
    { pos: 'left-[86%]', size: 'w-3.5 h-3.5', delay: '[animation-delay:7.8s]', duration: '[animation-duration:11s]' },
];

export const WhyChooseSection: React.FC = () => {
    const FOUR_PILLARS = useSiteContent<typeof FOUR_PILLARS_STATIC>('four_pillars', FOUR_PILLARS_STATIC);
    const [activeTab, setActiveTab] = useState<'pillars' | 'benchmark'>('pillars');

    return (
        <section id="why-us" className="relative mb-0 py-16 overflow-hidden border-t border-b border-amber-300/60">

            {/* Aurora-mesh background — layered blurred colour fields drifting slowly */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="byo-aurora-a absolute -top-24 -left-16 w-[26rem] h-[26rem] rounded-full bg-fuchsia-400/25 blur-3xl" />
                <div className="byo-aurora-b absolute top-10 right-[-6rem] w-[24rem] h-[24rem] rounded-full bg-teal-400/25 blur-3xl" />
                <div className="byo-aurora-c absolute bottom-[-8rem] left-1/3 w-[28rem] h-[28rem] rounded-full bg-amber-400/25 blur-3xl" />
                <div className="byo-aurora-a absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl [animation-delay:-6s]" />

                {/* Rising sparkles — a single ambient layer, not per-card noise */}
                {SPARKLES.map((s, i) => (
                    <Sparkles
                        key={i}
                        className={`byo-rise-particle absolute text-amber-400/70 ${s.pos} ${s.size} ${s.delay} ${s.duration}`}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Title Header */}
                <SectionHeader
                    icon={Scroll}
                    badge="प्रमुख विशेषताएँ व दृष्टि"
                    title="क्यों चुनें भारती भाषा ओलंपियाड?"
                    description=" हम केवल प्रतिस्पर्धा नहीं कराते, बल्कि भाषाई गौरव, शैक्षणिक उत्कृष्टता और निरंतर विकास का वातावरण निर्मित करते हैं।"
                />

                {/* 4 Pillars — sticker cards stamped along a marching dotted trail */}
                <div className="relative mb-20 mt-4">
                    {/* <div className="byo-trail hidden lg:block absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 z-0" /> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                        {FOUR_PILLARS.map((pillar, idx) => {
                            const theme = PILLAR_THEMES[idx] || PILLAR_THEMES[0];
                            const Icon = theme.icon;
                            const delayClass = CARD_DELAYS[idx] || CARD_DELAYS[0];

                            return (
                                <div
                                    key={pillar.title}
                                    className={`byo-stamp-in group relative bg-white p-6 pt-8 rounded-2xl border-2 border-amber-200/80 shadow-lg transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl ${theme.rotateClass} ${theme.cardHover} ${delayClass}`}
                                >
                                    <span
                                        className={`absolute -top-3 left-6 w-14 h-5 ${theme.tape} opacity-90 rotate-[-6deg] rounded-sm shadow-sm transition-all duration-500 group-hover:rotate-[-2deg] group-hover:scale-110`}
                                    />

                                    <div className="relative flex flex-col h-full">
                                        <div className="relative w-16 h-16 transition-transform duration-500 group-hover:scale-105">
                                            <span
                                                className={`byo-ring-spin absolute inset-0 rounded-full border-2 border-dashed transition-colors duration-500 group-hover:border-white/70 ${theme.ringBorder}`}
                                            />
                                            <div
                                                className={`absolute inset-[5px] rounded-full bg-white border-2 flex items-center justify-center shadow-inner transition-colors duration-500 group-hover:border-white/40 ${theme.ringBorder}`}
                                            >
                                                <Icon
                                                    className={`w-7 h-7 transition-colors duration-500 ${theme.iconColor}`}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-5 flex flex-col min-h-auto lg:min-h-[180px]">
                                            <h3 className="text-2xl md:text-2xl font-bold font-heading-hi text-red-950 leading-snug transition-colors duration-500 group-hover:text-white">
                                                {pillar.title}
                                            </h3>
                                            <p className="mt-4 flex-1 text-lg text-slate-800 font-devanagari leading-relaxed transition-colors duration-500 group-hover:text-white/90">
                                                {pillar.desc}
                                            </p>
                                        </div>

                                        <div className="mt-5 overflow-hidden rounded-2xl ring-2 ring-transparent transition-all duration-500 group-hover:ring-white/20">
                                            <img
                                                src={pillar.image}
                                                alt={pillar.title}
                                                className="w-full h-50 sm:h-48 md:h-40 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-base font-bold transition-colors duration-500 group-hover:border-white/20 group-hover:text-white">
                                        <span className={`${theme.text} transition-colors duration-500 group-hover:text-white`}>
                                            विशेषता 0{idx + 1}
                                        </span>
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span
                                                className={`byo-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.dotBg}`}
                                            />
                                            <span
                                                className={`relative inline-flex rounded-full h-2.5 w-2.5 transition-transform duration-500 group-hover:scale-125 ${theme.dotBg}`}
                                            />
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Ranking VS Benchmark — tug-of-war styled comparison */}
                <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#021441] via-[#02163d] to-[#03215c] p-6 sm:p-10 lg:p-14 border border-blue-300/30 shadow-[0_25px_70px_rgba(0,0,0,.35)] my-12">
                    <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-yellow-400/15 blur-3xl animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />
                    <div
                        className="absolute inset-0 opacity-15 bg-[radial-gradient(#FBBF24_1px,transparent_1px)] bg-[length:22px_22px]"
                    />
                    <div className="absolute top-8 left-8 text-5xl font-black text-white/10 animate-bounce">
                        क
                    </div>
                    <div className="absolute bottom-8 right-10 text-5xl font-black text-white/10 animate-bounce">
                        अ
                    </div>

                    {/* Header */}
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 px-5 py-2 text-red-950 font-black text-sm shadow-xl animate-pulse">
                            <Trophy className="h-4 w-4" />
                            बेंचमार्क मूल्यांकन क्रांति
                        </span>
                        <h3 className="mt-5 text-3xl sm:text-5xl font-bold text-white leading-tight">
                            हम रैंकिंग नहीं, बेंचमार्क पर विश्वास करते हैं
                        </h3>
                        <p className=" text-medium lg:text-lg text-amber-100/90 max-w-3xl mx-auto leading-8">
                            हमारा उद्देश्य विद्यार्थियों पर नकारात्मक दबाव बनाना नहीं, बल्कि उनकी वास्तविक सीखने की गति और क्षमताओं को पहचानकर उन्हें आगे बढ़ाना है।
                        </p>
                    </div>

                    {/* ================= Comparison ================= */}
                    <div className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-11 gap-6 items-center">

                        {/* Left Card */}
                        <div className="md:col-span-5">
                            <div className="group relative overflow-hidden rounded-[28px] border border-rose-400/30 bg-gradient-to-br from-[#1E2A5A]/95 via-[#1B2550]/95 to-[#2A1748]/95 backdrop-blur-xl p-7 shadow-[0_15px_40px_rgba(0,0,0,.35)] transition-all duration-500 hover:-translate-y-2 hover:border-rose-400/60 hover:shadow-[0_0_40px_rgba(244,63,94,.35)]">
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                                <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-rose-500/15 blur-3xl group-hover:scale-125 transition duration-700" />
                                <div className="absolute top-8 right-6 text-red-400/10">
                                    <Trophy className="w-22 h-22" />
                                </div>


                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 border-b border-rose-400/20 pb-4 mb-6">
                                        <div className="group relative">
                                            {/* Glow Ring */}
                                            <div className="absolute -inset-2 rounded-3xl bg-red-500/30 blur-lg animate-[byoIconGlow_3s_ease-in-out_infinite]" />
                                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-red-700 shadow-[0_0_25px_rgba(239,68,68,.45)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 animate-[byoIconFloat_3s_ease-in-out_infinite]">
                                                <XCircle className="h-8 w-8 text-white animate-[byoIconPulse_2s_ease-in-out_infinite]" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white">
                                                क्रम परीक्षण रैंकिंग
                                            </h4>
                                            <p className="text-rose-300 text-lg">
                                                पारंपरिक तुलनात्मक प्रणाली
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-5 text-lg text-slate-100">
                                        <li className="flex gap-3">
                                            <span className="mt-3 h-3 w-3 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,.8)] shrink-0" />
                                            <span><strong className="text-rose-300">दूसरों से तुलना:</strong> बच्चे में हीनभावना या तनाव।</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="mt-3 h-3 w-3 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,.8)] shrink-0" />
                                            <span><strong className="text-rose-300">प्रतिशत की दौड़:</strong> केवल अंकों पर ध्यान।</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="mt-3 h-3 w-3 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,.8)] shrink-0" />
                                            <span><strong className="text-rose-300">अल्पकालिक व दोहरी:</strong> क्षणिक सफलता का दबाव।</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* VS Badge */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="relative flex h-20 w-20 items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-yellow-300 animate-spin" />
                                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 shadow-[0_0_35px_rgba(251,191,36,.9)]" />
                                <div className="absolute -inset-3 rounded-full bg-yellow-400/20 blur-xl animate-pulse" />
                                <span className="relative z-10 text-2xl font-black text-red-900">
                                    VS
                                </span>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="md:col-span-5">
                            <div className="group relative overflow-hidden rounded-[28px] border border-cyan-400/30 bg-gradient-to-br from-[#0B3556]/95 via-[#0D3F63]/95 to-[#114D73]/95 backdrop-blur-xl p-7 shadow-[0_15px_40px_rgba(0,0,0,.35)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,.35)]">
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                                <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-green-400/15 blur-3xl group-hover:scale-125 transition duration-700" />
                                <div className="absolute top-8 right-6 text-green-400/10">
                                    <TrendingUp className="w-24 h-24" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 border-b border-cyan-400/20 pb-4 mb-6">
                                        <div className="group relative">
                                            <div className="absolute -inset-2 rounded-3xl bg-green-500/30 blur-lg animate-[byoSuccessGlow_3s_ease-in-out_infinite]" />
                                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 shadow-[0_0_25px_rgba(34,197,94,.45)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 animate-[byoSuccessFloat_3s_ease-in-out_infinite]">
                                                <CheckCircle className="h-8 w-8 text-white animate-[byoSuccessPulse_2s_ease-in-out_infinite]" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white">
                                                बेंचमार्क (Benchmark)
                                            </h4>
                                            <p className="text-green-300 text-lg">
                                                भारती भाषा ओलंपियाड दृष्टिकोण
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="space-y-5 text-lg text-slate-100">
                                        <li className="flex gap-3">
                                            <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,.8)]" />
                                            <span><strong className="text-green-300">स्वयं से तुलना:</strong> अपनी पिछली स्थिति से सुधार।</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,.8)]" />
                                            <span><strong className="text-green-300">सीखने की प्रगति:</strong> विषयवार सूक्ष्म अंतर्दृष्टि।</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,.8)]" />
                                            <span><strong className="text-green-300">आत्मविश्वास व प्रगति:</strong> निरंतर संवर्धन व सकारात्मकता।</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Bottom Line */}
                    <div className="relative z-10 mt-8 border-t border-amber-400/20 pt-5 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-5 py-3 shadow-lg">
                            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
                            <span className="text-yellow-300 font-semibold">
                                हर बच्चा अद्वितीय है – हम उसे उसकी गति से आगे बढ़ने देते हैं
                            </span>
                            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* NEP 2020 Vision — medallion badges along a second dotted trail */}
                <div className="mt-12 mb-10 space-y-6">
                    <div className="text-center">
                        <span className="bg-red-900 text-amber-200 font-bold px-4 pb-1 py-2 rounded-full text-base uppercase tracking-wider inline-block mb-2">
                            राष्ट्रीय शिक्षा नीति (NEP 2020) के अनुरूप हमारा विज़न
                        </span>
                        <h3 className="text-3xl font-bold font-heading-hi text-red-950 ">
                            5 मुख्य स्तंभों का समावेश
                        </h3>
                    </div>
                    <div className="relative top-10">
                        {/* <div className="byo-trail hidden lg:block absolute top-0 left-0 right-0 h-[3px] z-0" /> */}

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
                            {NEP_2020_PILLARS.map((pillar, idx) => {
                                const theme = NEP_THEMES[idx] || NEP_THEMES[0];
                                const Icon = theme.icon;
                                const delayClass = NEP_DELAYS[idx] || NEP_DELAYS[0];

                                return (
                                    <div
                                        key={pillar.title}
                                        className={`byo-stamp-in group relative overflow-visible rounded-[28px] p-5 pt-12 text-center transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] ${delayClass} ${idx === 0
                                            ? "bg-gradient-to-br from-[#EEF6FF] via-[#DCEEFF] to-[#A7D8FF] border border-blue-300 shadow-[0_20px_45px_rgba(37,99,235,.18)] hover:shadow-[0_30px_60px_rgba(37,99,235,.35)]"
                                            : idx === 1
                                                ? "bg-gradient-to-br from-[#FFF5E6] via-[#FFE1B3] to-[#FFC16B] border border-orange-300 shadow-[0_20px_45px_rgba(234,88,12,.18)] hover:shadow-[0_30px_60px_rgba(185,28,28,.35)]"
                                                : idx === 2
                                                    ? "bg-gradient-to-br from-[#F3EAFF] via-[#E6D5FF] to-[#C9A8FF] border border-purple-300 shadow-[0_20px_45px_rgba(147,51,234,.18)] hover:shadow-[0_30px_60px_rgba(147,51,234,.35)]"
                                                    : idx === 3
                                                        ? "bg-gradient-to-br from-[#E9FFF2] via-[#CFF8DF] to-[#9FE870] border border-green-300 shadow-[0_20px_45px_rgba(34,197,94,.18)] hover:shadow-[0_30px_60px_rgba(34,197,94,.35)]"
                                                        : "bg-gradient-to-br from-[#FFF1F2] via-[#FFE4E6] to-[#FFD1D8] border border-rose-300 shadow-[0_20px_45px_rgba(225,29,72,.18)] hover:shadow-[0_30px_60px_rgba(225,29,72,.35)]"
                                            }`}
                                    >
                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 overflow-hidden rounded-[28px]">
                                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                                        </div>

                                        {/* Bottom Glow */}
                                        <div
                                            className={`absolute bottom-0 left-0 right-0 h-24 rounded-b-[28px] ${idx === 0
                                                ? "bg-gradient-to-r from-blue-500/20 via-blue-300/10 to-transparent"
                                                : idx === 1
                                                    ? "bg-gradient-to-r from-orange-500/20 via-yellow-300/10 to-transparent"
                                                    : idx === 2
                                                        ? "bg-gradient-to-r from-purple-500/20 via-fuchsia-300/10 to-transparent"
                                                        : idx === 3
                                                            ? "bg-gradient-to-r from-green-500/20 via-emerald-300/10 to-transparent"
                                                            : "bg-gradient-to-r from-rose-500/20 via-pink-300/10 to-transparent"
                                                }`}
                                        />

                                        {/* Decorative Sparkle */}
                                        <div
                                            className={`absolute top-7 right-6 text-xl opacity-25 group-hover:opacity-70 group-hover:rotate-12 transition-all duration-500 ${idx === 0
                                                ? "text-blue-500"
                                                : idx === 1
                                                    ? "text-orange-500"
                                                    : idx === 2
                                                        ? "text-purple-500"
                                                        : idx === 3
                                                            ? "text-green-500"
                                                            : "text-rose-500"
                                                }`}
                                        >
                                            ✦
                                        </div>

                                        {/* Floating Medallion */}
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20">
                                            <span
                                                className={`absolute inset-0 rounded-full border-2 border-dashed animate-spin ${idx === 0
                                                    ? "border-blue-400/70"
                                                    : idx === 1
                                                        ? "border-orange-400/70"
                                                        : idx === 2
                                                            ? "border-purple-400/70"
                                                            : idx === 3
                                                                ? "border-green-400/70"
                                                                : "border-rose-400/70"
                                                    }`}
                                                style={{ animationDuration: "10s" }}
                                            />

                                            <div
                                                className={`absolute inset-[5px] rounded-full flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,255,255,.25)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${idx === 0
                                                    ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700"
                                                    : idx === 1
                                                        ? "bg-gradient-to-br from-orange-500 via-amber-500 to-red-700"
                                                        : idx === 2
                                                            ? "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-violet-700"
                                                            : idx === 3
                                                                ? "bg-gradient-to-br from-green-400 via-emerald-500 to-green-700"
                                                                : "bg-gradient-to-br from-[#FB7185] via-[#E11D48] to-[#9F1239]"
                                                    }`}
                                            >
                                                <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 space-y-3">
                                            <h4
                                                className={`text-2xl font-bold font-devanagari transition-colors duration-300 mt-4 ${idx === 0
                                                    ? "text-blue-900 group-hover:text-blue-700"
                                                    : idx === 1
                                                        ? "text-red-900 group-hover:text-orange-700"
                                                        : idx === 2
                                                            ? "text-purple-900 group-hover:text-purple-700"
                                                            : idx === 3
                                                                ? "text-green-900 group-hover:text-green-700"
                                                                : "text-rose-900 group-hover:text-rose-700"
                                                    }`}
                                            >
                                                {pillar.title}
                                            </h4>

                                            <p className="text-[18px] leading-6 text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                                                {pillar.desc}
                                            </p>

                                            {/* Animated Underline */}
                                            <div
                                                className={`mx-auto h-1 w-12 rounded-full group-hover:w-24 transition-all duration-500 ${idx === 0
                                                    ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                                                    : idx === 1
                                                        ? "bg-gradient-to-r from-orange-500 to-red-700"
                                                        : idx === 2
                                                            ? "bg-gradient-to-r from-purple-500 to-violet-700"
                                                            : idx === 3
                                                                ? "bg-gradient-to-r from-green-500 to-emerald-700"
                                                                : "bg-gradient-to-r from-rose-500 to-pink-700"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};