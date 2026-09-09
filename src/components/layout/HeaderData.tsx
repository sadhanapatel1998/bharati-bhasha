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
  label: 'पाठ्यक्रम',
  width: 'w-64',
  dropdown: [
    {
      key: '/hindi-syllabus',
      icon: FileText,
      color: 'text-[#7B1E1E]',
      hi: 'हिंदी पाठ्यक्रम',
    },
    {
      key: '/sanskrit-syllabus',  
      icon: FileText,
      color: 'text-[#C79A2D]',
      hi: 'संस्कृत पाठ्यक्रम',
    },
  ],
},
  // Awards
  {
    key: '/awards',
    label: 'पुरस्कार एवं सम्मान',
  },
  // Contact
  {
    key: '/contact',
    label: 'संपर्क करें',
  },
];