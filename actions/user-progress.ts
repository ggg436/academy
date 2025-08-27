"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { adminDb } from "@/lib/firebase-admin";
import { adminAuth } from "@/lib/firebase-admin";

import { getCourseById } from "@/lib/data";
import { POINTS_TO_REFILL } from "@/constants";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";

// Simple server-side in-memory store (legacy demo only)
const userProgressServerStore: Record<string, any> = {};

// Helper to get Firebase user ID from cookies
async function getFirebaseUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('firebase-auth');
    if (authCookie?.value) {
      const authData = JSON.parse(authCookie.value);
      return authData.uid || null;
    }
  } catch {}
  return null;
}

export const getUserProgress = async () => {
  const userId = await getFirebaseUserId();

  // Return null instead of throwing error for unauthenticated users
  if (!userId) {
    return null;
  }

  // On the server, try Firestore Admin first for persistence
  if (typeof window === "undefined") {
    try {
      const snap = await adminDb.collection("userProgress").doc(userId).get();
      if (snap.exists) {
        return snap.data();
      }
    } catch {}
    // Fallback to in-memory (rare)
    return userProgressServerStore[userId] || null;
  }

  // On the client, fallback to localStorage
  return getLocalStorage(`user-progress-${userId}`, null);
};

export const upsertUserProgress = async (courseId: string) => {
  const userId = await getFirebaseUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const course = getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course is empty");
  }

  // Get real Firebase user data
  let userName = "User";
  let userImageSrc = "/mascot.svg";
  
  try {
    const userRecord = await adminAuth.getUser(userId);
    userName = userRecord.displayName || userRecord.email || "User";
    userImageSrc = userRecord.photoURL || "/mascot.svg";
  } catch (error) {
    console.warn("Could not fetch Firebase user data, using defaults:", error);
  }

  const newProgress = {
    userId,
    activeCourseId: courseId,
    userName,
    userImageSrc,
    hearts: 5,
    points: 0,
    streak: 0,
    updatedAt: Date.now(),
  };

  // Persist in Firestore (authoritative)
  try {
    await adminDb.collection("userProgress").doc(userId).set(newProgress, { merge: true });
  } catch {}
  // Keep legacy server memory for immediate SSR
  userProgressServerStore[userId] = newProgress;
  // Also attempt to persist on client if available (no-op on server)
  setLocalStorage(`user-progress-${userId}`, newProgress);

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async () => {
  const userId = await getFirebaseUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Get current
  let currentUserProgress = await getUserProgress();
  if (!currentUserProgress) {
    throw new Error("Progress not found");
  }

  if (currentUserProgress.hearts === 0) {
    return false;
  }

  const next = { ...currentUserProgress, hearts: currentUserProgress.hearts - 1, updatedAt: Date.now() };
  try {
    await adminDb.collection("userProgress").doc(userId).set(next, { merge: true });
  } catch {}
  setLocalStorage(`user-progress-${userId}`, next);

  revalidatePath("/learn");
  revalidatePath("/learn/lesson");
  revalidatePath("/shop");
  return true;
};

export const refillHearts = async () => {
  const userId = await getFirebaseUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("Progress not found");
  }

  if ((currentUserProgress.points || 0) < POINTS_TO_REFILL) {
    throw new Error("Not enough points");
  }

  const next = {
    ...currentUserProgress,
    hearts: 5,
    points: (currentUserProgress.points || 0) - POINTS_TO_REFILL,
    updatedAt: Date.now(),
  };
  try {
    await adminDb.collection("userProgress").doc(userId).set(next, { merge: true });
  } catch {}
  setLocalStorage(`user-progress-${userId}`, next);

  revalidatePath("/learn");
  revalidatePath("/learn/lesson");
  revalidatePath("/shop");
};

