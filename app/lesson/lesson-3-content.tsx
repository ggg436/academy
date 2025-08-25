"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Lesson3Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  return (
    <div className="flex-1">
      <div className="h-full flex items-center justify-center">
        <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col">
          <div className="text-left mt-8 ml-8">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
              {currentStep === 1 ? "1. we" : "2. gue"}
            </h1>
          </div>
          
          {/* Navigation Button */}
          <div className="flex justify-end mt-auto pt-8">
            {currentStep === 1 ? (
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"
                asChild
              >
                <Link href="/lesson/lesson-3/gue">
                  Next: gue →
                </Link>
              </Button>
            ) : (
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3"
                asChild
              >
                <Link href="/learn">
                  Finish Lesson 🎉
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 