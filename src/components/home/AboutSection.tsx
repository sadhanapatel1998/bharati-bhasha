"use client";

import React from "react";
import {
    Scroll,
    Sparkles,
    CheckCircle2,
    Award,
    ChevronRight,
    BookOpen,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import Image from "next/image";
import Link from "next/link";

const AboutSection: React.FC = () => {
    return (
        <section
            id="about"
            className="relative overflow-hidden py-20 mb-0"
        >
            {/* ================= Background ================= */}

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-28 -left-24 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl animate-floatSlow" />
                <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-orange-400/20 blur-3xl animate-floatReverse" />
                <div className="absolute top-20 left-10 text-7xl font-black text-red-500/15 animate-float">
                    क
                </div>
                <div className="absolute top-40 right-20 text-6xl font-black text-blue-500/15 animate-floatDelay">
                    अ
                </div>
                <div className="absolute bottom-10 left-20 text-5xl font-black text-green-500/15 animate-float">
                    ग
                </div>
                <div className="absolute bottom-10 right-20 text-5xl font-black text-red-500/15 animate-float">
                    इ
                </div>
                <div className="absolute top-8 right-1/3 text-5xl font-black text-orange-500/15 animate-floatSlow">
                    ख
                </div>
            </div>
            {/* ================= Content ================= */}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

                <SectionHeader
                    icon={Scroll}
                    badge="भारतीय भाषाओं के संवर्धन हेतु समर्पित"
                    title="भारती भाषा ओलंपियाड का परिचय"
                    description="हिंदी एवं संस्कृत भाषा के ज्ञान, कौशल और सांस्कृतिक मूल्यों को प्रोत्साहित करने वाली राष्ट्रीय शैक्षिक पहल।"
                />

                <div className="grid lg:grid-cols-12 gap-8 items-stretch my-8">
                    {/* LEFT */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-8 group h-full flex flex-col justify-between">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-orange-500/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition duration-700" />
                            <div className="relative z-10 space-y-5">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    <BookOpen className="w-4 h-4" />
                                    राष्ट्रीय शैक्षिक पहल
                                </div>
                                <p className="text-lg text-slate-800 leading-9 font-medium">
                                    <span className="text-red-700 font-bold text-xl">
                                        भारतीय भाषा ओलंपियाड
                                    </span>{" "}
                                    भारत का प्रथम ऐसा राष्ट्रीय मंच है जो विशेष रूप से{" "}
                                    <span className="text-blue-700 font-bold">
                                        हिंदी एवं संस्कृत भाषाओं
                                    </span>{" "}
                                    के लिए समर्पित है। कक्षा 1 से 10 तक के विद्यार्थियों के लिए आयोजित यह ओलंपियाड भारतीय भाषाओं के प्रति प्रेम, सम्मान और गर्व की भावना को जागृत करता है तथा इन भाषाओं को नई पीढ़ी के लिए अध्ययन का आनंददायक अनुभव बनाता है।
                                </p>
                                <p className="text-lg text-slate-700 leading-9">
                                    हिंदी और संस्कृत हमारी संस्कृति, ज्ञान परंपरा, मूल्य, साहित्य और जीवन दृष्टि का आधार हैं। ये भाषाएँ विद्यार्थियों को अपनी जड़ों से जोड़ती हैं तथा आत्मविश्वास, रचनात्मक सोच और भारतीय ज्ञान परंपरा के प्रति सम्मान विकसित करती हैं।
                                </p>
                                {/* <p className="text-lg text-slate-700 leading-9">"आइए, हम सब मिलकर भारतीय भाषाओं के गौरव को पुनः स्थापित करें और नई पीढ़ी को भाषा, संस्कृति और संस्कार से समृद्ध करें।"</p> */}
                                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500" />
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-3 rounded-full px-7 py-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-bold shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group/button"
                                >
                                    <span className="relative z-10">और पढ़ें</span>
                                    <ChevronRight className="w-5 h-5 relative z-10 group-hover/button:translate-x-1 transition-transform" />
                                    <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover/button:translate-x-[120%] transition duration-700" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-5 flex">
                        <div className="relative w-full max-w-md group h-full">
                            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-r from-blue-500 via-orange-500 to-yellow-400 blur-2xl opacity-30 group-hover:opacity-50 transition duration-500" />
                            <div className="relative overflow-hidden rounded-[32px] border-4 border-white shadow-2xl">
                                <Image
                                    src="/banner/about.jpg"
                                    alt="भारती भाषा ओलंपियाड"
                                    width={600}
                                    height={720}
                                    priority
                                    className="w-full h-auto object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                                <div className="absolute bottom-5 left-5 bg-gradient-to-r from-red-700 to-orange-500 text-white px-5 py-3 rounded-xl shadow-lg animate-float">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-yellow-300" />
                                        <span className="font-bold">राष्ट्रीय स्तर पर मान्य</span>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -top-6 -right-4 bg-white rounded-2xl p-4 shadow-2xl animate-floatReverse border border-yellow-200">
                                <div className="text-center space-y-1">
                                    <div className="text-3xl">🏆</div>
                                    <p className="text-sm font-bold text-red-600">भाषा <span className="text-sm font-bold text-red-600">संस्कृति</span> <span className="text-sm font-bold text-green-600">मूल्य</span> </p>
                                    {/* <p className="text-sm font-bold text-blue-600">संस्कृति</p> */}
                                    {/* <p className="text-sm font-bold text-green-600">मूल्य</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1 */}
                    <div className="group relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-[#0EA5E9] via-[#2563EB] to-[#1D4ED8] text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

                        {/* Decorative Circle */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 group-hover:scale-125 transition duration-700" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform duration-300">
                                <CheckCircle2 className="w-9 h-9 animate-bounceSlow" />
                            </div>

                            <h4 className="font-bold text-2xl leading-snug mb-3">
                                विस्तृत प्रदर्शन रिपोर्ट
                            </h4>

                            <p className="leading-8 text-blue-50 text-medium font-medium">
                                प्रत्येक विद्यार्थी की प्रगति का विस्तृत विश्लेषण उपलब्ध कराया जाता है, जिससे
                                शिक्षक, अभिभावक और विद्यार्थी स्वयं अपनी ताकत, सुधार के क्षेत्रों और आगामी
                                लक्ष्य को स्पष्ट रूप से समझ सकते हैं।
                            </p>

                            <div className="mt-5 flex items-center gap-2 text-yellow-300 font-semibold">
                                <span>व्यक्तिगत प्रदर्शन विश्लेषण</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="group relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-[#047857] via-[#16A34A] to-[#84CC16] text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                        {/* Decorative Circle */}
                        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/10 group-hover:scale-125 transition duration-700" />
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-lime-300/20 blur-xl group-hover:scale-110 transition duration-700" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform duration-300">
                                <Award className="w-9 h-9 animate-bounceSlow" />
                            </div>
                            <h4 className="font-bold text-2xl leading-snug mb-3">
                                NEP 2020 संरेखण
                            </h4>
                            <p className="leading-8 text-green-50 text-medium font-medium">
                                यह ओलंपियाड राष्ट्रीय शिक्षा नीति (NEP 2020) के बहुभाषिक शिक्षा, भारतीय ज्ञान
                                परंपरा, समग्र विकास और योग्यता आधारित शिक्षण के सिद्धांतों के अनुरूप तैयार किया
                                गया है, जिससे विद्यार्थियों में भाषा के साथ-साथ सांस्कृतिक मूल्यों का भी विकास
                                होता है।
                            </p>
                            <div className="mt-5 flex items-center gap-2 text-lime-100 font-semibold">
                                <span>राष्ट्रीय शिक्षा नीति के अनुरूप</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;