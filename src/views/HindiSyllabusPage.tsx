'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import {
  Calendar,
  Clock,
  Trophy,
  Download,
  BookOpenCheck,
  ScrollText,
  Sparkles,
  GraduationCap,
  Layers,
  Target,
  ChevronDown,
  Star,
  Zap,
  Crown,
  Heart,
  Award,
} from 'lucide-react';

// Syllabus transcribed from the shared Hindi_Pathyakram_Class_1_to_10.docx (हिंदी पाठ्यक्रम).
type ClassSyllabus = {
  grade: string;
  reading: string;
  grammar: { title: string; items: string[] }[];
  general: string[];
  quote?: { text: string; author: string };
};

const CLASS_SYLLABUS: ClassSyllabus[] = [
  {
    grade: '1',
    reading: 'स्कॉलर ज़ोन',
    grammar: [
      { title: 'भाषा ज्ञान', items: ['भाषा क्या है?', 'वर्णमाला का ज्ञान', 'मात्रा का ज्ञान', 'शब्द और वाक्य', 'अनुस्वार व अनुनासिक का ज्ञान'] },
      { title: 'व्याकरणिक बोध', items: ['लिंग का ज्ञान', 'संज्ञा', 'वचन', 'सर्वनाम', 'विशेषण', 'कामों के नाम', 'विलोम शब्द', 'अनेक शब्दों के लिए एक शब्द'] },
    ],
    general: ['गिनती', 'कहानी', 'निबंध'],
  },
  {
    grade: '2',
    reading: 'स्कॉलर ज़ोन',
    grammar: [
      { title: 'भाषा ज्ञान', items: ['भाषा', 'वर्ण-विचार', 'शब्द और वाक्य'] },
      { title: 'व्याकरणिक बोध', items: ['संज्ञा', 'लिंग', 'वचन', 'सर्वनाम', 'विशेषण', 'क्रिया', 'विलोम शब्द', 'अनेक शब्दों के लिए एक शब्द', 'पर्यायवाची शब्द', 'शुद्ध-अशुद्ध शब्द', 'मुहावरे'] },
    ],
    general: ['गिनती', 'दिन और महीने', 'कहानी लेखन', 'निबंध लेखन'],
  },
  {
    grade: '3',
    reading: 'स्कॉलर ज़ोन',
    grammar: [
      { title: 'भाषा ज्ञान', items: ['स्वर', 'व्यंजन', 'अनुस्वार', 'अनुनासिक', 'शब्दार्थ', 'शुद्ध-अशुद्ध शब्द', 'सम-विषम शब्द'] },
      { title: 'व्याकरणिक बोध', items: ['संज्ञा', 'सर्वनाम', 'क्रिया-विशेषण', 'विलोम शब्द', 'अनेक शब्दों के लिए एक शब्द', 'पर्यायवाची शब्द', 'उपसर्ग', 'प्रत्यय', 'मुहावरे और वर्तनी'] },
    ],
    general: ['अपठित गद्यांश', 'अपठित पद्यांश', 'व्यवहारिक हिंदी'],
  },
  {
    grade: '4',
    reading: 'स्कॉलर ज़ोन',
    grammar: [
      { title: 'भाषा ज्ञान', items: ['स्वर', 'व्यंजन', 'वर्तनी सुधार', 'शब्द भंडार', 'शुद्ध-अशुद्ध शब्द', 'रिक्त स्थानों की पूर्ति', 'जोड़े-मिलान', 'सम-विषम शब्द'] },
      { title: 'व्याकरणिक बोध', items: ['संज्ञा', 'सर्वनाम', 'क्रिया', 'विशेषण', 'विलोम शब्द', 'कारक', 'पर्यायवाची शब्द', 'उपसर्ग', 'प्रत्यय', 'मुहावरे'] },
    ],
    general: ['अपठित गद्यांश', 'अपठित पद्यांश', 'संबंध वाले शब्द', 'तार्किकता', 'व्यवहारिक हिंदी'],
  },
  {
    grade: '5',
    reading: 'स्कॉलर ज़ोन',
    grammar: [
      { title: 'भाषा ज्ञान', items: ['स्वर', 'व्यंजन', 'वर्तनी सुधार', 'शब्द भंडार', 'रिक्त स्थानों की पूर्ति', 'दैनिक जीवन में प्रयोग होने वाले शब्द', 'सम-विषम शब्द'] },
      { title: 'व्याकरणिक बोध', items: ['संज्ञा', 'सर्वनाम', 'क्रिया', 'सहायक क्रिया', 'लिंग', 'वचन', 'काल', 'विशेषण', 'विलोम शब्द', 'कारक', 'पर्यायवाची शब्द', 'उपसर्ग', 'प्रत्यय', 'संधि', 'मुहावरे'] },
    ],
    general: ['अपठित गद्यांश', 'अपठित पद्यांश', 'संबंध वाले शब्द', 'तार्किकता', 'व्यवहारिक हिंदी'],
  },
  {
    grade: '6',
    reading: 'स्कॉलर ज़ोन',
    grammar: [
      { title: 'भाषा ज्ञान', items: ['भाषा', 'स्वर', 'व्यंजन', 'वर्तनी सुधार', 'शब्दार्थ', 'शब्द भंडार', 'रिक्त स्थानों की पूर्ति', 'दैनिक जीवन में प्रयोग होने वाले शब्द', 'सम-विषम शब्द'] },
      { title: 'व्याकरणिक बोध', items: ['सर्वनाम', 'क्रिया', 'सहायक क्रिया', 'लिंग', 'वचन', 'काल', 'विशेषण', 'विलोम शब्द', 'कारक', 'पर्यायवाची शब्द', 'उपसर्ग', 'प्रत्यय', 'संधि', 'अलंकार', 'समास', 'मुहावरे'] },
    ],
    general: ['अपठित गद्यांश', 'अपठित पद्यांश', 'संबंध वाले शब्द', 'दो समान शब्दों में अंतर स्पष्ट करना', 'शब्दों का सही वाक्य प्रयोग करना'],
  },
  {
    grade: '7',
    reading: 'स्कॉलर ज़ोन',
    grammar: [
      { title: 'भाषा ज्ञान', items: ['स्वर', 'व्यंजन', 'शब्द विचार', 'शुद्ध-अशुद्ध शब्द', 'शुद्ध शब्दों का चयन', 'वाक्य-विचार'] },
      { title: 'व्याकरणिक बोध', items: ['संज्ञा', 'सर्वनाम', 'काल', 'क्रिया', 'वचन', 'विशेषण', 'विपरीतार्थक शब्द', 'पर्यायवाची शब्द', 'अनेक शब्दों के लिए एक शब्द', 'संधि', 'अलंकार', 'समास', 'मुहावरे'] },
    ],
    general: ['अपठित गद्यांश', 'अपठित पद्यांश', 'वाक्यों की सामान्य अशुद्धि संशोधन'],
  },
  {
    grade: '8',
    reading: 'स्कॉलर ज़ोन',
    grammar: [
      { title: 'भाषा ज्ञान', items: ['वर्ण-विचार', 'शब्द विचार', 'वर्तनी और उच्चारण', 'शब्द युग्म', 'वाक्य भेद'] },
      { title: 'व्याकरणिक बोध', items: ['संज्ञा', 'सर्वनाम', 'क्रिया', 'क्रिया-विशेषण', 'वचन', 'विशेषण', 'विलोम शब्द', 'पर्यायवाची शब्द', 'अनेक शब्दों के लिए एक शब्द', 'विराम चिह्न', 'समानार्थक शब्द', 'समूहवाची शब्द', 'अनेकार्थी शब्द', 'समुच्चयबोधक अव्यय', 'संबंधबोधक अव्यय', 'उपसर्ग', 'प्रत्यय', 'संधि', 'अलंकार', 'समास', 'मुहावरे'] },
    ],
    general: ['अपठित गद्यांश', 'अपठित पद्यांश', 'वाक्यों की सामान्य अशुद्धि संशोधन'],
  },
  {
    grade: '9',
    reading: 'स्कॉलर ज़ोन',
    grammar: [
      { title: 'भाषा ज्ञान', items: ['वर्ण, वर्णमाला', 'शब्द और पद', 'नुक्ता', 'वाक्य अर्थ की दृष्टि से वाक्य भेद', 'अनुस्वार व अनुनासिक', "'र' के विभिन्न रूप"] },
      { title: 'व्याकरणिक बोध', items: ['संज्ञा', 'सर्वनाम', 'लिंग', 'वचन', 'कारक', 'क्रिया', 'क्रिया-विशेषण', 'विशेषण', 'विलोम शब्द', 'पर्यायवाची शब्द', 'अनेक शब्दों के लिए एक शब्द', 'विराम चिह्न', 'अनेकार्थी शब्द', 'उपसर्ग', 'प्रत्यय', 'संधि', 'अलंकार', 'समास', 'मुहावरे'] },
    ],
    general: ['अपठित गद्यांश', 'अपठित पद्यांश', 'अशुद्ध वाक्य संशोधन', 'व्याकरणिक हिंदी'],
  },
  {
    grade: '10',
    reading: 'स्कॉलर ज़ोन',
    grammar: [
      { title: 'भाषा ज्ञान', items: ['वाक्य की परिभाषा', 'रचना के आधार पर वाक्य भेद', 'अशुद्ध वाक्य संशोधन'] },
      { title: 'व्याकरणिक बोध', items: ['संज्ञा', 'सर्वनाम', 'लिंग', 'वचन', 'कारक', 'क्रिया', 'विशेषण', 'विलोम शब्द', 'पर्यायवाची शब्द', 'अनेक शब्दों के लिए एक शब्द', 'अव्यय', 'समानार्थक शब्द', 'उपसर्ग', 'प्रत्यय', 'वाच्य', 'अलंकार', 'पदबंध', 'समास', 'मुहावरे'] },
    ],
    general: ['अपठित गद्यांश', 'अपठित पद्यांश', 'व्याकरणिक हिंदी'],
  },
];

