import React from 'react';
import { BookOpen, Sparkles, Scroll, HeartHandshake, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import SectionHeader from "@/components/shared/SectionHeader";
import Image from 'next/image';
import { Breadcrumb } from '@/components/shared/Breadcrumb';


export const AboutPage: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/80 relative mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<Breadcrumb items={[{ label: 'परिचय' }]} />
        {/* Section Heading with Decorative Flourish */}
        <SectionHeader
          icon={Scroll}
          badge="परिचय व उद्देश्य"
          title="हमारे बारे में"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Text Content Grid (Page 2 Content) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-amber-50/80 p-6 sm:p-8 rounded-2xl border border-amber-300 shadow-md space-y-4">
              <p className="text-medium sm:text-lg text-slate-800 leading-relaxed font-devanagari font-medium">
                <span className="font-bold text-red-900 text-lg sm:text-xl">भारतीय भाषा ओलंपियाड</span> भारत का प्रथम ऐसा राष्ट्रीय मंच है जो विशेष रूप से <span className="font-bold text-red-900">हिंदी एवं संस्कृत भाषाओं</span> के लिए समर्पित है। कक्षा 1 से 10 तक के विद्यार्थियों के लिए आयोजित किया जाने वाला यह ओलंपियाड भारतीय भाषाओं के प्रति प्रेम, सम्मान और गर्व की भावना को जागृत करता है तथा इन भाषाओं को नई पीढ़ी के लिए अध्ययन का आनंददायक अनुभव बनाता है।
              </p>

              <p className="text-medium sm:text-lg text-slate-800 leading-relaxed font-devanagari">
                हिंदी और संस्कृत हमारी संस्कृति, ज्ञान परंपरा, मूल्य, साहित्य और जीवन दृष्टि का आधार हैं। ये भाषाएँ हमें हमारी जड़ों से जोड़ती हैं और विचारों की गहराई, अभिव्यक्ति की सुंदरता तथा संवाद की प्रभावशीलता विकसित करती हैं।
              </p>
            </div>

            {/* Assessment Vision Box */}
            <div className="bg-white p-6 rounded-2xl border-l-4 border-red-900 border-amber-200 shadow-md space-y-3">
              <h3 className="text-xl font-bold font-heading-hi text-red-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                व्यक्तिगत आंकलन एवं बेंचमार्क मूल्यांकन
              </h3>
              <p className="text-slate-800 font-devanagari text-lg">
                यह ओलंपियाड केवल परीक्षा नहीं, बल्कि विद्यार्थियों की वास्तविक प्रगति का आंकलन है। हम रैंकिंग में विश्वास नहीं करते, बल्कि व्यक्तिगत आंकलन एवं बेंचमार्क आधारित मूल्यांकन में विश्वास करते हैं, जिससे विद्यार्थियों की क्षमताओं, कमियों और संभावनाओं की सकारात्मक पहचान करना संभव हो सके।
              </p>
            </div>

            {/* Detailed Performance Reports & NEP 2020 */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="p-4 bg-amber-100/70 rounded-xl border border-amber-300">
                                <h4 className="font-bold text-red-950 font-heading-hi text-medium mb-1 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                                    विस्तृत प्रदर्शन रिपोर्ट (Insights)
                                </h4>
                                <p className=" text-slate-800 font-devanagari leading-normal text-lg">
                                    विद्यार्थियों, शिक्षकों और अभिभावकों को उपयोगी अंतर्दृष्टि प्रदान करती है जिससे सीखने की प्रक्रिया लक्ष्यकेंद्रित बनती है।
                                </p>
                            </div>

                            <div className="p-4 bg-amber-100/70 rounded-xl border border-amber-300">
                                <h4 className="font-bold text-red-950 font-heading-hi text-medium mb-1 flex items-center gap-1.5">
                                    <Award className="w-4 h-4 text-amber-700" />
                                    NEP 2020 संरेखण
                                </h4>
                                <p className="text-lg text-slate-800 font-devanagari leading-normal">
                                    बहुभाषिक शिक्षा, भारतीय ज्ञान परंपरा, समग्र एवं योग्यता आधारित शिक्षा के मूल सिद्धांतों से पूर्णतः संरेखित है।
                                </p>
                            </div>
                        </div> */}
          </div>

          {/* Right Scroll Visual - Replica of Ancient Scroll in Page 2 Brochure */}
          <div className="lg:col-span-5">
            {/* <div className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 p-8 rounded-3xl border-1 border-[#021335] shadow-2xl space-y-6">

                            <div className="text-center border-b-2 border-amber-400 pb-4">
                                <span className="text-2xl font-yatra text-red-950 block">
                                    संस्कृत ज्ञान-परंपरा
                                </span>
                                <span className="text-medium font-bold text-amber-800 uppercase tracking-widest">
                                    अमृतवाक्य सूक्तियाँ
                                </span>
                            </div>

                            <div className="space-y-4 font-devanagari text-center font-bold text-amber-950">
                                <div className="p-3 bg-white/80 rounded-xl border border-amber-300 shadow-sm hover:scale-105 transition-transform">
                                    <p className="text-lg text-red-900 font-yatra">वसुधैव कुटुम्बकम्</p>
                                    <p className="text-lg text-slate-600 font-normal">संपूर्ण पृथ्वी ही हमारा परिवार है</p>
                                </div>

                                <div className="p-3 bg-white/80 rounded-xl border border-amber-300 shadow-sm hover:scale-105 transition-transform">
                                    <p className="text-lg text-red-900 font-yatra">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन</p>
                                    <p className="text-lg text-slate-600 font-normal">कर्म पर तुम्हारा अधिकार है, फल पर नहीं</p>
                                </div>

                                <div className="p-3 bg-white/80 rounded-xl border border-amber-300 shadow-sm hover:scale-105 transition-transform">
                                    <p className="text-lg text-red-900 font-yatra">सत्यमेव जयते</p>
                                    <p className="text-lg text-slate-600 font-normal">सत्य की ही सदा विजय होती है</p>
                                </div>

                                <div className="p-3 bg-white/80 rounded-xl border border-amber-300 shadow-sm hover:scale-105 transition-transform">
                                    <p className="text-lg text-red-900 font-yatra">विद्या ददाति विनयं</p>
                                    <p className="text-lg text-slate-600 font-normal">विद्या से विनम्रता आती है</p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-[#021335] text-amber-100 rounded-xl text-center border border-amber-400 shadow">
                                <p className="text-lg sm:text-medium font-bold font-devanagari leading-snug">
                                    "आइए, हम सब मिलकर भारतीय भाषाओं के गौरव को पुनः स्थापित करें और नई पीढ़ी को भाषा, संस्कृति और संस्कार से समृद्ध करें।"
                                </p>
                            </div>

                        </div> */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <Image
                src="/banner/about-img.jpg"
                alt="Registration Process"
                width={600}
                height={700}
                priority
                className="w-full max-w-md lg:max-w-lg h-auto object-contain"
              />
            </div>
          </div>

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

    </section>
  );
};
export default AboutPage;



