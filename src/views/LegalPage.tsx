'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { ShieldCheck } from 'lucide-react';
export const LegalPage: React.FC = () => {
  const {
    language
  } = useApp();
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
        Privacy Policy, Terms & Legal Disclaimer
      </h1>

      <div className="bg-white dark:bg-[#1A1414] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-4 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
        <h3 className="font-bold text-sm text-gray-900 dark:text-white">1. Data Privacy Policy</h3>
        <p>Bharati Bhasha Olympiad Trust respects student data privacy. Student registration details are used strictly for olympiad evaluation, admit card generation, and national score card processing.</p>

        <h3 className="font-bold text-sm text-gray-900 dark:text-white">2. Exam Rules & Evaluation Integrity</h3>
        <p>All online and offline olympiad exams adhere to 100% transparent evaluation protocols governed by national academic boards.</p>
      </div>

    </div>;
};