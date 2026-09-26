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
  Award,
} from 'lucide-react';

const CLASS_SYLLABUS = [
  {
    grade: '6',
    reading: 'अपठित गद्यांशाधारित प्रश्नाः:',
    grammar: [
      { title: 'वर्णज्ञानम्', items: ['वर्णविचारः', 'वर्णसंयोजनम्', 'वर्णविभागः', 'वर्णमालाक्रमः', 'वर्णनाम'] },
      { title: 'धातुरूपाणि (परस्मैपदे)', items: ['लट् लकारः', 'लृट् लकारः', 'लङ् लकारः', 'लोट् लकारः', 'तिङन्तपदस्य लकारः'] },
      { title: 'पदज्ञानम्', items: ['पदांचयपदम्', 'विलोमपदम्', 'अव्ययपदम्', 'सुबन्तपदम्', 'तिङन्तपदम्'] },
      { title: 'पदपरिवर्तनम्', items: ['वचनपरिवर्तनम्', 'लकारपरिवर्तनम्', 'विभक्तिपरिवर्तनम्', 'पुरुषपरिवर्तनम्', 'लिङ्गपरिवर्तनम्'] },
      { title: 'शब्दरूपाणि', items: ['आकारान्त-पुल्लिङ्ग', 'आकारान्त-स्त्रीलिङ्ग', 'आकारान्त-नपुंसकलिङ्ग', 'इकारान्त-पुल्लिङ्ग', 'उकारान्त-पुल्लिङ्ग'] },
      { title: 'संख्यापद-प्रयोगज्ञानम्', items: ['विशेषणपद संख्या', 'अङ्कस्य संख्यानाम', 'संख्यालेखनम्', 'पूर्व/उत्तरवर्तिनी संख्या'] },
    ],
    general: ['लिङ्ग-विभक्ति-वचनानि', 'धातु-लकार-पुरुषाः', 'कारकम्', 'प्रसिद्ध सुभाषितप्रयोगः', 'श्लोके मन्त्रे वा रिक्तस्थानम्'],
  },
  {
    grade: '7',
    reading: 'अपठित गद्यांशाधारित प्रश्नाः — प्रत्येक भाषान्तर्गत विभागे 5-5 प्रश्नाः, प्रतिप्रश्नम् एक-एकः अङ्कः',
    grammar: [
      { title: 'वर्णज्ञानम्', items: ['वर्णविचारः (संयुक्ताक्षराणि)', 'वर्णसंयोजनम्', 'वर्णविन्यासः (ह्रस्व-दीर्घ, अन्तःस्थ-ऊष्म-अयोगवाह)', 'उच्चारणस्थानानि', 'वर्णविज्ञानम्'] },
      { title: 'लकारज्ञानम्', items: ['लट् लकारः', 'लृट् लकारः', 'लङ् लकारः', 'लुङ् लकारः', 'विधिलिङ् लकारः'] },
      { title: 'पदज्ञानम्', items: ['पर्यायपदम् / विलोमपदम्', 'शब्दक्रीडा / उपपदविभक्तिः', 'अव्ययपदम्', 'धातुरूपपदम्', 'तिङन्तपदम्'] },
      { title: 'पदपरिवर्तनम्', items: ['वचनपरिवर्तनम्', 'लकारपरिवर्तनम्', 'विभक्तिपरिवर्तनम्', 'पुरुषपरिवर्तनम्', 'लिङ्गपरिवर्तनम्'] },
      { title: 'शब्दरूपाणि', items: ['अकारान्त-पुल्लिङ्ग', 'ईकारान्त-स्त्रीलिङ्ग', 'उकारान्त-नपुंसकलिङ्ग', 'तत्/एतत्/किम् (त्रिलिङ्ग)'] },
      { title: 'संख्याप्रयोगज्ञानम्', items: ['विशेषणपद संख्या', 'संख्याविशेषण पदम्', 'अङ्कस्य संस्कृतनाम', 'संख्यालेखनम्', 'समूल्लेखनम्'] },
    ],
    general: ['पदाभिज्ञानम्', 'वाक्यप्रबोधः', 'कारकज्ञानम्', 'सन्धिः (दीर्घ-गुण)', 'श्लोके मन्त्रे वा रिक्तस्थानम्'],
  },
  {
    grade: '8',
    reading: 'अपठित गद्यांशाधारित प्रश्नाः — प्रत्येक भाषान्तर्गत विभागे 5-5 प्रश्नाः, प्रतिप्रश्नम् एक-एकः अङ्कः',
    grammar: [
      { title: 'वर्णज्ञानम्', items: ['वर्णविन्यासः (संयुक्ताक्षराणि)', 'वर्णसंयोजनम्', 'वर्णविभागः (स्वर-दीर्घ-अन्तःस्थ-ऊष्म-अयोगवाह)', 'उच्चारणस्थानानि', 'वर्णविकारः'] },
      { title: 'धातुरूपाणि (परस्मैपदे)', items: ['लट् लकारः', 'लृट् लकारः', 'लोट् लकारः', 'लङ् लकारः', 'विधिलिङ् लकारः'] },
      { title: 'पदानाम्', items: ['पर्यायपदम् / विलोमपदम्', 'कारकविभक्तिः', 'उपपदविभक्तिः', 'उपसर्गाः / अव्ययपदानि', 'प्रत्ययाः (क्त्वा, ल्यप्, तुमुन्, तव्य, अनीयर्)'] },
      { title: 'पदपरिवर्तनम्', items: ['वचनानि', 'गणसमासे', 'उपसर्गाः', 'अव्ययविर्भिचयः', 'ताद्धितानि'] },
      { title: 'शब्दरूपाणि', items: ['नकारान्त-पुंलिङ्ग (राजन्)', 'ऋकारान्त-स्त्रीलिङ्ग (मातृ, स्वसृ)', 'इकारान्त-नपुंसक/पुंलिङ्ग', 'इदम्/किम् (त्रिलिङ्ग)'] },
      { title: 'संख्यायोगानाम्', items: ['द्विवचनप्रयुक्ता संख्या', 'संख्याविशेषणपूर्व पदम्', 'अङ्कस्य संस्कृतनाम', 'संख्यालेखनम्', 'समप्रलेखनम्'] },
    ],
    general: ['पाठ 2–3', 'पाठ 4–6', 'पाठ 7–9', 'पाठ 10–12', 'पाठ 13–15'],
  },
  {
    grade: '9',
    reading: 'अपठित गद्यांशाधारित प्रश्नाः — प्रत्येक भाषान्तर्गत विभागे 5-5 प्रश्नाः, प्रतिप्रश्नम् एक-एकः अङ्कः',
    grammar: [
      { title: 'वर्णविचारः', items: ['स्वराहारज्ञानम्', 'वर्णमाला', 'वर्णमौष्य', 'उच्चारणस्थानानि', 'प्रत्ययानाम्'] },
      { title: 'संज्ञा एवं वाच्यपरिवर्तनम्', items: ['आगम-आदेशाः', 'व्याकरणप्रश्नाः', 'कर्तरि प्रयोगः', 'कर्मणि प्रयोगः', 'भावे प्रयोगः'] },
      { title: 'खरवचन-सन्धि-समासः', items: ['एच् / अवि स्वरसन्धिः', 'विविध स्वरसन्धिः (पूर्वरूप-पररूप-प्रकृतिभाव)', 'हल्सन्धयः', 'गुणागम-वृद्धि-प्रकृतिविधानानि', 'विसर्गसन्धिः'] },
      { title: 'शब्दरूपाणि', items: ['देवता — पुं/नपुंसकलिङ्ग', 'देवता — स्त्रीलिङ्ग', 'व्यञ्जनान्त शब्दाः', 'सर्वनामानि', 'संख्यावाचकाः'] },
      { title: 'धातुरूपाणि', items: ['गणपरिचयः', 'लकारपरिचयः', 'परस्मैपदिनः', 'आत्मनेपदिनः', 'उभयपदिनः'] },
    ],
    general: ['वेद / उपवेद / वेदाङ्ग', 'उपनिषद् / पुराणानि', 'प्रसिद्ध ग्रन्थाः', 'श्रीमद्भगवद्गीता', 'रामायणम् / महाभारतम्', 'नीतिवाक्यानि / सुभाषितानि', 'काव्य / रचनाकाराः', 'मन्त्राः / श्लोकाः', 'प्रशस्तिवचनानि', 'छन्दःशास्त्रम्'],
  },
  {
    grade: '10',
    reading: 'अपठित गद्यांशाधारित प्रश्नाः',
    grammar: [
      { title: 'वर्णविचारः', items: ['शब्दाहरणम्', 'वर्णमात्राज्ञानम्', 'वर्णसन्धिः', 'उच्चारणस्थानानि', 'प्रयत्नज्ञानम्'] },
      { title: 'संज्ञा एवं वाच्यपरिवर्तनम्', items: ['आगम-आदेशाः', 'व्याकरणप्रयोगाः', 'कर्तरि विभक्तिः', 'कर्मणि विभक्तिः', 'भावे प्रयोगः'] },
      { title: 'स्वर-व्यञ्जन सम्बन्धः', items: ['पदविच्छेद-स्वरसन्धयः', 'त्रिविध स्वरसन्धिः (पूर्वरूप-पररूप-प्रकृतिभाव)', 'हलन्तत्वम्', 'गुणागम-वृद्ध्यागम-विधानानि', 'विसर्गसन्धिः'] },
      { title: 'शब्दरूपाणि', items: ['स्वरान्त — पुं/नपुंसकलिङ्ग', 'स्वरान्त — स्त्रीलिङ्ग', 'व्यञ्जनान्त शब्दाः', 'सर्वनामानि', 'संख्यावाचकाः'] },
      { title: 'धातुरूपाणि', items: ['गणपरिचयः', 'लकारपरिचयः', 'परस्मैपदिनः', 'आत्मनेपदिनः', 'उभयपदिनः'] },
    ],
    general: ['वेद / उपवेद / वेदाङ्ग', 'उपनिषद् / पुराणानि', 'प्रसिद्ध ग्रन्थाः', 'श्रीमद्भगवद्गीता', 'रामायणम् / महाभारतम्', 'नीतिन्याय / स्मृतिन्याय', 'काव्य / रचनाकाराः', 'मन्त्राः / स्तोत्राणि', 'प्रश्नोत्तराणि', 'ध्येयवाक्यानि'],
  },
];