const SYLLABUS_PDF_HREF = '/downloads/hindi-olympiad-syllabus.pdf';

const QUICK_FACTS = [
  { icon: GraduationCap, label: 'कक्षा 1 से 10', sub: 'स्तरानुसार पाठ्यक्रम' },
  { icon: Layers, label: '4 अनुभाग', sub: 'भाषा ज्ञान · व्याकरणिक बोध · तार्किक क्षमता · विशेष योग्यता' },
  { icon: Target, label: '60 मिनट', sub: '100 वस्तुनिष्ठ अंक' },
];

// 10 unique color themes — one per grade
const GRADE_THEMES = [
  { numBg: "from-blue-500 to-cyan-500", numBorder: "border-blue-300/60", headOpen: "from-blue-50 to-cyan-50", headHover: "hover:from-blue-100 hover:to-cyan-100", bodyAccent: "border-blue-400/40", iconColor: "text-blue-600", chipBg: "bg-blue-100 text-blue-800 border-blue-300", titleColor: "text-blue-900", focusBg: "bg-blue-50 border-blue-300", focusText: "text-blue-800", spark: "text-blue-500" },
  { numBg: "from-orange-500 to-amber-500", numBorder: "border-orange-300/60", headOpen: "from-orange-50 to-amber-50", headHover: "hover:from-orange-100 hover:to-amber-100", bodyAccent: "border-orange-400/40", iconColor: "text-orange-600", chipBg: "bg-orange-100 text-orange-800 border-orange-300", titleColor: "text-orange-900", focusBg: "bg-orange-50 border-orange-300", focusText: "text-orange-800", spark: "text-orange-500" },
  { numBg: "from-purple-500 to-fuchsia-500", numBorder: "border-purple-300/60", headOpen: "from-purple-50 to-fuchsia-50", headHover: "hover:from-purple-100 hover:to-fuchsia-100", bodyAccent: "border-purple-400/40", iconColor: "text-purple-600", chipBg: "bg-purple-100 text-purple-800 border-purple-300", titleColor: "text-purple-900", focusBg: "bg-purple-50 border-purple-300", focusText: "text-purple-800", spark: "text-purple-500" },
  { numBg: "from-emerald-500 to-teal-500", numBorder: "border-emerald-300/60", headOpen: "from-emerald-50 to-teal-50", headHover: "hover:from-emerald-100 hover:to-teal-100", bodyAccent: "border-emerald-400/40", iconColor: "text-emerald-600", chipBg: "bg-emerald-100 text-emerald-800 border-emerald-300", titleColor: "text-emerald-900", focusBg: "bg-emerald-50 border-emerald-300", focusText: "text-emerald-800", spark: "text-emerald-500" },
  { numBg: "from-rose-500 to-pink-500", numBorder: "border-rose-300/60", headOpen: "from-rose-50 to-pink-50", headHover: "hover:from-rose-100 hover:to-pink-100", bodyAccent: "border-rose-400/40", iconColor: "text-rose-600", chipBg: "bg-rose-100 text-rose-800 border-rose-300", titleColor: "text-rose-900", focusBg: "bg-rose-50 border-rose-300", focusText: "text-rose-800", spark: "text-rose-500" },
  { numBg: "from-indigo-500 to-violet-500", numBorder: "border-indigo-300/60", headOpen: "from-indigo-50 to-violet-50", headHover: "hover:from-indigo-100 hover:to-violet-100", bodyAccent: "border-indigo-400/40", iconColor: "text-indigo-600", chipBg: "bg-indigo-100 text-indigo-800 border-indigo-300", titleColor: "text-indigo-900", focusBg: "bg-indigo-50 border-indigo-300", focusText: "text-indigo-800", spark: "text-indigo-500" },
  { numBg: "from-amber-500 to-yellow-500", numBorder: "border-amber-300/60", headOpen: "from-amber-50 to-yellow-50", headHover: "hover:from-amber-100 hover:to-yellow-100", bodyAccent: "border-amber-400/40", iconColor: "text-amber-600", chipBg: "bg-amber-100 text-amber-800 border-amber-300", titleColor: "text-amber-900", focusBg: "bg-amber-50 border-amber-300", focusText: "text-amber-800", spark: "text-amber-500" },
  { numBg: "from-teal-500 to-cyan-500", numBorder: "border-teal-300/60", headOpen: "from-teal-50 to-cyan-50", headHover: "hover:from-teal-100 hover:to-cyan-100", bodyAccent: "border-teal-400/40", iconColor: "text-teal-600", chipBg: "bg-teal-100 text-teal-800 border-teal-300", titleColor: "text-teal-900", focusBg: "bg-teal-50 border-teal-300", focusText: "text-teal-800", spark: "text-teal-500" },
  { numBg: "from-fuchsia-500 to-pink-500", numBorder: "border-fuchsia-300/60", headOpen: "from-fuchsia-50 to-pink-50", headHover: "hover:from-fuchsia-100 hover:to-pink-100", bodyAccent: "border-fuchsia-400/40", iconColor: "text-fuchsia-600", chipBg: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300", titleColor: "text-fuchsia-900", focusBg: "bg-fuchsia-50 border-fuchsia-300", focusText: "text-fuchsia-800", spark: "text-fuchsia-500" },
  { numBg: "from-red-500 to-rose-600", numBorder: "border-red-300/60", headOpen: "from-red-50 to-rose-50", headHover: "hover:from-red-100 hover:to-rose-100", bodyAccent: "border-red-400/40", iconColor: "text-red-600", chipBg: "bg-red-100 text-red-800 border-red-300", titleColor: "text-red-900", focusBg: "bg-red-50 border-red-300", focusText: "text-red-800", spark: "text-red-500" },
];

export const HindiSyllabusPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [openGrade, setOpenGrade] = useState<string>(CLASS_SYLLABUS[0].grade);

  return (
    <>
      <div className="relative overflow-hidden min-h-screen pb-16
        bg-gradient-to-br from-amber-50/70 via-white to-blue-50/50">

        {/* Rainbow animated top border */}
        {/* <div className="absolute top-0 left-0 right-0 h-1
          bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-blue-500 via-purple-500 to-rose-500 hsyl-border-flow" /> */}

        {/* ============ BACKGROUND LAYERS ============ */}

        {/* Animated dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]
            bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
            bg-[length:60px_60px,80px_80px] hsyl-grid-pan"
        />

        {/* Diagonal stripes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]
            bg-[repeating-linear-gradient(45deg,#7c3aed_0px,#7c3aed_1px,transparent_1px,transparent:22px)]"
        />

        {/* Drifting orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[8%] left-[5%] w-80 h-80 rounded-full bg-blue-300/25 blur-3xl hsyl-orb-a" />
          <div className="absolute top-[25%] right-[4%] w-72 h-72 rounded-full bg-purple-300/25 blur-3xl hsyl-orb-b" />
          <div className="absolute bottom-[15%] left-[30%] w-80 h-80 rounded-full bg-amber-300/25 blur-3xl hsyl-orb-a [animation-delay:-5s]" />
          <div className="absolute bottom-[5%] right-[20%] w-64 h-64 rounded-full bg-emerald-300/20 blur-3xl hsyl-orb-b [animation-delay:-8s]" />
        </div>

        {/* Rotating dashed rings */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] right-[8%] w-44 h-44 rounded-full border-2 border-dashed border-blue-300/40 hsyl-spin-slow" />
          <div className="absolute bottom-[12%] left-[6%] w-56 h-56 rounded-full border border-dashed border-amber-300/40 hsyl-spin-rev" />
        </div>

        {/* Light sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3
            bg-gradient-to-r from-transparent via-white/50 to-transparent
            skew-x-[-25deg] hsyl-sweep"
        />

        {/* Twinkling stars */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[15%] left-[14%] w-2 h-2 rounded-full bg-amber-400 hsyl-twinkle" />
          <div className="absolute top-[45%] right-[22%] w-1.5 h-1.5 rounded-full bg-blue-400 hsyl-twinkle [animation-delay:0.8s]" />
          <div className="absolute bottom-[25%] left-[45%] w-2 h-2 rounded-full bg-emerald-400 hsyl-twinkle [animation-delay:1.6s]" />
          <div className="absolute top-[70%] right-[10%] w-1.5 h-1.5 rounded-full bg-purple-400 hsyl-twinkle [animation-delay:2.4s]" />
        </div>

        {/* Floating decorative icons */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[12%] left-[8%] text-amber-400/20 hsyl-float">
            <Trophy className="w-16 h-16" />
          </div>
          <div className="absolute top-[20%] right-[12%] text-blue-400/20 hsyl-float-slow">
            <Award className="w-16 h-16" />
          </div>
          <div className="absolute bottom-[18%] left-[12%] text-emerald-400/20 hsyl-drift">
            <GraduationCap className="w-14 h-14" />
          </div>
          <div className="absolute bottom-[12%] right-[10%] text-purple-400/20 hsyl-float [animation-delay:-3s]">
            <Crown className="w-14 h-14" />
          </div>
        </div>

        {/* ============ CONTENT ============ */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 z-10">

          <Breadcrumb
            title="हिंदी पाठ्यक्रम"
            items={[
              { label: "हिंदी पाठ्यक्रम" },
            ]}
          />

          {/* ============ Intro / Info Block ============ */}
          <div className="relative overflow-hidden text-[#F5F0E6]">
            <div className="absolute inset-x-0 top-0 h-2" />

            <div className="relative max-w-6xl space-y-5">
              <div className="inline-flex items-center gap-2 text-amber-800 font-bold text-sm tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                <Sparkles className="w-4 h-4 text-amber-600 hsyl-twinkle" />
                <span>{'भारती भाषा ओलंपियाड · हिंदी पाठ्यक्रम'}</span>
              </div>

              <h1 className="font-playfair text-3xl sm:text-4xl font-bold leading-tight text-[#02206b]">
                {'हिंदी विभाग का '}<span className="text-[#C79A2D]">{'सम्पूर्ण पाठ्यक्रम'}</span>
              </h1>

              <p className="text-lg text-slate-800 dark:text-gray-300 leading-relaxed font-devanagari">
                {'भाषा ज्ञान, व्याकरणिक बोध, तार्किक क्षमता एवं विशेष योग्यता पर आधारित — नीचे अपनी कक्षा चुनें और अनुभागवार पाठ्यक्रम देखें।'}
              </p>
            </div>
          </div>

          {/* ============ Curriculum Header ============ */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C79A2D] hsyl-twinkle" />
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7B1E1E] dark:text-[#C79A2D]">
                {'पाठ्यक्रम एवं परीक्षा प्रारूप'}
              </p>
            </div>
            <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
              {'कक्षा-अनुसार पाठ्यक्रम चुनें'}
            </h2>
            <p className="mt-2 text-lg text-slate-800 dark:text-gray-300 leading-relaxed font-devanagari">
              {'नीचे दी गई सूची में से अपनी कक्षा चुनें, संबंधित भाषा ज्ञान, व्याकरणिक बोध एवं तार्किक क्षमता की विषय-वस्तु तुरंत दिखाई देगी।'}
            </p>
          </div>

          {/* ============ Accordion ============ */}
          <div className="mt-8 space-y-5">
            {CLASS_SYLLABUS.map((active, idx) => {
              const isOpen = active.grade === openGrade;
              const theme = GRADE_THEMES[idx % GRADE_THEMES.length];

              return (
                <div
                  key={active.grade}
                  className={`relative rounded-3xl overflow-hidden
                    bg-white border-2 transition-all duration-500
                    ${isOpen
                      ? `border-transparent shadow-2xl`
                      : `border-slate-200/70 hover:border-slate-300 shadow-md hover:shadow-xl`
                    }`}
                >
                  {/* Gradient rainbow border (only when open) */}
                  {isOpen && (
                    <div aria-hidden
                      className={`absolute inset-0 rounded-3xl p-[2px] -z-10
                        bg-gradient-to-r ${theme.numBg} hsyl-border-flow`}
                    />
                  )}

                  {/* Accordion header */}
                  <button
                    type="button"
                    onClick={() => setOpenGrade(isOpen ? '' : active.grade)}
                    aria-expanded={isOpen}
                    className={`w-full flex items-center justify-between gap-4 p-3 sm:p-5 text-left
                      transition-all duration-500 group relative overflow-hidden
                      ${isOpen
                        ? `bg-gradient-to-r ${theme.headOpen}`
                        : `bg-white ${theme.headHover}`
                      }`}
                  >
                    {/* Shine sweep on hover */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 -left-full h-full w-1/2
                        bg-gradient-to-r from-transparent via-white/60 to-transparent
                        skew-x-[-25deg] group-hover:animate-[hsyl-sweep_1.2s_ease-out]" />
                    </div>

                    <div className="flex items-center gap-4 relative z-[2]">
                      {/* Grade number badge */}
                      <span
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl
                          text-xl font-extrabold border-2 transition-all duration-500
                          ${isOpen
                            ? `bg-gradient-to-br ${theme.numBg} text-white border-white/60 shadow-lg scale-110`
                            : `bg-gradient-to-br ${theme.numBg} text-white border-white/50 shadow-md group-hover:scale-110 group-hover:rotate-6`
                          }`}
                      >
                        {active.grade}
                      </span>

                      <div>
                        <h3 className={`font-playfair text-2xl font-bold transition-colors duration-500
                          ${isOpen ? theme.titleColor : 'text-slate-900 dark:text-white'}`}>
                          {'कक्षा ' + active.grade + ' — हिंदी पाठ्यक्रम'}
                        </h3>
                        <p className="text-sm text-gray-800 mt-0.5 font-medium">
                          {'भारती भाषा ओलंपियाड · अपनी भाषा, अपनी पहचान'}
                        </p>
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronDown
                      className={`relative z-[2] h-6 w-6 shrink-0 transition-all duration-500
                        ${isOpen
                          ? `rotate-180 scale-110 ${theme.iconColor}`
                          : 'text-slate-500 group-hover:text-slate-700'
                        }`}
                    />

                    {/* Sparkle in header */}
                    <Sparkles
                      className={`absolute top-3 right-16 w-4 h-4 ${theme.spark} opacity-60 hsyl-twinkle`}
                    />
                  </button>

                  {/* Accordion content */}
                  {isOpen && (
                    <div className="px-6 sm:px-10 pb-6 sm:pb-10 space-y-8 relative">
                      {/* Small dot pattern inside */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.04]
                          bg-[radial-gradient(#0B0B1A_1px,transparent_1px)]
                          [background-size:20px_20px]"
                      />

                      <div className="relative z-[2] space-y-8 pt-6">
                        {/* विशेष योग्यता */}
                        <div className={`rounded-xl border-2 px-5 py-4 ${theme.focusBg}`}>
                          <p className={`text-base font-bold ${theme.focusText} flex items-center gap-2`}>
                            <Target className="w-4 h-4 hsyl-badge-bounce" />
                            {'विशेष योग्यता'}
                          </p>
                          <p className="mt-1.5 text-medium text-black leading-relaxed">{active.reading}</p>
                        </div>

                        {/* भाषा ज्ञान एवं व्याकरणिक बोध */}
                        <div>
                          <p className={`rounded-lg border-2 ${theme.chipBg} px-5 py-2.5 text-base font-bold inline-flex items-center gap-2 shadow-sm`}>
                            <BookOpenCheck className="h-4 w-4" />
                            {'भाषा ज्ञान एवं व्याकरणिक बोध'}
                          </p>
                          <div className="mt-5 grid gap-7 sm:grid-cols-2">
                            {active.grammar.map((g) => (
                              <div key={g.title}
                                className="rounded-xl border-2 border-slate-100 p-4
                                  hover:border-current transition-colors duration-500
                                  hover:shadow-md"
                                style={{ ['--tw-border-opacity' as any]: 1 }}>
                                <p className={`text-lg font-bold ${theme.titleColor} flex items-center gap-2`}>
                                  <Star className={`w-4 h-4 ${theme.spark} fill-current`} />
                                  {g.title}
                                </p>
                                <ul className="mt-2 space-y-1.5">
                                  {g.items.map((it) => (
                                    <li key={it}
                                      className="text-medium text-black leading-relaxed pl-4 relative
                                        before:content-['—'] before:absolute before:left-0 before:font-bold before:text-black">
                                      {it}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* तार्किक क्षमता */}
                        <div>
                          <p className={`rounded-lg border-2 ${theme.chipBg} px-5 py-2.5 text-base font-bold inline-flex items-center gap-2 shadow-sm`}>
                            <Zap className="w-4 h-4" />
                            {'तार्किक क्षमता'}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2.5">
                            {active.general.map((it) => (
                              <span
                                key={it}
                                className={`text-medium font-bold bg-white border-2 rounded-full px-4 py-2
                                  text-black
                                  ${theme.numBorder}
                                  hover:scale-105 hover:shadow-md transition-all duration-300`}
                              >
                                {it}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Quote (optional — not present in the shared doc, so nothing renders) */}
                        {active.quote && (
                          <div className={`relative overflow-hidden rounded-xl border-l-4 px-5 py-4 hsyl-quote-fade ${theme.focusBg}`}>
                            <div aria-hidden className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${theme.spark} opacity-10 blur-2xl`} />
                            <Heart className={`w-5 h-5 ${theme.iconColor} hsyl-twinkle`} />
                            <p className="mt-2 text-medium italic text-black leading-relaxed">
                              {'“' + active.quote.text + '”'}
                            </p>
                            <p className={`mt-2 text-sm font-bold ${theme.titleColor}`}>
                              {'— ' + active.quote.author}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HindiSyllabusPage;