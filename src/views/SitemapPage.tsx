'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';

export const SitemapPage: React.FC = () => {
  const { navigateTo } = useApp();

  const LINKS = [
    { label: 'मुख्य पृष्ठ', route: '/' },
    { label: 'हमारे बारे में', route: '/about' },
    { label: 'लक्ष्य एवं दूरदृष्टि', route: '/vision-mission' },
    { label: 'हमारा चयन क्यों?', route: '/why-us' },
    { label: 'एनईपी 2020 नीति', route: '/nep-2020' },
    { label: 'हिंदी ओलंपियाड', route: '/hindi-olympiad' },
    { label: 'संस्कृत ओलंपियाड', route: '/sanskrit-olympiad' },
    { label: 'पुरस्कार व पदक', route: '/awards' },
    { label: 'छात्रवृत्तियाँ', route: '/scholarships' },
    { label: 'बेंचमार्क मूल्यांकन', route: '/benchmark' },
    { label: 'परिणाम / रिपोर्ट कार्ड', route: '/performance-report' },
    { label: 'ओलंपियाड पंजीकरण', route: '/registration' },
    { label: 'मॉक टेस्ट', route: '/mock-test' },
    { label: 'पाठ्यक्रम (कक्षा 1 से 12)', route: '/syllabus' },
    { label: 'परीक्षा तिथियाँ', route: '/exam-dates' },
    { label: 'सैंपल पेपर्स (PDF)', route: '/sample-papers' },
    { label: 'सामान्य प्रश्न (FAQs)', route: '/faqs' },
    { label: 'फोटो व वीडियो गैलरी', route: '/gallery' },
    { label: 'आयोजन व समाचार', route: '/events-news' },
    { label: 'ब्लॉग व लेख', route: '/blogs' },
    { label: 'अनुभव (Testimonials)', route: '/testimonials' },
    { label: 'सहयोगी विद्यालय', route: '/partners-schools' },
    { label: 'संपर्क करें', route: '/contact' },
    { label: 'करियर', route: '/careers' },
    { label: 'गोपनीयता व नियम', route: '/privacy-terms' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
        संपूर्ण वेबसाइट साइटमैप
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {LINKS.map((link, idx) => (
          <button
            key={idx}
            onClick={() => navigateTo(link.route)}
            className="p-3.5 bg-white dark:bg-[#1A1414] rounded-2xl border border-gray-100 dark:border-gray-800 text-left text-xs font-bold text-gray-800 dark:text-gray-200 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] shadow-sm transition-all"
          >
            • {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};
