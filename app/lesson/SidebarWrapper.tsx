"use client";
import { usePathname } from "next/navigation";
import { ChallengesSidebar } from "@/components/challenges-sidebar";
import { Lesson1Sidebar } from "@/components/lesson-1-sidebar";
import { Lesson2Sidebar } from "@/components/lesson-2-sidebar";
import { Lesson3Sidebar } from "@/components/lesson-3-sidebar";
import { Lesson4Sidebar } from "@/components/lesson-4-sidebar";
import { Lesson5Sidebar } from "@/components/lesson-5-sidebar";
import { DynamicLessonSidebar } from "@/components/dynamic-lesson-sidebar";

export function SidebarWrapper({ courseId }: { courseId: string }) {
  const pathname = usePathname();
  let lessonId = "";
  const match = pathname.match(/lesson\/(lesson-\d+)/);
  if (match) {
    lessonId = match[1];
  }
  
  // Use different sidebar based on lesson ID
  if (lessonId === "lesson-1") {
    return <Lesson1Sidebar courseId={courseId} lessonId={lessonId} />;
  } else if (lessonId === "lesson-2") {
    return <Lesson2Sidebar courseId={courseId} lessonId={lessonId} />;
  } else if (lessonId === "lesson-3") {
    return <Lesson3Sidebar courseId={courseId} lessonId={lessonId} />;
  } else if (lessonId === "lesson-4") {
    return <Lesson4Sidebar courseId={courseId} lessonId={lessonId} />;
  } else if (lessonId === "lesson-5") {
    return <Lesson5Sidebar courseId={courseId} lessonId={lessonId} />;
  } else if (lessonId && lessonId.startsWith("lesson-")) {
    // For any future lessons, use the dynamic sidebar
    return <DynamicLessonSidebar courseId={courseId} lessonId={lessonId} />;
  }
  
  return <ChallengesSidebar courseId={courseId} lessonId={lessonId} />;
}
