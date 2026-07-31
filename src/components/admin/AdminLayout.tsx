'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import Image from 'next/image';
import {
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  Award,
  Settings,
  LogOut,
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Globe,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  CreditCard,
  FileCode2,
  Upload,
  Megaphone,
  Image as ImageIcon,
  FileText,
  HelpCircle,
  Quote,
  ShieldAlert,
  Inbox,
  History,
  UserCheck,
} from 'lucide-react';

import { DashboardOverview } from './DashboardOverview';
import { AdminSchools } from './AdminSchools';
import { AdminStudents } from './AdminStudents';
import { AdminExams } from './AdminExams';
import { AdminResults } from './AdminResults';
import { AdminSettings } from './AdminSettings';
import { AdminRegistrations } from './AdminRegistrations';
import { AdminCMSPages } from './AdminCMSPages';
import { AdminEngagement } from './AdminEngagement';
import { AdminConfiguration } from './AdminConfiguration';
import { AdminResultsUpload } from './AdminResultsUpload';
import { AdminDataTable } from './AdminDataTable';

interface NavGroup {
  titleHi: string;
  items: {
    id: string;
    labelHi: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export const AdminLayout: React.FC = () => {
  const { theme, toggleTheme, navigateTo, showToast, adminUser, isLoggedInAdmin, logoutAdmin } = useApp();
  const pathname = usePathname();

  const tabFromPath = (path: string): string => {
    const segment = (path || '').replace(/^\/admin\/?/, '').split('/')[0];
    return segment || 'dashboard';
  };

  const [activeTab, setActiveTab] = useState<string>(() => tabFromPath(pathname || ''));

  useEffect(() => {
    setActiveTab(tabFromPath(pathname || ''));
  }, [pathname]);

  const selectTab = (id: string) => {
    setActiveTab(id);
    navigateTo(`/admin/${id === 'dashboard' ? 'dashboard' : id}`);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'नया विद्यालय पंजीकरण', desc: 'दिल्ली पब्लिक विद्यालय, आर के पुरम का आवेदन प्राप्त हुआ।', time: '10 मिनट पूर्व', unread: true },
    { id: 2, title: 'शुल्क भुगतान सत्यापित', desc: 'भारतीय विद्या भवन जयपुर (₹42,000) सफल रहा।', time: '1 घंटा पूर्व', unread: true },
    { id: 3, title: 'हॉल टिकट बैच 2026', desc: 'उत्तर प्रदेश राज्य के 1,12,400 प्रवेश पत्र तैयार।', time: '3 घंटे पूर्व', unread: false },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('सभी अधिसूचनाएँ पढ़ी हुई चिह्नित कर दी गईं।', 'success');
  };

  // Auth Guard
  if (!isLoggedInAdmin) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] dark:bg-[#120D0D] flex items-center justify-center p-4 font-poppins">
        <div className="bg-white/90 dark:bg-[#1A1414]/90 backdrop-blur-sm max-w-md w-full rounded-3xl p-8 border-2 border-amber-200/60 dark:border-gray-800 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto border-2 border-rose-200 dark:border-rose-800">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white">
              सुरक्षित प्रशासनिक पहुंच आवश्यक
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              भारती भाषा ओलंपियाड राष्ट्रीय डैशबोर्ड देखने हेतु प्रशासक क्रेडेंशियल्स द्वारा लॉगिन होना अनिवार्य है।
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigateTo('/admin/login')}
              className="w-full bg-gradient-to-r from-[#7B1E1E] to-red-800 hover:from-red-800 hover:to-[#7B1E1E] text-white font-bold py-3.5 px-6 rounded-2xl text-base transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>प्रशासक लॉगिन करें</span>
            </button>
            <button
              onClick={() => navigateTo('/')}
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-2xl text-base hover:bg-gray-200 transition-all"
            >
              मुख्य वेबसाइट पर लौटें
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navGroups: NavGroup[] = [
    {
      titleHi: 'अवलोकन (Overview)',
      items: [
        { id: 'dashboard', labelHi: 'डैशबोर्ड (Dashboard)', icon: LayoutDashboard },
      ]
    },
    {
      titleHi: 'पंजीकरण (Registrations)',
      items: [
        { id: 'school-registrations', labelHi: 'विद्यालय पंजीकरण', icon: Building2, badge: '2,850' },
        { id: 'payments', labelHi: 'शुल्क एवं भुगतान', icon: CreditCard },
        { id: 'form-builder', labelHi: 'प्रपत्र निर्माता (Form Builder)', icon: FileCode2 },
      ]
    },
    {
      titleHi: 'सहभागिता (Participation)',
      items: [
        { id: 'schools', labelHi: 'संबद्ध विद्यालय', icon: Building2 },
        { id: 'students', labelHi: 'नामांकित छात्र', icon: Users, badge: '4.5L+' },
        { id: 'results-upload', labelHi: 'परिणाम अपलोड', icon: Upload },
        { id: 'all-results', labelHi: 'समस्त परीक्षा परिणाम', icon: Award },
        { id: 'exams', labelHi: 'परीक्षा सारिणी व केंद्र', icon: Calendar },
      ]
    },
    {
      titleHi: 'सामग्री प्रबंधन (CMS)',
      items: [
        { id: 'announcements', labelHi: 'घोषणाएँ एवं सूचनाएँ', icon: Megaphone },
        { id: 'hero-section', labelHi: 'मुख्य बैनर', icon: ImageIcon },
        { id: 'pages', labelHi: 'पृष्ठ प्रबंधन', icon: FileText },
        { id: 'gallery', labelHi: 'चित्र वीथिका', icon: ImageIcon },
        { id: 'faqs', labelHi: 'सामान्य प्रश्न (FAQs)', icon: HelpCircle },
        { id: 'testimonials', labelHi: 'प्रशंसापत्र एवं अनुभव', icon: Quote },
        { id: 'policies', labelHi: 'नीतियाँ एवं नियम', icon: ShieldAlert },
        { id: 'media-library', labelHi: 'मीडिया लाइब्रेरी', icon: Upload },
      ]
    },
    {
      titleHi: 'विशेष अनुभाग (Special Sections)',
      items: [
        { id: 'categories', labelHi: 'श्रेणियाँ (Categories)', icon: FileText },
        { id: 'blogs', labelHi: 'ब्लॉग व लेख', icon: FileText },
        { id: 'course-enquiry', labelHi: 'कोर्स पूछताछ', icon: Inbox },
        { id: 'e-learning', labelHi: 'ई-लर्निंग सामग्री', icon: Upload },
        { id: 'bbo-special', labelHi: 'बीबीओ विशेष योजनाएं', icon: Sparkles },
        { id: 'economic-survey', labelHi: 'आर्थिक सर्वेक्षण', icon: Globe },
      ]
    },
    {
      titleHi: 'सहभागिता एवं संपर्क (Engagement)',
      items: [
        { id: 'contact-queries', labelHi: 'संपर्क एवं पूछताछ', icon: Inbox, badge: '3' },
        { id: 'notifications', labelHi: 'अधिसूचनाएँ एवं अलर्ट', icon: Bell },
      ]
    },
    {
      titleHi: 'प्रणाली कॉन्फ़िगरेशन (Configuration)',
      items: [
        { id: 'site-settings', labelHi: 'पोर्टल सेटिंग्स', icon: Settings },
        { id: 'seo-defaults', labelHi: 'एसईओ डिफ़ॉल्ट', icon: Globe },
        { id: 'admin-users', labelHi: 'एडमिन उपयोगकर्ता', icon: UserCheck },
        { id: 'audit-logs', labelHi: 'ऑडिट लॉग', icon: History },
        { id: 'review-ranks', labelHi: 'समीक्षा एवं रैंकिंग', icon: Award },
      ]
    }
  ];

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview key="dashboard" onNavigateTab={(tab) => selectTab(tab)} />;
      case 'school-registrations':
        return <AdminRegistrations key="school-registrations" subTab="school-registrations" />;
      case 'payments':
        return <AdminRegistrations key="payments" subTab="payments" />;
      case 'form-builder':
        return <AdminRegistrations key="form-builder" subTab="form-builder" />;
      case 'schools':
        return <AdminSchools key="schools" />;
      case 'students':
        return <AdminStudents key="students" />;
      case 'results-upload':
        return <AdminResultsUpload key="results-upload" />;
      case 'all-results':
        return <AdminResults key="all-results" />;
      case 'exams':
        return <AdminExams key="exams" />;
      case 'categories':
        return (
          <AdminDataTable
            key="categories"
            titleHi="श्रेणियाँ (Categories)"
            apiEndpoint="/api/admin/categories"
            columns={[
              { key: 'name', labelHi: 'नाम' },
              { key: 'slug', labelHi: 'स्लग' },
              { key: 'count', labelHi: 'कुल संख्या' },
            ]}
          />
        );
      case 'blogs':
        return (
          <AdminDataTable
            key="blogs"
            titleHi="ब्लॉग व लेख"
            apiEndpoint="/api/admin/blogs"
            columns={[
              { key: 'title', labelHi: 'शीर्षक' },
              { key: 'category', labelHi: 'श्रेणी' },
              { key: 'author', labelHi: 'लेखक' },
              { key: 'date', labelHi: 'दिनांक' },
              { key: 'views', labelHi: 'दृश्य' },
            ]}
          />
        );
      case 'course-enquiry':
        return (
          <AdminDataTable
            key="course-enquiry"
            titleHi="कोर्स पूछताछ"
            apiEndpoint="/api/admin/course-enquiry"
            columns={[
              { key: 'studentName', labelHi: 'छात्र का नाम' },
              { key: 'phone', labelHi: 'फ़ोन' },
              { key: 'course', labelHi: 'कोर्स' },
              { key: 'date', labelHi: 'दिनांक' },
              { key: 'status', labelHi: 'स्थिति' },
            ]}
          />
        );
      case 'e-learning':
        return (
          <AdminDataTable
            key="e-learning"
            titleHi="ई-लर्निंग सामग्री"
            apiEndpoint="/api/admin/e-learning"
            columns={[
              { key: 'title', labelHi: 'शीर्षक' },
              { key: 'format', labelHi: 'प्रारूप' },
              { key: 'downloads', labelHi: 'डाउनलोड' },
              { key: 'views', labelHi: 'दृश्य' },
            ]}
          />
        );
      case 'bbo-special':
        return (
          <AdminDataTable
            key="bbo-special"
            titleHi="बीबीओ विशेष योजनाएं"
            apiEndpoint="/api/admin/bbo-special"
            columns={[
              { key: 'name', labelHi: 'नाम' },
              { key: 'status', labelHi: 'स्थिति' },
            ]}
          />
        );
      case 'economic-survey':
        return (
          <AdminDataTable
            key="economic-survey"
            titleHi="आर्थिक सर्वेक्षण"
            apiEndpoint="/api/admin/economic-survey"
            columns={[
              { key: 'id', labelHi: 'आईडी' },
              { key: 'title', labelHi: 'शीर्षक' },
              { key: 'totalFund', labelHi: 'कुल निधि' },
            ]}
          />
        );
      case 'announcements':
      case 'hero-section':
      case 'pages':
      case 'gallery':
      case 'faqs':
      case 'testimonials':
      case 'policies':
      case 'media-library':
        return <AdminCMSPages key={activeTab} subTab={activeTab} />;
      case 'contact-queries':
      case 'notifications':
        return <AdminEngagement key={activeTab} subTab={activeTab} />;
      case 'site-settings':
      case 'seo-defaults':
      case 'admin-users':
      case 'audit-logs':
      case 'review-ranks':
        return <AdminConfiguration key={activeTab} subTab={activeTab} />;
      default:
        return <DashboardOverview key="default" onNavigateTab={(tab) => selectTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-amber-100/30 dark:from-[#120D0D] dark:via-[#1A1414] dark:to-[#0D0A0A] text-gray-900 dark:text-gray-100 flex flex-col font-poppins relative overflow-hidden">
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #790e03 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, #C79A2D 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 80px 80px',
          backgroundPosition: '0 0, 40px 40px',
        }}
      />
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#7B1E1E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#C79A2D]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#1A1414]/95 backdrop-blur-md border-b-2 border-amber-200/40 dark:border-gray-800 px-4 sm:px-6 py-3 transition-all shadow-sm relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-t-lg" />
        <div className="max-w-full mx-auto flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div onClick={() => navigateTo('/')} className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-20 h-20 rounded-xl group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[10px] flex items-center justify-center">
                  <Image
                    src="/logo/logo.png"
                    alt="भारती भाषा ओलंपियाड"
                    width={70}
                    height={70}
                    priority
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-playfair font-bold text-3xl text-[#7B1E1E] dark:text-[#F5F0E6] leading-none">
                    भारती भाषा <span className="text-[#C79A2D]">एडमिन कंट्रोल</span>
                  </h1>
                  <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] text-sm font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#7B1E1E]/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C79A2D]" />
                    प्रशासन
                  </span>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-400 font-semibold">
                  राष्ट्रीय मुख्यालय नियंत्रण कक्ष (National HQ Portal)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              onClick={() => navigateTo('/')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl 
             bg-gradient-to-br from-amber-100 to-amber-200 
             dark:from-amber-900/30 dark:to-amber-800/30 
             border-2 border-amber-300 dark:border-amber-700 
             text-sm font-bold text-[#7B1E1E] dark:text-[#C79A2D] 
             hover:scale-105 hover:shadow-lg hover:border-amber-400 
             transition-all duration-300 group"
            >
              <Globe className="w-4 h-4 text-[#7B1E1E] dark:text-[#C79A2D] group-hover:rotate-12 transition-transform" />
              <span>मुख्य पोर्टल</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#7B1E1E] dark:text-[#C79A2D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 relative transition-all"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse ring-2 ring-white dark:ring-gray-800" />
                )}
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 dark:bg-[#1A1414]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200/60 dark:border-gray-800 p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-amber-200/40 dark:border-gray-800 pb-2">
                    <h4 className="font-playfair text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <Bell className="w-5 h-5 text-[#C79A2D]" />
                      सूचनाएँ <span className="text-[#C79A2D]">({notifications.filter(n => n.unread).length})</span>
                    </h4>
                    <button
                      onClick={handleMarkAllRead}
                      className="text-sm text-[#7B1E1E] dark:text-[#C79A2D] font-semibold hover:underline"
                    >
                      सभी पढ़े
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-sm">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border ${n.unread
                          ? 'bg-[#7B1E1E]/5 border-[#7B1E1E]/20 dark:bg-[#7B1E1E]/10'
                          : 'bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800'
                          }`}
                      >
                        <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5 text-sm">
                          {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#7B1E1E] inline-block" />}
                          {n.title}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{n.desc}</p>
                        <span className="text-sm text-gray-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div> */}

            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-gray-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button> */}

            <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
              {adminUser?.avatar ? (
                <img src={adminUser.avatar} alt={adminUser.name} className="w-8 h-8 rounded-full object-cover border-2 border-[#C79A2D] shadow-sm" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#7B1E1E] to-[#C79A2D] flex items-center justify-center text-white text-2xl font-extrabold shadow-sm">
                  {adminUser?.name?.substring(0, 2) || 'एड'}
                </div>
              )}
              <div className="hidden md:block text-left">
                <div className="text-lg font-bold leading-none text-gray-900 dark:text-white">
                  {adminUser?.name || <span className="text-[#C79A2D]">डॉ. सर्वेश कुमार शर्मा</span>}
                </div>
                <div className="text-sm text-[#C79A2D] font-semibold mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  {adminUser?.role || 'मुख्य राष्ट्रीय प्रशासक'}
                </div>
              </div>
              <button
                onClick={() => logoutAdmin()}
                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 max-w-full w-full mx-auto flex gap-6 p-4 sm:p-6 relative z-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-90 shrink-0 bg-white/95 dark:bg-[#1A1414]/95 backdrop-blur-sm rounded-3xl border-2 border-amber-200/40 dark:border-gray-800 p-4 space-y-6 shadow-xl h-[150vh] overflow-y-auto sticky top-24 custom-scrollbar relative">
          <div className="relative p-3 bg-gradient-to-br from-[#7B1E1E]/10 to-[#C79A2D]/10 dark:from-[#7B1E1E]/20 dark:to-[#C79A2D]/20 rounded-2xl flex items-center gap-3 border border-amber-200/40 dark:border-gray-700">
            <div className="w-8 h-8 rounded-full bg-[#7B1E1E] flex items-center justify-center shadow-md">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#7B1E1E] dark:text-[#C79A2D]">
                नियंत्रण कक्ष <span className="text-[#C79A2D]">✦</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">सत्र 2026 • संपूर्ण पोर्टल</div>
            </div>
          </div>

          <div className="space-y-5">
            {navGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                <div className="px-3 text-sm font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <span className="w-1 h-3 bg-[#C79A2D] rounded-full" />
                  {group.titleHi}
                </div>
                <nav className="space-y-0.5 text-sm font-semibold">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => selectTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all duration-200 group ${isActive
                          ? 'bg-gradient-to-r from-[#7B1E1E] to-red-800 text-white shadow-md font-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-800/60 hover:shadow-sm'
                          }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isActive ? 'text-amber-300 scale-110' : 'text-gray-500 dark:text-gray-400 group-hover:scale-110'
                            }`} />
                          <span className="truncate">{item.labelHi}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-sm px-2 py-0.5 rounded-full font-bold shrink-0 ${isActive ? 'bg-amber-300 text-[#7B1E1E]' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                            }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t-2 border-amber-200/40 dark:border-gray-800">
            <button
              onClick={() => logoutAdmin()}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>लॉग आउट (Sign Out)</span>
            </button>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-80 bg-white/95 dark:bg-[#1A1414]/95 backdrop-blur-sm p-5 space-y-6 shadow-2xl z-50 overflow-y-auto border-r-2 border-amber-200/40 dark:border-gray-800">
              <div className="flex items-center justify-between border-b border-amber-200/40 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
                  <span className="font-playfair font-bold text-sm text-[#7B1E1E] dark:text-[#C79A2D]">एडमिन नेविगेशन</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-5">
                {navGroups.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-1">
                    <div className="px-3 text-sm font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                      <span className="w-1 h-3 bg-[#C79A2D] rounded-full" />
                      {group.titleHi}
                    </div>
                    <nav className="space-y-0.5 text-sm font-semibold">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              selectTab(item.id);
                              setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${isActive
                              ? 'bg-gradient-to-r from-[#7B1E1E] to-red-800 text-white font-bold'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-800/60'
                              }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-gray-500 dark:text-gray-400'}`} />
                              <span>{item.labelHi}</span>
                            </div>
                            {item.badge && (
                              <span className={`text-sm px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-amber-300 text-[#7B1E1E]' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                                }`}>
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t-2 border-amber-200/40 dark:border-gray-800 space-y-2">
                <button
                  onClick={() => {
                    navigateTo('/');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-all"
                >
                  <Globe className="w-4 h-4 text-[#C79A2D]" />
                  <span>मुख्य पोर्टल देखें</span>
                </button>
                <button
                  onClick={() => {
                    logoutAdmin();
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-bold text-red-600 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>लॉग आउट (Sign Out)</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white/90 dark:bg-[#1A1414]/90 backdrop-blur-sm rounded-3xl border-2 border-amber-200/40 dark:border-gray-800 shadow-xl p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#C79A2D]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#7B1E1E]/5 rounded-full blur-2xl pointer-events-none" />
            {renderActiveContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;