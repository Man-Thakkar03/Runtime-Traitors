"use client"

import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TrendingProps {
  trending: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

export const Trending: React.FC<TrendingProps> = ({ trending }) => {
  if (!trending || trending.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card className="w-full rounded-xl bg-[#18181b] border border-[#23232A] shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Trending Topics</h3>
          </div>
        </CardHeader>
        <Separator className="bg-[#23232A]" />
        <CardContent className="p-0">
          <div className="divide-y divide-[#23232A]">
            {trending.map((item, index) => (
              <div 
                key={item.id}
                className="p-4 flex items-center gap-3 hover:bg-[#1F1F24] cursor-pointer transition-colors"
              >
                <Avatar className={index < 3 ? 'bg-purple-500/80 text-white' : 'bg-[#2D2D35] text-gray-300'}>
                  <AvatarFallback>{index + 1}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className={`${index < 3 ? 'font-semibold' : 'font-normal'} text-gray-200`}>
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {item.count.toLocaleString()} posts
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 text-center">
            <button className="text-purple-400 font-medium hover:text-purple-300 transition-colors text-sm">
              See more topics
            </button>
          </div>
        </CardContent>
      </Card>
      
      {/* Add a who to follow card to match dashboard style */}
      <Card className="w-full rounded-xl bg-[#18181b] border border-[#23232A] shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" x2="19" y1="8" y2="14"></line>
              <line x1="22" x2="16" y1="11" y2="11"></line>
            </svg>
            <h3 className="text-lg font-semibold text-white">Who to Follow</h3>
          </div>
        </CardHeader>
        <Separator className="bg-[#23232A]" />
        <CardContent className="p-0">
          <div className="divide-y divide-[#23232A]">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index}
                className="p-4 flex items-center justify-between hover:bg-[#1F1F24] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="border border-[#2D2D35]">
                    <AvatarFallback className="bg-[#2D2D35] text-gray-300">
                      {String.fromCharCode(65 + index)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-200">User {index + 1}</p>
                    <p className="text-xs text-gray-400">@username{index + 1}</p>
                  </div>
                </div>
                <button className="text-xs bg-white hover:bg-gray-100 text-black font-medium py-1.5 px-3 rounded-full transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 text-center">
            <button className="text-blue-400 font-medium hover:text-blue-300 transition-colors text-sm">
              Show more
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
