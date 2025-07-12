// QA Page Loading State
import { Skeleton } from "@/components/ui/skeleton";

export default function QALoading() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Skeleton className="h-8 w-48 bg-[#23232A]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24 bg-[#23232A]" />
          <Skeleton className="h-8 w-36 bg-[#23232A]" />
        </div>
      </div>
      
      {/* Tag Filter Skeleton */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 bg-[#23232A] rounded-full" />
        ))}
      </div>
      
      {/* Question Card Skeletons */}
      <div className="space-y-4">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="border border-[#23232A] rounded-xl p-5 bg-[#18181b]">
            <div className="mb-3">
              <Skeleton className="h-6 w-4/5 bg-[#23232A] mb-2" />
              <div className="flex gap-2 mt-2">
                {Array(3).fill(0).map((_, j) => (
                  <Skeleton key={j} className="h-5 w-16 bg-[#23232A] rounded-full" />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Skeleton className="h-8 w-20 bg-[#23232A] rounded-lg" />
                <Skeleton className="h-8 w-20 bg-[#23232A] rounded-lg" />
              </div>
              <Skeleton className="h-8 w-24 bg-[#23232A] rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
