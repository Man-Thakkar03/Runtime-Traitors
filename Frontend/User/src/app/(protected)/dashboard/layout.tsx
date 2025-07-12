'use client';
import Sidebar from '@/components/global/sider';
import Navbar from '@/components/global/navbar';
import React, { useEffect, useState, use } from 'react';

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

const Layout = ({ children, params }: Props) => {
  const [currentSlug, setCurrentSlug] = useState<string>('');
  
  // Use React.use() to unwrap the params promise
  const unwrappedParams = use(params);
  
  useEffect(() => {
    // Access the unwrapped params
    if (unwrappedParams?.slug) {
      setCurrentSlug(unwrappedParams.slug);
      console.log("Layout rendering with slug:", unwrappedParams.slug);
      console.log("Current pathname:", window.location.pathname);
    }
  }, [unwrappedParams]);
  
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col">
      {/* Navbar at the top with highest z-index - temporarily commented out */}
      {/* <header className="fixed top-0 left-0 right-0 z-50 h-16">
        <Navbar slug={currentSlug} />
      </header> */}
      
      <div className="flex flex-1 pt-0 relative">
        {/* Sidebar on the left with lower z-index than navbar */}
        <aside className="hidden lg:block w-[280px] fixed left-0 top-0 bottom-0 overflow-y-auto bg-[#171717] border-r border-[#2D2D35] z-30">
          <div className="h-full overflow-y-auto">
            <Sidebar slug={currentSlug} />
          </div>
        </aside>
        
        {/* Main content area */}
        <main className="flex-1 lg:ml-[280px] min-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;