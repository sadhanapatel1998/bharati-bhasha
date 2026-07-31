'use client';

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Home,
  BookOpen,
  Sparkles,
  GraduationCap,
  Award,
  Calendar,
  FileText,
  Trophy,
  HelpCircle,
  Phone,
  Mail,
  Globe,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import { navigation, NavItem, NavItemWithDropdown } from "./HeaderData";

export const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { language, navigateTo } = useApp();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = (route: string) => {
    navigateTo(route);
    onClose();
  };

  // Helper to map top-level keys to icons for section headings
  const getSectionIcon = (key: string) => {
    switch (key) {
      case '/': return Home;
      case 'about': return BookOpen;
      case 'olympiads': return FileText;
      case '/awards': return Award;
      case 'resources': return HelpCircle;
      case '/contact': return Phone;
      default: return ChevronRight;
    }
  };

  // Build sections from navigation
  const sections = navigation.map((item) => {
    const Icon = getSectionIcon(item.key);
    const isDropdown = 'dropdown' in item;
    const dropdownItems = isDropdown ? (item as NavItemWithDropdown).dropdown : [];
    return {
      heading: item.label,
      key: item.key,
      icon: Icon,
      isDropdown,
      items: isDropdown
        ? dropdownItems.map((sub) => ({
            label: sub.hi,
            route: sub.key,
            icon: sub.icon,
            color: sub.color,
          }))
        : [{ label: item.label, route: item.key, icon: Icon, color: 'text-[#7B1E1E]' }],
    };
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-[#121010] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-200/40 dark:border-gray-800 bg-gradient-to-r from-amber-50/80 to-white dark:from-[#1A1414] dark:to-[#121010]">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md flex-shrink-0">
              <Image
                src="/logo/logo.png"
                alt={'भारती भाषा ओलंपियाड लोगो'}
                fill
                priority
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-playfair font-bold text-base text-[#7B1E1E] dark:text-[#C79A2D]">
                भारती भाषा ओलंपियाड
              </span>
              <p className="text-[10px] font-bold tracking-wide text-[#12244c] dark:text-gray-400 mt-0">
                {'अपनी भाषा, अपनी पहचान'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-amber-100/50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-6 flex-1 overflow-y-auto">
          {sections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.key}>
                <h3 className="text-lg font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 px-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#C79A2D] rounded-full"></span>
                  <span>{section.heading}</span>
                </h3>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.route}
                        onClick={() => handleLinkClick(item.route)}
                        className="w-full text-left px-3 py-2.5 text-base rounded-xl hover:bg-amber-100/50 dark:hover:bg-white/5 font-medium flex items-center gap-3 transition-all duration-200 group"
                      >
                        <ItemIcon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                        <span className="text-gray-800 dark:text-gray-200 group-hover:text-[#7B1E1E] dark:group-hover:text-[#C79A2D] transition-colors">
                          {item.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-amber-50/60 dark:bg-[#1A1414] border-t border-amber-200/30 dark:border-gray-800 text-base space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600 dark:text-gray-400">मातृभाषा:</span>
            <div className="font-bold text-[#7B1E1E] dark:text-[#C79A2D] flex items-center gap-1">
              <Globe className="w-4 h-4" />
              हिन्दी (देवनागरी)
            </div>
          </div>
          <div className="text-gray-500 pt-1 space-y-1.5 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C79A2D]" />
              <span>टोल-फ्री: 1800-123-9876</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C79A2D]" />
              <span>info@bharatibhasha.org</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;