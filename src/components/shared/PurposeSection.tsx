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

const purposeData = [
  {
    id: 1,
    icon: BookOpen,
    title: 'भाषा संरक्षण एवं संवर्धन',
    description:
      'हिंदी और संस्कृत का प्रचार-प्रसार कर इन भाषाओं को नई पीढ़ी तक पहुँचाना एवं उनके प्रति प्रेम, सम्मान और गर्व की भावना जागृत करना।',
    color: 'from-red-800 to-red-900',
  },
  {
    id: 2,
    icon: BarChart3,
    title: 'बेंचमार्क आधारित मूल्यांकन',
    description:
      'रैंकिंग पर नहीं, बल्कि सीखने की प्रगति, क्षमताओं और कमियों की सकारात्मक पहचान पर ध्यान केंद्रित करना।',
    color: 'from-amber-600 to-amber-700',
  },
  {
    id: 3,
    icon: GraduationCap,
    title: 'राष्ट्रीय शिक्षा नीति 2020',
    description:
      'बहुभाषिक शिक्षा, भारतीय ज्ञान परंपरा, समग्र एवं योग्यता आधारित शिक्षा के NEP 2020 सिद्धांतों से पूर्णतः संरेखित।',
    color: 'from-emerald-700 to-emerald-800',
  },
  {
    id: 4,
    icon: Award,
    title: 'प्रतिभा का सम्मान',
    description:
      'प्रत्येक विद्यार्थी की मेहनत को पुरस्कार, छात्रवृत्ति, प्रमाण-पत्र और राष्ट्रीय स्तर की पहचान के माध्यम से सराहना।',
    color: 'from-blue-700 to-blue-800',
  },
  {
    id: 5,
    icon: Heart,
    title: 'सांस्कृतिक जड़ों से जुड़ाव',
    description:
      'भारतीय ज्ञान परंपरा, संस्कृति और विरासत से विद्यार्थियों को परिचित कराना तथा उनमें राष्ट्रीय गर्व का संचार करना।',
    color: 'from-rose-700 to-rose-800',
  },
  {
    id: 6,
    icon: Globe,
    title: 'समग्र विकास',
    description:
      'भाषाई दक्षता, बौद्धिक क्षमता, विश्लेषणात्मक चिंतन, आत्मविश्वास एवं व्यक्तित्व विकास का समग्र संवर्धन।',
    color: 'from-purple-700 to-purple-800',
  },
];

export const PurposeSection: React.FC = () => {
  const { language } = useApp();

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-amber-100/30">
      {/* Background pattern – subtle mandala dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #790e03 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, #C79A2D 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 80px 80px',
          backgroundPosition: '0 0, 40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-800 text-amber-50 text-xs font-bold uppercase tracking-wider rounded-full">
            <Target className="w-3.5 h-3.5" />
            <span>हमारा संकल्प</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading-hi text-red-950 mt-3">
            हमारा उद्देश्य
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-red-800 via-amber-500 to-red-800 mx-auto rounded-full mt-3" />
          <p className="text-amber-700 font-devanagari mt-4 text-lg max-w-2xl mx-auto">
            भारती भाषा ओलंपियाड का लक्ष्य भारतीय भाषाओं को नई पीढ़ी से जोड़ना,
            उनकी क्षमताओं को वैज्ञानिक तरीके से आँकना और उन्हें समग्र रूप से
            विकसित करना है।
          </p>
        </div>

        {/* Purpose Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purposeData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-2xl border border-amber-200/50 hover:border-amber-400 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Decorative gradient bar (top) */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}
                />

                {/* Icon with gradient circle */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold font-heading-hi text-red-950 mt-4 group-hover:text-red-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 font-devanagari leading-relaxed mt-2">
                  {item.description}
                </p>

                {/* Decorative corner dot */}
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-amber-300/50 group-hover:bg-amber-500 transition-colors" />
              </div>
            );
          })}
        </div>

        {/* Bottom Quote / Callout */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-red-900/10 to-amber-900/10 backdrop-blur-sm px-8 py-5 rounded-3xl border border-amber-300/30 shadow-sm max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl font-bold font-devanagari text-red-950 leading-relaxed">
              “हम रैंकिंग में नहीं, बल्कि विकास और प्रगति में विश्वास करते हैं।
              <br />
              हर बच्चा अद्वितीय है – हम उसे उसकी गति से आगे बढ़ने देते हैं।”
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-12 h-0.5 bg-amber-400 rounded-full" />
              <span className="text-xs text-amber-600 font-bold tracking-widest">
                भारती भाषा ओलंपियाड
              </span>
              <span className="w-12 h-0.5 bg-amber-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;