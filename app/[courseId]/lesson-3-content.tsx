"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LessonNextButton } from "@/components/lesson-next-button";
import { CongratulationPage } from "@/components/congratulation-page";
import { saveLessonCompleteServer } from "@/actions/progress";

export const Lesson3Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleFinishLesson = async () => {
    try {
      setIsCompleting(true);
      // Mark lesson as completed in the database
      await saveLessonCompleteServer("html", "lesson-3", 25);
      setShowCongratulations(true);
    } catch (error) {
      console.error("Error completing lesson:", error);
      alert("Failed to complete lesson. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleContinue = () => {
    setShowCongratulations(false);
    // Navigate to lesson 4
    window.location.href = "/lesson/lesson-4";
  };

  const handlePracticeAgain = () => {
    setShowCongratulations(false);
    // Reset to first step
    window.location.href = "/lesson/lesson-3/we";
  };

  // Show congratulation page when lesson is completed
  if (showCongratulations) {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-4 h-full relative">
            <CongratulationPage
              points={18}
              hearts={3}
              onContinue={handleContinue}
              onPracticeAgain={handlePracticeAgain}
              title="Congratulations! You've completed HTML Elements!"
              lessonTitle="HTML Elements"
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
              {currentStep === 1 ? "WE" : "GUE"}
            </h1>
          </div>
          
          {/* Navigation Button */}
          {currentStep !== 1 && (
            <LessonNextButton onClick={handleFinishLesson} disabled={isCompleting} label={isCompleting ? "Completing..." : "Next: Lesson →"} />
            )}
        </div>
      </div>
    </div>
  );
}; 
