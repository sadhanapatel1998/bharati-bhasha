'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { EXAM_SCHEDULE } from '../data/olympiadData';
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
export const ExamDatesPage: React.FC = () => {
  const {
    language
  } = useApp();
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#C79A2D]/10 text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {'समय सारणी 2026'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {'ओलंपियाड परीक्षा तिथियाँ व समय सारणी'}
        </h1>
      </div>

      <div className="space-y-4">
        {EXAM_SCHEDULE.map(item => <div key={item.id} className="bg-white dark:bg-[#1A1414] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] text-[10px] font-bold uppercase">
                {item.subject} • {item.eligibleClasses}
              </span>
              <h3 className="font-playfair font-bold text-lg text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C79A2D]" /> {item.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C79A2D]" /> {item.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C79A2D]" /> {item.mode}
                </span>
              </div>
            </div>

            <button className="bg-[#7B1E1E] text-white font-bold px-6 py-2.5 rounded-xl text-xs shrink-0">
              {'कैलेंडर में जोड़ें'}
            </button>
          </div>)}
      </div>

    </div>;
};