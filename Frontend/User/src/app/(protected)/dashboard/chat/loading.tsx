// Chat Page Loading State
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatLoading() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="h-10 w-10 rounded-lg bg-[#23232A]" />
        <Skeleton className="h-8 w-40 bg-[#23232A]" />
      </div>
      
      <div className="flex-1 border border-[#23232A] rounded-lg p-4 bg-[#1A1A1F] shadow-inner mb-4 h-[60vh]">
        <div className="space-y-4">
          {/* Bot message skeletons */}
          <div className="flex items-start gap-2 max-w-[80%]">
            <Skeleton className="h-8 w-8 rounded-full bg-[#23232A]" />
            <div>
              <Skeleton className="h-4 w-16 mb-1 bg-[#23232A]" />
              <Skeleton className="h-24 w-80 rounded-lg bg-[#23232A]" />
            </div>
          </div>
          
          {/* User message skeletons */}
          <div className="flex items-start gap-2 max-w-[80%] ml-auto">
            <div>
              <Skeleton className="h-4 w-16 mb-1 ml-auto bg-[#23232A]" />
              <Skeleton className="h-16 w-72 rounded-lg bg-[#23232A]" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full bg-[#23232A]" />
          </div>
          
          {/* Bot message skeletons */}
          <div className="flex items-start gap-2 max-w-[80%]">
            <Skeleton className="h-8 w-8 rounded-full bg-[#23232A]" />
            <div>
              <Skeleton className="h-4 w-16 mb-1 bg-[#23232A]" />
              <Skeleton className="h-20 w-64 rounded-lg bg-[#23232A]" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 items-center">
        <Skeleton className="h-12 flex-1 rounded-lg bg-[#23232A]" />
        <Skeleton className="h-12 w-12 rounded-lg bg-[#23232A]" />
      </div>
    </div>
  );
}
