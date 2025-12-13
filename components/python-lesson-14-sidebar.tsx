"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const PythonLesson14Sidebar = () => {
  const pathname = usePathname();

  const is = (slug: string) => pathname.includes(`/${courseId}/lesson-14/${slug}`);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <Button
              variant={is("python-best-practices-intro") ? "sidebarOutline" : "ghost"}
              className="w-full justify-start font-normal h-auto p-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex h-full p-1">
                  <div className="h-full w-1 rounded-full bg-sky-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-left text-sm font-medium leading-none">
                    Python Best Practices
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    Introduction to best practices
                  </div>
                </div>
              </div>
            </Button>
            <Button
              variant={is("python-best-practices-pep8") ? "sidebarOutline" : "ghost"}
              className="w-full justify-start font-normal h-auto p-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex h-full p-1">
                  <div className="h-full w-1 rounded-full bg-sky-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-left text-sm font-medium leading-none">
                    PEP 8 Guidelines
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    Python style guide
                  </div>
                </div>
              </div>
            </Button>
            <Button
              variant={is("python-best-practices-documentation") ? "sidebarOutline" : "ghost"}
              className="w-full justify-start font-normal h-auto p-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex h-full p-1">
                  <div className="h-full w-1 rounded-full bg-sky-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-left text-sm font-medium leading-none">
                    Documentation
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    Writing good docstrings
                  </div>
                </div>
              </div>
            </Button>
            <Button
              variant={is("python-best-practices-error-handling") ? "sidebarOutline" : "ghost"}
              className="w-full justify-start font-normal h-auto p-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex h-full p-1">
                  <div className="h-full w-1 rounded-full bg-sky-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-left text-sm font-medium leading-none">
                    Error Handling
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    Robust error management
                  </div>
                </div>
              </div>
            </Button>
            <Button
              variant={is("python-best-practices-practice") ? "sidebarOutline" : "ghost"}
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
                    Apply best practices
                  </div>
                </div>
              </div>
            </Button>
            <Button
              variant={is("python-best-practices-quiz") ? "sidebarOutline" : "ghost"}
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
