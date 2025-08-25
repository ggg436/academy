"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CongratulationPage } from "@/components/congratulation-page";

export const PythonLesson1Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
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
    window.location.href = "/lesson/python/lesson-1/introduction";
  };

  // Show congratulation page when lesson is completed
  if (showCongratulations) {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col ml-4 h-full relative">
            <CongratulationPage
              points={25}
              hearts={3}
              onContinue={handleContinue}
              onPracticeAgain={handlePracticeAgain}
              title="Congratulations! You've completed Python Introduction!"
              lessonTitle="Python Introduction"
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
              {currentStep === 1 ? "1. What is Python?" : 
               currentStep === 2 ? "2. Setting Up Python" : 
               currentStep === 3 ? "3. Your First Program" : 
               currentStep === 4 ? "4. Python Syntax" : 
               "5. Python Basics"}
            </h1>
            
            <div className="mt-6 text-gray-600">
              {currentStep === 1 && (
                <div>
                  <p className="mb-4">Python is a high-level, interpreted programming language known for its simplicity and readability.</p>
                  <p className="mb-4">Key features:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Easy to learn and read</li>
                    <li>Extensive standard library</li>
                    <li>Cross-platform compatibility</li>
                    <li>Great for beginners and experts</li>
                  </ul>
                </div>
              )}
              
              {currentStep === 2 && (
                <div>
                  <p className="mb-4">Let&apos;s get Python installed on your system:</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>Download Python from python.org</li>
                    <li>Run the installer</li>
                    <li>Verify installation in terminal/command prompt</li>
                    <li>Install a code editor (VS Code recommended)</li>
                  </ol>
                </div>
              )}
              
              {currentStep === 3 && (
                <div>
                  <p className="mb-4">Time to write your first Python program!</p>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                    <p className="text-green-600"># This is a comment</p>
                    <p className="text-blue-600">print(&quot;Hello, World!&quot;)</p>
                    <p className="text-gray-500"># Save this as hello.py and run it!</p>
                  </div>
                </div>
              )}
              
              {currentStep === 4 && (
                <div>
                  <p className="mb-4">Python syntax is clean and readable:</p>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                    <p className="text-green-600"># No semicolons needed</p>
                    <p className="text-blue-600">name = &quot;Python&quot;</p>
                                         <p className="text-blue-600">print(f&quot;Hello {'{name}'}!&quot;)</p>
                    <p className="text-green-600"># Indentation is important</p>
                  </div>
                </div>
              )}
              
              {currentStep === 5 && (
                <div>
                  <p className="mb-4">You&apos;ve learned the basics of Python!</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-blue-800">What you&apos;ve covered:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 text-blue-700">
                      <li>Python overview and features</li>
                      <li>Installation and setup</li>
                      <li>First program (Hello World)</li>
                      <li>Basic syntax rules</li>
                      <li>Ready for next steps!</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation Button */}
          <div className="absolute bottom-4 right-4">
            {currentStep < 5 ? (
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"
                asChild
              >
                <a href={`/lesson/python/lesson-1/step-${currentStep + 1}`}>
                  Next: {currentStep === 1 ? "Setting Up Python" : 
                         currentStep === 2 ? "Your First Program" : 
                         currentStep === 3 ? "Python Syntax" : 
                         "Python Basics"} →
                </a>
              </Button>
            ) : (
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3"
                onClick={() => handleFinishLesson()}
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