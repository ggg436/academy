"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Lesson3Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  return (
    <div className="flex-1">
      <div className="h-full flex items-center justify-center">
        <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-8">
          <div className="text-center">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700 mb-4">
              {lessonTitle}
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Learn HTML elements and advanced concepts
            </p>
          </div>
          
          {currentStep === 1 ? (
            <div className="bg-white rounded-xl border-2 border-b-4 border-gray-200 p-6 text-center">
              <h2 className="text-xl font-semibold text-neutral-700 mb-4">
                Step 1: we
              </h2>
              <p className="text-neutral-600 mb-6">
                Welcome to the first step of HTML Elements! This step will cover:
              </p>
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-neutral-700">HTML element structure</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-neutral-700">Opening and closing tags</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-neutral-700">Element nesting</span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium">
                  🚧 Step content coming soon!
                </p>
              </div>
              
              {/* Next Button for Step 1 */}
              <div className="flex justify-end mt-auto pt-8">
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"
                  asChild
                >
                  <Link href="/lesson/lesson-3/step-2-gue">
                    Next: gue →
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border-2 border-b-4 border-gray-200 p-6 text-center">
              <h2 className="text-xl font-semibold text-neutral-700 mb-4">
                Step 2: gue
              </h2>
              <p className="text-neutral-600 mb-6">
                Excellent progress! This step will teach you:
              </p>
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-neutral-700">Advanced HTML elements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-neutral-700">Semantic HTML</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-neutral-700">Best practices</span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">
                  🎯 Almost there! Complete this step to finish the lesson.
                </p>
              </div>
              
              {/* Finish Button for Step 2 */}
              <div className="flex justify-end mt-auto pt-8">
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3"
                  asChild
                >
                  <Link href="/learn">
                    Finish Lesson 🎉
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 