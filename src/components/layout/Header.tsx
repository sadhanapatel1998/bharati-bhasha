'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Image from 'next/image';
import { LogIn, Menu, ChevronDown, GraduationCap, BookOpen, Trophy, FileText, Calendar, HelpCircle, Sparkles } from 'lucide-react';

// Type definitions for navigation items
type NavItemBase = {
  key: string;
  label: string;
};

type NavItemWithDropdown = NavItemBase & {
  dropdown: DropdownItem[];
  width?: string;
};

type DropdownItem = {
  key: string;
  icon: React.ElementType;
  color: string;
  hi: string;
  highlight?: boolean;
};

type NavItem = NavItemBase | NavItemWithDropdown;

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    currentRoute,
    navigateTo,
    setIsSearchOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: string) => {
    navigateTo(route);
    setActiveDropdown(null);
    setIsRegisterOpen(false);
  };

  // ---- Updated navigation to match the desired menu ----
  const navigation: NavItem[] = [
    // 🏠
    {
      key: "/",
      label: "होम"
    },

    // 📖
    {
      key: "about",
      label: "हमारे बारे में",
      width: "w-64",
      dropdown: [
        {
          key: "/about",
          icon: BookOpen,
          color: "text-[#790e03]",
          hi: "ओलंपियाड परिचय",
        },
        {
          key: "/vision-mission",
          icon: Sparkles,
          color: "text-[#C79A2D]",
          hi: "दृष्टि एवं उद्देश्य",
        },
        {
          key: "/why-us",
          icon: GraduationCap,
          color: "text-[#790e03]",
          hi: "हमारी विशेषताएँ",
        },
      ],
    },

    // 📝
    {
      key: "olympiads",
      label: "परीक्षाएँ",
      width: "w-72",
      dropdown: [
        {
          key: "/hindi-olympiad",
          icon: GraduationCap,
          color: "text-[#790e03]",
          hi: "हिंदी ओलंपियाड",
        },
        {
          key: "/sanskrit-olympiad",
          icon: GraduationCap,
          color: "text-[#C79A2D]",
          hi: "संस्कृत ओलंपियाड",
        },
        {
          key: "/syllabus",
          icon: FileText,
          color: "text-gray-500",
          hi: "पाठ्यक्रम",
        },
        {
          key: "/exam-dates",
          icon: Calendar,
          color: "text-gray-500",
          hi: "परीक्षा कार्यक्रम",
        },
        {
          key: "/benchmark",
          icon: Trophy,
          color: "text-[#C79A2D]",
          hi: "परीक्षा प्रारूप",
        },
      ],
    },

    // 🏆
    {
      key: "/awards",
      label: "पुरस्कार",
    },

    // 👨‍🎓
    {
      key: "resources",
      label: "विद्यार्थी मंच",
      width: "w-64",
      dropdown: [
        {
          key: "/sample-papers",
          icon: FileText,
          color: "text-gray-500",
          hi: "नमूना प्रश्नपत्र",
        },
        {
          key: "/performance-report",
          icon: Trophy,
          color: "text-[#C79A2D]",
          hi: "परिणाम",
        },
        {
          key: "/downloads",
          icon: FileText,
          color: "text-gray-500",
          hi: "डाउनलोड",
        },
        {
          key: "/faqs",
          icon: HelpCircle,
          color: "text-gray-500",
          hi: "प्रश्नोत्तर",
        },
      ],
    },

    // 📞
    {
      key: "/contact",
      label: "संपर्क करें",
    },
  ];
  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
        ? 'bg-white shadow-md py-2.5'
        : 'bg-[#FAFAF8] dark:bg-[#121010] py-2 border-b border-[#790e03]/10 dark:border-white/10'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Emblem */}
        <div
          className="flex items-center gap-3 cursor-pointer group justify-center"
          onClick={() => handleNavClick('/')}
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20 cursor-pointer group">
            <Image
              src="/logo/logo.png"
              alt={'भारती भाषा ओलंपियाड लोगो'}
              fill
              priority
              sizes="(max-width: 768px) 64px, 80px"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className='hidden sm:block'>
            <h1 className="mt-2 font-playfair font-bold text-xl leading-none tracking-tight text-[#790e03] dark:text-[#F5F0E6]">
              भारती भाषा <span className="text-[#C79A2D]">ओलंपियाड</span>
            </h1>
            <p className="text-[14px] font-bold tracking-wide text-[#12244c] dark:text-gray-400 mt-1">
              {'अपनी भाषा, अपनी पहचान'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navigation.map((item) => {
            if (!('dropdown' in item)) {
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`px-3 py-2 rounded-lg text-base font-semibold transition-colors font-poppins ${currentRoute === item.key
                    ? 'text-[#790e03] dark:text-[#C79A2D] bg-[#790e03]/5 dark:bg-[#C79A2D]/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#790e03] dark:hover:text-[#C79A2D]'
                    }`}
                >
                  {item.label}
                </button>
              );
            }

            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 font-poppins rounded-lg text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#790e03] dark:hover:text-[#C79A2D] transition-colors">
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeDropdown === item.key && (
                  <div className={`absolute top-full left-0 ${item.width} pt-2 z-50`}>
                    <div className="bg-white dark:bg-[#1A1414] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 space-y-1">
                      {item.dropdown.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <button
                            key={sub.key}
                            onClick={() => handleNavClick(sub.key)}
                            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#790e03]/5 dark:hover:bg-white/5 flex items-center gap-2 ${sub.highlight ? 'font-bold text-[#790e03] dark:text-[#C79A2D]' : 'font-medium'
                              }`}
                          >
                            <Icon
                              className={`w-4 h-4 ${sub.color} ${sub.highlight ? 'animate-pulse' : ''}`}
                            />
                            {sub.hi}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Tools & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              onClick={() => handleNavClick("/school-login")}
              className="bg-gradient-to-r from-[#790e03] to-[#A32A2A] hover:from-[#541313] hover:to-[#790e03] text-[#F5F0E6] px-5 pt-3 pb-2 md:pt-4 md:pb-3 rounded-xl text-medium font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 glow-gold"
            >
              <LogIn className="w-4 h-4 text-[#ffd36b]" />
              <span>विद्यालय लॉगिन</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => handleNavClick("/school-login")}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;