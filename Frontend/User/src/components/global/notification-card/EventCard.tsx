"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, Users, ExternalLink, Share2 } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id: number;
  title: string;
  location: string;
  datetime: string;
  description: string;
  attendees?: number;
  host?: string;
  thumbnail?: string;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [rsvp, setRsvp] = useState(false);

  const handleRSVP = () => setRsvp(!rsvp);

  const eventDate = new Date(event.datetime);
  const isPastEvent = eventDate < new Date();
  
  // Format date nicely
  const formattedDate = format(eventDate, 'MMM dd, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');

  return (
    <div className="bg-[#18181b] border border-[#23232A] rounded-xl overflow-hidden hover:border-[#3D3D45] transition-all duration-200 flex flex-col h-full">
      {/* Event Image */}
      {event.thumbnail && (
        <div className="relative w-full h-32">
          <img 
            src={event.thumbnail} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Overlay date badge */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </div>
          
          {isPastEvent && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500/80 text-white text-sm px-3 py-1 rounded-full font-medium">
                Event Ended
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-white">{event.title}</h2>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <Clock className="h-3.5 w-3.5" />
          <span>{formattedTime}</span>
          <span className="mx-1">•</span>
          <MapPin className="h-3.5 w-3.5" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{event.description}</p>
        
        {event.host && (
          <div className="flex items-center mt-2 mb-3">
            <div className="h-5 w-5 rounded-full bg-[#2D2D35] flex items-center justify-center text-xs text-gray-300 mr-2">
              {event.host.charAt(0)}
            </div>
            <span className="text-xs text-gray-400">Hosted by <span className="text-gray-300">{event.host}</span></span>
          </div>
        )}
      </div>
      
      <div className="border-t border-[#23232A] p-4 flex items-center justify-between">
        {event.attendees !== undefined && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Users className="h-3.5 w-3.5" />
            <span>{event.attendees} attending</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#23232A] rounded transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#23232A] rounded transition-colors">
            <ExternalLink className="h-4 w-4" />
          </button>
          <button
            onClick={handleRSVP}
            disabled={isPastEvent}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              isPastEvent
                ? "bg-[#23232A] text-gray-500 cursor-not-allowed"
                : rsvp 
                  ? "bg-green-600/20 text-green-400 border border-green-600/50" 
                  : "bg-purple-600 hover:bg-purple-700 text-white"
            } transition-colors`}
          >
            {isPastEvent ? "Ended" : rsvp ? "Going" : "RSVP"}
          </button>
        </div>
      </div>
    </div>
  );
}
