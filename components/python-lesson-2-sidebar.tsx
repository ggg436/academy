"use client";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { FirebaseUserButton } from "@/components/firebase-user-button";

type Props = {
    className?: string;
    courseId: string;
    lessonId: string;
};

export const PythonLesson2Sidebar = ({ className, courseId, lessonId }: Props) => {
    return (
        <div className={cn(
            "hidden lg:flex h-full lg:w-[280px] lg:fixed left-0 top-0 px-6 border-r-2 flex-col",
            className,
        )}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-4">
                    <Logo />
                </div>
            </Link>
            <div className="flex flex-col gap-y-3 flex-1 px-2">
                {/* Empty sidebar */}
            </div>
            <div className="p-6">
                <FirebaseUserButton />
            </div>
        </div>
    );
};
