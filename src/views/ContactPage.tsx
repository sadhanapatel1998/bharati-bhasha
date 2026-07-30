'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  User,
  AtSign,
  Smartphone,
  FileText,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

export const ContactPage: React.FC = () => {
  const { language, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('धन्यवाद! आपका संदेश सफलतापूर्वक प्राप्त हुआ।', 'success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-100/30 overflow-hidden pb-8">
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]
             bg-[radial-gradient(circle_at_20%_30%,#790e03_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#C79A2D_1px,transparent_1px)]
             [background-size:60px_60px,80px_80px]
             [background-position:0_0,40px_40px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 z-10">

        {/* Hero Section */}
        <SectionHeader
          icon={MessageSquare}
          badge="राष्ट्रीय सहायता केंद्र"
          title="हमसे संपर्क करें"
          description=' हम आपकी हर शिक्षा-संबंधी जिज्ञासा का समाधान करने के लिए यहाँ हैं। किसी भी प्रश्न, सुझाव या सहायता के लिए नीचे दिए गए माध्यमों से हमसे जुड़ें।'
          className='py-8'
        />

        {/* Contact Cards & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left – Contact Info Cards */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Info Card – enhanced */}
            <div className="relative bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm p-8 rounded-3xl border-2 border-amber-200/60 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              {/* Decorative top-right golden glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#C79A2D]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-red-800/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 border-b-2 border-amber-200/40 pb-3">
                  <h3 className="font-bold text-3xl text-red-950 dark:text-white font-heading-hi">
                    हमारे कार्यालय
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="group flex items-start gap-5 p-3 rounded-xl hover:bg-amber-50/50 dark:hover:bg-white/5 transition-all duration-200 hover:-translate-x-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 text-red-800 dark:text-[#C79A2D] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="text-base">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">राष्ट्रीय कार्यालय पता</h4>
                      <p className="text-medium text-gray-900 dark:text-gray-400 mt-1 leading-relaxed">
                        भारती भाषा ओलंपियाड ट्रस्ट, 4th Floor, विद्या भवन,
                        संस्थागत क्षेत्र, दीनदयाल उपाध्याय मार्ग,
                        नई दिल्ली - 110002
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group flex items-start gap-5 p-3 rounded-xl hover:bg-amber-50/50 dark:hover:bg-white/5 transition-all duration-200 hover:-translate-x-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 text-amber-800 dark:text-[#C79A2D] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="text-base">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">हेल्पलाइन नंबर</h4>
                      <p className="text-medium text-gray-800 dark:text-gray-400 mt-1">
                        टोल-फ्री: <span className="font-bold text-red-800 dark:text-[#C79A2D]">1800-123-9876</span>
                      </p>
                      <p className="text-medium text-gray-900 font-semibold dark:text-gray-400">+91 11 2345 6789 / +91 98765 43210</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group flex items-start gap-5 p-3 rounded-xl hover:bg-amber-50/50 dark:hover:bg-white/5 transition-all duration-200 hover:-translate-x-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 text-emerald-800 dark:text-[#C79A2D] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="text-base">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">ईमेल पते</h4>
                      <p className="text-base text-gray-800 dark:text-gray-400 mt-1 font-semibold">
                        <span className="font-semibold">support@bharatibhasha.org</span>
                      </p>
                      <p className="text-base text-gray-800 dark:text-gray-400 font-semibold">info@bharatibhasha.org</p>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="group flex items-start gap-5 p-3 rounded-xl hover:bg-amber-50/50 dark:hover:bg-white/5 transition-all duration-200 hover:-translate-x-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-[#C79A2D] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="text-base">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">कार्यालय समय</h4>
                      <p className="text-base text-gray-800 dark:text-gray-400 mt-1">
                        <span className="font-medium">सोम – शुक्र:</span> सुबह 9:00 – शाम 6:00 बजे
                      </p>
                      <p className="text-base text-gray-800 dark:text-gray-400">
                        <span className="font-medium">शनि:</span> सुबह 10:00 – दोपहर 2:00 बजे
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links – with branded badge */}
            {/* <div className="relative bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm p-8 rounded-3xl border-2 border-amber-200/60 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#C79A2D]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-5 text-center">
                <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-red-800 to-amber-700 text-white text-sm font-bold rounded-full shadow-md">
                  <span className="tracking-wider">✦ सोशल मीडिया पर जुड़ें ✦</span>
                </div>
                <h4 className="font-bold text-2xl text-gray-900 dark:text-white font-heading-hi">
                  हमें फॉलो करें
                </h4>
                <div className="flex justify-center gap-6 pt-2">
                  {[
                    { icon: Facebook, href: '#', label: 'Facebook', color: 'text-blue-700' },
                    { icon: Twitter, href: '#', label: 'Twitter', color: 'text-sky-500' },
                    { icon: Instagram, href: '#', label: 'Instagram', color: 'text-pink-600' },
                    { icon: Youtube, href: '#', label: 'YouTube', color: 'text-red-700' },
                  ].map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        className="group relative w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-amber-300/50 dark:border-gray-700 flex items-center justify-center hover:border-[#C79A2D] hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        aria-label={social.label}
                      >
                        <Icon className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform duration-300`} />
                        <span className="absolute -bottom-6 text-[10px] font-bold text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {social.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div> */}
          </div>

          {/* Right – Contact Form */}
          <div className="lg:col-span-7 bg-white/90 dark:bg-[#1A1414] backdrop-blur-sm p-8 rounded-3xl border border-amber-200/60 dark:border-gray-800 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
                <h3 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
                  ऑनलाइन संदेश भेजें
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-base font-bold text-gray-700 dark:text-gray-300">
                    <User className="w-4 h-4 text-[#C79A2D]" />
                    पूरा नाम <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="आपका पूरा नाम"
                    className="w-full px-4 py-3 rounded-xl border border-amber-200 dark:border-gray-700 bg-amber-50/50 dark:bg-gray-800 focus:ring-2 focus:ring-[#C79A2D] focus:border-transparent outline-none transition-all text-base"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-base font-bold text-gray-700 dark:text-gray-300">
                    <AtSign className="w-4 h-4 text-[#C79A2D]" />
                    ईमेल <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="आपका ईमेल पता"
                    className="w-full px-4 py-3 rounded-xl border border-amber-200 dark:border-gray-700 bg-amber-50/50 dark:bg-gray-800 focus:ring-2 focus:ring-[#C79A2D] focus:border-transparent outline-none transition-all text-base"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-base font-bold text-gray-700 dark:text-gray-300">
                  <Smartphone className="w-4 h-4 text-[#C79A2D]" />
                  मोबाइल नंबर <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 dark:border-gray-700 bg-amber-50/50 dark:bg-gray-800 focus:ring-2 focus:ring-[#C79A2D] focus:border-transparent outline-none transition-all text-base"
                />
              </div>

              {/* Subject – now a text input */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-base font-bold text-gray-700 dark:text-gray-300">
                  <FileText className="w-4 h-4 text-[#C79A2D]" />
                  विषय <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="उदा. पंजीकरण, परीक्षा तिथि, आदि"
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 dark:border-gray-700 bg-amber-50/50 dark:bg-gray-800 focus:ring-2 focus:ring-[#C79A2D] focus:border-transparent outline-none transition-all text-base"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-base font-bold text-gray-700 dark:text-gray-300">
                  <MessageSquare className="w-4 h-4 text-[#C79A2D]" />
                  संदेश <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="अपनी जिज्ञासा, सुझाव या संदेश यहाँ लिखें..."
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 dark:border-gray-700 bg-amber-50/50 dark:bg-gray-800 focus:ring-2 focus:ring-[#C79A2D] focus:border-transparent outline-none transition-all text-base resize-y"
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#790e03] to-[#A32A2A] hover:from-[#541313] hover:to-[#790e03] text-[#F5F0E6] px-5 pt-3 pb-2 md:pt-4 md:pb-3 rounded-xl text-medium font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 glow-gold"
              >
                <Send className="lucide lucide-log-in w-5 h-5 text-[#ffd36b]" />
                <span>संदेश भेजें</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;