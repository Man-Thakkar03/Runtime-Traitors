"use client";

import { useState, useRef, useEffect } from "react";
import PollChart from "./PollChart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Calendar, Plus, X, Info, AlertCircle, Loader2 } from "lucide-react";
import { format } from 'date-fns';

export default function PollCreator() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [description, setDescription] = useState("");
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [hasEndDate, setHasEndDate] = useState(false);
  const [endDate, setEndDate] = useState(format(new Date().setDate(new Date().getDate() + 7), 'yyyy-MM-dd'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [animateOption, setAnimateOption] = useState<number | null>(null);
  
  // Refs for focus management
  const questionInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Focus first input on mount
  useEffect(() => {
    if (questionInputRef.current) {
      questionInputRef.current.focus();
    }
  }, []);

  // Update option refs when options change
  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, options.length);
  }, [options.length]);

  const updateOption = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
      const newIndex = options.length;
      setAnimateOption(newIndex);
      
      // Focus the new option after a small delay
      setTimeout(() => {
        if (optionRefs.current[newIndex]) {
          optionRefs.current[newIndex]?.focus();
        }
        // Reset animation after it completes
        setTimeout(() => setAnimateOption(null), 500);
      }, 100);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const updated = options.filter((_, i) => i !== index);
      setOptions(updated);
      
      // Focus the previous option or the last one if removing the last
      setTimeout(() => {
        const focusIndex = Math.min(index, updated.length - 1);
        optionRefs.current[focusIndex]?.focus();
      }, 10);
    }
  };

  const validateForm = () => {
    if (!question.trim()) {
      setErrorMessage("Please enter a poll question");
      return false;
    }

    const validOptions = options.filter(opt => opt.trim() !== "");
    if (validOptions.length < 2) {
      setErrorMessage("Please provide at least 2 valid options");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const submitPoll = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Poll Submitted:", {
        question,
        description,
        options: options.filter(opt => opt.trim() !== ""),
        settings: {
          multipleChoice: isMultipleChoice,
          hasEndDate,
          endDate: hasEndDate ? endDate : null
        }
      });
      
      // Reset form
      setQuestion("");
      setOptions(["", ""]);
      setDescription("");
      setIsMultipleChoice(false);
      setHasEndDate(false);
      setIsSubmitting(false);
      
      // Focus back to question input
      setTimeout(() => {
        questionInputRef.current?.focus();
      }, 100);
      
      // Show success message (in a real app, you'd use a toast notification)
      alert("Poll created successfully!");
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="question" className="text-white mb-1.5 block">
              Poll Question
            </Label>
            <Input
              id="question"
              ref={questionInputRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="E.g., What's your favorite programming language?"
              className="bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600"
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-gray-300 mb-1.5 block">
              Description (optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more context about your poll..."
              className="bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600 resize-none min-h-[80px]"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white">Poll Options (Min: 2, Max: 5)</Label>
              <span className="text-xs text-gray-400">{options.filter(opt => opt.trim()).length}/5 options</span>
            </div>

            {options.map((opt, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-2 ${animateOption === i ? 'animate-pulse' : ''}`}
              >
                <div className="bg-[#23232A] border border-[#2D2D35] rounded-md h-10 w-10 flex items-center justify-center text-gray-400">
                  {i + 1}
                </div>
                <Input
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className="flex-1 bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600"
                  ref={(el) => { optionRefs.current[i] = el; }}
                />
                {options.length > 2 && (
                  <Button 
                    onClick={() => removeOption(i)}
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 text-gray-400 hover:text-red-400 hover:bg-[#2D2D35]"
                    aria-label={`Remove option ${i + 1}`}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}

            {options.length < 5 && (
              <Button 
                onClick={addOption} 
                variant="outline" 
                className="w-full mt-2 border-dashed border-[#3D3D45] bg-[#23232A] hover:bg-[#2D2D35] text-gray-300"
              >
                <Plus size={16} className="mr-2" />
                Add Option
              </Button>
            )}
          </div>
          
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-red-900/20 border border-red-900/30 text-red-400">
              <AlertCircle size={16} />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[#18181b] border border-[#23232A] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Poll Settings</h3>
          
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Multiple Choice</Label>
                <p className="text-xs text-gray-500">Allow selecting multiple options</p>
              </div>
              <Switch 
                checked={isMultipleChoice}
                onCheckedChange={setIsMultipleChoice}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Poll End Date</Label>
                <p className="text-xs text-gray-500">Set when this poll closes</p>
              </div>
              <Switch 
                checked={hasEndDate}
                onCheckedChange={setHasEndDate}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
            
            {hasEndDate && (
              <div className="pt-1">
                <Label className="text-gray-300 mb-1.5 block">End Date</Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="pl-10 bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600"
                  />
                  <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            )}
            
            <Separator className="bg-[#23232A] my-4" />
            
            <div>
              <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-1.5">
                <Info size={14} className="text-gray-400" />
                Preview
              </h4>
              <div className="bg-[#23232A] rounded-lg border border-[#2D2D35] p-4 min-h-[200px] flex items-center justify-center overflow-hidden">
                <PollChart options={options} isDark={true} />
              </div>
            </div>
          </div>
        </div>
        
        <Button
          onClick={submitPoll}
          disabled={isSubmitting || !question.trim() || options.filter(o => o.trim()).length < 2}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl text-base font-medium"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Creating Poll...
            </>
          ) : 'Create Poll'}
        </Button>
      </div>
    </div>
  );
}
