import React from 'react';
import Link from 'next/link';
import { SIDEBAR_MENU } from '@/constants/menu';
import { usePaths } from '@/hooks/use-nav';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Props = {
  slug: string;
};

const Items = ({ slug }: Props) => {
  // Log debug information
  const { page: currentPage, pathname } = usePaths();
  console.log('Current page from usePaths:', currentPage);
  console.log('Current slug:', slug);

  return SIDEBAR_MENU.map((item) => {
    // Use the href directly from menu item
    const href = item.href || '#';
    
    // Determine if this is the currently active item
    const isActive = href === '/dashboard'
      ? currentPage === 'dashboard'
      : href !== '#' && pathname.startsWith(href);
    
    // Log debug information for each menu item
    console.log(`Menu item: ${item.label}, Href: ${href}, isActive: ${isActive}`);

    // Ensure icon is a valid React element before cloning
    const iconElement = React.isValidElement(item.icon) ? item.icon : null;

    return (
      <motion.div 
        key={item.id}
        whileHover={{ x: 4 }}
        className="relative"
      >
        <Link
          href={href}
          className={cn(
            'group relative flex items-center gap-x-3 p-3 pl-6 rounded-lg transition-all duration-200',
            isActive 
              ? 'bg-purple-600/10 font-medium' 
              : 'font-normal hover:bg-white/5'
          )}
        >
          {/* Active indicator */}
          <span 
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r transition-all duration-200',
              isActive ? 'bg-purple-600' : 'bg-transparent group-hover:bg-purple-600/30'
            )}
          />
          
          {/* Icon */}
          <span className="flex-shrink-0">
            {iconElement && React.cloneElement(iconElement, {
              className: cn(
                'w-5 h-5',
                isActive ? 'text-white' : 'text-gray-400 group-hover:text-white',
                iconElement.props?.className
              )
            })}
          </span>
          
          {/* Text */}
          <span className={cn(
            'transition-colors duration-200',
            isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
          )}>
            {item.label}
          </span>
          
          {/* Background highlight on hover */}
          <span className={cn(
            'absolute inset-0 -z-10 rounded-lg transition-all duration-200',
            isActive 
              ? 'bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-l-2 border-purple-500/30' 
              : 'bg-transparent group-hover:bg-[#23232A]'
          )} />
        </Link>
      </motion.div>
    );
  });
};

export default Items;