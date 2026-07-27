'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  "/banner/banner-1.png",
  "/banner/banner-2.png",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mb-0">
      <div className="relative">

        <Image
          src={banners[current]}
          alt={`Banner ${current + 1}`}
          width={1920}
          height={700}
          priority
          className="w-full h-auto object-cover"
        />

        {/* Previous */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition"
        >
          <ChevronLeft className="w-6 h-6 text-[#790e03]" />
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition"
        >
          <ChevronRight className="w-6 h-6 text-[#790e03]" />
        </button>

        {/* Dots */}
        {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all ${current === i
                  ? "w-10 h-3 rounded-full bg-[#C79A2D]"
                  : "w-3 h-3 rounded-full bg-white"
                }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}