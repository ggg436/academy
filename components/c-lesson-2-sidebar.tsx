"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FirebaseUserButton } from "@/components/firebase-user-button";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";

type Props = { className?: string; courseId: string; lessonId: string; };

export const CLesson2Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();

  const is = (slug: string) => pathname.includes(`/lesson/lesson-2/${slug}`);

  return (
    <div className={cn("hidden lg:flex h-full lg:w-[280px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col", className)}>
      <Link href="/learn" prefetch={false}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/logo.svg" height={40} width={40} alt="Mascot" />
          
        </div>
      </Link>
      <div className="flex flex-col gap-y-3 flex-1 px-2">
        <Button variant={is("get-started-with-c") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-2/get-started-with-c" prefetch={false}>Get Started With C</Link>
        </Button>
        <Button variant={is("install-c") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-2/install-c" prefetch={false}>Install C</Link>
        </Button>
        <Button variant={is("install-ide") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-2/install-ide" prefetch={false}>Install IDE</Link>
        </Button>
        <Button variant={is("c-quickstart") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-2/c-quickstart" prefetch={false}>C Quickstart</Link>
        </Button>
      </div>
      <div className="px-6 pb-2"><LanguageSelector /></div>
      <div className="p-6 pt-2"><FirebaseUserButton /></div>
    </div>
  );
}; 
