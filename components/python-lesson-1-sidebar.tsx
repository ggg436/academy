"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FirebaseUserButton } from "@/components/firebase-user-button";
import { Logo } from "@/components/logo";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
  courseId: string;
  lessonId: string;
};

export const PythonLesson1Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();

  // Extract step number from URL like /lesson/lesson-1/python-introduction
  let currentStep = 1;
  if (pathname.includes("/python-introduction") || pathname.includes("step-1")) {
    currentStep = 1;
  } else if (pathname.includes("/python-history") || pathname.includes("step-2")) {
    currentStep = 2;
  } else if (pathname.includes("/python-popularity") || pathname.includes("step-3")) {
    currentStep = 3;
  } else if (pathname.includes("/python-applications") || pathname.includes("step-4")) {
    currentStep = 4;
  } else if (pathname.includes("/python-first-program") || pathname.includes("step-5")) {
    currentStep = 5;
  } else if (pathname.includes("/python-problems") || pathname.includes("step-6")) {
    currentStep = 6;
  } else if (pathname.includes("/python-quiz") || pathname.includes("step-7")) {
    currentStep = 7;
  } else {
    // Default to step 1 for any unrecognized URLs
    currentStep = 1;
  }

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
        {/* Step 1 */}
        <Button
          variant={currentStep === 1 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href={`/${courseId}/lesson-1/python-introduction`} prefetch={false}>
            Python Introduction
          </Link>
        </Button>
        {/* Step 2 */}
        <Button
          variant={currentStep === 2 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href={`/${courseId}/lesson-1/python-history`} prefetch={false}>
            Python History
          </Link>
        </Button>
        {/* Step 3 */}
        <Button
          variant={currentStep === 3 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href={`/${courseId}/lesson-1/python-popularity`} prefetch={false}>
            Python Popularity
          </Link>
        </Button>
        {/* Step 4 */}
        <Button
          variant={currentStep === 4 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href={`/${courseId}/lesson-1/python-applications`} prefetch={false}>
            Python Applications
          </Link>
        </Button>
        {/* Step 5 */}
        <Button
          variant={currentStep === 5 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href={`/${courseId}/lesson-1/python-first-program`} prefetch={false}>
            First Program
          </Link>
        </Button>
        {/* Step 6 */}
        <Button
          variant={currentStep === 6 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href={`/${courseId}/lesson-1/python-problems`} prefetch={false}>
            Problems
          </Link>
        </Button>
        {/* Step 7 */}
        <Button
          variant={currentStep === 7 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href={`/${courseId}/lesson-1/python-quiz`} prefetch={false}>
            Quiz
          </Link>
        </Button>
      </div>
      <div className="p-6">
        <FirebaseUserButton />
      </div>
    </div>
  );
}; 
