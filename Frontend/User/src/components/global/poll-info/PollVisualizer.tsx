"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { getRecentPolls, generatePollResults } from "@/lib/mockPollsData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// More vibrant colors that work well on dark backgrounds
const COLORS = ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899"];

export default function PollVisualizer() {
  const [featuredPollIndex, setFeaturedPollIndex] = useState(0);
  const [pollResults, setPollResults] = useState<any>(null);
  const recentPolls = getRecentPolls();
  
  useEffect(() => {
    if (recentPolls.length > 0) {
      const results = generatePollResults(recentPolls[featuredPollIndex].id);
      setPollResults(results);
    }
  }, [featuredPollIndex]);
  
  const handleNext = () => {
    setFeaturedPollIndex((prev) => 
      prev === recentPolls.length - 1 ? 0 : prev + 1
    );
  };
  
  const handlePrevious = () => {
    setFeaturedPollIndex((prev) => 
      prev === 0 ? recentPolls.length - 1 : prev - 1
    );
  };
  
  if (!pollResults || recentPolls.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 bg-[#23232A] rounded-lg border border-[#2D2D35]">
        <p className="text-gray-400">No recent polls available</p>
      </div>
    );
  }
  
  const data = pollResults.results.map((item: any) => ({
    name: item.option,
    value: item.votes
  }));
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {pollResults.question}
        </h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white border-[#2D2D35] bg-[#23232A] hover:bg-[#2D2D35]"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-400">
            {featuredPollIndex + 1} / {recentPolls.length}
          </span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white border-[#2D2D35] bg-[#23232A] hover:bg-[#2D2D35]"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value} votes`, 'Votes']}
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
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Total votes: <span className="text-gray-300">{pollResults.totalVotes}</span>
        </p>
      </div>
    </div>
  );
}
