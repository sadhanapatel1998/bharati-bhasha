"use client";

import React, { useState } from "react";
import { Tiro_Devanagari_Hindi, Baloo_2 } from "next/font/google";
import { REGISTRATION_STEPS as REGISTRATION_STEPS_STATIC } from "@/data/olympiadData";
import { useSiteContent } from '@/hooks/useSiteContent';
import {
    ClipboardList,
    UserSquare2,
    FileSpreadsheet,
    Wallet,
    BadgeCheck,
    Send,
    CheckCircle2,
} from "lucide-react";

const tiroDevanagari = { className: '', style: { fontFamily: 'serif' } };
const baloo2 = { className: '', style: { fontFamily: 'serif' } };
const stepIcons = [
    ClipboardList,
    UserSquare2,
    FileSpreadsheet,
    Wallet,
    BadgeCheck,
    Send,
];

// 6 vibrant but slightly darker themes with white content
const STEP_THEMES = [
    {
        circleBg: "bg-gradient-to-br from-blue-400 to-blue-600",
        cardBg: "bg-gradient-to-br from-blue-600 to-blue-800",
        cardHover: "hover:from-blue-500 hover:to-blue-700",
        cardBorder: "border-blue-500",
        cardActive: "border-white shadow-blue-600/60",
        iconBg: "bg-white/20 text-white",
        iconBgActive: "bg-white text-blue-700",
        titleColor: "text-white",
        titleActive: "text-white",
        dot: "bg-blue-400",
    },
    {
        circleBg: "bg-gradient-to-br from-orange-400 to-orange-600",
        cardBg: "bg-gradient-to-br from-orange-600 to-orange-800",
        cardHover: "hover:from-orange-500 hover:to-orange-700",
        cardBorder: "border-orange-500",
        cardActive: "border-white shadow-orange-600/60",
        iconBg: "bg-white/20 text-white",
        iconBgActive: "bg-white text-orange-700",
        titleColor: "text-white",
        titleActive: "text-white",
        dot: "bg-orange-400",
    },
    {
        circleBg: "bg-gradient-to-br from-purple-400 to-purple-600",
        cardBg: "bg-gradient-to-br from-purple-600 to-purple-800",
        cardHover: "hover:from-purple-500 hover:to-purple-700",
        cardBorder: "border-purple-500",
        cardActive: "border-white shadow-purple-600/60",
        iconBg: "bg-white/20 text-white",
        iconBgActive: "bg-white text-purple-700",
        titleColor: "text-white",
        titleActive: "text-white",
        dot: "bg-purple-400",
    },
    {
        circleBg: "bg-gradient-to-br from-green-400 to-green-600",
        cardBg: "bg-gradient-to-br from-green-600 to-green-800",
        cardHover: "hover:from-green-500 hover:to-green-700",
        cardBorder: "border-green-500",
        cardActive: "border-white shadow-green-600/60",
        iconBg: "bg-white/20 text-white",
        iconBgActive: "bg-white text-green-700",
        titleColor: "text-white",
        titleActive: "text-white",
        dot: "bg-green-400",
    },
    {
        circleBg: "bg-gradient-to-br from-rose-400 to-rose-600",
        cardBg: "bg-gradient-to-br from-rose-600 to-rose-800",
        cardHover: "hover:from-rose-500 hover:to-rose-700",
        cardBorder: "border-rose-500",
        cardActive: "border-white shadow-rose-600/60",
        iconBg: "bg-white/20 text-white",
        iconBgActive: "bg-white text-rose-700",
        titleColor: "text-white",
        titleActive: "text-white",
        dot: "bg-rose-400",
    },
    {
        circleBg: "bg-gradient-to-br from-cyan-400 to-cyan-600",
        cardBg: "bg-gradient-to-br from-cyan-600 to-cyan-800",
        cardHover: "hover:from-cyan-500 hover:to-cyan-700",
        cardBorder: "border-cyan-500",
        cardActive: "border-white shadow-cyan-600/60",
        iconBg: "bg-white/20 text-white",
        iconBgActive: "bg-white text-cyan-700",
        titleColor: "text-white",
        titleActive: "text-white",
        dot: "bg-cyan-400",
    },
];

