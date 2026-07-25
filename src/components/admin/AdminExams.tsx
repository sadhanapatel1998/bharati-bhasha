'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  FileText,
  AlertCircle,
  X
} from 'lucide-react';

interface ExamSchedule {
  id: string;
  title: string;
  subject: 'हिंदी' | 'संस्कृत';
  classRange: string;
  examDate: string;
  timeSlot: string;
  mode: 'ऑनलाइन पोर्टल' | 'ऑफलाइन OMR';
  registeredCount: number;
  status: 'सक्रिय (Active)' | 'आगामी (Upcoming)' | 'सम्पन्न (Completed)';
}

export const AdminExams: React.FC = () => {
  const { showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [schedules, setSchedules] = useState<ExamSchedule[]>([
    { id: 'EXAM-2026-H1', title: 'राष्ट्रीय हिंदी ओलंपियाड (प्राथमिक वर्ग - कक्षा 1 से 5)', subject: 'हिंदी', classRange: 'कक्षा 1 - 5', examDate: '15 अक्टूबर 2026', timeSlot: '10:00 AM - 11:30 AM', mode: 'ऑनलाइन पोर्टल', registeredCount: 145000, status: 'सक्रिय (Active)' },
    { id: 'EXAM-2026-H2', title: 'राष्ट्रीय हिंदी ओलंपियाड (माध्यमिक वर्ग - कक्षा 6 से 8)', subject: 'हिंदी', classRange: 'कक्षा 6 - 8', examDate: '16 अक्टूबर 2026', timeSlot: '10:00 AM - 11:30 AM', mode: 'ऑफलाइन OMR', registeredCount: 120000, status: 'आगामी (Upcoming)' },
    { id: 'EXAM-2026-S1', title: 'राष्ट्रीय संस्कृत ओलंपियाड (वरिष्ठ वर्ग - कक्षा 9 से 12)', subject: 'संस्कृत', classRange: 'कक्षा 9 - 12', examDate: '18 अक्टूबर 2026', timeSlot: '11:00 AM - 12:30 PM', mode: 'ऑफलाइन OMR', registeredCount: 98000, status: 'आगामी (Upcoming)' },
    { id: 'EXAM-2026-S2', title: 'संस्कृत व्याकरण एवं साहित्य विशेषांक', subject: 'संस्कृत', classRange: 'कक्षा 6 - 8', examDate: '20 अक्टूबर 2026', timeSlot: '02:00 PM - 03:30 PM', mode: 'ऑनलाइन पोर्टल', registeredCount: 89000, status: 'आगामी (Upcoming)' },
  ]);

  const handleToggleExamStatus = (id: string) => {
    setSchedules(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'सक्रिय (Active)' ? 'सम्पन्न (Completed)' : 'सक्रिय (Active)';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
    showToast('परीक्षा समय सारिणी स्थिति अद्यतन (Update) कर दी गई है।', 'info');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <h1 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              परीक्षा एवं तिथि सारिणी प्रबंधन (Exam Management)
            </h1>
          </div>
          <p className="text-xs text-gray-500">
            ऑनलाइन परीक्षा पोर्टल, 482 परीक्षा केंद्रों की पाली व समय निर्धारण
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C79A2D]" />
          नई परीक्षा तिथि घोषित करें
        </button>
      </div>

      {/* Grid of Schedules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schedules.map((exam) => (
          <div key={exam.id} className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] font-bold text-[#7B1E1E] dark:text-[#C79A2D] bg-[#7B1E1E]/5 px-2 py-0.5 rounded-md">
                  {exam.id}
                </span>
                <h3 className="font-playfair font-bold text-base text-gray-900 dark:text-white mt-1">
                  {exam.title}
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                exam.status.includes('सक्रिय') 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
              }`}>
                {exam.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 dark:bg-gray-800/40 p-3 rounded-2xl">
              <div>
                <span className="text-gray-400 text-[10px] block">परीक्षा तिथि:</span>
                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C79A2D]" />
                  {exam.examDate}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">समय पाली (Slot):</span>
                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#7B1E1E]" />
                  {exam.timeSlot}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">परीक्षा माध्यम:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{exam.mode}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">पंजीकृत परीक्षार्थी:</span>
                <span className="font-bold text-[#7B1E1E] dark:text-[#C79A2D]">{exam.registeredCount.toLocaleString('hi-IN')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => handleToggleExamStatus(exam.id)}
                className="text-xs font-bold text-[#7B1E1E] dark:text-[#C79A2D] hover:underline"
              >
                स्थिति परिवर्तित करें
              </button>
              <span className="text-[11px] text-gray-500">482 केंद्र आवंटित</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1414] rounded-3xl max-w-md w-full p-6 space-y-4 border border-gray-100 dark:border-gray-800 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-playfair font-bold text-base text-gray-900 dark:text-white">
                नई परीक्षा अनुसूची जोड़ें
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500">
              यह सुविधा केवल मुख्य परीक्षा नियंत्रक हेतु उपलब्ध है। परीक्षा अनुसूची जोड़ने हेतु पुष्टि करें।
            </p>
            <div className="pt-2 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl text-xs font-semibold">
                रद्द करें
              </button>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  showToast('नई परीक्षा तिथि सफलतापूर्वक अधिसूचित कर दी गई है।', 'success');
                }}
                className="bg-[#7B1E1E] text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                अधिसूचित करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
