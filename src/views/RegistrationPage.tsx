'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { School, User, Users, CheckCircle2, Sparkles, Send, ShieldCheck } from 'lucide-react';
export const RegistrationPage: React.FC = () => {
  const {
    language,
    showToast,
    navigateTo
  } = useApp();
  const [regType, setRegType] = useState<'school' | 'student' | 'teacher'>('student');
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    city: '',
    state: 'Delhi NCR',
    classLevel: 'Class 8th',
    subject: 'Hindi & Sanskrit Both',
    pincode: '',
    address: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      showToast('कृपया सभी आवश्यक फ़ील्ड भरें।', 'warning');
      return;
    }
    setIsSubmitted(true);
    showToast('पंजीकरण सफलता से प्राप्त हुआ! आपका टोकन क्रमांक BBO-REG-2026 है।', 'success');
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{
      label: 'राष्ट्रीय पंजीकरण पोर्टल'
    }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {'ऑनलाइन पंजीकरण पोर्टल 2026'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {'भारती भाषा ओलंपियाड पंजीकरण'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {'विद्यालय, छात्र अथवा भाषा शिक्षक के रूप में 2 मिनट में ऑनलाइन आवेदन करें'}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="max-w-2xl mx-auto grid grid-cols-3 gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl">
        <button onClick={() => {
        setRegType('school');
        setStep(1);
        setIsSubmitted(false);
      }} className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${regType === 'school' ? 'bg-[#7B1E1E] text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'}`}>
          <School className="w-4 h-4" />
          <span>{'विद्यालय'}</span>
        </button>

        <button onClick={() => {
        setRegType('student');
        setStep(1);
        setIsSubmitted(false);
      }} className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${regType === 'student' ? 'bg-[#7B1E1E] text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'}`}>
          <User className="w-4 h-4" />
          <span>{'छात्र'}</span>
        </button>

        <button onClick={() => {
        setRegType('teacher');
        setStep(1);
        setIsSubmitted(false);
      }} className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${regType === 'teacher' ? 'bg-[#7B1E1E] text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'}`}>
          <Users className="w-4 h-4" />
          <span>{'शिक्षक'}</span>
        </button>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#1A1414] rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-xl">
        
        {isSubmitted ? <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">
              {'पंजीकरण सफलता पूर्वक सम्पन्न हुआ!'}
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
              {'आपका अस्थाई पंजीकरण टोकन BBO-REG-2026 जारी कर दिया गया है। प्रवेश पत्र व परीक्षा का विवरण आपके ईमेल/व्हाट्सएप पर भेज दिया गया है।'}
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button onClick={() => navigateTo('/mock-test')} className="bg-[#C79A2D] text-[#7B1E1E] font-bold px-6 py-3 rounded-xl text-xs">
                {'निःशुल्क मॉक टेस्ट दें'}
              </button>
            </div>
          </div> : <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">
                {regType === 'school' ? 'विद्यालय का नाम / प्रिंसिपल नाम *' : 'छात्र/शिक्षक का पूरा नाम *'}
              </label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter full name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium focus:outline-none focus:border-[#C79A2D]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">ईमेल पता (Email) *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="name@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium focus:outline-none focus:border-[#C79A2D]" />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">मोबाइल / व्हाट्सएप नंबर *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium focus:outline-none focus:border-[#C79A2D]" />
              </div>
            </div>

            {regType === 'student' && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">कक्षा चुनें (Class)</label>
                  <select name="classLevel" value={formData.classLevel} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium focus:outline-none focus:border-[#C79A2D]">
                    {[...Array(12)].map((_, i) => <option key={i + 1} value={`Class ${i + 1}th`}>Class {i + 1}th</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">विषय चुनें (Exam Choice)</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium focus:outline-none focus:border-[#C79A2D]">
                    <option value="Hindi Olympiad">National Hindi Olympiad</option>
                    <option value="Sanskrit Olympiad">National Sanskrit Olympiad</option>
                    <option value="Both">Both Hindi & Sanskrit Olympiad</option>
                  </select>
                </div>
              </div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">राज्य (State)</label>
                <select name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium focus:outline-none focus:border-[#C79A2D]">
                  <option>Delhi NCR</option>
                  <option>Uttar Pradesh</option>
                  <option>Rajasthan</option>
                  <option>Madhya Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Bihar</option>
                  <option>Other State</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">शहर (City)</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. New Delhi / Jaipur" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium focus:outline-none focus:border-[#C79A2D]" />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-[#7B1E1E] hover:bg-[#541313] text-[#F5F0E6] py-4 rounded-xl font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2 glow-gold">
                <Send className="w-4 h-4" />
                <span>{'पंजीकरण जमा करें'}</span>
              </button>
            </div>

          </form>}

      </div>

    </div>;
};