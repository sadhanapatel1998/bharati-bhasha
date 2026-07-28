import React from "react";
import { Calendar } from "lucide-react";
import { useApp } from "@/context/AppContext";
import SectionHeader from "../shared/SectionHeader";
import { ExamScheduleDates } from "./ExamScheduleDates";
import { ExamKeyInfo } from "./ExamKeyInfo";
import RegistrationFlow from "./RegistrationFlow";

export const ExamScheduleSection: React.FC = () => {
    const { navigateTo } = useApp();

    return (
        <section
            id="schedule"
            className="py-16 bg-gradient-to-b from-amber-50 via-white to-amber-50 relative pb-0 my-0"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <SectionHeader
                    icon={Calendar}
                    badge="सत्र 2026–27 तिथियाँ व रूपरेखा"
                    title="परीक्षा कार्यक्रम एवं तिथियाँ"
                    description="विद्यालय अपनी सुविधा अनुसार हिंदी एवं संस्कृत ओलंपियाड के लिए दिए गए दो विकल्पों में से किसी एक तिथि का चयन कर सकते हैं।"
                />

                {/* 1. Exam Dates */}
                <ExamScheduleDates />

                {/* 2. Key Info */}
                <ExamKeyInfo />
            </div>

            {/* 3. Registration Flow */}
            <RegistrationFlow />
        </section>
    );
};

export default ExamScheduleSection;