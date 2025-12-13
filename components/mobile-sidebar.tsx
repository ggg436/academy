"use client";

import { usePathname } from "next/navigation";
import { Lesson1Sidebar } from "./lesson-1-sidebar";
import { Lesson2Sidebar } from "./lesson-2-sidebar";
import { Lesson3Sidebar } from "./lesson-3-sidebar";
import { Lesson4Sidebar } from "./lesson-4-sidebar";
import { Lesson5Sidebar } from "./lesson-5-sidebar";
import { Lesson6Sidebar } from "./lesson-6-sidebar";
import { PythonLesson7Sidebar } from "./python-lesson-7-sidebar";
import { PythonLesson8Sidebar } from "./python-lesson-8-sidebar";
import { PythonLesson9Sidebar } from "./python-lesson-9-sidebar";
import { PythonLesson10Sidebar } from "./python-lesson-10-sidebar";
import { PythonLesson11Sidebar } from "./python-lesson-11-sidebar";
import { PythonLesson12Sidebar } from "./python-lesson-12-sidebar";
import { PythonLesson13Sidebar } from "./python-lesson-13-sidebar";
import { PythonLesson14Sidebar } from "./python-lesson-14-sidebar";
import { PythonLesson15Sidebar } from "./python-lesson-15-sidebar";

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
  const isLesson15 = pathname?.includes('/lesson-15/');

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

  if (isLesson7) {
    return <PythonLesson7Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  if (isLesson8) {
    return <PythonLesson8Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  if (isLesson9) {
    return <PythonLesson9Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  if (isLesson10) {
    return <PythonLesson10Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  if (isLesson11) {
    return <PythonLesson11Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  if (isLesson12) {
    return <PythonLesson12Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  if (isLesson13) {
    return <PythonLesson13Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  if (isLesson14) {
    return <PythonLesson14Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  if (isLesson15) {
    return <PythonLesson15Sidebar courseId={courseId} lessonId={lessonId} />;
  }

  return null;
};
