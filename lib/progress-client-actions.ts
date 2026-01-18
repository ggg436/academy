"use client";

import { saveLessonCompleteServer } from "@/actions/progress";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { saveLocalLessonComplete, saveLocalChallengeProgress } from "./progress-storage";

const GUEST_ID = "guest";

// Client-side wrapper that saves to both server (if authenticated) and localStorage (for guests)
export async function saveLessonCompleteWithLocal(
  courseId: string,
  lessonId: string,
  pointsDelta: number = 10
) {
  // Always save to localStorage first (works for both guests and authenticated users)
  saveLocalLessonComplete(courseId, lessonId, pointsDelta);

  // Also try to save to server (will handle guest case internally)
  try {
    await saveLessonCompleteServer(courseId, lessonId, pointsDelta);
  } catch (error) {
    console.error("Server save failed, but local save succeeded:", error);
  }
}

// Client-side wrapper for challenge progress
export async function saveChallengeProgressWithLocal(
  challengeId: string,
  completed: boolean
) {
  // Always save to localStorage
  saveLocalChallengeProgress(GUEST_ID, challengeId, completed);

  // Also try to save to server
  try {
    await upsertChallengeProgress(challengeId, completed);
  } catch (error) {
    console.error("Server save failed, but local save succeeded:", error);
  }
}
