'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { KEY_STATS } from '@/data/olympiadData';

// Custom hook to animate a number from 0 to target
const useCounter = (target: number, duration: number = 2000, shouldStart: boolean) => {
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
  return num.toLocaleString('en-IN');
};

export const StatsSection: React.FC = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Define which stats to display – you can add/remove any field from KEY_STATS
  const stats = [
    {
      key: 'students',
      target: KEY_STATS.studentsParticipated,
      label: language === 'hi' ? 'पंजीकृत छात्र' : 'Students Participated',
      suffix: '+',
    },
    {
      key: 'schools',
      target: KEY_STATS.schoolsRegistered,
      label: language === 'hi' ? 'सहयोगी विद्यालय' : 'Affiliated Schools',
      suffix: '+',
    },
    {
      key: 'states',
      target: KEY_STATS.statesCovered,
      label: language === 'hi' ? 'राज्य व केंद्रशासित प्रदेश' : 'States Covered',
      suffix: '',
    },
    {
      key: 'scholarships',
      target: KEY_STATS.scholarshipsDistributedInLakhs,
      label: language === 'hi' ? 'छात्रवृत्ति व पुरस्कार वितरित' : 'Scholarships Distributed',
      prefix: '₹',
      suffix: 'L+',
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
    useCounter(stat.target, 2000, isVisible)
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[#7B1E1E] via-[#8B2525] to-[#5a1515] text-[#F5F0E6] py-14 border-y-4 border-[#C79A2D] shadow-inner overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C79A2D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, index) => {
            const count = counters[index] || 0;
            const displayValue = stat.prefix
              ? `${stat.prefix}${formatNumber(count)}${stat.suffix}`
              : `${formatNumber(count)}${stat.suffix}`;

            return (
              <div
                key={stat.key}
                className="group relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-[#C79A2D]/20 hover:border-[#C79A2D]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(199,154,45,0.15)] hover:-translate-y-1"
              >
                {/* Glowing dot decoration */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C79A2D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#C79A2D]"></div>

                <div className="flex flex-col items-center space-y-1.5">
                  {/* Counter */}
                  <div className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#C79A2D] tracking-tight">
                    {displayValue}
                  </div>

                  {/* Label */}
                  <div className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider opacity-90 group-hover:text-[#C79A2D] transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>

                {/* Bottom glowing line on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#C79A2D] to-transparent group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};