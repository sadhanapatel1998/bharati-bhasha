"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { TESTIMONIALS as TESTIMONIALS_STATIC } from "@/data/olympiadData";
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquareQuote } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

import { useSiteContent } from '@/hooks/useSiteContent';

// 6 colorful themes for cards
const CARD_THEMES = [
  {
    // 1. Blue
    cardBg: "bg-gradient-to-br from-blue-50 to-blue-100",
    border: "border-blue-300",
    starColor: "text-blue-500",
    quoteColor: "text-blue-600",
    nameColor: "text-blue-900",
    roleColor: "text-blue-600",
    avatarRing: "ring-blue-400",
    dot: "bg-blue-500",
    shadow: "shadow-blue-300/40",
    divider: "border-blue-200",
    blob1: "bg-blue-300/40",
    blob2: "bg-cyan-300/40",
  },
  {
    // 2. Orange
    cardBg: "bg-gradient-to-br from-orange-50 to-amber-100",
    border: "border-orange-300",
    starColor: "text-orange-500",
    quoteColor: "text-orange-600",
    nameColor: "text-orange-900",
    roleColor: "text-orange-600",
    avatarRing: "ring-orange-400",
    dot: "bg-orange-500",
    shadow: "shadow-orange-300/40",
    divider: "border-orange-200",
    blob1: "bg-orange-300/40",
    blob2: "bg-amber-300/40",
  },
  {
    // 3. Purple
    cardBg: "bg-gradient-to-br from-purple-50 to-fuchsia-100",
    border: "border-purple-300",
    starColor: "text-purple-500",
    quoteColor: "text-purple-600",
    nameColor: "text-purple-900",
    roleColor: "text-purple-600",
    avatarRing: "ring-purple-400",
    dot: "bg-purple-500",
    shadow: "shadow-purple-300/40",
    divider: "border-purple-200",
    blob1: "bg-purple-300/40",
    blob2: "bg-fuchsia-300/40",
  },
  {
    // 4. Green
    cardBg: "bg-gradient-to-br from-green-50 to-emerald-100",
    border: "border-green-300",
    starColor: "text-green-500",
    quoteColor: "text-green-600",
    nameColor: "text-green-900",
    roleColor: "text-green-600",
    avatarRing: "ring-green-400",
    dot: "bg-green-500",
    shadow: "shadow-green-300/40",
    divider: "border-green-200",
    blob1: "bg-green-300/40",
    blob2: "bg-emerald-300/40",
  },
  {
    // 5. Rose
    cardBg: "bg-gradient-to-br from-rose-50 to-pink-100",
    border: "border-rose-300",
    starColor: "text-rose-500",
    quoteColor: "text-rose-600",
    nameColor: "text-rose-900",
    roleColor: "text-rose-600",
    avatarRing: "ring-rose-400",
    dot: "bg-rose-500",
    shadow: "shadow-rose-300/40",
    divider: "border-rose-200",
    blob1: "bg-rose-300/40",
    blob2: "bg-pink-300/40",
  },
  {
    // 6. Cyan
    cardBg: "bg-gradient-to-br from-cyan-50 to-sky-100",
    border: "border-cyan-300",
    starColor: "text-cyan-500",
    quoteColor: "text-cyan-600",
    nameColor: "text-cyan-900",
    roleColor: "text-cyan-600",
    avatarRing: "ring-cyan-400",
    dot: "bg-cyan-500",
    shadow: "shadow-cyan-300/40",
    divider: "border-cyan-200",
    blob1: "bg-cyan-300/40",
    blob2: "bg-sky-300/40",
  },
];

