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

export const Lesson5Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  
  // Extract step number from URL like /lesson/lesson-5/html-structure
  let currentStep = 1;
  if (pathname.includes("/html-structure-advanced") || pathname.includes("step-2")) {
    currentStep = 2;
  } else if (pathname.includes("/html-structure") || pathname.includes("step-1")) {
    currentStep = 1;
  } else {
    // Default to step 1 for any unrecognized URLs
    currentStep = 1;
  }

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
        {/* Step 1 */}
        <Button
          variant={currentStep === 1 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[32px] w-full text-xs"
          asChild
        >
          <Link href="/lesson/lesson-5/html-structure">
            HTML Structure
          </Link>
        </Button>
        {/* Step 2 */}
        <Button
          variant={currentStep === 2 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[32px] w-full text-xs"
          asChild
        >
          <Link href="/lesson/lesson-5/html-structure-advanced">
            Advanced Structure
          </Link>
        </Button>
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