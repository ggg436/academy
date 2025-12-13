"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson4Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
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
                <h3 className="text-xl font-semibold text-neutral-800 mb-6">What are Operators?</h3>
                <p className="text-neutral-700 mb-2">Operators are special symbols in Python that perform operations on values and variables. Think of them like math signs (+, -, *) but more powerful.</p>
                <p className="text-neutral-700 mb-4">👉 Without operators, we couldn’t calculate, compare, or combine values. They are the tools that make variables useful.</p>

                <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
                <CodeSnippet language="python" code={`x = 10\ny = 3\nprint(x + y)\nprint(x - y)`} onRun={handleTryNow} />
                <div className="mt-3">
                  <Button onClick={() => handleTryNow('x = 10\ny = 3\nprint(x + y)\nprint(x - y)')} variant="secondary" size="sm">TRY NOW</Button>
                </div>

                <div className="mt-4">
                  <CodeSnippet isOutput language="output" code={`13\n7`} />
                </div>

                <div className="mt-10 space-y-4">
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="grid grid-cols-[24px_1fr] gap-2 items-start">
                        <span className="text-lg leading-none">💡</span>
                        <p className="text-blue-700 text-base font-medium">Motivation</p>
                        <div className="col-start-2">
                          <p className="text-blue-700 text-sm mt-1">Calculators, banking apps, even AI models rely heavily on operators to crunch numbers.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="grid grid-cols-[24px_1fr] gap-2 items-start">
                        <span className="text-lg leading-none">😂</span>
                        <p className="text-purple-700 text-base font-medium">Fun</p>
                        <div className="col-start-2">
                          <p className="text-purple-700 text-sm mt-1">Operators are like spices 🌶️ — they add flavor to plain variables.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Arithmetic Operators</h3>
              <p className="text-neutral-700">Used for basic math.</p>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-left text-neutral-700 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-neutral-800">
                    <tr>
                      <th className="px-4 py-2">Operator</th>
                      <th className="px-4 py-2">Meaning</th>
                      <th className="px-4 py-2">Example</th>
                      <th className="px-4 py-2">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="px-4 py-2">+</td><td className="px-4 py-2">Addition</td><td className="px-4 py-2">5 + 3</td><td className="px-4 py-2">8</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">-</td><td className="px-4 py-2">Subtraction</td><td className="px-4 py-2">5 - 3</td><td className="px-4 py-2">2</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">*</td><td className="px-4 py-2">Multiplication</td><td className="px-4 py-2">5 * 3</td><td className="px-4 py-2">15</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">/</td><td className="px-4 py-2">Division</td><td className="px-4 py-2">5 / 2</td><td className="px-4 py-2">2.5</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">//</td><td className="px-4 py-2">Floor Division</td><td className="px-4 py-2">5 // 2</td><td className="px-4 py-2">2</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">%</td><td className="px-4 py-2">Modulus</td><td className="px-4 py-2">5 % 2</td><td className="px-4 py-2">1</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">**</td><td className="px-4 py-2">Exponent</td><td className="px-4 py-2">2 ** 3</td><td className="px-4 py-2">8</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
                <CodeSnippet language="python" code={`print(10 % 3)   # remainder\nprint(2 ** 4)   # 2 to the power 4`} onRun={handleTryNow} />
                <div className="mt-3">
                  <Button onClick={() => handleTryNow('print(10 % 3)\nprint(2 ** 4)')} variant="secondary" size="sm">TRY NOW</Button>
                </div>
                <div className="mt-4">
                  <CodeSnippet isOutput language="output" code={`1\n16`} />
                </div>
                <div className="mt-4 space-y-2">
                  <MotivationFun motivation={"% operator is used in games to detect turns (e.g., player 1 vs player 2)."} fun={"% is like sharing pizza 🍕 with friends — it tells you what’s left over."} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Comparison Operators</h3>
              <p className="text-neutral-700">Used to compare values. They return True/False.</p>

              <div className="mt-6">
                <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
                <CodeSnippet language="python" code={`a = 10\nb = 20\nprint(a < b)\nprint(a == 10)`} onRun={handleTryNow} />
                <div className="mt-3">
                  <Button onClick={() => handleTryNow('a = 10\nb = 20\nprint(a < b)\nprint(a == 10)')} variant="secondary" size="sm">TRY NOW</Button>
                </div>
                <div className="mt-4">
                  <CodeSnippet isOutput language="output" code={`True\nTrue`} />
                </div>
                <div className="mt-4 space-y-2">
                  <MotivationFun motivation={"Used in login systems (checking password match)." } fun={"Comparisons are like sibling fights 👊 — “I’m taller!” “No, I’m taller!”"} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Logical Operators</h3>
              <p className="text-neutral-700">Used to combine conditions.</p>
              <div className="mt-6">
                <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
                <CodeSnippet language="python" code={`age = 18\nhas_id = True\nprint(age >= 18 and has_id)`} onRun={handleTryNow} />
                <div className="mt-3">
                  <Button onClick={() => handleTryNow('age = 18\nhas_id = True\nprint(age >= 18 and has_id)')} variant="secondary" size="sm">TRY NOW</Button>
                </div>
                <div className="mt-4">
                  <CodeSnippet isOutput language="output" code={`True`} />
                </div>
                <div className="mt-4 space-y-2">
                  <MotivationFun motivation={"Websites use this for conditions: “Age ≥ 18 and ID required.”"} fun={"not is like your mom — if you say yes, she says no 😂."} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Assignment Operators</h3>
              <p className="text-neutral-700">Used to assign values with shortcuts.</p>
              <div className="mt-6">
                <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
                <CodeSnippet language="python" code={`x = 5\nx += 3\nprint(x)`} onRun={handleTryNow} />
                <div className="mt-3">
                  <Button onClick={() => handleTryNow('x = 5\nx += 3\nprint(x)')} variant="secondary" size="sm">TRY NOW</Button>
                </div>
                <div className="mt-4">
                  <CodeSnippet isOutput language="output" code={`8`} />
                </div>
                <div className="mt-4 space-y-2">
                  <MotivationFun motivation={"Used in loops to update scores, counters, etc."} fun={"+= is like eating snacks 🍪 — your plate just keeps adding more."} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Identity & Membership Operators</h3>
              <p className="text-neutral-700">Identity: is, is not → check if two objects are the same. Membership: in, not in → check if a value exists in a sequence.</p>
              <div className="mt-6">
                <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
                <CodeSnippet language="python" code={`x = [1, 2, 3]\ny = x\nz = [1, 2, 3]\n\nprint(x is y)      # True\nprint(x is z)      # False\nprint(2 in x)      # True\nprint(5 not in x)  # True`} onRun={handleTryNow} />
                <div className="mt-3">
                  <Button onClick={() => handleTryNow('x = [1, 2, 3]\ny = x\nz = [1, 2, 3]\nprint(x is y)\nprint(x is z)\nprint(2 in x)\nprint(5 not in x)')} variant="secondary" size="sm">TRY NOW</Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">🔧 Practice Problems (Subjective)</h3>
              <ol className="list-decimal pl-6 text-neutral-700 space-y-2">
                <li>Write a program to find remainder when 25 is divided by 4.</li>
                <li>Check if 15 is greater than 10 and less than 20 (use logical operators).</li>
                <li>Create a variable score = 50, then increase it by 20 using assignment operator.</li>
                <li>Write a program to check if "apple" exists in a list ["banana","apple","mango"].</li>
                <li>Use ** to calculate 7 to the power of 3.</li>
              </ol>
            </div>
          )}

          {/* Next Button (fixed) */}
          {(() => {
            const slugs = [
              "python-operators-intro",
              "python-arithmetic-operators",
              "python-comparison-operators",
              "python-logical-operators",
              "python-assignment-operators",
              "python-identity-membership",
              "python-operators-problems",
            ];
            const labels = [
              "Next: Arithmetic Operators →",
              "Next: Comparison Operators →",
              "Next: Logical Operators →",
              "Next: Assignment Operators →",
              "Next: Identity & Membership →",
              "Next: Practice Problems →",
            ];
            const hasNext = currentStep >= 1 && currentStep < slugs.length;
            if (!hasNext) return null;
            const nextSlug = slugs[currentStep];
            const nextLabel = labels[currentStep - 1] || "Next →";
            return (
              <LessonNextButton href={`/lesson/lesson-4/${nextSlug}`} label={nextLabel} />
            );
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
