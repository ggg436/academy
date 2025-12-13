"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const PythonLesson15Sidebar = () => {
  const pathname = usePathname();

  const is = (slug: string) => pathname.includes(`/${courseId}/lesson-15/${slug}`);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <Button
              variant={is("python-testing-intro") ? "sidebarOutline" : "ghost"}
              className="w-full justify-start font-normal h-auto p-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex h-full p-1">
                  <div className="h-full w-1 rounded-full bg-sky-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-left text-sm font-medium leading-none">
                    Testing & Debugging
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    Introduction to testing
                  </div>
                </div>
              </div>
            </Button>
            <Button
              variant={is("python-testing-unit-tests") ? "sidebarOutline" : "ghost"}
              className="w-full justify-start font-normal h-auto p-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex h-full p-1">
                  <div className="h-full w-1 rounded-full bg-sky-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-left text-sm font-medium leading-none">
                    Unit Tests
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    Writing tests with pytest
                  </div>
                </div>
              </div>
            </Button>
            <Button
              variant={is("python-testing-debugging") ? "sidebarOutline" : "ghost"}
              className="w-full justify-start font-normal h-auto p-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex h-full p-1">
                  <div className="h-full w-1 rounded-full bg-sky-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-left text-sm font-medium leading-none">
                    Debugging
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    Finding and fixing bugs
                  </div>
                </div>
              </div>
            </Button>
            <Button
              variant={is("python-testing-tdd") ? "sidebarOutline" : "ghost"}
              className="w-full justify-start font-normal h-auto p-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex h-full p-1">
                  <div className="h-full w-1 rounded-full bg-sky-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-left text-sm font-medium leading-none">
                    TDD
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    Test-driven development
                  </div>
                </div>
              </div>
            </Button>
            <Button
              variant={is("python-testing-practice") ? "sidebarOutline" : "ghost"}
              className="w-full justify-start font-normal h-auto p-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex h-full p-1">
                  <div className="h-full w-1 rounded-full bg-sky-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-left text-sm font-medium leading-none">
                    Practice
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    Testing exercises
                  </div>
                </div>
              </div>
            </Button>
            <Button
              variant={is("python-testing-quiz") ? "sidebarOutline" : "ghost"}
              className="w-full justify-start font-normal h-auto p-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex h-full p-1">
                  <div className="h-full w-1 rounded-full bg-sky-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-left text-sm font-medium leading-none">
                    Quiz
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    Test your knowledge
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
