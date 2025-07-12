"use client";

import { Plus } from "lucide-react";

export default function CreatePostIcon() {
  return (
    <div className="flex items-center gap-2">
      <Plus className="w-5 h-5" />
      <span className="text-sm">Create Post</span>
    </div>
  );
}
