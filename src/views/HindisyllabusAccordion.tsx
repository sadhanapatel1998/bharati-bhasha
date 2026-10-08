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
 const [openGrade, setOpenGrade] = useState<string>('1');

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
                  <h3 className={`font-playfair text-xl md:text-3xl font-bold transition-colors duration-500
                    ${isOpen ? theme.titleColor : 'text-slate-900 dark:text-white'}`}>
                    {'कक्षा ' + active.grade + ' — हिंदी पाठ्यक्रम'}
                  </h3>
                  <p className="text-base text-gray-800 mt-0.5 font-medium">
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
  );
};

export default HindiSyllabusAccordion;