"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { Clock } from 'lucide-react';

export default function FeedLoading() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Feed</h1>
            <p className="text-gray-400 mt-1">Latest posts and updates</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-[#1E1E24] px-4 py-2 rounded-lg border border-[#2D2D35]">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">Loading...</span>
            </div>
            <Skeleton className="h-10 w-36 rounded-lg bg-[#23232A]" />
          </div>
        </div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="text-white">Feed</span>
        </nav>
      </div>
      
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#18181b] border border-[#23232A] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-10 w-10 rounded-full bg-[#23232A]" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-[#23232A]" />
                    <Skeleton className="h-3 w-20 bg-[#23232A]" />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full bg-[#23232A]" />
                  <Skeleton className="h-4 w-full bg-[#23232A]" />
                  <Skeleton className="h-4 w-3/4 bg-[#23232A]" />
                </div>
                <div className="pt-4 border-t border-[#23232A] flex gap-4">
                  <Skeleton className="h-6 w-16 bg-[#23232A]" />
                  <Skeleton className="h-6 w-16 bg-[#23232A]" />
                  <Skeleton className="h-6 w-16 bg-[#23232A]" />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              <div className="bg-[#18181b] border border-[#23232A] rounded-xl">
                <div className="p-4 border-b border-[#23232A]">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded bg-[#23232A]" />
                    <Skeleton className="h-6 w-40 bg-[#23232A]" />
                  </div>
                </div>
                <div className="p-0">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4 border-b border-[#23232A] flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full bg-[#23232A]" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full bg-[#23232A]" />
                        <Skeleton className="h-3 w-1/2 bg-[#23232A]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
