"use client";

import { getFirebaseApp } from "@/lib/firebase-client";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";

export type CourseProgress = {
  courseId: string;
  completedLessons: string[];
  points: number;
  updatedAt: number;
};

const localKey = (courseId: string) => `course-progress-${courseId}`;

export async function saveLessonComplete(
  courseId: string,
  lessonId: string,
  pointsDelta: number = 10
) {
  // Local save
  const local: CourseProgress =
    getLocalStorage(localKey(courseId), {
      courseId,
      completedLessons: [],
      points: 0,
      updatedAt: Date.now(),
    }) || {
      courseId,
      completedLessons: [],
      points: 0,
      updatedAt: Date.now(),
    };

  if (!local.completedLessons.includes(lessonId)) {
    local.completedLessons.push(lessonId);
  }
  local.points = Math.max(0, (local.points || 0) + pointsDelta);
  local.updatedAt = Date.now();
  setLocalStorage(localKey(courseId), local);

  // Firestore (best-effort)
  try {
    const app = getFirebaseApp();
    if (!app) return;
    const db = getFirestore(app);
    // Note: This function is called outside of React context, so we can't use useFirebaseAuth here
    // The uid will be passed from the calling component or we'll need to restructure this
    const uid = null; // TODO: Pass uid as parameter or restructure
    if (!uid) return;

    const ref = doc(db, "userProgress", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        courseId,
        completedLessons: [lessonId],
        points: pointsDelta,
        updatedAt: Date.now(),
      });
    } else {
      await updateDoc(ref, {
        courseId,
        completedLessons: arrayUnion(lessonId),
        points: increment(pointsDelta),
        updatedAt: Date.now(),
      } as any);
    }
  } catch (e) {
    // ignore client firestore errors (offline, permissions, etc.)
    console.warn("Progress save failed (non-fatal)", e);
  }
} 