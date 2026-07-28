"use client";

import React from "react";
import { Scroll, Sparkles, CheckCircle2, Award, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import Link from "next/link";

export const AboutSection: React.FC = () => {
    const { navigateTo } = useApp();

    return (
        <section
            id="about"
            className="mb-0 relative py-16 overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-amber-50/80"
        >
            {/* Decorative background pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `
            radial-gradient(circle at 20% 30%, #790e03 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, #C79A2D 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px, 80px 80px",
                    backgroundPosition: "0 0, 40px 40px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                {/* Section Header */}
                <SectionHeader
                    icon={Scroll}
                    badge="भारतीय भाषाओं के संवर्धन हेतु समर्पित"
                    title="भारती भाषा ओलंपियाड का परिचय"
                // description="हिंदी एवं संस्कृत भाषा के ज्ञान, कौशल और सांस्कृतिक मूल्यों को प्रोत्साहित करने वाली राष्ट्रीय शैक्षिक पहल।" 
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8">
                    {/* Left – Text Content */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Main description card */}
                        <div className="relative bg-white p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            {/* Corner decorations */}
                            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg" />
                            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg" />

                            <div className="space-y-4">
                                <p className="text-lg text-slate-800 leading-relaxed font-devanagari font-medium">
                                    <span className="font-bold text-red-900 text-lg sm:text-xl">
                                        भारतीय भाषा ओलंपियाड
                                    </span>{" "}
                                    भारत का प्रथम ऐसा राष्ट्रीय मंच है जो विशेष रूप से{" "}
                                    <span className="font-bold text-red-900">
                                        हिंदी एवं संस्कृत भाषाओं
                                    </span>{" "}
                                    के लिए समर्पित है। कक्षा 1 से 10 तक के विद्यार्थियों के लिए
                                    आयोजित किया जाने वाला यह ओलंपियाड भारतीय भाषाओं के प्रति प्रेम,
                                    सम्मान और गर्व की भावना को जागृत करता है तथा इन भाषाओं को नई
                                    पीढ़ी के लिए अध्ययन का आनंददायक अनुभव बनाता है।
                                </p>

                                <p className="text-lg text-slate-800 leading-relaxed font-devanagari">
                                    हिंदी और संस्कृत हमारी संस्कृति, ज्ञान परंपरा, मूल्य, साहित्य
                                    और जीवन दृष्टि का आधार हैं।    हिंदी और संस्कृत हमारी संस्कृति, ज्ञान परंपरा, मूल्य, साहित्य
                                    और जीवन दृष्टि का आधार हैं।
                                </p>

                                <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent" />
                                {/* <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                > */}
                                {/* <div className="pt-4 space-y-4 border-t border-amber-200/60">
                                        <p className="text-lg text-slate-800 leading-relaxed font-devanagari">
                                            ये भाषाएँ हमें हमारी जड़ों से
                                            जोड़ती हैं और विचारों की गहराई, अभिव्यक्ति की सुंदरता तथा
                                            संवाद की प्रभावशीलता विकसित करती हैं।
                                        </p>

                                        <p className="text-lg text-slate-800 leading-relaxed font-devanagari">
                                            हमारा ओलंपियाड न केवल ज्ञान परीक्षण है, बल्कि यह बच्चों में
                                            भाषाई रचनात्मकता, तार्किक चिंतन और सांस्कृतिक गर्व को भी
                                            बढ़ावा देता है। हमारी टीम विशेषज्ञ शिक्षकों, भाषा वैज्ञानिकों
                                            और परीक्षा निर्माताओं द्वारा गठित है, जो प्रत्येक विद्यार्थी
                                            के समग्र विकास के लिए प्रतिबद्ध है।
                                        </p>
                                        <p className="text-lg text-slate-800 leading-relaxed font-devanagari">
                                            हम भारतीय भाषाओं के महत्व को पहचानते हैं और उन्हें आधुनिक
                                            शिक्षा के साथ एकीकृत करने का कार्य करते हैं। इस ओलंपियाड
                                            के माध्यम से हम हिंदी और संस्कृत की समृद्ध विरासत को नई
                                            पीढ़ी तक पहुँचाने का प्रयास करते हैं।
                                        </p>
                                    </div> */}
                                {/* </div> */}

                                {/* Read More / Read Less Button */}
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-2 mt-2 text-red-800 font-bold hover:text-amber-700 transition-colors duration-200 group cursor-pointer"
                                >
                                    <span>और पढ़ें</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Two feature cards – now with animated hover */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="group p-5 bg-white rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <h4 className="font-bold text-red-950 font-heading-hi text-lg mb-1 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                                    विस्तृत प्रदर्शन रिपोर्ट (Insights)
                                </h4>
                                <p className="text-lg text-slate-800 font-devanagari leading-relaxed">
                                    विद्यार्थियों, शिक्षकों और अभिभावकों को उपयोगी अंतर्दृष्टि
                                    प्रदान करती है जिससे सीखने की प्रक्रिया लक्ष्यकेंद्रित बनती
                                    है।
                                </p>
                            </div>

                            <div className="group p-5 bg-white rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <h4 className="font-bold text-red-950 font-heading-hi text-lg mb-1 flex items-center gap-1.5">
                                    <Award className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                                    NEP 2020 संरेखण
                                </h4>
                                <p className="text-lg text-slate-800 font-devanagari leading-relaxed">
                                    बहुभाषिक शिक्षा, भारतीय ज्ञान परंपरा, समग्र एवं योग्यता
                                    आधारित शिक्षा के मूल सिद्धांतों से पूर्णतः संरेखित है।
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right – Image with decorative frame */}
                    <div className="lg:col-span-5 flex items-center justify-center">
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 hover:shadow-3xl transition-shadow duration-500 group">
                                <Image
                                    src="/banner/about-img.jpg"
                                    alt="Registration Process"
                                    width={600}
                                    height={700}
                                    priority
                                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay badge */}
                                <div className="absolute bottom-4 left-4 bg-red-900/90 backdrop-blur-sm text-amber-50 px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-400" />
                                        <span>राष्ट्रीय स्तर पर मान्य</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;