// Rising particle presets (position, size, color, delay, duration)
const RISING_PARTICLES = [
    { pos: "left-[5%]",  size: "w-1 h-1",     color: "bg-blue-400",    delay: "[animation-delay:0s]",   duration: "[animation-duration:12s]" },
    { pos: "left-[11%]", size: "w-1.5 h-1.5", color: "bg-purple-400",  delay: "[animation-delay:0.9s]", duration: "[animation-duration:14s]" },
    { pos: "left-[18%]", size: "w-2 h-2",     color: "bg-amber-400",   delay: "[animation-delay:1.8s]", duration: "[animation-duration:16s]" },
    { pos: "left-[24%]", size: "w-1 h-1",     color: "bg-emerald-400", delay: "[animation-delay:2.7s]", duration: "[animation-duration:18s]" },
    { pos: "left-[31%]", size: "w-1.5 h-1.5", color: "bg-rose-400",    delay: "[animation-delay:3.6s]", duration: "[animation-duration:20s]" },
    { pos: "left-[37%]", size: "w-2 h-2",     color: "bg-cyan-400",    delay: "[animation-delay:4.5s]", duration: "[animation-duration:12s]" },
    { pos: "left-[44%]", size: "w-1 h-1",     color: "bg-blue-400",    delay: "[animation-delay:5.4s]", duration: "[animation-duration:14s]" },
    { pos: "left-[50%]", size: "w-1.5 h-1.5", color: "bg-purple-400",  delay: "[animation-delay:6.3s]", duration: "[animation-duration:16s]" },
    { pos: "left-[57%]", size: "w-2 h-2",     color: "bg-amber-400",   delay: "[animation-delay:7.2s]", duration: "[animation-duration:18s]" },
    { pos: "left-[63%]", size: "w-1 h-1",     color: "bg-emerald-400", delay: "[animation-delay:8.1s]", duration: "[animation-duration:20s]" },
    { pos: "left-[70%]", size: "w-1.5 h-1.5", color: "bg-rose-400",    delay: "[animation-delay:9s]",   duration: "[animation-duration:12s]" },
    { pos: "left-[76%]", size: "w-2 h-2",     color: "bg-cyan-400",    delay: "[animation-delay:9.9s]", duration: "[animation-duration:14s]" },
    { pos: "left-[83%]", size: "w-1 h-1",     color: "bg-blue-400",    delay: "[animation-delay:10.8s]", duration: "[animation-duration:16s]" },
    { pos: "left-[90%]", size: "w-1.5 h-1.5", color: "bg-purple-400",  delay: "[animation-delay:11.7s]", duration: "[animation-duration:18s]" },
];

// Progress bar width classes (based on active step)
const PROGRESS_WIDTHS = [
    "w-[0%]",        // no active
    "w-[16.67%]",    // step 1
    "w-[33.33%]",    // step 2
    "w-[50%]",       // step 3
    "w-[66.67%]",    // step 4
    "w-[83.33%]",    // step 5
    "w-[100%]",      // step 6
];

