import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
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
  Globe
} from 'lucide-react';

export const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { language, toggleLanguage, navigateTo } = useApp();

  if (!isOpen) return null;

  const handleLinkClick = (route: PageRoute) => {
    navigateTo(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white dark:bg-[#121010] overflow-y-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7B1E1E] to-[#C79A2D] flex items-center justify-center text-white font-bold font-playfair">
            भा
          </div>
          <span className="font-playfair font-bold text-base text-[#7B1E1E] dark:text-[#C79A2D]">
            भारती भाषा ओलंपियाड
          </span>
        </div>

        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Quick Action Cards */}
      <div className="p-4 grid grid-cols-2 gap-2 bg-gray-50 dark:bg-[#1A1414] border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => handleLinkClick('mock-test')}
          className="p-3 bg-gradient-to-r from-[#7B1E1E] to-[#A32A2A] text-white rounded-xl text-left shadow-sm flex flex-col gap-1"
        >
          <Sparkles className="w-4 h-4 text-[#C79A2D]" />
          <span className="font-bold text-xs">{language === 'hi' ? 'मॉक टेस्ट दें' : 'Take Mock Test'}</span>
          <span className="text-[10px] opacity-80">{language === 'hi' ? 'नि:शुल्क अभ्यास प्रश्नोत्तर' : 'Free Interactive Exam'}</span>
        </button>

        <button 
          onClick={() => handleLinkClick('performance-report')}
          className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-left flex flex-col gap-1"
        >
          <Trophy className="w-4 h-4 text-[#C79A2D]" />
          <span className="font-bold text-xs text-gray-900 dark:text-white">{language === 'hi' ? 'परिणाम देखें' : 'View Report'}</span>
          <span className="text-[10px] text-gray-500">{language === 'hi' ? 'अनुक्रमांक द्वारा खोजें' : 'Check Roll Number'}</span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="p-4 space-y-4 flex-1">
        
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-2">
            {language === 'hi' ? 'मुख्य पृष्ठ व परिचय' : 'Main & Introduction'}
          </h3>
          <div className="space-y-1">
            <button onClick={() => handleLinkClick('home')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <Home className="w-4 h-4 text-[#7B1E1E] dark:text-[#C79A2D]" />
              {language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}
            </button>
            <button onClick={() => handleLinkClick('about')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#7B1E1E] dark:text-[#C79A2D]" />
              {language === 'hi' ? 'ओलंपियाड का परिचय' : 'About Olympiad'}
            </button>
            <button onClick={() => handleLinkClick('vision-mission')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#C79A2D]" />
              {language === 'hi' ? 'लक्ष्य एवं दूरदृष्टि' : 'Vision & Mission'}
            </button>
            <button onClick={() => handleLinkClick('why-us')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-[#7B1E1E] dark:text-[#C79A2D]" />
              {language === 'hi' ? 'हमारा चयन क्यों?' : 'Why Choose Us'}
            </button>
            <button onClick={() => handleLinkClick('nep-2020')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <Award className="w-4 h-4 text-[#C79A2D]" />
              {language === 'hi' ? 'एनईपी 2020 नीति' : 'NEP 2020 Policy'}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-2">
            {language === 'hi' ? 'परीक्षा एवं पाठ्यक्रम' : 'Olympiads & Syllabus'}
          </h3>
          <div className="space-y-1">
            <button onClick={() => handleLinkClick('hindi-olympiad')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7B1E1E]"></span>
              {language === 'hi' ? 'हिंदी ओलंपियाड' : 'Hindi Olympiad'}
            </button>
            <button onClick={() => handleLinkClick('sanskrit-olympiad')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C79A2D]"></span>
              {language === 'hi' ? 'संस्कृत ओलंपियाड' : 'Sanskrit Olympiad'}
            </button>
            <button onClick={() => handleLinkClick('syllabus')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-gray-500" />
              {language === 'hi' ? 'पाठ्यक्रम (Syllabus)' : 'Class 1-12 Syllabus'}
            </button>
            <button onClick={() => handleLinkClick('exam-dates')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-gray-500" />
              {language === 'hi' ? 'परीक्षा तिथियाँ' : 'Exam Dates'}
            </button>
            <button onClick={() => handleLinkClick('sample-papers')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-gray-500" />
              {language === 'hi' ? 'सैंपल पेपर्स' : 'Sample Papers'}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-2">
            {language === 'hi' ? 'पंजीकरण केंद्र' : 'Registration Center'}
          </h3>
          <div className="space-y-1">
            <button onClick={() => handleLinkClick('school-registration')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5 text-[#7B1E1E] dark:text-[#C79A2D] font-bold">
              <School className="w-4 h-4" />
              {language === 'hi' ? 'विद्यालय पंजीकरण (School Registration)' : 'School Registration'}
            </button>
            <button onClick={() => handleLinkClick('student-registration')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5 text-[#C79A2D] font-bold">
              <User className="w-4 h-4" />
              {language === 'hi' ? 'व्यक्तिगत छात्र पंजीकरण (Student Registration)' : 'Student Registration'}
            </button>
            <button onClick={() => handleLinkClick('teacher-registration')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2.5">
              <Users className="w-4 h-4 text-gray-500" />
              {language === 'hi' ? 'शिक्षक संयोजक (Teacher Coordinator)' : 'Teacher Coordinator'}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-2">
            {language === 'hi' ? 'अन्य पृष्ठ' : 'Other Pages'}
          </h3>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <button onClick={() => handleLinkClick('gallery')} className="text-left px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              {language === 'hi' ? 'गैलरी' : 'Gallery'}
            </button>
            <button onClick={() => handleLinkClick('events-news')} className="text-left px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              {language === 'hi' ? 'आयोजन व समाचार' : 'Events & News'}
            </button>
            <button onClick={() => handleLinkClick('blogs')} className="text-left px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              {language === 'hi' ? 'ब्लॉग' : 'Blogs'}
            </button>
            <button onClick={() => handleLinkClick('testimonials')} className="text-left px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              {language === 'hi' ? 'अनुभव' : 'Testimonials'}
            </button>
            <button onClick={() => handleLinkClick('partners-schools')} className="text-left px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              {language === 'hi' ? 'सहयोगी विद्यालय' : 'Partner Schools'}
            </button>
            <button onClick={() => handleLinkClick('contact')} className="text-left px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </button>
            <button onClick={() => handleLinkClick('careers')} className="text-left px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              {language === 'hi' ? 'करियर' : 'Careers'}
            </button>
            <button onClick={() => handleLinkClick('sitemap')} className="text-left px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              {language === 'hi' ? 'साइटमैप' : 'Sitemap'}
            </button>
          </div>
        </div>

      </div>

      {/* Footer Contact Info */}
      <div className="p-4 bg-gray-50 dark:bg-[#1A1414] border-t border-gray-100 dark:border-gray-800 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-600 dark:text-gray-400">मातृभाषा:</span>
          <div className="font-bold text-[#7B1E1E] dark:text-[#C79A2D] flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            हिन्दी (देवनागरी)
          </div>
        </div>
        <div className="text-gray-500 pt-2 text-[11px] space-y-1">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-[#C79A2D]" />
            टोल-फ्री: 1800-123-9876
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-[#C79A2D]" />
            info@bharatibhasha.org
          </div>
        </div>
      </div>

    </div>
  );
};
