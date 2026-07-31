'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Image from "next/image";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, navigateTo, showToast } = useApp();

  const [email, setEmail] = useState('admin@bharatibhasha.org');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('कृपया अपना आधिकारिक ईमेल या यूजरनेम दर्ज करें।');
      return;
    }
    if (!password) {
      setErrorMessage('कृपया प्रशासक पासवर्ड दर्ज करें।');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(data.message || 'सफलतापूर्वक लॉग इन किया गया!', 'success');
        loginAdmin(data.token, data.user);
      } else {
        setErrorMessage(data.message || 'लॉग इन विफल! कृपया क्रेडेंशियल्स की जांच करें।');
      }
    } catch (err) {
      setErrorMessage('नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
    showToast(`क्रेडेंशियल ऑटो-फिल किए गए: ${demoEmail}`, 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-amber-100/30 dark:from-[#120D0D] dark:via-[#1A1414] dark:to-[#0D0A0A] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-poppins relative overflow-hidden">
      {/* Decorative background elements */}

      {/* Main Login Card Container */}
      <div className="max-w-lg w-full mx-auto my-auto z-10">
        <div className="relative bg-white/95 dark:bg-[#1A1414]/95 backdrop-blur-sm rounded-3xl border-2 border-amber-200/60 dark:border-gray-700 shadow-2xl p-8 sm:p-10 space-y-8 transition-all duration-300 hover:shadow-[0_30px_80px_rgba(199,154,45,0.15)] dark:hover:shadow-[0_30px_80px_rgba(199,154,45,0.08)]">

          {/* Decorative glow corners */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C79A2D]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#7B1E1E]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo & Title Header */}
          <div className="text-center space-y-4 pt-2 relative z-10">
            <div className="flex justify-center">
              <Image
                src="/logo/logo.png"
                alt="भारती भाषा ओलंपियाड"
                width={90}
                height={90}
                priority
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                एडमिन लॉगिन
              </h1>
              <p className="text-base text-gray-800 dark:text-gray-400 font-medium">
                भारती भाषा ओलंपियाड <span className="text-[#C79A2D]">राष्ट्रीय नियंत्रण कक्ष</span>
              </p>
            </div>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="bg-rose-50/90 dark:bg-rose-950/60 backdrop-blur-sm border-2 border-rose-200 dark:border-rose-800 rounded-2xl p-4 flex items-start gap-3 text-sm text-rose-800 dark:text-rose-300 animate-shake shadow-lg">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-semibold">{errorMessage}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-5 relative z-10">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-base font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C79A2D]" />
                  ईमेल / यूजरनेम
                </span>
                <span className="text-base text-gray-600 font-normal">*आवश्यक</span>
              </label>
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bharatibhasha.org"
                  className="w-full pl-12 pr-4 py-3.5 bg-amber-50/50 dark:bg-gray-800/60 border-2 border-amber-200/60 dark:border-gray-700 rounded-2xl text-base font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#C79A2D]/30 focus:border-[#C79A2D] focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 group-hover:border-amber-300"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 group-focus-within:text-[#C79A2D] transition-colors" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-base font-bold text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#C79A2D]" />
                  एडमिन पासवर्ड
                </span>
                <button
                  type="button"
                  onClick={() => showToast('पासवर्ड रीसेट करने के लिए सुरक्षा अधिकारी से संपर्क करें: support@bharatibhasha.org', 'info')}
                  className="text-sm font-semibold text-[#7B1E1E] dark:text-[#C79A2D] hover:underline transition-colors"
                >
                  पासवर्ड भूल गए?
                </button>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-amber-50/50 dark:bg-gray-800/60 border-2 border-amber-200/60 dark:border-gray-700 rounded-2xl text-base font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#C79A2D]/30 focus:border-[#C79A2D] focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 group-hover:border-amber-300"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 group-focus-within:text-[#C79A2D] transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300 font-semibold cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded-md border-2 border-amber-300 dark:border-gray-600 text-[#7B1E1E] focus:ring-4 focus:ring-[#C79A2D]/30 focus:ring-offset-0 transition-all"
                />
                <span className="group-hover:text-[#7B1E1E] dark:group-hover:text-[#C79A2D] transition-colors">
                  क्रेडेंशियल्स याद रखें
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#7B1E1E] via-red-800 to-[#7B1E1E] hover:from-[#541313] hover:via-[#7B1E1E] hover:to-[#541313] text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-base font-bold">सत्यापन जारी...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span className="text-medium font-bold"> लॉगिन करें</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default AdminLoginPage;