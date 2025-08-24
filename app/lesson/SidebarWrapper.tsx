"use client";
import { usePathname } from "next/navigation";
import { ChallengesSidebar } from "@/components/challenges-sidebar";

export function SidebarWrapper({ courseId }: { courseId: string }) {
  const pathname = usePathname();
  let lessonId = "";
  const match = pathname.match(/lesson\/(.+)/);
  if (match) {
    lessonId = match[1];
  }
  return <ChallengesSidebar courseId={courseId} lessonId={lessonId} />;
}
