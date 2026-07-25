import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';

export const SitemapPage: React.FC = () => {
  const { language, navigateTo } = useApp();

  const LINKS = [
    { label: 'Home Page', route: 'home' },
    { label: 'About Us', route: 'about' },
    { label: 'Vision & Mission', route: 'vision-mission' },
    { label: 'Why Choose Us', route: 'why-us' },
    { label: 'NEP 2020 Policy', route: 'nep-2020' },
    { label: 'Hindi Olympiad', route: 'hindi-olympiad' },
    { label: 'Sanskrit Olympiad', route: 'sanskrit-olympiad' },
    { label: 'Awards & Medals', route: 'awards' },
    { label: 'Scholarships', route: 'scholarships' },
    { label: 'Benchmark Assessment', route: 'benchmark' },
    { label: 'Performance Report / Result', route: 'performance-report' },
    { label: 'Olympiad Registration', route: 'registration' },
    { label: 'Mock Exam Simulator', route: 'mock-test' },
    { label: 'Syllabus (1st to 12th)', route: 'syllabus' },
    { label: 'Exam Dates', route: 'exam-dates' },
    { label: 'Sample Papers (PDF)', route: 'sample-papers' },
    { label: 'Frequently Asked Questions (FAQs)', route: 'faqs' },
    { label: 'Photo & Video Gallery', route: 'gallery' },
    { label: 'Events & News', route: 'events-news' },
    { label: 'Blogs & Articles', route: 'blogs' },
    { label: 'Testimonials', route: 'testimonials' },
    { label: 'Affiliated Schools', route: 'partners-schools' },
    { label: 'Contact Us', route: 'contact' },
    { label: 'Careers', route: 'careers' },
    { label: 'Privacy & Terms', route: 'privacy-terms' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: language === 'hi' ? 'साइटमैप' : 'Sitemap' }]} />

      <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
        Complete Website Sitemap
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {LINKS.map((link, idx) => (
          <button
            key={idx}
            onClick={() => navigateTo(link.route as any)}
            className="p-3.5 bg-white dark:bg-[#1A1414] rounded-2xl border border-gray-100 dark:border-gray-800 text-left text-xs font-bold text-gray-800 dark:text-gray-200 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] shadow-sm transition-all"
          >
            • {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};
