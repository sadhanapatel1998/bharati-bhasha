import React from 'react';
import { ChevronRight, Sparkles, Scroll, HeartHandshake, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import SectionHeader from "@/components/shared/SectionHeader";
import Image from 'next/image';
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import PurposeSection from '@/components/shared/PurposeSection';
import CtaSection from '@/components/shared/CtaSection';



export const AboutPage: React.FC = () => {
  return (
    <>
      <section
        id="about"
        className="mb-0 relative py-10 pb-16 overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-amber-50/80"
      >
        <div className="relative mx-auto max-w-7xl h-[200px] md:h-[300px] overflow-hidden rounded-2xl mb-10">
          {/* Background */}
          <Image
            src="/banner/breadcrumb.jpg"
            alt="Hindi Olympiad"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-white/15" />

          {/* Center Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1 className="mb-2 font-devanagari text-3xl font-bold text-[#0F2B5B] md:text-5xl">
              हिंदी ओलंपियाड
            </h1>

            <Breadcrumb
              items={[
                {
                  label: "परिचय",
                  route: "/olympiads",
                },
                {
                  label: "ओलंपियाड परिचय",
                },
              ]}
            />
          </div>
        </div>

        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 30%, #790e03 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, #C79A2D 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px, 80px 80px",
            backgroundPosition: "0 0, 40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

          {/* Section Header */}
          <SectionHeader
            icon={Scroll}
            badge="भारतीय भाषाओं के संवर्धन हेतु समर्पित"
            title="भारती भाषा ओलंपियाड का परिचय"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="relative bg-white p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg" />

                <div className="space-y-4">
                  <p className="text-lg text-slate-800 leading-relaxed font-devanagari font-medium">
                    <span className="font-bold text-red-900 text-lg sm:text-xl">
                      भारतीय भाषा ओलंपियाड
                    </span>{" "}
                    भारत का प्रथम ऐसा राष्ट्रीय मंच है जो विशेष रूप से{" "}
                    <span className="font-bold text-red-900">
                      हिंदी एवं संस्कृत भाषाओं
                    </span>{" "}
                    के लिए समर्पित है। कक्षा 1 से 10 तक के विद्यार्थियों के लिए
                    आयोजित किया जाने वाला यह ओलंपियाड भारतीय भाषाओं के प्रति प्रेम,
                    सम्मान और गर्व की भावना को जागृत करता है तथा इन भाषाओं को नई
                    पीढ़ी के लिए अध्ययन का आनंददायक अनुभव बनाता है।
                  </p>

                  <p className="text-lg text-slate-800 leading-relaxed font-devanagari">
                    हिंदी और संस्कृत हमारी संस्कृति, ज्ञान परंपरा, मूल्य, साहित्य
                    और जीवन दृष्टि का आधार हैं।    हिंदी और संस्कृत हमारी संस्कृति, ज्ञान परंपरा, मूल्य, साहित्य
                    और जीवन दृष्टि का आधार हैं।
                    ये भाषाएँ हमें हमारी जड़ों से
                    जोड़ती हैं और विचारों की गहराई, अभिव्यक्ति की सुंदरता तथा
                    संवाद की प्रभावशीलता विकसित करती हैं।
                  </p>


                  <p className="text-lg text-slate-800 leading-relaxed font-devanagari">
                    यह ओलंपियाड केवल परीक्षा नहीं, बल्कि विद्यार्थियों की वास्तविक प्रगति का
                    आंकलन है। हम रैंकिंग में विश्वास नहीं करते, बल्कि व्यक्तिगत आकलन एवं
                    वैयक्तिक आधारित मूल्यांकन में विश्वास करते हैं, जिससे विद्यार्थियों की
                    क्षमताओं, कमियों और संभावनाओं की सकारात्मक पहचान करना संभव हो सके।
                  </p>
                </div>
              </div>

              {/* Two feature cards – now with animated hover */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="group p-5 bg-white rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <h4 className="font-bold text-red-950 font-heading-hi text-lg mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                    विस्तृत प्रदर्शन रिपोर्ट (Insights)
                  </h4>
                  <p className="text-lg text-slate-800 font-devanagari leading-relaxed">
                    विद्यार्थियों, शिक्षकों और अभिभावकों को उपयोगी अंतर्दृष्टि
                    प्रदान करती है जिससे सीखने की प्रक्रिया लक्ष्यकेंद्रित बनती
                    है।
                  </p>
                </div>

                <div className="group p-5 bg-white rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <h4 className="font-bold text-red-950 font-heading-hi text-lg mb-1 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                    NEP 2020 संरेखण
                  </h4>
                  <p className="text-lg text-slate-800 font-devanagari leading-relaxed">
                    बहुभाषिक शिक्षा, भारतीय ज्ञान परंपरा, समग्र एवं योग्यता
                    आधारित शिक्षा के मूल सिद्धांतों से पूर्णतः संरेखित है।
                  </p>
                </div>
              </div>

            </div>

            {/* Right – Image with decorative frame */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 hover:shadow-3xl transition-shadow duration-500 group">
                  <Image
                    src="/banner/about-img.jpg"
                    alt="Registration Process"
                    width={600}
                    height={700}
                    priority
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />


                  {/* Overlay badge */}
                  <div className="absolute bottom-4 left-4 bg-red-900/90 backdrop-blur-sm text-amber-50 px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>राष्ट्रीय स्तर पर मान्य</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-15 bg-gradient-to-br from-[#7B1E1E] to-[#541313] text-[#F5F0E6] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
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
          </div> */}
          <CtaSection
            title="अपने विद्यालय को पंजीकृत करें"
            description="हिंदी एवं संस्कृत ओलंपियाड 2026-27 में सहभागिता हेतु आज ही पंजीकरण करें।"
            buttonText="अभी पंजीकरण करें"
            buttonRoute="/registration"
            badge="सीमित समय की पेशकश"
            className='mt-15'
          />

        </div>

        <PurposeSection />
      </section>
    </>

  );
};
export default AboutPage;



