'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface GuestAuthContextType {
  isGuestUser: boolean;
  signInAsGuest: () => void;
  signOutGuest: () => void;
}

const GuestAuthContext = createContext<GuestAuthContextType | undefined>(undefined);

export const useGuestAuth = () => {
  const context = useContext(GuestAuthContext);
  if (!context) {
    throw new Error('useGuestAuth must be used within a GuestAuthProvider');
  }
  return context;
};

export function GuestAuthProvider({ children }: { children: React.ReactNode }) {
  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
  const router = useRouter();

  // Check if user is already signed in as guest on mount
  useEffect(() => {
    const guestStatus = localStorage.getItem('guestUser');
    if (guestStatus === 'true') {
      setIsGuestUser(true);
    }
  }, []);

  const signInAsGuest = () => {
    localStorage.setItem('guestUser', 'true');
    setIsGuestUser(true);
    router.push('/dashboard');
  };

  const signOutGuest = () => {
    localStorage.removeItem('guestUser');
    setIsGuestUser(false);
    router.push('/');
  };

  return (
    <GuestAuthContext.Provider value={{ isGuestUser, signInAsGuest, signOutGuest }}>
      {children}
    </GuestAuthContext.Provider>
  );
}
