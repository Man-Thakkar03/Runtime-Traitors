"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-center my-3">
      <div className="h-8 w-8 rounded-full bg-[#23232A] flex items-center justify-center text-white mr-2 flex-shrink-0">
        <span className="text-xs font-medium">AI</span>
      </div>
      <div className="bg-[#23232A] text-gray-300 p-3 rounded-lg border border-[#2D2D35] rounded-bl-none inline-flex items-center">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
        </div>
        <span className="ml-2 text-sm text-gray-400">AI is typing...</span>
      </div>
    </div>
  );
}
