import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; route?: PageRoute }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { language, navigateTo } = useApp();

  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 my-4 flex-wrap">
      <button 
        onClick={() => navigateTo('home')}
        className="flex items-center gap-1 hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>मुख्य पृष्ठ</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600" />
          {item.route ? (
            <button 
              onClick={() => navigateTo(item.route!)}
              className="hover:text-[#7B1E1E] dark:hover:text-[#C79A2D] transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-bold truncate max-w-xs">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
