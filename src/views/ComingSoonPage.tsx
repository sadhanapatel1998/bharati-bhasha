'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Home } from 'lucide-react';
export const ComingSoonPage: React.FC = () => {
  const {
    language,
    navigateTo
  } = useApp();
  return <div className="max-w-xl mx-auto text-center py-20 space-y-6 px-4">
      <div className="w-16 h-16 rounded-3xl bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center mx-auto text-3xl">
        <Sparkles className="w-8 h-8" />
      </div>
      <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
        {'शीघ्र उपलब्ध होगा'}
      </h1>
      <p className="text-xs text-gray-500">
        This module is undergoing final quality review and will be live shortly.
      </p>
      <button onClick={() => navigateTo('/')} className="bg-[#7B1E1E] text-white px-6 py-3 rounded-2xl font-bold text-xs inline-flex items-center gap-2">
        <Home className="w-4 h-4" />
        <span>Return to Home Page</span>
      </button>
    </div>;
};