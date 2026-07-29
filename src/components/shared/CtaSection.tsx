'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, ChevronRight, ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  /** Main headline (e.g. "अभी पंजीकरण करें") */
  title: string;
  /** Supporting description */
  description?: string;
  /** Button label */
  buttonText: string;
  /** Route to navigate to on click */
  buttonRoute: string;
  /** Optional badge text (e.g. "नवीनतम सूचना") */
  badge?: string;
  /** Optional icon for the badge (default Sparkles) */
  badgeIcon?: React.ReactNode;
  /** Optional additional className */
  className?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title,
  description,
  buttonText,
  buttonRoute,
  badge,
  badgeIcon = <Sparkles className="w-3.5 h-3.5" />,
  className = '',
}) => {
  const { navigateTo, language } = useApp();

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7B1E1E] to-[#541313] text-[#F5F0E6] p-8 sm:p-12 shadow-2xl border border-[#C79A2D]/20 ${className}`}
    >
      {/* Decorative glow (top-right) */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#C79A2D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#C79A2D]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle gold dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #C79A2D 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
        {/* Badge (optional) */}
        {badge && (
          <div className="inline-flex items-center gap-2 bg-[#C79A2D]/20 border border-[#C79A2D]/40 text-[#C79A2D] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {badgeIcon}
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* CTA Button */}
        <button
          onClick={() => navigateTo(buttonRoute)}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#C79A2D] hover:bg-[#E2B855] text-[#1A1212] font-bold text-base rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CtaSection;