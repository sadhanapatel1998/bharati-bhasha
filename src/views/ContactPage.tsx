'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, showToast } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'School Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(language === 'hi' ? 'धन्यवाद! आपका संदेश सफलतापूर्वक प्राप्त हुआ।' : 'Thank you! Your message has been sent successfully.', 'success');
    setFormData({ name: '', email: '', phone: '', subject: 'School Inquiry', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: language === 'hi' ? 'संपर्क करें' : 'Contact Us' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {language === 'hi' ? 'राष्ट्रीय सहायता केंद्र' : 'National Help Desk'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'हमसे संपर्क करें' : 'Contact Bharati Bhasha Olympiad'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-gray-900 dark:text-white">{language === 'hi' ? 'राष्ट्रीय कार्यालय पता' : 'National Secretariat Address'}</h4>
                <p className="text-gray-500 mt-1 leading-relaxed">
                  Bharati Bhasha Olympiad Trust, 4th Floor, Vidya Bhavan, Institutional Area, Deendayal Upadhyaya Marg, New Delhi - 110002, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-2">
              <div className="w-10 h-10 rounded-2xl bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-gray-900 dark:text-white">{language === 'hi' ? 'हेल्पलाइन नंबर' : 'Helpline Support'}</h4>
                <p className="text-gray-500 mt-1">+91 11 2345 6789 / +91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-2">
              <div className="w-10 h-10 rounded-2xl bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-gray-900 dark:text-white">{language === 'hi' ? 'ईमेल आईडी' : 'Official Email'}</h4>
                <p className="text-gray-500 mt-1">support@bharatibhasha.org / info@bharatibhasha.org</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1A1414] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <h3 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'hi' ? 'ऑनलाइन संदेश भेजें' : 'Send an Inquiry Message'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-[#C79A2D]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Email *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-[#C79A2D]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">Message *</label>
              <textarea 
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Write your query details here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-[#C79A2D]"
              />
            </div>

            <button 
              type="submit"
              className="bg-[#7B1E1E] text-white px-8 py-3 rounded-xl font-bold text-xs shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};
