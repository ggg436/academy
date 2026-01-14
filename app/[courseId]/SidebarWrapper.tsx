"use client";
import { usePathname } from "next/navigation";
import { ChallengesSidebar } from "@/components/challenges-sidebar";
import { Lesson1Sidebar } from "@/components/lesson-1-sidebar";
import { PythonLesson1Sidebar } from "@/components/python-lesson-1-sidebar";
import { PythonLesson2Sidebar } from "@/components/python-lesson-2-sidebar";
import { CLesson1Sidebar } from "@/components/c-lesson-1-sidebar";
import { DynamicLessonSidebar } from "@/components/dynamic-lesson-sidebar";

export function SidebarWrapper({ courseId }: { courseId: string }) {
  const pathname = usePathname();
  let lessonId = "";
  // Match /[courseId]/[lessonId]/... pattern
  const match = pathname.match(/\/[^/]+\/(lesson-\d+)/);
  if (match) {
    lessonId = match[1];
  }

  // Use different sidebar based on lesson ID and course
  if (lessonId === "lesson-1") {
    // Check if this is Python course
    if (courseId === "python") {
      return <PythonLesson1Sidebar courseId={courseId} lessonId={lessonId} />;
    }
    // Check if this is C course
    if (courseId === "c") {
      return <CLesson1Sidebar courseId={courseId} lessonId={lessonId} />;
    }
    return <Lesson1Sidebar courseId={courseId} lessonId={lessonId} />;
  } else if (lessonId === "lesson-2") {
    if (courseId === "python") {
      return <PythonLesson2Sidebar courseId={courseId} lessonId={lessonId} />;
    }
    return <DynamicLessonSidebar courseId={courseId} lessonId={lessonId} />;
  } else if (lessonId && lessonId.startsWith("lesson-")) {
    // For any future lessons, use the dynamic sidebar
    return <DynamicLessonSidebar courseId={courseId} lessonId={lessonId} />;
  }

  return <ChallengesSidebar courseId={courseId} lessonId={lessonId} />;
}


