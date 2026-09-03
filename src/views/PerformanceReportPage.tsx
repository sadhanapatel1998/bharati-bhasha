'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { printElement } from '@/utils/printElement';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import SectionHeader from '../components/shared/SectionHeader';
import { StudentReport } from '../types';
import {
  Search,
  Trophy,
  Medal,
  Award,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  Printer,
  User,
  School,
  GraduationCap,
  TrendingUp,
  Target,
  ChevronRight,
} from 'lucide-react';

export const PerformanceReportPage: React.FC = () => {
  const { language, showToast } = useApp();
  const [inputRollNumber, setInputRollNumber] = useState('');
  const [report, setReport] = useState<StudentReport | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [notFound, setNotFound] = useState('');

  const [searching, setSearching] = useState(false);

  /** turns a published Result row from the API into the page's report shape */
  const toReport = (r: Record<string, unknown>): StudentReport => ({
    rollNumber: String(r.rollNo || ''),
    studentName: String(r.studentName || ''),
    schoolName: String(r.schoolName || ''),
    classLevel: `कक्षा ${r.classLevel || ''}`,
    subject:
      r.subject === 'sanskrit'
        ? 'संस्कृत ओलंपियाड'
        : r.subject === 'both'
        ? 'हिंदी एवं संस्कृत ओलंपियाड'
        : 'हिंदी ओलंपियाड',
    examName: String(r.examName || ''),
    score: Number(r.marksObtained) || 0,
    totalMarks: Number(r.totalMarks) || 100,
    percentile: Number(r.percentage) || 0,
    nationalRank: Number(r.rankNational) || 0,
    stateRank: Number(r.rankState) || 0,
    schoolRank: Number(r.rankSchool) || 0,
    grade: String(r.grade || ''),
    remark: String(r.remark || ''),
    publishedOn: String(r.updatedAt || r.createdAt || ''),
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputRollNumber.trim().toUpperCase();
    if (!cleaned) {
      showToast('कृपया अनुक्रमांक (Roll Number) दर्ज करें।', 'warning');
      return;
    }

    setSearching(true);
    try {
      const res = await fetch(`/api/public/result?rollNo=${encodeURIComponent(cleaned)}`, { cache: 'no-store' });
      const data = await res.json().catch(() => ({}));

      if (res.ok && Array.isArray(data.items) && data.items.length) {
        setReport(toReport(data.items[0]));
        setHasSearched(true);
        setNotFound('');
        showToast('परिणाम सफलतापूर्वक लोड हो गया है!', 'success');
        return;
      }

      // show whatever the server actually said, not a canned message
      const message =
        data?.message ||
        (res.status === 404
          ? 'इस अनुक्रमांक का कोई प्रकाशित परिणाम नहीं मिला।'
          : 'परिणाम प्राप्त नहीं हो सका। कृपया पुनः प्रयास करें।');
      setReport(null);
      setHasSearched(true);
      setNotFound(message);
      showToast(message, res.status === 404 || res.status === 403 ? 'warning' : 'error');
    } catch {
      const message = 'सर्वर से संपर्क नहीं हो सका। कृपया पुनः प्रयास करें।';
      setReport(null);
      setHasSearched(true);
      setNotFound(message);
      showToast(message, 'error');
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="pb-8 relative min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-100/30 overflow-hidden">
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
        <Breadcrumb
          title="परिणाम"
          items={[
            {
              label: "विद्यार्थी मंच",
              route: "/sample-papers",
            },
            {
              label: "परिणाम",
            },
          ]}
        />

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

        {/* No result found — shows the exact reason the server gave */}
        {hasSearched && !report && notFound && (
          <div className="max-w-3xl mx-auto bg-white/90 dark:bg-[#1A1414] rounded-3xl p-8 border-2 border-amber-300/60 shadow-xl text-center">
            <p className="text-lg font-bold text-[#7B1E1E] dark:text-amber-300">{notFound}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              अनुक्रमांक उदाहरण: <span className="font-mono font-bold">BBO26-000001</span>
            </p>
          </div>
        )}

        {/* Report Card – enhanced with glass-morphism and larger text */}
        {report && (
          <div
            id="result-print"
            className="max-w-5xl mx-auto bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm rounded-3xl p-6 sm:p-10 border-2 border-[#C79A2D]/40 shadow-2xl space-y-8 animate-in fade-in duration-300 relative overflow-hidden"
          >
            {/* printed sheet header — hidden on screen */}
            <div className="hidden print:block text-center pb-4 mb-2 border-b-2 border-[#7B1E1E]">
              <h1 className="font-playfair text-2xl font-bold text-[#7B1E1E]">भारती भाषा ओलंपियाड</h1>
              <p className="text-sm text-gray-600">राष्ट्रीय परिणाम — रिपोर्ट कार्ड</p>
            </div>
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

            {/* Exam details — only what the examination office actually published */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'परीक्षा', value: report.examName || '—' },
                { label: 'विषय', value: report.subject },
                { label: 'विद्यालय स्तरीय रैंक', value: report.schoolRank ? `#${report.schoolRank}` : '—' },
                { label: 'ग्रेड', value: report.grade || '—' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-gray-50/80 dark:bg-white/[0.04] border border-gray-200 dark:border-gray-800"
                >
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{row.label}</span>
                  <span className="text-base font-bold text-gray-900 dark:text-white text-right">{row.value}</span>
                </div>
              ))}
            </div>

            {report.remark && (
              <div className="relative z-10 p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
                <h4 className="font-bold text-lg text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>परीक्षा नियंत्रक की टिप्पणी</span>
                </h4>
                <p className="mt-2 text-base text-gray-700 dark:text-gray-300">{report.remark}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="print:hidden relative z-10 pt-4 border-t-2 border-amber-200/40 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => printElement('result-print', `BBO Report Card ${report.rollNumber}`)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white font-bold text-base rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <Printer className="w-5 h-5" />
                  <span>रिपोर्ट कार्ड प्रिंट करें</span>
                </button>
                <button
                  onClick={() => printElement('result-print', `BBO Report Card ${report.rollNumber}`)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C79A2D] hover:bg-amber-500 text-[#7B1E1E] font-bold text-base rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <Download className="w-5 h-5" />
                  <span>PDF सहेजें</span>
                </button>
                <button
                  onClick={async () => {
                    const link = `${window.location.origin}/performance-report?rollNo=${encodeURIComponent(
                      report?.rollNumber || ''
                    )}`;
                    try {
                      await navigator.clipboard.writeText(link);
                      showToast('लिंक कॉपी किया गया!', 'success');
                    } catch {
                      showToast('लिंक कॉपी नहीं हो सका।', 'error');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-bold text-base rounded-xl border border-amber-300 dark:border-amber-700 hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                  <span>शेयर करें</span>
                </button>
              </div>
              <button
                onClick={() => printElement('result-print', `BBO Report Card ${report.rollNumber}`)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7B1E1E] to-red-800 hover:from-red-800 hover:to-[#7B1E1E] text-white font-bold text-base rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Award className="w-5 h-5 text-amber-300" />
                <span>ई-प्रमाण पत्र</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* printed footer — hidden on screen */}
            <div className="hidden print:block pt-4 mt-2 border-t border-gray-300 text-center text-[11px] text-gray-500">
              <p>
                यह रिपोर्ट कार्ड भारती भाषा ओलंपियाड की आधिकारिक वेबसाइट से{' '}
                {report.publishedOn ? new Date(report.publishedOn).toLocaleDateString('hi-IN') : ''} को जारी किया गया।
              </p>
              <p className="mt-0.5">अनुक्रमांक {report.rollNumber} · सत्यापन हेतु वेबसाइट पर पुनः खोजें।</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceReportPage;