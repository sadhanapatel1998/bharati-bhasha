'use client';

import React, { useState } from 'react';
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import { StatsSection } from '../components/home/StatsSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { OlympiadShowcaseSection } from '../components/home/OlympiadShowcaseSection';
import { ComparisonSection } from '../components/home/ComparisonSection';
import { MapSection } from '../components/home/MapSection';
import { AwardsSection } from '../components/home/AwardsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FaqSection } from '../components/home/FaqSection';
import { VideoModal } from '../components/home/VideoModal';
import { WhyChooseSection } from '@/components/home/WhyChooseSection';

export const HomePage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <HeroSection />
      <AboutSection/>
      <WhyChooseSection/>
      <StatsSection/>
      <ProcessSection />
      <OlympiadShowcaseSection />
      <ComparisonSection />
      <MapSection />
      <AwardsSection />
      <TestimonialsSection />
      <FaqSection />

      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </div>
  );
};