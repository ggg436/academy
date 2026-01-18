"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSaveProgressModal } from "@/store/use-save-progress-modal";

const PROTECTED_ROUTES = [
  "/learn",
  "/courses",
  "/settings",
  "/leaderboard",
];

export const SaveProgressPrompt = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { open, isOpen } = useSaveProgressModal();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Wait for session to load
    if (status === "loading") return;

    // Check if user is authenticated
    const isAuthenticated = !!session?.user;

    // If user just logged in, clear the dismissed flag
    if (isAuthenticated) {
      localStorage.removeItem("saveProgressModalDismissed");
      return;
    }

    // List of public routes that should not show the modal
    const publicRoutes = [
      "/",
      "/api",
      "/login",
      "/register",
      "/admin",
      "/debug",
      "/buttons",
      "/runner",
      "/gmail-photo-help",
    ];

    // Check if current route is public
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));

    // Check if current route is protected
    const isProtectedRoute = !isPublicRoute && (
      PROTECTED_ROUTES.some(route => pathname.startsWith(route)) ||
      // Also check for course pages (pattern: /[courseId] or /[courseId]/...)
      // but exclude known public routes
      /^\/[^\/]+(\/|$)/.test(pathname)
    );

    // Check if modal was already dismissed
    const wasDismissed = localStorage.getItem("saveProgressModalDismissed") === "true";

    // Show modal if:
    // 1. User is not authenticated
    // 2. Route is protected
    // 3. Modal hasn't been dismissed
    // 4. Modal is not already open
    if (!isAuthenticated && isProtectedRoute && !wasDismissed && !isOpen) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        open();
      }, 1000); // Show after 1 second

      return () => clearTimeout(timer);
    }
  }, [session, status, pathname, open, isOpen]);

  return null;
};
