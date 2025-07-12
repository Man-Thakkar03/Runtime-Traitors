'use client';

import React, { useState } from 'react';
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useClerk,
} from '@clerk/nextjs';
import { User, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loader from '@/components/global/loader';
import { useGuestAuth } from '@/providers/guest-auth-provider';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

type Props = object;

const ClerkAuthState = () => {
  const { isGuestUser, signInAsGuest, signOutGuest } = useGuestAuth();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { signOut } = useClerk();

  const handleGuestSignIn = () => {
    signInAsGuest();
  };

  const handleGuestSignOut = () => {
    signOutGuest();
    router.push('/');
  };
  
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    setUserMenuOpen(false);
  };

  return (
    <>
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      
      {/* Show when not signed in and not a guest */}
      {!isGuestUser && (
        <SignedOut>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleGuestSignIn}
              className="rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 text-white hover:from-purple-800 hover:to-purple-600 shadow-md"
            >
              <User className="mr-2 h-4 w-4" />
              Get Started
            </Button>
            
            <SignInButton>
              <Button
                className="rounded-xl bg-[#252525] text-white hover:bg-[#303030]"
                size="icon"
              >
                <LogIn className="h-4 w-4" />
              </Button>
            </SignInButton>
          </div>
        </SignedOut>
      )}
      
      {/* Show when signed in with Clerk */}
      <SignedIn>
        <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <UserButton />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1A1A1F] border-[#2D2D35]">
            <DropdownMenuItem 
              onClick={() => router.push('/dashboard')}
              className="cursor-pointer flex items-center hover:bg-[#252525] text-white"
            >
              <User className="mr-2 h-4 w-4 text-purple-400" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2D2D35]" />
            <DropdownMenuItem 
              onClick={handleSignOut}
              className="cursor-pointer flex items-center hover:bg-[#252525] text-white"
            >
              <LogOut className="mr-2 h-4 w-4 text-red-400" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>
      
      {/* Show when signed in as guest */}
      {isGuestUser && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-xl bg-[#252525] text-white hover:bg-[#303030] flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Guest User
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1A1A1F] border-[#2D2D35]">
            <DropdownMenuItem 
              onClick={() => router.push('/dashboard')}
              className="cursor-pointer flex items-center hover:bg-[#252525] text-white"
            >
              <User className="mr-2 h-4 w-4 text-purple-400" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2D2D35]" />
            <DropdownMenuItem 
              onClick={handleGuestSignOut}
              className="cursor-pointer flex items-center hover:bg-[#252525] text-white"
            >
              <LogOut className="mr-2 h-4 w-4 text-red-400" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ClerkAuthState;