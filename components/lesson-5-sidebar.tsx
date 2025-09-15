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

export const Lesson5Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  
  if (courseId === "c") {
    const is = (slug: string) => pathname.includes(`/lesson/lesson-5/${slug}`);
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
          <Button variant={is("c-comments") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/c-comments" prefetch={false}>Comments in C</Link>
          </Button>
          <Button variant={is("single-line-comments") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/single-line-comments" prefetch={false}>Single-line Comments</Link>
          </Button>
          <Button variant={is("multi-line-comments") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/multi-line-comments" prefetch={false}>Multi-line Comments</Link>
          </Button>
          <Button variant={is("single-or-multi-line") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/single-or-multi-line" prefetch={false}>Single or Multi-line?</Link>
          </Button>
        </div>
        <div className="px-6 pb-2"><LanguageSelector /></div>
        <div className="p-6 pt-2"><FirebaseUserButton /></div>
      </div>
    );
  }
  
  // Default non-C behavior
  
  // Extract step number from URL like /lesson/lesson-5/html-structure
  let currentStep = 1;
  if (pathname.includes("/html-structure") || pathname.includes("step-1")) {
    currentStep = 1;
  } else if (pathname.includes("/html-structure-advanced") || pathname.includes("step-2")) {
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
          <Link href="/lesson/lesson-5/html-structure" prefetch={false}>
            HTML Structure
          </Link>
        </Button>
        {/* Step 2 */}
        <Button
          variant={currentStep === 2 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-5/html-structure-advanced" prefetch={false}>
            Advanced Structure
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
