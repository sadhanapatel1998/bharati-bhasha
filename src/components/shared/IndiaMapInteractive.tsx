import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STATE_PARTICIPATION_DATA } from '../../data/olympiadData';
import { MapPin, School, Users, Trophy, Sparkles } from 'lucide-react';

export const IndiaMapInteractive: React.FC = () => {
  const { language } = useApp();
  const [selectedState, setSelectedState] = useState(STATE_PARTICIPATION_DATA[0]);

  return (
    <div className="bg-white dark:bg-[#1A1414] rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 dark:border-gray-800">
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 bg-[#C79A2D]/10 text-[#C79A2D] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          {language === 'hi' ? 'राष्ट्रव्यापी सहभागिता' : 'National Footprint'}
        </span>
        <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'भारत के 28 राज्यों में व्यापक उपस्थिति' : 'Pan-India Student & School Footprint'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
          {language === 'hi' ? '4.5 लाख से अधिक छात्रों एवं 2,850+ विद्यालयों का अटूट विश्वास' : 'Over 4,50,000+ students and 2,850+ top CBSE, ICSE & State schools participating'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left State Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STATE_PARTICIPATION_DATA.map((st, idx) => {
            const isSelected = selectedState.state === st.state;
            return (
              <button
                key={idx}
                onClick={() => setSelectedState(st)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  isSelected 
                    ? 'bg-[#7B1E1E] text-white border-[#C79A2D] shadow-lg scale-[1.02]' 
                    : 'bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-100 dark:border-gray-700 hover:border-[#C79A2D]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#C79A2D]' : 'text-[#7B1E1E]'}`} />
                    <h4 className="font-bold text-xs sm:text-sm">{st.state}</h4>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-[#C79A2D]/10 text-[#C79A2D]'}`}>
                    {st.rank1Count} Top Rankers
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] opacity-90 mt-2">
                  <div>
                    <span className="block text-[10px] opacity-75">{language === 'hi' ? 'छात्र सहभागिता' : 'Students'}</span>
                    <span className="font-bold">{st.studentsCount.toLocaleString()}+</span>
                  </div>
                  <div>
                    <span className="block text-[10px] opacity-75">{language === 'hi' ? 'विद्यालय' : 'Schools'}</span>
                    <span className="font-bold">{st.schoolsCount}+</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Selected State Detail Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#7B1E1E] to-[#541313] text-[#F5F0E6] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C79A2D]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C79A2D]/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C79A2D]">
                  {language === 'hi' ? 'चयनित राज्य डेटा' : 'State Insight'}
                </span>
                <h4 className="font-playfair text-2xl font-bold text-white mt-1">
                  {selectedState.state}
                </h4>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C79A2D] font-bold text-xl">
                🏆
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/10">
                <Users className="w-6 h-6 text-[#C79A2D]" />
                <div>
                  <div className="text-xl font-bold text-white">{selectedState.studentsCount.toLocaleString()}+</div>
                  <div className="text-xs text-gray-300">{language === 'hi' ? 'कुल पंजीकृत छात्र' : 'Registered Olympiad Aspirants'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/10">
                <School className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-xl font-bold text-white">{selectedState.schoolsCount}+</div>
                  <div className="text-xs text-gray-300">{language === 'hi' ? 'सहयोगी सीबीएससी व आईसीएसई विद्यालय' : 'Affiliated Partner Schools'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/10">
                <Trophy className="w-6 h-6 text-amber-300" />
                <div>
                  <div className="text-xl font-bold text-white">{selectedState.rank1Count} {language === 'hi' ? 'राष्ट्रीय स्वर्ण पदक विजेता' : 'National Gold Medalists'}</div>
                  <div className="text-xs text-gray-300">{language === 'hi' ? 'विज्ञान भवन दिल्ली में सम्मानित' : 'Felicitation at Vigyan Bhawan'}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-gray-300 italic">
              {language === 'hi' ? 'क्या आपका विद्यालय अभी तक पंजीकृत नहीं है? आज ही विद्यालय कोड प्राप्त करें।' : 'Has your school joined Bharat’s largest language movement yet?'}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
