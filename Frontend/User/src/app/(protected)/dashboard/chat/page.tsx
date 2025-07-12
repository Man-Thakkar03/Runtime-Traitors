"use client";

import { useEffect, useRef, useState } from "react";
import ChatBubble from "@/components/global/chat-items/ChatBubble";
import TypingIndicator from "@/components/global/chat-items/TypingIndicator";
import ChatControls from "@/components/global/chat-items/ChatControls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Clock, Info, Users } from "lucide-react";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

// Mock bot responses
const botResponses = [
  "Hey, how's it going?",
  "That's interesting! Tell me more.",
  "I'm not sure I understand. Can you explain?",
  "I agree! Great point.",
  "Let's discuss this further in our next meeting.",
  "Have you considered trying a different approach?",
  "Thanks for sharing that information!",
  "I'll look into this and get back to you.",
  "Let's schedule a call to discuss this in detail.",
  "I appreciate your perspective on this matter."
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to the group chat!", sender: "bot", timestamp: new Date(Date.now() - 3600000) },
    { id: 2, text: "Feel free to send a message to get started.", sender: "bot", timestamp: new Date(Date.now() - 3000000) }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeUsers] = useState(5); // Mock active users count

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "me",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setTyping(true);

    // Focus back on the input after sending
    inputRef.current?.focus();

    // Simulate bot response after a delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: randomResponse,
          sender: "bot",
          timestamp: new Date()
        },
      ]);
      setTyping(false);
    }, 1500);
  };
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleEmojiSelect = (emoji: string) => {
    setInput((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  useEffect(() => {
    // Scroll to bottom on new messages or typing indicator
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <MessageSquare className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Group Chat</h1>
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
              <span className="flex items-center">
                <Clock className="h-3.5 w-3.5 inline mr-1" />
                Last activity: {new Date().toLocaleTimeString()}
              </span>
              <span className="h-1 w-1 bg-gray-500 rounded-full"></span>
              <span className="flex items-center">
                <Users className="h-3.5 w-3.5 inline mr-1" />
                {activeUsers} active users
              </span>
            </p>
          </div>
        </div>
       
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto border border-[#23232A] rounded-lg p-4 bg-[#1A1A1F] shadow-inner mb-4 h-[60vh]">
        <div className="space-y-3">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} text={msg.text} sender={msg.sender} timestamp={msg.timestamp} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={bottomRef}></div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border border-[#23232A] rounded-lg bg-[#1A1A1F] p-3">
        <div className="flex gap-2 items-center">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-3 border border-[#23232A] rounded-lg bg-[#1E1E24] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        
        <ChatControls onEmojiSelect={handleEmojiSelect} />
      </div>
    </div>
  );
}
