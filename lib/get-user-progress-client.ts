"use client";

import { getLocalLessonProgress } from "./progress-storage";

// Client-side helper to merge localStorage progress with server progress
export function mergeUserProgressWithLocal(serverProgress: any, courseId?: string) {
  if (!serverProgress || !courseId) {
    return serverProgress;
  }

  // Get localStorage progress for the course
  const localProgress = getLocalLessonProgress(courseId);
  
  // Merge completed lessons from both sources
  const serverCompleted = serverProgress.completedLessons || [];
  const localCompleted = localProgress.completedLessons || [];
  
  // Combine and deduplicate
  const mergedCompleted = Array.from(new Set([...serverCompleted, ...localCompleted]));
  
  // Use higher points value
  const mergedPoints = Math.max(
    serverProgress.points || 0,
    localProgress.points || 0
  );

  return {
    ...serverProgress,
    completedLessons: mergedCompleted,
    points: mergedPoints,
  };
}