export const updatePoints = async (points: number) => {
  const userId = await getFirebaseUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("Progress not found");
  }

  const next = { ...currentUserProgress, points, updatedAt: Date.now() };
  try {
    await adminDb.collection("userProgress").doc(userId).set(next, { merge: true });
  } catch {}
  setLocalStorage(`user-progress-${userId}`, next);

  revalidatePath("/learn");
  revalidatePath("/learn/lesson");
  revalidatePath("/shop");
  revalidatePath("/quests");
};

export const updateStreak = async () => {
  const userId = await getFirebaseUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("Progress not found");
  }

  const next = { ...currentUserProgress, streak: (currentUserProgress.streak || 0) + 1, updatedAt: Date.now() };
  try {
    await adminDb.collection("userProgress").doc(userId).set(next, { merge: true });
  } catch {}
  setLocalStorage(`user-progress-${userId}`, next);

  revalidatePath("/learn");
  revalidatePath("/learn/lesson");
  revalidatePath("/shop");
  revalidatePath("/quests");
};

// Helper to get all user progress from localStorage (simulate for demo)
function getAllUserProgressClient() {
  if (typeof window === 'undefined') return [];
  const keys = Object.keys(localStorage).filter(k => k.startsWith('user-progress-'));
  return keys.map(k => JSON.parse(localStorage.getItem(k) || '{}'));
}

export const getTopTenUsers = async () => {
  // Use server store when on server; otherwise use client localStorage as a fallback
  const all = typeof window === 'undefined'
    ? Object.values(userProgressServerStore)
    : getAllUserProgressClient();

  return all
    .filter((u: any) => u && typeof u.points === 'number')
    .sort((a: any, b: any) => b.points - a.points)
    .slice(0, 10);
};

export const getAllUsersProgress = async () => {
  // Prefer Firestore Admin when on server
  if (typeof window === 'undefined') {
    try {
      const snapshot = await adminDb
        .collection('userProgress')
        .orderBy('points', 'desc')
        .get();
      return snapshot.docs.map((doc: any) => doc.data());
    } catch {
      // fallback to in-memory store if Firestore is unavailable
      return Object.values(userProgressServerStore).sort((a: any, b: any) => (b.points || 0) - (a.points || 0));
    }
  }
  // Client fallback
  return getAllUserProgressClient().sort((a: any, b: any) => (b.points || 0) - (a.points || 0));
};

// Debug function to test Firebase Admin connectivity
export const debugFirebaseAdmin = async () => {
  if (typeof window !== 'undefined') {
    return { error: "This function can only run on the server" };
  }

  try {
    console.log("Testing Firebase Admin connectivity...");
    
    // Test if we can access adminAuth
    if (!adminAuth) {
      return { error: "adminAuth is not available" };
    }
    
    // Test if we can list users
    const list = await adminAuth.listUsers(10);
    console.log(`Successfully listed ${list.users.length} users`);
    
    // Show first few users for debugging
    const sampleUsers = list.users.slice(0, 3).map(u => ({
      uid: u.uid,
      displayName: u.displayName,
      email: u.email,
      photoURL: u.photoURL,
    }));
    
    return {
      success: true,
      totalUsers: list.users.length,
      sampleUsers,
    };
  } catch (error) {
    console.error("Firebase Admin debug error:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    };
  }
};

export const updateUserProgressWithFirebaseData = async () => {
  const userId = await getFirebaseUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Get real Firebase user data
    const userRecord = await adminAuth.getUser(userId);
    const userName = userRecord.displayName || userRecord.email || "User";
    const userImageSrc = userRecord.photoURL || "/mascot.svg";

    // Update the user progress document with real user data
    await adminDb.collection("userProgress").doc(userId).update({
      userName,
      userImageSrc,
      updatedAt: Date.now(),
    });

    // Also update the server memory store
    if (userProgressServerStore[userId]) {
      userProgressServerStore[userId].userName = userName;
      userProgressServerStore[userId].userImageSrc = userImageSrc;
    }

    revalidatePath("/leaderboard");
    revalidatePath("/learn");
    
    return { success: true, userName, userImageSrc };
  } catch (error) {
    console.error("Failed to update user progress with Firebase data:", error);
    throw new Error("Failed to update user data");
  }
};

