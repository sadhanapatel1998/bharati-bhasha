/**
 * Every editable website block lives here.
 *
 * `fallback` points at the ORIGINAL hard-coded data that already ships with the
 * site, so nothing ever disappears: if a block has not been seeded into MongoDB
 * yet (or the DB is unreachable) the site renders exactly what it rendered
 * before. `npm run seed:content` copies these same values into the database so
 * the super admin can edit them.
 */
import {
  HERO_BANNERS,
  HERO_SETTINGS,
  KEY_STATS,
  ANNOUNCEMENTS,
  EXAM_SCHEDULE,
  EXAM_SCHEDULES,
  EXAM_DETAILS,
  SYLLABUS_DATA,
  REGISTRATION_STEPS,
  SAMPLE_PAPERS,
  TESTIMONIALS,
  PARTNER_SCHOOLS,
  FAQS,
  BLOG_POSTS,
  GALLERY_ITEMS,
  STATE_PARTICIPATION_DATA,
  FOUR_PILLARS,
  NEP_2020_PILLARS,
  AWARDS_DATA,
  WHY_US_DATA,
  VISION_MISSION,
  DOWNLOADS,
  BOARD_OPTIONS,
  COUNTRY_OPTIONS,
} from './olympiadData';

export type ContentGroup = 'homepage' | 'exams' | 'academics' | 'community' | 'pages' | 'config';

export interface ContentBlockDef {
  key: string;
  label: string;
  labelHi: string;
  group: ContentGroup;
  /** 'list' renders a repeatable-row editor, 'object' a single field form, 'raw' a JSON editor */
  shape: 'list' | 'object' | 'raw';
  fallback: unknown;
  /** for 'list' blocks — which field is shown as the row title */
  titleField?: string;
}

