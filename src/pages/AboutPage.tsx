import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: 'परिचय' }]} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          संस्थागत परिचय
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          भारती भाषा ओलंपियाड की यात्रा
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          भारत की समृद्ध भाषाई विरासत, देववाणी संस्कृत एवं राष्ट्रभाषा हिंदी के संरक्षण, संवर्धन एवं वैज्ञानिक मूल्यांकन हेतु समर्पित देश की अग्रणी राष्ट्रीय संस्था।
        </p>
      </div>

      {/* Grid Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-[#1A1414] rounded-3xl p-8 sm:p-12 border border-gray-100 dark:border-gray-800 shadow-lg">
        <div className="space-y-4">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#7B1E1E] dark:text-[#C79A2D]">
            स्थापना एवं राष्ट्रीय उद्देश्य
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            भारती भाषा ओलंपियाड की स्थापना शीर्ष शिक्षाविदों, भाषा वैज्ञानिकों एवं NCERT पाठ्यक्रम विशेषज्ञों द्वारा की गई थी। हमारा मुख्य उद्देश्य स्कूली विद्यार्थियों में हिंदी तथा संस्कृत भाषा के प्रति सम्मान जगाना और उनके व्याकरण, शब्द भण्डार व अभिव्यक्ति कौशल का राष्ट्रीय स्तर पर वैज्ञानिक मूल्यांकन करना है।
          </p>
          <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-bold">
            <div className="p-4 rounded-2xl bg-[#7B1E1E]/5 border border-[#7B1E1E]/10">
              <div className="text-xl text-[#7B1E1E] dark:text-[#C79A2D] font-extrabold">2850+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">सहयोगी विद्यालय</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#C79A2D]/10 border border-[#C79A2D]/20">
              <div className="text-xl text-[#C79A2D] font-extrabold">4.5L+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">प्रतिभागी छात्र</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800" 
            alt="Language Scholars" 
            className="rounded-3xl shadow-xl object-cover border-2 border-[#C79A2D]/40 w-full h-80"
          />
        </div>
      </div>

      {/* Leadership Message */}
      <div className="bg-gradient-to-br from-[#7B1E1E] to-[#541313] text-[#F5F0E6] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C79A2D]">
            संयोजक संदेश
          </span>
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white">
            "भाषा केवल अभिव्यक्ति का माध्यम नहीं, बल्कि हमारी संस्कृति की प्राणवायु है।"
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
            "जब हमारा विद्यार्थी हिंदी व संस्कृत के छंदों, मुहावरों और व्याकरण नियमों में प्रवीण होता है, तो वह केवल परीक्षा में उत्तम अंक नहीं लाता, बल्कि भारत की अमूल्य बौद्धिक संपदा का संवाहक बनता है।"
          </p>
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <div>
              <div className="font-bold text-sm text-white">प्रो. वी. के. चतुर्वेदी</div>
              <div className="text-xs text-[#C79A2D]">राष्ट्रीय संयोजक, भारती भाषा ओलंपियाड न्यास</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
