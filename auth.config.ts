import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAuthRoute = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");
            const isPublicRoute = nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/api/uploadthing");
            const isProtected = nextUrl.pathname.startsWith("/learn") ||
                nextUrl.pathname.startsWith("/courses") ||
                nextUrl.pathname.startsWith("/settings") ||
                nextUrl.pathname.startsWith("/leaderboard");

            // For now, allow everything for guest mode compatibility
            // We will tighten this once auth is fully working
            return true;
        },
        session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        jwt({ token }) {
            return token;
        }
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
