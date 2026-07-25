import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { SAMPLE_PAPERS } from '../data/olympiadData';
import { FileText, Download, Search } from 'lucide-react';

export const SamplePapersPage: React.FC = () => {
  const { language, showToast } = useApp();
  const [filterSubject, setFilterSubject] = useState<string>('All');

  const filtered = filterSubject === 'All' 
    ? SAMPLE_PAPERS 
    : SAMPLE_PAPERS.filter(sp => sp.subject === filterSubject);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: language === 'hi' ? 'सैंपल पेपर्स' : 'Sample Papers' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {language === 'hi' ? 'निःशुल्क अभ्यास सामग्री' : 'Practice Materials'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'अभ्यास प्रश्न पत्र (Sample Papers)' : 'Download Practice Papers (PDF)'}
        </h1>
      </div>

      <div className="flex justify-center gap-2">
        {['All', 'Hindi', 'Sanskrit'].map((sub) => (
          <button
            key={sub}
            onClick={() => setFilterSubject(sub)}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              filterSubject === sub ? 'bg-[#7B1E1E] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((sp) => (
          <div key={sp.id} className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-[#C79A2D]/10 text-[#C79A2D] font-bold text-[10px]">
                {sp.subject} • {sp.classLevel}
              </span>
              <span className="text-[10px] text-gray-400 font-bold">{sp.year} Edition</span>
            </div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">{sp.title}</h3>
            <p className="text-xs text-gray-500">{sp.questionsCount} Multiple Choice Questions with Answer Key</p>
            <button 
              onClick={() => showToast(`Downloading ${sp.title}...`, 'success')}
              className="w-full mt-2 bg-[#7B1E1E] hover:bg-[#541313] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
