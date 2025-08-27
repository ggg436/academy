"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";

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

export const upsertChallengeProgress = async (challengeId: string, completed: boolean) => {
  const userId = await getFirebaseUserId();

  if (!userId) {
    throw new Error("Unauthorized"); 
  }

  const progress = {
    userId,
    challengeId,
    completed,
    createdAt: new Date().toISOString(),
  };

  const key = `challenge-progress-${userId}-${challengeId}`;
  setLocalStorage(key, progress);

  revalidatePath("/learn");
  revalidatePath("/learn/lesson");
  revalidatePath("/quests");
  
  return { success: true };
};

export const getChallengeProgress = async (challengeId: string) => {
  const userId = await getFirebaseUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const key = `${userId}-${challengeId}`;
  return getLocalStorage(key, null);
};
