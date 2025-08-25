"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

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
  const lesson = course?.units[0]?.lessons.find((l: any) => l.id === lessonId);
  
  // Generate step names based on lesson
  const getStepNames = () => {
    if (lessonId === "lesson-1") {
      return ["html-introduction", "html-element", "web-browsers", "html-page-structure", "html-history", "html-forms", "html-tables", "html-lists", "html-media", "html-best-practices"];
    } else if (lessonId === "lesson-2") {
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
      return ["HTML Introduction", "HTML Element", "Web Browsers", "HTML Page Structure", "HTML History", "HTML Forms", "HTML Tables", "HTML Lists", "HTML Media", "Best Practices"];
    } else if (lessonId === "lesson-2") {
      return ["1. hi", "2. hlo"];
    } else if (lessonId === "lesson-3") {
      return ["1. we", "2. gue"];
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
      "flex h-full lg:w-[200px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Lingo
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
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
}; 