import React from "react";
import { Award, BookOpen, Calendar, GraduationCap, Medal, Sparkles, Star, Target, Trophy } from "lucide-react";
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
            className="relative overflow-hidden py-16 pb-0 my-0 bg-white"
        >

            {/* ===== Animated Background Layers ===== */}

            {/* 1) Moving color dot grid */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.08]
            bg-[radial-gradient(#2563EB_1px,transparent_1px)]
            [background-size:24px_24px] byo-grid-move"
            />

            {/* 2) Diagonal olympiad stripes (subtle) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04]
            bg-[repeating-linear-gradient(45deg,#7c3aed_0px,#7c3aed_1px,transparent_1px,transparent_18px)]"
            />

            {/* 3) Cross grid (paper-like) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.05]
            bg-[linear-gradient(#64748b_1px,transparent_1px),linear-gradient(90deg,#64748b_1px,transparent_1px)]
            [background-size:80px_80px]"
            />

            {/* 4) Floating color blobs */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl byo-blob-1" />
                <div className="absolute top-20 right-[-80px] h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl byo-blob-2" />
                <div className="absolute bottom-20 left-1/3 h-60 w-60 rounded-full bg-amber-300/25 blur-3xl byo-blob-3" />
                <div className="absolute bottom-10 right-20 h-44 w-44 rounded-full bg-purple-300/20 blur-2xl byo-blob-2" />
                <div className="absolute top-1/2 left-[10%] h-56 w-56 rounded-full bg-rose-300/20 blur-3xl byo-blob-1 [animation-delay:-4s]" />
                <div className="absolute top-[35%] right-[15%] h-48 w-48 rounded-full bg-emerald-300/20 blur-3xl byo-blob-3 [animation-delay:-6s]" />
            </div>

            {/* 5) Flowing light ribbon */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3
            bg-gradient-to-r from-transparent via-white/70 to-transparent
            skew-x-[-25deg] byo-light-sweep"
            />

            {/* 6) Rotating dashed orbits (olympiad vibe) */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[12%] left-[6%] w-56 h-56 rounded-full border-2 border-dashed border-blue-300/40 byo-orbit" />
                <div className="absolute top-[40%] right-[6%] w-72 h-72 rounded-full border border-dashed border-amber-300/40 byo-orbit-rev" />
                <div className="absolute bottom-[10%] left-[35%] w-48 h-48 rounded-full border-2 border-dotted border-purple-300/40 byo-orbit [animation-duration:30s]" />
            </div>

            {/* 7) Twinkling stars */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-16 left-16 h-2 w-2 rounded-full bg-yellow-400 byo-star-twinkle" />
                <div className="absolute top-24 right-28 h-1.5 w-1.5 rounded-full bg-blue-500 byo-star-twinkle [animation-delay:0.6s]" />
                <div className="absolute bottom-24 left-1/4 h-2 w-2 rounded-full bg-cyan-400 byo-star-twinkle [animation-delay:1.2s]" />
                <div className="absolute bottom-20 right-16 h-1.5 w-1.5 rounded-full bg-amber-400 byo-star-twinkle [animation-delay:1.8s]" />
                <div className="absolute top-[30%] left-[45%] h-2 w-2 rounded-full bg-rose-400 byo-star-twinkle [animation-delay:2.4s]" />
                <div className="absolute top-[65%] right-[35%] h-1.5 w-1.5 rounded-full bg-emerald-400 byo-star-twinkle [animation-delay:3s]" />
            </div>

            {/* 8) Floating sparkles (rotating) */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <Sparkles className="absolute top-[20%] left-[20%] w-8 h-8 text-fuchsia-400/40 byo-sparkle" />
                <Sparkles className="absolute top-[55%] right-[12%] w-6 h-6 text-cyan-400/40 byo-sparkle [animation-delay:1s]" />
                <Sparkles className="absolute bottom-[25%] left-[8%] w-7 h-7 text-amber-400/40 byo-sparkle [animation-delay:2s]" />
            </div>

            {/* ===== Floating Olympiad Icons ===== */}

            {/* Trophy — top-left */}
            <div aria-hidden className="pointer-events-none absolute top-12 left-10 text-blue-500/15 byo-icon-float-1">
                <Trophy className="w-20 h-20 rotate-[-12deg]" />
            </div>

            {/* Medal — top-right */}
            <div aria-hidden className="pointer-events-none absolute top-24 right-16 text-amber-500/15 byo-icon-float-2">
                <Medal className="w-16 h-16 rotate-12" />
            </div>

            {/* BookOpen — bottom-left */}
            <div aria-hidden className="pointer-events-none absolute bottom-10 left-8 text-cyan-500/15 byo-icon-float-3">
                <BookOpen className="w-16 h-16 rotate-[-8deg]" />
            </div>

            {/* GraduationCap — bottom-right */}
            <div aria-hidden className="pointer-events-none absolute bottom-8 right-8 text-purple-500/15 byo-icon-float-4">
                <GraduationCap className="w-20 h-20 rotate-6" />
            </div>

            {/* Sparkles — bottom-left (rotating) */}
            <div aria-hidden className="pointer-events-none absolute bottom-2 left-9 text-blue-400/20 byo-icon-rotate">
                <Sparkles className="w-12 h-12" />
            </div>

            {/* Award — top-right-mid */}
            <div aria-hidden className="pointer-events-none absolute top-1/3 right-11 text-amber-400/15 byo-icon-float-2 [animation-delay:2s]">
                <Award className="w-14 h-14 rotate-12" />
            </div>

            {/* Additional small icons */}
            <div aria-hidden className="pointer-events-none absolute top-[8%] left-[48%] text-rose-400/12 byo-icon-float-3">
                <Star className="w-10 h-10 rotate-12" />
            </div>
            <div aria-hidden className="pointer-events-none absolute bottom-[18%] right-[40%] text-emerald-400/12 byo-icon-float-1 [animation-delay:3s]">
                <Target className="w-12 h-12 rotate-[-6deg]" />
            </div>

            {/* ===== Content ===== */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    icon={Calendar}
                    badge="सत्र 2026–27 तिथियाँ व रूपरेखा"
                    title="परीक्षा कार्यक्रम एवं तिथियाँ"
                    description="विद्यालय अपनी सुविधा अनुसार हिंदी एवं संस्कृत ओलंपियाड के लिए दिए गए दो विकल्पों में से किसी एक तिथि का चयन कर सकते हैं।"
                />

                <div className="relative">
                    <ExamScheduleDates />

                    <div className="mt-8">
                        <ExamKeyInfo />
                    </div>
                </div>
            </div>

            {/* Registration Flow */}
            <div className="relative z-10">
                <RegistrationFlow />
            </div>
        </section>
    );
};

export default ExamScheduleSection;