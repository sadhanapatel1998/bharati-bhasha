'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { BLOG_POSTS } from '../data/olympiadData';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
export const BlogsPage: React.FC = () => {
  const {
    language,
    navigateTo
  } = useApp();
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{
      label: 'ब्लॉग व विचार'
    }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-[#7B1E1E]/10 text-[#7B1E1E] dark:text-[#C79A2D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {'भाषा अनुसंधान एवं आलेख'}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          {'भाषा, शिक्षा व विज्ञान ब्लॉग'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => <div key={post.id} onClick={() => navigateTo('/blog-detail', {
        blogId: post.id
      })} className="bg-white dark:bg-[#1A1414] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-4 left-4 bg-[#7B1E1E] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>

                <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-[#7B1E1E] dark:group-hover:text-[#C79A2D] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-[#C79A2D]">
              <span>{post.author}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>)}
      </div>

    </div>;
};