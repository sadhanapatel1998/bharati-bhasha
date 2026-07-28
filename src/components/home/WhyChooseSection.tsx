import React, { useState } from 'react';
import { Scroll, Heart, Flag, Trophy, TrendingUp, CheckCircle, XCircle, Sparkles, BookOpen, Brain, Users, Globe2, ArrowRightLeft } from 'lucide-react';
import { FOUR_PILLARS, NEP_2020_PILLARS } from '@/data/olympiadData';
import SectionHeader from "@/components/shared/SectionHeader";

export const WhyChooseSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'pillars' | 'benchmark'>('pillars');

    return (
        <section id="why-us" className="mb-0 py-16 bg-gradient-to-b from-amber-50/80 via-white to-amber-100/50 relative border-t border-b border-amber-300/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title Header */}
                <SectionHeader
                    icon={Scroll}
                    badge="प्रमुख विशेषताएँ व दृष्टि"
                    title="क्यों चुनें भारती भाषा ओलंपियाड?"
                    description=" हम केवल प्रतिस्पर्धा नहीं कराते, बल्कि भाषाई गौरव, शैक्षणिक उत्कृष्टता और निरंतर विकास का वातावरण निर्मित करते हैं।"
                />

                {/* 4 Pillars Cards Grid (Page 4 Top) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {FOUR_PILLARS.map((pillar, idx) => {
                        const icons = [Heart, Flag, Trophy, TrendingUp];
                        const Icon = icons[idx] || Heart;

                        return (
                            <div
                                key={pillar.title}
                                className="bg-white p-6 rounded-2xl border-2 border-amber-200/90 shadow-md hover:shadow-xl hover:border-amber-400 transition-all group flex flex-col justify-between"
                            >
                                <div className="flex flex-col h-full">
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-950 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                                        <Icon className="w-7 h-7" />
                                    </div>

                                    {/* Content */}
                                    <div className="mt-5 flex flex-col min-h-auto lg:min-h-[180px]">
                                        {/* Title */}
                                        <h3 className=" text-2xl md:text-2xl font-bold font-heading-hi text-red-950 leading-snug">
                                            {pillar.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="mt-4 flex-1 text-lg text-slate-800 font-devanagari leading-relaxed">
                                            {pillar.desc}
                                        </p>
                                    </div>

                                    {/* Image */}
                                    <div className="mt-5">
                                        <img
                                            src={pillar.image}
                                            alt={pillar.title}
                                            className="w-full h-50 sm:h-48 md:h-40 object-cover rounded-2xl"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-base font-bold text-lime-900">
                                    <span>विशेषता 0{idx + 1}</span>
                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Ranking VS Benchmark Comparison Card (Page 4 Middle) */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950 via-red-900 to-amber-950 p-6 sm:p-10 lg:p-14 border-2 border-amber-400/70 shadow-2xl my-12">

                    {/* Decorative glow (optional) */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Header */}
                    <div className="text-center space-y-3 max-w-4xl mx-auto relative z-10">
                        <span className="inline-block bg-amber-500 text-red-950 font-black px-5 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-lg">
                            🏆 बेंचमार्क मूल्यांकन क्रांति
                        </span>
                        <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading-hi text-white leading-tight">
                            हम रैंकिंग नहीं, बेंचमार्क पर विश्वास करते हैं
                        </h3>
                        <p className="text-amber-100/90 font-devanagari text-lg lg:text-xl max-w-2xl mx-auto">
                            हमारा उद्देश्य विद्यार्थियों पर नकारात्मक दबाव बनाना नहीं, बल्कि उनकी वास्तविक सीखने की गति और क्षमताओं को पहचानकर उन्हें आगे बढ़ाना है।
                        </p>
                    </div>

                    {/* Comparison Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-11 gap-4 sm:gap-6 items-stretch mt-8 relative z-10">

                        {/* Traditional Ranking Column */}
                        <div className="md:col-span-5 bg-red-900/50 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-red-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex items-center gap-3 border-b border-red-500/30 pb-3 mb-4">
                                <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-lg sm:text-xl text-red-100 font-heading-hi">क्रम परीक्षण रैंकिंग</h4>
                                    <p className="text-base text-red-300">पारंपरिक तुलनात्मक प्रणाली</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-lg font-devanagari text-red-100">
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0 mt-1.5"></span>
                                    <span><strong className="text-red-200">दूसरों से तुलना:</strong> बच्चे में हीनभावना या तनाव।</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0 mt-1.5"></span>
                                    <span><strong className="text-red-200">प्रतिशत की दौड़:</strong> केवल अंकों पर ध्यान।</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0 mt-1.5"></span>
                                    <span><strong className="text-red-200">अल्पकालिक व दोहरी:</strong> क्षणिक सफलता का दबाव।</span>
                                </li>
                            </ul>
                        </div>

                        {/* VS Badge */}
                        <div className="md:col-span-1 flex justify-center items-center my-2 md:my-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white font-black text-2xl flex items-center justify-center shadow-2xl border-2 border-amber-200 animate-pulse hover:animate-none hover:scale-110 transition-transform duration-300">
                                VS
                            </div>
                        </div>

                        {/* Benchmark Column (Highlighted) */}
                        <div className="md:col-span-5 bg-gradient-to-br from-amber-800/80 via-amber-700/80 to-amber-900/90 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border-2 border-amber-400/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex items-center gap-3 border-b border-amber-400/40 pb-3 mb-4">
                                <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-lg sm:text-xl text-amber-100 font-heading-hi">बेंचमार्क (Benchmark)</h4>
                                    <p className="text-base text-amber-300">भारती भाषा ओलंपियाड दृष्टिकोण</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-lg font-devanagari text-amber-50">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-amber-200">स्वयं से तुलना:</strong> अपनी पिछली स्थिति से सुधार।</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-amber-200">सीखने की प्रगति:</strong> विषयवार सूक्ष्म अंतर्दृष्टि।</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-amber-200">आत्मविश्वास व प्रगति:</strong> निरंतर संवर्धन व सकारात्मकता।</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Optional footer note */}
                    <div className="text-center mt-6 text-amber-300/70 text-medium font-devanagari border-t border-amber-500/20 pt-4">
                        ✦ हर बच्चा अद्वितीय है – हम उसे उसकी गति से आगे बढ़ने देते हैं ✦
                    </div>
                </div>

                {/* NEP 2020 Vision Alignment Section (Page 4 Bottom) */}
                <div className="mt-12 space-y-6">
                    <div className="text-center">
                        <span className="bg-red-900 text-amber-200 font-bold px-4 pb-1  py-2 rounded-full text-base uppercase tracking-wider inline-block mb-2">
                            राष्ट्रीय शिक्षा नीति (NEP 2020) के अनुरूप हमारा विज़न
                        </span>
                        <h3 className="text-3xl font-bold font-heading-hi text-red-950">
                            5 मुख्य स्तंभों का समावेश
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {NEP_2020_PILLARS.map((pillar, idx) => {
                            const icons = [Globe2, BookOpen, Sparkles, Brain, Users];
                            const Icon = icons[idx] || BookOpen;

                            return (
                                <div
                                    key={pillar.title}
                                    className="group relative bg-gradient-to-br from-white to-[#F5F0E6]/80 p-5 rounded-2xl border border-[#C79A2D]/40 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C79A2D] text-center space-y-3 overflow-hidden"
                                >
                                    {/* Decorative top bar – brand colours */}
                                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#790e03] via-[#C79A2D] to-[#790e03]"></div>

                                    {/* Subtle glow (on hover) */}
                                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#C79A2D]/5 rounded-2xl"></div>

                                    <div className="relative z-10">
                                        {/* Icon container – brand gradient */}
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#790e03]/10 to-[#C79A2D]/20 text-[#790e03] flex items-center justify-center mx-auto border border-[#C79A2D]/30 shadow-inner group-hover:scale-110 group-hover:shadow-[#C79A2D]/30 transition-all duration-300">
                                            <Icon className="w-6 h-6 group-hover:rotate-3 transition-transform" />
                                        </div>

                                        {/* Title – brand dark red */}
                                        <h4 className="font-bold text-blue-900 text-xl font-devanagari mt-3 group-hover:text-[#C79A2D] transition-colors duration-300">
                                            {pillar.title}
                                        </h4>

                                        {/* Description – subtle slate */}
                                        <p className="text-base text-slate-900 font-lg leading-relaxed group-hover:text-slate-800 transition-colors">
                                            {pillar.desc}
                                        </p>

                                        {/* Animated bottom line – brand gold */}
                                        <div className="w-0 h-0.5 bg-gradient-to-r from-[#790e03]/0 via-[#C79A2D] to-[#790e03]/0 mx-auto rounded-full group-hover:w-1/2 transition-all duration-500 mt-2"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};
