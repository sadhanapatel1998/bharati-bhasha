import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import { 
  Globe, 
  Moon, 
  Sun, 
  Search, 
  Menu, 
  X, 
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
  Award
} from 'lucide-react';

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
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'glass-panel shadow-md py-2.5' 
          : 'bg-[#FAFAF8] dark:bg-[#121010] py-4 border-b border-[#7B1E1E]/10 dark:border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Emblem */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => handleNavClick('home')}
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7B1E1E] to-[#C79A2D] p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#FAFAF8] dark:bg-[#121010] rounded-[10px] flex items-center justify-center">
              <span className="font-playfair text-xl font-bold text-[#7B1E1E] dark:text-[#C79A2D]">
                भा
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-playfair font-bold text-lg leading-none tracking-tight text-[#7B1E1E] dark:text-[#F5F0E6]">
                भारती भाषा <span className="text-[#C79A2D]">ओलंपियाड</span>
              </h1>
            </div>
            <p className="text-[10px] font-medium tracking-wide text-gray-600 dark:text-gray-400 mt-0.5">
              {language === 'hi' ? 'भारत का प्रथम राष्ट्रीय हिंदी व संस्कृत ओलंपियाड' : "India's First National Hindi & Sanskrit Olympiad"}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          
          <button 
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              currentRoute === 'home' 
                ? 'text-[#7B1E1E] dark:text-[#C79A2D] bg-[#7B1E1E]/5 dark:bg-[#C79A2D]/10' 
                : 'text-gray-700 dark:text-gray-300 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D]'
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
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] transition-colors">
              {language === 'hi' ? 'परिचय' : 'About Us'}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 w-64 pt-2 z-50">
                <div className="bg-white dark:bg-[#1A1414] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 space-y-1 glass-panel">
                  <button onClick={() => handleNavClick('about')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#7B1E1E] dark:text-[#C79A2D]" />
                    {language === 'hi' ? 'ओलंपियाड के बारे में' : 'About Olympiad'}
                  </button>
                  <button onClick={() => handleNavClick('vision-mission')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C79A2D]" />
                    {language === 'hi' ? 'लक्ष्य एवं दूरदृष्टि' : 'Vision & Mission'}
                  </button>
                  <button onClick={() => handleNavClick('why-us')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#7B1E1E] dark:text-[#C79A2D]" />
                    {language === 'hi' ? 'हमारा चयन क्यों?' : 'Why Choose Us'}
                  </button>
                  <button onClick={() => handleNavClick('nep-2020')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
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
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] transition-colors">
              {language === 'hi' ? 'ओलंपियाड परीक्षाएँ' : 'Olympiads'}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'olympiads' && (
              <div className="absolute top-full left-0 w-72 pt-2 z-50">
                <div className="bg-white dark:bg-[#1A1414] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 space-y-1 glass-panel">
                  <button onClick={() => handleNavClick('hindi-olympiad')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7B1E1E]"></span>
                    {language === 'hi' ? 'हिंदी भाषा ओलंपियाड' : 'National Hindi Olympiad'}
                  </button>
                  <button onClick={() => handleNavClick('sanskrit-olympiad')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C79A2D]"></span>
                    {language === 'hi' ? 'संस्कृत भाषा ओलंपियाड' : 'National Sanskrit Olympiad'}
                  </button>
                  <button onClick={() => handleNavClick('syllabus')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    {language === 'hi' ? 'पाठ्यक्रम (Syllabus Class 1-12)' : 'Class 1-12 Syllabus'}
                  </button>
                  <button onClick={() => handleNavClick('exam-dates')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {language === 'hi' ? 'परीक्षा तिथियाँ व समय सारणी' : 'Exam Dates & Schedule'}
                  </button>
                  <button onClick={() => handleNavClick('benchmark-assessment')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#C79A2D]" />
                    {language === 'hi' ? 'वैज्ञानिक बेंचमार्क मूल्यांकन' : 'Benchmark Assessment'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Student Zone / Resources */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('resources')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] transition-colors">
              {language === 'hi' ? 'छात्र कॉर्नर' : 'Student Zone'}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'resources' && (
              <div className="absolute top-full left-0 w-64 pt-2 z-50">
                <div className="bg-white dark:bg-[#1A1414] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 space-y-1 glass-panel">
                  <button onClick={() => handleNavClick('mock-test')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2 text-[#7B1E1E] dark:text-[#C79A2D] font-bold">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    {language === 'hi' ? 'ऑनलाइन मॉक टेस्ट (Interactive Test)' : 'Take Online Mock Test'}
                  </button>
                  <button onClick={() => handleNavClick('sample-papers')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    {language === 'hi' ? 'मॉडल प्रश्न पत्र (Sample Papers)' : 'Download Sample Papers'}
                  </button>
                  <button onClick={() => handleNavClick('performance-report')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#C79A2D]" />
                    {language === 'hi' ? 'परिणाम व रिपोर्ट कार्ड' : 'View Performance Report'}
                  </button>
                  <button onClick={() => handleNavClick('faqs')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-medium flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    {language === 'hi' ? 'सामान्य प्रश्न (FAQs)' : 'Frequently Asked Questions'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Awards & Media */}
          <button 
            onClick={() => handleNavClick('awards')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              currentRoute === 'awards' ? 'text-[#7B1E1E] dark:text-[#C79A2D]' : 'text-gray-700 dark:text-gray-300 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D]'
            }`}
          >
            {language === 'hi' ? 'पुरस्कार व छात्रवृत्ति' : 'Awards & Medals'}
          </button>

          <button 
            onClick={() => handleNavClick('blogs')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              currentRoute === 'blogs' ? 'text-[#7B1E1E] dark:text-[#C79A2D]' : 'text-gray-700 dark:text-gray-300 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D]'
            }`}
          >
            {language === 'hi' ? 'ब्लॉग व समाचार' : 'Media & Blogs'}
          </button>

          <button 
            onClick={() => handleNavClick('contact')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              currentRoute === 'contact' ? 'text-[#7B1E1E] dark:text-[#C79A2D]' : 'text-gray-700 dark:text-gray-300 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D]'
            }`}
          >
            {language === 'hi' ? 'संपर्क करें' : 'Contact'}
          </button>
        </nav>

        {/* Right Tools & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Button */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            title="वेबसाइट में खोजें"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Display */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border border-[#7B1E1E]/20 dark:border-gray-700 text-xs font-bold text-[#7B1E1E] dark:text-[#C79A2D] bg-[#7B1E1E]/5 hover:bg-[#7B1E1E]/10 transition-colors"
            title="मातृभाषा हिंदी"
          >
            <Globe className="w-3.5 h-3.5 text-[#C79A2D]" />
            <span>हिन्दी (Devanagari)</span>
          </button>

          {/* Dark / Light Mode */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            title="रंग रूप (थीम) बदलें"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-gray-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Register CTA Button */}
          <div className="relative">
            <button
              onClick={() => setIsRegisterOpen(!isRegisterOpen)}
              className="bg-gradient-to-r from-[#7B1E1E] to-[#A32A2A] hover:from-[#541313] hover:to-[#7B1E1E] text-[#F5F0E6] px-4 py-2 rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 glow-gold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C79A2D]" />
              <span>{language === 'hi' ? 'पंजीकरण करें' : 'Register Now'}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isRegisterOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-[#1A1414] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-2 z-50 glass-panel">
                <button 
                  onClick={() => handleNavClick('school-registration')}
                  className="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-semibold flex items-center gap-3 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center">
                    <School className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-bold">{language === 'hi' ? 'विद्यालय पंजीकरण' : 'School Registration'}</div>
                    <div className="text-[10px] text-gray-500">{language === 'hi' ? 'विद्यालय कोड के साथ सामूहिक पंजीकरण' : 'Bulk student enrollment'}</div>
                  </div>
                </button>

                <button 
                  onClick={() => handleNavClick('student-registration')}
                  className="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-semibold flex items-center gap-3 transition-colors mt-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-bold">{language === 'hi' ? 'व्यक्तिगत छात्र पंजीकरण' : 'Student Registration'}</div>
                    <div className="text-[10px] text-gray-500">{language === 'hi' ? 'कक्षा 1 से 12 तक के छात्र' : 'Individual online exam'}</div>
                  </div>
                </button>

                <button 
                  onClick={() => handleNavClick('teacher-registration')}
                  className="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-[#7B1E1E]/5 dark:hover:bg-white/5 font-semibold flex items-center gap-3 transition-colors mt-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-bold">{language === 'hi' ? 'शिक्षक / संयोजक' : 'Teacher Coordinator'}</div>
                    <div className="text-[10px] text-gray-500">{language === 'hi' ? 'भाषा शिक्षक पंजीकरण व सम्मान' : 'School exam coordinator'}</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
};
