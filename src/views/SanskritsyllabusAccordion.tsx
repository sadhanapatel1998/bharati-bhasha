'use client';

import React, { useState } from 'react';
import {
  BookOpenCheck,
  Target,
  ChevronDown,
  Star,
  Zap,
  Download,
  Sparkles,
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

// One PDF per grade — adjust paths to match where the files are actually hosted.
const syllabusPdfHref = (grade: string) => `/downloads/sanskrit-syllabus-class-${grade}.pdf`;

// 5 unique color themes — one per grade (6-10)
const GRADE_THEMES = [
  { numBg: "from-amber-500 to-orange-500", numBorder: "border-amber-300/60", headOpen: "from-amber-50 to-orange-50", headHover: "hover:from-amber-100 hover:to-orange-100", bodyAccent: "border-amber-400/40", iconColor: "text-amber-600", chipBg: "bg-amber-100 text-amber-800 border-amber-300", titleColor: "text-amber-900", focusBg: "bg-amber-50 border-amber-300", focusText: "text-amber-800", spark: "text-amber-500" },
  { numBg: "from-rose-500 to-red-600", numBorder: "border-rose-300/60", headOpen: "from-rose-50 to-red-50", headHover: "hover:from-rose-100 hover:to-red-100", bodyAccent: "border-rose-400/40", iconColor: "text-rose-600", chipBg: "bg-rose-100 text-rose-800 border-rose-300", titleColor: "text-rose-900", focusBg: "bg-rose-50 border-rose-300", focusText: "text-rose-800", spark: "text-rose-500" },
  { numBg: "from-purple-500 to-indigo-600", numBorder: "border-purple-300/60", headOpen: "from-purple-50 to-indigo-50", headHover: "hover:from-purple-100 hover:to-indigo-100", bodyAccent: "border-purple-400/40", iconColor: "text-purple-600", chipBg: "bg-purple-100 text-purple-800 border-purple-300", titleColor: "text-purple-900", focusBg: "bg-purple-50 border-purple-300", focusText: "text-purple-800", spark: "text-purple-500" },
  { numBg: "from-emerald-500 to-teal-600", numBorder: "border-emerald-300/60", headOpen: "from-emerald-50 to-teal-50", headHover: "hover:from-emerald-100 hover:to-teal-100", bodyAccent: "border-emerald-400/40", iconColor: "text-emerald-600", chipBg: "bg-emerald-100 text-emerald-800 border-emerald-300", titleColor: "text-emerald-900", focusBg: "bg-emerald-50 border-emerald-300", focusText: "text-emerald-800", spark: "text-emerald-500" },
  { numBg: "from-blue-500 to-cyan-600", numBorder: "border-blue-300/60", headOpen: "from-blue-50 to-cyan-50", headHover: "hover:from-blue-100 hover:to-cyan-100", bodyAccent: "border-blue-400/40", iconColor: "text-blue-600", chipBg: "bg-blue-100 text-blue-800 border-blue-300", titleColor: "text-blue-900", focusBg: "bg-blue-50 border-blue-300", focusText: "text-blue-800", spark: "text-blue-500" },
];

/**
 * Just the class-by-class Sanskrit syllabus accordion — same visual design as
 * SanskritSyllabusPage, but with no breadcrumb, hero copy, or page background.
 * Drop this in wherever the curriculum needs to live (e.g. inside a Subject page).
 */
export const SanskritsyllabusAccordion: React.FC = () => {
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
                  bg-gradient-to-r ${theme.numBg} ssk-border-flow`}
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
                  skew-x-[-25deg] group-hover:animate-[ssk-sweep_1.2s_ease-out]" />
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
                    {'कक्षा ' + active.grade + ' — संस्कृत पाठ्यक्रम'}
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
                className={`absolute top-3 right-16 w-4 h-4 ${theme.spark} opacity-60 ssk-twinkle`}
              />
            </button>

            {/* Accordion content */}
            {isOpen && (
              <div className="px-6 sm:px-10 pb-6 sm:pb-10 space-y-8 relative">
                {/* Small dot pattern inside */}
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

export default SanskritsyllabusAccordion;