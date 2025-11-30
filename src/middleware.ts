import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Tentukan rute mana yang BOLEH diakses tanpa login (public)
// Sesuaikan dengan halaman landing page, sign-in, dan sign-up Anda
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  '/role-check(.*)',
  '/role-redirect(.*)',
  '/forgot-password(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};