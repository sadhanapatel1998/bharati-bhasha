import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { SAMPLE_STUDENT_REPORTS } from '../data/olympiadData';
import { StudentReport } from '../types';
import { Search, Trophy, Medal, Award, CheckCircle2, AlertCircle, Download, Share2, Sparkles, Printer } from 'lucide-react';

export const PerformanceReportPage: React.FC = () => {
  const { language, showToast } = useApp();
  const [inputRollNumber, setInputRollNumber] = useState('BBO2026-9842');
  const [report, setReport] = useState<StudentReport | null>(SAMPLE_STUDENT_REPORTS['BBO2026-9842']);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputRollNumber.trim().toUpperCase();
    if (!cleaned) {
      showToast(language === 'hi' ? 'कृपया अनुक्रमांक (Roll Number) दर्ज करें।' : 'Please enter a valid Roll Number.', 'warning');
      return;
    }

    if (SAMPLE_STUDENT_REPORTS[cleaned]) {
      setReport(SAMPLE_STUDENT_REPORTS[cleaned]);
    } else {
      // Dynamic fallback mock report for any custom entered roll number
      const mockReport: StudentReport = {
        rollNumber: cleaned,
        studentName: "Aarav Sharma",
        schoolName: "St. Xavier's Senior Secondary School, Jaipur",
        classLevel: "Class 7th",
        subject: "National Hindi & Sanskrit Olympiad",
        score: 92,
        totalMarks: 100,
        percentile: 98.4,
        nationalRank: 12,
        stateRank: 2,
        grade: "A+ Distinction",
        strengths: ["Vyakaran & Sandhi Rules", "Devanagari Vocabulary", "Comprehension Speed"],
        areasForImprovement: ["Classical Sanskrit Literature Context"],
        categoryScores: {
          grammar: 28,
          literature: 22,
          vocabulary: 24,
          comprehension: 18
        }
      };
      setReport(mockReport);
    }
    setHasSearched(true);
    showToast(language === 'hi' ? 'परिणाम सफलतापूर्वक लोड हो गया है!' : 'Result loaded successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: language === 'hi' ? 'परिणाम व रिपोर्ट कार्ड' : 'Performance Report' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="bg-[#C79A2D]/10 text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {language === 'hi' ? 'राष्ट्रीय परिणाम पोर्टल' : 'National Result Portal'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'बेंचमार्क रिपोर्ट व स्कोर कार्ड' : 'Student Benchmark Performance Report'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {language === 'hi' ? 'अनुक्रमांक दर्ज कर अपना 12-आयामी रिपोर्ट कार्ड व ई-सर्टिफिकेट देखें' : 'Enter student roll number to access national benchmark analytics and printable certificate'}
        </p>
      </div>

      {/* Roll Number Search Box */}
      <div className="max-w-xl mx-auto bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input 
              type="text"
              value={inputRollNumber}
              onChange={(e) => setInputRollNumber(e.target.value)}
              placeholder="e.g. BBO2026-9842"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 text-sm font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#C79A2D]"
            />
          </div>
          <button 
            type="submit"
            className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-md transition-colors shrink-0"
          >
            {language === 'hi' ? 'परिणाम खोजें' : 'Search Result'}
          </button>
        </form>
        <div className="mt-3 text-[11px] text-gray-500 text-center">
          Sample Roll Numbers: <button onClick={() => setInputRollNumber('BBO2026-9842')} className="text-[#7B1E1E] dark:text-[#C79A2D] underline font-bold">BBO2026-9842</button> or <button onClick={() => setInputRollNumber('BBO2026-1045')} className="text-[#7B1E1E] dark:text-[#C79A2D] underline font-bold">BBO2026-1045</button>
        </div>
      </div>

      {/* Live Result Report Card View */}
      {report && (
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#1A1414] rounded-3xl p-6 sm:p-10 border-2 border-[#C79A2D]/30 shadow-2xl space-y-8 animate-in fade-in duration-300">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7B1E1E] to-[#C79A2D] flex items-center justify-center text-white font-bold text-xl">
                भा
              </div>
              <div>
                <h2 className="font-playfair font-bold text-xl text-gray-900 dark:text-white">
                  {report.studentName}
                </h2>
                <p className="text-xs text-gray-500">{report.schoolName} | {report.classLevel}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] font-bold text-xs border border-[#2E8B57]/30">
                {report.grade}
              </span>
              <div className="text-[11px] text-gray-400 mt-1">Roll No: {report.rollNumber}</div>
            </div>
          </div>

          {/* Key Score Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-[#7B1E1E]/5 dark:bg-white/5 border border-[#7B1E1E]/10 space-y-1">
              <div className="text-2xl font-extrabold text-[#7B1E1E] dark:text-[#C79A2D]">{report.score}/{report.totalMarks}</div>
              <div className="text-[11px] font-medium text-gray-500">{language === 'hi' ? 'प्राप्तांक' : 'Total Score'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#C79A2D]/10 border border-[#C79A2D]/20 space-y-1">
              <div className="text-2xl font-extrabold text-[#C79A2D]">{report.percentile}%</div>
              <div className="text-[11px] font-medium text-gray-500">{language === 'hi' ? 'राष्ट्रीय पर्सेंटाइल' : 'National Percentile'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#2E8B57]/10 border border-[#2E8B57]/20 space-y-1">
              <div className="text-2xl font-extrabold text-[#2E8B57]">#{report.nationalRank}</div>
              <div className="text-[11px] font-medium text-gray-500">{language === 'hi' ? 'राष्ट्रीय रैंक' : 'National Rank'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <div className="text-2xl font-extrabold text-amber-600">#{report.stateRank}</div>
              <div className="text-[11px] font-medium text-gray-500">{language === 'hi' ? 'राज्य स्तरीय रैंक' : 'State Rank'}</div>
            </div>
          </div>

          {/* Subject Category Breakdown Bars */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C79A2D]" />
              <span>{language === 'hi' ? 'विषयवार दक्षता विभाजन (Category Scores)' : 'Subject Competency Breakdown'}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  <span>Vyakaran & Grammar Rules</span>
                  <span>{report.categoryScores.grammar}/30</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#7B1E1E] h-2.5 rounded-full" style={{ width: `${(report.categoryScores.grammar / 30) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  <span>Literature & Sahitya History</span>
                  <span>{report.categoryScores.literature}/25</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#C79A2D] h-2.5 rounded-full" style={{ width: `${(report.categoryScores.literature / 25) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  <span>Vocabulary & Synonyms (Shabd Bhandar)</span>
                  <span>{report.categoryScores.vocabulary}/25</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#2E8B57] h-2.5 rounded-full" style={{ width: `${(report.categoryScores.vocabulary / 25) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  <span>Reading Comprehension Speed</span>
                  <span>{report.categoryScores.comprehension}/20</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(report.categoryScores.comprehension / 20) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Growth Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-2">
              <h4 className="font-bold text-xs text-[#2E8B57] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'hi' ? 'मुख्य सामर्थ्य क्षेत्र (Strengths)' : 'Key Strengths Identified'}</span>
              </h4>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                {report.strengths.map((str, i) => (
                  <li key={i}>• {str}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 space-y-2">
              <h4 className="font-bold text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>{language === 'hi' ? 'सुधार के अवसर (Growth Areas)' : 'Suggested Focus Areas'}</span>
              </h4>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                {report.areasForImprovement.map((imp, i) => (
                  <li key={i}>• {imp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Bar: Download & Print */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
            <button 
              onClick={() => window.print()}
              className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'hi' ? 'रिपोर्ट कार्ड प्रिंट करें' : 'Print Score Card'}</span>
            </button>

            <button 
              onClick={() => showToast(language === 'hi' ? 'डिजिटल प्रमाण पत्र डाउनलोड प्रारम्भ हुआ।' : 'Digital certificate download started.', 'success')}
              className="bg-[#C79A2D] hover:bg-[#E2B855] text-[#7B1E1E] px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'hi' ? 'ई-प्रमाण पत्र डाउनलोड (PDF)' : 'Download Official Certificate PDF'}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
