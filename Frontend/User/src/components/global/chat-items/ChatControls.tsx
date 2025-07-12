"use client";

import { Smile, Clock, Image, PaperclipIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock emoji data
const emojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
  "👍", "👎", "👋", "❤️", "🔥", "✨", "🎉", "🤔", "🤗", "👏"
];

interface ChatControlsProps {
  onEmojiSelect: (emoji: string) => void;
}

export default function ChatControls({ onEmojiSelect }: ChatControlsProps) {
  return (
    <div className="flex items-center gap-2 border-t border-[#23232A] pt-3 mt-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-purple-400 hover:bg-[#23232A]">
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-72 bg-[#1A1A1F] border-[#2D2D35] p-2">
                <div className="grid grid-cols-8 gap-1">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      className="text-xl hover:bg-[#23232A] rounded p-1 transition-colors"
                      onClick={() => onEmojiSelect(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Add emoji</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-purple-400 hover:bg-[#23232A]">
              <Image className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Attach image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-purple-400 hover:bg-[#23232A]">
              <PaperclipIcon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Attach file</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <div className="text-xs text-gray-500 ml-auto flex items-center">
        <Clock className="h-3.5 w-3.5 mr-1" /> Messages are not saved
      </div>
    </div>
  );
}
