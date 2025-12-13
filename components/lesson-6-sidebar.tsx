"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "@/components/language-selector";
import { FirebaseUserButton } from "@/components/firebase-user-button";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


type Props = {
  className?: string;
  courseId: string;
  lessonId: string;
};

export const Lesson6Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  const is = (slug: string) => pathname.includes(`/lesson/lesson-6/${slug}`);

  // Python course custom steps for Lesson 6
  if (courseId === "python") {
    const isSlug = (slug: string) => (pathname || "").split("/").filter(Boolean).pop() === slug;
    return (
      <div className={cn(
        "hidden lg:flex h-full lg:w-[280px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col",
        className,
      )}>
        <Link href="/learn" prefetch={false}>
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src="/logo.svg" height={40} width={40} alt="Mascot" />

          </div>
        </Link>
        <div className="flex flex-col gap-y-3 flex-1 px-2">
          <Button variant={isSlug("python-comments-intro") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-6/python-comments-intro" prefetch={false}>What are Comments?</Link>
          </Button>
          <Button variant={isSlug("python-single-line-comments") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-6/python-single-line-comments" prefetch={false}>Single-line Comments</Link>
          </Button>
          <Button variant={isSlug("python-multi-line-comments") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-6/python-multi-line-comments" prefetch={false}>Multi-line Comments</Link>
          </Button>
          <Button variant={isSlug("python-docstrings") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-6/python-docstrings" prefetch={false}>Docstrings</Link>
          </Button>
          <Button variant={isSlug("python-comments-practice") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-6/python-comments-practice" prefetch={false}>Practice</Link>
          </Button>
          <Button variant={isSlug("python-comments-quiz") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-6/python-comments-quiz" prefetch={false}>Quiz</Link>
          </Button>
        </div>
        <div className="px-6 pb-2"><LanguageSelector /></div>
        <div className="p-6 pt-2"><FirebaseUserButton /></div>
      </div>
    );
  }

  // Check if this is C course
  if (courseId === "c") {
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
          <Button variant={is("pointer-to-pointer") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-6/pointer-to-pointer" prefetch={false}>Pointer to Pointer</Link>
          </Button>
          <Button variant={is("array-of-pointers") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-6/array-of-pointers" prefetch={false}>Array of Pointers</Link>
          </Button>
          <Button variant={is("function-pointers") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-6/function-pointers" prefetch={false}>Function Pointers</Link>
          </Button>
          <Button variant={is("advanced-examples") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-6/advanced-examples" prefetch={false}>Advanced Examples</Link>
          </Button>
        </div>
        <div className="px-6 pb-2"><LanguageSelector /></div>
        <div className="p-6 pt-2"><FirebaseUserButton /></div>
      </div>
    );
  }

  // Default non-C behavior
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
        <Button variant={is("step-1") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-6/step-1" prefetch={false}>Step 1</Link>
        </Button>
        <Button variant={is("step-2") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-6/step-2" prefetch={false}>Step 2</Link>
        </Button>
      </div>
      <div className="px-6 pb-2"><LanguageSelector /></div>
      <div className="p-6 pt-2"><FirebaseUserButton /></div>
    </div>
  );
};
