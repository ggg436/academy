"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase-admin";

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

export type PartialProgressPayload = {
  courseId: string;
  lessonId: string;
  step: number;
  totalSteps: number;
};

export async function savePartialProgress(payload: PartialProgressPayload) {
  const userId = await getFirebaseUserId();
  if (!userId) throw new Error("Unauthorized");

  const ref = adminDb.collection("userProgress").doc(userId);
  await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.exists ? (snap.data() as any) : {};
    const completedLessons: string[] = data.completedLessons || [];
    const partials: Record<string, { step: number; totalSteps: number }> = data.partials || {};
    partials[payload.lessonId] = {
      step: payload.step,
      totalSteps: payload.totalSteps,
    };
    tx.set(ref, {
      courseId: payload.courseId,
      completedLessons,
      partials,
      updatedAt: Date.now(),
    }, { merge: true });
  });

  revalidatePath("/learn");
}

export async function saveLessonCompleteServer(courseId: string, lessonId: string, pointsDelta: number) {
  const userId = await getFirebaseUserId();
  if (!userId) throw new Error("Unauthorized");

  const ref = adminDb.collection("userProgress").doc(userId);
  await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.exists ? (snap.data() as any) : {};
    const completedLessons: string[] = data.completedLessons || [];
    if (!completedLessons.includes(lessonId)) completedLessons.push(lessonId);
    const nextPoints = (data.points || 0) + pointsDelta;
    // clear partial for this lesson on completion
    const partials: Record<string, any> = data.partials || {};
    delete partials[lessonId];
    tx.set(ref, {
      courseId,
      completedLessons,
      points: nextPoints,
      partials,
      updatedAt: Date.now(),
    }, { merge: true });
  });

  revalidatePath("/learn");
} 