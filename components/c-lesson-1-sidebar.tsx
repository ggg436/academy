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

  // Map active step from URL
  let currentStep = 1;
  if (pathname.includes("/c-tutorial") || pathname.includes("/c-introduction") || pathname.includes("/what-is-c")) currentStep = 1;
  else if (pathname.includes("/examples-in-each-chapter") || pathname.includes("/history")) currentStep = 2;
  else if (pathname.includes("/c-exercises") || pathname.includes("/why-learn-c")) currentStep = 3;
  else if (pathname.includes("/c-quiz") || pathname.includes("/quiz")) currentStep = 4;
  else if (pathname.includes("/c-reference") || pathname.includes("/c-reference") || pathname.includes("/first-program")) currentStep = 5;

  return (
    <div className={cn(
      "hidden lg:flex h-full lg:w-[280px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn" prefetch={false}>
        <div className="pt-8 pb-7 flex items-center gap-x-3 -ml-2">
          <h1 className="text-3xl font-extrabold text-green-600 tracking-wide whitespace-nowrap">Gharti Academy</h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-3 flex-1 px-2">
        {/* Step 1 */}
        <Button variant={currentStep === 1 ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-1/c-tutorial" prefetch={false}>What is C?</Link>
        </Button>
        {/* Step 2 */}
        <Button variant={currentStep === 2 ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-1/examples-in-each-chapter" prefetch={false}>History</Link>
        </Button>
        {/* Step 3 */}
        <Button variant={currentStep === 3 ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-1/c-exercises" prefetch={false}>Why Learn C?</Link>
        </Button>
        {/* Step 4 */}
        <Button variant={currentStep === 4 ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-1/c-quiz" prefetch={false}>Quiz</Link>
        </Button>
        {/* Step 5 */}
        <Button variant={currentStep === 5 ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-1/c-reference" prefetch={false}>First Program & Practice</Link>
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
