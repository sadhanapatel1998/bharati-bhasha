'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface CtaSectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonRoute: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  backgroundImage?: string;
  className?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title,
  description,
  buttonText,
  buttonRoute,
  badge,
  badgeIcon = <Sparkles className="w-3.5 h-3.5" />,
  backgroundImage ="/banner/cta-bg.jpg",
  className = '',
}) => {
  const { navigateTo } = useApp();

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#C79A2D]/20 text-[#F5F0E6] p-8 sm:p-12 shadow-2xl ${className}`}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="CTA Background"
          fill
          priority
          className=""
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-[#061A40]/75 via-[#0B2E63]/45 to-[#020817]/20" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#C79A2D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#C79A2D]/5 rounded-full blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #C79A2D 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
        {badge && (
          <div className="inline-flex items-center gap-2 pt-1 pb-0 bg-[#C79A2D]/20 border border-[#C79A2D] text-[#C79A2D] px-3.5 py-1 rounded-full text-[13px] font-bold uppercase tracking-wider">
            {badgeIcon}
            <span>{badge}</span>
          </div>
        )}

        <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
          {title}
        </h2>

        {description && (
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto font-semibold">
            {description}
          </p>
        )}

        <button
          onClick={() => navigateTo(buttonRoute)}
          className="inline-flex items-center gap-2.5 px-8 pt-4 pb-3  bg-[#C79A2D] hover:bg-[#E2B855] text-[#1A1212] font-bold text-base rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CtaSection;