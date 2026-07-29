'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  Search, 
  FileCheck2,
  Printer
} from 'lucide-react';

export const AdminResults: React.FC = () => {
  const { showToast } = useApp();
  const [isPublished, setIsPublished] = useState(true);

  const toppers = [
    { rank: '1st (राष्ट्रीय स्वर्ण)', name: 'आदित्य नारायण शर्मा', classLevel: 'कक्षा 5वीं', score: '98/100', school: 'दिल्ली पब्लिक विद्यालय, आर के पुरम', award: '₹51,000 + स्वर्ण पदक' },
    { rank: '2nd (राष्ट्रीय रजत)', name: 'अनन्या त्रिपाठी', classLevel: 'कक्षा 8वीं', score: '97/100', school: 'भारतीय विद्या भवन, जयपुर', award: '₹31,000 + रजत पदक' },
    { rank: '3rd (राष्ट्रीय कांस्य)', name: 'देवव्रत पांडे', classLevel: 'कक्षा 10वीं', score: '96.5/100', school: 'सरस्वती शिशु मंदिर, वाराणसी', award: '₹21,000 + कांस्य पदक' },
  ];

  const handleTogglePublication = () => {
    setIsPublished(!isPublished);
    showToast(
      !isPublished 
        ? 'राष्ट्रीय परीक्षा परिणाम आधिकारिक रूप से प्रकाशित कर दिया गया है!' 
        : 'परिणाम प्रकाशन विंडो अस्थायी रूप से रोक दी गई है।', 
      !isPublished ? 'success' : 'warning'
    );
  };

  const handleBulkCertificates = () => {
    showToast('4,50,000+ ई-प्रमाण पत्र (E-Certificates) डिजिटल हस्ताक्षर सहित डाउनलोड हेतु उपलब्ध हैं।', 'info');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <h1 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              परिणाम एवं ई-प्रमाण पत्र प्रबंधन (Results & Certificates)
            </h1>
          </div>
          <p className="text-xs text-gray-500">
            मेरिट सूची, छात्रवृत्ति आवंटन एवं राष्ट्रीय स्तर डिजिटल सर्टिफिकेट निर्गमन
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleTogglePublication}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
              isPublished 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {isPublished ? 'परिणाम प्रकाशित है (Published)' : 'प्रकाशन जारी करें'}
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
          <span className="text-xs font-bold text-gray-500">कुल छात्रवृत्ति विजेता</span>
          <div className="text-2xl font-bold text-[#7B1E1E] dark:text-[#C79A2D] font-playfair">1,250 छात्र</div>
          <p className="text-[10px] text-gray-400">राष्ट्रीय व राज्य स्तर टॉपर</p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
          <span className="text-xs font-bold text-gray-500">निर्गत ई-प्रमाण पत्र</span>
          <div className="text-2xl font-bold text-emerald-600 font-playfair">4,52,180</div>
          <p className="text-[10px] text-gray-400">QR-कोड द्वारा सत्यापित प्रमाण पत्र</p>
        </div>

        <div className="bg-white dark:bg-[#1A1414] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
          <span className="text-xs font-bold text-gray-500">राष्ट्रीय औसत प्राप्तांक</span>
          <div className="text-2xl font-bold text-blue-600 font-playfair">78.4%</div>
          <p className="text-[10px] text-gray-400">वैज्ञानिक 12-आयामी सूचकांक आधार पर</p>
        </div>
      </div>

      {/* National Merit Rankers Table */}
      <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
              राष्ट्रीय मेधावी सूची (National Merit Toppers)
            </h2>
            <p className="text-xs text-gray-500">शीर्ष स्थान प्राप्तकर्ता एवं छात्रवृत्ति सम्मान सूची</p>
          </div>
          <button 
            onClick={handleBulkCertificates}
            className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] hover:bg-[#7B1E1E] hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            ई-प्रमाण पत्र समूह डाउनलोड
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-500 uppercase">
                <th className="py-3 px-4">राष्ट्रीय स्थान (Rank)</th>
                <th className="py-3 px-4">परीक्षार्थी नाम</th>
                <th className="py-3 px-4">कक्षा / प्राप्तांक</th>
                <th className="py-3 px-4">संबद्ध विद्यालय</th>
                <th className="py-3 px-4">पुरस्कार राशि / पदक</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
              {toppers.map((t, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40">
                  <td className="py-3.5 px-4 font-bold text-[#C79A2D] flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-[#C79A2D]" />
                    {t.rank}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{t.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{t.classLevel}</span>
                    <div className="text-[10px] text-emerald-600 font-bold">{t.score}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{t.school}</td>
                  <td className="py-3.5 px-4 font-bold text-[#7B1E1E] dark:text-[#C79A2D]">{t.award}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
