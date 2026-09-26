'use client';

import React, { useState } from 'react';
import {
  BookOpenCheck,
  Target,
  ChevronDown,
  Star,
  Zap,
  Heart,
  Download,
  Sparkles,
} from 'lucide-react';

// Syllabus transcribed from the official हिंदी भाषा पाठ्यक्रम (कक्षा 1-10) sheet.
const CLASS_SYLLABUS = [
  {
    grade: '1',
    reading: 'चित्र, वर्ण एवं मूल शब्द-ज्ञान पर आधारित प्रश्न',
    grammar: [
      { title: 'पहचान एवं चित्र ज्ञान', items: ['छोटे-बड़े जीव-जंतुओं एवं उनके रहने के स्थान की पहचान', 'वर्णों की पहचान', 'चित्र देखकर बिना मात्रा वाले सही शब्द की पहचान', 'बिना मात्रा वाले शब्द पढ़कर सही चित्र की पहचान', 'चित्र का पहले अक्षर से मिलान'] },
      { title: 'वचन एवं लिंग', items: ['एक-अनेक (वचन)', 'लिंग — स्त्री जाति, पुरुष जाति'] },
    ],
    general: ['वचन-पहचान', 'लिंग-पहचान', 'चित्र-शब्द मिलान'],
  },
  {
    grade: '2',
    reading: 'स्वर-व्यंजन, मात्रा एवं सामान्य शब्द-ज्ञान पर आधारित प्रश्न',
    grammar: [
      { title: 'वर्ण एवं मात्रा ज्ञान', items: ['वर्णों की पहचान (स्वर एवं व्यंजन)', 'स्वरों की मात्राओं की सही पहचान', 'स्वरों का सही क्रम एवं मात्राएँ', 'अलग शब्द की पहचान'] },
      { title: 'शब्द एवं वाक्य ज्ञान', items: ['नाम वाले शब्द — संज्ञा', 'चित्र देखकर सही शब्द की पहचान', 'शब्द पढ़कर सही चित्र की पहचान', 'एक-अनेक शब्द (वचन)', 'लिंग (स्त्रीलिंग एवं पुल्लिंग)', 'विपरीत अर्थ वाले शब्द (विलोम)'] },
    ],
    general: ['गिनती का सही क्रम (1 से 10)', 'कलगी एवं बिना कलगी वाले पक्षियों के नाम', 'घास एवं मांस खाने वाले जीव-जंतुओं के नाम एवं आवाजें', 'फल एवं सब्जियों के रंग एवं स्वाद'],
  },
  {
    grade: '3',
    reading: 'वर्ण, मात्रा एवं शब्द-शुद्धता पर आधारित प्रश्न',
    grammar: [
      { title: 'वर्ण एवं मात्रा ज्ञान', items: ['स्वरों एवं व्यंजनों की पहचान', "'र' के विविध रूप", 'संयुक्त व्यंजन', 'मात्राओं की पहचान', 'बिंदु (ं) एवं चंद्रबिंदु (ँ) के सही स्थान की पहचान', 'श, ष, स से बने सही शब्द की पहचान'] },
      { title: 'शब्द ज्ञान', items: ['संज्ञा एवं सर्वनाम शब्दों की पहचान', 'समान (पर्यायवाची) एवं विपरीत (विलोम) अर्थ वाले शब्द', 'शुद्ध शब्द', 'अनेक शब्दों के लिए एक शब्द'] },
    ],
    general: ['पशु-पक्षियों और उनकी आवाजों की पहचान', 'सप्ताह के दिनों के क्रमबद्ध नाम', 'गिनती का सही क्रम (1 से 20)', 'भारत के राष्ट्रीय ध्वज के रंगों की जानकारी'],
  },
  {
    grade: '4',
    reading: 'वर्ण-शुद्धता एवं शब्द-प्रयोग पर आधारित प्रश्न',
    grammar: [
      { title: 'वर्ण एवं मात्रा ज्ञान', items: ['स्वर एवं व्यंजन', 'संयुक्त व्यंजन', 'मात्राओं की पहचान', "'र' के रूप", 'बिंदु एवं चंद्रबिंदु के सही स्थान की पहचान'] },
      { title: 'शब्द एवं प्रयोग', items: ['शुद्ध शब्द', 'संज्ञा, सर्वनाम शब्दों की पहचान एवं उचित प्रयोग', 'पर्यायवाची एवं विलोम', 'शब्द-लड़ी', "अनेक शब्दों के लिए 'एक शब्द'"] },
    ],
    general: ['हिंदी में गिनती का सही क्रम (1 से 30)', 'भारत के धार्मिक एवं राष्ट्रीय त्योहारों के नाम'],
  },
  {
    grade: '5',
    reading: 'शब्द-भेद, मुहावरे-लोकोक्ति एवं वाक्य-रचना पर आधारित प्रश्न',
    grammar: [
      { title: 'वर्ण, मात्रा एवं विराम', items: ['स्वर, व्यंजन एवं मात्राएँ', 'संयुक्त व्यंजन', "'र' के रूप (रेफ और पदेन)", 'विराम चिन्ह', 'बिंदु एवं चंद्रबिंदु'] },
      { title: 'शब्द भेद एवं प्रयोग', items: ['संज्ञा, सर्वनाम, विशेषण एवं क्रिया शब्दों की पहचान एवं उचित प्रयोग', 'काल', 'पर्यायवाची एवं विलोम', 'शब्द-लड़ी', 'मुहावरे एवं लोकोक्तियाँ', 'शुद्ध शब्द', 'वाक्य बनाना'] },
    ],
    general: ['हिंदी में गिनती का सही क्रम (1 से 50)', 'हिंदी महीनों के नाम एवं क्रम', 'अनेक शब्दों के लिए एक शब्द'],
    quote: {
      text: 'किसी विदेशी भाषा को अंगीकार करना हमारे लिए गर्व की बात है, किंतु अपनी भाषा की उपेक्षा करके किसी विदेशी भाषा को स्वीकार करना हमारे लिए बड़े शर्म की बात है।',
      author: 'महादेवी वर्मा',
    },
  },
  {
    grade: '6',
    reading: 'शब्द-भेद, कारक एवं वाक्य-रचना पर आधारित प्रश्न',
    grammar: [
      { title: 'वर्ण, मात्रा एवं विराम', items: ['वर्ण — स्वर एवं व्यंजन', 'मात्राओं का ज्ञान', 'संयुक्त व्यंजन', "'र' के रूप (रेफ और पदेन)", 'विराम चिन्ह', 'अनुस्वार एवं अनुनासिक शब्द', 'बिंदु एवं चंद्रबिंदु'] },
      { title: 'शब्द भेद एवं वाक्य', items: ['शब्द के भेद — संज्ञा, सर्वनाम, विशेषण, क्रिया-क्रियाविशेषण', 'काल', 'कारक', 'वाक्य (अर्थ के आधार पर)', 'पर्यायवाची एवं विलोम शब्द', 'शब्द-लड़ी', 'मुहावरे एवं लोकोक्तियाँ', 'शुद्ध शब्द', 'वाक्य बनाना'] },
    ],
    general: ['हिंदी में गिनती का सही क्रम (1 से 50)', 'हिंदी महीनों के नाम एवं क्रम', 'अनेक शब्दों के लिए एक शब्द'],
  },
  {
    grade: '7',
    reading: 'शब्द-भेद, उपसर्ग एवं वाक्य-रचना पर आधारित प्रश्न',
    grammar: [
      { title: 'वर्ण, मात्रा एवं उपसर्ग', items: ['वर्ण (स्वर एवं व्यंजन)', 'मात्राओं का ज्ञान', 'संयुक्त व्यंजन', 'आगत स्वर एवं नुक्ता', "'र' के रूप (रेफ और पदेन)", 'उपसर्ग', 'विराम चिन्ह', 'अनुस्वार एवं अनुनासिक शब्द'] },
      { title: 'शब्द भेद एवं वाक्य', items: ['संज्ञा, सर्वनाम, विशेषण, क्रिया-क्रियाविशेषण शब्द', 'समुच्चयबोधक', 'काल', 'कारक', 'वाक्य (अर्थ के आधार पर)', 'पर्यायवाची एवं विपरीत अर्थ वाले शब्द', 'अनेक शब्दों के लिए एक शब्द', 'शब्द-लड़ी', 'मुहावरे एवं लोकोक्तियाँ', 'शुद्ध शब्द'] },
    ],
    general: ['हिंदी में गिनती का सही क्रम (1 से 50)', 'हिंदी महीनों के नाम एवं क्रम'],
  },
  {
    grade: '8',
    reading: 'समास, कारक एवं शब्द-भेद पर आधारित प्रश्न',
    grammar: [
      { title: 'वर्ण एवं व्याकरणिक रचना', items: ['वर्ण एवं उसके रूप', 'संयुक्त व्यंजन', 'आगत स्वर एवं नुक्ता', "'र' के रूप (रेफ और पदेन)", 'समास', 'कारक', 'उपसर्ग-प्रत्यय', 'लिंग-वचन'] },
      { title: 'शब्द भेद एवं वाक्य', items: ['शब्द के भेद — संज्ञा, सर्वनाम, विशेषण, क्रिया, क्रियाविशेषण, संबंधबोधक, समुच्चयबोधक, विस्मयादिबोधक', 'वाक्य के प्रकार', 'वाक्यांशों के लिए एक शब्द', 'पर्यायवाची, विलोम शब्द', 'अनेकार्थी शब्द', 'समरूपी भिन्नार्थक शब्द', 'मुहावरे और लोकोक्तियाँ'] },
    ],
    general: ['हिंदी में गिनती का सही क्रम (1 से 50)', 'छह ऋतुओं के हिंदी नाम'],
  },
  {
    grade: '9',
    reading: 'अपठित गद्यांश या काव्यांश आधारित प्रश्न',
    grammar: [
      { title: 'वर्ण, संधि एवं समास', items: ['वर्ण विचार', 'शब्द एवं पद', 'लिपि एवं भाषा, बोली और भाषा', "'र' के रूप", 'संयुक्त व्यंजन (वर्ण-विच्छेद)', 'नुक्ता एवं आगत और निपात', 'अनुस्वार एवं अनुनासिक', 'विराम चिन्ह', 'संधि (स्वर)', 'समास एवं उसके भेद'] },
      { title: 'शब्द भेद एवं वाक्य', items: ['शब्द के भेद — संज्ञा, सर्वनाम, विशेषण, क्रिया, क्रियाविशेषण, संबंधबोधक, समुच्चयबोधक, विस्मयादिबोधक', 'कारक', 'उपसर्ग-प्रत्यय', 'लिंग-वचन', 'वाक्य के भेद (अर्थ के आधार पर)', 'वाक्यांशों के लिए एक शब्द', 'पर्यायवाची, विलोम शब्द', 'समरूपी भिन्नार्थक शब्द', 'अनेकार्थी शब्द', 'मुहावरे और लोकोक्तियाँ'] },
    ],
    general: ['महासागरों के हिंदी नाम', 'वर्तमान में चल रहे अभियानों के नाम'],
  },
  {
    grade: '10',
    reading: 'अपठित गद्यांश या काव्यांश आधारित प्रश्न',
    grammar: [
      { title: 'शब्द, पद एवं वाक्य रचना', items: ['शब्द, पद, बोली, भाषा एवं लिपि', 'वाक्य (रचना एवं अर्थ के आधार पर)', 'उपसर्ग-प्रत्यय', 'संधि (स्वर)', 'समास', 'पदबंध', 'संयुक्त व्यंजन, वर्ण-विच्छेद', "'र' के रूप", 'नुक्ता एवं आगत और निपात', 'विराम चिन्ह'] },
      { title: 'शब्दावली एवं भेद', items: ['लिंग, वचन', 'मुहावरे और लोकोक्तियाँ', 'वाक्यांशों के लिए एक शब्द', 'पर्यायवाची, विलोम शब्द', 'समरूपी भिन्नार्थक शब्द', 'अनेकार्थी शब्द'] },
    ],
    general: ['वर्तमान में चल रहे अभियानों के नाम', 'सौरमंडल के ग्रहों के हिंदी नाम'],
  },
];

