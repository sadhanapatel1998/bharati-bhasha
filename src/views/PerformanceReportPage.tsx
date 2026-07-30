'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import SectionHeader from '../components/shared/SectionHeader';
import { SAMPLE_STUDENT_REPORTS } from '../data/olympiadData';
import { StudentReport } from '../types';
import {
  Search,
  Trophy,
  Medal,
  Award,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2,
  Sparkles,
  Printer,
  User,
  School,
  GraduationCap,
  BarChart3,
  TrendingUp,
  Target,
  ChevronRight,
} from 'lucide-react';

export const PerformanceReportPage: React.FC = () => {
  const { language, showToast } = useApp();
  const [inputRollNumber, setInputRollNumber] = useState('BBO2026-9842');
  const [report, setReport] = useState<StudentReport | null>(
    SAMPLE_STUDENT_REPORTS['BBO2026-9842']
  );
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputRollNumber.trim().toUpperCase();
    if (!cleaned) {
      showToast('कृपया अनुक्रमांक (Roll Number) दर्ज करें।', 'warning');
      return;
    }
    if (SAMPLE_STUDENT_REPORTS[cleaned]) {
      setReport(SAMPLE_STUDENT_REPORTS[cleaned]);
    } else {
      // Dynamic fallback mock report for any custom entered roll number
      const mockReport: StudentReport = {
        rollNumber: cleaned,
        studentName: 'आरव शर्मा',
        schoolName: 'सेंट जेवियर्स सीनियर सेकेंडरी स्कूल, जयपुर',
        classLevel: 'कक्षा 7वीं',
        subject: 'राष्ट्रीय हिंदी एवं संस्कृत ओलंपियाड',
        score: 92,
        totalMarks: 100,
        percentile: 98.4,
        nationalRank: 12,
        stateRank: 2,
        grade: 'A+ विशिष्ट',
        strengths: ['व्याकरण एवं संधि नियम', 'देवनागरी शब्द भंडार', 'पठन गति'],
        areasForImprovement: ['शास्त्रीय संस्कृत साहित्य संदर्भ'],
        categoryScores: {
          grammar: 28,
          literature: 22,
          vocabulary: 24,
          comprehension: 18,
        },
      };
      setReport(mockReport);
    }
    setHasSearched(true);
    showToast('परिणाम सफलतापूर्वक लोड हो गया है!', 'success');
  };

  return (
    <div className="py-8 relative min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-100/30 overflow-hidden">
      {/* Decorative pattern */}
      <div
        className="
    absolute inset-0 pointer-events-none opacity-[0.04]
    bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
    bg-[length:60px_60px,80px_80px]
    bg-[position:0_0,40px_40px]
  "
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 z-10">

        {/* Hero Section */}
        <SectionHeader
          icon={Trophy}
          badge="राष्ट्रीय परिणाम पोर्टल"
          title="बेंचमार्क रिपोर्ट व स्कोर कार्ड"
          description="अनुक्रमांक दर्ज कर अपना 12-आयामी रिपोर्ट कार्ड व ई-सर्टिफिकेट देखें"
        />

        {/* Search Box – enhanced with glass-morphism */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm p-6 sm:p-8 rounded-3xl border-2 border-amber-200/60 dark:border-gray-800 shadow-xl">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-amber-600 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputRollNumber}
                  onChange={(e) => setInputRollNumber(e.target.value)}
                  placeholder="उदा. BBO2026-9842"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-amber-50/50 dark:bg-gray-800/50 text-base font-semibold text-gray-900 dark:text-white border-2 border-amber-200/60 dark:border-gray-700 focus:outline-none focus:border-[#C79A2D] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#7B1E1E] to-amber-800 hover:from-red-800 hover:to-[#7B1E1E] text-white px-8 py-3.5 rounded-2xl font-bold text-medium shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 shrink-0"
              >
                <Search className="w-5 h-5 " />
                <span className='pt-1 text-medium'>परिणाम खोजें</span>
              </button>
            </form>
            <div className="mt-4 text-center text-medium text-gray-800 dark:text-gray-400">
              नमूना अनुक्रमांक:{' '}
              <button
                onClick={() => setInputRollNumber('BBO2026-9842')}
                className="text-red-800 dark:text-[#C79A2D] underline font-bold hover:no-underline transition-colors"
              >
                BBO2026-9842
              </button>{' '}
              या{' '}
              <button
                onClick={() => setInputRollNumber('BBO2026-1045')}
                className="text-red-800 dark:text-[#C79A2D] underline font-bold hover:no-underline transition-colors"
              >
                BBO2026-1045
              </button>
            </div>
          </div>
        </div>

        {/* Report Card – enhanced with glass-morphism and larger text */}
        {report && (
          <div className="max-w-5xl mx-auto bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm rounded-3xl p-6 sm:p-10 border-2 border-[#C79A2D]/40 shadow-2xl space-y-8 animate-in fade-in duration-300 relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#C79A2D]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-red-800/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-b-2 border-amber-200/40 dark:border-gray-800 pb-6 gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
                    {report.studentName}
                  </h2>
                  <p className="text-base text-black dark:text-gray-400">
                    {report.schoolName} • {report.classLevel}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm border border-emerald-300 dark:border-emerald-700">
                  {report.grade}
                </span>
                <div className="text-base text-gray-500 dark:text-gray-400 mt-1 font-medium">
                  अनुक्रमांक: {report.rollNumber}
                </div>
              </div>
            </div>

            {/* Key Score Counters */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 space-y-1">
                <div className="text-3xl font-extrabold text-[#7B1E1E] dark:text-[#C79A2D]">
                  {report.score}/{report.totalMarks}
                </div>
                <div className="text-base font-sembold text-gray-800 dark:text-gray-400">
                  प्राप्तांक
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 space-y-1">
                <div className="text-3xl font-extrabold text-[#C79A2D]">
                  {report.percentile}%
                </div>
                <div className="text-base font-sembold text-gray-800 dark:text-gray-400">
                  राष्ट्रीय पर्सेंटाइल
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 space-y-1">
                <div className="text-3xl font-extrabold text-emerald-600">
                  #{report.nationalRank}
                </div>
                <div className="text-base font-sembold text-gray-800 dark:text-gray-400">
                  राष्ट्रीय रैंक
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 space-y-1">
                <div className="text-3xl font-extrabold text-blue-600">
                  #{report.stateRank}
                </div>
                <div className="text-base font-sembold text-gray-800 dark:text-gray-400">
                  राज्य स्तरीय रैंक
                </div>
              </div>
            </div>

            {/* Category Scores – with larger bars */}
            <div className="relative z-10 space-y-5">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#C79A2D]" />
                <span>विषयवार दक्षता विभाजन</span>
              </h3>

              <div className="space-y-4">
                {[
                  { label: 'व्याकरण एवं संधि नियम', value: report.categoryScores.grammar, max: 30, color: 'bg-[#7B1E1E]' },
                  { label: 'साहित्य एवं काव्य समझ', value: report.categoryScores.literature, max: 25, color: 'bg-[#C79A2D]' },
                  { label: 'शब्द भंडार एवं पर्याय', value: report.categoryScores.vocabulary, max: 25, color: 'bg-emerald-600' },
                  { label: 'पठन गति एवं समझ', value: report.categoryScores.comprehension, max: 20, color: 'bg-amber-500' },
                ].map((cat) => (
                  <div key={cat.label}>
                    <div className="flex justify-between text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      <span>{cat.label}</span>
                      <span>{cat.value}/{cat.max}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${cat.color} h-3 rounded-full transition-all duration-700`}
                        style={{ width: `${(cat.value / cat.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Growth Areas – with larger text */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 space-y-3">
                <h4 className="font-bold text-lg text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>मुख्य सामर्थ्य क्षेत्र</span>
                </h4>
                <ul className="space-y-2 text-base text-black dark:text-gray-300">
                  {report.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500">✦</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 space-y-3">
                <h4 className="font-bold text-lg text-amber-700 dark:text-amber-400 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>सुधार के अवसर</span>
                </h4>
                <ul className="space-y-2 text-base text-gray-700 dark:text-gray-300">
                  {report.areasForImprovement.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500">✦</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 pt-4 border-t-2 border-amber-200/40 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white font-bold text-base rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <Printer className="w-5 h-5" />
                  <span>रिपोर्ट कार्ड प्रिंट करें</span>
                </button>
                <button
                  onClick={() => showToast('रिपोर्ट कार्ड PDF डाउनलोड प्रारम्भ हुआ।', 'success')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C79A2D] hover:bg-amber-500 text-[#7B1E1E] font-bold text-base rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <Download className="w-5 h-5" />
                  <span>PDF डाउनलोड</span>
                </button>
                <button
                  onClick={() => showToast('लिंक कॉपी किया गया!', 'success')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-bold text-base rounded-xl border border-amber-300 dark:border-amber-700 hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                  <span>शेयर करें</span>
                </button>
              </div>
              <button
                onClick={() => showToast('ई-प्रमाण पत्र डाउनलोड प्रारम्भ हुआ।', 'success')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7B1E1E] to-red-800 hover:from-red-800 hover:to-[#7B1E1E] text-white font-bold text-base rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Award className="w-5 h-5 text-amber-300" />
                <span>ई-प्रमाण पत्र</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceReportPage;