"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CongratulationPage } from "@/components/congratulation-page";

export const Quiz = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [playSound, setPlaySound] = useState(false);

  // Determine which lesson this is based on the lessonTitle
  const isLesson1 = lessonTitle === "HTML Introduction";
  const isLesson2 = lessonTitle === "HTML Basics";
  const isLesson3 = lessonTitle === "HTML Elements";
  const isLesson4 = lessonTitle === "HTML Attributes";
  const isLesson5 = lessonTitle === "HTML Structure";

  // Play sound effect when congratulations screen shows
  useEffect(() => {
    if (playSound) {
      const audio = new Audio('/finish.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
      setPlaySound(false);
    }
  }, [playSound]);

  const handleFinishLesson = () => {
    if (isLesson1 || isLesson2 || isLesson3 || isLesson4 || isLesson5) {
      setShowCongratulations(true);
      setPlaySound(true);
    }
  };

  // Add CSS styles for confetti animation
  useEffect(() => {
    if (showCongratulations) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        .confetti-piece {
          position: absolute;
          top: -10px;
          font-size: 2rem;
          animation: confetti-fall 3s linear infinite;
          z-index: 10;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [showCongratulations]);

  const getStepHeading = () => {
    if (isLesson1) {
      return currentStep === 1 ? "WEARE" : 
             currentStep === 2 ? "HTML BASICS" : 
             currentStep === 3 ? "UUIUUI" :
             "SANJOK";
    } else if (isLesson2) {
      return currentStep === 1 ? "HI" : "HLO";
    } else if (isLesson3) {
      return currentStep === 1 ? "WE" : "GUE";
    } else if (isLesson4) {
      return currentStep === 1 ? "HTML ATTRIBUTES" : "ADVANCED ATTRIBUTES";
    } else if (isLesson5) {
      return currentStep === 1 ? "HTML STRUCTURE" : "ADVANCED STRUCTURE";
    }
    return lessonTitle;
  };

  const getNextButton = () => {
    if (isLesson1) {
      if (currentStep === 1) {
        return { href: "/lesson/lesson-1/html-basics", text: "Next: HTML Basics →" };
      } else if (currentStep === 2) {
        return { href: "/lesson/lesson-1/uuiuui", text: "Next: Uuiuui →" };
      } else if (currentStep === 3) {
        return { href: "/lesson/lesson-1/sanjok", text: "Next: Sanjok →" };
      }
    } else if (isLesson2) {
      if (currentStep === 1) {
        return { href: "/lesson/lesson-2/hlo", text: "Next: hlo →" };
      }
    } else if (isLesson3) {
      if (currentStep === 1) {
        return { href: "/lesson/lesson-3/gue", text: "Next: Element Types →" };
      }
    } else if (isLesson4) {
      if (currentStep === 1) {
        return { href: "/lesson/lesson-4/html-attributes-advanced", text: "Next: Attribute Types →" };
      }
    } else if (isLesson5) {
      if (currentStep === 1) {
        return { href: "/lesson/lesson-5/html-structure-advanced", text: "Next: Structure Patterns →" };
      }
    }
    
    // Default finish button
    return { href: "/learn", text: "Finish Lesson 🎉" };
  };

  const nextButton = getNextButton();
  const isLastStep = nextButton.href === "/learn";

  // Show congratulations screen for all lessons
  if (showCongratulations && (isLesson1 || isLesson2 || isLesson3 || isLesson4 || isLesson5)) {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col ml-4 h-full relative">
            <CongratulationPage
              points={
                isLesson1 ? 25 : 
                isLesson2 ? 20 : 
                isLesson3 ? 18 : 
                isLesson4 ? 22 : 
                isLesson5 ? 24 : 20
              }
              hearts={3}
              onContinue={() => window.location.href = "/learn"}
              onPracticeAgain={() => {
                setShowCongratulations(false);
                // Reset to first step of the lesson
                if (isLesson1) {
                  window.location.href = "/lesson/lesson-1/weare";
                } else if (isLesson2) {
                  window.location.href = "/lesson/lesson-2/hi";
                } else if (isLesson3) {
                  window.location.href = "/lesson/lesson-3/we";
                } else if (isLesson4) {
                  window.location.href = "/lesson/lesson-4/html-attributes";
                } else if (isLesson5) {
                  window.location.href = "/lesson/lesson-5/html-structure";
                }
              }}
              title={
                isLesson1 ? "Congratulations! You've completed HTML Introduction!" :
                isLesson2 ? "Congratulations! You've completed HTML Basics!" :
                isLesson3 ? "Congratulations! You've completed HTML Elements!" :
                isLesson4 ? "Congratulations! You've completed HTML Attributes!" :
                isLesson5 ? "Congratulations! You've completed HTML Structure!" :
                "Congratulations! You've completed the lesson!"
              }
              lessonTitle={
                isLesson1 ? "HTML Introduction" :
                isLesson2 ? "HTML Basics" :
                isLesson3 ? "HTML Elements" :
                isLesson4 ? "HTML Attributes" :
                isLesson5 ? "HTML Structure" :
                "Lesson"
              }
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
        <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col ml-4 h-full relative">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
              {getStepHeading()}
            </h1>
          </div>
          
          {/* Navigation Button */}
          <div className="absolute bottom-4 right-4">
            <Button
              variant="default"
              className={`font-semibold px-6 py-3 ${
                isLastStep 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              onClick={isLastStep && (isLesson1 || isLesson2 || isLesson3 || isLesson4 || isLesson5) ? handleFinishLesson : undefined}
              asChild={!isLastStep || !(isLesson1 || isLesson2 || isLesson3 || isLesson4 || isLesson5)}
            >
              {isLastStep && (isLesson1 || isLesson2 || isLesson3 || isLesson4 || isLesson5) ? (
                <span>Finish Lesson 🎉</span>
              ) : (
                <Link href={nextButton.href}>
                  {nextButton.text}
                </Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
