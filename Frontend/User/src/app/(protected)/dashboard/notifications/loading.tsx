"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from 'lucide-react';

export default function EventsLoading() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Events</h1>
            <p className="text-gray-400 mt-1">Find and manage upcoming community events</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-[#1E1E24] px-4 py-2 rounded-lg border border-[#2D2D35]">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">Loading...</span>
            </div>
            <Skeleton className="h-10 w-36 rounded-lg bg-[#23232A]" />
          </div>
        </div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="text-white">Events</span>
        </nav>
      </div>

      {/* Filters */}
      <div className="bg-[#18181b] border border-[#23232A] p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-lg bg-[#23232A]" />
            ))}
          </div>
          <Skeleton className="h-9 w-64 rounded-lg bg-[#23232A]" />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[#18181b] border border-[#23232A] rounded-xl overflow-hidden">
            <Skeleton className="w-full h-32 bg-[#23232A]" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 bg-[#23232A] mb-3" />
              <Skeleton className="h-4 w-2/3 bg-[#23232A] mb-3" />
              <Skeleton className="h-4 w-full bg-[#23232A] mb-2" />
              <Skeleton className="h-4 w-5/6 bg-[#23232A] mb-3" />
              <div className="flex items-center mt-2">
                <Skeleton className="h-5 w-5 rounded-full bg-[#23232A] mr-2" />
                <Skeleton className="h-4 w-1/3 bg-[#23232A]" />
              </div>
            </div>
            <div className="border-t border-[#23232A] p-4 flex items-center justify-between">
              <Skeleton className="h-4 w-24 bg-[#23232A]" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-lg bg-[#23232A]" />
                <Skeleton className="h-8 w-8 rounded-lg bg-[#23232A]" />
                <Skeleton className="h-8 w-16 rounded-lg bg-[#23232A]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
