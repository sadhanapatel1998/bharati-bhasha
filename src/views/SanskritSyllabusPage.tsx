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
} from 'lucide-react';

const CLASS_SYLLABUS = [
  {
    grade: '6',
    reading: 'अपठित गद्यांशाधारित प्रश्नाः',
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

export const SanskritSyllabusPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [openGrade, setOpenGrade] = useState<string>(CLASS_SYLLABUS[0].grade);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">

      <Breadcrumb
        title="संस्कृत पाठ्यक्रम"
        items={[
          {
            label: "संस्कृत पाठ्यक्रम",
          },
        ]}
      />


      {/* Intro / info block */}
      <div className="relative overflow-hidden text-[#F5F0E6] text-white ">
        <div className="absolute inset-x-0 top-0 h-2" />
        {/* <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-ful"
        /> */}
        {/* <div
          aria-hidden
          className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-ful"
        /> */}


        <div className="relative max-w-6xl space-y-5">
          <div className="inline-flex items-center gap-2 text-amber-800 font-bold text-sm tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{'भारती भाषा ओलंपियाड · संस्कृत पाठ्यक्रम'}</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-4xl font-bold leading-tight text-[#02206b]">
            {'संस्कृत विभाग का '}<span className="text-[#C79A2D]">{'सम्पूर्ण पाठ्यक्रम'}</span>
          </h1>

          <p className="text-lg text-slate-800 dark:text-gray-300 leading-relaxed font-devanagari">
            {'देववाणी संस्कृत की शुद्धता, पाणिनि व्याकरण, शब्दरूप-धातुरूप, संधि-समास एवं सुभाषित नीति श्लोकों पर आधारित — नीचे अपनी कक्षा चुनें और अनुभागवार पाठ्यक्रम देखें।'}
          </p>

        </div>
      </div>

      {/* Curriculum — accordion style, one card per class */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#C79A2D]" />
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

        {/* Accordion */}
        <div className="mt-8 space-y-5">
          {CLASS_SYLLABUS.map((active) => {
            const isOpen = active.grade === openGrade;
            return (
              <div
                key={active.grade}
                className="rounded-3xl border border-[#C79A2D]/30 bg-white dark:bg-[#1A1414] shadow-xl overflow-hidden"
              >
                {/* Accordion header (acts like the previous tab button) */}
                <button
                  type="button"
                  onClick={() => setOpenGrade(isOpen ? '' : active.grade)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-3 sm:p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold border-2 transition-colors ${isOpen
                        ? 'bg-[#7B1E1E] text-[#C79A2D] border-[#C79A2D]/50'
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-500 border-gray-200 dark:border-gray-800'
                        }`}
                    >
                      {active.grade}
                    </span>
                    <div>
                      <h3 className="font-playfair text-2xl font-bold text-slate-900 dark:text-white">
                        {'कक्षा ' + active.grade + ' — संस्कृत पाठ्यक्रम'}
                      </h3>
                      <p className="text-sm text-gray-800 mt-0.5 font-medium">{'भारती भाषा ओलंपियाड · अपनी भाषा, अपनी पहचान'}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 shrink-0 text-[#7B1E1E] dark:text-[#C79A2D] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {/* Accordion content */}
                {isOpen && (
                  <div className="px-6 sm:px-10 pb-6 sm:pb-10 space-y-8">
                    {/* क. पठनबोध */}
                    <div className="rounded-xl bg-[#FFF4E0] dark:bg-[#2A2118] border border-[#C79A2D]/30 px-5 py-4">
                      <p className="text-base font-bold text-[#7B1E1E] dark:text-[#C79A2D]">
                        {'क. पठनबोधः'}
                      </p>
                      <p className="mt-1.5 text-medium text-gray-900 dark:text-gray-300 leading-relaxed">{active.reading}</p>
                    </div>

                    {/* ख. व्याकरणम् */}
                    <div>
                      <p className="rounded-lg bg-[#E7F3EC] dark:bg-[#16261C] border border-[#2E8B57]/30 px-5 py-2.5 text-base font-bold text-[#166534] dark:text-[#4ADE80] inline-flex items-center gap-2">
                        <BookOpenCheck className="h-4 w-4" /> {'ख. व्याकरणम्'}
                      </p>
                      <div className="mt-5 grid gap-7 sm:grid-cols-2">
                        {active.grammar.map((g) => (
                          <div key={g.title} className="rounded-xl border border-gray-100 dark:border-gray-800 p-4 hover:border-[#C79A2D]/40 transition-colors">
                            <p className="text-lg font-bold text-[#7B1E1E] dark:text-[#C79A2D]">{g.title}</p>
                            <ul className="mt-2 space-y-1.5">
                              {g.items.map((it) => (
                                <li key={it} className="text-medium text-gray-900 dark:text-gray-400 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[#C79A2D]">
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
                      <p className="rounded-lg bg-[#FBEAEA] dark:bg-[#2A1616] border border-[#7B1E1E]/25 px-5 py-2.5 text-base font-bold text-[#7B1E1E] dark:text-[#E2B855] inline-block">
                        {'ग. संस्कृतसामान्यज्ञानम्'}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {active.general.map((it) => (
                          <span
                            key={it}
                            className="text-medium font-bold text-gray-800 dark:text-gray-300 bg-gray-50 dark:bg-[#241A1A] border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2"
                          >
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Download full syllabus */}
      {/* <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1A1414] to-[#3D2626] p-8 sm:p-10 flex flex-wrap items-center justify-between gap-6 border border-[#C79A2D]/30 shadow-xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-[#C79A2D]/10 blur-2xl"
        />
        <div className="relative">
          <h3 className="font-playfair text-2xl font-bold text-[#C79A2D]">{'पूर्ण पाठ्यक्रम PDF डाउनलोड करें'}</h3>
          <p className="mt-2 text-lg text-gray-300">{'कक्षा 3 से 12 तक — अध्यायवार विभाजन एवं संदर्भ सामग्री सहित'}</p>
        </div>
        <a
          href={SYLLABUS_PDF_HREF}
          download
          className="relative inline-flex items-center gap-2.5 rounded-full bg-[#C79A2D] px-7 py-3.5 text-lg font-bold text-[#7B1E1E] shadow-md transition hover:bg-[#E2B855] hover:-translate-y-0.5"
        >
          <Download className="h-5 w-5" /> {'पाठ्यक्रम डाउनलोड करें'}
        </a>
      </div> */}

    </div>
  );
};