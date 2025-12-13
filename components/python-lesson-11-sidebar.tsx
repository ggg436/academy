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

export const PythonLesson11Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  const is = (slug: string) => pathname.includes(`/${courseId}/lesson-11/${slug}`);

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
        <Button variant={is("python-numbers-types") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-11/python-numbers-types`} prefetch={false}>Number Types</Link>
        </Button>
        <Button variant={is("python-numbers-ops") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-11/python-numbers-ops`} prefetch={false}>Number Operations</Link>
        </Button>
        <Button variant={is("python-numbers-casting") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-11/python-numbers-casting`} prefetch={false}>Type Casting</Link>
        </Button>
        <Button variant={is("python-numbers-math") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-11/python-numbers-math`} prefetch={false}>Math Module</Link>
        </Button>
        <Button variant={is("python-numbers-random") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-11/python-numbers-random`} prefetch={false}>Random Module</Link>
        </Button>
        <Button variant={is("python-numbers-practice") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-11/python-numbers-practice`} prefetch={false}>Practice</Link>
        </Button>
        <Button variant={is("python-numbers-quiz") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-11/python-numbers-quiz`} prefetch={false}>Quiz</Link>
        </Button>
      </div>
      <div className="px-6 pb-2"><LanguageSelector /></div>
      <div className="p-6 pt-2"><FirebaseUserButton /></div>
    </div>
  );
};
