"use client";

import { usePathname } from "next/navigation";
import { Lesson1Sidebar } from "./lesson-1-sidebar";

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
  const isLesson7 = pathname?.includes('/lesson-7/');
  const isLesson8 = pathname?.includes('/lesson-8/');
  const isLesson9 = pathname?.includes('/lesson-9/');
  const isLesson10 = pathname?.includes('/lesson-10/');
  const isLesson11 = pathname?.includes('/lesson-11/');
  const isLesson12 = pathname?.includes('/lesson-12/');
  const isLesson13 = pathname?.includes('/lesson-13/');
  const isLesson14 = pathname?.includes('/lesson-14/');

  if (isLesson1) {
    return <Lesson1Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  return null;
};
