"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
  courseId: string;
  lessonId: string;
};

export const ChallengesSidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();

  // Extract step number from URL like /lesson/lesson-1/html-introduction
  let currentStep = 1;
  if (pathname.includes("/html-introduction") || pathname.includes("step-1")) {
    currentStep = 1;
  } else if (pathname.includes("/html-element") || pathname.includes("step-2")) {
    currentStep = 2;
  } else if (pathname.includes("/web-browsers") || pathname.includes("step-3")) {
    currentStep = 3;
  } else if (pathname.includes("/html-page-structure") || pathname.includes("step-4")) {
    currentStep = 4;
  } else if (pathname.includes("/html-history") || pathname.includes("step-5")) {
    currentStep = 5;
  } else if (pathname.includes("/html-forms") || pathname.includes("step-6")) {
    currentStep = 6;
  } else if (pathname.includes("/html-tables") || pathname.includes("step-7")) {
    currentStep = 7;
  } else if (pathname.includes("/html-lists") || pathname.includes("step-8")) {
    currentStep = 8;
  } else if (pathname.includes("/html-media") || pathname.includes("step-9")) {
    currentStep = 9;
  } else if (pathname.includes("/html-best-practices") || pathname.includes("step-10")) {
    currentStep = 10;
  } else if (pathname.includes("/wearegoood") || pathname.includes("step-11")) {
    currentStep = 11;
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
          <Link href="/lesson/lesson-1/html-introduction">
            HTML Introduction
          </Link>
        </Button>
        {/* Step 2 */}
        <Button
          variant={currentStep === 2 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/html-element">
            HTML Element
          </Link>
        </Button>
        {/* Step 3 */}
        <Button
          variant={currentStep === 3 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/web-browsers">
            Web Browsers
          </Link>
        </Button>
        {/* Step 4 */}
        <Button
          variant={currentStep === 4 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/html-page-structure">
            HTML Page Structure
          </Link>
        </Button>
        {/* Step 5 */}
        <Button
          variant={currentStep === 5 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/html-history">
            HTML History
          </Link>
        </Button>
        {/* Step 6 */}
        <Button
          variant={currentStep === 6 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/html-forms">
            HTML Forms
          </Link>
        </Button>
        {/* Step 7 */}
        <Button
          variant={currentStep === 7 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/html-tables">
            HTML Tables
          </Link>
        </Button>
        {/* Step 8 */}
        <Button
          variant={currentStep === 8 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/html-lists">
            HTML Lists
          </Link>
        </Button>
        {/* Step 9 */}
        <Button
          variant={currentStep === 9 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/html-media">
            HTML Media
          </Link>
        </Button>
        {/* Step 10 */}
        <Button
          variant={currentStep === 10 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/html-best-practices">
            HTML Best Practices
          </Link>
        </Button>
        {/* Step 11 */}
        <Button
          variant={currentStep === 11 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-1/wearegoood">
            We Are Good
          </Link>
        </Button>
      </div>
      <div className="p-4">
        {/* Guest Mode */}
      </div>
    </div>
  );
};
