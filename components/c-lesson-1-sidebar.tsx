"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FirebaseUserButton } from "@/components/firebase-user-button";
import { LanguageSelector } from "@/components/language-selector";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
  courseId: string;
  lessonId: string;
};

export const CLesson1Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  
  // Extract step number from URL like /lesson/lesson-1/c-introduction
  let currentStep = 1;
  if (pathname.includes("/c-tutorial")) {
    currentStep = 1;
  } else if (pathname.includes("/examples-in-each-chapter")) {
    currentStep = 2;
  } else if (pathname.includes("/c-exercises")) {
    currentStep = 3;
  } else if (pathname.includes("/c-quiz")) {
    currentStep = 4;
  } else if (pathname.includes("/c-reference")) {
    currentStep = 5;
  } else {
    currentStep = 1;
  }

  return (
    <div className={cn(
      "hidden lg:flex h-full lg:w-[280px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn" prefetch={false}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Softcode
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-3 flex-1 px-2">
        {/* Step 1 */}
        <Button
          variant={currentStep === 1 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/c-tutorial" prefetch={false}>
            C Tutorial
          </Link>
        </Button>
        {/* Step 2 */}
        <Button
          variant={currentStep === 2 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/examples-in-each-chapter" prefetch={false}>
            Examples in Each Chapter
          </Link>
        </Button>
        {/* Step 3 */}
        <Button
          variant={currentStep === 3 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/c-exercises" prefetch={false}>
            C Exercises
          </Link>
        </Button>
        {/* Step 4 */}
        <Button
          variant={currentStep === 4 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/c-quiz" prefetch={false}>
            C Quiz
          </Link>
        </Button>
        {/* Step 5 */}
        <Button
          variant={currentStep === 5 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/c-reference" prefetch={false}>
            C Reference
          </Link>
        </Button>
      </div>
      <div className="px-6 pb-2">
        <LanguageSelector />
      </div>
      <div className="p-6 pt-2">
        <FirebaseUserButton />
      </div>
    </div>
  );
}; 