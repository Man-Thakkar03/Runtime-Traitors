'use client';

import { usePathname } from 'next/navigation';

export const usePaths = () => {
  const pathname = usePathname();
  
  // Extract the page from the pathname
  // e.g., /dashboard/chat -> chat, /dashboard -> dashboard
  const segments = pathname.split('/');
  const page = segments[segments.length - 1] || segments[segments.length - 2] || '';

  return {
    page,
    pathname
  };
};