export default function RegistrationFlow() {
  const REGISTRATION_STEPS = useSiteContent<typeof REGISTRATION_STEPS_STATIC>('registration_steps', REGISTRATION_STEPS_STATIC);
    const [activeStep, setActiveStep] = useState<number | null>(null);

    const progressWidth = PROGRESS_WIDTHS[activeStep !== null ? activeStep + 1 : 0];

    return (
        <>

            <div className="relative w-full py-16 px-4 sm:px-8 overflow-hidden mb-0
                bg-gradient-to-br from-[#EEF4FF] via-[#F5EEFF] to-[#FFF4E8]">

                {/* ============ BACKGROUND PATTERNS ============ */}

                {/* 1) Diagonal subtle stripes */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.05]
                        bg-[repeating-linear-gradient(45deg,#94a3b8_0px,#94a3b8_1px,transparent_1px,transparent_14px)]"
                />

                {/* 2) Animated dot grid */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.07]
                        bg-[radial-gradient(circle,#64748b_1px,transparent_1px)]
                        bg-[length:28px_28px] rf-grid-pan"
                />

                {/* 3) Cross grid overlay */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.05]
                        bg-[linear-gradient(#94a3b8_1px,transparent_1px),linear-gradient(90deg,#94a3b8_1px,transparent_1px)]
                        bg-[length:80px_80px]"
                />

                {/* 4) Drifting color orbs */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-[10%] left-[6%] w-72 h-72 rounded-full bg-blue-300/25 blur-3xl rf-orb-1" />
                    <div className="absolute top-[35%] right-[5%] w-80 h-80 rounded-full bg-purple-300/25 blur-3xl rf-orb-2" />
                    <div className="absolute bottom-[8%] left-[30%] w-80 h-80 rounded-full bg-amber-300/25 blur-3xl rf-orb-3" />
                    <div className="absolute bottom-[20%] right-[20%] w-64 h-64 rounded-full bg-rose-300/20 blur-3xl rf-orb-1 [animation-delay:-5s]" />
                    <div className="absolute top-[60%] left-[4%] w-56 h-56 rounded-full bg-emerald-300/20 blur-3xl rf-orb-2 [animation-delay:-7s]" />
                </div>

                {/* 5) Rotating dashed rings */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-[12%] right-[10%] w-40 h-40 rounded-full border-2 border-dashed border-blue-300/40 rf-spin-slow" />
                    <div className="absolute bottom-[12%] left-[8%] w-52 h-52 rounded-full border border-dashed border-purple-300/35 rf-spin-slow-rev" />
                    <div className="absolute top-[50%] right-[20%] w-28 h-28 rounded-full border-2 border-dotted border-amber-300/40 rf-spin-slow [animation-duration:30s]" />
                </div>

                {/* 6) Rising colored particles */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                    {RISING_PARTICLES.map((p, i) => (
                        <span
                            key={i}
                            className={`absolute bottom-0 ${p.pos} ${p.size} ${p.color} rounded-full opacity-30 rf-rise ${p.delay} ${p.duration}`}
                        />
                    ))}
                </div>

                {/* 7) Floating star sparkles */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-[15%] left-[12%] text-2xl text-blue-400/40 rf-float">✦</div>
                    <div className="absolute top-[68%] right-[10%] text-3xl text-purple-400/40 rf-float [animation-delay:1s]">✦</div>
                    <div className="absolute bottom-[22%] left-[42%] text-xl text-amber-400/40 rf-float [animation-delay:2s]">✦</div>
                    <div className="absolute top-[38%] right-[28%] text-xl text-emerald-400/35 rf-drift">✧</div>
                    <div className="absolute bottom-[38%] left-[8%] text-2xl text-rose-400/35 rf-drift [animation-delay:3s]">✧</div>
                </div>

                {/* ============ CONTENT ============ */}
                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-red-800 text-amber-50 text-sm font-bold tracking-wider uppercase mb-3 rf-float shadow-lg">
                            सरल &bull; पारदर्शी &bull; निष्पक्ष
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-red-950 leading-tight">
                            पंजीकरण प्रक्रिया
                        </h2>
                        <p className="text-lg sm:text-xl text-amber-800 mt-2 max-w-2xl mx-auto font-semibold">
                            केवल छह सरल चरणों में अपने विद्यालय का ओलंपियाड पंजीकरण करें।
                        </p>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-amber-200 rounded-full mb-10 overflow-hidden">
                        <div
                            className={`h-full bg-gradient-to-r from-red-800 via-amber-500 to-red-800 rf-gradient-shift transition-all duration-500 ${progressWidth}`}
                        />
                    </div>

                    {/* Steps timeline */}
                    <div className="space-y-8 relative">
                        <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-0.5 bg-amber-300 -translate-x-1/2 hidden sm:block" />

                        {REGISTRATION_STEPS.map((step, idx) => {
                            const Icon = stepIcons[idx] || ClipboardList;
                            const isEven = idx % 2 === 0;
                            const isActive = activeStep === idx;
                            const theme = STEP_THEMES[idx % STEP_THEMES.length];

                            return (
                                <div
                                    key={step.stepNumber}
                                    className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                                    onMouseEnter={() => setActiveStep(idx)}
                                    onMouseLeave={() => setActiveStep(null)}
                                >
                                    {/* Step number (circle) */}
                                    <div className={`relative flex-shrink-0 w-12 h-12 rounded-full ${theme.circleBg} text-white flex items-center justify-center text-xl font-bold shadow-lg z-10 transition-transform duration-300 hover:scale-110 ${isActive ? 'rf-pulse-ring scale-110' : ''}`}>
                                        {String(step.stepNumber).padStart(2, "0")}
                                    </div>

                                    {/* Content card */}
                                    <div
                                        className={`flex-1 p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${theme.cardBg} ${theme.cardHover} ${isActive
                                            ? `${theme.cardActive} shadow-xl scale-[1.02]`
                                            : `${theme.cardBorder} shadow-lg`
                                            } hover:shadow-xl hover:-translate-y-1`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`p-2 rounded-full ${isActive ? theme.iconBgActive : theme.iconBg} transition-colors duration-300`}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3
                                                    className={`text-2xl sm:text-2xl font-bold ${isActive ? theme.titleActive : theme.titleColor} transition-colors`}
                                                >
                                                    {step.title}
                                                </h3>
                                                <p className="text-sm sm:text-lg font-semibold text-white/90 leading-relaxed mt-1">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Connector dot (for desktop) */}
                                    {idx < REGISTRATION_STEPS.length - 1 && (
                                        <div className={`absolute left-5 sm:left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full ${theme.dot} border-2 border-white hidden sm:block`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <button
                            className="inline-flex cursor-pointer items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-amber-50 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <BadgeCheck className="w-6 h-6" />
                            <span>अभी विद्यालय का पंजीकरण करें</span>
                        </button>
                        <p className="mt-4 text-lg text-amber-700">
                            पंजीकरण अंतिम तिथि: <span className="font-bold">30 नवंबर 2026</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}