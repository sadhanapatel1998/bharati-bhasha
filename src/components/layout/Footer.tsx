import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  ChevronRight,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, navigateTo, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNavClick = (route: PageRoute) => {
    navigateTo(route);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast(language === 'hi' ? 'कृपया वैध ईमेल पता दर्ज करें।' : 'Please enter a valid email address.', 'warning');
      return;
    }
    showToast(language === 'hi' ? 'धन्यवाद! आप भारती भाषा ओलंपियाड न्यूज़लेटर हेतु सफलतापूर्वक पंजीकृत हो गए हैं।' : 'Thank you! You have successfully subscribed to the Bharati Bhasha Olympiad newsletter.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#1A1212] text-[#F5F0E6] pt-16 pb-8 border-t-4 border-[#C79A2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter CTA Box */}
        <div className="bg-gradient-to-r from-[#7B1E1E] to-[#541313] rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl border border-[#C79A2D]/30 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#C79A2D]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#C79A2D]/20 border border-[#C79A2D]/40 text-[#C79A2D] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'hi' ? 'नवीनतम सूचनाएं प्राप्त करें' : 'Stay Updated'}
            </div>
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-2">
              {language === 'hi' ? 'राष्ट्रीय भाषा ओलंपियाड समाचार पत्र' : 'Subscribe to National Olympiad Bulletin'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              {language === 'hi' ? 'परीक्षा तिथियाँ, निःशुल्क अभ्यास प्रश्नोत्तरी, मॉडल पेपर एवं छात्रवृत्ति अपडेट ईमेल पर प्राप्त करें।' : 'Get exam dates, free mock tests, sample papers, and scholarship updates directly in your inbox.'}
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-2.5">
            <input 
              type="email" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={language === 'hi' ? 'आपका ईमेल पता...' : 'Enter your email address...'} 
              className="w-full sm:w-80 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 text-xs focus:outline-none focus:border-[#C79A2D] transition-colors"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto bg-[#C79A2D] hover:bg-[#E2B855] text-[#7B1E1E] px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>{language === 'hi' ? 'सदस्यता लें' : 'Subscribe'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: About & Trust Seals */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B1E1E] to-[#C79A2D] flex items-center justify-center text-white font-bold font-playfair text-lg shadow-md">
                भा
              </div>
              <div>
                <h2 className="font-playfair font-bold text-xl text-white">
                  भारती भाषा <span className="text-[#C79A2D]">ओलंपियाड</span>
                </h2>
                <p className="text-[10px] text-[#C79A2D] font-medium tracking-wide">
                  भारत का प्रथम व अग्रणी राष्ट्रीय हिंदी एवं संस्कृत ओलंपियाड
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-md">
              भारती भाषा ओलंपियाड भारत का प्रथम राष्ट्रीय स्तर का हिंदी व संस्कृत ओलंपियाड है। यह राष्ट्रीय शिक्षा नीति (NEP 2020) के सिद्धांतों पर आधारित एक वैज्ञानिक मूल्यांकन मंच है, जो छात्रों में मातृभाषा व संस्कृत के प्रति अनुराग जगाता है।
            </p>

            {/* Accreditation Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-semibold text-[#C79A2D]">
                <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
                एनईपी 2020 अनुपालन
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-semibold text-[#C79A2D]">
                <Award className="w-4 h-4 text-[#C79A2D]" />
                आईएसओ 9001:2025 प्रमाणित
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-semibold text-[#C79A2D]">
                <BookOpen className="w-4 h-4 text-[#7B1E1E]" />
                एनसीईआरटी पाठ्यचर्या
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-playfair text-base font-bold text-[#C79A2D] pb-1 border-b border-[#C79A2D]/20">
              त्वरित लिंक
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'ओलंपियाड का परिचय' : 'About Olympiad'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('vision-mission')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'लक्ष्य एवं दूरदृष्टि' : 'Vision & Mission'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('why-us')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'हमारा चयन क्यों?' : 'Why Choose Us'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('nep-2020')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'राष्ट्रीय शिक्षा नीति 2020' : 'NEP 2020 Framework'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('benchmark-assessment')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'बेंचमार्क मूल्यांकन' : 'Benchmark Evaluation'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('testimonials')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'अभिभावक एवं विद्यालय विचार' : 'Testimonials & Reviews'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Examinations & Resources */}
          <div className="space-y-3">
            <h4 className="font-playfair text-base font-bold text-[#C79A2D] pb-1 border-b border-[#C79A2D]/20">
              {language === 'hi' ? 'परीक्षाएं व संसाधन' : 'Olympiads & Student'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => handleNavClick('hindi-olympiad')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'राष्ट्रीय हिंदी ओलंपियाड' : 'National Hindi Olympiad'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('sanskrit-olympiad')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'राष्ट्रीय संस्कृत ओलंपियाड' : 'National Sanskrit Olympiad'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('syllabus')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'पाठ्यक्रम (कक्षा 1 से 12)' : 'Class 1 to 12 Syllabus'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('mock-test')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5 font-bold text-[#C79A2D]">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'ऑनलाइन मॉक टेस्ट (फ्री)' : 'Take Free Mock Test'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('sample-papers')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'मॉडल प्रश्न पत्र (PDF)' : 'Download Sample Papers'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('performance-report')} className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C79A2D]" />
                  {language === 'hi' ? 'परिणाम व स्कोर कार्ड' : 'View Performance Report'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: National Headquarters & Contact */}
          <div className="space-y-3">
            <h4 className="font-playfair text-base font-bold text-[#C79A2D] pb-1 border-b border-[#C79A2D]/20">
              राष्ट्रीय मुख्यालय व संपर्क
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C79A2D] shrink-0 mt-0.5" />
                <span>
                  <strong>राष्ट्रीय कार्यालय:</strong> बी-42, संस्थागत क्षेत्र, कुतुब इंस्टीट्यूशनल एरिया, नई दिल्ली - 110016
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C79A2D] shrink-0 mt-0.5" />
                <span>
                  <strong>सांस्कृतिक पीठ:</strong> अस्सी घाट परिसर, काशी (वाराणसी), उत्तर प्रदेश - 221005
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C79A2D] shrink-0" />
                <span>टोल-फ्री: 1800-123-9876 / +91 11 2685 4321</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C79A2D] shrink-0" />
                <span>info@bharatibhasha.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center md:text-left">
            © 2026 <strong>भारती भाषा ओलंपियाड न्यास</strong>. सर्वाधिकार सुरक्षित।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button onClick={() => handleNavClick('privacy-terms')} className="hover:text-[#C79A2D] transition-colors">
              {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </button>
            <span>•</span>
            <button onClick={() => handleNavClick('privacy-terms')} className="hover:text-[#C79A2D] transition-colors">
              {language === 'hi' ? 'नियम व शर्तें' : 'Terms & Conditions'}
            </button>
            <span>•</span>
            <button onClick={() => handleNavClick('sitemap')} className="hover:text-[#C79A2D] transition-colors">
              {language === 'hi' ? 'साइटमैप' : 'Sitemap'}
            </button>
            <span>•</span>
            <button onClick={() => handleNavClick('careers')} className="hover:text-[#C79A2D] transition-colors">
              {language === 'hi' ? 'करियर' : 'Careers'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
