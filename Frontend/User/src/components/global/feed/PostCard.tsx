"use client"

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface PostCardProps {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

export const PostCard: React.FC<PostCardProps> = ({
  id,
  user,
  content,
  timestamp,
  likes,
  comments,
  shares,
}) => {
  return (
    <Card className="bg-[#18181b] border border-[#23232A] rounded-xl shadow-md overflow-hidden hover:border-[#3D3D45] transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-[#2D2D35]">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-[#2D2D35] text-white">{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-white">{user.name}</p>
            <p className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(timestamp))} ago
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#2D2D35] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </CardHeader>
      <CardContent className="pb-4 text-gray-300">
        <p className="text-base leading-relaxed mb-3">{content}</p>
        
        {/* Extract hashtags and highlight them */}
        <div className="mt-2 flex flex-wrap gap-2">
          {content.split(' ').filter(word => word.startsWith('#')).map((tag, i) => (
            <span 
              key={i}
              className="text-sm px-2 py-1 rounded-full bg-[#23232A] text-purple-400 font-medium cursor-pointer hover:bg-[#2D2D35] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Add a random image to some posts for better visual appearance */}
        {Math.random() > 0.5 && (
          <div className="mt-4 rounded-lg overflow-hidden border border-[#23232A]">
            <img 
              src={`https://picsum.photos/seed/${id}/600/300`} 
              alt="Post content" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </CardContent>
      <Separator className="bg-[#23232A]" />
      <CardFooter className="py-3 flex justify-between">
        <div className="flex gap-5">
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10v12"></path>
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
            </svg>
            {likes}
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {comments}
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 1l4 4-4 4"></path>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <path d="M7 23l-4-4 4-4"></path>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
            {shares}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};
