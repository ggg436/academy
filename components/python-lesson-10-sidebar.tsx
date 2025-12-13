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

export const PythonLesson10Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  const is = (slug: string) => pathname.includes(`/${courseId}/lesson-10/${slug}`);

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
        <Button variant={is("python-slicing") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-10/python-slicing`} prefetch={false}>String Slicing</Link>
        </Button>
        <Button variant={is("python-negative-indexing") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-10/python-negative-indexing`} prefetch={false}>Negative Indexing</Link>
        </Button>
        <Button variant={is("python-string-methods") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-10/python-string-methods`} prefetch={false}>String Methods</Link>
        </Button>
        <Button variant={is("python-string-length") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-10/python-string-length`} prefetch={false}>String Length</Link>
        </Button>
        <Button variant={is("python-strings-ops-practice") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-10/python-strings-ops-practice`} prefetch={false}>Practice</Link>
        </Button>
        <Button variant={is("python-strings-ops-quiz") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href={`/${courseId}/lesson-10/python-strings-ops-quiz`} prefetch={false}>Quiz</Link>
        </Button>
      </div>
      <div className="px-6 pb-2"><LanguageSelector /></div>
      <div className="p-6 pt-2"><FirebaseUserButton /></div>
    </div>
  );
};
