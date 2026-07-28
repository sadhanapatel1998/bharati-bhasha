export type Language = 'hi';
export type Theme = 'light' | 'dark';
export interface SubjectSchedule {
  subject: string;
  subjectHindi: string;
  option1Date: string;
  option1Day: string;
  option2Date: string;
  option2Day: string;
  iconName: string;
  image: string; // Image path or URL
}
export interface ExamDetail {
  id: string;
  label: string;
  value: string;
  subtext: string;
  icon: string;
}

// export interface RegistrationStep {
//   stepNumber: number;
//   title: string;
//   description: string;
// }
export interface RegistrationStep {
  stepNumber: number;
  title: string;
  description: string;
}
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'exam' | 'registration' | 'awards';
}
export interface ExamDateItem {
  id: string;
  title: string;
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
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
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
  quote: string;
  rating: number;
  avatar: string;
  videoUrl?: string;
}
export interface AwardItem {
  id: string;
  rank: string;
  title: string;
  cashPrize: string;
  perks: string[];
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