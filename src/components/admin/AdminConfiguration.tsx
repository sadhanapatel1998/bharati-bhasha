'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Search, 
  Users, 
  ShieldCheck, 
  FileCheck2, 
  Award, 
  Save, 
  Lock, 
  Key, 
  Eye, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Globe, 
  Sparkles,
  History
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'मुख्य प्रशासक (Super Admin)' | 'परीक्षा नियंत्रक' | 'डाटा प्रविष्टि अधिकारी';
  department: string;
  status: 'सक्रिय (Active)' | 'निष्क्रिय';
}

interface AuditLog {
  id: string;
  user: string;
  action: string;
  module: string;
  ip: string;
  timestamp: string;
}

export const AdminConfiguration: React.FC<{ subTab?: string }> = ({ subTab = 'site-settings' }) => {
  const { showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<string>(subTab || 'site-settings');

  React.useEffect(() => {
    if (subTab) {
      setActiveSubTab(subTab);
    }
  }, [subTab]);

  // Site Settings
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'भारती भाषा ओलंपियाड (Bharati Bhasha Olympiad)',
    portalActive: true,
    autoRollNumber: true,
    studentFee: '150',
    schoolFee: '1500',
    supportPhone: '+91 11 2345 6789',
    supportEmail: 'contact@bharatibhasha.org.in'
  });

  // SEO Defaults
  const [seoConfig, setSeoConfig] = useState({
    metaTitle: 'भारती भाषा ओलंपियाड 2026 | राष्ट्रीय हिंदी एवं संस्कृत ओलंपियाड',
    metaDesc: 'राष्ट्रीय स्तर पर हिंदी एवं संस्कृत भाषा ओलंपियाड परीक्षा, छात्रवृत्ति एवं डिजिटल ई-प्रमाण पत्र हेतु भारत का अग्रणी पोर्टल।',
    keywords: 'हिंदी ओलंपियाड, संस्कृत ओलंपियाड, भारती भाषा, छात्रवृत्ति, OMR परीक्षा, Hall Ticket',
    ogImage: 'https://bharatibhasha.org.in/og_banner_2026.png'
  });

  // Admin Users List
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    { id: 'ADM-01', name: 'डॉ. अजय शर्मा', email: 'ajay.sharma@bharatibhasha.org.in', role: 'मुख्य प्रशासक (Super Admin)', department: 'राष्ट्रीय मुख्यालय', status: 'सक्रिय (Active)' },
    { id: 'ADM-02', name: 'प्रो. देवेन्द्र शास्त्री', email: 'd.shastri@bharatibhasha.org.in', role: 'परीक्षा नियंत्रक', department: 'संस्कृत मूल्यांकन मंडल', status: 'सक्रिय (Active)' },
    { id: 'ADM-03', name: 'सुश्री नेहा वर्मा', email: 'neha.v@bharatibhasha.org.in', role: 'डाटा प्रविष्टि अधिकारी', department: 'विद्यालय पंजीकरण शाखा', status: 'सक्रिय (Active)' },
  ]);

  // Audit Logs List
  const [logs] = useState<AuditLog[]>([
    { id: 'LOG-9921', user: 'डॉ. अजय शर्मा', action: 'राष्ट्रीय परिणाम प्रकाशित किया', module: 'परिणाम व ई-सर्टिफिकेट', ip: '103.22.14.88', timestamp: '24 जुलाई 2026, 03:15 PM' },
    { id: 'LOG-9920', user: 'प्रो. देवेन्द्र शास्त्री', action: 'संस्कृत ओलंपियाड समय सारिणी अद्यतन की', module: 'परीक्षा सारिणी', ip: '103.22.14.92', timestamp: '24 जुलाई 2026, 11:40 AM' },
    { id: 'LOG-9919', user: 'सुश्री नेहा वर्मा', action: '14 विद्यालय पंजीकरण स्वीकृत किए', module: 'विद्यालय पंजीकरण', ip: '115.110.22.4', timestamp: '23 जुलाई 2026, 05:20 PM' },
  ]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('प्रणाली कॉन्फ़िगरेशन एवं सेटिंग्स सुरक्षित कर दी गई हैं।', 'success');
  };

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('एसईओ मेटा डेटा अद्यतन कर दिया गया है।', 'success');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center font-bold">
              <Settings className="w-4 h-4" />
            </div>
            <h1 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              प्रणाली कॉन्फ़िगरेशन (System Configuration & Controls)
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            पोर्टल सेटिंग्स, एसईओ, एडमिन उपयोगकर्ता विशेषाधिकार एवं सुरक्षा ऑडिट लॉग
          </p>
        </div>

        {/* Sub Nav */}
        <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl text-xs font-semibold">
          {[
            { id: 'site-settings', label: 'पोर्टल सेटिंग्स', icon: Settings },
            { id: 'seo-defaults', label: 'एसईओ डिफ़ॉल्ट', icon: Globe },
            { id: 'admin-users', label: 'एडमिन यूज़र', icon: Users },
            { id: 'audit-logs', label: 'ऑडिट लॉग', icon: History },
            { id: 'review-ranks', label: 'समीक्षा एवं रैंकिंग', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-[#7B1E1E] text-white shadow-xs font-bold' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub Tab: Site Settings */}
      {activeSubTab === 'site-settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
              पोर्टल मुख्य सेटिंग्स (Global System Controls)
            </h2>
            <p className="text-xs text-gray-500">शुल्क दरें, हेल्पलाइन संपर्क एवं पंजीकरण पोर्टल की स्थिति</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1 md:col-span-2">
              <label className="font-bold text-gray-700 dark:text-gray-300">पोर्टल का शीर्षक (Portal Name)</label>
              <input 
                type="text"
                value={siteSettings.siteName}
                onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">हेल्पलाइन संपर्क नंबर</label>
              <input 
                type="text"
                value={siteSettings.supportPhone}
                onChange={(e) => setSiteSettings({ ...siteSettings, supportPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">आधिकारिक ईमेल पता</label>
              <input 
                type="email"
                value={siteSettings.supportEmail}
                onChange={(e) => setSiteSettings({ ...siteSettings, supportEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">छात्र पंजीकरण शुल्क (₹)</label>
              <input 
                type="number"
                value={siteSettings.studentFee}
                onChange={(e) => setSiteSettings({ ...siteSettings, studentFee: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">विद्यालय संबद्धता शुल्क (₹)</label>
              <input 
                type="number"
                value={siteSettings.schoolFee}
                onChange={(e) => setSiteSettings({ ...siteSettings, schoolFee: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-[#C79A2D]" />
              सेटिंग्स सुरक्षित करें
            </button>
          </div>
        </form>
      )}

      {/* Sub Tab: SEO Defaults */}
      {activeSubTab === 'seo-defaults' && (
        <form onSubmit={handleSaveSeo} className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
              एसईओ एवं मेटा-डेटा कॉन्फ़िगरेशन (SEO Defaults)
            </h2>
            <p className="text-xs text-gray-500">गूगल खोज इंजन एवं सोशल मीडिया शेयरिंग कार्ड सेटिंग्स</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">मेटा शीर्षक (Meta Title)</label>
              <input 
                type="text"
                value={seoConfig.metaTitle}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">मेटा विवरण (Meta Description)</label>
              <textarea 
                rows={3}
                value={seoConfig.metaDesc}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaDesc: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">खोज कीवर्ड्स (Keywords)</label>
              <input 
                type="text"
                value={seoConfig.keywords}
                onChange={(e) => setSeoConfig({ ...seoConfig, keywords: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-[#C79A2D]" />
              एसईओ सहेजें
            </button>
          </div>
        </form>
      )}

      {/* Sub Tab: Admin Users */}
      {activeSubTab === 'admin-users' && (
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
                प्रशासनिक उपयोगकर्ता नियंत्रण (Admin Privileges & Users)
              </h2>
              <p className="text-xs text-gray-500">पोर्टल एक्सेस अधिकार एवं विभाग भूमिकाएँ</p>
            </div>
            <button 
              onClick={() => showToast('नया एडमिन आमंत्रण प्रेषित किया गया!', 'success')}
              className="bg-[#7B1E1E] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#C79A2D]" />
              नया एडमिन जोड़ें
            </button>
          </div>

          <div className="space-y-3">
            {adminUsers.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-gray-900 dark:text-white">{u.name}</div>
                  <div className="text-[10px] text-gray-500">{u.email} • {u.department}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] font-bold text-[10px] px-3 py-1 rounded-full">
                    {u.role}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                    {u.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub Tab: Audit Logs */}
      {activeSubTab === 'audit-logs' && (
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
              सुरक्षा एवं क्रियाकलाप ऑडिट लॉग (Security Audit Logs)
            </h2>
            <p className="text-xs text-gray-500">प्रशासनिक उपयोगकर्ताओं द्वारा किए गए समस्त संशोधनों का प्रामाणिक ब्यौरा</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-500 uppercase">
                  <th className="py-3 px-4">लॉग आईडी</th>
                  <th className="py-3 px-4">प्रशासक</th>
                  <th className="py-3 px-4">संपादित कार्य</th>
                  <th className="py-3 px-4">मॉड्यूल</th>
                  <th className="py-3 px-4">IP पता</th>
                  <th className="py-3 px-4">दिनांक व समय</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#7B1E1E] dark:text-[#C79A2D]">{l.id}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{l.user}</td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300">{l.action}</td>
                    <td className="py-3.5 px-4 text-gray-500">{l.module}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-gray-400">{l.ip}</td>
                    <td className="py-3.5 px-4 text-gray-500 text-[11px]">{l.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub Tab: Review Ranks */}
      {activeSubTab === 'review-ranks' && (
        <div className="bg-white dark:bg-[#1A1414] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm text-center space-y-3">
          <Award className="w-8 h-8 text-[#C79A2D] mx-auto animate-pulse" />
          <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white">
            रैंकिंग एवं समीक्षा एल्गोरिदम (Ranking & Review Engine)
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            12-आयामी वैज्ञानिक सूचकांक आधार पर स्वचालित रैंक गणना प्रणाली पूर्णतः क्रियाशील है।
          </p>
          <button 
            onClick={() => showToast('रैंक पुनर्गणना (Recalculate Ranks) पूर्ण हुई!', 'success')}
            className="bg-[#7B1E1E] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
          >
            रैंक पुनर्गणना शुरू करें
          </button>
        </div>
      )}
    </div>
  );
};
