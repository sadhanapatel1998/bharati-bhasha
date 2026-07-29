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
} from "lucide-react";

export const Footer: React.FC = () => {
  const { language, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast("कृपया वैध ईमेल पता दर्ज करें।", "warning");
      return;
    }
    showToast(
      "धन्यवाद! आप भारती भाषा ओलंपियाड न्यूज़लेटर हेतु सफलतापूर्वक पंजीकृत हो गए हैं।",
      "success"
    );
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-[#1A1212] text-[#F5F0E6] pt-16 pb-8 border-t-4 border-[#C79A2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter CTA Box */}
        <div className="bg-gradient-to-r from-[#7B1E1E] to-[#541313] rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl border border-[#C79A2D]/30 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#C79A2D]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#C79A2D]/20 border border-[#C79A2D]/40 text-[#C79A2D] px-3 py-1 rounded-full text-base font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              {"नवीनतम सूचनाएं प्राप्त करें"}
            </div>
            <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-2">
              {"राष्ट्रीय भाषा ओलंपियाड समाचार पत्र"}
            </h3>
            <p className="text-base text-gray-300">
              {
                "परीक्षा तिथियाँ, निःशुल्क अभ्यास प्रश्नोत्तरी, मॉडल पेपर एवं छात्रवृत्ति अपडेट ईमेल पर प्राप्त करें।"
              }
            </p>
          </div>

          <form
            onSubmit={handleNewsletter}
            className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-2.5"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={"आपका ईमेल पता..."}
              className="w-full sm:w-80 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 text-base focus:outline-none focus:border-[#C79A2D] transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#C79A2D] hover:bg-[#E2B855] text-[#7B1E1E] px-6 py-3 rounded-xl font-bold text-base shadow-md transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>{"सदस्यता लें"}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: About & Trust Seals */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-30 h-30 flex items-center justify-center text-white font-bold font-playfair ">
                <Image
                  src="/logo/logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              <div>
                <h2 className="font-playfair font-bold text-2xl text-white">
                  भारती भाषा <span className="text-[#C79A2D]">ओलंपियाड</span>
                </h2>
                <p className="text-base text-[#C79A2D] font-medium tracking-wide">
                  अपनी भाषा, अपनी पहचान
                </p>
              </div>
            </div>

            <p className="text-base text-gray-300 leading-relaxed max-w-md">
              भारती भाषा ओलंपियाड भारत का प्रथम राष्ट्रीय स्तर का हिंदी व
              संस्कृत ओलंपियाड है। यह राष्ट्रीय शिक्षा नीति (NEP 2020) के
              सिद्धांतों पर आधारित एक वैज्ञानिक मूल्यांकन मंच है, जो छात्रों में
              मातृभाषा व संस्कृत के प्रति अनुराग जगाता है।
            </p>

            {/* Accreditation Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-medium font-semibold text-[#C79A2D]">
                <ShieldCheck className="w-5 h-5 text-[#2E8B57]" />
                एनईपी 2020 अनुपालन
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-medium font-semibold text-[#C79A2D]">
                <Award className="w-5 h-5 text-[#C79A2D]" />
                आईएसओ 9001:2025 प्रमाणित
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-medium font-semibold text-[#C79A2D]">
                <BookOpen className="w-5 h-5 text-[#7B1E1E]" />
                एनसीईआरटी पाठ्यचर्या
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-playfair text-xl font-bold text-[#C79A2D] pb-1 border-b border-[#C79A2D]/20">
              त्वरित लिंक
            </h4>
            <ul className="space-y-2 text-base text-gray-300">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"ओलंपियाड का परिचय"}
                </Link>
              </li>
              <li>
                <Link
                  href="/vision-mission"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"लक्ष्य एवं दूरदृष्टि"}
                </Link>
              </li>
              <li>
                <Link
                  href="/why-us"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"हमारा चयन क्यों?"}
                </Link>
              </li>
              <li>
                <Link
                  href="/nep-2020"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"राष्ट्रीय शिक्षा नीति 2020"}
                </Link>
              </li>
              <li>
                <Link
                  href="/benchmark"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"बेंचमार्क मूल्यांकन"}
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"अभिभावक एवं विद्यालय विचार"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Examinations & Resources */}
          <div className="space-y-3">
            <h4 className="font-playfair text-xl font-bold text-[#C79A2D] pb-1 border-b border-[#C79A2D]/20">
              {"परीक्षाएं व संसाधन"}
            </h4>
            <ul className="space-y-2 text-base text-gray-300">
              <li>
                <Link
                  href="/hindi-olympiad"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"राष्ट्रीय हिंदी ओलंपियाड"}
                </Link>
              </li>
              <li>
                <Link
                  href="/sanskrit-olympiad"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"राष्ट्रीय संस्कृत ओलंपियाड"}
                </Link>
              </li>
              <li>
                <Link
                  href="/syllabus"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"पाठ्यक्रम (कक्षा 1 से 12)"}
                </Link>
              </li>
              <li>
                <Link
                  href="/mock-test"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5 font-bold text-[#C79A2D]"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"ऑनलाइन मॉक टेस्ट (फ्री)"}
                </Link>
              </li>
              <li>
                <Link
                  href="/sample-papers"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"मॉडल प्रश्न पत्र (PDF)"}
                </Link>
              </li>
              <li>
                <Link
                  href="/performance-report"
                  className="hover:text-[#C79A2D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-[#C79A2D]" />
                  {"परिणाम व स्कोर कार्ड"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: National Headquarters & Contact */}
          <div className="space-y-3">
            <h4 className="font-playfair text-xl font-bold text-[#C79A2D] pb-1 border-b border-[#C79A2D]/20">
              राष्ट्रीय मुख्यालय व संपर्क
            </h4>
            <div className="space-y-3 text-base text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#C79A2D] shrink-0 mt-0.5" />
                <span>
                  <strong>राष्ट्रीय कार्यालय:</strong> बी-42, संस्थागत क्षेत्र,
                  कुतुब इंस्टीट्यूशनल एरिया, नई दिल्ली - 110016
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#C79A2D] shrink-0 mt-0.5" />
                <span>
                  <strong>सांस्कृतिक पीठ:</strong> अस्सी घाट परिसर, काशी
                  (वाराणसी), उत्तर प्रदेश - 221005
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-[#C79A2D] shrink-0" />
                <span>टोल-फ्री: 1800-123-9876 / +91 11 2685 4321</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-[#C79A2D] shrink-0" />
                <span>info@bharatibhasha.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-base text-gray-400">
          <p className="text-center md:text-left">
            © 2026 <strong>भारती भाषा ओलंपियाड न्यास</strong>. सर्वाधिकार
            सुरक्षित।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-base">
            <Link
              href="/privacy-terms"
              className="hover:text-[#C79A2D] transition-colors"
            >
              {"गोपनीयता नीति"}
            </Link>
            <span>•</span>
            <Link
              href="/privacy-terms"
              className="hover:text-[#C79A2D] transition-colors"
            >
              {"नियम व शर्तें"}
            </Link>
            <span>•</span>
            <Link
              href="/sitemap"
              className="hover:text-[#C79A2D] transition-colors"
            >
              {"साइटमैप"}
            </Link>
            <span>•</span>
            <Link
              href="/careers"
              className="hover:text-[#C79A2D] transition-colors"
            >
              करियर
            </Link>
            <span>•</span>
            {/* <Link
              href="/admin/login"
              className="text-[#C79A2D] font-bold hover:underline transition-colors flex items-center gap-1"
            >
              <span>प्रशासक पोर्टल (Admin Login)</span>
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;