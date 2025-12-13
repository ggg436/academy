"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson6Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState("");

  const handleTryNow = (code: string) => { setRunnerCode(code); setRunnerOpen(true); };

  const stepTitle =
    currentStep === 1 ? "What are Comments?" :
    currentStep === 2 ? "Single-line Comments" :
    currentStep === 3 ? "Multi-line Comments" :
    currentStep === 4 ? "Documentation Strings (Docstrings)" :
    currentStep === 5 ? "Practice" :
    "Quiz";

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{stepTitle}</h1>
          </div>

          {/* Step 1: What are Comments? */}
          {currentStep === 1 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Comments are special notes inside code that Python ignores while running. They explain the code and help others understand what's happening.</p>
              <p className="text-neutral-700">Used to explain code. Help others (and your future self) understand what’s happening.</p>
              <CodeSnippet language="python" code={`# This is a single-line comment
print("Hello, Python!")  # This prints a greeting`} onRun={handleTryNow} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`Hello, Python!`} />
              </div>
              <p className="text-neutral-700">Without comments, code becomes confusing. With comments, it’s like adding road signs on a highway.</p>
              <MotivationFun motivation={"In big projects (like YouTube backend), thousands of developers work together. Comments keep the code understandable."} fun={"Comments are like whispers to your future self — “Yo, don’t panic, I wrote this at 3 AM!” 😂"} />
            </div>
          )}

          {/* Step 2: Single-line Comments */}
          {currentStep === 2 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Single-line comments start with <code>#</code>. Everything after <code>#</code> is ignored by Python.</p>
              <CodeSnippet language="python" code={`# This program adds two numbers
a = 5
b = 10
print(a + b)`} onRun={handleTryNow} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`15`} />
              </div>
              <MotivationFun motivation={"Single-line comments are perfect for quick notes in your code."} fun={"It’s like putting sticky notes on your fridge 🧾 — “Don’t forget the milk!”"} />
            </div>
          )}

          {/* Step 3: Multi-line Comments */}
          {currentStep === 3 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Python doesn’t have a dedicated multi-line comment symbol, but we can use triple quotes (<code>'''</code> or <code>"""</code>) for documentation or multi-line text.</p>
              <CodeSnippet language="python" code={`'''
This is a multi-line comment
It can explain bigger parts of code
'''
print("Multi-line comments are useful!")`} onRun={handleTryNow} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`Multi-line comments are useful!`} />
              </div>
              <p className="text-neutral-700">Note: Technically, triple quotes are strings, but if not assigned to a variable, Python ignores them.</p>
              <MotivationFun motivation={"Multi-line comments are used for detailed explanations or to temporarily “disable” parts of code."} fun={"Multi-line comments = long gossip 🗣️ in your code 😂."} />
            </div>
          )}

          {/* Step 4: Docstrings */}
          {currentStep === 4 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Docstrings are special comments used to explain functions, classes, or modules. Written with triple quotes and can be accessed via <code>.__doc__</code>.</p>
              <CodeSnippet language="python" code={`def greet():
    """This function prints a greeting message"""
    print("Hello from function!")

print(greet.__doc__)`} onRun={handleTryNow} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`This function prints a greeting message`} />
              </div>
              <MotivationFun motivation={"Libraries like NumPy and Pandas use docstrings so help(function) shows explanations."} fun={"Docstrings are like subtitles in movies 🎬 — without them, you might miss the plot."} />
            </div>
          )}

          {/* Step 5: Practice */}
          {currentStep === 5 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800">🔧 Practice Problems (Subjective)</h3>
              <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                <li>Write a program with at least 3 single-line comments explaining the code.</li>
                <li>Write a multi-line comment explaining what your program does.</li>
                <li>Create a function with a docstring explaining its purpose, then print the docstring.</li>
                <li>Comment out a line of code and show how it gets ignored.</li>
                <li>Make a program where you use comments to label “Input Section”, “Processing Section”, and “Output Section”.</li>
              </ul>
            </div>
          )}

          {/* Step 6: Quiz handled via router */}

          {/* Next Button (fixed) */}
          {(() => {
            const slugs = [
              "python-single-line-comments",
              "python-multi-line-comments",
              "python-docstrings",
              "python-comments-practice",
              "python-comments-quiz",
            ];
            const labels = [
              "Next: Single-line Comments →",
              "Next: Multi-line Comments →",
              "Next: Docstrings →",
              "Next: Practice →",
              "Next: Quiz →",
            ];
            const hasNext = currentStep >= 1 && currentStep <= slugs.length - 1;
            if (!hasNext) return null;
            const nextSlug = slugs[currentStep - 1];
            const nextLabel = labels[currentStep - 1] || "Next →";
            return (
              <div className="fixed bottom-6 right-6 z-50">
                <Button variant="secondary" size="lg" className="px-6" asChild>
                  <a href={`/lesson/lesson-6/${nextSlug}`}>{nextLabel}</a>
                </Button>
              </div>
            );
          })()}
        </div>
      </div>

      <Dialog open={runnerOpen} onOpenChange={setRunnerOpen}>
        <DialogContent className="sm:max-w-6xl">
          <DialogTitle>Try Now (Python)</DialogTitle>
          <PythonCodeRunner initialCode={runnerCode} height={420} />
        </DialogContent>
      </Dialog>
    </div>
  );
}; 