const SYLLABUS_PDF_HREF = '/downloads/sanskrit-olympiad-syllabus.pdf';

const QUICK_FACTS = [
  { icon: GraduationCap, label: 'कक्षा 6 से 10', sub: 'स्तरानुसार पाठ्यक्रम' },
  { icon: Layers, label: '3 अनुभाग', sub: 'पठनबोध · व्याकरण · सामान्यज्ञान' },
  { icon: Target, label: '60 मिनट', sub: '100 वस्तुनिष्ठ अंक' },
];

// 5 unique colorful themes — one per grade (6-10)
const GRADE_THEMES = [
  {
    numBg: "from-amber-500 to-orange-500",
    numBorder: "border-amber-300/60",
    headOpen: "from-amber-50 to-orange-50",
    headHover: "hover:from-amber-100 hover:to-orange-100",
    bodyAccent: "border-amber-400/40",
    iconColor: "text-amber-600",
    chipBg: "bg-amber-100 text-amber-800 border-amber-300",
    titleColor: "text-amber-900",
    focusBg: "bg-amber-50 border-amber-300",
    focusText: "text-amber-800",
    spark: "text-amber-500",
  },
  {
    numBg: "from-rose-500 to-red-600",
    numBorder: "border-rose-300/60",
    headOpen: "from-rose-50 to-red-50",
    headHover: "hover:from-rose-100 hover:to-red-100",
    bodyAccent: "border-rose-400/40",
    iconColor: "text-rose-600",
    chipBg: "bg-rose-100 text-rose-800 border-rose-300",
    titleColor: "text-rose-900",
    focusBg: "bg-rose-50 border-rose-300",
    focusText: "text-rose-800",
    spark: "text-rose-500",
  },
  {
    numBg: "from-purple-500 to-indigo-600",
    numBorder: "border-purple-300/60",
    headOpen: "from-purple-50 to-indigo-50",
    headHover: "hover:from-purple-100 hover:to-indigo-100",
    bodyAccent: "border-purple-400/40",
    iconColor: "text-purple-600",
    chipBg: "bg-purple-100 text-purple-800 border-purple-300",
    titleColor: "text-purple-900",
    focusBg: "bg-purple-50 border-purple-300",
    focusText: "text-purple-800",
    spark: "text-purple-500",
  },
  {
    numBg: "from-emerald-500 to-teal-600",
    numBorder: "border-emerald-300/60",
    headOpen: "from-emerald-50 to-teal-50",
    headHover: "hover:from-emerald-100 hover:to-teal-100",
    bodyAccent: "border-emerald-400/40",
    iconColor: "text-emerald-600",
    chipBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    titleColor: "text-emerald-900",
    focusBg: "bg-emerald-50 border-emerald-300",
    focusText: "text-emerald-800",
    spark: "text-emerald-500",
  },
  {
    numBg: "from-blue-500 to-cyan-600",
    numBorder: "border-blue-300/60",
    headOpen: "from-blue-50 to-cyan-50",
    headHover: "hover:from-blue-100 hover:to-cyan-100",
    bodyAccent: "border-blue-400/40",
    iconColor: "text-blue-600",
    chipBg: "bg-blue-100 text-blue-800 border-blue-300",
    titleColor: "text-blue-900",
    focusBg: "bg-blue-50 border-blue-300",
    focusText: "text-blue-800",
    spark: "text-blue-500",
  },
];