export const TestimonialsSection: React.FC = () => {
  const TESTIMONIALS = useSiteContent<typeof TESTIMONIALS_STATIC>('testimonials', TESTIMONIALS_STATIC);
  const { language } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);

  const total = TESTIMONIALS.length;
  const maxIndex = Math.max(0, total - cardsPerView);

  // Responsive breakpoints
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerView(1);
      else if (width < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Calculate card width including gap
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const gap = 24;
      const computedCardWidth = (containerWidth - gap * (cardsPerView - 1)) / cardsPerView;
      setCardWidth(computedCardWidth + gap);
    }
  }, [cardsPerView]);

  // Auto-play
  useEffect(() => {
    if (total <= cardsPerView) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [total, cardsPerView, maxIndex]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative py-16 overflow-hidden mb-0 bg-white
      ">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <SectionHeader
          icon={MessageSquareQuote}
          badge="प्रधानाचार्य व विजेताओं के विचार"
          title="शिक्षाविदों एवं छात्रों का अनुभव"
        />

        {/* Carousel */}
        <div className="relative">
          <div
            ref={containerRef}
            className="overflow-hidden py-4"
          >
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: cardWidth ? `translateX(-${currentIndex * cardWidth}px)` : undefined }}
            >
              {TESTIMONIALS.map((ts, idx) => {
                const theme = CARD_THEMES[idx % CARD_THEMES.length];
                return (
                  <div
                    key={ts.id}
                    className={`group relative flex-shrink-0 rounded-2xl
                      ${theme.cardBg} ${theme.border} ${theme.shadow}
                      border-2 shadow-lg p-6 flex flex-col justify-between mb-4
                      transition-all duration-500
                      hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}
                    style={{ width: cardWidth ? `${cardWidth - 24}px` : "auto" }}
                  >
                    {/* Decorative inner blobs */}
                    <div className={`pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full ${theme.blob1} blur-3xl opacity-70 group-hover:scale-150 transition-transform duration-700`} />
                    <div className={`pointer-events-none absolute -bottom-10 -left-10 w-28 h-28 rounded-full ${theme.blob2} blur-3xl opacity-70 group-hover:scale-150 transition-transform duration-700`} />

                    {/* Decorative quote icon */}
                    <Quote
                      className={`absolute top-3 right-3 w-10 h-10 ${theme.quoteColor} opacity-15 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500`}
                    />

                    <div className="relative z-10">
                      {/* Colorful stars */}
                      <div className={`flex items-center gap-1 ${theme.starColor} mb-3`}>
                        {[...Array(ts.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>

                      {/* Quote text */}
                      <p className="text-lg text-slate-800 font-devanagari leading-relaxed">
                        "{ts.quote}"
                      </p>
                    </div>

                    {/* Footer with avatar */}
                    <div className={`relative z-10 flex items-center gap-3 pt-4 mt-4 border-t ${theme.divider}`}>
                      <div className={`relative w-11 h-11 rounded-full overflow-hidden ring-2 ${theme.avatarRing} flex-shrink-0`}>
                        <img
                          src={ts.avatar}
                          alt={ts.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className={`font-bold ${theme.nameColor} text-lg truncate`}>
                          {ts.name}
                        </h4>
                        <p className={`text-base ${theme.roleColor} truncate font-semibold`}>
                          {ts.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation buttons */}
          {total > cardsPerView && (
            <>
              <button
                onClick={goToPrev}
                className="group absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6
                  bg-white/95 hover:bg-white border-2 border-amber-300/60 hover:border-amber-500
                  rounded-full p-2 shadow-lg hover:shadow-xl
                  transition-all duration-300 hover:scale-110 z-20"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-red-800 group-hover:text-red-900 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={goToNext}
                className="group absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6
                  bg-white/95 hover:bg-white border-2 border-amber-300/60 hover:border-amber-500
                  rounded-full p-2 shadow-lg hover:shadow-xl
                  transition-all duration-300 hover:scale-110 z-20"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-red-800 group-hover:text-red-900 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {total > cardsPerView && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
              const dotTheme = CARD_THEMES[idx % CARD_THEMES.length];
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? `w-8 ${dotTheme.dot}`
                      : `w-2.5 bg-amber-300 hover:bg-amber-400`
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;