export function getTotalStepsForLesson(lessonId: string): number {
  // Known step counts for current curriculum
  if (lessonId === "lesson-1") return 10;
  if (lessonId === "lesson-2") return 2;
  if (lessonId === "lesson-3") return 2;
  if (lessonId === "lesson-4") return 2;
  if (lessonId === "lesson-5") return 2;
  return 1;
}

export function getCurrentLessonAndStepFromPath(pathname: string): { lessonId: string | null; step: number } {
  // Expect /lesson/<lessonId>/<stepId>
  const parts = pathname.split("/").filter(Boolean);
  const lessonIdx = parts.indexOf("lesson");
  if (lessonIdx !== -1 && parts.length >= lessonIdx + 3) {
    const lessonId = parts[lessonIdx + 1];
    const stepId = parts[lessonIdx + 2];
    // Map to step numbers similar to server logic for known lessons
    if (lessonId === "lesson-1") {
      const map: Record<string, number> = {
        "html-introduction": 1,
        "html-element": 2,
        "web-browsers": 3,
        "html-page-structure": 4,
        "html-history": 5,
        "html-forms": 6,
        "html-tables": 7,
        "html-lists": 8,
        "html-media": 9,
        "html-best-practices": 10,
      };
      return { lessonId, step: map[stepId] || 1 };
    }
    if (lessonId === "lesson-2") {
      const map: Record<string, number> = { hi: 1, hlo: 2 };
      return { lessonId, step: map[stepId] || 1 };
    }
    if (lessonId === "lesson-3") {
      const map: Record<string, number> = { we: 1, gue: 2 };
      return { lessonId, step: map[stepId] || 1 };
    }
    if (lessonId === "lesson-4") {
      const map: Record<string, number> = { "html-attributes": 1, "html-attributes-advanced": 2 };
      return { lessonId, step: map[stepId] || 1 };
    }
    if (lessonId === "lesson-5") {
      const map: Record<string, number> = { "html-structure": 1, "html-structure-advanced": 2 };
      return { lessonId, step: map[stepId] || 1 };
    }
    return { lessonId, step: 1 };
  }
  return { lessonId: null, step: 0 };
} 