'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { Briefcase, Send } from 'lucide-react';
export const CareersPage: React.FC = () => {
  const {
    language,
    showToast
  } = useApp();
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {'संस्था से जुड़ें'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {'भाषा विशेषज्ञ एवं राज्य समन्वयक अवसर'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[{
        title: 'Sanskrit Language Question Designer',
        type: 'Full Time / Remote',
        loc: 'New Delhi / Remote'
      }, {
        title: 'Hindi Curriculum Evaluation Specialist',
        type: 'Full Time',
        loc: 'New Delhi'
      }, {
        title: 'State School Coordinator (Uttar Pradesh & Bihar)',
        type: 'Field Role',
        loc: 'Regional Offices'
      }, {
        title: 'Full Stack Frontend Engineer (EdTech)',
        type: 'Full Time',
        loc: 'New Delhi'
      }].map((job, idx) => <div key={idx} className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">{job.title}</h3>
            <p className="text-xs text-gray-500">{job.type} • {job.loc}</p>
            <button onClick={() => showToast('CV Submission form opened.', 'info')} className="bg-[#7B1E1E] text-white px-4 py-2 rounded-xl font-bold text-xs">
              Apply Now
            </button>
          </div>)}
      </div>

    </div>;
};