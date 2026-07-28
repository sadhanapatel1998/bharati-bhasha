import { SkeletonTable } from '@/components/shared/Skeleton';

export default function AdminLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SkeletonTable rows={6} cols={4} />
    </div>
  );
}
