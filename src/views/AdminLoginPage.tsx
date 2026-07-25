'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  LogIn, 
  Sparkles, 
  ArrowLeft, 
  AlertCircle, 
  KeyRound,
  CheckCircle2,
  Building2,
  HelpCircle
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
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(data.message || 'सफलतापूर्वक लॉग इन किया गया!', 'success');
        loginAdmin(data.token, data.user);
      } else {
        setErrorMessage(data.message || 'लॉग इन विफल! कृपया क्रेडेंशियल्स की जांच करें।');
      }
    } catch (err) {
      // Fallback client-side authentication if backend network is unreachable
      if (email.trim().toLowerCase() === 'admin@bharatibhasha.org' && password === 'admin123') {
        const mockUser = {
          id: 'ADM-1001',
          name: 'डॉ. सर्वेश कुमार शर्मा',
          email: 'admin@bharatibhasha.org',
          role: 'मुख्य राष्ट्रीय प्रशासक',
          designation: 'राष्ट्रीय निदेशक, परीक्षा मंडल',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
          lastLogin: new Date().toLocaleString('hi-IN')
        };
        showToast('प्रशासक प्रमाणीकरण सफल रहा! (क्लाइंट बैकअप मोड)', 'success');
        loginAdmin('token_admin_bbo_2026_fallback', mockUser);
      } else {
        setErrorMessage('नेटवर्क त्रुटि या अमान्य क्रेडेंशियल्स। कृपया क्रेडेंशियल्स जांचें।');
      }
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
    <div className="min-h-screen bg-[#F8F5F0] dark:bg-[#120D0D] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-poppins relative overflow-hidden">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7B1E1E]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C79A2D]/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header / Nav back */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <button 
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#7B1E1E] dark:text-[#C79A2D] bg-white dark:bg-[#1A1414] px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs hover:shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          मुख्य वेबसाइट पर वापस जाएँ
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          सुरक्षित 256-बिट SSL एनक्रिप्टेड पोर्टल
        </div>
      </div>

      {/* Main Login Card Container */}
      <div className="max-w-md w-full mx-auto my-auto py-8 z-10">
        <div className="bg-white dark:bg-[#1A1414] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          
          {/* Top Tricolor Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>

          {/* Logo & Title Header */}
          <div className="text-center space-y-3 pt-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B1E1E] to-[#541313] text-[#C79A2D] shadow-lg border border-[#C79A2D]/40 mx-auto">
              <Building2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-extrabold text-[#C79A2D] bg-[#7B1E1E]/10 px-3 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-[#7B1E1E]" />
                अखिल भारतीय बोर्ड
              </span>
              <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">
                प्रशासक लॉगिन (Admin Portal)
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                भारती भाषा ओलंपियाड राष्ट्रीय नियंत्रण कक्ष
              </p>
            </div>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-rose-800 dark:text-rose-300 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>आधिकारिक ईमेल या यूजरनेम</span>
                <span className="text-[10px] text-gray-400 font-normal">*आवश्यक</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bharatibhasha.org"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7B1E1E] focus:bg-white dark:focus:bg-gray-800 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                <span>प्रशासक पासवर्ड</span>
                <button 
                  type="button"
                  onClick={() => showToast('पासवर्ड रीसेट करने के लिए सुरक्षा अधिकारी से संपर्क करें: support@bharatibhasha.org', 'info')}
                  className="text-[11px] font-semibold text-[#7B1E1E] dark:text-[#C79A2D] hover:underline"
                >
                  पासवर्ड भूल गए?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7B1E1E] focus:bg-white dark:focus:bg-gray-800 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium cursor-pointer">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#7B1E1E] focus:ring-[#7B1E1E] border-gray-300"
                />
                <span>क्रेडेंशियल्स याद रखें (Remember Me)</span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#7B1E1E] to-[#8B2323] hover:from-[#541313] hover:to-[#7B1E1E] text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>सत्यापन जारी...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>सुरक्षित लॉगिन करें (Sign In)</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Access Credentials Panel */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-gray-500">
              <span className="flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-[#C79A2D]" />
                परीक्षण हेतु त्वरित क्रेडेंशियल (Demo Accounts)
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button 
                type="button"
                onClick={() => handleQuickFill('admin@bharatibhasha.org', 'admin123')}
                className="w-full p-2.5 bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100 border border-amber-200/80 dark:border-amber-800 rounded-xl text-left text-xs transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-amber-900 dark:text-amber-200">मुख्य राष्ट्रीय प्रशासक</div>
                  <div className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">admin@bharatibhasha.org • pass: admin123</div>
                </div>
                <span className="text-[10px] font-bold bg-[#7B1E1E] text-white px-2 py-0.5 rounded-md group-hover:bg-[#541313]">
                  भरें
                </span>
              </button>

              <button 
                type="button"
                onClick={() => handleQuickFill('superadmin@bharatibhasha.org', 'super123')}
                className="w-full p-2.5 bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 border border-blue-200/80 dark:border-blue-800 rounded-xl text-left text-xs transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-blue-900 dark:text-blue-200">सुपर एडमिन (Super Admin)</div>
                  <div className="text-[10px] text-blue-700 dark:text-blue-400 font-mono">superadmin@bharatibhasha.org • pass: super123</div>
                </div>
                <span className="text-[10px] font-bold bg-blue-700 text-white px-2 py-0.5 rounded-md group-hover:bg-blue-800">
                  भरें
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-7xl mx-auto w-full text-center text-[11px] text-gray-500 dark:text-gray-400 py-2">
        © 2026 भारती भाषा ओलंपियाड (Bharati Bhasha Olympiad). सर्व अधिकार सुरक्षित।
      </div>

    </div>
  );
};
