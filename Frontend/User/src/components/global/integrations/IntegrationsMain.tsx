'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Check, Plus, Zap, ArrowUpRight, ChevronRight } from 'lucide-react';

type Integration = {
  id: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  icon: React.ReactNode;
  color: string;
};

const categories = [
  { id: 'all', name: 'All Integrations' },
  { id: 'social', name: 'Social Media' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'analytics', name: 'Analytics' },
];

const integrations: Integration[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Connect your Instagram account to manage your social media presence.',
    category: 'social',
    connected: true,
    color: 'bg-gradient-to-br from-pink-500 to-purple-600',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="url(#instagram-gradient)" />
        <path d="M17 8a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V8z" fill="#fff" />
        <path d="M16.5 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor" />
        <defs>
          <linearGradient id="instagram-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFC107" />
            <stop offset="0.5" stopColor="#F44336" />
            <stop offset="1" stopColor="#9C27B0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Sync customer data and manage your CRM directly from the platform.',
    category: 'marketing',
    connected: false,
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#0176D3" />
        <path d="M12 6c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z" fill="#fff" />
        <path d="M12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6v12z" fill="#B9D9F1" />
        <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6h-6z" fill="#E5F1FB" />
      </svg>
    ),
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications and updates directly in your Slack workspace.',
    category: 'productivity',
    connected: false,
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#4A154B" />
        <path d="M5.5 12.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V8.5c0-.83-.67-1.5-1.5-1.5S5.5 7.67 5.5 8.5v4z" fill="#E01E5A" />
        <path d="M8.5 15.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-1.5H8.5v1.5z" fill="#36C5F0" />
        <path d="M11.5 15.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v4z" fill="#2EB67D" />
        <path d="M14.5 12.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-1.5h-3v1.5z" fill="#ECB22E" />
        <path d="M18.5 11.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v4c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-4z" fill="#E01E5A" />
        <path d="M15.5 8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.5h3V8.5z" fill="#36C5F0" />
      </svg>
    ),
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Track and analyze your website traffic and user behavior.',
    category: 'analytics',
    connected: true,
    color: 'bg-gradient-to-br from-green-500 to-blue-500',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#F9AB00" />
        <path d="M12 12v8c4.418 0 8-3.582 8-8h-8z" fill="#E37400" />
        <path d="M12 4v8h8c0-4.418-3.582-8-8-8z" fill="#4285F4" />
        <path d="M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8v-8h8c0-4.418-3.582-8-8-8z" fill="#0F9D58" />
      </svg>
    ),
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Sync your email marketing campaigns and subscriber lists.',
    category: 'marketing',
    connected: false,
    color: 'bg-gradient-to-br from-yellow-500 to-pink-500',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#FFE01B" />
        <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10.5c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" fill="#0C0C0C" />
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" fill="#FF0F44" />
      </svg>
    ),
  },
];

export default function IntegrationsMain() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [connectedOnly, setConnectedOnly] = useState(false);

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || integration.category === activeCategory;
    const matchesConnection = !connectedOnly || integration.connected;
    
    return matchesSearch && matchesCategory && matchesConnection;
  });

  const toggleConnection = (id: string) => {
    // In a real app, you would update the integration's connected status via an API call
    console.log(`Toggled connection for integration ${id}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Integrations</h1>
          <p className="text-gray-400">Connect your favorite tools and services</p>
        </div>
        <div className="w-full md:w-auto flex gap-3">
          <Button 
            variant="outline" 
            className="bg-transparent border-[#2D2D35] hover:bg-[#2D2D35] text-white flex items-center gap-2"
            onClick={() => setConnectedOnly(!connectedOnly)}
          >
            {connectedOnly ? (
              <>
                <Check className="h-4 w-4 text-green-400" />
                <span>Connected Only</span>
              </>
            ) : (
              <span>Show Connected Only</span>
            )}
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Integration
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search integrations..."
            className="pl-10 bg-[#1E1E24] border-[#2D2D35] text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#1E1E24] text-gray-300 hover:bg-[#2D2D35]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1A1A1F] border border-[#2D2D35] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Integrations</p>
              <p className="text-2xl font-bold text-white">{integrations.length}</p>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1F] border border-[#2D2D35] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Connected</p>
              <p className="text-2xl font-bold text-green-500">
                {integrations.filter(i => i.connected).length}
              </p>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Check className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1F] border border-[#2D2D35] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Available</p>
              <p className="text-2xl font-bold text-yellow-500">
                {integrations.filter(i => !i.connected).length}
              </p>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Plus className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.length > 0 ? (
          filteredIntegrations.map((integration) => (
            <div 
              key={integration.id}
              className="bg-[#1A1A1F] border border-[#2D2D35] rounded-xl overflow-hidden hover:border-[#3D3D45] transition-colors duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`${integration.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center`}>
                    {integration.icon}
                  </div>
                  <button 
                    onClick={() => toggleConnection(integration.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      integration.connected 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20'
                    }`}
                  >
                    {integration.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{integration.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{integration.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 bg-[#2D2D35] text-gray-300 rounded-full capitalize">
                    {integration.category}
                  </span>
                  <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                    Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {integration.connected && (
                <div className="bg-green-500/10 px-4 py-2 text-xs text-green-400 flex items-center gap-2 border-t border-green-500/20">
                  <Check className="h-3.5 w-3.5" />
                  <span>Connected on {new Date().toLocaleDateString()}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto w-16 h-16 bg-[#2D2D35] rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">No integrations found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We couldn't find any integrations matching your search. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      {filteredIntegrations.length > 0 && (
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 mb-6">
            <Zap className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Need a different integration?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            We're constantly adding new integrations. Let us know what you'd like to see next!
          </p>
          <Button variant="outline" className="border-[#3D3D45] text-white hover:bg-[#2D2D35] flex items-center gap-2 mx-auto">
            Request Integration <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
