"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FirebaseUserButton } from "@/components/firebase-user-button";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getCourseById } from "@/lib/data";

type Props = {
  className?: string;
  courseId: string;
  lessonId: string;
};

export const DynamicLessonSidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  
  // Get lesson data to determine steps
  const course = getCourseById(courseId);
  const lesson = course
    ? course.units.flatMap((u: any) => u.lessons || []).find((l: any) => l.id === lessonId)
    : undefined;
  
  // Generate step names based on lesson
  const getStepNames = () => {
    if (lessonId === "lesson-1") {
      if (courseId === "python") {
        return ["python-introduction", "python-basics"];
      } else if (courseId === "c") {
        return ["c-tutorial", "examples-in-each-chapter", "c-exercises", "c-quiz", "c-reference"];
      } else {
        return ["html-introduction", "html-element", "web-browsers", "html-page-structure", "html-history", "html-forms", "html-tables", "html-lists", "html-media", "html-best-practices"];
      }
    } else if (lessonId === "lesson-2") {
      if (courseId === "c") {
        return ["pointers-tutorial", "examples-in-each-chapter", "pointers-exercises", "pointers-quiz", "pointers-reference"];
      }
      return ["hi", "hlo"];
    } else if (lessonId === "lesson-3") {
      return ["we", "gue"];
    } else if (lessonId === "lesson-4") {
      return ["html-attributes", "html-attributes-advanced"];
    } else if (lessonId === "lesson-5") {
      return ["html-structure", "html-structure-advanced"];
    } else {
      // For future lessons, generate step names based on lesson title
      const baseName = lesson?.title?.toLowerCase().replace(/\s+/g, '-') || 'step';
      return [`${baseName}`, `${baseName}-advanced`];
    }
  };

  const stepNames = getStepNames();
  
  // Determine current step based on URL
  let currentStep = 1;
  for (let i = 0; i < stepNames.length; i++) {
    if (pathname.includes(`/${stepNames[i]}`)) {
      currentStep = i + 1;
      break;
    }
  }

  // Generate step labels
  const getStepLabels = () => {
    if (lessonId === "lesson-1") {
      if (courseId === "c") {
        return ["C Tutorial", "Examples in Each Chapter", "C Exercises", "C Quiz", "C Reference"];
      }
      return ["HTML Introduction", "HTML Element", "Web Browsers", "HTML Page Structure", "HTML History", "HTML Forms", "HTML Tables", "HTML Lists", "HTML Media", "Best Practices"];
    } else if (lessonId === "lesson-2") {
      if (courseId === "c") {
        return ["Pointers Tutorial", "Examples in Each Chapter", "Pointers Exercises", "Pointers Quiz", "Pointers Reference"];
      }
      return ["hi", "hlo"];
    } else if (lessonId === "lesson-3") {
      return ["we", "gue"];
    } else if (lessonId === "lesson-4") {
      return ["HTML Attributes", "Advanced Attributes"];
    } else if (lessonId === "lesson-5") {
      return ["HTML Structure", "Advanced Structure"];
    } else {
      // For future lessons, use lesson title
      const baseLabel = lesson?.title || 'Step';
      return [`${baseLabel}`, `${baseLabel} Advanced`];
    }
  };

  const stepLabels = getStepLabels();

  return (
    <div className={cn(
      "hidden lg:flex h-full lg:w-[200px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Softcode
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        {stepNames.map((stepName, index) => (
          <Button
            key={stepName}
            variant={currentStep === index + 1 ? "sidebarOutline" : "sidebar"}
            className="justify-start h-[32px] w-full text-xs"
            asChild
          >
            <Link href={`/lesson/${lessonId}/${stepName}`}>
              {stepLabels[index]}
            </Link>
          </Button>
        ))}
      </div>
      <div className="p-4">
        <FirebaseUserButton />
      </div>
    </div>
  );
}; 