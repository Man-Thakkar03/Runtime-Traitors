"use client"

import React, { useState, useEffect, useRef } from 'react';
import { PostCard } from './PostCard';
import { Trending } from './Trending';
import { Search } from 'lucide-react';

interface Post {
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

type FilterType = 'all' | 'popular' | 'recent' | 'following';

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [trending, setTrending] = useState<Array<{
    id: string;
    name: string;
    count: number;
  }>>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement>(null);

  const fetchPosts = async (page: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    try {
      // In a real application, you would include filter and search in the API call
      const response = await fetch(`/api/posts?page=${page}&filter=${filter}${searchQuery ? `&search=${searchQuery}` : ''}`);
      
      // Check if the response is OK
      if (!response.ok) {
        throw new Error('API response was not ok');
      }
      
      const data = await response.json();
      
      // For a new filter or search, replace posts, otherwise append them
      if (page === 1) {
        setPosts(data.posts);
      } else {
        setPosts(prev => [...prev, ...data.posts]);
      }
      setHasMore(data.hasMore);
      
      // Update trending data
      if (data.trending) {
        setTrending(data.trending);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      
      // If API fails, import mock data dynamically
      try {
        const { generateMockPosts, mockTrending } = await import('@/lib/mockData');
        const mockPosts = generateMockPosts(10, page);
        
        // Apply filtering and searching to mock data if needed
        let filteredPosts = mockPosts;
        
        // Simple filter logic for demo purposes
        if (filter === 'popular') {
          filteredPosts = filteredPosts.sort((a, b) => b.likes - a.likes);
        } else if (filter === 'recent') {
          filteredPosts = filteredPosts.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }
        
        // Simple search logic
        if (searchQuery) {
          filteredPosts = filteredPosts.filter(post => 
            post.content.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        
        if (page === 1) {
          setPosts(filteredPosts);
        } else {
          setPosts(prev => [...prev, ...filteredPosts]);
        }
        
        setTrending(mockTrending);
        setHasMore(page < 4); // Reduce the number of mock pages for filtered results
      } catch (mockError) {
        console.error('Failed to load mock data:', mockError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchPosts(Math.ceil(posts.length / 10) + 1); // Assuming 10 posts per page
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loading, posts.length]);

  // Observe the last post element
  useEffect(() => {
    if (lastPostRef.current && observer.current) {
      observer.current.disconnect();
      observer.current.observe(lastPostRef.current);
    }
  }, [posts]);

  // Initial fetch and refetch when filter or search changes
  useEffect(() => {
    // Reset state when filter or search changes
    setPosts([]);
    setHasMore(true);
    
    // Fetch with new filter/search
    fetchPosts(1);
    
  }, [filter, searchQuery]);

  return (
    <div className="w-full">
      {/* Feed filters */}
      <div className="bg-[#18181b] border border-[#23232A] p-4 rounded-xl mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#23232A] text-gray-300 hover:bg-[#2D2D35]'
              }`}
            >
              All Posts
            </button>
            <button 
              onClick={() => setFilter('popular')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filter === 'popular' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#23232A] text-gray-300 hover:bg-[#2D2D35]'
              }`}
            >
              Popular
            </button>
            <button 
              onClick={() => setFilter('recent')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filter === 'recent' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#23232A] text-gray-300 hover:bg-[#2D2D35]'
              }`}
            >
              Recent
            </button>
            <button 
              onClick={() => setFilter('following')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filter === 'following' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#23232A] text-gray-300 hover:bg-[#2D2D35]'
              }`}
            >
              Following
            </button>
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 py-1.5 px-3 pr-8 bg-[#23232A] border border-[#2D2D35] rounded-lg text-sm text-gray-300 focus:outline-none focus:border-purple-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-5">
          {posts.map((post, index) => (
            <React.Fragment key={post.id}>
              <PostCard {...post} />
              {index === posts.length - 1 && (
                <div ref={lastPostRef} />
              )}
            </React.Fragment>
          ))}
          {loading && (
            <div className="flex justify-center py-6">
              <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
          )}
          {!loading && posts.length === 0 && (
            <div className="bg-[#18181b] border border-[#23232A] p-8 rounded-xl text-center">
              <p className="text-gray-400">No posts found. Be the first to post!</p>
            </div>
          )}
        </div>
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <Trending trending={trending} />
          </div>
        </div>
      </div>
    </div>
  );
};
