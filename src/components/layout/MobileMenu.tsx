'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Home,
  BookOpen,
  Sparkles,
  GraduationCap,
  Award,
  Calendar,
  FileText,
  Trophy,
  HelpCircle,
  School,
  User,
  Users,
  Phone,
  Mail,
  MapPin,
  Globe,
  ChevronRight,
  Menu,
} from 'lucide-react';
import Image from 'next/image';

export const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { language, toggleLanguage, navigateTo } = useApp();

  if (!isOpen) return null;

  const handleLinkClick = (route: string) => {
    navigateTo(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white dark:bg-[#121010] overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-amber-200/40 dark:border-gray-800 bg-gradient-to-r from-amber-50/80 to-white dark:from-[#1A1414] dark:to-[#121010]">
        <div className="flex items-center gap-2">
          {/* Logo container with relative positioning and fixed size */}
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md flex-shrink-0">
            <Image
              src="/logo/logo.png"
              alt={'भारती भाषा ओलंपियाड लोगो'}
              fill
              priority
              sizes="40px"
              className="object-contain"
            />
          </div>
          {/* Brand name */}
          <div>
            <span className="font-playfair font-bold text-base text-[#7B1E1E] dark:text-[#C79A2D]">
              भारती भाषा ओलंपियाड
            </span>
            <p className="text-[10px] font-bold tracking-wide text-[#12244c] dark:text-gray-400 mt-0">
              {'अपनी भाषा, अपनी पहचान'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-amber-100/50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Quick Action Cards */}
      {/* <div className="p-4 grid grid-cols-2 gap-3 bg-amber-50/40 dark:bg-[#1A1414] border-b border-amber-200/30 dark:border-gray-800">
        <button
          onClick={() => handleLinkClick('/mock-test')}
          className="group p-4 bg-gradient-to-r from-[#7B1E1E] to-[#A32A2A] text-white rounded-2xl text-left shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col gap-1.5"
        >
          <Sparkles className="w-5 h-5 text-[#C79A2D] group-hover:scale-110 transition-transform" />
          <span className="font-bold text-base">{'मॉक टेस्ट दें'}</span>
          <span className="text-xs opacity-80">{'नि:शुल्क अभ्यास प्रश्नोत्तर'}</span>
        </button>

        <button
          onClick={() => handleLinkClick('/performance-report')}
          className="group p-4 bg-white dark:bg-gray-800 border-2 border-amber-200/60 dark:border-gray-700 rounded-2xl text-left shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col gap-1.5"
        >
          <Trophy className="w-5 h-5 text-[#C79A2D] group-hover:scale-110 transition-transform" />
          <span className="font-bold text-base text-gray-900 dark:text-white">{'परिणाम देखें'}</span>
          <span className="text-xs text-gray-500">{'अनुक्रमांक द्वारा खोजें'}</span>
        </button>
      </div> */}

      {/* Navigation Links */}
      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {/* Section 1: Main Pages */}
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 px-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#C79A2D] rounded-full"></span>
            {'मुख्य पृष्ठ व परिचय'}
          </h3>
          <div className="space-y-0.5">
            {[
              { route: '/', icon: Home, label: 'मुख्य पृष्ठ', color: 'text-[#7B1E1E]' },
              { route: '/about', icon: BookOpen, label: 'ओलंपियाड परिचय', color: 'text-[#7B1E1E]' },
              { route: '/vision-mission', icon: Sparkles, label: 'लक्ष्य एवं दूरदृष्टि', color: 'text-[#C79A2D]' },
              { route: '/why-us', icon: GraduationCap, label: 'हमारा चयन क्यों?', color: 'text-[#7B1E1E]' },
              { route: '/nep-2020', icon: Award, label: 'एनईपी 2020 नीति', color: 'text-[#C79A2D]' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.route}
                  onClick={() => handleLinkClick(item.route)}
                  className="w-full text-left px-3 py-2.5 text-base rounded-xl hover:bg-amber-100/50 dark:hover:bg-white/5 font-medium flex items-center gap-3 transition-all duration-200 group"
                >
                  <Icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-gray-800 dark:text-gray-200 group-hover:text-[#7B1E1E] dark:group-hover:text-[#C79A2D] transition-colors">
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Olympiads & Syllabus */}
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 px-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#C79A2D] rounded-full"></span>
            {'परीक्षा एवं पाठ्यक्रम'}
          </h3>
          <div className="space-y-0.5">
            {[
              { route: '/hindi-olympiad', label: 'हिंदी ओलंपियाड', color: 'bg-[#7B1E1E]' },
              { route: '/sanskrit-olympiad', label: 'संस्कृत ओलंपियाड', color: 'bg-[#C79A2D]' },
              { route: '/syllabus', icon: FileText, label: 'पाठ्यक्रम (Syllabus)', color: 'text-gray-500' },
              { route: '/exam-dates', icon: Calendar, label: 'परीक्षा तिथियाँ', color: 'text-gray-500' },
              { route: '/sample-papers', icon: FileText, label: 'सैंपल पेपर्स', color: 'text-gray-500' },
            ].map((item) => {
              if (item.icon) {
                const Icon = item.icon;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleLinkClick(item.route)}
                    className="w-full text-left px-3 py-2.5 text-base rounded-xl hover:bg-amber-100/50 dark:hover:bg-white/5 font-medium flex items-center gap-3 transition-all duration-200 group"
                  >
                    <Icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-gray-800 dark:text-gray-200 group-hover:text-[#7B1E1E] dark:group-hover:text-[#C79A2D] transition-colors">
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              }
              return (
                <button
                  key={item.route}
                  onClick={() => handleLinkClick(item.route)}
                  className="w-full text-left px-3 py-2.5 text-base rounded-xl hover:bg-amber-100/50 dark:hover:bg-white/5 font-medium flex items-center gap-3 transition-all duration-200 group"
                >
                  <span className={`w-3 h-3 rounded-full ${item.color} group-hover:scale-125 transition-transform`} />
                  <span className="text-gray-800 dark:text-gray-200 group-hover:text-[#7B1E1E] dark:group-hover:text-[#C79A2D] transition-colors">
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Registration */}
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 px-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#C79A2D] rounded-full"></span>
            {'पंजीकरण केंद्र'}
          </h3>
          <div className="space-y-0.5">
            {[
              { route: '/registration', icon: School, label: 'विद्यालय पंजीकरण', sub: 'School Registration', color: 'text-[#7B1E1E]' },
              { route: '/registration', icon: User, label: 'व्यक्तिगत छात्र पंजीकरण', sub: 'Student Registration', color: 'text-[#C79A2D]' },
              { route: '/registration', icon: Users, label: 'शिक्षक संयोजक', sub: 'Teacher Coordinator', color: 'text-gray-500' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.route + item.label}
                  onClick={() => handleLinkClick(item.route)}
                  className="w-full text-left px-3 py-2.5 text-base rounded-xl hover:bg-amber-100/50 dark:hover:bg-white/5 font-medium flex items-center gap-3 transition-all duration-200 group"
                >
                  <Icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                  <div>
                    <div className="text-gray-800 dark:text-gray-200 group-hover:text-[#7B1E1E] dark:group-hover:text-[#C79A2D] transition-colors">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-400">{item.sub}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Other Pages */}
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 px-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#C79A2D] rounded-full"></span>
            {'अन्य पृष्ठ'}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { route: '/gallery', label: 'गैलरी' },
              { route: '/events-news', label: 'आयोजन व समाचार' },
              { route: '/blogs', label: 'ब्लॉग' },
              { route: '/testimonials', label: 'अनुभव' },
              { route: '/partners-schools', label: 'सहयोगी विद्यालय' },
              { route: '/contact', label: 'संपर्क करें' },
              { route: '/careers', label: 'करियर' },
              { route: '/sitemap', label: 'साइटमैप' },
            ].map((item) => (
              <button
                key={item.route}
                onClick={() => handleLinkClick(item.route)}
                className="text-left px-3 py-2 text-base rounded-xl hover:bg-amber-100/50 dark:hover:bg-white/5 font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Contact Info */}
      <div className="p-4 bg-amber-50/60 dark:bg-[#1A1414] border-t border-amber-200/30 dark:border-gray-800 text-base space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-600 dark:text-gray-400">मातृभाषा:</span>
          <div className="font-bold text-[#7B1E1E] dark:text-[#C79A2D] flex items-center gap-1">
            <Globe className="w-4 h-4" />
            हिन्दी (देवनागरी)
          </div>
        </div>
        <div className="text-gray-500 pt-1 space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#C79A2D]" />
            <span>टोल-फ्री: 1800-123-9876</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#C79A2D]" />
            <span>info@bharatibhasha.org</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;