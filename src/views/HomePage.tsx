'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import { WhyChooseSection } from '@/components/home/WhyChooseSection';
import { SkeletonSection } from '@/components/shared/Skeleton';

const StatsSection = dynamic(() => import('../components/home/StatsSection').then(m => m.StatsSection), { loading: () => <SkeletonSection /> });
const ExamScheduleSection = dynamic(() => import('@/components/home/ExamScheduleSection'), { loading: () => <SkeletonSection /> });
const OlympiadShowcaseSection = dynamic(() => import('../components/home/OlympiadShowcaseSection').then(m => m.OlympiadShowcaseSection), { loading: () => <SkeletonSection /> });
const ComparisonSection = dynamic(() => import('../components/home/ComparisonSection').then(m => m.ComparisonSection), { loading: () => <SkeletonSection /> });
const MapSection = dynamic(() => import('../components/home/MapSection').then(m => m.MapSection), { loading: () => <SkeletonSection /> });
const AwardsSection = dynamic(() => import('../components/home/AwardsSection').then(m => m.AwardsSection), { loading: () => <SkeletonSection /> });
const TestimonialsSection = dynamic(() => import('../components/home/TestimonialsSection').then(m => m.TestimonialsSection), { loading: () => <SkeletonSection /> });
const FaqSection = dynamic(() => import('../components/home/FaqSection').then(m => m.FaqSection), { loading: () => <SkeletonSection /> });
const VideoModal = dynamic(() => import('../components/home/VideoModal').then(m => m.VideoModal));

export const HomePage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <HeroSection />
      <AboutSection/>
      <WhyChooseSection/>
      <StatsSection/>
      <ExamScheduleSection />
      {/* <OlympiadShowcaseSection />
      <ComparisonSection />
      <MapSection />
      <AwardsSection /> */}
      <TestimonialsSection />
      <FaqSection />

      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </div>
  );
};
