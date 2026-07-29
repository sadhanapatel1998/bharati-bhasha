'use client';

import React, { useState } from 'react';
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  CheckCircle2,
  FileText,
  Send,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { SchoolRegistrationFormData } from '../types/index';
import { BOARD_OPTIONS, INITIAL_FORM_DATA } from '../data/olympiadData';

interface RegistrationPageProps {
  onSuccess?: () => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<SchoolRegistrationFormData>(INITIAL_FORM_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [regNumber, setRegNumber] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation – required fields
    const requiredFields: (keyof SchoolRegistrationFormData)[] = [
      'schoolName',
      'city',
      'state',
      'mobileNumber',
      'email',
      'principalName',
      'principalMobile',
      'principalEmail',
      'coordinatorName',
      'coordinatorMobile',
      'coordinatorEmail',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert('कृपया सभी आवश्यक स्टार (*) वाले फ़ील्ड भरें।');
        return;
      }
    }

    // Generate registration number
    const generatedRegNum = 'BBO-2026-' + Math.floor(100000 + Math.random() * 900000);
    setRegNumber(generatedRegNum);
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setSubmitted(false);
    setRegNumber('');
  };

  return (
    <section id="registration" className="py-16 bg-gradient-to-b from-amber-50 via-white to-amber-100/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-amber-800 font-bold text-sm tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            <FileText className="w-4 h-4 text-red-800" />
            <span>सत्र 2026–27 आधिकारिक पंजीकरण</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading-hi text-red-950">
            हिंदी एवं संस्कृत ओलंपियाड पंजीकरण फ़ॉर्म
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-devanagari max-w-2xl mx-auto">
            विद्यालय द्वारा आधिकारिक प्रविष्टि हेतु नीचे दिए गए सभी विवरण भरें।
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-800 via-amber-600 to-red-800 mx-auto rounded-full"></div>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-emerald-500 shadow-2xl text-center space-y-6 font-devanagari">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-4 border-emerald-400 shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                सफलतापूर्वक पंजीकृत
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold font-heading-hi text-red-950">
                विद्यालय पंजीकरण पूर्ण हुआ!
              </h3>
              <p className="text-slate-700 text-base">
                <strong>{formData.schoolName}</strong> का पंजीकरण भारतीय भाषा ओलंपियाड 2026-27 हेतु प्राप्त हो गया है।
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 inline-block max-w-md w-full">
              <p className="text-xs text-amber-900 font-bold uppercase">आपका विद्यालय पंजीकरण संदर्भ संख्या:</p>
              <p className="text-2xl sm:text-3xl font-black text-red-900 tracking-wider pt-1">{regNumber}</p>
            </div>

            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              पंजीकरण की पुष्टि एवं आगे की दिशा-निर्देश सामग्री आपके ई-मेल <strong>{formData.email}</strong> तथा समन्वयक मोबाइल नंबर पर शीघ्र प्रेषित कर दी जाएगी।
            </p>

            <button
              onClick={resetForm}
              className="px-6 py-2.5 bg-red-900 text-amber-100 font-bold text-sm rounded-xl hover:bg-red-950 transition-colors cursor-pointer"
            >
              दूसरा नया पंजीकरण करें
            </button>
          </div>
        ) : (
          /* Main Form Card */
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-amber-400 shadow-2xl space-y-8 font-devanagari">
            {/* Form Top Warning Banner */}
            <div className="bg-amber-100/80 p-4 rounded-xl border border-amber-300 text-xs sm:text-sm text-slate-800 space-y-1">
              <p className="font-bold text-red-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-800" />
                <span>महत्वपूर्ण निर्देश:</span>
              </p>
              <p>• कृपया सभी विवरण सही-सही भरें। प्रमाणपत्र जारी करने में सहायता के लिए जानकारी स्पष्ट रूप से लिखें।</p>
              <p>• ई-मेल पते और मोबाइल नंबर का उपयोग अध्ययन सामग्री, परीक्षा कार्यक्रम, परिणाम व पुरस्कार अपडेट साझा करने के लिए किया जाएगा।</p>
            </div>

            {/* Section Heading: खंड क - संपर्क विवरण */}
            <div className="space-y-6">
              <div className="border-b-2 border-amber-300 pb-2">
                <h3 className="text-xl font-bold font-heading-hi text-red-950 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-red-900 text-amber-100 text-xs flex items-center justify-center font-black">
                    क
                  </span>
                  <span>संपर्क विवरण (Contact Details)</span>
                </h3>
              </div>

              {/* 1. School Code & School Name */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    1. विद्यालय स्कूल कोड <span className="text-slate-500 font-normal">(यदि ज्ञात न हो तो खाली छोड़ें)</span>
                  </label>
                  <input
                    type="text"
                    name="schoolCode"
                    value={formData.schoolCode}
                    onChange={handleChange}
                    placeholder="उदा. BBO-1024"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm bg-amber-50/40"
                  />
                </div>

                <div className="md:col-span-8 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    2. विद्यालय का पूरा नाम <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    required
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="उदा. दिल्ली पब्लिक स्कूल / केंद्रीय विद्यालय"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm bg-amber-50/40 font-semibold"
                  />
                </div>
              </div>

              {/* 3. Address Grid */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  3. विद्यालय का पूर्ण पता <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="सड़क, क्षेत्र, पॉकेट या लैंडमार्क"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm bg-amber-50/40"
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">शहर (City) *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="उदा. दिल्ली"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-amber-50/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">जिला (District)</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="उदा. रोहिणी"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-amber-50/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">राज्य (State) *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="उदा. दिल्ली"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-amber-50/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">पिन कोड (Pincode)</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="110085"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-amber-50/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">विद्यालय मोबाइल नंबर *</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-amber-50/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">ई-मेल (E-mail) *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="school@example.com"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-amber-50/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">वेबसाइट (Website)</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="www.schoolname.com"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-amber-50/40"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Board Affiliation Radio Options */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-800">
                  5. विद्यालय संबद्धता (Board Affiliation) <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-wrap gap-3 pt-1">
                  {BOARD_OPTIONS.map((board) => (
                    <label key={board} className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-300 text-xs font-semibold text-slate-800 cursor-pointer hover:bg-amber-100">
                      <input
                        type="radio"
                        name="boardAffiliation"
                        value={board}
                        checked={formData.boardAffiliation === board}
                        onChange={handleChange}
                        className="accent-red-800"
                      />
                      <span>{board}</span>
                    </label>
                  ))}
                </div>
                {formData.boardAffiliation === 'अन्य (Other)' && (
                  <div className="mt-2">
                    <label className="block text-[11px] font-bold text-slate-700">कृपया उल्लेख करें</label>
                    <input
                      type="text"
                      name="otherBoard"
                      value={formData.otherBoard}
                      onChange={handleChange}
                      placeholder="अन्य बोर्ड का नाम"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-amber-50/40"
                    />
                  </div>
                )}
              </div>

              {/* 6. Principal Details */}
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-300 space-y-3">
                <h4 className="font-bold text-red-950 text-sm font-heading-hi flex items-center gap-1.5">
                  <User className="w-4 h-4 text-red-800" />
                  <span>6. प्रधानाचार्य का विवरण (Principal Details)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">प्रधानाचार्य का नाम *</label>
                    <input
                      type="text"
                      name="principalName"
                      required
                      value={formData.principalName}
                      onChange={handleChange}
                      placeholder="डॉ. / प्रो. / श्री / श्रीमती"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">मोबाईल नंबर *</label>
                    <input
                      type="tel"
                      name="principalMobile"
                      required
                      value={formData.principalMobile}
                      onChange={handleChange}
                      placeholder="+91 9812345678"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">ई-मेल *</label>
                    <input
                      type="email"
                      name="principalEmail"
                      required
                      value={formData.principalEmail}
                      onChange={handleChange}
                      placeholder="principal@school.com"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 7. Olympiad Coordinator Details */}
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-300 space-y-3">
                <h4 className="font-bold text-red-950 text-sm font-heading-hi flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-800" />
                  <span>7. ओलंपियाड प्रभारी / संपर्क समन्वयक विवरण (Coordinator Details)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">समन्वयक का नाम *</label>
                    <input
                      type="text"
                      name="coordinatorName"
                      required
                      value={formData.coordinatorName}
                      onChange={handleChange}
                      placeholder="भाषा अध्यापक का नाम"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">मोबाईल नंबर (WhatsApp) *</label>
                    <input
                      type="tel"
                      name="coordinatorMobile"
                      required
                      value={formData.coordinatorMobile}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">ई-मेल *</label>
                    <input
                      type="email"
                      name="coordinatorEmail"
                      required
                      value={formData.coordinatorEmail}
                      onChange={handleChange}
                      placeholder="teacher@school.com"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Estimated Student Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-red-950 text-amber-100 rounded-xl space-y-1">
                  <label className="block text-xs font-bold text-amber-200">
                    अनुमानित हिंदी प्रतिभागी छात्र संख्या:
                  </label>
                  <input
                    type="number"
                    min={5}
                    name="estimatedParticipantsHindi"
                    value={formData.estimatedParticipantsHindi}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-red-900 border border-amber-400/50 text-amber-100 text-sm font-bold"
                  />
                </div>

                <div className="p-3 bg-amber-950 text-amber-100 rounded-xl space-y-1">
                  <label className="block text-xs font-bold text-amber-200">
                    अनुमानित संस्कृत प्रतिभागी छात्र संख्या:
                  </label>
                  <input
                    type="number"
                    min={5}
                    name="estimatedParticipantsSanskrit"
                    value={formData.estimatedParticipantsSanskrit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-amber-900 border border-amber-400/50 text-amber-100 text-sm font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-red-800 via-red-900 to-amber-900 hover:from-red-900 hover:to-amber-950 text-amber-100 font-black text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-amber-400 flex items-center justify-center gap-2 mx-auto"
              >
                <Send className="w-5 h-5 text-amber-300" />
                <span>पंजीकरण फ़ॉर्म जमा करें (Submit Registration)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default RegistrationPage;