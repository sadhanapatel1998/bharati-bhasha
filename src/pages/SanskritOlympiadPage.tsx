import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { BookOpen, Calendar, Clock, Trophy, FileText, CheckCircle2 } from 'lucide-react';

export const SanskritOlympiadPage: React.FC = () => {
  const { language, navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: language === 'hi' ? 'संस्कृत भाषा ओलंपियाड' : 'National Sanskrit Olympiad' }]} />

      <div className="bg-gradient-to-r from-[#1A1414] to-[#3D2626] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-[#C79A2D]/30">
        <div className="max-w-3xl space-y-4">
          <span className="bg-[#2E8B57] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block">
            Classes 3rd to 12th
          </span>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-[#C79A2D]">
            {language === 'hi' ? 'राष्ट्रीय संस्कृत भाषा ओलंपियाड 2026' : 'National Sanskrit Bhasha Olympiad 2026'}
          </h1>
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed">
            {language === 'hi' 
              ? 'देववाणी संस्कृत की शुद्धता, पाणिनि व्याकरण, सुभाषित नीति श्लोक, शब्दरूप-धातुरूप एवं काव्यशास्त्र की राष्ट्रीय परीक्षा।'
              : 'Unlocking the scientific grammar, timeless subhashitas, Paninian logic, and classical literature of Deva Bhasha Sanskrit.'}
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              onClick={() => navigateTo('registration')}
              className="bg-[#C79A2D] text-[#7B1E1E] font-bold px-6 py-3 rounded-xl text-xs hover:bg-[#E2B855] transition-colors"
            >
              {language === 'hi' ? 'संस्कृत ओलंपियाड हेतु पंजीकरण करें' : 'Register for Sanskrit Olympiad'}
            </button>
            <button 
              onClick={() => navigateTo('mock-test')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl text-xs border border-white/20 transition-colors"
            >
              {language === 'hi' ? 'संस्कृत अभ्यास परीक्षा' : 'Sanskrit Mock Exam'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
          <Calendar className="w-6 h-6 text-[#C79A2D]" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">{language === 'hi' ? 'संस्कृत परीक्षा तिथि' : 'Exam Date'}</h3>
          <p className="text-xs text-gray-500">October 25, 2026 (10:00 AM IST)</p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
          <Clock className="w-6 h-6 text-[#7B1E1E] dark:text-[#C79A2D]" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">{language === 'hi' ? 'समय अवधि व अंक' : 'Duration & Pattern'}</h3>
          <p className="text-xs text-gray-500">60 Minutes | 100 Objective Marks</p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
          <Trophy className="w-6 h-6 text-[#2E8B57]" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">{language === 'hi' ? 'विशेष संस्कृत छात्रवृत्ति' : 'Sanskrit Scholarship'}</h3>
          <p className="text-xs text-gray-500">Varanasi Cultural Trip & Cash Awards</p>
        </div>
      </div>

    </div>
  );
};
