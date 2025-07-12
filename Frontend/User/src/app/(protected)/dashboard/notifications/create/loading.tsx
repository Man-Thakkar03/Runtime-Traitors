"use client"

import { Skeleton } from '@/components/ui/skeleton';

export default function CreateEventLoading() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Create New Event</h1>
            <p className="text-gray-400 mt-1">Schedule a new event for your community</p>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-32 rounded-lg bg-[#23232A]" />
          </div>
        </div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-white transition-colors cursor-pointer">Events</span>
          <span className="mx-2">/</span>
          <span className="text-white">Create Event</span>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="bg-[#18181b] border border-[#23232A] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
            <div className="space-y-4">
              <div>
                <Skeleton className="h-5 w-24 bg-[#23232A] mb-1" />
                <Skeleton className="h-10 w-full bg-[#23232A]" />
              </div>
              
              <div>
                <Skeleton className="h-5 w-24 bg-[#23232A] mb-1" />
                <Skeleton className="h-[120px] w-full bg-[#23232A]" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-5 w-16 bg-[#23232A] mb-1" />
                  <Skeleton className="h-10 w-full bg-[#23232A]" />
                </div>
                
                <div>
                  <Skeleton className="h-5 w-16 bg-[#23232A] mb-1" />
                  <Skeleton className="h-10 w-full bg-[#23232A]" />
                </div>
              </div>
              
              <div>
                <Skeleton className="h-5 w-24 bg-[#23232A] mb-1" />
                <Skeleton className="h-10 w-full bg-[#23232A]" />
              </div>
              
              <div>
                <Skeleton className="h-5 w-32 bg-[#23232A] mb-1" />
                <Skeleton className="h-10 w-full bg-[#23232A]" />
              </div>
            </div>
          </div>
          
          <div className="bg-[#18181b] border border-[#23232A] rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Event Image</h3>
            
            <div className="flex items-center justify-center border-2 border-dashed border-[#2D2D35] rounded-lg p-6">
              <Skeleton className="h-[200px] w-full bg-[#23232A]" />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Event Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Skeleton className="h-5 w-24 bg-[#23232A]" />
                  <Skeleton className="h-4 w-48 bg-[#23232A]" />
                </div>
                <Skeleton className="h-6 w-12 bg-[#23232A]" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Skeleton className="h-5 w-28 bg-[#23232A]" />
                  <Skeleton className="h-4 w-40 bg-[#23232A]" />
                </div>
                <Skeleton className="h-6 w-12 bg-[#23232A]" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Skeleton className="h-5 w-32 bg-[#23232A]" />
                  <Skeleton className="h-4 w-36 bg-[#23232A]" />
                </div>
                <Skeleton className="h-6 w-12 bg-[#23232A]" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#1E1E24] to-[#23232A] border border-[#2D2D35] p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 rounded-full bg-[#2D2D35]" />
              <div className="w-full">
                <Skeleton className="h-5 w-24 bg-[#2D2D35] mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full bg-[#2D2D35]" />
                  <Skeleton className="h-3 w-full bg-[#2D2D35]" />
                  <Skeleton className="h-3 w-full bg-[#2D2D35]" />
                  <Skeleton className="h-3 w-3/4 bg-[#2D2D35]" />
                </div>
              </div>
            </div>
          </div>
          
          <Skeleton className="h-12 w-full rounded-xl bg-[#23232A]" />
        </div>
      </div>
    </div>
  );
}
