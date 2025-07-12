"use client";

import { useState } from "react";
import { MessageSquare, ChevronRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionDetailDialog from "./QuestionDetailDialog";

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
  upvotes: number;
  answers: number;
}

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(question.upvotes);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvoted((prev) => !prev);
    setUpvotes((prev) => prev + (upvoted ? -1 : 1));
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <div 
        className="border border-[#2D2D35] rounded-xl p-5 bg-[#1A1A1F] hover:border-[#3D3D45] transition-colors duration-200 cursor-pointer group"
        onClick={openDialog}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">{question.title}</h3>
          <button
            onClick={toggleUpvote}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
              upvoted ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-[#23232A] text-gray-300 border border-[#2D2D35]"
            } transition-all transform hover:scale-105`}
          >
            <ArrowUp className={`h-4 w-4 ${upvoted ? "text-purple-400" : "text-gray-400"}`} />
            <span>{upvotes}</span>
          </button>
        </div>
        <div className="flex gap-2 text-xs mt-4 mb-4 flex-wrap">
          {question.tags.map((tag) => (
            <span key={tag} className="bg-[#23232A] text-gray-300 px-3 py-1.5 rounded-full border border-[#2D2D35]">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-400 flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            <span>{question.answers} {question.answers === 1 ? 'answer' : 'answers'}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 p-0 h-auto flex items-center gap-1 text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              openDialog();
            }}
          >
            View Question <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <QuestionDetailDialog 
        question={question} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </>
  );
}

