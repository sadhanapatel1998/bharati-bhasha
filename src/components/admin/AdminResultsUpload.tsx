'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Upload, 
  FileCheck, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Search, 
  Sparkles,
  Trophy,
  Award
} from 'lucide-react';

export const AdminResultsUpload: React.FC = () => {
  const { showToast } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<'हिंदी' | 'संस्कृत'>('हिंदी');
  const [selectedClass, setSelectedClass] = useState('कक्षा 1 से 5');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      showToast('कृपया पहले CSV या Excel परिणाम फ़ाइल का चयन करें।', 'warning');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setUploadFile(null);
      showToast(`${selectedSubject} (${selectedClass}) का ओएमआर मूल्यांकन परिणाम डेटा 100% ओएमआर सत्यापन सहित सफलतापूर्वक अपलोड किया गया!`, 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Upload className="w-4 h-4" />
            </div>
            <h1 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              ओएमआर एवं परिणाम शीट अपलोड (OMR & Results Bulk Upload)
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            482 परीक्षा केंद्रों से प्राप्त CSV / Excel ओएमआर स्कैन शीट मूल्यांकन डेटा प्रविष्टि
          </p>
        </div>

        <button 
          onClick={() => showToast('मॉडल (Sample Format) Excel शीट डाउनलोड हो गई है।', 'info')}
          className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] hover:bg-[#7B1E1E] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          मॉडल (Sample) Excel टेम्प्लेट
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form Box */}
        <form onSubmit={handleUploadSubmit} className="lg:col-span-2 bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
              परीक्षार्थी प्राप्तांक फ़ाइल अपलोड करें
            </h2>
            <p className="text-xs text-gray-500">विषय एवं वर्गावधि चयन कर सत्यापित CSV फ़ाइल प्रविष्ट करें</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">ओलंपियाड विषय</label>
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold"
              >
                <option value="हिंदी">राष्ट्रीय हिंदी ओलंपियाड</option>
                <option value="संस्कृत">राष्ट्रीय संस्कृत ओलंपियाड</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">वर्ग श्रेणी (Class Range)</label>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold"
              >
                <option value="कक्षा 1 से 5">प्राथमिक वर्ग (कक्षा 1 - 5)</option>
                <option value="कक्षा 6 से 8">माध्यमिक वर्ग (कक्षा 6 - 8)</option>
                <option value="कक्षा 9 से 12">वरिष्ठ वर्ग (कक्षा 9 - 12)</option>
              </select>
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-[#7B1E1E] dark:hover:border-[#C79A2D] p-8 rounded-2xl text-center space-y-3 bg-gray-50/50 dark:bg-gray-800/30 transition-colors cursor-pointer">
            <FileSpreadsheet className="w-10 h-10 text-[#7B1E1E] dark:text-[#C79A2D] mx-auto" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-gray-900 dark:text-white">
                {uploadFile ? uploadFile.name : 'Excel / CSV परिणाम फ़ाइल यहाँ खींचें (Drag & Drop)'}
              </div>
              <p className="text-gray-400">समर्थित फ़ाइल प्रारूप: .xlsx, .xls, .csv (अधिकतम 25 MB)</p>
            </div>

            <input 
              type="file" 
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden" 
              id="result-file-input"
            />
            <label 
              htmlFor="result-file-input"
              className="inline-block bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] hover:bg-[#7B1E1E] hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              फ़ाइल चुनें (Browse)
            </label>
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              disabled={isProcessing}
              className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>ओएमआर डेटा संसाधित हो रहा है...</>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-[#C79A2D]" />
                  परिणाम अपलोड करें एवं रैंक जेनरेट करें
                </>
              )}
            </button>
          </div>
        </form>

        {/* Validation Checklist */}
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
            <h3 className="font-playfair text-base font-bold text-[#7B1E1E] dark:text-[#C79A2D] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              मूल्यांकन सुरक्षा दिशानिर्देश
            </h3>
            <p className="text-[11px] text-gray-500">डेटा प्रविष्टि से पूर्व अनिवार्य बिंदु</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300">प्रत्येक परीक्षार्थी का अनुक्रमांक (Roll No) डेटाबेस में अद्वितीय (Unique) होना चाहिए।</p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300">प्राप्तांक कॉलम में केवल 0 से 100 के मध्य की संख्या मान्य है।</p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300">अपलोड के पश्चात 12-आयामी वैज्ञानिक सूचकांक द्वारा मेधावी छात्रवृत्ति रैंक स्वतः संगणित होगी।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
