import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
 
export function middleware(request: NextRequest) {
  // For now, allow all routes - Firebase Auth will handle authentication on the client side
  // You can add more sophisticated auth logic here later if needed
  return NextResponse.next();
}
 
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};