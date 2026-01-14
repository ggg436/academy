"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FirebaseUserButton } from "@/components/firebase-user-button";
import { LanguageSelector } from "@/components/language-selector";
import { Logo } from "@/components/logo";

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
        return ["python-introduction", "python-history", "python-popularity", "python-applications", "python-first-program"];
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
    } else if (lessonId === "lesson-6" && courseId === "python") {
      return [
        "python-comments-intro",
        "python-single-line-comments",
        "python-multi-line-comments",
        "python-docstrings",
        "python-comments-practice",
        "python-comments-quiz",
      ];
    } else if (lessonId === "lesson-6" && courseId === "c") {
      return ["pointer-to-pointer", "array-of-pointers", "function-pointers", "advanced-examples"];
    } else if (lessonId === "lesson-7" && courseId === "c") {
      return ["c-data-types", "basic-data-types", "format-specifiers", "exercise"];
    } else if (lessonId === "lesson-8" && courseId === "c") {
      return ["c-constants", "const-keyword", "define-macros", "exercise"];
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
    } else if (lessonId === "lesson-6" && courseId === "python") {
      return [
        "What are Comments?",
        "Single-line Comments",
        "Multi-line Comments",
        "Docstrings",
        "Practice",
        "Quiz",
      ];
    } else if (lessonId === "lesson-6" && courseId === "c") {
      return ["Pointer to Pointer", "Array of Pointers", "Function Pointers", "Advanced Examples"];
    } else if (lessonId === "lesson-7" && courseId === "c") {
      return ["C Data Types", "Basic Data Types", "Format Specifiers", "Exercise"];
    } else if (lessonId === "lesson-8" && courseId === "c") {
      return ["C Constants", "const Keyword", "#define Macros", "Exercise"];
    } else {
      // For future lessons, use lesson title
      const baseLabel = lesson?.title || 'Step';
      return [`${baseLabel}`, `${baseLabel} Advanced`];
    }
  };

  const stepLabels = getStepLabels();

  return (
    <div className={cn(
      "hidden lg:flex h-full lg:w-[280px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-4">
          <Logo />
        </div>
      </Link>
      <div className="flex flex-col gap-y-3 flex-1 px-2">
        {stepNames.map((stepName, index) => (
          <Button
            key={stepName}
            variant={currentStep === index + 1 ? "sidebarOutline" : "sidebar"}
            className="justify-start h-[40px] w-full text-sm font-medium"
            asChild
          >
            <Link href={`/lesson/${lessonId}/${stepName}`}>
              {stepLabels[index]}
            </Link>
          </Button>
        ))}
      </div>
      <div className="px-6 pb-2"><LanguageSelector /></div>
      <div className="p-6 pt-2"><FirebaseUserButton /></div>
    </div>
  );
}; 