export const CONTENT_BLOCKS: ContentBlockDef[] = [
  /* ---------------- homepage ---------------- */
  {
    key: 'hero_banners',
    label: 'Hero banners',
    labelHi: 'मुख्य बैनर',
    group: 'homepage',
    shape: 'list',
    titleField: 'alt',
    fallback: HERO_BANNERS,
  },
  {
    key: 'hero_settings',
    label: 'Hero slider settings',
    labelHi: 'बैनर स्लाइडर सेटिंग्स',
    group: 'homepage',
    shape: 'object',
    fallback: HERO_SETTINGS,
  },
  {
    key: 'key_stats',
    label: 'Homepage counters',
    labelHi: 'मुखपृष्ठ आँकड़े',
    group: 'homepage',
    shape: 'object',
    fallback: KEY_STATS,
  },
  {
    key: 'announcements_ticker',
    label: 'Announcement ticker',
    labelHi: 'घोषणा पट्टी',
    group: 'homepage',
    shape: 'list',
    titleField: 'text',
    fallback: ANNOUNCEMENTS,
  },
  {
    key: 'four_pillars',
    label: 'Four pillars',
    labelHi: 'चार स्तंभ',
    group: 'homepage',
    shape: 'list',
    titleField: 'title',
    fallback: FOUR_PILLARS,
  },
  {
    key: 'state_participation',
    label: 'State participation map',
    labelHi: 'राज्यवार सहभागिता',
    group: 'homepage',
    shape: 'list',
    titleField: 'state',
    fallback: STATE_PARTICIPATION_DATA,
  },

  /* ---------------- exams ---------------- */
  {
    key: 'exam_schedule',
    label: 'Exam date list',
    labelHi: 'परीक्षा तिथि सूची',
    group: 'exams',
    shape: 'list',
    titleField: 'title',
    fallback: EXAM_SCHEDULE,
  },
  {
    key: 'exam_schedules_subject',
    label: 'Subject-wise schedule',
    labelHi: 'विषयवार सारिणी',
    group: 'exams',
    shape: 'raw',
    fallback: EXAM_SCHEDULES,
  },
  {
    key: 'exam_details',
    label: 'Exam key information',
    labelHi: 'परीक्षा मुख्य जानकारी',
    group: 'exams',
    shape: 'raw',
    fallback: EXAM_DETAILS,
  },
  {
    key: 'registration_steps',
    label: 'Registration steps',
    labelHi: 'पंजीकरण चरण',
    group: 'exams',
    shape: 'list',
    titleField: 'title',
    fallback: REGISTRATION_STEPS,
  },

  /* ---------------- academics ---------------- */
  {
    key: 'syllabus',
    label: 'Syllabus',
    labelHi: 'पाठ्यक्रम',
    group: 'academics',
    shape: 'raw',
    fallback: SYLLABUS_DATA,
  },
  {
    key: 'sample_papers',
    label: 'Sample papers',
    labelHi: 'सैंपल पेपर',
    group: 'academics',
    shape: 'list',
    titleField: 'title',
    fallback: SAMPLE_PAPERS,
  },
  {
    key: 'downloads',
    label: 'Downloads (PDF)',
    labelHi: 'डाउनलोड (PDF)',
    group: 'academics',
    shape: 'object',
    fallback: DOWNLOADS,
  },
  {
    key: 'nep_pillars',
    label: 'NEP 2020 pillars',
    labelHi: 'एनईपी 2020 स्तंभ',
    group: 'academics',
    shape: 'list',
    titleField: 'title',
    fallback: NEP_2020_PILLARS,
  },

  /* ---------------- community ---------------- */
  {
    key: 'testimonials',
    label: 'Testimonials',
    labelHi: 'प्रशंसापत्र',
    group: 'community',
    shape: 'list',
    titleField: 'name',
    fallback: TESTIMONIALS,
  },
  {
    key: 'partner_schools',
    label: 'Partner schools',
    labelHi: 'संबद्ध विद्यालय',
    group: 'community',
    shape: 'list',
    titleField: 'name',
    fallback: PARTNER_SCHOOLS,
  },
  {
    key: 'faqs',
    label: 'FAQs',
    labelHi: 'सामान्य प्रश्न',
    group: 'community',
    shape: 'list',
    titleField: 'question',
    fallback: FAQS,
  },
  {
    key: 'blog_posts',
    label: 'Blog posts',
    labelHi: 'ब्लॉग लेख',
    group: 'community',
    shape: 'list',
    titleField: 'title',
    fallback: BLOG_POSTS,
  },
  {
    key: 'gallery',
    label: 'Gallery',
    labelHi: 'चित्र वीथिका',
    group: 'community',
    shape: 'list',
    titleField: 'title',
    fallback: GALLERY_ITEMS,
  },

  /* ---------------- pages ---------------- */
  {
    key: 'awards_page',
    label: 'Awards page',
    labelHi: 'पुरस्कार पृष्ठ',
    group: 'pages',
    shape: 'raw',
    fallback: AWARDS_DATA,
  },
  {
    key: 'why_us_page',
    label: 'Why us page',
    labelHi: 'हमें क्यों चुनें',
    group: 'pages',
    shape: 'raw',
    fallback: WHY_US_DATA,
  },
  {
    key: 'vision_mission_page',
    label: 'Vision & mission page',
    labelHi: 'दृष्टि एवं ध्येय',
    group: 'pages',
    shape: 'raw',
    fallback: VISION_MISSION,
  },

  /* ---------------- config ---------------- */
  {
    key: 'board_options',
    label: 'Board options',
    labelHi: 'बोर्ड विकल्प',
    group: 'config',
    shape: 'raw',
    fallback: BOARD_OPTIONS,
  },
  {
    key: 'country_options',
    label: 'Country options',
    labelHi: 'देश विकल्प',
    group: 'config',
    shape: 'raw',
    fallback: COUNTRY_OPTIONS,
  },
];

export const blockByKey = (key: string) => CONTENT_BLOCKS.find((b) => b.key === key);

/** The original data for a key — used as the render fallback everywhere. */
export function contentFallback<T>(key: string, override?: T): T {
  if (override !== undefined && override !== null) return override;
  return blockByKey(key)?.fallback as T;
}
