import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KEY_STATS, AWARDS_LIST, TESTIMONIALS, FAQS, BLOG_POSTS, PARTNER_SCHOOLS } from '../data/olympiadData';
import { IndiaMapInteractive } from '../components/shared/IndiaMapInteractive';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Trophy, 
  Medal, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Award, 
  School, 
  Users, 
  FileText, 
  HelpCircle, 
  ChevronDown,
  Star,
  ShieldCheck,
  Zap,
  Video,
  X
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>('faq1');

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 overflow-hidden bg-gold-radial">
        
        {/* Background Decorative Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#7B1E1E]/10 to-[#C79A2D]/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B1E1E]/10 dark:bg-[#C79A2D]/15 border border-[#7B1E1E]/20 dark:border-[#C79A2D]/30 text-[#7B1E1E] dark:text-[#C79A2D] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C79A2D]" />
                <span>{language === 'hi' ? 'भारत का नंबर 1 राष्ट्रीय भाषा ओलंपियाड' : "India's #1 National Language Olympiad"}</span>
              </div>

              {/* Title */}
              <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.15]">
                {language === 'hi' ? (
                  <>
                    राष्ट्रीय <span className="text-maroon-gradient">हिंदी</span> एवं <span className="text-gold-gradient">संस्कृत</span> ओलंपियाड 2026
                  </>
                ) : (
                  <>
                    Empowering Young Minds with <span className="text-maroon-gradient">Hindi</span> & <span className="text-gold-gradient">Sanskrit</span> Excellence
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                {language === 'hi' 
                  ? 'राष्ट्रीय शिक्षा नीति (NEP 2020) के सिद्धांतों पर आधारित एक वैज्ञानिक मूल्यांकन मंच। कक्षा 1 से 12 तक के विद्यार्थियों हेतु ₹1 करोड़ छात्रवृत्ति, स्वर्ण पदक एवं राष्ट्रीय सम्मान।'
                  : 'A scientific benchmark assessment platform aligned with NEP 2020. Over ₹1 Crore in scholarships, gold medals, and national felicitation at Vigyan Bhawan, New Delhi.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                
                <button 
                  onClick={() => navigateTo('registration')}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#7B1E1E] to-[#A32A2A] hover:from-[#541313] hover:to-[#7B1E1E] text-[#F5F0E6] px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group glow-gold"
                >
                  <Sparkles className="w-4 h-4 text-[#C79A2D]" />
                  <span>{language === 'hi' ? 'अभी निशुल्क पंजीयन करें' : 'Register for Olympiad'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-full sm:w-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#C79A2D] text-gray-900 dark:text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-[#7B1E1E] text-white flex items-center justify-center shadow-md">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <span>{language === 'hi' ? 'ओलंपियाड वीडियो देखें' : 'Watch Brochure Video'}</span>
                </button>

              </div>

              {/* Exam Countdown Card */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5 font-semibold text-[#7B1E1E] dark:text-[#C79A2D]">
                  <Clock className="w-4 h-4" />
                  <span>{language === 'hi' ? 'प्रथम चरण परीक्षा तिथि:' : 'Phase 1 Exam Date:'}</span>
                </div>
                <span className="bg-[#C79A2D]/10 text-gray-900 dark:text-white px-3 py-1 rounded-lg font-bold border border-[#C79A2D]/30">
                  October 18, 2026
                </span>
              </div>

            </div>

            {/* Right Hero Interactive Emblem Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-gradient-to-b from-white to-[#FAFAF8] dark:from-[#1A1414] dark:to-[#121010] p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#C79A2D]/30 glass-card">
                
                {/* Golden Badge Emblem */}
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#7B1E1E] via-[#A32A2A] to-[#C79A2D] p-1 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="w-full h-full bg-[#FAFAF8] dark:bg-[#121010] rounded-[20px] flex items-center justify-center text-[#7B1E1E] dark:text-[#C79A2D]">
                    <Trophy className="w-10 h-10" />
                  </div>
                </div>

                <div className="text-center mt-4 space-y-2">
                  <h3 className="font-playfair text-xl font-bold text-gray-900 dark:text-white">
                    {language === 'hi' ? 'राष्ट्रीय गौरव पुरस्कार एवं छात्रवृत्ति' : 'National Honor & Scholarship 2026'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {language === 'hi' ? 'विज्ञान भवन नई दिल्ली में भारत के शीर्ष शिक्षाविदों द्वारा सम्मान' : 'Felicitation by top dignitaries at Vigyan Bhawan, New Delhi'}
                  </p>
                </div>

                {/* Quick Highlights Grid */}
                <div className="mt-6 space-y-3">
                  <div className="p-3 bg-[#7B1E1E]/5 dark:bg-white/5 rounded-2xl flex items-center gap-3 border border-[#7B1E1E]/10">
                    <Medal className="w-5 h-5 text-[#C79A2D] shrink-0" />
                    <div className="text-xs">
                      <strong className="block text-gray-900 dark:text-white">Rank 1: ₹1,00,000 Cash + Apple iPad</strong>
                      <span className="text-gray-500">{language === 'hi' ? 'स्वर्ण पदक व राष्ट्रीय प्रमाण पत्र' : 'Gold Medal & National Citation'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#C79A2D]/10 rounded-2xl flex items-center gap-3 border border-[#C79A2D]/20">
                    <Award className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D] shrink-0" />
                    <div className="text-xs">
                      <strong className="block text-gray-900 dark:text-white">Scientific Benchmark Report</strong>
                      <span className="text-gray-500">{language === 'hi' ? '12 भाषाई आयामों का सटीक विश्लेषण' : '12-dimensional skill scorecard'}</span>
                    </div>
                  </div>
                </div>

                {/* Instant Quick Exam Link */}
                <button 
                  onClick={() => navigateTo('mock-test')}
                  className="mt-6 w-full py-3 rounded-xl bg-[#C79A2D] hover:bg-[#E2B855] text-[#7B1E1E] font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>{language === 'hi' ? 'निशुल्क ऑनलाइन मॉक टेस्ट देकर देखें' : 'Try Free Online Demo Mock Test'}</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS & SCROLLING ACHIEVEMENT BAR */}
      <section className="bg-[#7B1E1E] text-[#F5F0E6] py-12 border-y-4 border-[#C79A2D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <div className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#C79A2D]">
                {KEY_STATS.studentsParticipated.toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm font-semibold opacity-90">
                {language === 'hi' ? 'पंजीकृत छात्र' : 'Students Participated'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#C79A2D]">
                {KEY_STATS.schoolsRegistered.toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm font-semibold opacity-90">
                {language === 'hi' ? 'सहयोगी विद्यालय' : 'Affiliated Schools'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#C79A2D]">
                {KEY_STATS.statesCovered}
              </div>
              <div className="text-xs sm:text-sm font-semibold opacity-90">
                {language === 'hi' ? 'राज्य व केंद्रशासित प्रदेश' : 'States Covered'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#C79A2D]">
                ₹{KEY_STATS.scholarshipsDistributedInLakhs}L+
              </div>
              <div className="text-xs sm:text-sm font-semibold opacity-90">
                {language === 'hi' ? 'छात्रवृत्ति व पुरस्कार वितरित' : 'Scholarships Distributed'}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. OLYMPIAD PROCESS CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C79A2D]">
            {language === 'hi' ? 'सरल एवं पारदर्शी प्रक्रिया' : 'Simple 4-Step Process'}
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1">
            {language === 'hi' ? 'ओलंपियाड में भाग कैसे लें?' : 'How to Participate in Olympiad'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
            {language === 'hi' ? 'विद्यालय या व्यक्तिगत स्तर पर 4 आसान चरणों में पंजीकरण से पुरस्कार तक का सफर' : 'From registration to national felicitation at Vigyan Bhawan'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] font-extrabold text-xl flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
              {language === 'hi' ? '1. पंजीकरण (Registration)' : '1. Enrollment'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {language === 'hi' ? 'विद्यालय अथवा छात्र हमारी वेबसाइट पर ऑनलाइन फॉर्म भरें।' : 'Register online individually or through your school coordinator.'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#C79A2D]/10 text-[#C79A2D] font-extrabold text-xl flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
              {language === 'hi' ? '2. अध्ययन व अभ्यास (Preparation)' : '2. Study & Practice'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {language === 'hi' ? 'निःशुल्क सैंपल पेपर व ऑनलाइन मॉक टेस्ट से तैयारी करें।' : 'Access free class-wise sample papers and online mock exam simulators.'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#2E8B57]/10 text-[#2E8B57] font-extrabold text-xl flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
              {language === 'hi' ? '3. परीक्षा (Examination)' : '3. Take Exam'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {language === 'hi' ? 'विद्यालय केंद्र (OMR) अथवा ऑनलाइन प्रोक्टर्ड पोर्टल पर परीक्षा दें।' : 'Appear via school OMR center or online secure portal.'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] font-extrabold text-xl flex items-center justify-center mb-4">
              04
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
              {language === 'hi' ? '4. परिणाम व पुरस्कार (Awards)' : '4. Report & Awards'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {language === 'hi' ? '12-आयामी रिपोर्ट कार्ड, छात्रवृत्ति एवं राष्ट्रीय पदक प्राप्त करें।' : 'Get detailed benchmark scorecard, trophies, and cash scholarships.'}
            </p>
          </div>

        </div>
      </section>

      {/* 4. HINDI & SANSKRIT OLYMPIAD SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Hindi Olympiad Card */}
          <div className="bg-gradient-to-br from-[#7B1E1E] to-[#541313] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <span className="bg-[#C79A2D] text-[#7B1E1E] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                Classes 1st to 12th
              </span>
              <h3 className="font-playfair text-3xl font-bold">
                {language === 'hi' ? 'राष्ट्रीय हिंदी भाषा ओलंपियाड' : 'National Hindi Bhasha Olympiad'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {language === 'hi' ? 'व्याकरण, शुद्ध वर्तनी, साहित्य परिचय, मुहावरे एवं रचनात्मक अभिव्यक्ति की राष्ट्रीय स्तर पर वैज्ञानिक परख।' : 'Fostering Hindi grammar precision, vocabulary depth, literature appreciation, and creative expression in school children.'}
              </p>
              <ul className="space-y-2 text-xs text-gray-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C79A2D]" />
                  <span>{language === 'hi' ? 'एनईपी 2020 पाठ्यचर्या आधारित प्रश्न' : 'NCERT & NEP 2020 Aligned Pattern'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C79A2D]" />
                  <span>{language === 'hi' ? 'वस्तुनिष्ठ बहुविकल्पीय प्रश्नोत्तरी' : 'Objective Multiple Choice Structure'}</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => navigateTo('hindi-olympiad')}
                className="bg-[#C79A2D] hover:bg-[#E2B855] text-[#7B1E1E] px-6 py-3 rounded-xl font-bold text-xs transition-colors flex items-center gap-2"
              >
                <span>{language === 'hi' ? 'हिंदी ओलंपियाड विवरण पढ़ें' : 'View Hindi Olympiad Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sanskrit Olympiad Card */}
          <div className="bg-gradient-to-br from-[#1A1414] to-[#2B1F1F] text-white p-8 rounded-3xl shadow-xl border border-[#C79A2D]/30 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <span className="bg-[#2E8B57] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                Classes 3rd to 12th
              </span>
              <h3 className="font-playfair text-3xl font-bold text-[#C79A2D]">
                {language === 'hi' ? 'राष्ट्रीय संस्कृत भाषा ओलंपियाड' : 'National Sanskrit Bhasha Olympiad'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {language === 'hi' ? 'देववाणी संस्कृत के व्याकरण (शब्दरूप, धातुरूप), श्लोक बोध एवं वैदिक-लौकिक साहित्य की वैज्ञानिक परीक्षा।' : 'Reviving classical Sanskrit grammar, shloka wisdom, subhashitas, and Paninian linguistic logic for young scholars.'}
              </p>
              <ul className="space-y-2 text-xs text-gray-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C79A2D]" />
                  <span>{language === 'hi' ? 'संस्कृत व्याकरण व सुभाषित ज्ञान' : 'Grammar (Vyakaran) & Subhashita Wisdom'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C79A2D]" />
                  <span>{language === 'hi' ? 'भारतीय ज्ञान परंपरा का पुनरोद्धार' : 'Bharatiya Jnana Parampara Core'}</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => navigateTo('sanskrit-olympiad')}
                className="bg-[#7B1E1E] hover:bg-[#A32A2A] text-white px-6 py-3 rounded-xl font-bold text-xs transition-colors flex items-center gap-2"
              >
                <span>{language === 'hi' ? 'संस्कृत ओलंपियाड विवरण पढ़ें' : 'View Sanskrit Olympiad Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. BENCHMARK ASSESSMENT VS TRADITIONAL RANKING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#1A1414] rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C79A2D]">
              {language === 'hi' ? 'वैज्ञानिक मूल्यांकन' : 'Scientific Evaluation'}
            </span>
            <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {language === 'hi' ? 'बेंचमार्क रिपोर्ट क्यों पारंपरिक अंक तालिका से श्रेष्ठ है?' : 'Why Benchmark Report Beats Traditional Marks'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 space-y-3">
              <h3 className="font-bold text-base text-red-700 dark:text-red-400 flex items-center gap-2">
                ❌ {language === 'hi' ? 'पारंपरिक अंक प्रणाली (Old Marks System)' : 'Traditional Exams'}
              </h3>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <li>• केवल एक संख्या (जैसे 80/100) देती है।</li>
                <li>• छात्र की वास्तविक भाषाई कमजोरी का पता नहीं चलता।</li>
                <li>• सुधार का कोई विशिष्ट मार्गदर्शन नहीं मिलता।</li>
                <li>• केवल रटने की प्रवृत्ति को बढ़ावा देती है।</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-3">
              <h3 className="font-bold text-base text-[#2E8B57] flex items-center gap-2">
                ✅ {language === 'hi' ? 'BBO वैज्ञानिक बेंचमार्क रिपोर्ट (Our Report)' : 'BBO Benchmark Analytics'}
              </h3>
              <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300 font-medium">
                <li>• 12 अलग-अलग भाषाई आयामों (व्याकरण, वर्तनी, शब्दज्ञान, साहित्य) का सटीक विश्लेषण।</li>
                <li>• राष्ट्रीय एवं राज्य स्तरीय पर्सेंटाइल रैंक।</li>
                <li>• छात्र की शक्ति (Strengths) व सुधार क्षेत्रों की स्पष्ट रिपोर्ट।</li>
                <li>• शिक्षकों एवं अभिभावकों हेतु विशिष्ट सुझाव परामर्श।</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => navigateTo('benchmark-assessment')}
              className="bg-[#7B1E1E] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#541313] transition-colors"
            >
              {language === 'hi' ? 'नमूना बेंचमार्क रिपोर्ट डाउनलोड करें' : 'Download Sample Benchmark Report PDF'}
            </button>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE INDIA MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <IndiaMapInteractive />
      </section>

      {/* 7. AWARDS & SCHOLARSHIPS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C79A2D]">
            {language === 'hi' ? 'प्रतिभा सम्मान' : 'Honors & Prizes'}
          </span>
          <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {language === 'hi' ? 'राष्ट्रीय पुरस्कार एवं छात्रवृत्ति योजना 2026' : 'National Awards & Scholarships 2026'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AWARDS_LIST.map((aw) => (
            <div key={aw.id} className="bg-white dark:bg-[#1A1414] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-2xl transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center font-bold text-xl mb-3">
                  🏆
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1E1E] dark:text-[#C79A2D]">
                  {aw.rank}
                </span>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mt-1">
                  {aw.title[language]}
                </h3>
                <div className="mt-2 text-sm font-extrabold text-[#2E8B57]">
                  {aw.cashPrize}
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  {aw.perks[language].map((perk, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#C79A2D]">•</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="bg-gray-50 dark:bg-[#1A1414] py-16 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C79A2D]">
              {language === 'hi' ? 'प्रधानाचार्य व विजेताओं के विचार' : 'Testimonials & Reviews'}
            </span>
            <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {language === 'hi' ? 'शिक्षाविदों एवं छात्रों का अनुभव' : 'What School Leaders Say'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((ts) => (
              <div key={ts.id} className="bg-white dark:bg-[#121010] p-6 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(ts.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    "{ts.quote[language]}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <img src={ts.avatar} alt={ts.name} className="w-10 h-10 rounded-full object-cover border border-[#C79A2D]" />
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{ts.name}</h4>
                    <p className="text-[10px] text-gray-500">{ts.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C79A2D]">
            {language === 'hi' ? 'जिज्ञासा व समाधान' : 'Got Questions?'}
          </span>
          <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {language === 'hi' ? 'सामान्य प्रश्नोत्तर (FAQs)' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div key={faq.id} className="bg-white dark:bg-[#1A1414] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 font-bold text-xs sm:text-sm text-gray-900 dark:text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.question[language]}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C79A2D] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-50 dark:border-gray-800 leading-relaxed">
                    {faq.answer[language]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative bg-black w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#C79A2D]">
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Bharati Bhasha Olympiad Introductory Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
