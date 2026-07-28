"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { TESTIMONIALS } from "@/data/olympiadData";
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquareQuote } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

export const TestimonialsSection: React.FC = () => {
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
      const gap = 24; // gap-6 = 1.5rem = 24px
      const computedCardWidth = (containerWidth - gap * (cardsPerView - 1)) / cardsPerView;
      setCardWidth(computedCardWidth + gap); // width + gap for translate
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
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-amber-50/80 mb-0">
      {/* Decorative pattern */}
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
          icon={MessageSquareQuote}
          badge="प्रधानाचार्य व विजेताओं के विचार"
          title="शिक्षाविदों एवं छात्रों का अनुभव"
        />


        {/* Carousel */}
        <div className="relative">
          <div
            ref={containerRef}
            className="overflow-hidden"
          >
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
            >
              {TESTIMONIALS.map((ts) => (
                <div
                  key={ts.id}
                  className="flex-shrink-0 bg-white rounded-2xl shadow-lg border border-blue-200/60 p-6 flex flex-col justify-between mb-4"
                  style={{ width: cardWidth ? `${cardWidth - 24}px` : "auto" }}
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {[...Array(ts.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-slate-800 font-devanagari leading-relaxed">
                      “{ts.quote}”
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 mt-4 border-t border-amber-200/50">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-lime-300 flex-shrink-0">
                      <img
                        src={ts.avatar}
                        alt={ts.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-red-950 text-lg truncate">{ts.name}</h4>
                      <p className="text-base text-amber-700 truncate">{ts.role}</p>
                      {/* <p className="text-[10px] text-slate-500 truncate">{ts.school}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation – only show if more than cardsPerView */}
          {total > cardsPerView && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white/90 hover:bg-white border-2 border-amber-300/60 rounded-full p-2 shadow-lg transition-all hover:scale-110 z-20"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-red-800" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white/90 hover:bg-white border-2 border-amber-300/60 rounded-full p-2 shadow-lg transition-all hover:scale-110 z-20"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-red-800" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {total > cardsPerView && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex
                    ? "w-8 bg-red-800"
                    : "w-2.5 bg-amber-300 hover:bg-amber-400"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;