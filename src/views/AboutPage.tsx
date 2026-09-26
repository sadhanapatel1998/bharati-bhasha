import React from 'react';
import { ChevronRight, Sparkles, Scroll, HeartHandshake, CheckCircle2, ShieldAlert, Award, BookOpen, Link } from 'lucide-react';
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
        className="mb-0 relative py-8 pb-0 overflow-hidden mx-3
          bg-gradient-to-br from-amber-50/60 via-white to-blue-50/60"
      >
        {/* Rainbow animated top border */}
        <div className="absolute top-0 left-0 right-0 h-1
          bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 via-blue-500 to-purple-500 about-border-flow" />

        <Breadcrumb
          title="ओलंपियाड परिचय"
          items={[
            {
              label: "परिचय",
              route: "/about",
            },
            {
              label: "ओलंपियाड परिचय",
            },
          ]}
        />

        {/* ============ BACKGROUND LAYERS ============ */}

        {/* 1) Animated dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]
            bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
            bg-[length:60px_60px,80px_80px] about-grid-pan"
        />

        {/* 2) Diagonal color stripes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]
            bg-[repeating-linear-gradient(45deg,#7c3aed_0px,#7c3aed_1px,transparent_1px,transparent:22px)]"
        />

        {/* 3) Cross grid (paper feel) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]
            bg-[linear-gradient(#64748b_1px,transparent_1px),linear-gradient(90deg,#64748b_1px,transparent_1px)]
            bg-[length:90px_90px]"
        />

        {/* 4) Drifting color orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[8%] left-[5%] w-80 h-80 rounded-full bg-blue-300/30 blur-3xl about-orb-a" />
          <div className="absolute top-[25%] right-[4%] w-72 h-72 rounded-full bg-orange-300/30 blur-3xl about-orb-b" />
          <div className="absolute bottom-[15%] left-[30%] w-80 h-80 rounded-full bg-amber-300/25 blur-3xl about-orb-c" />
          <div className="absolute bottom-[5%] right-[20%] w-64 h-64 rounded-full bg-emerald-300/25 blur-3xl about-orb-a [animation-delay:-5s]" />
          <div className="absolute top-[55%] left-[3%] w-56 h-56 rounded-full bg-purple-300/20 blur-3xl about-orb-b [animation-delay:-8s]" />
        </div>

        {/* 5) Rotating dashed rings */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* <div className="absolute top-[12%] right-[8%] w-44 h-44 rounded-full border-2 border-dashed border-blue-300/40 about-spin-slow" /> */}
          <div className="absolute bottom-[10%] left-[6%] w-56 h-56 rounded-full border border-dashed border-amber-300/40 about-spin-rev" />
          <div className="absolute top-[50%] right-[15%] w-32 h-32 rounded-full border-2 border-dotted border-purple-300/40 about-spin-slow [animation-duration:30s]" />
        </div>

        {/* 6) Flowing light sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3
            bg-gradient-to-r from-transparent via-white/50 to-transparent
            skew-x-[-25deg] about-sweep"
        />

        {/* 7) Twinkling stars */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[15%] left-[14%] w-2 h-2 rounded-full bg-amber-400 about-twinkle" />
          <div className="absolute top-[45%] right-[22%] w-1.5 h-1.5 rounded-full bg-blue-400 about-twinkle [animation-delay:0.8s]" />
          <div className="absolute bottom-[25%] left-[45%] w-2 h-2 rounded-full bg-emerald-400 about-twinkle [animation-delay:1.6s]" />
          <div className="absolute top-[70%] right-[10%] w-1.5 h-1.5 rounded-full bg-purple-400 about-twinkle [animation-delay:2.4s]" />
          <div className="absolute top-[35%] left-[55%] w-1.5 h-1.5 rounded-full bg-rose-400 about-twinkle [animation-delay:3.2s]" />
        </div>

        {/* 8) Floating decorative icons */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[8%] text-amber-400/20 about-float">
            <Award className="w-16 h-16" />
          </div>
          <div className="absolute top-[18%] right-[12%] text-blue-400/20 about-float-slow">
            <BookOpen className="w-16 h-16" />
          </div>
          <div className="absolute bottom-[18%] left-[12%] text-emerald-400/20 about-drift">
            <HeartHandshake className="w-14 h-14" />
          </div>
          <div className="absolute bottom-[12%] right-[10%] text-purple-400/20 about-float [animation-delay:-3s]">
            <Sparkles className="w-14 h-14" />
          </div>
        </div>

        {/* 9) Rotating sparkles */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Sparkles className="absolute top-[30%] left-[22%] w-6 h-6 text-amber-500/40 about-twinkle" />
          <Sparkles className="absolute top-[60%] right-[28%] w-5 h-5 text-blue-500/40 about-twinkle [animation-delay:1s]" />
          <Sparkles className="absolute bottom-[35%] right-[8%] w-6 h-6 text-rose-500/40 about-twinkle [animation-delay:2s]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

          {/* Section Header */}
          <SectionHeader
            icon={Scroll}
            badge="भारतीय भाषाओं के संवर्धन हेतु समर्पित"
            title="भारती भाषा ओलंपियाड का परिचय"
          />

          <div className="grid lg:grid-cols-12 gap-8 items-stretch my-8">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-8 group h-full flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-orange-500/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition duration-700" />

                {/* Shimmering top strip */}
                <div className="absolute top-0 left-0 right-0 h-1
                  bg-gradient-to-r from-blue-500 via-amber-500 via-emerald-500 to-purple-500 about-shimmer" />

                {/* Colorful corner blobs */}
                <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue-300/30 blur-3xl about-orb-a" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-amber-300/30 blur-3xl about-orb-b" />

                <div className="relative z-10 space-y-5">
                  <p className="text-lg text-slate-800 leading-9 font-medium">
                    <span className="text-red-700 font-bold text-xl">
                      भारतीय भाषा ओलंपियाड
                    </span>{" "}
                    भारत का प्रथम ऐसा राष्ट्रीय मंच है जो विशेष रूप से{" "}
                    <span className="text-blue-700 font-bold">
                      हिंदी एवं संस्कृत भाषाओं
                    </span>{" "}
                    के लिए समर्पित है। कक्षा 1 से 10 तक के विद्यार्थियों के लिए आयोजित यह ओलंपियाड भारतीय भाषाओं के प्रति प्रेम, सम्मान और गर्व की भावना को जागृत करता है तथा इन भाषाओं को नई पीढ़ी के लिए अध्ययन का आनंददायक अनुभव बनाता है।
                  </p>
                  <p className="text-lg text-slate-700 leading-9">
                    हिंदी और संस्कृत हमारी संस्कृति, ज्ञान परंपरा, मूल्य, साहित्य और जीवन दृष्टि का आधार हैं। ये भाषाएँ विद्यार्थियों को अपनी जड़ों से जोड़ती हैं तथा आत्मविश्वास, रचनात्मक सोच और भारतीय ज्ञान परंपरा के प्रति सम्मान विकसित करती हैं।
                  </p>
                  <p className="text-lg text-slate-700 leading-9">यह ओलंपियाड केवल परीक्षा नहीं, बल्कि विद्यार्थियों की वास्तविक प्रगति का आंकलन है। हम रैंकिंग में विश्वास नहीं करते, बल्कि व्यक्तिगत आकलन एवं वैयक्तिक आधारित मूल्यांकन में विश्वास करते हैं, जिससे विद्यार्थियों की क्षमताओं, कमियों और संभावनाओं की सकारात्मक पहचान करना संभव हो सके।</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-5 flex">
              <div className="relative w-full max-w-md group h-full">
                <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-r from-blue-500 via-orange-500 to-yellow-400 blur-2xl opacity-30 group-hover:opacity-60 transition duration-500 about-image-glow" />
                <div className="relative overflow-hidden rounded-[32px] border-4 border-white shadow-2xl">
                  <Image
                    src="/banner/about.jpg"
                    alt="भारती भाषा ओलंपियाड"
                    width={600}
                    height={720}
                    priority
                    className="w-full h-auto object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 bg-gradient-to-r from-red-700 to-orange-500 text-white px-5 py-3 rounded-xl shadow-lg about-float">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span className="font-bold">राष्ट्रीय स्तर पर मान्य</span>
                    </div>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-6 -right-4 bg-white rounded-2xl p-4 shadow-2xl about-float-slow border border-yellow-200">
                  <div className="text-center space-y-1">
                    <div className="text-3xl about-trophy-wiggle">🏆</div>
                    <p className="text-sm font-bold text-red-600">भाषा <span className="text-sm font-bold text-red-600">संस्कृति</span> <span className="text-sm font-bold text-green-600">मूल्य</span> </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl p-7
              bg-gradient-to-br from-[#0EA5E9] via-[#2563EB] to-[#1D4ED8]
              text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

              {/* Decorative Circle */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 group-hover:scale-125 transition duration-700" />

              {/* Rainbow top strip */}
              <div className="absolute top-0 left-0 right-0 h-1
                bg-gradient-to-r from-cyan-300 via-white via-yellow-300 to-pink-300 about-shimmer" />

              {/* Shine sweep on hover */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute top-0 -left-full h-full w-1/2
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  skew-x-[-25deg] group-hover:animate-[about-sweep_1.2s_ease-out]" />
              </div>

              {/* Twinkling sparkles */}
              <Sparkles className="absolute top-5 right-14 w-4 h-4 text-white/70 about-twinkle" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-5
                  group-hover:rotate-6 transition-transform duration-300">
                  <CheckCircle2 className="w-9 h-9 about-badge-bounce" />
                </div>

                <h4 className="font-bold text-2xl leading-snug mb-3">
                  विस्तृत प्रदर्शन रिपोर्ट
                </h4>

                <p className="leading-8 text-blue-50 text-medium font-medium">
                  प्रत्येक विद्यार्थी की प्रगति का विस्तृत विश्लेषण उपलब्ध कराया जाता है, जिससे
                  शिक्षक, अभिभावक और विद्यार्थी स्वयं अपनी ताकत, सुधार के क्षेत्रों और आगामी
                  लक्ष्य को स्पष्ट रूप से समझ सकते हैं।
                </p>

                <div className="mt-5 flex items-center gap-2 text-yellow-300 font-semibold">
                  <span>व्यक्तिगत प्रदर्शन विश्लेषण</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl p-7
              bg-gradient-to-br from-[#047857] via-[#16A34A] to-[#84CC16]
              text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/10 group-hover:scale-125 transition duration-700" />
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-lime-300/20 blur-xl group-hover:scale-110 transition duration-700" />

              {/* Rainbow top strip */}
              <div className="absolute top-0 left-0 right-0 h-1
                bg-gradient-to-r from-lime-300 via-yellow-300 via-emerald-300 to-cyan-300 about-shimmer" />

              {/* Shine sweep on hover */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute top-0 -left-full h-full w-1/2
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  skew-x-[-25deg] group-hover:animate-[about-sweep_1.2s_ease-out]" />
              </div>

              {/* Twinkling sparkles */}
              <Sparkles className="absolute top-5 right-14 w-4 h-4 text-lime-100/70 about-twinkle [animation-delay:1s]" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-5
                  group-hover:rotate-6 transition-transform duration-300">
                  <Award className="w-9 h-9 about-badge-bounce" />
                </div>
                <h4 className="font-bold text-2xl leading-snug mb-3">
                  NEP 2020 संरेखण
                </h4>
                <p className="leading-8 text-green-50 text-medium font-medium">
                  यह ओलंपियाड राष्ट्रीय शिक्षा नीति (NEP 2020) के बहुभाषिक शिक्षा, भारतीय ज्ञान
                  परंपरा, समग्र विकास और योग्यता आधारित शिक्षण के सिद्धांतों के अनुरूप तैयार किया
                  गया है, जिससे विद्यार्थियों में भाषा के साथ-साथ सांस्कृतिक मूल्यों का भी विकास
                  होता है।
                </p>
                <div className="mt-5 flex items-center gap-2 text-lime-100 font-semibold">
                  <span>राष्ट्रीय शिक्षा नीति के अनुरूप</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <PurposeSection />
      </section>
    </>
  );
};
export default AboutPage;