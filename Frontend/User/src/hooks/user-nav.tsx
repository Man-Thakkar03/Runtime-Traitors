import { usePathname } from 'next/navigation';

export const usePaths = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  
  // Extract the last part of the path for page name
  let page = '';
  
  if (pathSegments.length > 0) {
    // If it's just /dashboard, set page to 'dashboard'
    if (pathSegments.length === 1 && pathSegments[0] === 'dashboard') {
      page = 'dashboard';
    } 
    // If it's /dashboard/[slug] where slug matches 'dashboard'
    else if (pathSegments.length === 2 && pathSegments[0] === 'dashboard') {
      page = 'dashboard';
    }
    // If it's /dashboard/[slug]/path
    else if (pathSegments.length >= 3 && pathSegments[0] === 'dashboard') {
      page = pathSegments[2];
    }
  }
  
  console.log('Current pathname:', pathname);
  console.log('Path segments:', pathSegments);
  console.log('Resolved page:', page);
  
  return { page, pathname };
};
