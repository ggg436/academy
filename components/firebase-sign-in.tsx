"use client";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export function FirebaseSignIn() {
  const { user, loading, signIn } = useFirebaseAuth();

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (user) {
    return null; // User is already signed in
  }

  return (
    <Button 
      variant="default" 
      size="sm" 
      onClick={signIn}
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      Sign In with Google
    </Button>
  );
} 