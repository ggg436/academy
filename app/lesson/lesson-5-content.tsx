"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CongratulationPage } from "@/components/congratulation-page";

export const Lesson5Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
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
    window.location.href = "/lesson/lesson-5/html-structure";
  };

  // Show congratulation page when lesson is completed
  if (showCongratulations) {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-4 h-full relative">
            <CongratulationPage
              points={24}
              hearts={3}
              onContinue={handleContinue}
              onPracticeAgain={handlePracticeAgain}
              title="Congratulations! You've completed HTML Structure!"
              lessonTitle="HTML Structure"
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
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
              {currentStep === 1 ? "1. HTML Structure" : "2. Advanced Structure"}
            </h1>
          </div>
          
          {/* Navigation Button */}
          <div className="fixed bottom-6 right-6 z-50">
            {currentStep === 1 ? (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                asChild
              >
                <a href="/lesson/lesson-5/html-structure-advanced">
                  Next: Advanced Structure →
                </a>
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
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