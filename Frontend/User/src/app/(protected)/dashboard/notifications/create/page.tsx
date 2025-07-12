"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, ChevronLeft, Calendar, MapPin, Info, Users, Image } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [capacity, setCapacity] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location || !date || !time) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Event created:', { 
        title, 
        description, 
        location,
        datetime: `${date}T${time}`,
        capacity: capacity ? parseInt(capacity) : undefined,
        isPublic,
        image: selectedImage      });
      
      // Navigate back to events
      router.push('/dashboard/events');
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    router.back();
  };
  
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Create New Event</h1>
            <p className="text-gray-400 mt-1">Schedule a new event for your community</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={goBack}
              className="flex items-center gap-2 bg-[#1E1E24] hover:bg-[#2D2D35] text-gray-300 px-4 py-2 rounded-lg border border-[#2D2D35] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm">Back to Events</span>
            </button>
          </div>
        </div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400">
          <span onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span onClick={() => router.push('/dashboard/events')} className="hover:text-white transition-colors cursor-pointer">Events</span>
          <span className="mx-2">/</span>
          <span className="text-white">Create Event</span>
        </nav>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="bg-[#18181b] border border-[#23232A] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">Event Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter event title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your event" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 min-h-[120px] bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-gray-300">Date</Label>
                  <div className="relative mt-1">
                    <Input 
                      type="date" 
                      id="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="pl-10 bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600"
                    />
                    <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="time" className="text-gray-300">Time</Label>
                  <div className="relative mt-1">
                    <Input 
                      type="time" 
                      id="time" 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="pl-10 bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600"
                    />
                    <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="location" className="text-gray-300">Location</Label>
                <div className="relative mt-1">
                  <Input 
                    id="location" 
                    placeholder="Enter event location" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="pl-10 bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600"
                  />
                  <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="capacity" className="text-gray-300">Capacity (optional)</Label>
                <div className="relative mt-1">
                  <Input 
                    id="capacity" 
                    type="number" 
                    placeholder="Maximum number of attendees" 
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    min="1"
                    className="pl-10 bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600"
                  />
                  <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#18181b] border border-[#23232A] rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Event Image</h3>
            
            <div className="flex items-center justify-center border-2 border-dashed border-[#2D2D35] rounded-lg p-6 hover:border-[#3D3D45] transition-colors">
              {selectedImage ? (
                <div className="relative w-full">
                  <img 
                    src={selectedImage} 
                    alt="Event cover" 
                    className="max-h-[200px] w-full object-contain rounded"
                  />
                  <button 
                    type="button"
                    onClick={() => setSelectedImage(null)} 
                    className="absolute top-2 right-2 bg-black/50 p-1 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <label className="block">
                    <span className="text-gray-300 text-sm">Click to upload an image</span>
                    <input 
                      type="file" 
                      className="sr-only" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Event Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-gray-300">Public Event</Label>
                  <p className="text-xs text-gray-500">Anyone can view and RSVP</p>
                </div>
                <Switch 
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-gray-300">Allow Guest +1</Label>
                  <p className="text-xs text-gray-500">Attendees can bring a guest</p>
                </div>
                <Switch className="data-[state=checked]:bg-purple-600" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-gray-300">Send Reminders</Label>
                  <p className="text-xs text-gray-500">24h before event starts</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#1E1E24] to-[#23232A] border border-[#2D2D35] p-6 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <Info className="h-5 w-5 text-blue-400" />
              <div>
                <h4 className="text-sm font-medium text-white mb-1">Event Tips</h4>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li>• Add a clear description for better attendance</li>
                  <li>• Include images to make your event stand out</li>
                  <li>• Set a reasonable capacity for your venue</li>
                  <li>• Send reminders to increase attendance</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting || !title || !description || !location || !date || !time}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl text-base font-medium"
          >
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </Button>
        </div>
      </form>
    </div>
  );
}
