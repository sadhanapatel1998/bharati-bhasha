import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { language, navigateTo } = useApp();

  return (
    <div className="max-w-xl mx-auto text-center py-20 space-y-6 px-4">
      <div className="text-7xl font-extrabold text-[#7B1E1E] dark:text-[#C79A2D]">404</div>
      <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
        {language === 'hi' ? 'पृष्ठ नहीं मिला' : 'Page Not Found'}
      </h1>
      <p className="text-xs text-gray-500">
        The requested page does not exist or has been moved.
      </p>
      <button 
        onClick={() => navigateTo('home')}
        className="bg-[#7B1E1E] text-white px-6 py-3 rounded-2xl font-bold text-xs inline-flex items-center gap-2"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home Page</span>
      </button>
    </div>
  );
};
