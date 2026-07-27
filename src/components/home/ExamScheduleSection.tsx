import React from 'react';
import { Calendar, Clock, FileText, CheckCircle2, Award, BookOpen, Layers, Users, CreditCard, FileCheck2, UserCheck, Trophy } from 'lucide-react';
import { EXAM_SCHEDULES, EXAM_DETAILS, REGISTRATION_STEPS } from '@/data/olympiadData';
import Image from "next/image";

interface ExamScheduleSectionProps {
    onOpenRegistration: () => void;
}

export const ExamScheduleSection: React.FC<ExamScheduleSectionProps> = ({ onOpenRegistration }) => {
    return (
        <section id="schedule" className="py-16 bg-gradient-to-b from-amber-50 via-white to-amber-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center space-y-3 mb-12">
                    <div className="inline-flex items-center gap-2 text-amber-800 font-bold text-sm tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                        <Calendar className="w-4 h-4 text-red-800" />
                        <span>सत्र 2026–27 तिथियाँ व रूपरेखा</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading-hi text-red-950">
                        परीक्षा कार्यक्रम एवं तिथियाँ
                    </h2>
                    <p className="text-slate-700 text-base sm:text-lg font-devanagari max-w-2xl mx-auto">
                        विद्यालय अपनी सुविधा अनुसार हिंदी एवं संस्कृत ओलंपियाड के लिए दिए गए दो विकल्पों में से किसी एक तिथि का चयन कर सकते हैं।
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-800 via-amber-600 to-red-800 mx-auto rounded-full"></div>
                </div>

                {/* Exam Dates Cards / Schedule Table (Page 5 Top) */}
                <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl space-y-8 mb-12">
                    <div className="flex items-center justify-between border-b-2 border-amber-200 pb-4">
                        <div>
                            <h3 className="text-2xl font-bold font-heading-hi text-red-950">
                                विषयवार परीक्षा तिथियाँ (Exam Schedule 2026)
                            </h3>
                            <p className="text-xs text-amber-800 font-bold font-devanagari">
                                प्रत्येक विषय हेतु दो लचीले विकल्प उपलब्ध हैं
                            </p>
                        </div>
                        <span className="hidden sm:inline-block px-3 py-1 bg-red-900 text-amber-100 font-bold text-xs rounded-lg">
                            ऑफलाइन ओएमआर आधारित
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {EXAM_SCHEDULES.map((sched) => (
                            <div
                                key={sched.subject}
                                className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 p-6 rounded-2xl border-2 border-amber-400/80 shadow-md space-y-6 hover:shadow-lg transition-all"
                            >
                                {/* Subject Header */}
                                <div className="relative overflow-hidden rounded-xl border border-amber-400 bg-red-950">
                                    <div className="flex items-center justify-between gap-4 p-4 sm:p-5">

                                        {/* Left */}
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-500 text-red-950 flex items-center justify-center font-bold text-2xl shadow-md flex-shrink-0">
                                                {sched.subject === "Hindi" ? "हिं" : "सं"}
                                            </div>

                                            <div className="min-w-0">
                                                <h4 className="text-xl sm:text-2xl font-bold font-heading-hi text-amber-200 leading-tight">
                                                    {sched.subjectHindi}
                                                </h4>

                                                <p className="text-xs sm:text-sm text-amber-300 font-devanagari">
                                                    कक्षा 1 से 10 के विद्यार्थियों हेतु
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right Image */}
                                        <div className="hidden sm:flex flex-shrink-0 items-end">
                                            <Image
                                                src={sched.image}
                                                alt={sched.subjectHindi}
                                                width={140}
                                                height={90}
                                                className="w-30 md:w-40 lg:w-40 h-auto object-contain"
                                                priority={sched.subject === "Hindi"}
                                            />
                                        </div>
                                    </div>

                                    {/* Mobile Image */}
                                    <img
                                        src={sched.image}
                                        alt={sched.subjectHindi}
                                        className="absolute right-2 bottom-0 w-20 opacity-90 sm:hidden"
                                    />
                                </div>

                                {/* Dates Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Option I */}
                                    <div className="bg-white p-4 rounded-xl border-2 border-amber-300 space-y-1 shadow-sm">
                                        <span className="text-xs font-black text-red-900 uppercase tracking-wider block border-b border-amber-200 pb-1">
                                            विकल्प – I
                                        </span>
                                        <p className="text-base font-bold text-slate-900 font-devanagari pt-1">
                                            {sched.option1Date}
                                        </p>
                                        <p className="text-xs font-semibold text-amber-800">
                                            ({sched.option1Day})
                                        </p>
                                    </div>

                                    {/* Option II */}
                                    <div className="bg-white p-4 rounded-xl border-2 border-amber-300 space-y-1 shadow-sm">
                                        <span className="text-xs font-black text-red-900 uppercase tracking-wider block border-b border-amber-200 pb-1">
                                            विकल्प – II
                                        </span>
                                        <p className="text-base font-bold text-slate-900 font-devanagari pt-1">
                                            {sched.option2Date}
                                        </p>
                                        <p className="text-xs font-semibold text-amber-800">
                                            ({sched.option2Day})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Important Exam Info Grid (Page 5 Middle) */}
                <div className="space-y-6 mb-16">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold font-heading-hi text-red-950">
                            महत्वपूर्ण जानकारी (Key Exam Specifications)
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {EXAM_DETAILS.map((detail) => (
                            <div
                                key={detail.id}
                                className="bg-white p-4 rounded-2xl border border-amber-300 shadow-sm text-center space-y-2 hover:bg-amber-50/80 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-xl bg-red-900 text-amber-300 flex items-center justify-center mx-auto shadow">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-950 text-xs font-devanagari uppercase tracking-wide">
                                        {detail.label}
                                    </h4>
                                    <p className="text-sm font-bold text-slate-900 font-devanagari mt-1">
                                        {detail.value}
                                    </p>
                                    <p className="text-[10px] text-amber-800 font-medium leading-tight mt-1">
                                        {detail.subtext}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Registration Flow Timeline (Page 5 Bottom - 6 Steps) */}
                <div className="bg-gradient-to-br from-red-950 via-amber-950 to-red-950 text-amber-100 rounded-3xl p-6 sm:p-10 border-2 border-amber-400 shadow-2xl space-y-8">
                    <div className="text-center space-y-2">
                        <span className="bg-amber-500 text-red-950 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-block">
                            सरल एवं पारदर्शी
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold font-heading-hi text-amber-200">
                            पंजीकरण प्रक्रिया (6 चरणबद्ध सोपान)
                        </h3>
                        <p className="text-xs sm:text-sm text-amber-100/90 font-devanagari">
                            विद्यालयों हेतु ओलंपियाड में सहभागिता की आसान चरणबद्ध विधि
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                        {REGISTRATION_STEPS.map((step) => {
                            const icons = [BookOpen, Users, CreditCard, FileCheck2, UserCheck, Trophy];
                            const StepIcon = icons[step.stepNumber - 1] || BookOpen;

                            return (
                                <div
                                    key={step.stepNumber}
                                    className="bg-red-900/50 backdrop-blur p-4 rounded-xl border border-amber-500/40 relative flex flex-col justify-between space-y-3"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="w-7 h-7 rounded-full bg-amber-500 text-red-950 font-black text-xs flex items-center justify-center shadow">
                                                0{step.stepNumber}
                                            </span>
                                            <StepIcon className="w-5 h-5 text-amber-300" />
                                        </div>
                                        <h4 className="font-bold text-amber-200 text-sm font-devanagari">
                                            {step.title}
                                        </h4>
                                        <p className="text-[11px] text-amber-100/80 font-devanagari leading-snug">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center pt-2">
                        <button
                            onClick={onOpenRegistration}
                            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-red-950 font-black text-base rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-amber-200 inline-flex items-center gap-2"
                        >
                            <FileText className="w-5 h-5" />
                            <span>अभी विद्यालय का पंजीकरण करें</span>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};
export default ExamScheduleSection;
