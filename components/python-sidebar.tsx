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

type Props = {
  className?: string;
  courseId: string;
  lessonId: string;
};

export const PythonSidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  
  // Extract step number from URL like /lesson/python/lesson-1/introduction
  let currentStep = 1;
  if (pathname.includes("/introduction") || pathname.includes("step-1")) {
    currentStep = 1;
  } else if (pathname.includes("/setup") || pathname.includes("step-2")) {
    currentStep = 2;
  } else if (pathname.includes("/first-program") || pathname.includes("step-3")) {
    currentStep = 3;
  } else if (pathname.includes("/syntax") || pathname.includes("step-4")) {
    currentStep = 4;
  } else if (pathname.includes("/basics") || pathname.includes("step-5")) {
    currentStep = 5;
  } else {
    // Default to step 1 for any unrecognized URLs
    currentStep = 1;
  }

  return (
    <div className={cn(
      "flex h-full lg:w-[280px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/python.svg" height={40} width={40} alt="Python" />
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
            Python
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
          <Link href="/lesson/python/lesson-1/introduction">
            1. What is Python?
          </Link>
        </Button>
        {/* Step 2 */}
        <Button
          variant={currentStep === 2 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/python/lesson-1/setup">
            2. Setting Up Python
          </Link>
        </Button>
        {/* Step 3 */}
        <Button
          variant={currentStep === 3 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/python/lesson-1/first-program">
            3. Your First Program
          </Link>
        </Button>
        {/* Step 4 */}
        <Button
          variant={currentStep === 4 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/python/lesson-1/syntax">
            4. Python Syntax
          </Link>
        </Button>
        {/* Step 5 */}
        <Button
          variant={currentStep === 5 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/python/lesson-1/basics">
            5. Python Basics
          </Link>
        </Button>
      </div>
      <div className="p-6">
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