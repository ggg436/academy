import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth, Auth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaoxkTKghZiNxxVzPuk7dPezYG6j50i8E",
  authDomain: "softcode-253e8.firebaseapp.com",
  projectId: "softcode-253e8",
  storageBucket: "softcode-253e8.firebasestorage.app",
  messagingSenderId: "977432396068",
  appId: "1:977432396068:web:c5c235340cb445b6dc33b1",
  measurementId: "G-6QP3VMBXD8",
};

export function getFirebaseApp() {
  if (typeof window === "undefined") {
    // Avoid initializing on the server
    return null as unknown as ReturnType<typeof initializeApp>;
  }
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseAuth(): Auth | null {
  if (typeof window === "undefined") return null;
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

export async function signInWithGoogle(): Promise<User | null> {
  try {
    const auth = getFirebaseAuth();
    if (!auth) return null;

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    return null;
  }
}

export async function signOutUser(): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    if (auth) {
      await signOut(auth);
    }
  } catch (error) {
    console.error("Sign-out error:", error);
  }
}

export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  const app = getFirebaseApp();
  try {
    if (await isSupported()) {
      return getAnalytics(app);
    }
  } catch {
    // Ignore analytics errors in unsupported environments (e.g., SSR, private mode)
  }
  return null;
} 