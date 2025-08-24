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

export const ChallengesSidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  
  // Extract step number from URL like /lesson/lesson-1/step-2
  let currentStep = 1;
  const stepMatch = pathname.match(/\/step-(\d+)/);
  if (stepMatch) {
    currentStep = parseInt(stepMatch[1]);
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
          className="justify-start h-[52px] w-full"
          asChild
        >
          <Link href={courseId === "spanish" ? "/lesson/lesson-1/step-1" : "/lesson/np-lesson-1/step-1"}>
            <Image
              src="/learn.svg"
              alt="Step 1"
              className="mr-5"
              height={32}
              width={32}
            />
            Step 1: {courseId === "spanish" ? "HTML Introduction" : "Python Introduction"}
          </Link>
        </Button>
        {/* Step 2 */}
        <Button
          variant={currentStep === 2 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[52px] w-full"
          asChild
        >
          <Link href={courseId === "spanish" ? "/lesson/lesson-1/step-2" : "/lesson/np-lesson-1/step-2"}>
            <Image
              src="/quests.svg"
              alt="Step 2"
              className="mr-5"
              height={32}
              width={32}
            />
            Step 2: {courseId === "spanish" ? "HTML Basics" : "Python Basics"}
          </Link>
        </Button>
        {/* Step 3 */}
        <Button
          variant={currentStep === 3 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[52px] w-full"
          asChild
        >
          <Link href={courseId === "spanish" ? "/lesson/lesson-1/step-3" : "/lesson/np-lesson-1/step-3"}>
            <Image
              src="/shop.svg"
              alt="Step 3"
              className="mr-5"
              height={32}
              width={32}
            />
            Step 3: {courseId === "spanish" ? "Greetings" : "Greetings"}
          </Link>
        </Button>
        {/* Step 4 */}
        <Button
          variant={currentStep === 4 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[52px] w-full"
          asChild
        >
          <Link href={courseId === "spanish" ? "/lesson/lesson-1/step-4" : "/lesson/np-lesson-1/step-4"}>
            <Image
              src="/leaderboard.svg"
              alt="Step 4"
              className="mr-5"
              height={32}
              width={32}
            />
            Step 4: {courseId === "spanish" ? "Phrases 1" : "Phrases 1"}
          </Link>
        </Button>
        {/* Step 5 */}
        <Button
          variant={currentStep === 5 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[52px] w-full"
          asChild
        >
          <Link href={courseId === "spanish" ? "/lesson/lesson-1/step-5" : "/lesson/np-lesson-1/step-5"}>
            <Image
              src="/quests.svg"
              alt="Step 5"
              className="mr-5"
              height={32}
              width={32}
            />
            Step 5: {courseId === "spanish" ? "Phrases 2" : "Phrases 2"}
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
