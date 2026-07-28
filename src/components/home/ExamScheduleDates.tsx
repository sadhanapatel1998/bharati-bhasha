import React from "react";
import Image from "next/image";
import { EXAM_SCHEDULES } from "@/data/olympiadData";

export const ExamScheduleDates: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl space-y-8 mb-12">
      <div className="flex items-center justify-between border-b-2 border-amber-200 pb-4">
        <div>
          <h3 className="text-3xl font-bold font-heading-hi text-red-950">
            विषयवार परीक्षा तिथियाँ (Exam Schedule 2026)
          </h3>
          <p className="text-lg text-amber-800 font-bold font-devanagari">
            प्रत्येक विषय हेतु दो लचीले विकल्प उपलब्ध हैं
          </p>
        </div>
        <span className="hidden sm:inline-block px-4 pb-1 pt-2 bg-lime-900 text-amber-100 font-bold text-base rounded-2xl">
          ऑफलाइन ओएमआर आधारित
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXAM_SCHEDULES.map((sched) => (
          <div
            key={sched.subject}
            className="bg-red-950 p-6 rounded-2xl border-2 border-amber-400/80 shadow-md space-y-6 hover:shadow-lg transition-all"
          >
            {/* Subject Header */}
            <div className="relative overflow-hidden rounded-xl border border-amber-400 bg-red-950">
              <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="font-heading-hi w-15 h-15 sm:w-14 sm:h-14 rounded-xl bg-amber-500 text-red-950 flex items-center justify-center font-bold text-2xl shadow-md flex-shrink-0">
                    {sched.subject === "Hindi" ? "हिं" : "सं"}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xl sm:text-2xl font-bold font-heading-hi text-amber-200 leading-tight">
                      {sched.subjectHindi}
                    </h4>
                    <p className="text-lg text-amber-300 font-devanagari">
                      कक्षा 1 से 10 के विद्यार्थियों हेतु
                    </p>
                  </div>
                </div>
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
              <img
                src={sched.image}
                alt={sched.subjectHindi}
                className="absolute right-2 bottom-0 w-20 opacity-90 sm:hidden"
              />
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border-2 border-amber-300 space-y-1 shadow-sm">
                <span className="text-base font-black text-lime-900 uppercase tracking-wider block border-b border-amber-200 pb-1">
                  विकल्प – I
                </span>
                <p className="text-xl font-bold text-slate-900 font-devanagari pt-1">
                  {sched.option1Date}
                </p>
                <p className="text-base font-semibold text-blue-800">
                  ({sched.option1Day})
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-amber-300 space-y-1 shadow-sm">
                <span className="text-base font-black text-lime-900 uppercase tracking-wider block border-b border-amber-200 pb-1">
                  विकल्प – II
                </span>
                <p className="text-xl font-bold text-slate-900 font-devanagari pt-1">
                  {sched.option2Date}
                </p>
                <p className="text-base font-semibold text-blue-800">
                  ({sched.option2Day})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};