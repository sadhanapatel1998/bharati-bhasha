'use client';

import { ChevronDown, Search, HelpCircle, ScrollText, Sparkles } from 'lucide-react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

export const SanskritSubject: React.FC = () => {

  return (
    <section className="mb-0 relative pb-16 overflow-hidden">
      {/* Decorative background pattern */}
      <div
        className="
    absolute inset-0 pointer-events-none opacity-[0.04]
    bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
    bg-[length:60px_60px,80px_80px]
    bg-[position:0_0,40px_40px]
  "
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-14 z-10">
        <Breadcrumb
          title="संस्कृत"
          items={[
            {
              label: "विषय",
              route: "#",
            },
            {
              label: "संस्कृत ",
            },
          ]}
        />
      </div>

      {/* ============ Message: Sample Paper coming soon ============ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative overflow-hidden rounded-3xl
          p-8 sm:p-12 text-center">

          {/* Message heading */}
          <h3 className="relative font-playfair text-2xl sm:text-3xl font-bold text-[#052B6B] mb-3">
            प्रतिदर्श प्रश्नपत्र
          </h3>

          {/* Hindi message only */}
          <p className="relative text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto font-devanagari">
            संस्कृत विषय का प्रतिदर्श प्रश्नपत्र जल्द ही उपलब्ध कराया जाएगा। कृपया प्रतीक्षा करें।
          </p>

          {/* Decorative divider */}
          <div className="relative flex items-center justify-center gap-3 mt-6">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#C79A2D]" />
            <span className="w-2 h-2 rotate-45 bg-[#C79A2D]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#C79A2D]" />
          </div>

          {/* Small hint text */}
          <p className="relative mt-4 text-sm text-amber-700 font-semibold tracking-wide uppercase">
            भारती भाषा ओलंपियाड · संस्कृत
          </p>
        </div>
      </div>

    </section>
  );
};

export default SanskritSubject;