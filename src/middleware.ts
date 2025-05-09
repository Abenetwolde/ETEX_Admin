// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextRequest } from 'next/server';

// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// export default clerkMiddleware(async (auth, req: NextRequest) => {
//   if (isProtectedRoute(req)) await auth.protect();
// });
export default function middleware() {
  // No logic, allowing all routes to be accessed without restrictions
  return;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
