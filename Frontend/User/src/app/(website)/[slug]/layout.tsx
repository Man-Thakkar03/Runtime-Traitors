'use client';
import Sidebar from '@/components/global/sider';
import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

// Load Inter font with specific weights
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

// Create a style element for the grid pattern
const gridPattern = {
  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 20L40 6 20 0 0 20l6 20-6 20 20 6 20-6 14-14 6-20-6-20zM0 60h60V0H0v60z\' fill=\'%2323232a\' fillOpacity=\'0.08\' fillRule=\'evenodd\'/%3E%3C/svg%3E")',
};

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

const Layout = ({ children, params }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`${inter.variable} font-sans min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#111118] text-gray-100`}>
      {/* Subtle grid pattern */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={gridPattern}
      />
      
      {/* Main layout */}
      <div className="relative min-h-screen flex flex-col">
        {isMounted && <Sidebar slug={params.slug} />}
        
        {/* Content area with smooth transitions */}
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex-1 transition-all duration-300 ease-in-out pl-0 md:pl-[280px] pt-4"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={params.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.main>
        
        {/* Decorative elements */}
        <div className="fixed top-0 -right-1/2 w-full h-full bg-gradient-radial from-purple-900/20 via-transparent to-transparent opacity-30 -z-10" />
      </div>
    </div>
  );
};

export default Layout;