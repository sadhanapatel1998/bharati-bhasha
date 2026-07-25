'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { GALLERY_ITEMS } from '../data/olympiadData';
import { Play, Image as ImageIcon, X } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { language } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const categories = ['All', 'Events', 'Exams', 'Awards', 'Schools', 'Videos'];

  const filtered = activeCategory === 'All' 
    ? GALLERY_ITEMS 
    : activeCategory === 'Videos' 
    ? GALLERY_ITEMS.filter(g => g.type === 'video')
    : GALLERY_ITEMS.filter(g => g.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: language === 'hi' ? 'गैलरी' : 'Image & Video Gallery' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {language === 'hi' ? 'स्मृति चित्र व वीडियो' : 'Photo & Video Gallery'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {language === 'hi' ? 'राष्ट्रीय आयोजनों की झलकियाँ' : 'Olympiad Moments & Felicitation Highlights'}
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat ? 'bg-[#7B1E1E] text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedMedia(item)}
            className="group relative bg-black rounded-3xl overflow-hidden shadow-lg cursor-pointer h-64 border border-gray-100 dark:border-gray-800"
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <span className="text-[10px] font-bold uppercase text-[#C79A2D] mb-1">
                {item.category}
              </span>
              <h3 className="font-bold text-sm text-white leading-snug">
                {item.title}
              </h3>
            </div>
            {item.type === 'video' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#7B1E1E] text-white flex items-center justify-center shadow-xl">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Media Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative bg-white dark:bg-[#1A1414] max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl p-4">
            <button 
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedMedia.image} alt={selectedMedia.title} className="w-full max-h-[70vh] object-cover rounded-2xl" />
            <h3 className="font-bold text-base text-gray-900 dark:text-white mt-4 text-center">{selectedMedia.title}</h3>
          </div>
        </div>
      )}

    </div>
  );
};
