'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';
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
  UserCheck
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

  // Keep the active section in sync with the real /admin/<section> URL,
  // so each admin route (categories, exams, economic-survey, ...) shows
  // its own content on direct load, refresh, or back/forward navigation.
  useEffect(() => {
    setActiveTab(tabFromPath(pathname || ''));
  }, [pathname]);

  // Selecting a sidebar item navigates to the real folder route AND
  // updates the tab instantly (no flash of the previous section).
  const selectTab = (id: string) => {
    setActiveTab(id);
    navigateTo(`/admin/${id === 'dashboard' ? 'dashboard' : id}`);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'नया विद्यालय पंजीकरण', desc: 'दिल्ली पब्लिक स्कूल, आर के पुरम का आवेदन प्राप्त हुआ।', time: '10 मिनट पूर्व', unread: true },
    { id: 2, title: 'शुल्क भुगतान सत्यापित', desc: 'भारतीय विद्या भवन जयपुर (₹42,000) सफल रहा।', time: '1 घंटा पूर्व', unread: true },
    { id: 3, title: 'हॉल टिकट बैच 2026', desc: 'उत्तर प्रदेश राज्य के 1,12,400 प्रवेश पत्र तैयार।', time: '3 घंटे पूर्व', unread: false },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('सभी अधिसूचनाएँ पढ़ी हुई चिह्नित कर दी गईं।', 'success');
  };

  // Auth Guard Protection
  if (!isLoggedInAdmin) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] dark:bg-[#120D0D] flex items-center justify-center p-4 font-poppins">
        <div className="bg-white dark:bg-[#1A1414] max-w-md w-full rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white">
              सुरक्षित प्रशासनिक पहुंच आवश्यक (Access Denied)
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              भारती भाषा ओलंपियाड राष्ट्रीय डैशबोर्ड देखने हेतु प्रशासक क्रेडेंशियल्स द्वारा लॉगिन होना अनिवार्य है।
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button 
              onClick={() => navigateTo('/admin/login')}
              className="w-full bg-[#7B1E1E] hover:bg-[#541313] text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#C79A2D]" />
              <span>प्रशासक लॉगिन करें (Admin Login)</span>
            </button>
            <button 
              onClick={() => navigateTo('/')}
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-2xl text-xs hover:bg-gray-200 transition-all"
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
      
      // Registrations
      case 'school-registrations':
        return <AdminRegistrations key="school-registrations" subTab="school-registrations" />;
      case 'payments':
        return <AdminRegistrations key="payments" subTab="payments" />;
      case 'form-builder':
        return <AdminRegistrations key="form-builder" subTab="form-builder" />;

      // Participation
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

      // Special Sections (real API-backed, DB-ready)
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

      // CMS
      case 'announcements':
      case 'hero-section':
      case 'pages':
      case 'gallery':
      case 'faqs':
      case 'testimonials':
      case 'policies':
      case 'media-library':
        return <AdminCMSPages key={activeTab} subTab={activeTab} />;

      // Engagement
      case 'contact-queries':
      case 'notifications':
        return <AdminEngagement key={activeTab} subTab={activeTab} />;

      // Configuration
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
    <div className="min-h-screen bg-[#F7F7F5] dark:bg-[#120D0D] text-gray-900 dark:text-gray-100 flex flex-col font-poppins">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#1A1414]/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 px-4 sm:px-6 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div 
              onClick={() => navigateTo('/')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7B1E1E] to-[#C79A2D] p-0.5 shadow-sm group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#FAFAF8] dark:bg-[#121010] rounded-[10px] flex items-center justify-center">
                  <span className="font-playfair text-base font-bold text-[#7B1E1E] dark:text-[#C79A2D]">
                    भा
                  </span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-playfair font-bold text-base text-[#7B1E1E] dark:text-[#F5F0E6] leading-none">
                    भारती भाषा <span className="text-[#C79A2D]">एडमिन कंट्रोल</span>
                  </h1>
                  <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#7B1E1E]/20">
                    प्रशासन
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                  राष्ट्रीय मुख्यालय नियंत्रण कक्ष (National HQ Portal)
                </p>
              </div>
            </div>
          </div>

          {/* Right: Actions, Notifications, Theme, User Badge */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Return to Public Portal */}
            <button 
              onClick={() => navigateTo('/')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="मुख्य वेबसाइट पर वापस जाएं"
            >
              <Globe className="w-3.5 h-3.5 text-[#C79A2D]" />
              <span>मुख्य पोर्टल</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 relative transition-colors"
                title="अधिसूचनाएँ"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#1A1414] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h4 className="font-playfair text-xs font-bold text-gray-900 dark:text-white">
                      प्रशासनिक सूचनाएँ ({notifications.filter(n => n.unread).length})
                    </h4>
                    <button 
                      onClick={handleMarkAllRead} 
                      className="text-[10px] text-[#7B1E1E] dark:text-[#C79A2D] font-semibold hover:underline"
                    >
                      सभी पढ़े चिह्नित करें
                    </button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-xs">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-2.5 rounded-xl border ${n.unread ? 'bg-[#7B1E1E]/5 border-[#7B1E1E]/10' : 'bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800'}`}>
                        <div className="font-bold text-gray-900 dark:text-white">{n.title}</div>
                        <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5">{n.desc}</p>
                        <span className="text-[9px] text-gray-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-gray-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Admin User Card */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
              {adminUser?.avatar ? (
                <img 
                  src={adminUser.avatar} 
                  alt={adminUser.name} 
                  className="w-8 h-8 rounded-full object-cover border border-[#C79A2D]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7B1E1E] to-[#C79A2D] flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
                  {adminUser?.name?.substring(0, 2) || 'एड'}
                </div>
              )}
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold leading-none text-gray-900 dark:text-white">
                  {adminUser?.name || 'डॉ. सर्वेश कुमार शर्मा'}
                </div>
                <div className="text-[10px] text-[#C79A2D] font-semibold mt-0.5">
                  {adminUser?.role || 'मुख्य राष्ट्रीय प्रशासक'}
                </div>
              </div>

              <button 
                onClick={() => logoutAdmin()}
                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors ml-1"
                title="लॉगआउट करें"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Area with Sidebar & Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex gap-6 p-4 sm:p-6">
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:block w-72 shrink-0 bg-white dark:bg-[#1A1414] rounded-3xl border border-gray-200/80 dark:border-gray-800 p-4 space-y-6 shadow-xs h-[calc(100vh-120px)] overflow-y-auto sticky top-24 custom-scrollbar">
          <div className="p-2.5 bg-[#7B1E1E]/5 dark:bg-[#C79A2D]/10 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
            <div>
              <div className="text-xs font-bold text-[#7B1E1E] dark:text-[#C79A2D]">प्रशासनिक नियंत्रण कक्ष</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">सत्र 2026 संपूर्ण पोर्टल</div>
            </div>
          </div>

          <div className="space-y-5">
            {navGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {group.titleHi}
                </div>
                <nav className="space-y-0.5 text-xs font-semibold">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => selectTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                          isActive 
                            ? 'bg-[#7B1E1E] text-white shadow-md font-bold' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#C79A2D]' : 'text-gray-500 dark:text-gray-400'}`} />
                          <span className="truncate">{item.labelHi}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                            isActive ? 'bg-[#C79A2D] text-[#7B1E1E]' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
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

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button 
              onClick={() => logoutAdmin()}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>लॉग आउट (Sign Out)</span>
            </button>
          </div>
        </aside>

        {/* Sidebar (Mobile Drawer Backdrop) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
            <aside className="absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-[#1A1414] p-5 space-y-6 shadow-2xl z-50 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#7B1E1E] dark:text-[#C79A2D]" />
                  <span className="font-playfair font-bold text-sm text-[#7B1E1E] dark:text-[#C79A2D]">एडमिन नेविगेशन</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {navGroups.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-1">
                    <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                      {group.titleHi}
                    </div>
                    <nav className="space-y-1 text-xs font-semibold">
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
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                              isActive 
                                ? 'bg-[#7B1E1E] text-white font-bold' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-3.5 h-3.5 text-[#C79A2D]" />
                              <span>{item.labelHi}</span>
                            </div>
                            {item.badge && (
                              <span className="text-[9px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
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

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <button 
                  onClick={() => {
                    navigateTo('/');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800"
                >
                  <Globe className="w-4 h-4 text-[#C79A2D]" />
                  <span>मुख्य पोर्टल देखें</span>
                </button>

                <button 
                  onClick={() => {
                    showToast('प्रशासनिक सत्र समाप्त कर दिया गया है।', 'info');
                    navigateTo('/');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span>लॉग आउट (Sign Out)</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Content Workspace Area */}
        <main className="flex-1 min-w-0">
          {renderActiveContent()}
        </main>
      </div>
    </div>
  );
};
