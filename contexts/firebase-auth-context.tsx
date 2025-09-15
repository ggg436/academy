"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { 
  getFirebaseAuth, 
  signInWithGoogle, 
  signInWithEmail,
  signUpWithEmail,
  signInAnonymouslyUser,
  signOutUser 
} from "@/lib/firebase-client";

interface FirebaseAuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType | undefined>(undefined);

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      setLoading(false);
      setInitialized(true);
      return;
    }

    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      setInitialized(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setInitialized(true);
      
      // Sync user data with cookies for server-side access
      if (user) {
        document.cookie = `firebase-auth=${JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous
        })}; path=/; max-age=3600; secure; samesite=strict`;
      } else {
        document.cookie = 'firebase-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  const handleSignInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      console.error("Email sign-in error:", error);
      throw error;
    }
  };

  const handleSignUpWithEmail = async (email: string, password: string, displayName?: string) => {
    try {
      await signUpWithEmail(email, password, displayName);
    } catch (error) {
      console.error("Email sign-up error:", error);
      throw error;
    }
  };

  const handleSignInAnonymously = async () => {
    try {
      await signInAnonymouslyUser();
    } catch (error) {
      console.error("Anonymous sign-in error:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const value = {
    user,
    loading: loading || !initialized,
    signInWithGoogle: handleSignInWithGoogle,
    signInWithEmail: handleSignInWithEmail,
    signUpWithEmail: handleSignUpWithEmail,
    signInAnonymously: handleSignInAnonymously,
    signOut: handleSignOut,
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error("useFirebaseAuth must be used within a FirebaseAuthProvider");
  }
  return context;
}
