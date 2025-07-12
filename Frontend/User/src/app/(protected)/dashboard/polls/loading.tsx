'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, BarChart2, Clock } from 'lucide-react';

export default function PollsLoading() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-32 bg-[#23232A]" />
            <Skeleton className="h-5 w-80 mt-2 bg-[#23232A]" />
          </div>
          <div className="flex items-center gap-3 bg-[#1E1E24] px-4 py-2 rounded-lg border border-[#2D2D35]">
            <Clock className="h-4 w-4 text-gray-400" />
            <Skeleton className="h-4 w-36 bg-[#23232A]" />
          </div>
        </div>
        
        {/* Skeleton Breadcrumb */}
        <div className="flex items-center">
          <Skeleton className="h-4 w-16 bg-[#23232A]" />
          <span className="mx-2 text-gray-400">/</span>
          <Skeleton className="h-4 w-16 bg-[#23232A]" />
        </div>
      </div>
      
      <div className="bg-[#18181b] border border-[#23232A] rounded-xl overflow-hidden">        <div className="border-b border-[#23232A]">
          <div className="flex items-center justify-between px-6 py-4">
            <Tabs defaultValue="create">
              <TabsList className="bg-[#23232A] grid grid-cols-2 w-64">
                <TabsTrigger 
                  value="create" 
                  className="bg-purple-600 text-white"
                  disabled
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Poll
                </TabsTrigger>
                <TabsTrigger 
                  value="manage"
                  disabled 
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Manage Polls
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32 bg-[#23232A]" />
                <Skeleton className="h-10 w-full bg-[#23232A]" />
                
                <Skeleton className="h-6 w-40 bg-[#23232A]" />
                <Skeleton className="h-24 w-full bg-[#23232A]" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-48 bg-[#23232A]" />
                    <Skeleton className="h-4 w-20 bg-[#23232A]" />
                  </div>
                  
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-10 w-10 bg-[#23232A]" />
                      <Skeleton className="flex-1 h-10 bg-[#23232A]" />
                    </div>
                  ))}
                  
                  <Skeleton className="h-10 w-full bg-[#23232A]" />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#18181b] border border-[#23232A] rounded-xl p-6">
                <Skeleton className="h-6 w-32 mb-4 bg-[#23232A]" />
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Skeleton className="h-5 w-28 bg-[#23232A]" />
                      <Skeleton className="h-4 w-48 bg-[#23232A]" />
                    </div>
                    <Skeleton className="h-5 w-10 bg-[#23232A]" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Skeleton className="h-5 w-24 bg-[#23232A]" />
                      <Skeleton className="h-4 w-40 bg-[#23232A]" />
                    </div>
                    <Skeleton className="h-5 w-10 bg-[#23232A]" />
                  </div>
                  
                  <div className="h-[1px] w-full bg-[#23232A] my-4" />
                  
                  <div>
                    <Skeleton className="h-5 w-20 mb-2 bg-[#23232A]" />
                    <Skeleton className="h-[200px] w-full rounded-lg bg-[#23232A]" />
                  </div>
                </div>
              </div>
              
              <Skeleton className="h-12 w-full rounded-xl bg-[#23232A]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
