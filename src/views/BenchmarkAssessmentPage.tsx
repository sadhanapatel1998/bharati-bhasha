'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { Award, CheckCircle2, FileText, Sparkles } from 'lucide-react';
export const BenchmarkAssessmentPage: React.FC = () => {
  const {
    language,
    navigateTo
  } = useApp();
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {'वैज्ञानिक मूल्यांकन'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {'12-आयामी वैज्ञानिक भाषा मूल्यांकन'}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {'केवल अंक तालिका नहीं, बल्कि विद्यार्थी के भाषाई सामर्थ्य का पूर्ण डिजिटल रिपोर्ट कार्ड'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['1. Vyakaran & Sandhi Precision', '2. Spelling Accuracy & Devanagari Script', '3. Vocabulary Depth & Synonyms', '4. Reading Comprehension & Speed', '5. Subhashita & Ethical Understanding', '6. Classical Literature Appreciation', '7. Sentence Formation Logic', '8. Idioms & Proverb Context', '9. National Percentile Index', '10. State Performance Percentile', '11. Individual Strength Highlights', '12. Personalized Teacher Recommendations'].map((item, idx) => <div key={idx} className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#2E8B57] shrink-0" />
            <span className="font-bold text-xs text-gray-900 dark:text-white">{item}</span>
          </div>)}
      </div>

      <div className="text-center pt-4">
        <button onClick={() => navigateTo('/performance-report')} className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-8 py-4 rounded-2xl font-bold text-xs shadow-xl transition-all">
          {'अपना परिणाम/रिपोर्ट कार्ड खोजें'}
        </button>
      </div>

    </div>;
};