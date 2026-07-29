"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Breadcrumb } from "../components/shared/Breadcrumb";
import { WHY_US_DATA } from "../data/olympiadData";
import {
  Cpu,
  Award,
  Trophy,
  GraduationCap,
  ShieldCheck,
  Users,
  CheckCircle2,
  ArrowRight,
  School,
  User,
  MapPin,
  Sparkles,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Award,
  Trophy,
  GraduationCap,
  ShieldCheck,
  Users,
};

export const WhyUsPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const { advantages } = WHY_US_DATA;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-100/30 overflow-hidden pb-15">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 z-10">
        <Breadcrumb
          title="हमारी विशेषताएँ"
          items={[
            {
              label: "परिचय",
              route: "/about",
            },
            {
              label: "हमारी विशेषताएँ",
            },
          ]}
        />

        <SectionHeader
          icon={Sparkles}
          badge="हमें क्या बनाता है विशेष"
          title="हमारी विशेषताएँ"
          className="py-6"
        />

        {/* 🔥 New Cards – completely different design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv) => {
            const Icon = iconMap[adv.icon] || CheckCircle2;
            // Each card gets a unique gradient for the border glow
            const borderGlow = adv.color || "from-gray-400 to-gray-600";
            return (
              <div
                key={adv.id}
                className="
    group relative
    bg-white/80 dark:bg-[#1A1414]/80
    backdrop-blur-sm
    rounded-3xl
    p-8
    shadow-xl hover:shadow-2xl
    transition-all duration-500
    hover:-translate-y-3 hover:scale-[1.02]
    border-2 border-blue-50 hover:border-[#C79A2D]/50
  "
              >
                {/* Decorative floating icon with gradient glow */}
                <div className="relative -mt-12 mb-6 flex justify-center">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${adv.color} p-1 shadow-2xl group-hover:shadow-[#C79A2D]/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <div className="w-full h-full rounded-full bg-white dark:bg-[#1A1414] flex items-center justify-center">
                      <Icon className="w-10 h-10 text-[#7B1E1E] dark:text-[#C79A2D] group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <h3 className="font-bold text-2xl text-gray-900 dark:text-white group-hover:text-[#7B1E1E] dark:group-hover:text-[#C79A2D] transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-medium text-gray-800 dark:text-gray-400 leading-relaxed">
                    {adv.description}
                  </p>
                  {/* Decorative bottom line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-[#C79A2D]/0 via-[#C79A2D] to-[#C79A2D]/0 mx-auto rounded-full group-hover:w-20 transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyUsPage;
