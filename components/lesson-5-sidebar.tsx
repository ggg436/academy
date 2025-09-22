"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FirebaseUserButton } from "@/components/firebase-user-button";
import { LanguageSelector } from "@/components/language-selector";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

type Props = { className?: string; courseId: string; lessonId: string };

export const Lesson5Sidebar = ({ className, courseId, lessonId }: Props) => {
  const pathname = usePathname();
  const { language } = useLanguage();

  const t = (key: string): string => {
    const map: Record<string, Record<string, string>> = {
      io: {
        en: "What is Input & Output?",
        ne: "इनपुट र आउटपुट के हो?",
        mai: "इनपुट आ अउटपुट की अछि?",
        new: "इनपुट अनि आउटपुट कस्याः?",
      },
      print: {
        en: "print function",
        ne: "प्रिन्ट फङ्सन",
        mai: "प्रिन्ट फङ्सन",
        new: "प्रिन्ट फङ्सन",
      },
      input: {
        en: "input function",
        ne: "इनपुट फङ्सन",
        mai: "इनपुट फङ्सन",
        new: "इनपुट फङ्सन",
      },
      convert: {
        en: "Type Conversion",
        ne: "टाइप परिवर्तन",
        mai: "टाइप कन्वर्जन",
        new: "टाइप रुपान्तरण",
      },
      format: {
        en: "Formatting Output",
        ne: "आउटपुट ढाँचा",
        mai: "आउटपुट फर्मेट",
        new: "आउटपुट ढाँचाः",
      },
      practice: {
        en: "Practice",
        ne: "अभ्यास",
        mai: "अभ्यास",
        new: "अभ्यास",
      },
      quiz: {
        en: "Quiz",
        ne: "क्विज",
        mai: "क्विज",
        new: "क्विज",
      },
    };
    return map[key]?.[language] || map[key]?.en || key;
  };

  // Python Lesson 5 custom steps
  if (courseId === "python") {
    const is = (slug: string) => {
      const last = (pathname || "").split("/").filter(Boolean).pop() || "";
      return last === slug;
    };
    return (
      <div className={cn("hidden lg:flex h-full lg:w-[320px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col", className)}>
        <Link href="/learn" prefetch={false}>
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
            <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Softcode</h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-3 flex-1 px-2">
          <Button variant={is("python-io-intro") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/python-io-intro" prefetch={false}>{t("io")}</Link>
          </Button>
          <Button variant={is("python-print") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/python-print" prefetch={false}>{t("print")}</Link>
          </Button>
          <Button variant={is("python-input") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/python-input" prefetch={false}>{t("input")}</Link>
          </Button>
          <Button variant={is("python-input-type-conversion") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/python-input-type-conversion" prefetch={false}>{t("convert")}</Link>
          </Button>
          <Button variant={is("python-formatting-output") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/python-formatting-output" prefetch={false}>{t("format")}</Link>
          </Button>
          <Button variant={is("python-io-practice") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/python-io-practice" prefetch={false}>{t("practice")}</Link>
          </Button>
          <Button variant={is("python-io-quiz") ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
            <Link href="/lesson/lesson-5/python-io-quiz" prefetch={false}>{t("quiz")}</Link>
          </Button>
        </div>
        <div className="px-6 pb-2"><LanguageSelector /></div>
        <div className="p-6 pt-2"><FirebaseUserButton /></div>
      </div>
    );
  }

  // Fallback generic (uses existing labels)
  const pathnameIncludes = (slug: string) => pathname.includes(`/lesson/lesson-5/${slug}`);
  let currentStep = pathnameIncludes("html-structure-advanced") ? 2 : 1;
  return (
    <div className={cn("hidden lg:flex h-full lg:w-[320px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col", className)}>
      <Link href="/learn" prefetch={false}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Softcode</h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-3 flex-1 px-2">
        <Button variant={currentStep === 1 ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-5/html-structure" prefetch={false}>HTML Structure</Link>
        </Button>
        <Button variant={currentStep === 2 ? "sidebarOutline" : "sidebar"} className="justify-start h-[40px] w-full text-sm font-medium" asChild>
          <Link href="/lesson/lesson-5/html-structure-advanced" prefetch={false}>Advanced Structure</Link>
        </Button>
      </div>
      <div className="px-6 pb-2"><LanguageSelector /></div>
      <div className="p-6 pt-2"><FirebaseUserButton /></div>
    </div>
  );
};