export const SanskritSyllabusPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [openGrade, setOpenGrade] = useState<string>(CLASS_SYLLABUS[0].grade);

  return (
    <>
      <div className="relative overflow-hidden min-h-screen pb-16
        bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-rose-50/50">

        {/* ============ BACKGROUND LAYERS ============ */}

        {/* 1) Animated dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]
            bg-[radial-gradient(circle_at_20%_30%,#7B1E1E_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
            bg-[length:60px_60px,80px_80px] ssk-grid-pan"
        />

        {/* 2) Diagonal stripes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]
            bg-[repeating-linear-gradient(45deg,#C79A2D_0px,#C79A2D_1px,transparent_1px,transparent:22px)]"
        />

        {/* 4) Rotating mandala rings */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] right-[8%] w-52 h-52 rounded-full border-2 border-dashed border-amber-400/30 ssk-mandala-spin" />
          <div className="absolute bottom-[12%] left-[6%] w-64 h-64 rounded-full border-2 border-dashed border-rose-400/25 ssk-mandala-spin [animation-duration:90s] [animation-direction:reverse]" />
          <div className="absolute top-[45%] left-[42%] w-40 h-40 rounded-full border border-dotted border-purple-400/25 ssk-spin-slow" />
        </div>

        {/* 5) Drifting color orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[8%] left-[5%] w-80 h-80 rounded-full bg-amber-300/30 blur-3xl ssk-orb-a" />
          <div className="absolute top-[25%] right-[4%] w-72 h-72 rounded-full bg-rose-300/25 blur-3xl ssk-orb-b" />
          <div className="absolute bottom-[15%] left-[30%] w-80 h-80 rounded-full bg-purple-300/25 blur-3xl ssk-orb-a [animation-delay:-5s]" />
          <div className="absolute bottom-[5%] right-[20%] w-64 h-64 rounded-full bg-emerald-300/20 blur-3xl ssk-orb-b [animation-delay:-8s]" />
        </div>

        {/* 6) Light sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3
            bg-gradient-to-r from-transparent via-white/50 to-transparent
            skew-x-[-25deg] ssk-sweep"
        />

        {/* 7) Twinkling stars */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[45%] right-[22%] w-1.5 h-1.5 rounded-full bg-rose-500 ssk-twinkle [animation-delay:0.8s]" />
          <div className="absolute bottom-[25%] left-[45%] w-2 h-2 rounded-full bg-emerald-500 ssk-twinkle [animation-delay:1.6s]" />
          <div className="absolute top-[70%] right-[10%] w-1.5 h-1.5 rounded-full bg-purple-500 ssk-twinkle [animation-delay:2.4s]" />
        </div>

        {/* 8) Floating decorative icons */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[12%] left-[8%] text-amber-500/20 ssk-float">
            <Trophy className="w-16 h-16" />
          </div>
          <div className="absolute top-[20%] right-[12%] text-rose-500/20 ssk-float-slow">
            <Award className="w-16 h-16" />
          </div>
          <div className="absolute bottom-[18%] left-[12%] text-emerald-500/20 ssk-drift">
            <GraduationCap className="w-14 h-14" />
          </div>
          <div className="absolute bottom-[12%] right-[10%] text-purple-500/20 ssk-float [animation-delay:-3s]">
            <Crown className="w-14 h-14" />
          </div>
        </div>

        {/* ============ CONTENT ============ */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 z-10">

          <Breadcrumb
            title="संस्कृत पाठ्यक्रम"
            items={[
              {
                label: "संस्कृत पाठ्यक्रम",
              },
            ]}
          />

          {/* Intro / info block */}
          <div className="relative overflow-hidden text-[#F5F0E6]">
            {/* <div className="absolute inset-x-0 top-0 h-2 rounded-full
              bg-gradient-to-r from-amber-500 via-rose-500 via-purple-500 via-emerald-500 via-blue-500 to-amber-500 ssk-border-flow" /> */}

            <div className="relative max-w-6xl space-y-5 pt-4">
              <div className="inline-flex items-center gap-2 text-amber-800 font-bold text-sm tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full border border-amber-300 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-600 ssk-twinkle" />
                <span>{'भारती भाषा ओलंपियाड · संस्कृत पाठ्यक्रम'}</span>
              </div>

              <h1 className="font-playfair text-3xl sm:text-4xl font-bold leading-tight text-[#02206b]">
                {'संस्कृत विभाग का '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  {'सम्पूर्ण पाठ्यक्रम'}
                </span>
              </h1>

              <p className="text-lg text-slate-800 dark:text-gray-300 leading-relaxed font-devanagari">
                {'देववाणी संस्कृत की शुद्धता, पाणिनि व्याकरण, शब्दरूप-धातुरूप, संधि-समास एवं सुभाषित नीति श्लोकों पर आधारित — नीचे अपनी कक्षा चुनें और अनुभागवार पाठ्यक्रम देखें।'}
              </p>
            </div>
          </div>

          {/* Curriculum header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C79A2D] ssk-twinkle" />
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7B1E1E] dark:text-[#C79A2D]">
                {'पाठ्यक्रम एवं परीक्षा प्रारूप'}
              </p>
            </div>
            <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
              {'कक्षा-अनुसार पाठ्यक्रम चुनें'}
            </h2>
            <p className="mt-2 text-lg text-slate-800 dark:text-gray-300 leading-relaxed font-devanagari">
              {'नीचे दी गई सूची में से अपनी कक्षा चुनें, संबंधित पठनबोध, व्याकरण एवं सामान्यज्ञान विषय-वस्तु तुरंत दिखाई देगी।'}
            </p>
          </div>

          {/* Accordion */}
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
                  {isOpen && (
                    <div aria-hidden
                      className={`absolute inset-0 rounded-3xl p-[2px] -z-10
                        bg-gradient-to-r ${theme.numBg} ssk-border-flow`}
                    />
                  )}

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
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 -left-full h-full w-1/2
                        bg-gradient-to-r from-transparent via-white/60 to-transparent
                        skew-x-[-25deg] group-hover:animate-[ssk-sweep_1.2s_ease-out]" />
                    </div>

                    <div className="flex items-center gap-4 relative z-[2]">
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
                          {'कक्षा ' + active.grade + ' — संस्कृत पाठ्यक्रम'}
                        </h3>
                        <p className="text-sm text-gray-800 mt-0.5 font-medium">
                          {'भारती भाषा ओलंपियाड · अपनी भाषा, अपनी पहचान'}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`relative z-[2] h-6 w-6 shrink-0 transition-all duration-500
                        ${isOpen
                          ? `rotate-180 scale-110 ${theme.iconColor}`
                          : 'text-slate-500 group-hover:text-slate-700'
                        }`}
                    />

                    <Sparkles
                      className={`absolute top-3 right-16 w-4 h-4 ${theme.spark} opacity-60 ssk-twinkle`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-10 pb-6 sm:pb-10 space-y-8 relative">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.04]
                          bg-[radial-gradient(#7B1E1E_1px,transparent_1px)]
                          [background-size:20px_20px]"
                      />

                      <div className="relative z-[2] space-y-8 pt-6">
                        {/* क. पठनबोधः */}
                        <div className={`rounded-xl border-2 px-5 py-4 ${theme.focusBg}`}>
                          <p className={`text-base font-bold ${theme.focusText} flex items-center gap-2`}>
                            <Target className="w-4 h-4 ssk-badge-bounce" />
                            {'क. पठनबोधः'}
                          </p>
                          <p className="mt-1.5 text-medium text-black leading-relaxed">{active.reading}</p>
                        </div>

                        {/* ख. व्याकरणम् */}
                        <div>
                          <p className={`rounded-lg border-2 ${theme.chipBg} px-5 py-2.5 text-base font-bold inline-flex items-center gap-2 shadow-sm`}>
                            <BookOpenCheck className="h-4 w-4" />
                            {'ख. व्याकरणम्'}
                          </p>
                          <div className="mt-5 grid gap-7 sm:grid-cols-2">
                            {active.grammar.map((g) => (
                              <div key={g.title}
                                className="rounded-xl border-2 border-slate-100 p-4
                                  hover:border-current transition-colors duration-500
                                  hover:shadow-md">
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

                        {/* ग. संस्कृतसामान्यज्ञानम् */}
                        <div>
                          <p className={`rounded-lg border-2 ${theme.chipBg} px-5 py-2.5 text-base font-bold inline-flex items-center gap-2 shadow-sm`}>
                            <Zap className="w-4 h-4" />
                            {'ग. संस्कृतसामान्यज्ञानम्'}
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

export default SanskritSyllabusPage;