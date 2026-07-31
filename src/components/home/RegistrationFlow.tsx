"use client";

import React, { useState } from "react";
import { Tiro_Devanagari_Hindi, Baloo_2 } from "next/font/google";
import { REGISTRATION_STEPS } from "@/data/olympiadData";
import {
    ClipboardList,
    UserSquare2,
    FileSpreadsheet,
    Wallet,
    BadgeCheck,
    Send,
    CheckCircle2,
} from "lucide-react";

const tiroDevanagari = Tiro_Devanagari_Hindi({
    weight: ["400"],
    subsets: ["devanagari"],
    display: "swap",
});

const baloo2 = Baloo_2({
    weight: ["500", "600", "700", "800"],
    subsets: ["devanagari", "latin"],
    display: "swap",
});

const stepIcons = [
    ClipboardList,
    UserSquare2,
    FileSpreadsheet,
    Wallet,
    BadgeCheck,
    Send,
];

export default function RegistrationFlow() {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    return (
        <div className="relative w-full py-16 px-4 sm:px-8 overflow-hidden mb-0
                bg-gradient-to-br from-[#fcf9f0] via-[#f8f3e8] to-[#f3ede0]
                after:absolute after:inset-0 after:pointer-events-none after:opacity-[0.03]
                after:bg-[radial-gradient(circle_at_20%_30%,#d4b896_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#e8d5b5_1px,transparent_1px)]
                after:bg-[length:60px_60px,80px_80px]
                after:bg-[position:0_0,40px_40px]">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-red-800 text-amber-50 text-sm font-bold tracking-wider uppercase mb-3">
                        सरल &bull; पारदर्शी &bull; निष्पक्ष 
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-bold text-red-950 leading-tight">
                        पंजीकरण प्रक्रिया
                    </h2>
                    <p className="text-lg sm:text-xl text-amber-800 mt-2 max-w-2xl mx-auto font-semibold">
                        केवल छह सरल चरणों में अपने विद्यालय का ओलंपियाड पंजीकरण करें।
                    </p>
                </div>

                {/* Progress bar (optional) */}
                <div className="w-full h-1.5 bg-amber-200 rounded-full mb-10 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-red-800 to-amber-500 transition-all duration-500"
                        style={{ width: `${(activeStep !== null ? activeStep + 1 : 0) / REGISTRATION_STEPS.length * 100}%` }}
                    />
                </div>

                {/* Steps timeline */}
                <div className="space-y-8 relative">
                    {/* Vertical line (hidden on small screens) */}
                    <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-0.5 bg-amber-300 -translate-x-1/2 hidden sm:block" />

                    {REGISTRATION_STEPS.map((step, idx) => {
                        const Icon = stepIcons[idx] || ClipboardList;
                        const isEven = idx % 2 === 0;
                        const isActive = activeStep === idx;

                        return (
                            <div
                                key={step.stepNumber}
                                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                                    }`}
                                onMouseEnter={() => setActiveStep(idx)}
                                onMouseLeave={() => setActiveStep(null)}
                            >
                                {/* Step number (circle) */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-800 text-amber-50 flex items-center justify-center text-xl font-bold shadow-lg z-10 transition-transform duration-300 hover:scale-110">
                                    {String(step.stepNumber).padStart(2, "0")}
                                </div>

                                {/* Content card */}
                                <div
                                    className={`flex-1 p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${isActive
                                        ? "border-amber-500 shadow-xl bg-white"
                                        : "border-amber-200 shadow-md bg-white/80 backdrop-blur-sm"
                                        } hover:shadow-xl hover:-translate-y-1`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`p-2 rounded-full ${isActive ? "bg-red-800 text-amber-50" : "bg-amber-100 text-red-800"
                                                } transition-colors duration-300`}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3
                                                className={`text-2xl sm:text-2xl font-bold ${isActive ? "text-red-900" : "text-red-800"
                                                    } transition-colors`}
                                                style={{ fontFamily: baloo2.style.fontFamily }}
                                            >
                                                {step.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-slate-800 leading-relaxed mt-1">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Connector dot (for desktop) */}
                                {idx < REGISTRATION_STEPS.length - 1 && (
                                    <div className="absolute left-5 sm:left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 border-2 border-white hidden sm:block" />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <button
                        className="inline-flex cursor-pointer items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-amber-50 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        style={{ fontFamily: baloo2.style.fontFamily }}
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
    );
}