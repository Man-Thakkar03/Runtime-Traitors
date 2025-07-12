"use client";

import { X } from "lucide-react";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagFilter({ tags, selectedTags, onChange }: TagFilterProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-400 mb-3">Filter by tags:</h2>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => {
          const selected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() =>
                onChange(
                  selected
                    ? selectedTags.filter((t) => t !== tag)
                    : [...selectedTags, tag]
                )
              }
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                selected 
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-500/20" 
                  : "bg-[#23232A] text-gray-300 hover:bg-[#2D2D35] border border-[#2D2D35]"
              }`}
            >
              #{tag}
            </button>
          );
        })}
        {selectedTags.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="px-3 py-1.5 rounded-full text-sm text-gray-400 hover:text-white hover:bg-[#2D2D35] border border-[#2D2D35] transition-colors flex items-center gap-1"
          >
            <X className="h-3.5 w-3.5" /> Clear all
          </button>
        )}
      </div>
    </div>
  );
}
