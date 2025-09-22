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

export const PythonLesson2Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();

  	const items = [
	    { href: "/lesson/lesson-2/python-case-sensitivity", label: "Case Sensitivity" },
	    { href: "/lesson/lesson-2/python-indentation", label: "Indentation" },
	    { href: "/lesson/lesson-2/python-comments", label: "Comments" },
	    { href: "/lesson/lesson-2/python-quotes", label: "Quotes" },
	    { href: "/lesson/lesson-2/python-multiple-statements", label: "Multiple Statements" },
	    { href: "/lesson/lesson-2/python-problems", label: "Problems" },
	    { href: "/lesson/lesson-2/python-quiz", label: "Quiz" },
	  ];

  return (
    <div className={cn(
      "hidden lg:flex h-full lg:w-[280px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn" prefetch={false}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Softcode
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-y-3 flex-1 px-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Button key={item.href} variant={active ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
              <Link href={item.href} prefetch={false}>
                {item.label}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="px-6 pb-2">
        <LanguageSelector />
      </div>
      <div className="p-6 pt-2">
        <FirebaseUserButton />
      </div>
    </div>
  );
}; 