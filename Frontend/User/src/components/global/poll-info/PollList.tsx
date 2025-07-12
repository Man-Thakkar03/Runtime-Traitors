"use client";

import { useState } from "react";
import { BarChart2, Edit2, Trash2, MoreVertical, User, Clock, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { mockPolls } from "@/lib/mockPollsData";
import PollDetails from "./PollDetails";

interface PollListProps {
  searchQuery: string;
}

export default function PollList({ searchQuery }: PollListProps) {
  const [polls, setPolls] = useState(mockPolls);
  const [viewPollId, setViewPollId] = useState<string | null>(null);
  const [isPollDetailsOpen, setIsPollDetailsOpen] = useState(false);
  
  const filteredPolls = polls.filter(poll => 
    poll.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeletePoll = (id: string) => {
    if (confirm("Are you sure you want to delete this poll?")) {
      setPolls(polls.filter(poll => poll.id !== id));
    }
  };
  
  const handleViewResults = (id: string) => {
    setViewPollId(id);
    setIsPollDetailsOpen(true);
  };

  if (filteredPolls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {searchQuery ? (
          <>
            <div className="h-12 w-12 bg-[#23232A] rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">No matching polls found</h3>
            <p className="text-gray-400 max-w-md">
              We couldn't find any polls matching "{searchQuery}". Try a different search term.
            </p>
          </>
        ) : (
          <>
            <div className="h-12 w-12 bg-[#23232A] rounded-full flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">No polls created yet</h3>
            <p className="text-gray-400 max-w-md">
              You haven't created any polls yet. Switch to the "Create Poll" tab to get started.
            </p>
          </>
        )}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-400">
        Showing {filteredPolls.length} poll{filteredPolls.length !== 1 ? 's' : ''}
      </div>
      
      <div className="space-y-4">
        {filteredPolls.map((poll) => (
          <div key={poll.id} className="bg-[#23232A] border border-[#2D2D35] rounded-xl overflow-hidden hover:border-[#3D3D45] transition-colors duration-200 cursor-pointer" onClick={() => handleViewResults(poll.id)}>
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                    {poll.question}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <User size={14} />
                      <span>{poll.participants} responses</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>Created {format(new Date(poll.created), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {poll.options.map((option, i) => (
                      <div 
                        key={i} 
                        className="bg-[#18181b] border border-[#2D2D35] px-3 py-1 rounded-full text-sm text-gray-300"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-200" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#18181b] border border-[#2D2D35] text-gray-300">
                    <DropdownMenuItem className="hover:bg-[#23232A] cursor-pointer">
                      <Edit2 size={14} className="mr-2" />
                      <span>Edit Poll</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-[#23232A] cursor-pointer" onClick={(e) => {
                      e.stopPropagation();
                      handleViewResults(poll.id);
                    }}>
                      <BarChart2 size={14} className="mr-2" />
                      <span>View Results</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#2D2D35]" />
                    <DropdownMenuItem 
                      className="text-red-500 hover:text-red-400 hover:bg-red-900/20 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePoll(poll.id);
                      }}
                    >
                      <Trash2 size={14} className="mr-2" />
                      <span>Delete Poll</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="bg-[#18181b] border-t border-[#2D2D35] flex justify-between items-center px-5 py-3">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${
                  poll.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                }`}></span>
                <span className="text-sm text-gray-400">
                  {poll.status === 'active' ? 'Active' : 'Ended'}
                </span>
              </div>
              
              <div>
                {poll.endDate ? (
                  <span className="text-sm text-gray-400">
                    Ends {format(new Date(poll.endDate), 'MMM d, yyyy')}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">No end date</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <PollDetails 
        pollId={viewPollId}
        isOpen={isPollDetailsOpen}
        onClose={() => setIsPollDetailsOpen(false)}
      />
    </div>
  );
}
