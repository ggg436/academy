export function getTotalStepsForLesson(lessonId: string): number {
  // Known step counts for current curriculum
  if (lessonId === "lesson-1") return 10; // HTML lesson 1
  // Python Lesson 1 overrides handled in page component; default counts remain here
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
        "python-introduction": 1,
        "python-history": 2,
        "python-popularity": 3,
        "python-applications": 4,
        "python-first-program": 5,
        "python-problems": 6,
        "python-quiz": 7,
        "c-introduction": 1,
        "c-fundamentals": 2,
      };
      return { lessonId, step: map[stepId] || 1 };
    }
    return { lessonId, step: 1 };
  }
  return { lessonId: null, step: 0 };
} 