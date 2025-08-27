"use client";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface FirebaseSignInProps {
  size?: "sm" | "lg";
}

export function FirebaseSignIn({ size = "lg" }: FirebaseSignInProps) {
  const { user, loading, signIn } = useFirebaseAuth();

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
      onClick={signIn}
      className={size === "lg" ? "w-full" : ""}
    >
      Sign In with Google
    </Button>
  );
} 