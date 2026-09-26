"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import Image from "next/image";
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
  Star,
  Trophy,
  Medal,
  GraduationCap,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { language, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterBusy, setNewsletterBusy] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast("कृपया वैध ईमेल पता दर्ज करें।", "warning");
      return;
    }

    setNewsletterBusy(true);
    try {
      const res = await fetch("/api/public/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newsletterEmail,
          email: newsletterEmail,
          subject: "Newsletter subscription",
          message: `Newsletter subscription request from ${newsletterEmail}`,
          role: "subscriber",
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showToast(data?.message || "पंजीकरण नहीं हो सका। कृपया पुनः प्रयास करें।", "error");
        return;
      }

      showToast(
        "धन्यवाद! आप भारती भाषा ओलंपियाड न्यूज़लेटर हेतु सफलतापूर्वक पंजीकृत हो गए हैं।",
        "success"
      );
      setNewsletterEmail("");
    } catch {
      showToast("सर्वर से संपर्क नहीं हो सका। कृपया पुनः प्रयास करें।", "error");
    } finally {
      setNewsletterBusy(false);
    }
  };

  return (
    <>
      {/* ============ Custom Keyframes ============ */}
      <style>{`
        /* Glow pulse for CTA */
        @keyframes ft-pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(251,191,36,0.45), 0 0 80px rgba(236,72,153,0.25); }
          50%      { box-shadow: 0 0 70px rgba(251,191,36,0.75), 0 0 140px rgba(236,72,153,0.45); }
        }
        /* Rainbow shimmer */
        @keyframes ft-rainbow-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        /* Floating icons */
        @keyframes ft-float-1 {
          0%, 100% { transform: translateY(0) rotate(-10deg); }
          50%      { transform: translateY(-18px) rotate(-2deg); }
        }
        @keyframes ft-float-2 {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50%      { transform: translateY(-22px) rotate(4deg); }
        }
        @keyframes ft-float-3 {
          0%, 100% { transform: translateY(0) rotate(-8deg); }
          50%      { transform: translateY(-16px) rotate(2deg); }
        }
        @keyframes ft-float-4 {
          0%, 100% { transform: translateY(0) rotate(10deg); }
          50%      { transform: translateY(-20px) rotate(-2deg); }
        }
        /* Blobs */
        @keyframes ft-blob-1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(70px,-50px) scale(1.2); }
        }
        @keyframes ft-blob-2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-60px,50px) scale(1.15); }
        }
        @keyframes ft-blob-3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(40px,-35px) scale(1.12); }
          66%      { transform: translate(-35px,25px) scale(0.92); }
        }
        /* Grid pan */
        @keyframes ft-grid-pan {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        /* Twinkle */
        @keyframes ft-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
          50%      { opacity: 1;   transform: scale(1.35) rotate(180deg); }
        }
        /* Rotating rings */
        @keyframes ft-spin-slow { to { transform: rotate(360deg); } }
        @keyframes ft-spin-rev  { to { transform: rotate(-360deg); } }
        /* Sweep */
        @keyframes ft-sweep {
          0%   { transform: translateX(-100%) skewX(-25deg); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(400%) skewX(-25deg); opacity: 0; }
        }
        /* Border rainbow shift */
        @keyframes ft-border-rainbow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .ft-pulse-glow { animation: ft-pulse-glow 4s ease-in-out infinite; }
        .ft-rainbow-shimmer {
          background-size: 200% auto;
          animation: ft-rainbow-shimmer 6s linear infinite;
        }
        .ft-float-1 { animation: ft-float-1 7s ease-in-out infinite; }
        .ft-float-2 { animation: ft-float-2 9s ease-in-out infinite; }
        .ft-float-3 { animation: ft-float-3 8s ease-in-out infinite; }
        .ft-float-4 { animation: ft-float-4 10s ease-in-out infinite; }
        .ft-blob-1  { animation: ft-blob-1 15s ease-in-out infinite; }
        .ft-blob-2  { animation: ft-blob-2 18s ease-in-out infinite; }
        .ft-blob-3  { animation: ft-blob-3 16s ease-in-out infinite; }
        .ft-grid-pan{ animation: ft-grid-pan 22s linear infinite; }
        .ft-twinkle { animation: ft-twinkle 2.2s ease-in-out infinite; }
        .ft-spin-slow { animation: ft-spin-slow 24s linear infinite; }
        .ft-spin-rev  { animation: ft-spin-rev 32s linear infinite; }
        .ft-sweep     { animation: ft-sweep 7s linear infinite; }
        .ft-border-rainbow {
          background-size: 200% 100%;
          animation: ft-border-rainbow 8s linear infinite;
        }
      `}</style>

      <footer className="relative bg-[#0B0714] text-[#F5F0E6] pt-16 pb-8 overflow-hidden">
        {/* Rainbow animated top border */}
        <div className="absolute top-0 left-0 right-0 h-1" />

        {/* ============ VIBRANT Background Layers ============ */}

        {/* 1) Animated dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]
            bg-[radial-gradient(#FBBF24_1px,transparent_1px)]
            [background-size:32px_32px] ft-grid-pan"
        />

        {/* 5) Flowing rainbow light sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3
            bg-gradient-to-r from-transparent via-white/15 to-transparent
            skew-x-[-25deg] "
        />

        {/* 6) Floating colorful olympiad icons */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-8 text-amber-400/25 ft-float-1">
            <Trophy className="w-20 h-20" />
          </div>
          <div className="absolute top-32 right-12 text-pink-400/25 ft-float-2">
            <Medal className="w-16 h-16" />
          </div>
          <div className="absolute bottom-24 left-12 text-cyan-400/25 ft-float-3">
            <BookOpen className="w-16 h-16" />
          </div>
          <div className="absolute bottom-16 right-16 text-violet-400/25 ft-float-4">
            <GraduationCap className="w-20 h-20" />
          </div>
          <div className="absolute top-[45%] left-[48%] text-emerald-400/25 ft-float-1 [animation-delay:-3s]">
            <Award className="w-14 h-14" />
          </div>
        </div>

        {/* 7) Twinkling stars */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Star className="absolute top-[18%] left-[22%] w-5 h-5 text-yellow-300/70 fill-current ft-twinkle" />
          <Star className="absolute top-[55%] right-[18%] w-4 h-4 text-pink-300/70 fill-current ft-twinkle [animation-delay:0.8s]" />
          <Star className="absolute bottom-[25%] left-[35%] w-5 h-5 text-cyan-300/70 fill-current ft-twinkle [animation-delay:1.6s]" />
          <Sparkles className="absolute top-[30%] right-[42%] w-6 h-6 text-amber-300/70 ft-twinkle [animation-delay:2s]" />
          <Sparkles className="absolute bottom-[40%] left-[15%] w-5 h-5 text-violet-300/70 ft-twinkle [animation-delay:2.8s]" />
        </div>

        {/* ============ Content ============ */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* ============ Footer Newsletter CTA ============ */}
          <div
            className="relative rounded-3xl p-6 sm:p-10 mb-16 shadow-[0_20px_60px_rgba(0,0,0,.45)]
  overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6
  border border-cyan-400/25 bg-gradient-to-r from-[#0A2452] via-[#123A78] to-[#1A4D8F]"
          >

            {/* Soft Inner Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,.18),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(250,204,21,.12),transparent_35%)]"
            />

            {/* Top Wave Pattern */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 w-full h-20 opacity-20"
            >
              <svg viewBox="0 0 1200 120" className="w-full h-full">
                <path
                  d="M0,50 C250,120 350,0 600,45 C850,90 980,10 1200,60 L1200,0 L0,0 Z"
                  fill="rgba(255,255,255,.18)"
                />
              </svg>
            </div>

            {/* Bottom Wave Pattern */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 w-full h-20 opacity-15 rotate-180"
            >
              <svg viewBox="0 0 1200 120" className="w-full h-full">
                <path
                  d="M0,50 C250,120 350,0 600,45 C850,90 980,10 1200,60 L1200,0 L0,0 Z"
                  fill="rgba(34,211,238,.25)"
                />
              </svg>
            </div>

            {/* Decorative Icons */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-5 right-6 text-yellow-300/70 animate-pulse"
            >
              <Sparkles className="w-6 h-6" />
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute bottom-5 left-6 text-cyan-300/60 animate-pulse [animation-delay:1s]"
            >
              <Star className="w-4 h-4 fill-current" />
            </div>

            {/* Left Content */}
            <div className="relative max-w-xl text-center lg:text-left z-10">
              <div
                className="inline-flex items-center gap-2
      bg-white/10 backdrop-blur-sm
      border border-yellow-300/40 text-yellow-200
      px-4 py-1.5 rounded-full text-sm font-bold mb-3"
              >
                <Sparkles className="w-4 h-4" />
                नवीनतम सूचनाएं प्राप्त करें
              </div>

              <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-[#FFE79A] mb-2">
                राष्ट्रीय भाषा ओलंपियाड समाचार पत्र
              </h3>

              <p className="text-blue-100/90">
                परीक्षा तिथियाँ, निःशुल्क अभ्यास प्रश्नोत्तरी, मॉडल पेपर एवं छात्रवृत्ति
                अपडेट ईमेल पर प्राप्त करें।
              </p>
            </div>

            {/* Right Form */}
            <form
              onSubmit={handleNewsletter}
              className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="आपका ईमेल पता..."
                className="w-full sm:w-80 px-4 py-3 rounded-xl bg-white/12 backdrop-blur-md
      text-white placeholder-blue-100/60
      border border-white/20
      focus:outline-none focus:border-cyan-300
      focus:bg-white/18
      transition-all duration-300"
              />

              <button
                type="submit"
                disabled={newsletterBusy}
                className="group w-full sm:w-auto
      bg-gradient-to-r from-[#FACC15] via-[#FFD54A] to-[#F59E0B]
      hover:from-[#FFD54A] hover:via-[#FFE27A] hover:to-[#FACC15]
      text-[#0A2452]
      px-6 py-3 rounded-xl font-bold
      shadow-[0_10px_30px_rgba(250,204,21,.35)]
      hover:scale-105 transition-all duration-300
      flex items-center justify-center gap-2"
              >
                <span>{newsletterBusy ? "भेजा जा रहा है…" : "सदस्यता लें"}</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* ============ Main Footer Grid ============ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
            {/* Col 1: About & Trust Seals */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-0 group">
                <div className="w-25 h-25 flex items-center text-white font-bold font-playfair
                  group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src="/logo/logo.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="object-contain rounded-full
                      group-hover:drop-shadow-[0_0_25px_rgba(251,191,36,0.9)]
                      transition-all duration-500"
                    priority
                  />
                </div>

                <div>
                  <h2 className="font-playfair font-bold text-2xl text-white">
                    भारती भाषा <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">ओलंपियाड</span>
                  </h2>
                  <p className="text-base bg-gradient-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent font-bold tracking-wide">
                    अपनी भाषा, अपनी पहचान
                  </p>
                </div>
              </Link>

              <p className="text-base text-gray-200 leading-relaxed max-w-md">
                भारती भाषा ओलंपियाड भारत का प्रथम राष्ट्रीय स्तर का हिंदी व
                संस्कृत ओलंपियाड है। यह राष्ट्रीय शिक्षा नीति (NEP 2020) के
                सिद्धांतों पर आधारित एक वैज्ञानिक मूल्यांकन मंच है, जो छात्रों में
                मातृभाषा व संस्कृत के प्रति अनुराग जगाता है।
              </p>

              {/* Accreditation Badges — colorful */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="group flex items-center gap-1.5
                  bg-gradient-to-r from-emerald-500/20 to-teal-500/15
                  border-2 border-emerald-400/50
                  px-3 py-1.5 rounded-lg text-medium font-bold text-emerald-200
                  hover:from-emerald-500/35 hover:to-teal-500/25
                  hover:border-emerald-300 hover:text-white
                  transition-all duration-300
                  hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/50">
                  <ShieldCheck className="w-5 h-5 text-emerald-300 group-hover:scale-125 group-hover:rotate-12 transition-transform" />
                  एनईपी 2020 अनुपालन
                </div>
                <div className="group flex items-center gap-1.5
                  bg-gradient-to-r from-amber-500/20 to-yellow-500/15
                  border-2 border-amber-400/50
                  px-3 py-1.5 rounded-lg text-medium font-bold text-amber-200
                  hover:from-amber-500/35 hover:to-yellow-500/25
                  hover:border-amber-300 hover:text-white
                  transition-all duration-300
                  hover:scale-110 hover:shadow-lg hover:shadow-amber-500/50">
                  <Award className="w-5 h-5 text-amber-300 group-hover:scale-125 group-hover:rotate-12 transition-transform" />
                  आईएसओ 9001:2025 प्रमाणित
                </div>
                <div className="group flex items-center gap-1.5
                  bg-gradient-to-r from-rose-500/20 to-pink-500/15
                  border-2 border-rose-400/50
                  px-3 py-1.5 rounded-lg text-medium font-bold text-rose-200
                  hover:from-rose-500/35 hover:to-pink-500/25
                  hover:border-rose-300 hover:text-white
                  transition-all duration-300
                  hover:scale-110 hover:shadow-lg hover:shadow-rose-500/50">
                  <BookOpen className="w-5 h-5 text-rose-300 group-hover:scale-125 transition-transform" />
                  एनसीईआरटी पाठ्यचर्या
                </div>
              </div>
            </div>

            {/* Col 2: Quick Links — Blue theme */}
            <div className="space-y-3">
              <h4 className="font-playfair text-xl font-bold pb-1 border-b-2 border-blue-400/50
                bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                त्वरित लिंक
              </h4>
              <ul className="space-y-2 text-base text-gray-200">
                <li>
                  <Link href="/"
                    className="hover:text-blue-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(96,165,250,1)] font-semibold">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {"होम"}
                  </Link>
                </li>
                <li>
                  <Link href="/about"
                    className="hover:text-blue-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(96,165,250,1)] font-semibold">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {"ओलंपियाड का परिचय"}
                  </Link>
                </li>
                <li>
                  <Link href="/vision-mission"
                    className="hover:text-blue-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(96,165,250,1)] font-semibold">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {"दृष्टि एवं उद्देश्य"}
                  </Link>
                </li>
                <li>
                  <Link href="/why-us"
                    className="hover:text-blue-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(96,165,250,1)] font-semibold">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {"हमारी विशेषताएँ"}
                  </Link>
                </li>
                <li>
                  <Link href="/awards"
                    className="hover:text-blue-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(96,165,250,1)] font-semibold">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {"पुरस्कार एवं सम्मान"}
                  </Link>
                </li>
                <li>
                  <Link href="/contact"
                    className="hover:text-blue-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(96,165,250,1)] font-semibold">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {"संपर्क करें"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Examinations & Resources — Emerald theme */}
            <div className="space-y-3">
              <h4 className="font-playfair text-xl font-bold pb-1 border-b-2 border-emerald-400/50
                bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                {"परीक्षाएं व संसाधन"}
              </h4>
              <ul className="space-y-2 text-base text-gray-200">
                <li>
                  <Link href="/syllabus"
                    className="hover:text-emerald-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(52,211,153,1)] font-semibold">
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                    {"पाठ्यक्रम (कक्षा 1 से 10)"}
                  </Link>
                </li>
                <li>
                  <Link href="/exam-dates"
                    className="hover:text-emerald-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(52,211,153,1)] font-bold">
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                    {"परीक्षा कार्यक्रम"}
                  </Link>
                </li>
                <li>
                  <Link href="/benchmark"
                    className="hover:text-emerald-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(52,211,153,1)] font-bold">
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                    {"परीक्षा प्रारूप"}
                  </Link>
                </li>
                <li>
                  <Link href="/sample-papers"
                    className="hover:text-emerald-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(52,211,153,1)] font-semibold">
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                    {"मॉडल प्रश्न पत्र (PDF)"}
                  </Link>
                </li>
                <li>
                  <Link href="/performance-report"
                    className="hover:text-emerald-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(52,211,153,1)] font-semibold">
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                    {"परिणाम व स्कोर कार्ड"}
                  </Link>
                </li>
                <li>
                  <Link href="/faqs"
                    className="hover:text-emerald-300 transition-all duration-300 flex items-center gap-1.5
                      hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(52,211,153,1)] font-semibold">
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                    {"प्रश्नोत्तर"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: National Headquarters — Amber theme */}
            <div className="space-y-3">
              <h4 className="font-playfair text-xl font-bold pb-1 border-b-2 border-amber-400/50
                bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                राष्ट्रीय मुख्यालय व संपर्क
              </h4>
              <div className="space-y-3 text-base text-gray-200">
                <div className="group flex items-start gap-2.5 hover:text-amber-200 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5
                    group-hover:scale-125 group-hover:rotate-6 group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,1)]
                    transition-all duration-300" />
                  <span>
                    <strong className="text-amber-300">राष्ट्रीय कार्यालय:</strong> बी-42, संस्थागत क्षेत्र,
                    कुतुब इंस्टीट्यूशनल एरिया, नई दिल्ली - 110016
                  </span>
                </div>
                <div className="group flex items-start gap-2.5 hover:text-amber-200 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5
                    group-hover:scale-125 group-hover:rotate-6 group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,1)]
                    transition-all duration-300" />
                  <span>
                    <strong className="text-amber-300">सांस्कृतिक पीठ:</strong> अस्सी घाट परिसर, काशी
                    (वाराणसी), उत्तर प्रदेश - 221005
                  </span>
                </div>
                <div className="group flex items-center gap-2.5 hover:text-amber-200 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0
                    group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,1)]
                    transition-all duration-300" />
                  <span>टोल-फ्री: 1800-123-9876 / +91 11 2685 4321</span>
                </div>
                <div className="group flex items-center gap-2.5 hover:text-amber-200 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0
                    group-hover:scale-125 group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,1)]
                    transition-all duration-300" />
                  <span>info@bharatibhasha.org</span>
                </div>
              </div>
            </div>
          </div>

          {/* ============ Bottom Bar ============ */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-base text-gray-300">
            <p className="text-center md:text-left">
              © 2026 <strong className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">भारती भाषा ओलंपियाड न्यास</strong>. सर्वाधिकार
              सुरक्षित।
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-base">
              <Link href="/privacy-terms"
                className="hover:text-amber-300 transition-all duration-300 font-semibold
                  hover:drop-shadow-[0_0_12px_rgba(251,191,36,1)] hover:scale-110">
                {"गोपनीयता नीति"}
              </Link>
              <span className="text-amber-400">•</span>
              <Link href="/privacy-terms"
                className="hover:text-amber-300 transition-all duration-300 font-semibold
                  hover:drop-shadow-[0_0_12px_rgba(251,191,36,1)] hover:scale-110">
                {"नियम व शर्तें"}
              </Link>
              <span className="text-amber-400">•</span>
              <Link href="/sitemap"
                className="hover:text-amber-300 transition-all duration-300 font-semibold
                  hover:drop-shadow-[0_0_12px_rgba(251,191,36,1)] hover:scale-110">
                {"साइटमैप"}
              </Link>
              <span className="text-amber-400">•</span>
              <Link href="/careers"
                className="hover:text-amber-300 transition-all duration-300 font-semibold
                  hover:drop-shadow-[0_0_12px_rgba(251,191,36,1)] hover:scale-110">
                करियर
              </Link>
              <span className="text-amber-400">•</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;