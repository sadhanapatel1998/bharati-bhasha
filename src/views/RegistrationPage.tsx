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
import { BOARD_OPTIONS, COUNTRY_OPTIONS, INITIAL_FORM_DATA } from '../data/olympiadData';
import SectionHeader from '@/components/shared/SectionHeader';

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

    if (formData.country === 'विदेश (Other)') {
      requiredFields.push('otherCountry');
    }

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert('कृपया सभी आवश्यक स्टार (*) वाले फ़ील्ड भरें।');
        return;
      }
    }

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
        <SectionHeader
          icon={FileText}
          badge="भारतीय भाषाओं के संवर्धन हेतु समर्पित"
          title="हिंदी ओलंपियाड पंजीकरण फ़ॉर्म"
          description='विद्यालय द्वारा आधिकारिक प्रविष्टि हेतु नीचे दिए गए सभी विवरण भरें।'
        />

        {submitted ? (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-emerald-500 shadow-2xl text-center space-y-6 font-devanagari">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-4 border-emerald-400 shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-sm uppercase tracking-wider">
                सफलतापूर्वक पंजीकृत
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold font-heading-hi text-red-950">
                विद्यालय पंजीकरण पूर्ण हुआ!
              </h3>
              <p className="text-base text-slate-900">
                <strong>{formData.schoolName}</strong> का पंजीकरण भारतीय भाषा ओलंपियाड 2026-27 हेतु प्राप्त हो गया है।
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 inline-block max-w-md w-full">
              <p className="text-sm text-amber-900 font-bold uppercase">आपका विद्यालय पंजीकरण संदर्भ संख्या:</p>
              <p className="text-2xl sm:text-3xl font-black text-red-900 tracking-wider pt-1">{regNumber}</p>
            </div>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              पंजीकरण की पुष्टि एवं आगे की दिशा-निर्देश सामग्री आपके ई-मेल <strong>{formData.email}</strong> तथा समन्वयक मोबाइल नंबर पर शीघ्र प्रेषित कर दी जाएगी।
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-2.5 bg-red-900 text-amber-100 font-bold text-base rounded-xl hover:bg-red-950 transition-colors cursor-pointer"
            >
              दूसरा नया पंजीकरण करें
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-amber-400 shadow-2xl space-y-8 font-devanagari">
            {/* Warning Banner */}
            <div className="bg-red-100/60 p-4 rounded-xl border border-red-300 text-medium text-slate-800 space-y-1 font-semibold">
              <p className="font-bold text-red-950 flex items-center gap-1.5 text-xl">
                <ShieldCheck className="w-5 h-5 text-red-800" />
                <span>महत्वपूर्ण निर्देश:</span>
              </p>
              <p>• कृपया नीचे दिए गए सभी विवरण सही-सही भरें। प्रमाणपत्र जारी करने में सहायता के लिए जानकारी स्पष्ट रूप से बड़े अक्षरों (BLOCK LETTERS) में लिखें।</p>
              <p>• ईमेल पते और व्हाट्सएप/मोबाइल नंबरों का उपयोग नेक्स्टजेन ओलंपियाड से संबंधित जानकारी जैसे पंजीकरण, तैयारी सामग्री, परीक्षा कार्यक्रम, परिणाम, पुरस्कार और अन्य महत्वपूर्ण अपडेट साझा करने के लिए किया जाएगा।</p>
            </div>

            {/* Section – Contact Details */}
            <div className="space-y-6">
              <div className="border-b-2 border-amber-300 pb-2">
                <h3 className="text-3xl font-bold font-heading-hi text-red-950 flex items-center gap-2">
                  <span>संपर्क विवरण (Contact Details) – बड़े अक्षरों में भरें</span>
                </h3>
              </div>

              {/* 1. School Code */}
              <div>
                <label className="block text-lg font-bold text-slate-800">
                  1. भारतीय भाषा ओलंपियाड स्कूल कोड{' '}
                  <span className="text-slate-500 font-normal">(यदि ज्ञात न हो तो खाली छोड़ें)</span>
                </label>
                <input
                  type="text"
                  name="schoolCode"
                  value={formData.schoolCode}
                  onChange={handleChange}
                  placeholder="उदा. BBO-1024"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-base bg-amber-50/40"
                />
              </div>

              {/* 2. School Name */}
              <div>
                <label className="block text-lg font-bold text-slate-800">
                  2. विद्यालय का नाम <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="schoolName"
                  required
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="उदा. दिल्ली पब्लिक स्कूल / केंद्रीय विद्यालय"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-base bg-amber-50/40 font-semibold"
                />
              </div>

              {/* 3. Address */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-slate-800">
                  3. विद्यालय का पता <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="सड़क, क्षेत्र, पॉकेट या लैंडमार्क"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-base bg-amber-50/40"
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-medium font-bold text-slate-900">शहर (City) *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="उदा. दिल्ली"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                    />
                  </div>
                  <div>
                    <label className="block text-medium font-bold text-slate-900">जिला (District)</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="उदा. रोहिणी"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                    />
                  </div>
                  <div>
                    <label className="block text-medium font-bold text-slate-900">राज्य (State) *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="उदा. दिल्ली"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                    />
                  </div>
                  <div>
                    <label className="block text-medium font-bold text-slate-900">पिन कोड (Pincode)</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="110085"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                    />
                  </div>
                </div>

                {/* Country Dropdown */}
                <div>
                  <label className="block text-medium font-bold text-slate-900">देश (Country)</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                  >
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Conditional Other Country Input */}
                {formData.country === 'विदेश (Other)' && (
                  <div>
                    <label className="block text-medium font-bold text-slate-900">
                      कृपया देश का नाम लिखें <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="otherCountry"
                      value={formData.otherCountry || ''}
                      onChange={handleChange}
                      placeholder="उदा. USA, UK, UAE, etc."
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-medium font-bold text-slate-900">विद्यालय मोबाइल नंबर *</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                    />
                  </div>
                  <div>
                    <label className="block text-medium font-bold text-slate-900">लैंडलाइन नंबर (Landline)</label>
                    <input
                      type="tel"
                      name="landline"
                      value={formData.landline}
                      onChange={handleChange}
                      placeholder="011-12345678"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                    />
                  </div>
                  <div>
                    <label className="block text-medium font-bold text-slate-900">ई-मेल (E-mail) *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="school@example.com"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-medium font-bold text-slate-900">वेबसाइट (Website)</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="www.schoolname.com"
                    className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                  />
                </div>
              </div>

              {/* 5. Board Affiliation */}
              <div className="space-y-2 pt-2">
                <label className="block text-lg font-bold text-slate-800">
                  5. विद्यालय संबद्धता (Board Affiliation) <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-wrap gap-3 pt-1">
                  {BOARD_OPTIONS.map((board) => (
                    <label
                      key={board}
                      className="flex items-center justify-center gap-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-300 text-sm font-semibold text-slate-800 cursor-pointer hover:bg-amber-100 text-center min-h-[35px]"
                    >
                      <input
                        type="radio"
                        name="boardAffiliation"
                        value={board}
                        checked={formData.boardAffiliation === board}
                        onChange={handleChange}
                        className="accent-red-800 shrink-0"
                      />
                      <span className="text-center pt-2">
                        {board}
                      </span>
                    </label>
                  ))}
                </div>
                {formData.boardAffiliation === 'अन्य (Other)' && (
                  <div className="mt-2">
                    <label className="block text-medium font-bold text-slate-900">कृपया उल्लेख करें</label>
                    <input
                      type="text"
                      name="otherBoard"
                      value={formData.otherBoard}
                      onChange={handleChange}
                      placeholder="अन्य बोर्ड का नाम"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-amber-50/40"
                    />
                  </div>
                )}
              </div>

              {/* 6. Principal Details */}
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-300 space-y-3">
                <h4 className="font-bold text-red-950 text-lg font-heading-hi flex items-center gap-1.5">
                  <span>6. प्रधानाचार्य का विवरण (Principal Details)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-medium font-bold text-slate-900">प्रधानाचार्य का नाम *</label>
                    <input
                      type="text"
                      name="principalName"
                      required
                      value={formData.principalName}
                      onChange={handleChange}
                      placeholder="डॉ. / प्रो. / श्री / श्रीमती"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-medium font-bold text-slate-900">मोबाईल नंबर *</label>
                    <input
                      type="tel"
                      name="principalMobile"
                      required
                      value={formData.principalMobile}
                      onChange={handleChange}
                      placeholder="+91 9812345678"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-medium font-bold text-slate-900">ई-मेल *</label>
                    <input
                      type="email"
                      name="principalEmail"
                      required
                      value={formData.principalEmail}
                      onChange={handleChange}
                      placeholder="principal@school.com"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 7. Olympiad Coordinator */}
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-300 space-y-3">
                <h4 className="font-bold text-red-950 text-lg font-heading-hi flex items-center gap-1.5">
                  <span>7. ओलंपियाड प्रभारी / संपर्क समन्वयक (Coordinator Details)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-medium font-bold text-slate-900">समन्वयक का नाम *</label>
                    <input
                      type="text"
                      name="coordinatorName"
                      required
                      value={formData.coordinatorName}
                      onChange={handleChange}
                      placeholder="भाषा अध्यापक का नाम"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-medium font-bold text-slate-900">मोबाईल नंबर (WhatsApp) *</label>
                    <input
                      type="tel"
                      name="coordinatorMobile"
                      required
                      value={formData.coordinatorMobile}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-medium font-bold text-slate-900">ई-मेल *</label>
                    <input
                      type="email"
                      name="coordinatorEmail"
                      required
                      value={formData.coordinatorEmail}
                      onChange={handleChange}
                      placeholder="teacher@school.com"
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-base bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Estimated Participants (optional) */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-red-950 text-amber-100 rounded-xl space-y-1">
                  <label className="block text-medium font-bold text-amber-200">
                    अनुमानित हिंदी प्रतिभागी छात्र संख्या:
                  </label>
                  <input
                    type="number"
                    min={5}
                    name="estimatedParticipantsHindi"
                    value={formData.estimatedParticipantsHindi}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-red-900 border border-amber-400/50 text-amber-100 text-base font-bold"
                  />
                </div>
                <div className="p-3 bg-amber-950 text-amber-100 rounded-xl space-y-1">
                  <label className="block text-medium font-bold text-amber-200">
                    अनुमानित संस्कृत प्रतिभागी छात्र संख्या:
                  </label>
                  <input
                    type="number"
                    min={5}
                    name="estimatedParticipantsSanskrit"
                    value={formData.estimatedParticipantsSanskrit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-amber-900 border border-amber-400/50 text-amber-100 text-base font-bold"
                  />
                </div>
              </div> */}
            </div>

            {/* Submit */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="px-8 py-2.5 bg-gradient-to-r from-red-800 via-red-900 to-amber-900 hover:from-red-900 hover:to-amber-950 text-amber-100 font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-amber-400 flex items-center justify-center gap-2 mx-auto"
              >
                <Send className="w-5 h-5 text-amber-300" />
                <span className='pt-2'>पंजीकरण फ़ॉर्म जमा करें</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default RegistrationPage;