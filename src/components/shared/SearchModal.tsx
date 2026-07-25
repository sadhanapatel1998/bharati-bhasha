'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import { Search, X, BookOpen, FileText, Sparkles, ArrowRight } from 'lucide-react';

interface SearchResult {
  title: string;
  category: string;
  route: PageRoute;
  description: string;
}

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, language, navigateTo } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const SEARCH_DATABASE: SearchResult[] = [
    { title: 'राष्ट्रीय हिंदी ओलंपियाड', category: 'परीक्षा', route: 'hindi-olympiad', description: 'कक्षा 1 से 12 तक के लिए हिंदी परीक्षा पैटर्न, पात्रता एवं पुरस्कार' },
    { title: 'राष्ट्रीय संस्कृत ओलंपियाड', category: 'परीक्षा', route: 'sanskrit-olympiad', description: 'संस्कृत व्याकरण, श्लोक एवं साहित्य परीक्षा का संपूर्ण विवरण' },
    { title: 'कक्षा 1 से 12 पाठ्यक्रम (Syllabus)', category: 'पाठ्यक्रम', route: 'syllabus', description: 'कक्षावार विषय सूची, अंक विभाजन एवं परीक्षा अवधि' },
    { title: 'नि:शुल्क ऑनलाइन मॉक टेस्ट', category: 'अभ्यास', route: 'mock-test', description: 'तत्काल स्कोर एवं उत्तर व्याख्या के साथ डिजिटल टेस्ट' },
    { title: 'मॉडल प्रश्न पत्र (Sample Papers)', category: 'संसाधन', route: 'sample-papers', description: 'विगत वर्षों के प्रश्न पत्र एवं अभ्यास सेट (PDF)' },
    { title: 'वैज्ञानिक बेंचमार्क मूल्यांकन रिपोर्ट', category: 'मूल्यांकन', route: 'benchmark-assessment', description: '12-आयामी भाषाई कौशल एवं दक्षता विश्लेषण' },
    { title: 'पुरस्कार एवं छात्रवृत्तियाँ', category: 'छात्रवृत्ति', route: 'awards', description: '₹1 करोड़ की कुल छात्रवृत्तियां, स्वर्ण पदक व सम्मान' },
    { title: 'राष्ट्रीय शिक्षा नीति (NEP 2020)', category: 'शिक्षा नीति', route: 'nep-2020', description: 'एनईपी 2020 एवं भारतीय ज्ञान परंपरा का समावेश' },
    { title: 'विद्यालय पंजीकरण (School Registration)', category: 'पंजीकरण', route: 'school-registration', description: 'विद्यालय कोड व प्राचार्यों के लिए सामूहिक पंजीकरण' },
    { title: 'व्यक्तिगत छात्र पंजीकरण', category: 'पंजीकरण', route: 'student-registration', description: 'कक्षा 1 से 12 तक के विद्यार्थियों के लिए सीधा आवेदन' },
    { title: 'परीक्षा परिणाम व रिपोर्ट कार्ड', category: 'परिणाम', route: 'performance-report', description: 'अनुक्रमांक दर्ज कर ऑनलाइन रिपोर्ट कार्ड प्राप्त करें' },
    { title: 'सामान्य प्रश्न (FAQs)', category: 'सहायता', route: 'faqs', description: 'पात्रता, शुल्क, परीक्षा तिथि एवं हेल्पलाइन संपर्क' }
  ];

  const results = query.trim() === '' 
    ? SEARCH_DATABASE.slice(0, 5) 
    : SEARCH_DATABASE.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (route: PageRoute) => {
    navigateTo(route);
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1A1414] w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C79A2D] shrink-0" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'hi' ? 'खोजें: पाठ्यक्रम, मॉक टेस्ट, पुरस्कार, सैंपल पेपर...' : 'Search: syllabus, mock test, awards, sample paper...'} 
            className="w-full bg-transparent text-sm sm:text-base font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-6 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            {query.trim() === '' ? (language === 'hi' ? 'लोकप्रिय खोजें' : 'Popular Destinations') : (language === 'hi' ? 'खोज परिणाम' : 'Search Results')}
          </div>

          {results.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-xs">
              {language === 'hi' ? 'कोई परिणाम नहीं मिला। कृपया अन्य शब्द का प्रयास करें।' : 'No matching results found. Try searching for "Syllabus" or "Awards".'}
            </div>
          ) : (
            results.map((res, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(res.route)}
                className="w-full text-left p-3.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#7B1E1E]/10 dark:bg-[#C79A2D]/10 text-[#7B1E1E] dark:text-[#C79A2D] font-bold text-[10px]">
                      {res.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white group-hover:text-[#7B1E1E] dark:group-hover:text-[#C79A2D] transition-colors">
                      {res.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {res.description}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#7B1E1E] dark:group-hover:text-[#C79A2D] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
