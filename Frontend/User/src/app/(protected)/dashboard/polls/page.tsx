'use client';

import { useState, useEffect } from 'react';
import PollCreator from "@/components/global/poll-info/PollCreator";
import PollList from "@/components/global/poll-info/PollList";
import { Clock, PlusCircle, Search, BarChart2, Keyboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function PollsPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('manage');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Only trigger if not in an input field
      if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        // Alt+C for create tab
        if (e.altKey && e.key === 'c') {
          setActiveTab('create');
        }
        // Alt+M for manage tab
        else if (e.altKey && e.key === 'm') {
          setActiveTab('manage');
        }
        // Alt+S to focus search if on manage tab
        else if (e.altKey && e.key === 's' && activeTab === 'manage') {
          const searchInput = document.getElementById('poll-search');
          if (searchInput) {
            searchInput.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [activeTab]);
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Polls</h1>
            <p className="text-gray-400 mt-1">Create and manage interactive polls for your community</p>
          </div>
          <div className="flex items-center gap-3 bg-[#1E1E24] px-4 py-2 rounded-lg border border-[#2D2D35]">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Last updated 2 hours ago</span>
          </div>
        </div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400">
          <span onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="text-white">Polls</span>
        </nav>
      </div>      
      <div className="bg-[#18181b] border border-[#23232A] rounded-xl overflow-hidden">
        <Tabs defaultValue="manage" value={activeTab} onValueChange={(value) => setActiveTab(value as 'create' | 'manage')} className="w-full">
          <div className="border-b border-[#23232A]">
            <div className="flex items-center justify-between px-6 py-4">
              <TabsList className="bg-[#23232A] grid grid-cols-2 w-64">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger 
                        value="create" 
                        className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Poll
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-[#23232A] border-[#2D2D35] text-xs">
                      <div className="flex items-center gap-1">
                        <Keyboard className="h-3 w-3" />
                        <span>Alt+C</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger 
                        value="manage" 
                        className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                      >
                        <BarChart2 className="h-4 w-4 mr-2" />
                        Manage Polls
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-[#23232A] border-[#2D2D35] text-xs">
                      <div className="flex items-center gap-1">
                        <Keyboard className="h-3 w-3" />
                        <span>Alt+M</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsList>
              
              {activeTab === 'manage' && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <input
                          id="poll-search"
                          type="text"
                          placeholder="Search polls..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-64 py-1.5 px-3 pr-8 bg-[#23232A] border border-[#2D2D35] rounded-lg text-sm text-gray-300 focus:outline-none focus:border-purple-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-[#23232A] border-[#2D2D35] text-xs">
                      <div className="flex items-center gap-1">
                        <Keyboard className="h-3 w-3" />
                        <span>Alt+S</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>          
          <div className="p-6">
            <TabsContent value="create" className="mt-0">
              <PollCreator />
            </TabsContent>
            
            <TabsContent value="manage" className="mt-0">
              <PollList searchQuery={searchQuery} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
