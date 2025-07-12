"use client"

import { Feed } from '@/components/global/feed/Feed';
import { Clock, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FeedPage() {
  const router = useRouter();

  const handleCreatePost = () => {
    router.push('/dashboard/create-post');
  };

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
              <span className="text-sm text-gray-300">Last updated just now</span>
            </div>
            <button 
              onClick={handleCreatePost}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Create Post</span>
            </button>
          </div>
        </div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="text-white">Feed</span>
        </nav>
      </div>
      
      <Feed />
    </div>
  );
}
