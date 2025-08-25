"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { ChallengesSidebar } from "./challenges-sidebar";
import { PythonSidebar } from "./python-sidebar";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const isLessonPage = pathname?.startsWith('/lesson');
  const isPythonLesson = pathname?.includes('/python/');
  
  // Extract courseId and lessonId from pathname for lesson pages
  const getLessonParams = () => {
    if (!pathname) return { courseId: '', lessonId: '' };
    
    const parts = pathname.split('/');
    if (parts.length >= 3) {
      return {
        courseId: parts[2] || '', // lesson-1, lesson-2, python, etc.
        lessonId: parts[3] || ''  // weare, html-basics, lesson-1, etc.
      };
    }
    return { courseId: '', lessonId: '' };
  };

  const { courseId, lessonId } = getLessonParams();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="left">
        {isLessonPage ? (
          isPythonLesson ? (
            <PythonSidebar courseId={courseId} lessonId={lessonId} />
          ) : (
            <ChallengesSidebar courseId={courseId} lessonId={lessonId} />
          )
        ) : (
          <Sidebar />
        )}
      </SheetContent>
    </Sheet>
  );
};
