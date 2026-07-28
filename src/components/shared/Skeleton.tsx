import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${className}`} />
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={`h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1A1414] space-y-3 ${className}`}>
    <Skeleton className="h-5 w-1/2" />
    <SkeletonText lines={2} />
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 4 }) => (
  <div className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
    <div className="grid gap-4 p-3 bg-gray-50 dark:bg-[#1A1414]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols }).map((_, i) => <Skeleton key={i} className="h-3 w-2/3" />)}
    </div>
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="grid gap-4 p-3 border-t border-gray-100 dark:border-gray-800" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, c) => <Skeleton key={c} className="h-3 w-full" />)}
      </div>
    ))}
  </div>
);

export const SkeletonSection: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4 ${className}`}>
    <Skeleton className="h-8 w-1/3" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);
