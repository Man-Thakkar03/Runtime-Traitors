"use client";

import { format } from "date-fns";
import { Clock } from "lucide-react";

interface ChatBubbleProps {
  text: string;
  sender: string;
  timestamp?: Date;
}

export default function ChatBubble({ text, sender, timestamp }: ChatBubbleProps) {
  const isMe = sender === "me";
  
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} my-3`}>
      {!isMe && (
        <div className="h-8 w-8 rounded-full bg-[#23232A] flex items-center justify-center text-white mr-2 flex-shrink-0">
          <span className="text-xs font-medium">AI</span>
        </div>
      )}
      <div className="flex flex-col">
        <div
          className={`max-w-xs md:max-w-md p-3 rounded-lg text-sm shadow-sm ${
            isMe
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none"
              : "bg-[#23232A] text-gray-200 border border-[#2D2D35] rounded-bl-none"
          }`}
        >
          {text}
        </div>
        {timestamp && (
          <div className={`flex items-center mt-1 text-[10px] text-gray-500 ${isMe ? "justify-end mr-2" : "justify-start ml-2"}`}>
            <Clock className="h-3 w-3 mr-1" />
            <span>{format(timestamp, 'h:mm a')}</span>
          </div>
        )}
      </div>
      {isMe && (
        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white ml-2 flex-shrink-0">
          <span className="text-xs font-medium">You</span>
        </div>
      )}
    </div>
  );
}
