// Create Question Loading State
import { Skeleton } from "@/components/ui/skeleton";

export default function CreateQuestionLoading() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="h-10 w-10 rounded-lg bg-[#23232A]" />
        <div>
          <Skeleton className="h-8 w-40 bg-[#23232A] mb-2" />
          <Skeleton className="h-5 w-64 bg-[#23232A]" />
        </div>
      </div>

      {/* Form Skeleton */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 bg-[#23232A]" />
          <Skeleton className="h-10 w-full bg-[#23232A]" />
          <Skeleton className="h-4 w-80 bg-[#23232A]" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-40 bg-[#23232A]" />
          <Skeleton className="h-48 w-full bg-[#23232A]" />
          <Skeleton className="h-4 w-96 bg-[#23232A]" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-20 bg-[#23232A]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 bg-[#23232A]" />
            <Skeleton className="h-10 flex-1 bg-[#23232A]" />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full bg-[#23232A]" />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#2D2D35]">
          <Skeleton className="h-10 w-24 bg-[#23232A]" />
          <Skeleton className="h-10 w-36 bg-[#23232A]" />
        </div>
      </div>
    </div>
  );
}
