'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { MOCK_QUESTIONS_HINDI, MOCK_QUESTIONS_SANSKRIT } from '../data/olympiadData';
import { Clock, CheckCircle2, AlertCircle, RefreshCw, Trophy, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
export const MockTestPage: React.FC = () => {
  const {
    language,
    showToast
  } = useApp();
  const [subject, setSubject] = useState<'Hindi' | 'Sanskrit'>('Hindi');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const questions = subject === 'Hindi' ? MOCK_QUESTIONS_HINDI : MOCK_QUESTIONS_SANSKRIT;
  const currentQ = questions[currentIdx];

  // Timer Countdown
  useEffect(() => {
    if (isExamSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExamSubmitted(true);
          showToast('समय समाप्त! आपकी परीक्षा स्वतः जमा हो गई है।', 'info');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isExamSubmitted]);
  const handleSelectOption = (optionIndex: number) => {
    if (isExamSubmitted) return;
    setUserAnswers({
      ...userAnswers,
      [currentQ.id]: optionIndex
    });
  };
  const handleResetExam = () => {
    setUserAnswers({});
    setCurrentIdx(0);
    setTimeLeft(600);
    setIsExamSubmitted(false);
  };

  // Calculate score
  let correctCount = 0;
  questions.forEach(q => {
    if (userAnswers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md">
        <div>
          <span className="bg-[#C79A2D]/10 text-[#C79A2D] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {'राष्ट्रीय स्तर मॉडल टेस्ट'}
          </span>
          <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {subject === 'Hindi' ? 'हिंदी भाषा अभ्यास परीक्षा' : 'संस्कृत भाषा अभ्यास परीक्षा'}
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Subject Selector */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button onClick={() => {
            setSubject('Hindi');
            handleResetExam();
          }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subject === 'Hindi' ? 'bg-[#7B1E1E] text-white' : 'text-gray-600 dark:text-gray-300'}`}>
              Hindi
            </button>
            <button onClick={() => {
            setSubject('Sanskrit');
            handleResetExam();
          }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subject === 'Sanskrit' ? 'bg-[#C79A2D] text-[#7B1E1E]' : 'text-gray-600 dark:text-gray-300'}`}>
              Sanskrit
            </button>
          </div>

          {/* Timer Clock */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-extrabold shadow-sm ${timeLeft < 120 ? 'bg-red-500 text-white animate-pulse' : 'bg-[#1A1414] text-[#C79A2D] border border-[#C79A2D]/30'}`}>
            <Clock className="w-4 h-4" />
            <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Main Exam Stage */}
      {isExamSubmitted ? (/* Result Evaluation Screen */
    <div className="bg-white dark:bg-[#1A1414] rounded-3xl p-8 sm:p-12 border-2 border-[#C79A2D]/40 shadow-2xl space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center mx-auto text-3xl font-bold">
              🏆
            </div>
            <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
              {'अभ्यास परीक्षा परिणाम'}
            </h2>
            <div className="text-3xl font-extrabold text-[#7B1E1E] dark:text-[#C79A2D]">
              Score: {correctCount} / {questions.length} ({Math.round(correctCount / questions.length * 100)}%)
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              {'उत्तर व्याख्या व विश्लेषण'}
            </h3>

            {questions.map((q, idx) => {
          const selectedOpt = userAnswers[q.id];
          const isCorrect = selectedOpt === q.correctIndex;
          return <div key={q.id} className={`p-5 rounded-2xl border ${isCorrect ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                      Q{idx + 1}: {q.question}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isCorrect ? 'bg-[#2E8B57] text-white' : 'bg-red-600 text-white'}`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <div className="mt-3 text-xs space-y-1">
                    <div className="text-gray-600 dark:text-gray-300">
                      <strong>Your Answer:</strong> {selectedOpt !== undefined ? q.options[selectedOpt] : 'Not Attempted'}
                    </div>
                    <div className="text-[#2E8B57] font-bold">
                      <strong>Correct Option:</strong> {q.options[q.correctIndex]}
                    </div>
                    <div className="mt-2 text-gray-500 italic bg-white/60 dark:bg-black/20 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                      💡 {q.explanation}
                    </div>
                  </div>
                </div>;
        })}
          </div>

          <div className="text-center pt-4">
            <button onClick={handleResetExam} className="bg-[#7B1E1E] text-white font-bold px-8 py-3 rounded-2xl text-xs flex items-center gap-2 mx-auto">
              <RefreshCw className="w-4 h-4" />
              <span>{'पुनः परीक्षा दें'}</span>
            </button>
          </div>
        </div>) : (/* Live Exam Stage */
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Question Card */}
          <div className="lg:col-span-8 bg-white dark:bg-[#1A1414] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <span className="text-xs font-bold text-[#7B1E1E] dark:text-[#C79A2D]">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                Category: {currentQ.category}
              </span>
            </div>

            <h2 className="font-playfair text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((optionText, optIdx) => {
            const isSelected = userAnswers[currentQ.id] === optIdx;
            return <button key={optIdx} onClick={() => handleSelectOption(optIdx)} className={`w-full text-left p-4 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between ${isSelected ? 'bg-[#7B1E1E] text-white border-[#C79A2D] shadow-md' : 'bg-gray-50 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-[#C79A2D]'}`}>
                    <span>{optionText}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C79A2D] shrink-0" />}
                  </button>;
          })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
              <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))} className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold disabled:opacity-40">
                {'पिछला'}
              </button>

              {currentIdx < questions.length - 1 ? <button onClick={() => setCurrentIdx(prev => prev + 1)} className="bg-[#7B1E1E] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-[#541313]">
                  {'अगला प्रश्न'}
                </button> : <button onClick={() => setIsExamSubmitted(true)} className="bg-[#2E8B57] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700">
                  {'परीक्षा जमा करें'}
                </button>}
            </div>
          </div>

          {/* Question Palette Sidebar */}
          <div className="lg:col-span-4 bg-white dark:bg-[#1A1414] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500">
              {'प्रश्न तालिका (Question Palette)'}
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIdx;
            return <button key={q.id} onClick={() => setCurrentIdx(idx)} className={`h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${isCurrent ? 'ring-2 ring-[#C79A2D] bg-[#7B1E1E] text-white scale-105' : isAnswered ? 'bg-[#2E8B57] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                    {idx + 1}
                  </button>;
          })}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-[11px] space-y-2 text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#2E8B57]"></span>
                <span>{'उत्तर दिया (Attempted)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700"></span>
                <span>{'शेष (Unanswered)'}</span>
              </div>
            </div>

            <button onClick={() => setIsExamSubmitted(true)} className="w-full mt-4 bg-gradient-to-r from-[#7B1E1E] to-[#A32A2A] text-white py-3 rounded-xl font-bold text-xs shadow-md">
              {'उत्तर तालिका जमा करें'}
            </button>
          </div>

        </div>)}

    </div>;
};