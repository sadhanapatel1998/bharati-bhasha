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

const SYLLABUS_PDF_HREF = '/downloads/hindi-olympiad-syllabus.pdf';

const QUICK_FACTS = [
  { icon: GraduationCap, label: 'कक्षा 1 से 10', sub: 'स्तरानुसार पाठ्यक्रम' },
  { icon: Layers, label: '2 अनुभाग', sub: 'व्याकरण ज्ञान · सामान्य ज्ञान' },
  { icon: Target, label: '60 मिनट', sub: '100 वस्तुनिष्ठ अंक' },
];

export const HindiSyllabusPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [openGrade, setOpenGrade] = useState<string>(CLASS_SYLLABUS[0].grade);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">

      <Breadcrumb
        title="हिंदी पाठ्यक्रम"
        items={[
          {
            label: "हिंदी पाठ्यक्रम",
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
            <span>{'भारती भाषा ओलंपियाड · हिंदी पाठ्यक्रम'}</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-4xl font-bold leading-tight text-[#02206b]">
            {'हिंदी विभाग का '}<span className="text-[#C79A2D]">{'सम्पूर्ण पाठ्यक्रम'}</span>
          </h1>

          <p className="text-lg text-slate-800 dark:text-gray-300 leading-relaxed font-devanagari">
            {'वर्ण-ज्ञान, मात्रा, शब्द-भेद, वाक्य-रचना, मुहावरे-लोकोक्तियाँ एवं सामान्य ज्ञान पर आधारित — नीचे अपनी कक्षा चुनें और अनुभागवार पाठ्यक्रम देखें।'}
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
          {'नीचे दी गई सूची में से अपनी कक्षा चुनें, संबंधित व्याकरण एवं सामान्यज्ञान विषय-वस्तु तुरंत दिखाई देगी।'}
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
                        {'कक्षा ' + active.grade + ' — हिंदी पाठ्यक्रम'}
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
                    {/* मुख्य फोकस */}
                    <div className="rounded-xl bg-[#FFF4E0] dark:bg-[#2A2118] border border-[#C79A2D]/30 px-5 py-4">
                      <p className="text-base font-bold text-[#7B1E1E] dark:text-[#C79A2D]">
                        {'मुख्य फोकस'}
                      </p>
                      <p className="mt-1.5 text-medium text-gray-900 dark:text-gray-300 leading-relaxed">{active.reading}</p>
                    </div>

                    {/* व्याकरण एवं शब्द-ज्ञान */}
                    <div>
                      <p className="rounded-lg bg-[#E7F3EC] dark:bg-[#16261C] border border-[#2E8B57]/30 px-5 py-2.5 text-base font-bold text-[#166534] dark:text-[#4ADE80] inline-flex items-center gap-2">
                        <BookOpenCheck className="h-4 w-4" /> {'व्याकरण एवं शब्द-ज्ञान'}
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

                    {/* सामान्यज्ञानम् */}
                    <div>
                      <p className="rounded-lg bg-[#FBEAEA] dark:bg-[#2A1616] border border-[#7B1E1E]/25 px-5 py-2.5 text-base font-bold text-[#7B1E1E] dark:text-[#E2B855] inline-block">
                        {'सामान्य ज्ञान'}
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

                    {/* Quote, only present for class 5 */}
                    {active.quote && (
                      <div className="rounded-xl border-l-4 border-[#C79A2D] bg-gray-50 dark:bg-[#241A1A] px-5 py-4">
                        <p className="text-medium italic text-gray-700 dark:text-gray-300 leading-relaxed">
                          {'“' + active.quote.text + '”'}
                        </p>
                        <p className="mt-2 text-sm font-bold text-[#7B1E1E] dark:text-[#C79A2D]">
                          {'— ' + active.quote.author}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};