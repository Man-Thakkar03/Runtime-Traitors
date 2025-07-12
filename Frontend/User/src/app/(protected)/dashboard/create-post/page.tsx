"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Image, Hash, ChevronLeft, Paperclip, AtSign, Smile, Calendar, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import CharCounter from "@/components/global/create-post/CharCounter";
import PreviewBox from "@/components/global/create-post/PreviewBox";

export default function CreatePostPage() {
  const [postContent, setPostContent] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async () => {
    if (!postContent.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Post submitted:', { 
        content: postContent, 
        image: selectedImage,
        allowComments: allowComments,
        isScheduled: isScheduled
      });
      
      // Navigate back to feed
      router.push('/dashboard/feed');
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    router.back();  };
  
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Create New Post</h1>
            <p className="text-gray-400 mt-1">Share your thoughts with the community</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={goBack}
              className="flex items-center gap-2 bg-[#1E1E24] hover:bg-[#2D2D35] text-gray-300 px-4 py-2 rounded-lg border border-[#2D2D35] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm">Back to Feed</span>
            </button>
          </div>
        </div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400">
          <span onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span onClick={() => router.push('/dashboard/feed')} className="hover:text-white transition-colors cursor-pointer">Feed</span>
          <span className="mx-2">/</span>
          <span className="text-white">Create Post</span>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="bg-[#18181b] border border-[#23232A] rounded-xl">
            <div className="p-6">
              <Tabs defaultValue="compose" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#2D2D35]">
                  <TabsTrigger 
                    value="compose" 
                    onClick={() => setIsPreviewMode(false)}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-700 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=inactive]:bg-[#3A3A45] data-[state=inactive]:text-gray-300"
                  >
                    Compose
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preview" 
                    onClick={() => setIsPreviewMode(true)}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-700 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=inactive]:bg-[#3A3A45] data-[state=inactive]:text-gray-300"
                  >
                    Preview
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="compose" className="space-y-4">
                  <Textarea
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="min-h-[200px] bg-[#23232A] border-[#2D2D35] text-gray-200 focus-visible:ring-purple-600 focus-visible:border-purple-600 resize-none"
                  />
                  <div className="flex justify-end">
                    <CharCounter text={postContent} max={500} />
                  </div>
                  
                  {selectedImage && (
                    <div className="relative mt-4">
                      <div className="w-full rounded-lg overflow-hidden border border-[#2D2D35]">
                        <img 
                          src={selectedImage} 
                          alt="Selected" 
                          className="w-full h-auto max-h-[300px] object-contain"
                        />
                      </div>
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2 right-2 p-1 bg-black/40 rounded-full hover:bg-black/60 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="preview">
                  {postContent ? (
                    <div className="bg-[#23232A] p-4 rounded-lg border border-[#2D2D35] min-h-[200px]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-[#2D2D35] flex items-center justify-center text-gray-300">
                          <span>U</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">You</p>
                          <p className="text-xs text-gray-400">Just now</p>
                        </div>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap">{postContent}</p>
                      
                      {selectedImage && (
                        <div className="mt-4 rounded-lg overflow-hidden border border-[#2D2D35]">
                          <img 
                            src={selectedImage} 
                            alt="Selected" 
                            className="w-full h-auto max-h-[300px] object-contain"
                          />
                        </div>
                      )}
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {postContent.split(' ')
                          .filter(word => word.startsWith('#') || word.startsWith('@'))
                          .map((tag, i) => (
                            <span 
                              key={i}
                              className={`text-sm px-2 py-1 rounded-full bg-[#2D2D35] ${
                                tag.startsWith('#') ? 'text-purple-400' : 'text-blue-400'
                              } font-medium cursor-pointer hover:bg-[#3D3D45] transition-colors`}
                            >
                              {tag}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#23232A] p-6 rounded-lg border border-[#2D2D35] min-h-[200px] flex items-center justify-center">
                      <p className="text-gray-500">Your post preview will appear here</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <Separator className="bg-[#23232A]" />
            
            <div className="p-4 flex flex-wrap gap-3">
              <label className="relative flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-[#23232A] transition-colors">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="sr-only" 
                  onChange={handleImageUpload} 
                />
                <Image size={18} />
                <span className="text-sm">Image</span>
              </label>
              
              <button className="flex items-center gap-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-[#23232A] transition-colors">
                <Hash size={18} />
                <span className="text-sm">Tag</span>
              </button>
              
              <button className="flex items-center gap-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-[#23232A] transition-colors">
                <AtSign size={18} />
                <span className="text-sm">Mention</span>
              </button>
              
              <button className="flex items-center gap-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-[#23232A] transition-colors">
                <Smile size={18} />
                <span className="text-sm">Emoji</span>
              </button>
              
              <button className="flex items-center gap-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-[#23232A] transition-colors">
                <MapPin size={18} />
                <span className="text-sm">Location</span>
              </button>
              
              <button className="flex items-center gap-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-[#23232A] transition-colors">
                <Paperclip size={18} />
                <span className="text-sm">Attach</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Post Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-gray-300">Schedule Post</Label>
                  <p className="text-xs text-gray-500">Set a future publish date</p>
                </div>
                <Switch 
                  checked={isScheduled}
                  onCheckedChange={setIsScheduled}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-700 data-[state=checked]:to-purple-500"
                />
              </div>
              
              {isScheduled && (
                <div className="pt-2">
                  <Label className="text-gray-300 mb-2 block">Publish Date & Time</Label>
                  <div className="flex items-center gap-2 py-2 px-3 bg-[#23232A] border border-[#2D2D35] rounded-lg text-gray-300">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm">Select date & time</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-gray-300">Allow Comments</Label>
                  <p className="text-xs text-gray-500">Let others comment on your post</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${allowComments ? 'text-purple-400' : 'text-gray-500'}`}>
                    {allowComments ? 'Enabled' : 'Disabled'}
                  </span>
                  <Switch 
                    checked={allowComments}
                    onCheckedChange={setAllowComments}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-700 data-[state=checked]:to-purple-500 data-[state=unchecked]:bg-gray-700"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-gray-300">Post Visibility</Label>
                  <p className="text-xs text-gray-500">Who can see this post</p>
                </div>
                <div className="relative">
                  <select className="text-sm appearance-none bg-gradient-to-r from-purple-700/40 to-purple-500/40 border border-purple-500/50 rounded-lg text-white py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-600/50 cursor-pointer">
                    <option value="public">Public</option>
                    <option value="followers">Followers only</option>
                    <option value="private">Private</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Hashtag Suggestions</h3>
            
            <div className="flex flex-wrap gap-2">
              <button className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-700/20 to-purple-500/20 text-purple-300 hover:from-purple-700/30 hover:to-purple-500/30 border border-purple-500/30 transition-colors">
                #design
              </button>
              <button className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-700/20 to-purple-500/20 text-purple-300 hover:from-purple-700/30 hover:to-purple-500/30 border border-purple-500/30 transition-colors">
                #webdev
              </button>
              <button className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-700/20 to-purple-500/20 text-purple-300 hover:from-purple-700/30 hover:to-purple-500/30 border border-purple-500/30 transition-colors">
                #technology
              </button>
              <button className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-700/20 to-purple-500/20 text-purple-300 hover:from-purple-700/30 hover:to-purple-500/30 border border-purple-500/30 transition-colors">
                #programming
              </button>
              <button className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-700/20 to-purple-500/20 text-purple-300 hover:from-purple-700/30 hover:to-purple-500/30 border border-purple-500/30 transition-colors">
                #ai
              </button>
              <button className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-700/20 to-purple-500/20 text-purple-300 hover:from-purple-700/30 hover:to-purple-500/30 border border-purple-500/30 transition-colors">
                #trend
              </button>
            </div>
          </div>
          
          <Button 
            onClick={handleSubmit}
            disabled={!postContent.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white py-6 rounded-xl text-base font-medium shadow-lg shadow-purple-700/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isSubmitting ? 'Publishing...' : isScheduled ? 'Schedule Post' : 'Publish Post'}
          </Button>
        </div>
      </div>
    </div>
  );
}
