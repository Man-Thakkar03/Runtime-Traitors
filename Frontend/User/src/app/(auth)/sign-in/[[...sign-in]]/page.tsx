'use client';

import { SignIn } from '@clerk/nextjs';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = object;

const Page = () => {
  const router = useRouter();

  const handleGuestSignIn = () => {
    // Set cookie for guest user
    document.cookie = 'guestUser=true; path=/; max-age=86400'; // 24 hours
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <SignIn />
      <div className="mt-8 text-center">
        <div className="mb-4 text-gray-400">or</div>
        <Button 
          onClick={handleGuestSignIn}
          className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white py-2 px-6 rounded-xl"
        >
          Continue as Guest
        </Button>
        <p className="mt-2 text-xs text-gray-500">
          Limited access. No account required.
        </p>
      </div>
    </div>
  );
};

export default Page;