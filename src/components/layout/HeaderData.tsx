// src/components/layout/Header.tsx (partial – only the shared part)
import { ElementType } from 'react';
import {
  BookOpen,
  Sparkles,
  GraduationCap,
  FileText,
  Calendar,
  Trophy,
  HelpCircle,
} from 'lucide-react';

export type NavItemBase = {
  key: string;
  label: string;
};

export type DropdownItem = {
  key: string;
  icon: ElementType;
  color: string;
  hi: string;
  highlight?: boolean;
};

export type NavItemWithDropdown = NavItemBase & {
  dropdown: DropdownItem[];
  width?: string;
};

export type NavItem = NavItemBase | NavItemWithDropdown;

export const navigation: NavItem[] = [
  // Home
  {
    key: '/',
    label: 'होम',
  },
  // About
  {
    key: 'about',
    label: 'हमारे बारे में',
    width: 'w-64',
    dropdown: [
      {
        key: '/about',
        icon: BookOpen,
        color: 'text-[#790e03]',
        hi: 'ओलंपियाड परिचय',
      },
      {
        key: '/vision-mission',
        icon: Sparkles,
        color: 'text-[#C79A2D]',
        hi: 'दृष्टि एवं उद्देश्य',
      },
      {
        key: '/why-us',
        icon: GraduationCap,
        color: 'text-[#790e03]',
        hi: 'हमारी विशेषताएँ',
      },
    ],
  },
  // Exams
  {
    key: 'olympiads',
    label: 'परीक्षाएँ',
    width: 'w-72',
    dropdown: [
      {
        key: '/syllabus',
        icon: FileText,
        color: 'text-gray-500',
        hi: 'पाठ्यक्रम',
      },
      {
        key: '/exam-dates',
        icon: Calendar,
        color: 'text-gray-500',
        hi: 'परीक्षा कार्यक्रम',
      },
      {
        key: '/benchmark',
        icon: Trophy,
        color: 'text-[#C79A2D]',
        hi: 'परीक्षा प्रारूप',
      },
    ],
  },
  // Awards
  {
    key: '/awards',
    label: 'पुरस्कार एवं सम्मान',
  },
  // Student Zone
  {
    key: 'resources',
    label: 'विद्यार्थी मंच',
    width: 'w-64',
    dropdown: [
      {
        key: '/sample-papers',
        icon: FileText,
        color: 'text-gray-500',
        hi: 'मॉडल पेपर',
      },
      {
        key: '/performance-report',
        icon: Trophy,
        color: 'text-[#C79A2D]',
        hi: 'परिणाम',
      },
      {
        key: '/faqs',
        icon: HelpCircle,
        color: 'text-gray-500',
        hi: 'प्रश्नोत्तर',
      },
    ],
  },
  // Contact
  {
    key: '/contact',
    label: 'संपर्क करें',
  },
];