"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ArrowUp, MessageSquare, Send } from "lucide-react";

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
  upvotes: number;
  answers: number;
}

interface Answer {
  id: number;
  text: string;
  author: string;
  upvotes: number;
  date: string;
}

interface QuestionDetailDialogProps {
  question: Question | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock answers for demo purposes
const MOCK_ANSWERS: Answer[] = [
  {
    id: 1,
    text: "<p>React hooks need to be called at the <strong>top level</strong> of your component, not inside conditions, loops, or nested functions. This ensures hooks are called in the same order each time a component renders.</p><p>Here are some key points:</p><ul><li>Always call hooks at the top level</li><li>Don't call hooks inside loops, conditions, or nested functions</li><li>Only call hooks from React function components or custom hooks</li></ul><p>This is known as the <em>Rules of Hooks</em>.</p>",
    author: "Jane Smith",
    upvotes: 7,
    date: "2 days ago",
  },
  {
    id: 2,
    text: "<p>Make sure to include all dependencies in the dependency array for <code>useEffect</code>. If your effect uses values from the component scope, they should be specified in the array.</p><p>For example:</p><pre><code>useEffect(() => {\n  // Your effect code\n}, [dependency1, dependency2]);</code></pre><p>This helps prevent infinite re-renders and ensures your effect runs when it should.</p>",
    author: "John Doe",
    upvotes: 4,
    date: "1 day ago",
  },
];

export default function QuestionDetailDialog({
  question,
  open,
  onOpenChange,
}: QuestionDetailDialogProps) {
  const [answers, setAnswers] = useState<Answer[]>(MOCK_ANSWERS);
  const [newAnswer, setNewAnswer] = useState("");
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(question?.upvotes || 0);

  const handleSubmitAnswer = () => {
    // Check if answer has meaningful content (not just empty HTML)
    const hasContent = newAnswer.trim() && newAnswer.replace(/<[^>]*>/g, '').trim().length > 0;
    if (!hasContent) return;

    // Add new answer
    const newAnswerObj: Answer = {
      id: Date.now(),
      text: newAnswer,
      author: "You",
      upvotes: 0,
      date: "Just now",
    };

    setAnswers([...answers, newAnswerObj]);
    setNewAnswer("");
  };

  const toggleUpvote = () => {
    setUpvoted((prev) => !prev);
    setUpvotes((prev) => prev + (upvoted ? -1 : 1));
  };

  if (!question) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#18181b] border-[#2D2D35] text-white max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b border-[#2D2D35]">
          <DialogTitle className="text-xl font-bold flex justify-between items-start gap-4">
            <span>{question.title}</span>
            <button
              onClick={toggleUpvote}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                upvoted
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  : "bg-[#23232A] text-gray-300 border border-[#2D2D35]"
              } transition-all transform hover:scale-105`}
            >
              <ArrowUp className={`h-4 w-4 ${upvoted ? "text-purple-400" : "text-gray-400"}`} />
              <span>{upvotes}</span>
            </button>
          </DialogTitle>
          <div className="flex gap-2 text-xs mt-3 flex-wrap">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#23232A] text-gray-300 px-3 py-1.5 rounded-full border border-[#2D2D35]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Question Description */}
          <div className="border border-[#2D2D35] rounded-lg p-4 bg-[#1A1A1F] mb-6">
            <h3 className="font-medium text-lg text-purple-400 mb-3">Question Details</h3>
            <div 
              className="text-gray-200 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: question.description }}
            />
          </div>

          <div className="space-y-1 mb-6">
            <h3 className="font-medium text-lg text-purple-400 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Answers ({answers.length})
            </h3>
            <div className="h-1 w-16 bg-purple-600 rounded-full"></div>
          </div>

          {answers.length > 0 ? (
            <div className="space-y-4">
              {answers.map((answer) => (
                <div
                  key={answer.id}
                  className="border border-[#2D2D35] rounded-lg p-4 bg-[#1A1A1F]"
                >
                  <div 
                    className="text-gray-200 mb-3 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: answer.text }}
                  />
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>Posted by {answer.author} • {answer.date}</span>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors">
                        <ArrowUp className="h-3.5 w-3.5" />
                        <span>{answer.upvotes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No answers yet. Be the first to answer!</p>
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-[#2D2D35] pt-4">
          <div className="w-full space-y-3">
            <RichTextEditor
              content={newAnswer}
              onChange={setNewAnswer}
              placeholder="Write your answer..."
              className="min-h-[100px]"
            />
            <Button
              onClick={handleSubmitAnswer}
              disabled={!newAnswer.replace(/<[^>]*>/g, '').trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white ml-auto flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Post Answer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
