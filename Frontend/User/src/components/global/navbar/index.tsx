'use client';
import { PAGE_BREAD_CRUMBS } from '@/constants/pages';
import { usePaths } from '@/hooks/user-nav';
import { Menu, Plus, Bell, Search as SearchIcon, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import Sheet from '@/components/global/sheet';
import React, { useState, useEffect } from 'react';
import Items from "@/components/global/sider/items";
import { Separator } from '@/components/ui/separator';
import ClerkAuthState from '@/components/global/clerk-auth-state';
import { LogoSmall } from '@/svgs/logo-small';
import Search from '@/components/global/search';
import { Notifications } from '@/components/global/navbar/notifications';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  slug: string;
};

const Navbar = ({ slug }: Props) => {
  const { page } = usePaths();
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page === slug;
  
  // Get current page title for breadcrumb
  const getPageTitle = () => {
    const pageTitle = page.charAt(0).toUpperCase() + page.slice(1);
    return pageTitle || 'Dashboard';
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        'w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-[#0f0f11]/95 backdrop-blur-lg border-b border-white/5' : 'bg-[#0a0a0b]/95 backdrop-blur-md'
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Mobile menu and Title */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Sheet 
              trigger={
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              } 
              side='left'
            >
              <div className="flex flex-col h-full bg-[#0f0f11] p-4 w-72 border-r border-white/5">
                <div className="flex items-center space-x-2 p-4 mb-4">
                  <LogoSmall />
                  <span className="text-white font-medium">Slice</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <Items slug={slug} />
                </div>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                      <ClerkAuthState />
                      <span>Profile</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                      <HelpCircle className="h-5 w-5" />
                      <span>Help & Support</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Sheet>

            {/* Logo */}
            <div className="hidden md:flex items-center space-x-2">
              <LogoSmall />
              <span className="text-white font-medium">Slice</span>
            </div>

            {/* Page title */}
            <div className="hidden md:flex items-center ml-4">
              <div className="h-6 w-px bg-white/10 mx-4" />
              <div className="flex items-center">
                <h1 className="text-base font-medium text-white">{getPageTitle()}</h1>
                <span className="mx-2 text-white/30">/</span>
                <span className="text-white/60 text-sm">{slug}</span>
              </div>
            </div>
          </div>

          {/* Right side - Search and actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative hidden md:block transition-all duration-300 w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-white/40" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/5"
                placeholder="Search..."
              />
            </div>

            {/* Create New Button */}
            <div className="hidden sm:block">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20">
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            </div>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white/60 hover:text-white hover:bg-white/5 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-[#0f0f11]"></span>
            </Button>


            {/* User Profile */}
            <div className="relative ml-1">
              <Button variant="ghost" className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#2D2D35]">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                  <ClerkAuthState />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
