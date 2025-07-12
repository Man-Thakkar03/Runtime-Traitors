"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, Calendar, Clock, User, X } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { generatePollResults } from "@/lib/mockPollsData";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// More vibrant colors that work well on dark backgrounds
const COLORS = ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899"];

interface PollResult {
  option: string;
  votes: number;
}

interface PollResultData {
  pollId: string;
  question: string;
  totalVotes: number;
  results: PollResult[];
}

interface PollDetailsProps {
  pollId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PollDetails({ pollId, isOpen, onClose }: PollDetailsProps) {  const [activeTab, setActiveTab] = useState<'results' | 'details'>('results');
  const [isLoading, setIsLoading] = useState(true);
  const [pollData, setPollData] = useState<PollResultData | null>(null);
  
  // Simulate loading data
  useState(() => {
    if (pollId && isOpen) {
      setIsLoading(true);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        const results = generatePollResults(pollId);
        setPollData(results);
        setIsLoading(false);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  });
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-[#18181b] border-[#2D2D35] text-white max-w-3xl">
        <DialogHeader className="flex-row justify-between items-start">
          <DialogTitle className="text-xl">
            {isLoading ? (
              <Skeleton className="h-7 w-3/4 bg-[#23232A]" />
            ) : (
              pollData?.question || 'Poll Details'
            )}
          </DialogTitle>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </DialogHeader>
        
        <Tabs defaultValue="results" value={activeTab} onValueChange={(value) => setActiveTab(value as 'results' | 'details')} className="mt-4">
          <TabsList className="bg-[#23232A] grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="results" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BarChart2 className="h-4 w-4 mr-2" />
              Results
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="results" className="mt-0">
            {isLoading ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-40 bg-[#23232A]" />
                  <Skeleton className="h-6 w-20 bg-[#23232A]" />
                </div>
                
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Poll Results</h3>
                  <div className="bg-[#23232A] px-3 py-1 rounded-full text-sm">
                    {pollData?.totalVotes} total votes
                  </div>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pollData?.results.map((r: any) => ({ name: r.option, value: r.votes }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pollData?.results.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>                      <Tooltip 
                        formatter={(value: number) => [`${value} votes (${((value / (pollData?.totalVotes || 1)) * 100).toFixed(1)}%)`, 'Votes']}
                        contentStyle={{ 
                          backgroundColor: '#1F2937',
                          borderColor: '#374151',
                          color: '#e5e7eb'
                        }}
                      />
                      <Legend 
                        formatter={(value) => (
                          <span className="text-gray-300">
                            {value}
                          </span>
                        )} 
                        layout="horizontal"
                        verticalAlign="bottom"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="details" className="mt-0">
            {isLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-6 w-40 bg-[#23232A]" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#23232A] p-2">
                      <Skeleton className="h-4 w-4 bg-[#2D2D35]" />
                    </div>
                    <Skeleton className="h-5 w-48 bg-[#23232A]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#23232A] p-2">
                      <Skeleton className="h-4 w-4 bg-[#2D2D35]" />
                    </div>
                    <Skeleton className="h-5 w-32 bg-[#23232A]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#23232A] p-2">
                      <Skeleton className="h-4 w-4 bg-[#2D2D35]" />
                    </div>
                    <Skeleton className="h-5 w-60 bg-[#23232A]" />
                  </div>
                </div>
              </div>            ) : pollData ? (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Poll Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#23232A] p-2">
                      <User size={16} className="text-purple-400" />
                    </div>
                    <span className="text-gray-300">
                      {pollData.totalVotes} participants
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#23232A] p-2">
                      <Clock size={16} className="text-blue-400" />
                    </div>
                    <span className="text-gray-300">
                      Created {format(new Date(), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#23232A] p-2">
                      <Calendar size={16} className="text-green-400" />
                    </div>
                    <span className="text-gray-300">
                      Ends {format(new Date(new Date().setDate(new Date().getDate() + 7)), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-medium mb-3">Options</h4>
                  <div className="space-y-2">
                    {pollData.results.map((result: any, index: number) => (
                      <div key={index} className="bg-[#23232A] rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3">
                          <span className="text-gray-300">{result.option}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">{result.votes} votes</span>
                            <span 
                              className="text-sm font-medium"
                              style={{ color: COLORS[index % COLORS.length] }}
                            >
                              {((result.votes / pollData.totalVotes) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="h-1 w-full bg-[#2D2D35]">
                          <div 
                            className="h-full" 
                            style={{ 
                              width: `${(result.votes / pollData.totalVotes) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-gray-400">No poll data available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
