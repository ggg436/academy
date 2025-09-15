"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FirebaseUserButton } from "@/components/firebase-user-button";

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
  } else if (pathname.includes("/python-basics") || pathname.includes("step-2")) {
    currentStep = 2;
  } else {
    // Default to step 1 for any unrecognized URLs
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
          <Link href="/lesson/lesson-1/python-introduction" prefetch={false}>
            Python Introduction
          </Link>
        </Button>
        {/* Step 2 */}
        <Button
          variant={currentStep === 2 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/python-basics" prefetch={false}>
            Python Basics
          </Link>
        </Button>
      </div>
      <div className="p-6">
        <FirebaseUserButton />
      </div>
    </div>
  );
}; 