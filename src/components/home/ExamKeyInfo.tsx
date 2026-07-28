import React from "react";
import {
  BookMarked,
  FileCheck,
  HelpCircle,
  Clock,
  Award,
  Scroll,
  Info,
} from "lucide-react";
import { EXAM_DETAILS } from "@/data/olympiadData";
import SectionHeader from "../shared/SectionHeader";

const ICONS = {
  BookMarked,
  FileCheck,
  HelpCircle,
  Clock,
  Award,
  Scroll,
};

export const ExamKeyInfo: React.FC = () => {
  return (
    <div className="space-y-6 mb-16 ">
      <div className="text-center mt-25">
        <SectionHeader
          icon={Info}
          badge="परीक्षा की मुख्य विशेषताएँ"
          title="महत्वपूर्ण जानकारी"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {EXAM_DETAILS.map((detail, index) => {
          const Icon = ICONS[detail.icon as keyof typeof ICONS];
          return (
            <div
              key={detail.id}
              className={`relative bg-white rounded-[24px] overflow-hidden
          border border-amber-200 shadow-lg
          hover:-translate-y-2 hover:shadow-xl duration-300
          ${
            index % 2 === 0
              ? "border-b-[6px] border-b-blue-950"
              : "border-b-[6px] border-b-[#C79A2D]"
          }`}
            >
              {/* Number Ribbon */}
              <div
                className={`absolute top-0 left-0 w-14 h-14 rounded-br-[32px]
            flex items-start justify-start pl-2.5 pt-1.5 text-white
            text-2xl font-black
            ${index % 2 === 0 ? "bg-blue-950" : "bg-[#C79A2D]"}`}
              >
                {(index + 1).toString().padStart(2, "0")}
              </div>

              <div className="px-6 pt-10 pb-6 text-center">
                {/* Icon Circle */}
                <div className="mx-auto mb-4 w-20 h-20 rounded-full border-2 border-dashed border-amber-300 flex items-center justify-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md
                ${index % 2 === 0 ? "bg-blue-950" : "bg-[#C79A2D]"}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-2xl font-bold text-red-800 leading-tight font-devanagari">
                  {detail.label.split("(")[0]}
                </h3>
                <p className="uppercase tracking-wide text-red-700 font-bold text-base mt-1">
                  ({detail.label.match(/\((.*?)\)/)?.[1]})
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center my-4">
                  <div className="w-20 h-[2px] bg-amber-400"></div>
                  <div className="mx-3 w-3 h-3 rotate-45 border-2 border-amber-500"></div>
                  <div className="w-20 h-[2px] bg-amber-400"></div>
                </div>

                {/* Value */}
                <p className="text-xl font-bold text-blue-950 leading-snug font-devanagari">
                  {detail.value}
                </p>
                <p className="mt-2 text-gray-700 text-lg leading-6 font-devanagari">
                  {detail.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
