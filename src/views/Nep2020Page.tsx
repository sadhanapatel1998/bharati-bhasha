'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { BookOpen, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';
export const Nep2020Page: React.FC = () => {
  const {
    language
  } = useApp();
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{
      label: 'एनईपी 2020 नीति'
    }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#2E8B57]/10 text-[#2E8B57] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {'राष्ट्रीय शिक्षा नीति 2020'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          NEP 2020 & Bharatiya Bhasha Renaissance
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {'मातृभाषा, भारतीय भाषाओं एवं ज्ञान परंपरा का राष्ट्रीय पुनरुत्थान'}
        </p>
      </div>

      <div className="bg-white dark:bg-[#1A1414] rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 dark:border-gray-800 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              {'त्रि-भाषा सूत्र प्रोत्साहन'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {'प्राथमिक से माध्यमिक स्तर तक हिंदी, संस्कृत एवं क्षेत्रीय भाषाओं में स्वाभाविक प्रवीणता।'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              {'भारतीय ज्ञान परंपरा (IKS)'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {'पाणिनि व्याकरण, कौटिल्य अर्थशास्त्र, वैदिक गणित व संस्कृत श्लोकों की प्रासंगिकता।'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              {'रटने के स्थान पर समझ'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {'रटने की पुरानी पद्धति को समाप्त कर तार्किक व व्यावहारिक भाषा बोध की जाँच।'}
            </p>
          </div>

        </div>
      </div>

    </div>;
};