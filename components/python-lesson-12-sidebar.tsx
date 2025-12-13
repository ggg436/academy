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

export const PythonLesson12Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  const is = (slug: string) => pathname.includes(`/${courseId}/lesson-12/${slug}`);

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
        <Button variant={is("python-boolean-intro") ? "sidebarOutline" : "sidebar"} className="justify-start w-full text-sm font-medium h-auto py-2 whitespace-normal text-left leading-snug" asChild>
          <Link href={`/${courseId}/lesson-12/python-boolean-intro`} prefetch={false}>What is Boolean?</Link>
        </Button>
        <Button variant={is("python-comparison-operators") ? "sidebarOutline" : "sidebar"} className="justify-start w-full text-sm font-medium h-auto py-2 whitespace-normal text-left leading-snug" asChild>
          <Link href={`/${courseId}/lesson-12/python-comparison-operators`} prefetch={false}>Comparison Operators</Link>
        </Button>
        <Button variant={is("python-boolean-numbers-strings") ? "sidebarOutline" : "sidebar"} className="justify-start w-full text-sm font-medium h-auto py-2 whitespace-normal text-left leading-snug" asChild>
          <Link href={`/${courseId}/lesson-12/python-boolean-numbers-strings`} prefetch={false}>Boolean with Numbers & Strings</Link>
        </Button>
        <Button variant={is("python-logical-operators") ? "sidebarOutline" : "sidebar"} className="justify-start w-full text-sm font-medium h-auto py-2 whitespace-normal text-left leading-snug" asChild>
          <Link href={`/${courseId}/lesson-12/python-logical-operators`} prefetch={false}>Logical Operators</Link>
        </Button>
        <Button variant={is("python-boolean-if-conditions") ? "sidebarOutline" : "sidebar"} className="justify-start w-full text-sm font-medium h-auto py-2 whitespace-normal text-left leading-snug" asChild>
          <Link href={`/${courseId}/lesson-12/python-boolean-if-conditions`} prefetch={false}>Boolean in If Conditions</Link>
        </Button>
        <Button variant={is("python-boolean-practice") ? "sidebarOutline" : "sidebar"} className="justify-start w-full text-sm font-medium h-auto py-2 whitespace-normal text-left leading-snug" asChild>
          <Link href={`/${courseId}/lesson-12/python-boolean-practice`} prefetch={false}>Practice</Link>
        </Button>
        <Button variant={is("python-boolean-quiz") ? "sidebarOutline" : "sidebar"} className="justify-start w-full text-sm font-medium h-auto py-2 whitespace-normal text-left leading-snug" asChild>
          <Link href={`/${courseId}/lesson-12/python-boolean-quiz`} prefetch={false}>Quiz</Link>
        </Button>
      </div>
      <div className="px-6 pb-2"><LanguageSelector /></div>
      <div className="p-6 pt-2"><FirebaseUserButton /></div>
    </div>
  );
};
