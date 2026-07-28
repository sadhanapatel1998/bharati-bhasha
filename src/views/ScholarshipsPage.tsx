'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { Award, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';
export const ScholarshipsPage: React.FC = () => {
  const {
    language
  } = useApp();
  const [selectedClass, setSelectedClass] = useState('8');
  const [targetRank, setTargetRank] = useState('rank1');
  let estimatedScholarship = "₹1,00,000 Cash + Apple iPad + Gold Medal";
  if (targetRank === 'rank2') estimatedScholarship = "₹50,000 Cash + Laptop + Silver Medal";
  if (targetRank === 'rank3') estimatedScholarship = "₹25,000 Cash + Smart Tab + Bronze Medal";
  if (targetRank === 'state1') estimatedScholarship = "₹5,000 Cash + State Trophy + Certificate";
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{
      label: 'छात्रवृत्ति कैलकुलेटर'
    }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#C79A2D]/10 text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {'छात्रवृत्ति प्रोत्साहन'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {'राष्ट्रीय भाषा छात्रवृत्ति 2026'}
        </h1>
      </div>

      {/* Calculator Card */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#1A1414] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
          <Calculator className="w-5 h-5 text-[#C79A2D]" />
          <span>{'संभावित छात्रवृत्ति कैलकुलेटर'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {'कक्षा चुनें'}
            </label>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium focus:outline-none focus:border-[#C79A2D]">
              {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>Class {i + 1}th</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {'लक्ष्य रैंक'}
            </label>
            <select value={targetRank} onChange={e => setTargetRank(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium focus:outline-none focus:border-[#C79A2D]">
              <option value="rank1">National Rank 1 (Gold Winner)</option>
              <option value="rank2">National Rank 2 (Runner Up)</option>
              <option value="rank3">National Rank 3 (Bronze)</option>
              <option value="state1">State Top 10 Ranker</option>
            </select>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#7B1E1E] to-[#A32A2A] text-white space-y-2">
          <div className="text-[10px] uppercase font-bold text-[#C79A2D]">
            {'अनुमानित पुरस्कार व छात्रवृत्ति:'}
          </div>
          <div className="text-xl font-extrabold">{estimatedScholarship}</div>
          <div className="text-xs text-gray-200">
            {'विज्ञान भवन नई दिल्ली में भव्य सम्मान समारोह'}
          </div>
        </div>
      </div>

    </div>;
};