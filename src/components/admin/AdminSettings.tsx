'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  ShieldCheck, 
  Bell, 
  Database, 
  Globe, 
  CheckCircle2, 
  Lock,
  Save
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { showToast } = useApp();

  const [settings, setSettings] = useState({
    portalActive: true,
    autoEnrollment: true,
    studentFee: '150',
    schoolRegistrationFee: '1500',
    notificationBroadcast: 'भारती भाषा ओलंपियाड 2026 हेतु हॉल टिकट डाउनलोड प्रारंभ हो चुके हैं।'
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('प्रणाली सेटिंग्स (System Configurations) अद्यतन एवं सुरक्षित कर दी गई हैं।', 'success');
  };

  const handleTriggerBroadcast = () => {
    showToast('अधिसूचना संदेश सभी 2,850+ संबद्ध विद्यालयों को प्रेषित (Send) कर दिया गया है।', 'info');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center font-bold">
            <Settings className="w-4 h-4" />
          </div>
          <h1 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            प्रणाली सेटिंग्स एवं पोर्टल नियंत्रण (System Settings)
          </h1>
        </div>
        <p className="text-xs text-gray-500">
          शुल्क दरें, पंजीकरण सक्रियता, सुरक्षा बैकअप एवं राष्ट्रीय प्रसारण नियंत्रण
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Portal Controls */}
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
          <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
            पंजीकरण एवं पोर्टल उपलब्धता
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl">
              <div>
                <div className="font-bold text-gray-900 dark:text-white">सार्वजनिक पंजीकरण पोर्टल</div>
                <div className="text-[11px] text-gray-500">विद्यार्थी एवं विद्यालय हेतु ऑनलाइन पंजीकरण चालू रखें</div>
              </div>
              <input 
                type="checkbox"
                checked={settings.portalActive}
                onChange={(e) => setSettings({ ...settings, portalActive: e.target.checked })}
                className="w-5 h-5 accent-[#7B1E1E]"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl">
              <div>
                <div className="font-bold text-gray-900 dark:text-white">स्वचालित अनुक्रमांक (Roll No) जनरेशन</div>
                <div className="text-[11px] text-gray-500">पंजीकरण के पश्चात तुरंत रोल नंबर आवंटित करें</div>
              </div>
              <input 
                type="checkbox"
                checked={settings.autoEnrollment}
                onChange={(e) => setSettings({ ...settings, autoEnrollment: e.target.checked })}
                className="w-5 h-5 accent-[#7B1E1E]"
              />
            </div>
          </div>
        </div>

        {/* Fee Structures */}
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
          <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
            शुल्क संरचना नियम (Fee Rules)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">व्यक्तिगत छात्र पंजीकरण शुल्क (₹)</label>
              <input 
                type="number"
                value={settings.studentFee}
                onChange={(e) => setSettings({ ...settings, studentFee: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">विद्यालय संबद्धता शुल्क (₹)</label>
              <input 
                type="number"
                value={settings.schoolRegistrationFee}
                onChange={(e) => setSettings({ ...settings, schoolRegistrationFee: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Global Broadcast */}
        <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
          <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
            राष्ट्रीय सूचना प्रसारण (Global Announcement)
          </h2>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">शीर्ष घोषणा संदेश (Ticker Notice)</label>
              <textarea 
                rows={2}
                value={settings.notificationBroadcast}
                onChange={(e) => setSettings({ ...settings, notificationBroadcast: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>

            <button 
              type="button"
              onClick={handleTriggerBroadcast}
              className="bg-[#C79A2D] hover:bg-[#b08722] text-[#7B1E1E] font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5" />
              अभी प्रसारित करें (Broadcast Now)
            </button>
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
    </div>
  );
};
