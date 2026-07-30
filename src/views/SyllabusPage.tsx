'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { SYLLABUS_DATA } from '../data/olympiadData';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
export const SyllabusPage: React.FC = () => {
  const {
    language,
    showToast
  } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const selected = SYLLABUS_DATA[activeTab];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {'पाठ्यक्रम रूपरेखा'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {'कक्षा 1 से 12 आधिकारिक पाठ्यक्रम'}
        </h1>
      </div>

      {/* Class Level Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {SYLLABUS_DATA.map((item, idx) => <button key={idx} onClick={() => setActiveTab(idx)} className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${activeTab === idx ? 'bg-[#7B1E1E] text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}>
            {item.classLevel}
          </button>)}
      </div>

      {/* Syllabus Card */}
      <div className="bg-white dark:bg-[#1A1414] rounded-3xl p-8 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Hindi Topics */}
        <div className="space-y-4">
          <h2 className="font-playfair text-xl font-bold text-[#7B1E1E] dark:text-[#C79A2D] flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#7B1E1E]"></span>
            <span>{'हिंदी भाषा पाठ्यक्रम'}</span>
          </h2>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            {selected.hindiTopics.map((tp, i) => <li key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-[#7B1E1E] shrink-0" />
                <span>{tp}</span>
              </li>)}
          </ul>
        </div>

        {/* Sanskrit Topics */}
        <div className="space-y-4">
          <h2 className="font-playfair text-xl font-bold text-[#C79A2D] flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#C79A2D]"></span>
            <span>{'संस्कृत भाषा पाठ्यक्रम'}</span>
          </h2>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            {selected.sanskritTopics.map((tp, i) => <li key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-[#C79A2D] shrink-0" />
                <span>{tp}</span>
              </li>)}
          </ul>
        </div>

      </div>

      <div className="text-center">
        <button onClick={() => showToast('पाठ्यक्रम डाउनलोड होना प्रारम्भ हुआ।', 'success')} className="bg-[#C79A2D] hover:bg-[#E2B855] text-[#7B1E1E] px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-2 mx-auto">
          <Download className="w-4 h-4" />
          <span>{'पूर्ण पाठ्यक्रम PDF डाउनलोड करें'}</span>
        </button>
      </div>

    </div>;
};