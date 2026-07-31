'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Image from 'next/image';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Sparkles,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('कृपया ईमेल और पासवर्ड दोनों भरें।', 'warning');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('लॉगिन सफल! स्वागत है प्रशासक।', 'success');
      navigateTo('/admin/dashboard');
    }, 1500);
  };

  return (
    <div className="pt-10 relative min-h-screen bg-gradient-to-br from-amber-50/40 via-white to-amber-100/30 overflow-hidden flex items-center justify-center p-4">
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]
          bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
          bg-[length:60px_60px,80px_80px] bg-[position:0_0,40px_40px]"
      />

      {/* Floating decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-red-800/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card – Two columns */}
      <div className="relative z-10 mb-15 w-full max-w-6xl bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-amber-200/60 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(199,154,45,0.15)]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left – Login Form */}
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-18 h-18 rounded-2xl overflow-hidden">
                <Image
                  src="/logo/logo.png"
                  alt="भारती भाषा ओलंपियाड"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <h1 className="mt-4 font-playfair text-3xl font-bold text-[#790e03] dark:text-[#C79A2D]">
                भारती भाषा <span className="text-[#C79A2D]">ओलंपियाड</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#C79A2D]" />
                <span className="text-base font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  प्रशासक लॉगिन
                </span>
                <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#C79A2D]" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-base font-bold text-gray-700 dark:text-gray-300">
                  <Mail className="w-5 h-5 text-[#C79A2D]" />
                  ईमेल / उपयोगकर्ता नाम
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bharatibhasha.org"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-amber-200/60 bg-amber-50/40 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C79A2D] focus:border-transparent transition-all"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-base font-bold text-gray-700 dark:text-gray-300">
                  <Lock className="w-5 h-5 text-[#C79A2D]" />
                  पासवर्ड
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-amber-200/60 dark:border-gray-700 bg-amber-50/40 dark:bg-gray-800/50 text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C79A2D] focus:border-transparent transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-amber-300 dark:border-gray-600 accent-[#790e03] focus:ring-[#C79A2D]"
                  />
                  <span className="font-semibold">मुझे याद रखें</span>
                </label>
                <button
                  type="button"
                  onClick={() => showToast('पासवर्ड रीसेट लिंक आपके ईमेल पर भेजा गया है।', 'info')}
                  className="text-[#790e03] dark:text-[#C79A2D] font-bold hover:underline transition-colors cursor-pointer"
                >
                  पासवर्ड भूल गए?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full py-4 bg-gradient-to-r from-[#790e03] to-red-800 hover:from-red-800 hover:to-[#790e03] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5 text-amber-300" />
                    <span>लॉगिन करें</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p>
                क्या आप विद्यालय पंजीकरण करना चाहते हैं?{' '}
                <button
                  onClick={() => navigateTo('/registration')}
                  className="text-[#790e03] dark:text-[#C79A2D] font-bold hover:underline cursor-pointer"
                >
                  यहाँ क्लिक करें
                </button>
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-500 mt-2">
                © 2026 भारती भाषा ओलंपियाड न्यास
              </p>
            </div>
          </div>

          {/* Right – Image fills the box */}
          <div className="relative hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-red-950 via-red-900 to-amber-950 text-white overflow-hidden">
            {/* Full‑cover image */}
            <div className="absolute inset-0">
              <Image
                src="/banner/login-right.jpg"
                alt="Olympiad Illustration"
                fill
                className=""
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;