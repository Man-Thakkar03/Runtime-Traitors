'use client'
import React from 'react';
import { usePaths } from '@/hooks/user-nav';
import { LogoSmall } from '@/svgs/logo-small';
import Items from "@/components/global/sider/items";
import { Separator } from '@/components/ui/separator';
import ClerkAuthState from '@/components/global/clerk-auth-state';
import HelpDuoToneWhite from '@/svgs/help-duotone-white';
import { motion } from 'framer-motion';

type Props = {
    slug: string;
}

const Sidebar = (props: Props) => {
    const { page } = usePaths();
    
    return (
        <motion.div 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-[280px] fixed left-0 top-0 bottom-0 h-screen bg-gradient-to-b from-[#181A20] to-[#0f1013] border-r border-[#2A2A30]/50 shadow-2xl backdrop-blur-sm z-0 overflow-y-auto custom-scrollbar"
        >
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 pb-4 border-b border-[#2A2A30]/50">
                    <div className="flex items-center justify-start">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                            <div className="relative">
                                <LogoSmall />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-4 px-3">
                    <Items slug={props.slug} />
                </div>

                {/* Bottom Section */}
                <div className="p-4 border-t border-[#2A2A30]/50 bg-gradient-to-t from-[#1a1b20] to-transparent">
                    <div className="space-y-4">
                        <div className="px-3">
                            <Separator className="bg-[#2A2A30]/50" />
                        </div>
                        
                        <motion.div 
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2A2A30]/50 transition-colors cursor-pointer"
                        >
                            <ClerkAuthState />
                            <span className="text-[#E0E0E0] font-medium">Profile</span>
                        </motion.div>
                        
                        <motion.div 
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2A2A30]/50 transition-colors cursor-pointer"
                        >
                            <HelpDuoToneWhite className="text-[#9B9CA0] group-hover:text-white transition-colors" />
                            <span className="text-[#9B9CA0] group-hover:text-white transition-colors">Help & Support</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Custom scrollbar styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3A3A40;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #4A4A50;
                }
            `}</style>
        </motion.div>
    );
};

export default Sidebar;
