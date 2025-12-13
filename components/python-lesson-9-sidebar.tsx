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

export const PythonLesson9Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  const is = (slug: string) => pathname.includes(`/${courseId}/lesson-9/${slug}`);

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
        <Button variant={is("python-strings-intro") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-9/python-strings-intro`} prefetch={false}>What is a String?</Link>
        </Button>
        <Button variant={is("python-quotes") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-9/python-quotes`} prefetch={false}>Quotes</Link>
        </Button>
        <Button variant={is("python-concatenation") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-9/python-concatenation`} prefetch={false}>Concatenation</Link>
        </Button>
        <Button variant={is("python-repetition") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-9/python-repetition`} prefetch={false}>Repetition</Link>
        </Button>
        <Button variant={is("python-indexing") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-9/python-indexing`} prefetch={false}>Indexing</Link>
        </Button>
        <Button variant={is("python-strings-practice") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-9/python-strings-practice`} prefetch={false}>Practice</Link>
        </Button>
        <Button variant={is("python-strings-quiz") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-9/python-strings-quiz`} prefetch={false}>Quiz</Link>
        </Button>
      </div>
      <div className="px-6 pb-2"><LanguageSelector /></div>
      <div className="p-6 pt-2"><FirebaseUserButton /></div>
    </div>
  );
};