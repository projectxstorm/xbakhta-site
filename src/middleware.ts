import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Skip middleware on API routes and the launch page itself
  if (request.nextUrl.pathname.startsWith('/api') || 
      request.nextUrl.pathname.startsWith('/launch') ||
      request.nextUrl.pathname.includes('_next')) {
    return NextResponse.next();
  }
  
  // Check for bypass parameter in URL (?bypassRedirect=true) 
  // This allows direct access to the site from external links
  const bypassRedirect = request.nextUrl.searchParams.get('bypassRedirect') === 'true';
  
  // Check for bypass cookie (can be set by the admin interface)
  // This allows persistent access to the site after initial bypass
  const bypassCookie = request.cookies.get('bypassLaunchRedirect');
  
  // If either bypass mechanism is present, don't redirect
  if (bypassRedirect || bypassCookie?.value === 'true') {
    // If using the URL parameter, set a cookie to remember the choice
    // This way the user doesn't need the parameter in the URL for future visits
    if (bypassRedirect) {
      const response = NextResponse.next();
      response.cookies.set('bypassLaunchRedirect', 'true', {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      return response;
    }
    return NextResponse.next();
  }
  
  try {
    // Read launch settings from the API route
    const launchSettingsResponse = await fetch(new URL('/api/data?type=launchSettings', request.url));
    
    // If the request fails, don't redirect
    if (!launchSettingsResponse.ok) {
      return NextResponse.next();
    }
    
    const launchSettingsData = await launchSettingsResponse.json();
    const launchSettings = launchSettingsData.content;
    
    // If launch mode is active and redirectToLaunch is enabled, redirect to the launch page
    if (launchSettings.isActive && launchSettings.redirectToLaunch) {
      return NextResponse.redirect(new URL('/launch', request.url));
    }
  } catch (error) {
    console.error('Error in middleware:', error);
    // If there's any error, don't redirect
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /launch (our launch page)
     * 4. all root files in the public folder
     */
    '/((?!api|_next|launch|favicon.ico).*)',
  ],
}; 