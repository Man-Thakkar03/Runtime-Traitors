"use client"

import { Skeleton } from '@/components/ui/skeleton';

export default function CreatePostLoading() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Create New Post</h1>
            <p className="text-gray-400 mt-1">Share your thoughts with the community</p>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-32 rounded-lg bg-[#23232A]" />
          </div>
        </div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-white transition-colors cursor-pointer">Feed</span>
          <span className="mx-2">/</span>
          <span className="text-white">Create Post</span>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="bg-[#18181b] border border-[#23232A] rounded-xl p-6">
            <div className="space-y-6">
              <Skeleton className="h-10 w-full bg-[#23232A]" />
              <Skeleton className="h-[200px] w-full bg-[#23232A]" />
              <div className="flex justify-end">
                <Skeleton className="h-5 w-16 bg-[#23232A]" />
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-9 w-20 rounded-lg bg-[#23232A]" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Post Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Skeleton className="h-5 w-32 bg-[#23232A]" />
                  <Skeleton className="h-4 w-40 bg-[#23232A]" />
                </div>
                <Skeleton className="h-6 w-12 bg-[#23232A]" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Skeleton className="h-5 w-32 bg-[#23232A]" />
                  <Skeleton className="h-4 w-40 bg-[#23232A]" />
                </div>
                <Skeleton className="h-6 w-12 bg-[#23232A]" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Skeleton className="h-5 w-32 bg-[#23232A]" />
                  <Skeleton className="h-4 w-40 bg-[#23232A]" />
                </div>
                <Skeleton className="h-8 w-24 bg-[#23232A]" />
              </div>
            </div>
          </div>
          
          <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Hashtag Suggestions</h3>
            
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-8 w-16 rounded-full bg-[#23232A]" />
              ))}
            </div>
          </div>
          
          <Skeleton className="h-12 w-full rounded-xl bg-[#23232A]" />
        </div>
      </div>
    </div>
  );
}
