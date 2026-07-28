'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { CheckCircle2, Trophy, ShieldCheck, Cpu, Award, GraduationCap } from 'lucide-react';
export const WhyUsPage: React.FC = () => {
  const {
    language,
    navigateTo
  } = useApp();
  const ADVANTAGES = [{
    title: '12-आयामी वैज्ञानिक मूल्यांकन',
    desc: 'व्याकरण, वर्तनी, शब्दज्ञान, समझ, साहित्य व गति का सूक्ष्म विश्लेषण।'
  }, {
    title: '₹1 करोड़ की विशाल छात्रवृत्ति',
    desc: 'राष्ट्रीय विजेताओं को नकद राशि, लैपटॉप, आईपैड एवं पदक।'
  }, {
    title: 'विज्ञान भवन नई दिल्ली में सम्मान',
    desc: 'मान्यवर केंद्रीय मंत्रियों एवं शिक्षाविदों द्वारा प्रशस्ति पत्र।'
  }, {
    title: 'एनईपी 2020 पूर्ण सामंजस्य',
    desc: 'NCERT व राष्ट्रीय पाठ्यचर्या रूपरेखा (NCF) के अनुसार निर्मित।'
  }, {
    title: 'डिजिटल रिपोर्ट कार्ड व ई-सर्टिफिकेट',
    desc: 'QR कोड सत्यापित डिजिटल प्रमाण पत्र एवं पर्सेंटाइल रिपोर्ट।'
  }, {
    title: 'शिक्षकों व विद्यालयों का अभिनंदन',
    desc: 'संयोजक शिक्षकों को नकद प्रोत्साहन राशि एवं सेवा सम्मान।'
  }];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{
      label: 'हमारा चयन क्यों?'
    }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {'विशिष्टता एवं विश्वसनीयता'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {'भारती भाषा ओलंपियाड ही क्यों चुनें?'}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {'देश के 2,850 से अधिक विद्यालयों एवं 4.5 लाख से अधिक अभिभावकों का प्रथम विश्वास'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ADVANTAGES.map((adv, idx) => <div key={idx} className="bg-white dark:bg-[#1A1414] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C79A2D]/10 text-[#C79A2D] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5 text-[#2E8B57]" />
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              {adv.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {adv.desc}
            </p>
          </div>)}
      </div>

      <div className="text-center pt-4">
        <button onClick={() => navigateTo('/registration')} className="bg-[#7B1E1E] hover:bg-[#541313] text-white px-8 py-4 rounded-2xl font-bold text-xs shadow-xl transition-all">
          {'अभी ओलंपियाड पंजीकरण करें'}
        </button>
      </div>

    </div>;
};