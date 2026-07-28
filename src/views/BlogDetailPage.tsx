'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { BLOG_POSTS } from '../data/olympiadData';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart } from 'lucide-react';
export const BlogDetailPage: React.FC = () => {
  const {
    language,
    routeParams,
    navigateTo,
    showToast
  } = useApp();
  const blogId = routeParams?.blogId || 'blog1';
  const post = BLOG_POSTS.find(b => b.id === blogId) || BLOG_POSTS[0];
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{
      label: 'ब्लॉग',
      route: '/blogs'
    }, {
      label: post.title
    }]} />

      <button onClick={() => navigateTo('/blogs')} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B1E1E] dark:text-[#C79A2D] hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>{'सभी ब्लॉग पर वापस जाएँ'}</span>
      </button>

      <div className="space-y-4">
        <span className="bg-[#7B1E1E] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {post.category}
        </span>

        <h1 className="font-playfair text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-y border-gray-100 dark:border-gray-800 py-3">
          <span className="font-bold text-gray-900 dark:text-white">{post.author} ({post.authorRole})</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden h-80 sm:h-96 shadow-lg">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        <p className="font-semibold text-base text-gray-900 dark:text-white">
          {post.excerpt}
        </p>
        <p>
          {post.content}
        </p>
        <p>
          {'भारतीय भाषाओं के पुनरोद्धार और वैज्ञानिक व्याकरण शिक्षण से ही विद्यार्थियों का सर्वांगीण मानसिक विकास संभव है। राष्ट्रीय शिक्षा नीति 2020 इस दिशा में ऐतिहासिक कदम उठा रही है।'}
        </p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          {post.tags.map((tg, i) => <span key={i} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-semibold">
              #{tg}
            </span>)}
        </div>

        <button onClick={() => showToast('ब्लॉग लिंक कॉपी कर दिया गया है!', 'info')} className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#7B1E1E]">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

    </div>;
};