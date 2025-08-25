"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CongratulationPage } from "@/components/congratulation-page";

export const Lesson4Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);

  const handleFinishLesson = () => {
    setShowCongratulations(true);
  };

  const handleContinue = () => {
    setShowCongratulations(false);
    // Navigate to learn page
    window.location.href = "/learn";
  };

  const handlePracticeAgain = () => {
    setShowCongratulations(false);
    // Reset to first step
    window.location.href = "/lesson/lesson-4/html-attributes";
  };

  // Show congratulation page when lesson is completed
  if (showCongratulations) {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-4 h-full relative">
            <CongratulationPage
              points={22}
              hearts={3}
              onContinue={handleContinue}
              onPracticeAgain={handlePracticeAgain}
              title="Congratulations! You've completed HTML Attributes!"
              lessonTitle="HTML Attributes"
              showHearts={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-4 h-full relative">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
              {currentStep === 1 ? "1. HTML Attributes" : "2. Advanced Attributes"}
            </h1>
          </div>
          
          {/* Navigation Button */}
          <div className="absolute bottom-4 right-4">
            {currentStep === 1 ? (
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"
                asChild
              >
                <a href="/lesson/lesson-4/html-attributes-advanced">
                  Next: Advanced Attributes →
                </a>
              </Button>
            ) : (
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3"
                onClick={handleFinishLesson}
              >
                Finish Lesson 🎉
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 