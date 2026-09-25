"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { KEY_STATS as KEY_STATS_STATIC } from "@/data/olympiadData";
import {
  Trophy,
  Medal,
  Award,
  GraduationCap,
  BookOpen,
  Sparkles,
  Users,
  School,
  MapPin,
  IndianRupee,
  Star,
} from "lucide-react";

import { useSiteContent } from '@/hooks/useSiteContent';
// Custom hook to animate a number from 0 to target
const useCounter = (
  target: number,
  duration: number = 2000,
  shouldStart: boolean,
) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, shouldStart]);
  return count;
};

// Format number with commas (Indian numbering)
const formatNumber = (num: number) => {
  return num.toLocaleString("en-IN");
};
export const StatsSection: React.FC = () => {
  const KEY_STATS = useSiteContent<typeof KEY_STATS_STATIC>('key_stats', KEY_STATS_STATIC);
  const { language } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Define which stats to display – you can add/remove any field from KEY_STATS
  const stats = [
    {
      key: "students",
      target: KEY_STATS.studentsParticipated,
      label: "पंजीकृत छात्र",
      suffix: "+",
    },
    {
      key: "schools",
      target: KEY_STATS.schoolsRegistered,
      label: "सहयोगी विद्यालय",
      suffix: "+",
    },
    {
      key: "states",
      target: KEY_STATS.statesCovered,
      label: "राज्य व केंद्रशासित प्रदेश",
      suffix: "",
    },
    {
      key: "scholarships",
      target: KEY_STATS.scholarshipsDistributedInLakhs,
      label: "छात्रवृत्ति व पुरस्कार वितरित",
      prefix: "₹",
      suffix: "L+",
    },
    // Uncomment below to show additional stats
    // {
    //   key: 'districts',
    //   target: KEY_STATS.districtsCovered,
    //   label: language === 'hi' ? 'जिले' : 'Districts Covered',
    //   suffix: '+',
    // },
    // {
    //   key: 'teachers',
    //   target: KEY_STATS.teachersTrained,
    //   label: language === 'hi' ? 'प्रशिक्षित शिक्षक' : 'Teachers Trained',
    //   suffix: '+',
    // },
  ];

  // Get counter values
  const counters = stats.map((stat) =>
    useCounter(stat.target, 2000, isVisible),
  );
  return (
    <section
      ref={sectionRef}
      className="mb-0 relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-[#02133b] via-[#011030] to-[#020b22] border-y-4 border-[#D4AF37]"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-[#D4AF37]/10 blur-3xl animate-pulse" />

      {/* Golden Pattern */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Floating Background Icons */}
      <div className="absolute top-10 left-10 text-[#D4AF37]/12 animate-pulse">
        <Trophy className="w-16 h-16" />
      </div>

      <div className="absolute top-12 right-10 text-[#D4AF37]/12 animate-bounce">
        <Medal className="w-16 h-16" />
      </div>

      <div className="absolute bottom-10 left-12 text-[#D4AF37]/10 animate-pulse">
        <BookOpen className="w-14 h-14" />
      </div>

      <div className="absolute bottom-12 right-12 text-[#D4AF37]/10 animate-bounce">
        <GraduationCap className="w-14 h-14" />
      </div>

      {/* Sparkles */}
      <div className="absolute top-1/3 left-1/4 text-[#FCCC5D]/25 animate-ping">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="absolute bottom-1/3 right-1/4 text-[#FCCC5D]/20 animate-pulse">
        <Sparkles className="w-7 h-7" />
      </div>

      {/* Rotating Rings */}
      <div className="absolute top-24 right-36 w-24 h-24 rounded-full border border-dashed border-[#D4AF37]/20 animate-spin [animation-duration:15s]" />
      <div className="absolute bottom-24 left-36 w-28 h-28 rounded-full border border-dashed border-[#D4AF37]/15 animate-spin [animation-duration:20s]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 text-[#FCCC5D] font-semibold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            हमारी उपलब्धियाँ
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">
            भारत भर में बढ़ता विश्वास
          </h2>

          <p className="mt-3 text-white/75 max-w-2xl mx-auto">
            लाखों छात्रों, हजारों विद्यालयों और पूरे भारत में बढ़ते विश्वास की कहानी।
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const count = counters[index] || 0;

            const displayValue = stat.prefix
              ? `${stat.prefix}${formatNumber(count)}${stat.suffix}`
              : `${formatNumber(count)}${stat.suffix}`;

            const themes = [
              {
                // Blue Card
                bg: "from-blue-500 to-blue-700",
                border: "border-blue-400",
                iconBg: "bg-white",
                iconColor: "text-blue-600",
                textColor: "text-white",
                subTextColor: "text-blue-100",
                underline: "bg-blue-300",
                shadow: "shadow-[0_15px_35px_-10px_rgba(59,130,246,0.8)]",
                icon: <Users className="w-8 h-8" />,
              },
              {
                // Orange Card
                bg: "from-orange-500 to-orange-700",
                border: "border-orange-400",
                iconBg: "bg-white",
                iconColor: "text-orange-600",
                textColor: "text-white",
                subTextColor: "text-orange-100",
                underline: "bg-orange-300",
                shadow: "shadow-[0_15px_35px_-10px_rgba(249,115,22,0.8)]",
                icon: <BookOpen className="w-8 h-8" />,
              },
              {
                // Purple Card
                bg: "from-purple-500 to-purple-700",
                border: "border-purple-400",
                iconBg: "bg-white",
                iconColor: "text-purple-600",
                textColor: "text-white",
                subTextColor: "text-purple-100",
                underline: "bg-purple-300",
                shadow: "shadow-[0_15px_35px_-10px_rgba(168,85,247,0.8)]",
                icon: <Trophy className="w-8 h-8" />,
              },
              {
                // Green Card
                bg: "from-green-500 to-green-700",
                border: "border-green-400",
                iconBg: "bg-white",
                iconColor: "text-green-600",
                textColor: "text-white",
                subTextColor: "text-green-100",
                underline: "bg-green-300",
                shadow: "shadow-[0_15px_35px_-10px_rgba(34,197,94,0.8)]",
                icon: <School className="w-8 h-8" />,
              },
            ];

            const theme = themes[index];

            return (
              <div
                key={stat.key}
                className={`group relative rounded-3xl bg-gradient-to-br ${theme.bg} border-2 ${theme.border} p-6 pt-12 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${theme.shadow}`}
              >
                {/* Decorative Corner Sparkles */}
                <div className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme.textColor}`}>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div className={`absolute top-6 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ${theme.textColor}`}>
                  <Star className="w-3 h-3 fill-current" />
                </div>

                {/* Floating Icon Badge */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className={`w-16 h-16 rounded-full ${theme.iconBg} flex items-center justify-center ring-4 ring-white/30 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}>
                    <div className={theme.iconColor}>
                      {theme.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-2 flex flex-col items-center w-full">
                  <h3 className={`text-4xl sm:text-5xl font-black ${theme.textColor} tracking-tight drop-shadow-sm`}>
                    {displayValue}
                  </h3>

                  <p className={`mt-3 text-sm sm:text-base font-bold ${theme.subTextColor} transition-colors duration-300`}>
                    {stat.label}
                  </p>

                  {/* Underline */}
                  {/* <div className={`mt-4 h-1.5 w-12 rounded-full ${theme.underline} group-hover:w-24 transition-all duration-500`} /> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