// One PDF per grade — adjust paths to match where the files are actually hosted.
const syllabusPdfHref = (grade: string) => `/downloads/hindi-syllabus-class-${grade}.pdf`;

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

/**
 * Just the class-by-class syllabus accordion — same visual design as
 * HindiSyllabusPage, but with no breadcrumb, hero copy, or page background.
 * Drop this in wherever the curriculum needs to live (e.g. inside HindiSubject).
 */
export const HindiSyllabusAccordion: React.FC = () => {
  const [openGrade, setOpenGrade] = useState<string>(CLASS_SYLLABUS[0].grade);

  return (
    <div className="space-y-5">
      {CLASS_SYLLABUS.map((active, idx) => {
        const isOpen = active.grade === openGrade;
        const theme = GRADE_THEMES[idx % GRADE_THEMES.length];

        return (
          <div
            key={active.grade}
            id={`curriculum-${active.grade}`}
            className={`relative rounded-3xl overflow-hidden scroll-mt-24
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
                  {/* मुख्य फोकस */}
                  <div className={`rounded-xl border-2 px-5 py-4 ${theme.focusBg}`}>
                    <p className={`text-base font-bold ${theme.focusText} flex items-center gap-2`}>
                      <Target className="w-4 h-4 hsyl-badge-bounce" />
                      {'मुख्य फोकस'}
                    </p>
                    <p className="mt-1.5 text-medium text-black leading-relaxed">{active.reading}</p>
                  </div>

                  {/* व्याकरण एवं शब्द-ज्ञान */}
                  <div>
                    <p className={`rounded-lg border-2 ${theme.chipBg} px-5 py-2.5 text-base font-bold inline-flex items-center gap-2 shadow-sm`}>
                      <BookOpenCheck className="h-4 w-4" />
                      {'व्याकरण एवं शब्द-ज्ञान'}
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

                  {/* सामान्य ज्ञान */}
                  <div>
                    <p className={`rounded-lg border-2 ${theme.chipBg} px-5 py-2.5 text-base font-bold inline-flex items-center gap-2 shadow-sm`}>
                      <Zap className="w-4 h-4" />
                      {'सामान्य ज्ञान'}
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

                  {/* Quote (only present for class 5) */}
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

                  {/* Download this grade's syllabus PDF */}
                  <a
                    href={syllabusPdfHref(active.grade)}
                    download
                    className={`inline-flex items-center gap-2 rounded-full text-white
                      px-4 py-2 text-sm font-bold shadow bg-gradient-to-r ${theme.numBg}
                      hover:scale-105 transition-transform duration-300`}
                  >
                    <Download className="w-4 h-4" />
                    {`कक्षा ${active.grade} पाठ्यक्रम पीडीएफ डाउनलोड करें`}
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HindiSyllabusAccordion;