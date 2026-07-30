'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import SectionHeader from '../components/shared/SectionHeader';
import { Award, CheckCircle2, FileText, Sparkles, BarChart, TrendingUp, Users, BookOpen, Brain, Target, Zap, Medal, ChevronRight } from 'lucide-react';

// 12 assessment dimensions with icons and descriptions
const assessmentDimensions = [
  {
    id: 1,
    title: 'व्याकरण एवं संधि',
    description: 'व्याकरणिक नियमों की सटीकता और संधि विच्छेद',
    icon: BookOpen,
  },
  {
    id: 2,
    title: 'वर्तनी एवं देवनागरी लेखन',
    description: 'शुद्ध वर्तनी एवं देवनागरी लिपि की समझ',
    icon: FileText,
  },
  {
    id: 3,
    title: 'शब्द भंडार एवं पर्यायवाची',
    description: 'शब्दों की गहराई, पर्याय, विलोम एवं अनेकार्थी',
    icon: BookOpen,
  },
  {
    id: 4,
    title: 'पठन क्षमता एवं गति',
    description: 'पाठ को ग्रहण करने की क्षमता एवं पढ़ने की गति',
    icon: Zap,
  },
  {
    id: 5,
    title: 'सूक्तियाँ एवं नीतिज्ञान',
    description: 'सुभाषित, नीतिवचन एवं उनके गहन अर्थ',
    icon: Sparkles,
  },
  {
    id: 6,
    title: 'शास्त्रीय साहित्य समझ',
    description: 'प्राचीन साहित्य, काव्य एवं अलंकारों की समझ',
    icon: Award,
  },
  {
    id: 7,
    title: 'वाक्य रचना एवं तर्क',
    description: 'वाक्य संरचना, तार्किक क्रम एवं शैली',
    icon: Target,
  },
  {
    id: 8,
    title: 'मुहावरे एवं लोकोक्तियाँ',
    description: 'मुहावरों का प्रासंगिक उपयोग एवं अर्थ',
    icon: Brain,
  },
  {
    id: 9,
    title: 'राष्ट्रीय प्रतिशतता सूचकांक',
    description: 'देश स्तर पर प्रदर्शन की स्थिति',
    icon: TrendingUp,
  },
  {
    id: 10,
    title: 'राज्य स्तरीय प्रतिशतता',
    description: 'राज्य स्तर पर स्थिति एवं तुलना',
    icon: Users,
  },
  {
    id: 11,
    title: 'व्यक्तिगत सामर्थ्य हाइलाइट',
    description: 'छात्र के प्रमुख क्षेत्रों की पहचान',
    icon: Medal,
  },
  {
    id: 12,
    title: 'शिक्षक हेतु व्यक्तिगत सुझाव',
    description: 'प्रत्येक छात्र हेतु सुधार के लिए दिशा-निर्देश',
    icon: BarChart,
  },
];

export const BenchmarkAssessmentPage: React.FC = () => {
  const { language, navigateTo } = useApp();

  return (
    <div className="py-8 relative min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-100/30 overflow-hidden">
      {/* Decorative pattern */}
     <div
        className="
    absolute inset-0 pointer-events-none opacity-[0.04]
    bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
    bg-[length:60px_60px,80px_80px]
    bg-[position:0_0,40px_40px]
  "
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 z-10">
        {/* Hero Section */}
        <SectionHeader
          icon={Award}
          badge="वैज्ञानिक मूल्यांकन"
          title="12-आयामी वैज्ञानिक भाषा मूल्यांकन"
          description="केवल अंक तालिका नहीं, बल्कि विद्यार्थी के भाषाई सामर्थ्य का पूर्ण डिजिटल रिपोर्ट कार्ड"
        />

        {/* 12 Dimensions Grid – with icons and hover effects */}
        <div className="space-y-6">
          <div className="text-center space-y-2 py-5">
            <h2 className="text-4xl font-bold font-heading-hi text-red-950 dark:text-white">
              मूल्यांकन के <span className="text-[#C79A2D]">12 आयाम</span>
            </h2>
            {/* <div className="w-20 h-1 bg-[#C79A2D] mx-auto rounded-full" /> */}
            <p className="text-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              इन 12 वैज्ञानिक मानकों पर प्रत्येक विद्यार्थी की भाषाई दक्षता का सूक्ष्म मूल्यांकन किया जाता है।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {assessmentDimensions.map((dim) => {
              const Icon = dim.icon;
              return (
                <div
                  key={dim.id}
                  className="group relative bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm p-5 pt-6 rounded-2xl border-2 border-amber-200/60 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C79A2D] flex items-start gap-4"
                >
                  {/* Icon circle with gradient */}
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-800 to-amber-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                      {dim.title}
                    </h4>
                    <p className="text-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                      {dim.description}
                    </p>
                  </div>
                  {/* Small decorative dot */}
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-300/50 group-hover:bg-amber-500 transition-colors" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Sample Report Preview / Highlight Card */}
        <div className="relative bg-gradient-to-br from-[#7B1E1E] via-[#541313] to-[#2A0A0A] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#C79A2D]/30 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#C79A2D]/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#C79A2D]/10 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[#C79A2D]/20 border border-[#facf6b]/40 text-[#facf6b] px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>मॉडल रिपोर्ट कार्ड</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold font-heading-hi text-white">
                प्रदर्शन रिपोर्ट की <span className="text-[#C79A2D]">विशेषताएँ</span>
              </h3>
              <ul className="space-y-2 text-medium text-gray-300 font-semibold">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>विषयवार प्रदर्शन का विश्लेषण</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>स्कूल एवं राष्ट्रीय स्तर पर तुलना</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>मजबूत क्षेत्रों की पहचान एवं सुधार सुझाव</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigateTo('/performance-report')}
              className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C79A2D] to-amber-500 hover:from-amber-500 hover:to-[#C79A2D] text-red-950 font-bold text-base rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <span>रिपोर्ट कार्ड खोजें</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom CTA – extra prompt */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-3 bg-amber-100/70 dark:bg-amber-900/30 backdrop-blur-sm px-8 py-4 rounded-2xl border border-amber-300 dark:border-amber-700 shadow-sm">
            <Sparkles className="w-6 h-6 text-[#C79A2D]" />
            <p className="text-medium text-gray-700 dark:text-gray-300 font-semibold">
              <strong className="text-red-800 dark:text-[#C79A2D]">4.5 लाख+</strong> विद्यार्थियों ने अपनी रिपोर्ट प्राप्त की – क्या आपने चेक किया?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkAssessmentPage;