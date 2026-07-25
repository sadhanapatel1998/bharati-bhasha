import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/shared/ToastContainer';
import { SearchModal } from './components/shared/SearchModal';
import { ScrollToTop } from './components/shared/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { VisionMissionPage } from './pages/VisionMissionPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { Nep2020Page } from './pages/Nep2020Page';
import { HindiOlympiadPage } from './pages/HindiOlympiadPage';
import { SanskritOlympiadPage } from './pages/SanskritOlympiadPage';
import { AwardsPage } from './pages/AwardsPage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';
import { BenchmarkAssessmentPage } from './pages/BenchmarkAssessmentPage';
import { PerformanceReportPage } from './pages/PerformanceReportPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { MockTestPage } from './pages/MockTestPage';
import { SyllabusPage } from './pages/SyllabusPage';
import { ExamDatesPage } from './pages/ExamDatesPage';
import { SamplePapersPage } from './pages/SamplePapersPage';
import { FaqPage } from './pages/FaqPage';
import { GalleryPage } from './pages/GalleryPage';
import { EventsNewsPage } from './pages/EventsNewsPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { PartnersSchoolsPage } from './pages/PartnersSchoolsPage';
import { ContactPage } from './pages/ContactPage';
import { CareersPage } from './pages/CareersPage';
import { LegalPage } from './pages/LegalPage';
import { SitemapPage } from './pages/SitemapPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ComingSoonPage } from './pages/ComingSoonPage';

const MainContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'vision-mission':
        return <VisionMissionPage />;
      case 'why-us':
        return <WhyUsPage />;
      case 'nep-2020':
        return <Nep2020Page />;
      case 'hindi-olympiad':
        return <HindiOlympiadPage />;
      case 'sanskrit-olympiad':
        return <SanskritOlympiadPage />;
      case 'benefits':
        return <WhyUsPage />;
      case 'awards':
        return <AwardsPage />;
      case 'scholarships':
        return <ScholarshipsPage />;
      case 'benchmark':
        return <BenchmarkAssessmentPage />;
      case 'performance-report':
        return <PerformanceReportPage />;
      case 'registration':
      case 'school-registration':
      case 'student-registration':
      case 'teacher-registration':
        return <RegistrationPage />;
      case 'mock-test':
        return <MockTestPage />;
      case 'syllabus':
        return <SyllabusPage />;
      case 'exam-dates':
        return <ExamDatesPage />;
      case 'sample-papers':
        return <SamplePapersPage />;
      case 'faqs':
        return <FaqPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'events-news':
        return <EventsNewsPage />;
      case 'blogs':
        return <BlogsPage />;
      case 'blog-detail':
        return <BlogDetailPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'partners-schools':
        return <PartnersSchoolsPage />;
      case 'contact':
        return <ContactPage />;
      case 'careers':
        return <CareersPage />;
      case 'privacy-terms':
        return <LegalPage />;
      case 'sitemap':
        return <SitemapPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] dark:bg-[#120D0D] text-gray-900 dark:text-gray-100 font-poppins selection:bg-[#C79A2D] selection:text-[#7B1E1E]">
      <AnnouncementBar />
      <Header />
      <MobileMenu />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />
      <ToastContainer />
      <SearchModal />
      <ScrollToTop />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
