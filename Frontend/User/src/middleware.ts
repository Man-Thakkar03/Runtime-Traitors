import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/payment(.*)',
  '/callback(.*)',
]);

// Define public routes that should be accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook(.*)',
]);

// Function to check if the user is a guest
const isGuestUser = (req: NextRequest) => {
  const cookies = req.cookies;
  return cookies.has('guestUser') && cookies.get('guestUser')?.value === 'true';
};

// Export the middleware function
export default clerkMiddleware(
  async (auth, req) => {
    // Skip authentication check for public routes
    if (isPublicRoute(req)) {
      return;
    }
    
    // Allow guest users to access protected routes
    if (isGuestUser(req as NextRequest)) {
      return;
    }
    
    // Protect routes that require authentication for non-guest users
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  }
);

export const config = {
  matcher: [
    // Only run middleware on specific routes we want to protect or handle
    // Protected routes
    '/dashboard/:path*',
    '/api/payment/:path*',
    '/callback/:path*',
    // API routes
    '/api/:path*',
    // Add the homepage and any other routes that need middleware
    '/',
    // Exclude all static files and Next.js internals
    '/((?!_next/|static/|public/|favicon.ico).*)',
  ],
};