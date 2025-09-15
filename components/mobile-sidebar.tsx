"use client";

import { usePathname } from "next/navigation";
import { Lesson1Sidebar } from "./lesson-1-sidebar";
import { Lesson2Sidebar } from "./lesson-2-sidebar";
import { Lesson3Sidebar } from "./lesson-3-sidebar";
import { Lesson4Sidebar } from "./lesson-4-sidebar";
import { Lesson5Sidebar } from "./lesson-5-sidebar";
import { Lesson6Sidebar } from "./lesson-6-sidebar";

export const MobileSidebar = () => {
  const pathname = usePathname();
  
  // Extract course and lesson IDs from URL
  const parts = pathname?.split('/') || [];
  const courseId = parts[2] || ''; // lesson-1, lesson-2, etc.
  const lessonId = parts[3] || '';

  // Determine which sidebar to show based on the lesson
  const isLesson1 = pathname?.includes('/lesson-1/');
  const isLesson2 = pathname?.includes('/lesson-2/');
  const isLesson3 = pathname?.includes('/lesson-3/');
  const isLesson4 = pathname?.includes('/lesson-4/');
  const isLesson5 = pathname?.includes('/lesson-5/');
  const isLesson6 = pathname?.includes('/lesson-6/');

  if (isLesson1) {
    return <Lesson1Sidebar courseId={courseId} lessonId={lessonId} />;
  }
  
  if (isLesson2) {
    return <Lesson2Sidebar courseId={courseId} lessonId={lessonId} />;
  }
  
  if (isLesson3) {
    return <Lesson3Sidebar courseId={courseId} lessonId={lessonId} />;
  }
  
  if (isLesson4) {
    return <Lesson4Sidebar courseId={courseId} lessonId={lessonId} />;
  }
  
  if (isLesson5) {
    return <Lesson5Sidebar courseId={courseId} lessonId={lessonId} />;
  }
  
  if (isLesson6) {
    return <Lesson6Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  return null;
};
