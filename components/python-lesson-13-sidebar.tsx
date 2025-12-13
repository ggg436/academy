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

export const PythonLesson13Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  const is = (slug: string) => pathname.includes(`/${courseId}/lesson-13/${slug}`);

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
        <Button variant={is("python-conditionals-if") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-13/python-conditionals-if`} prefetch={false}>What is if?</Link>
        </Button>
        <Button variant={is("python-conditionals-else") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-13/python-conditionals-else`} prefetch={false}>What is else?</Link>
        </Button>
        <Button variant={is("python-conditionals-elif") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-13/python-conditionals-elif`} prefetch={false}>What is elif?</Link>
        </Button>
        <Button variant={is("python-conditionals-nested-if") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-13/python-conditionals-nested-if`} prefetch={false}>Nested if</Link>
        </Button>
        <Button variant={is("python-conditionals-practice") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-13/python-conditionals-practice`} prefetch={false}>Practice</Link>
        </Button>
        <Button variant={is("python-conditionals-quiz") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-13/python-conditionals-quiz`} prefetch={false}>Quiz</Link>
        </Button>
      </div>
      <div className="p-4">
        <FirebaseUserButton />
        <LanguageSelector />
      </div>
    </div>
  );
};
