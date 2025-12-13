"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson7Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState("");

  const handleTryNow = (code: string) => {
    setRunnerCode(code);
    setRunnerOpen(true);
  };

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative pb-32">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{lessonTitle}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-6">What is Indentation?</h3>
                <p className="text-neutral-700 mb-4">In Python, indentation means spaces at the beginning of a line. Unlike C or Java that use braces <code>{"{"}{"}"}</code> or semicolons, Python uses <strong>indentation only</strong> to define code blocks.</p>

                <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
                <CodeSnippet language="python" code={`if True:\n    print("This is indented")`} onRun={handleTryNow} />
                <div className="mt-4">
                  <CodeSnippet isOutput language="output" code={`This is indented`} />
                </div>

                <div className="mt-10 space-y-4">
                  <MotivationFun motivation={"Indentation keeps Python code super clean & readable — one reason why big companies like Google love Python."} fun={"In Python, spaces matter more than your crush’s texts 😂."} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Indentation Rules</h3>
              <ul className="list-disc ml-6 text-neutral-700 space-y-2">
                <li>Default = <strong>4 spaces</strong> (most common).</li>
                <li>Use the same indentation inside a block.</li>
                <li>Wrong indentation → <code>IndentationError</code>.</li>
              </ul>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example (Correct)</p>
                  <CodeSnippet language="python" code={`for i in range(3):\n    print("Loop running")\n    print("Still inside loop")`} onRun={handleTryNow} />
                </div>
                <div>
                  <p className="text-red-600 font-semibold text-base mb-3">❌ Example (Wrong)</p>
                  <CodeSnippet language="python" code={`for i in range(3):\nprint("Loop running")`} onRun={handleTryNow} />
                  <div className="mt-2">
                    <CodeSnippet isOutput language="output" code={`IndentationError: expected an indented block`} />
                  </div>
                </div>
              </div>

              <MotivationFun motivation={"Without proper indentation, Python won’t even run your program."} fun={"Forgetting indentation is like forgetting to wear shoes before running outside 🏃😂."} />
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Nested Indentation</h3>
              <p className="text-neutral-700 mb-2">Blocks inside blocks → more indentation.</p>

              <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
              <CodeSnippet language="python" code={`for i in range(2):\n    if i == 0:\n        print("i is zero")\n    else:\n        print("i is not zero")`} onRun={handleTryNow} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`i is zero\ni is not zero`} />
              </div>
              <p className="text-neutral-700">Each nested level = 4 more spaces.</p>

              <MotivationFun motivation={"Nesting helps create structured logic in programs."} fun={"Nested indentation is like Russian dolls 🪆 — one inside another 😂."} />
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Mixing Tabs and Spaces (Warning)</h3>
              <p className="text-neutral-700">Python does not allow mixing tabs & spaces. Always use <strong>spaces OR tabs</strong>, not both. PEP 8 recommends 4 spaces.</p>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example</p>
                  <CodeSnippet language="python" code={`def hello():\n    print("Hello, World!")`} onRun={handleTryNow} />
                </div>
                <div>
                  <p className="text-red-600 font-semibold text-base mb-3">❌ Bad (mixed tabs + spaces)</p>
                  <CodeSnippet language="python" code={`def hello():\n\tprint("Hello, World!")   # tab\n    print("Hi!")              # spaces`} onRun={handleTryNow} />
                  <div className="mt-2">
                    <CodeSnippet isOutput language="output" code={`TabError: inconsistent use of tabs and spaces in indentation`} />
                  </div>
                </div>
              </div>

              <MotivationFun motivation={"Using spaces everywhere avoids confusion in team projects."} fun={"Mixing tabs and spaces is like mixing tea with coffee ☕+☕ = disaster 😂."} />
            </div>
          )}

          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">🔧 Practice Problems (Subjective)</h3>
              <ol className="list-decimal pl-6 text-neutral-700 space-y-2">
                <li>Write a program with an <code>if-else</code> block using correct indentation.</li>
                <li>Intentionally remove indentation and observe the error message.</li>
                <li>Create a nested loop with at least 2 levels of indentation.</li>
                <li>Write a function with proper indentation for statements inside it.</li>
                <li>Try using both spaces and tabs — note the error and then fix it.</li>
              </ol>
            </div>
          )}

          {/* Next Button */}
          {(() => {
            const slugs = [
              "python-indentation-intro",
              "python-indentation-rules",
              "python-nested-indentation",
              "python-tabs-vs-spaces",
              "python-indentation-practice",
              "python-indentation-quiz",
            ];
            const labels = [
              "Next: Indentation Rules →",
              "Next: Nested Indentation →",
              "Next: Tabs vs Spaces →",
              "Next: Practice →",
              "Next: Quiz →",
            ];
            const hasNext = currentStep >= 1 && currentStep <= slugs.length - 1;
            if (!hasNext) return null;
            const nextSlug = slugs[currentStep - 1];
            const nextLabel = labels[currentStep - 1] || "Next →";
            return <LessonNextButton href={`/lesson/lesson-7/${nextSlug}`} label={nextLabel} />;
          })()}
        </div>
      </div>

      <Dialog open={runnerOpen} onOpenChange={setRunnerOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-8 overflow-auto">
          <DialogTitle>Try Now (Python)</DialogTitle>
          <PythonCodeRunner initialCode={runnerCode} height={520} fontSizePx={15} />
        </DialogContent>
      </Dialog>
    </div>
  );
}; 
