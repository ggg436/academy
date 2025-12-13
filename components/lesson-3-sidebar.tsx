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

export const Lesson3Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();

  // If C course, show C-specific steps
  if (courseId === "c") {
    const is = (slug: string) => pathname.includes(`/lesson/lesson-3/${slug}`);
    return (
      <div className={cn(
        "hidden lg:flex h-full lg:w-[280px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col",
        className,
      )}>
        <Link href="/learn" prefetch={false}>
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src="/logo.svg" height={40} width={40} alt="Mascot" />
            <h1 className="text-3xl font-extrabold text-green-600 tracking-wide whitespace-nowrap">
              Gharti Academy
            </h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-3 flex-1 px-2">
          <Button variant={is("c-syntax") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/c-syntax" prefetch={false}>C Syntax</Link>
          </Button>
          <Button variant={is("example-explained") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/example-explained" prefetch={false}>Example explained</Link>
          </Button>
          <Button variant={is("notes") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/notes" prefetch={false}>Notes</Link>
          </Button>
          <Button variant={is("remember") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/remember" prefetch={false}>Remember</Link>
          </Button>
        </div>
        <div className="px-6 pb-2"><LanguageSelector /></div>
        <div className="p-6 pt-2"><FirebaseUserButton /></div>
      </div>
    );
  }

  // Python-specific steps for lesson 3
  if (courseId === "python") {
    const is = (slug: string) => pathname.includes(`/lesson/lesson-3/${slug}`);

    return (
      <div className={cn(
        "hidden lg:flex h-full lg:w-[280px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col",
        className,
      )}>
        <Link href="/learn" prefetch={false}>
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src="/logo.svg" height={40} width={40} alt="Mascot" />
            <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
              Gharti Academy
            </h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-3 flex-1 px-2">
          <Button variant={is("python-variables") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/python-variables" prefetch={false}>VARIABLES</Link>
          </Button>
          <Button variant={is("python-variable-rules") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/python-variable-rules" prefetch={false}>RULES</Link>
          </Button>
          <Button variant={is("python-data-types") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/python-data-types" prefetch={false}>DATA TYPES</Link>
          </Button>
          <Button variant={is("python-dynamic-typing") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/python-dynamic-typing" prefetch={false}>DYNAMIC TYPING</Link>
          </Button>
          <Button variant={is("python-type-casting") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/python-type-casting" prefetch={false}>TYPE CASTING</Link>
          </Button>
          <Button variant={is("python-problems") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/python-problems" prefetch={false}>PROBLEMS</Link>
          </Button>
          <Button variant={is("python-quiz") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-3/python-quiz" prefetch={false}>QUIZ</Link>
          </Button>
        </div>
        <div className="px-6 pb-2"><LanguageSelector /></div>
        <div className="p-6 pt-2"><FirebaseUserButton /></div>
      </div>
    );
  }

  // Default non-C, non-Python fallback (kept but unused now)

  // Extract step number from URL like /lesson/lesson-3/we
  let currentStep = 1;
  if (pathname.includes("/we") || pathname.includes("step-1")) {
    currentStep = 1;
  } else if (pathname.includes("/gue") || pathname.includes("step-2")) {
    currentStep = 2;
  } else {
    currentStep = 1;
  }

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
        <Button
          variant={currentStep === 1 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-3/we" prefetch={false}>
            WE
          </Link>
        </Button>
        {/* Step 2 */}
        <Button
          variant={currentStep === 2 ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[40px] w-full text-sm font-medium"
          asChild
        >
          <Link href="/lesson/lesson-3/gue" prefetch={false}>
            GUE
          </Link>
        </Button>
      </div>
      <div className="px-6 pb-2"><LanguageSelector /></div>
      <div className="p-6 pt-2"><FirebaseUserButton /></div>
    </div>
  );
}; 
