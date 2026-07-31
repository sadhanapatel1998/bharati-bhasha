'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface BreadcrumbProps {
  title: string;
  items: {
    label: string;
    route?: string;
  }[];
}
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  items,
}) => {
  const { navigateTo } = useApp();

  return (
    <div className="relative mx-auto max-w-7xl h-[200px] md:h-[300px] overflow-hidden rounded-2xl mb-10">
      <Image
        src="/banner/breadcrumb.jpg"
        alt={title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-white/15" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

        <h1 className="mb-4 font-devanagari text-3xl md:text-5xl font-bold text-[#0F2B5B]">
          {title}
        </h1>

        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 flex-wrap rounded-full border border-[#7B1E1E]/10 bg-white/90 px-3 py-1.5 w-fit max-w-full"
        >
          <button
            onClick={() => navigateTo("/")}
            className="cursor-pointer flex items-center gap-1.5 px-2 py-1 rounded-full hover:text-[#7B1E1E]"
          >
            <Home className="w-4 h-4" />
            <span>मुखपृष्ठ</span>
          </button>

          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight
                className={`w-3 h-3 text-gray-400 ${item.route ? "hidden md:block" : ""
                  }`}
              />

              {item.route ? (
                <button
                  onClick={() => navigateTo(item.route!)}
                  className="hidden md:block px-2 py-1 hover:text-[#7B1E1E]"
                >
                  {item.label}
                </button>
              ) : (
                <span className="px-2 py-1 font-semibold text-[#7B1E1E]">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

      </div>

    </div>
  );
};