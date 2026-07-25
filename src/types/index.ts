export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark';

export type PageRoute = 
  | 'home'
  | 'about'
  | 'vision-mission'
  | 'why-us'
  | 'nep-2020'
  | 'hindi-olympiad'
  | 'sanskrit-olympiad'
  | 'benefits'
  | 'awards'
  | 'scholarships'
  | 'benchmark-assessment'
  | 'performance-report'
  | 'registration'
  | 'school-registration'
  | 'student-registration'
  | 'teacher-registration'
  | 'process'
  | 'exam-pattern'
  | 'exam-dates'
  | 'syllabus'
  | 'sample-papers'
  | 'mock-test'
  | 'faqs'
  | 'gallery'
  | 'events-news'
  | 'blogs'
  | 'blog-detail'
  | 'testimonials'
  | 'partners-schools'
  | 'contact'
  | 'careers'
  | 'privacy-terms'
  | 'sitemap'
  | '404'
  | 'coming-soon';

export interface FAQItem {
  id: string;
  question: { en: string; hi: string };
  answer: { en: string; hi: string };
  category: 'general' | 'exam' | 'registration' | 'awards';
}

export interface ExamDateItem {
  id: string;
  title: { en: string; hi: string };
  subject: 'Hindi' | 'Sanskrit' | 'Both';
  date: string;
  time: string;
  mode: 'Online (School Portal)' | 'Offline (OMR Based)';
  eligibleClasses: string;
}

export interface SyllabusItem {
  classLevel: string;
  hindiTopics: string[];
  sanskritTopics: string[];
  totalQuestions: number;
  durationMinutes: number;
  totalMarks: number;
}

export interface SamplePaper {
  id: string;
  title: string;
  subject: 'Hindi' | 'Sanskrit' | 'हिंदी' | 'संस्कृत';
  classLevel: string;
  year: string;
  questionsCount: number;
  pdfUrl: string;
}

export interface MockQuestion {
  id: number;
  question: { en: string; hi: string };
  options: { en: string[]; hi: string[] };
  correctIndex: number;
  explanation: { en: string; hi: string };
  category: string;
}

export interface BlogPost {
  id: string;
  title: { en: string; hi: string };
  excerpt: { en: string; hi: string };
  content: { en: string; hi: string };
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface PartnerSchool {
  id: string;
  name: string;
  city: string;
  state: string;
  studentsCount: number;
  logo: string;
  rating: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  school: string;
  state: string;
  quote: { en: string; hi: string };
  rating: number;
  avatar: string;
  videoUrl?: string;
}

export interface AwardItem {
  id: string;
  rank: string;
  title: { en: string; hi: string };
  cashPrize: string;
  perks: { en: string[]; hi: string[] };
  iconName: string;
}

export interface StudentReport {
  rollNumber: string;
  studentName: string;
  schoolName: string;
  classLevel: string;
  subject: string;
  score: number;
  totalMarks: number;
  percentile: number;
  nationalRank: number;
  stateRank: number;
  grade: string;
  strengths: string[];
  areasForImprovement: string[];
  categoryScores: {
    grammar: number;
    literature: number;
    vocabulary: number;
    comprehension: number;
  };
}

export interface StateParticipation {
  state: string;
  schoolsCount: number;
  studentsCount: number;
  rank1Count: number;
}
