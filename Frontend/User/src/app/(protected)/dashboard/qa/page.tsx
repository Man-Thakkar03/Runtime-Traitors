"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "@/components/global/questions-card/QuestionCard";
import TagFilter from "@/components/global/questions-card/TagFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquareText, Plus, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
  upvotes: number;
  answers: number;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "How do I use React hooks effectively?",
    description: "<p>I'm new to React and trying to understand how to use hooks properly. I've been reading about useState and useEffect, but I'm still confused about:</p><ul><li>When to use different hooks</li><li>How to avoid common pitfalls</li><li>Best practices for custom hooks</li></ul><p>Can someone provide some practical examples and tips?</p>",
    tags: ["react", "hooks", "javascript"],
    upvotes: 12,
    answers: 3,
  },
  {
    id: 2,
    title: "What is the difference between let, var, and const?",
    description: "<p>I'm learning JavaScript and I'm confused about the differences between <code>let</code>, <code>var</code>, and <code>const</code>. I know they're all used for variable declaration, but when should I use each one?</p><p>I've heard about hoisting and block scope, but I'm not sure how they affect these declarations.</p>",
    tags: ["javascript", "variables"],
    upvotes: 8,
    answers: 2,
  },
  {
    id: 3,
    title: "Best practices for designing a REST API?",
    description: "<p>I'm designing a REST API for my project and want to follow best practices. I'm looking for guidance on:</p><ul><li>URL structure and naming conventions</li><li>HTTP status codes</li><li>Authentication and authorization</li><li>Error handling</li><li>Documentation</li></ul><p>Any resources or examples would be greatly appreciated!</p>",
    tags: ["api", "backend", "design"],
    upvotes: 15,
    answers: 4,
  },
  {
    id: 4,
    title: "How to optimize React performance?",
    description: "<p>My React application is getting slower as it grows. I'm looking for ways to optimize performance:</p><ul><li>Component memoization techniques</li><li>Bundle size optimization</li><li>Lazy loading strategies</li><li>State management optimization</li></ul><p>I've heard about React.memo and useMemo, but I'm not sure when to use them.</p>",
    tags: ["react", "performance", "optimization"],
    upvotes: 10,
    answers: 2,
  },
  {
    id: 5,
    title: "Understanding TypeScript generics",
    description: "<p>I'm learning TypeScript and struggling with generics. I understand the basic syntax, but I'm having trouble with:</p><ul><li>When to use generics vs union types</li><li>Generic constraints</li><li>Generic utility types</li><li>Real-world use cases</li></ul><p>Could someone explain with practical examples?</p>",
    tags: ["typescript", "generics"],
    upvotes: 7,
    answers: 1,
  }
];

export default function QaPage() {
  const router = useRouter();

  const allTags = Array.from(
    new Set(MOCK_QUESTIONS.flatMap((q) => q.tags))
  ).sort();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'upvotes' | 'answers'>('upvotes');
  const [searchTerm, setSearchTerm] = useState('');
    // Filter by tags and search term
  const filtered = MOCK_QUESTIONS.filter(q => {
    const matchesTags = selectedTags.length === 0 || 
      q.tags.some(tag => selectedTags.includes(tag));
    
    const matchesSearch = searchTerm === '' ||
      q.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTags && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => b[sortBy] - a[sortBy]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Create a new question (would redirect to question creation page in a real app)
  const handleCreateQuestion = () => {
    router.push('/dashboard/qa/create');
  };
    const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <MessageSquareText className="h-5 w-5 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Q&A Board</h1>
          </div>
          <p className="text-gray-400">Ask questions and find answers from the community</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search questions..."
              className="pl-10 bg-[#1E1E24] border-[#2D2D35] text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleCreateQuestion}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Ask Question
          </Button>
        </div>
      </div>
      
      {/* Filter Controls */}
      <div className="flex flex-wrap md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onChange={setSelectedTags}
        />
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'upvotes' | 'answers')}
            className="bg-[#1E1E24] text-white text-sm rounded-lg px-3 py-2 border border-[#2D2D35] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="upvotes">Most Upvotes</option>
            <option value="answers">Most Answers</option>
          </select>
        </div>
      </div>
      
      {/* Questions List */}
      <div className="space-y-4">
        {sorted.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
        
        {sorted.length === 0 && (
          <div className="p-8 text-center bg-[#1A1A1F] rounded-xl border border-[#2D2D35]">
            <div className="p-3 mx-auto w-16 h-16 mb-4 rounded-full bg-[#2D2D35] flex items-center justify-center">
              <MessageSquareText className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">No questions found</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              No questions found matching your search criteria or selected tags.
            </p>
            <Button 
              onClick={handleCreateQuestion}
              variant="outline" 
              className="border-[#3D3D45] text-white hover:bg-[#2D2D35] flex items-center gap-2 mx-auto"
            >
              Ask a Question <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