export const getAllRegisteredUsersWithProgress = async () => {
  if (typeof window !== 'undefined') {
    // Client should not attempt to list users; just return progress fallback
    console.log("Running on client, using progress fallback");
    return getAllUsersProgress();
  }

  try {
    console.log("=== STARTING FIREBASE ADMIN USER FETCH ===");
    
    // Test Firebase Admin connectivity first
    if (!adminAuth) {
      console.error("❌ adminAuth is not available");
      throw new Error("Firebase Admin Auth not available");
    }
    
    console.log("✅ adminAuth is available");
    
    // List registered users (paginated, here up to 1000)
    console.log("🔄 Calling adminAuth.listUsers(1000)...");
    
    let list: any;
    try {
      list = await adminAuth.listUsers(1000);
      console.log(`✅ Successfully fetched ${list.users.length} users from Firebase Auth`);
      
      if (list.users.length === 0) {
        console.warn("⚠️ No users found in Firebase Auth - this might indicate a configuration issue");
        throw new Error("No users found in Firebase Auth");
      }
      
      // Log detailed information about each user
      console.log("📋 User details from Firebase Auth:");
      list.users.forEach((user: any, index: number) => {
        console.log(`User ${index + 1}:`, {
          uid: user.uid,
          displayName: user.displayName || 'NOT SET',
          email: user.email || 'NOT SET',
          photoURL: user.photoURL || 'NOT SET',
          providerData: user.providerData?.map((p: any) => p.providerId) || []
        });
      });
      
    } catch (listError) {
      console.error("❌ Error calling adminAuth.listUsers:", listError);
      throw new Error(`Failed to list users: ${listError instanceof Error ? listError.message : 'Unknown error'}`);
    }
    
    // Always use real Firebase user data - never fall back to generic data
    const users = list.users.map((u: any) => ({
      userId: u.uid,
      userName: u.displayName || u.email || 'User',
      userImageSrc: u.photoURL || '/mascot.svg',
    }));

    console.log("🔄 Processed users with real data:", users.slice(0, 3));

    // Fetch all progress documents and index by userId
    console.log("🔄 Fetching user progress documents...");
    const snap = await adminDb.collection('userProgress').get();
    console.log(`✅ Found ${snap.docs.length} progress documents`);
    
    const progressById = new Map<string, any>();
    snap.forEach(doc => progressById.set(doc.id, doc.data()));

    // Merge users with progress; ALWAYS prioritize real Firebase user data
    const merged = users.map((u: any) => {
      const p = progressById.get(u.userId) || {};
      const finalUser = {
        userId: u.userId,
        // Always use real Firebase user name, never fall back to progress data
        userName: u.userName,
        // Always use real Firebase user image, never fall back to progress data
        userImageSrc: u.userImageSrc,
        points: typeof p.points === 'number' ? p.points : 0,
      };
      
      console.log(`Final user data for ${u.userId}:`, finalUser);
      return finalUser;
    });

    // Sort by points desc
    merged.sort((a: any, b: any) => (b.points || 0) - (a.points || 0));
    
    console.log("✅ Successfully fetched real user data for leaderboard:", merged.length, "users");
    console.log("📊 Final merged data sample:", merged.slice(0, 3));
    console.log("=== FIREBASE ADMIN USER FETCH COMPLETED ===");
    return merged;
    
  } catch (error) {
    console.error("❌ CRITICAL ERROR fetching real Firebase users:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : "Unknown"
    });
    
    // If we can't get real Firebase users, show an error instead of generic data
    console.error("💥 CRITICAL: Cannot fetch real Firebase users. Leaderboard will show error.");
    throw new Error(`Failed to fetch real user data: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};