"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal, X, Hash, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateQuestion() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTag = () => {
    if (tag.trim() && !tags.includes(tag.trim().toLowerCase())) {
      setTags([...tags, tag.trim().toLowerCase()]);
      setTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || tags.length === 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real application, you'd send this data to your backend
      console.log({ title, description, tags });
      
      // Return to the Q&A page
      router.push(`/dashboard/slice/qa`);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-purple-500/10">
          <HelpCircle className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Ask a Question</h1>
          <p className="text-gray-400">Get help from the community by posting a question</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-200">
            Question Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., How do I use React hooks effectively?"
            className="w-full bg-[#1A1A1F] border-[#2D2D35] text-white focus:ring-purple-500 focus:border-purple-500"
            required
          />
          <p className="text-xs text-gray-400">
            Be specific and imagine you're asking a question to another person
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-200">
            Question Details
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain your question in detail..."
            className="w-full bg-[#1A1A1F] border-[#2D2D35] text-white focus:ring-purple-500 focus:border-purple-500 min-h-[200px]"
            required
          />
          <p className="text-xs text-gray-400">
            Include all the information someone would need to answer your question
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-200">
            Tags
          </label>
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-gray-400" />
            <Input
              id="tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={addTag}
              placeholder="Add a tag (press Enter or comma)"
              className="flex-1 bg-[#1A1A1F] border-[#2D2D35] text-white focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((t) => (
              <div
                key={t}
                className="bg-[#23232A] text-gray-300 px-3 py-1.5 rounded-full border border-[#2D2D35] flex items-center gap-1"
              >
                #{t}
                <button
                  type="button"
                  onClick={() => removeTag(t)}
                  className="text-gray-400 hover:text-white ml-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {tags.length === 0 && (
              <p className="text-xs text-gray-500">Add up to 5 tags to categorize your question</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#2D2D35]">
          <Button
            type="button"
            variant="outline"
            className="border-[#2D2D35] text-white hover:bg-[#2D2D35]"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!title.trim() || !description.trim() || tags.length === 0 || isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center gap-2"
          >
            <SendHorizonal className="h-4 w-4" />
            {isSubmitting ? "Posting..." : "Post Question"}
          </Button>
        </div>
      </form>
    </div>
  );
}
