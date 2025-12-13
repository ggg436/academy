"use client";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useAuthModal } from "@/store/use-auth-modal";

interface GetStartedButtonProps {
  size?: "sm" | "lg";
}

export function GetStartedButton({ size = "lg" }: GetStartedButtonProps) {
  const { user, loading } = useFirebaseAuth();
  const { open } = useAuthModal();

  if (loading) {
    return (
      <Button variant="ghost" size={size} disabled className={size === "lg" ? "w-full" : ""}>
        <Loader className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (user) {
    return null; // User is already signed in
  }

  return (
    <Button 
      size={size} 
      variant="secondary" 
      onClick={() => open("signup")}
      className={size === "lg" ? "w-full" : ""}
    >
      Get Started
    </Button>
  );
}
