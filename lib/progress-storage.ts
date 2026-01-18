"use client";

import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";

export type CourseProgress = {
  courseId: string;
  completedLessons: string[];
  points: number;
  updatedAt: number;
};

export type ChallengeProgressStorage = {
  userId: string;
  challengeId: string;
  completed: boolean;
  createdAt: string;
};

const lessonProgressKey = (courseId: string) => `course-progress-${courseId}`;
const challengeProgressKey = (userId: string, challengeId: string) => `challenge-progress-${userId}-${challengeId}`;

// Lesson Progress LocalStorage Helpers
export function getLocalLessonProgress(courseId: string): CourseProgress {
  return getLocalStorage(lessonProgressKey(courseId), {
    courseId,
    completedLessons: [],
    points: 0,
    updatedAt: Date.now(),
  });
}

export function saveLocalLessonComplete(
  courseId: string,
  lessonId: string,
  pointsDelta: number = 10
): CourseProgress {
  const local = getLocalLessonProgress(courseId);

  if (!local.completedLessons.includes(lessonId)) {
    local.completedLessons.push(lessonId);
  }
  local.points = Math.max(0, (local.points || 0) + pointsDelta);
  local.updatedAt = Date.now();
  setLocalStorage(lessonProgressKey(courseId), local);
  
  return local;
}

// Challenge Progress LocalStorage Helpers
export function getLocalChallengeProgress(userId: string, challengeId: string): ChallengeProgressStorage | null {
  const key = challengeProgressKey(userId, challengeId);
  return getLocalStorage(key, null);
}

export function saveLocalChallengeProgress(
  userId: string,
  challengeId: string,
  completed: boolean
): void {
  const key = challengeProgressKey(userId, challengeId);
  const progress: ChallengeProgressStorage = {
    userId,
    challengeId,
    completed,
    createdAt: new Date().toISOString(),
  };
  setLocalStorage(key, progress);
}
