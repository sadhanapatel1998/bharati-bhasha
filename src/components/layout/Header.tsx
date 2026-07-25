'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import {
  Globe,
  Moon,
  Sun,
  Search,
  Menu,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Trophy,
  FileText,
  Calendar,
  HelpCircle,
  Sparkles,
  School,
  User,
  Users,
  Award,
  Phone,
  Mail,
  Bell
} from 'lucide-react';
import Image from "next/image";

export const Header: React.FC<{ onOpenMobileMenu: () => void }> = ({ onOpenMobileMenu }) => {
  const { language, toggleLanguage, theme, toggleTheme, currentRoute, navigateTo, setIsSearchOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: PageRoute) => {
    navigateTo(route);
    setActiveDropdown(null);
    setIsRegisterOpen(false);
  };

  return (
    <div className="w-full sticky top-0 z-50">
      {/* ================= TOP ANNOUNCEMENT & CONTACT BAR ================= */}
      <div className="bg-gradient-to-r from-[#7B1E1E] via-[#8B2323] to-[#0F2942] text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">

          {/* Left: Contact Information */}
          <div className="flex items-center gap-4 text-gray-200">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-[#C79A2D] transition-colors">
              <Phone className="w-3 h-3 text-[#C79A2D]" />
              <span>+91 98765 43210</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a href="mailto:info@bharatibhasha.org" className="hidden sm:flex items-center gap-1.5 hover:text-[#C79A2D] transition-colors">
              <Mail className="w-3 h-3 text-[#C79A2D]" />
              <span>info@bharatibhasha.org</span>
            </a>
          </div>

          {/* Center: Live Announcement Ticker */}
          <div className="hidden lg:flex items-center gap-2 bg-white/10 dark:bg-black/20 px-3 py-0.5 rounded-full border border-white/10">
            <Bell className="w-3 h-3 text-[#C79A2D] animate-bounce" />
            <span className="text-[11px] font-medium tracking-wide">
              {language === 'hi'
                ? 'सत्र 2026-27 के लिए पंजीकरण प्रारंभ हैं! जल्द आवेदन करें।'
                : 'Registrations Open for Session 2026-27! Register Today.'}
            </span>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen?.(true)}
              className="flex items-center gap-1 hover:text-[#C79A2D] transition-colors"
              title="Search Website"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">{language === 'hi' ? 'खोजें' : 'Search'}</span>
            </button>

            <span className="text-white/30">|</span>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-[#C79A2D] transition-colors font-medium"
            >
              <Globe className="w-3.5 h-3.5 text-[#C79A2D]" />
              <span className="text-[11px]">{language === 'hi' ? 'English' : 'हिन्दी'}</span>
            </button>

            <span className="text-white/30">|</span>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-0.5 rounded-full hover:text-[#C79A2D] transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVIGATION HEADER ================= */}
      <header
        className={`w-full transition-all duration-300 backdrop-blur-md ${isScrolled
            ? 'bg-white/90 dark:bg-[#121010]/90 shadow-lg py-2 border-b border-amber-500/20'
            : 'bg-[#FAFAF8]/95 dark:bg-[#121010]/95 py-3 border-b border-[#7B1E1E]/10 dark:border-white/10'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Brand Logo & Title Integration */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative">
              <Image
                src="/logo/logo.png"
                alt="भारती भाषा ओलंपियाड Logo"
                width={50}
                height={50}
                priority
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="font-serif font-bold text-lg sm:text-xl leading-none tracking-tight text-[#7B1E1E] dark:text-[#F5F0E6]">
                  भारती भाषा <span className="text-[#C79A2D]">ओलंपियाड</span>
                </h1>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-gray-600 dark:text-gray-300 mt-1">
                {language === 'hi' ? 'अपनी भाषा, अपनी पहचान' : "India's National Language Olympiad"}
              </p>
            </div> */}
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">

            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${currentRoute === 'home'
                  ? 'text-[#7B1E1E] dark:text-[#C79A2D] bg-[#7B1E1E]/10 dark:bg-[#C79A2D]/10 font-bold'
                  : 'text-gray-700 dark:text-gray-200 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
            >
              {language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}
            </button>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                <span>{language === 'hi' ? 'परिचय' : 'About Us'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white dark:bg-[#1A1414] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 space-y-1">
                    <button onClick={() => handleNavClick('about')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <BookOpen className="w-4 h-4 text-[#7B1E1E] dark:text-[#C79A2D]" />
                      {language === 'hi' ? 'ओलंपियाड के बारे में' : 'About Olympiad'}
                    </button>
                    <button onClick={() => handleNavClick('vision-mission')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <Sparkles className="w-4 h-4 text-[#C79A2D]" />
                      {language === 'hi' ? 'लक्ष्य एवं दूरदृष्टि' : 'Vision & Mission'}
                    </button>
                    <button onClick={() => handleNavClick('why-us')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <GraduationCap className="w-4 h-4 text-[#7B1E1E] dark:text-[#C79A2D]" />
                      {language === 'hi' ? 'हमारा चयन क्यों?' : 'Why Choose Us'}
                    </button>
                    <button onClick={() => handleNavClick('nep-2020')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <Award className="w-4 h-4 text-[#C79A2D]" />
                      {language === 'hi' ? 'एनईपी 2020 नीति' : 'NEP 2020 Alignment'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Olympiads Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('olympiads')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                <span>{language === 'hi' ? 'ओलंपियाड परीक्षाएँ' : 'Olympiads'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'olympiads' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'olympiads' && (
                <div className="absolute top-full left-0 w-72 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white dark:bg-[#1A1414] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 space-y-1">
                    <button onClick={() => handleNavClick('hindi-olympiad')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7B1E1E]"></span>
                      {language === 'hi' ? 'राष्ट्रीय हिंदी भाषा ओलंपियाड' : 'National Hindi Olympiad'}
                    </button>
                    <button onClick={() => handleNavClick('sanskrit-olympiad')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C79A2D]"></span>
                      {language === 'hi' ? 'राष्ट्रीय संस्कृत भाषा ओलंपियाड' : 'National Sanskrit Olympiad'}
                    </button>
                    <button onClick={() => handleNavClick('syllabus')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <FileText className="w-4 h-4 text-gray-500" />
                      {language === 'hi' ? 'पाठ्यक्रम (कक्षा 1-12)' : 'Class 1-12 Syllabus'}
                    </button>
                    <button onClick={() => handleNavClick('exam-dates')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {language === 'hi' ? 'परीक्षा तिथियाँ व समय सारणी' : 'Exam Schedule'}
                    </button>
                    <button onClick={() => handleNavClick('benchmark-assessment')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <Trophy className="w-4 h-4 text-[#C79A2D]" />
                      {language === 'hi' ? 'बेंचमार्क मूल्यांकन' : 'Benchmark Assessment'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Student Zone Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                <span>{language === 'hi' ? 'छात्र कॉर्नर' : 'Student Zone'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white dark:bg-[#1A1414] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 space-y-1">
                    <button onClick={() => handleNavClick('mock-test')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-bold flex items-center gap-2.5 text-[#7B1E1E] dark:text-[#C79A2D] transition-colors">
                      <Sparkles className="w-4 h-4 animate-pulse text-[#C79A2D]" />
                      {language === 'hi' ? 'ऑनलाइन मॉक टेस्ट' : 'Online Mock Test'}
                    </button>
                    <button onClick={() => handleNavClick('sample-papers')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <FileText className="w-4 h-4 text-gray-500" />
                      {language === 'hi' ? 'मॉडल प्रश्न पत्र' : 'Sample Papers'}
                    </button>
                    <button onClick={() => handleNavClick('performance-report')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <Trophy className="w-4 h-4 text-[#C79A2D]" />
                      {language === 'hi' ? 'परिणाम व रिपोर्ट कार्ड' : 'View Results'}
                    </button>
                    <button onClick={() => handleNavClick('faqs')} className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-medium flex items-center gap-2.5 transition-colors">
                      <HelpCircle className="w-4 h-4 text-gray-500" />
                      {language === 'hi' ? 'सामान्य प्रश्न (FAQs)' : 'FAQs'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Awards */}
            <button
              onClick={() => handleNavClick('awards')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${currentRoute === 'awards' ? 'text-[#7B1E1E] dark:text-[#C79A2D] bg-[#7B1E1E]/10 dark:bg-[#C79A2D]/10 font-bold' : 'text-gray-700 dark:text-gray-200 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
            >
              {language === 'hi' ? 'पुरस्कार' : 'Awards'}
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${currentRoute === 'contact' ? 'text-[#7B1E1E] dark:text-[#C79A2D] bg-[#7B1E1E]/10 dark:bg-[#C79A2D]/10 font-bold' : 'text-gray-700 dark:text-gray-200 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
            >
              {language === 'hi' ? 'संपर्क' : 'Contact'}
            </button>
          </nav>

          {/* Right Action & Register Dropdown CTA */}
          <div className="flex items-center gap-2 sm:gap-3">

            <div className="relative">
              <button
                onClick={() => setIsRegisterOpen(!isRegisterOpen)}
                className="bg-gradient-to-r from-[#7B1E1E] via-[#912323] to-[#C79A2D] hover:opacity-95 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                <span>{language === 'hi' ? 'पंजीकरण करें' : 'Register Now'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isRegisterOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Registration Category Menu */}
              {isRegisterOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-[#1A1414] rounded-2xl shadow-2xl border border-amber-500/20 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNavClick('school-registration')}
                    className="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-semibold flex items-center gap-3 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center shrink-0">
                      <School className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-bold">{language === 'hi' ? 'विद्यालय पंजीकरण' : 'School Registration'}</div>
                      <div className="text-[10px] text-gray-500">{language === 'hi' ? 'सामूहिक छात्र पंजीकरण' : 'Bulk student enrollment'}</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('student-registration')}
                    className="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-semibold flex items-center gap-3 transition-colors mt-1"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-bold">{language === 'hi' ? 'व्यक्तिगत छात्र पंजीकरण' : 'Student Registration'}</div>
                      <div className="text-[10px] text-gray-500">{language === 'hi' ? 'कक्षा 1 से 12 परीक्षा' : 'Individual online exam'}</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('teacher-registration')}
                    className="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-semibold flex items-center gap-3 transition-colors mt-1"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-bold">{language === 'hi' ? 'शिक्षक / संयोजक' : 'Teacher / Coordinator'}</div>
                      <div className="text-[10px] text-gray-500">{language === 'hi' ? 'भाषा शिक्षक पंजीकरण' : 'Teacher registration'}</div>
                    </div>
                  </button>

                  <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>

                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#7B1E1E]/10 dark:hover:bg-white/10 font-semibold flex items-center gap-3 transition-colors text-[#7B1E1E] dark:text-[#C79A2D]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold">{language === 'hi' ? 'प्रशासनिक लॉगिन' : 'Admin Portal'}</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger Button */}
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>
    </div>
  );
};