"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson11Content = ({ lessonTitle, currentStep, lessonIdOverride }: { lessonTitle: string; currentStep: number; lessonIdOverride?: string }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState("");

  const handleTryNow = (code: string) => { setRunnerCode(code); setRunnerOpen(true); };

  // Derive page title from current step to mirror sidebar item labels
  const pageTitleMap: Record<number, string> = {
    1: "Python Number Types",
    2: "Python Arithmetic Operations",
    3: "Python Type Conversion",
    4: "Python Math Functions",
    5: "Python Random Numbers",
    6: "Python Practice",
  };
  const pageTitle = pageTitleMap[currentStep] || "Python Lesson";
  const lessonId = lessonIdOverride || "lesson-11";

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative pb-32">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{pageTitle}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Types of Numbers in Python</h3>
              <p className="text-neutral-700">Python has three main numeric types: integers (<code>int</code>), decimals (<code>float</code>), and complex numbers (<code>complex</code> with <code>a+bj</code> format).</p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-neutral-700 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-neutral-800">
                    <tr>
                      <th className="px-4 py-2">Data Type</th>
                      <th className="px-4 py-2">Meaning</th>
                      <th className="px-4 py-2">Example</th>
                      <th className="px-4 py-2">Real‑Life Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="px-4 py-2 font-semibold">int</td><td className="px-4 py-2">Whole numbers</td><td className="px-4 py-2">10, -5, 1000</td><td className="px-4 py-2">Age, likes</td></tr>
                    <tr className="border-t"><td className="px-4 py-2 font-semibold">float</td><td className="px-4 py-2">Decimals</td><td className="px-4 py-2">3.14, -2.5</td><td className="px-4 py-2">Balance, temperature</td></tr>
                    <tr className="border-t"><td className="px-4 py-2 font-semibold">complex</td><td className="px-4 py-2">Real + imaginary</td><td className="px-4 py-2">2+3j</td><td className="px-4 py-2">Engineering, AI models</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 1 (Integer)</p>
                  <CodeSnippet language="python" code={`x = 10\nprint(type(x))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`<class 'int'>`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 2 (Float)</p>
                  <CodeSnippet language="python" code={`y = 3.14\nprint(type(y))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`<class 'float'>`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 3 (Complex)</p>
                  <CodeSnippet language="python" code={`z = 2 + 3j\nprint(type(z))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`<class 'complex'>`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Instagram likes (int), Paytm balance (float), scientific simulations (complex)."} fun={"Complex numbers are like your love life — half real, half imaginary 💔😂."} />
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Basic Arithmetic Operations</h3>
              <p className="text-neutral-700">Python supports the usual arithmetic operators. Division <code>/</code> returns a float; <code>//</code> drops decimals.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-neutral-700 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-neutral-800">
                    <tr>
                      <th className="px-4 py-2">Operator</th>
                      <th className="px-4 py-2">Symbol</th>
                      <th className="px-4 py-2">Meaning</th>
                      <th className="px-4 py-2">Example</th>
                      <th className="px-4 py-2">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="px-4 py-2">Addition</td><td className="px-4 py-2">+</td><td className="px-4 py-2">Adds</td><td className="px-4 py-2">5 + 3</td><td className="px-4 py-2">8</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">Subtraction</td><td className="px-4 py-2">-</td><td className="px-4 py-2">Subtracts</td><td className="px-4 py-2">10 - 4</td><td className="px-4 py-2">6</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">Multiplication</td><td className="px-4 py-2">*</td><td className="px-4 py-2">Multiplies</td><td className="px-4 py-2">7 * 2</td><td className="px-4 py-2">14</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">Division</td><td className="px-4 py-2">/</td><td className="px-4 py-2">Float division</td><td className="px-4 py-2">7 / 2</td><td className="px-4 py-2">3.5</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">Floor Division</td><td className="px-4 py-2">//</td><td className="px-4 py-2">Drop decimals</td><td className="px-4 py-2">7 // 2</td><td className="px-4 py-2">3</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">Modulus</td><td className="px-4 py-2">%</td><td className="px-4 py-2">Remainder</td><td className="px-4 py-2">7 % 2</td><td className="px-4 py-2">1</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">Exponent</td><td className="px-4 py-2">**</td><td className="px-4 py-2">Power</td><td className="px-4 py-2">2 ** 3</td><td className="px-4 py-2">8</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-6">
                <CodeSnippet language="python" code={`print(7 / 2)\nprint(7 // 2)\nprint(7 % 2)`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`3.5\n3\n1`} /></div>
                <CodeSnippet language="python" code={`print(2 ** 5)`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`32`} /></div>
                <CodeSnippet language="python" code={`print(5 + 2.5)   # int + float => float`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`7.5`} /></div>
              </div>

              <MotivationFun motivation={"Used in salary calculation, discounts, banking."} fun={"% is like sharing chocolates — tells you what’s left 🍫😂."} />
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">type conversion (casting) in python</h3>
              <p className="text-neutral-700">Convert between number types with <code>int()</code>, <code>float()</code>, <code>complex()</code>.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-neutral-700 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-neutral-800">
                    <tr>
                      <th className="px-4 py-2">Function</th>
                      <th className="px-4 py-2">Meaning</th>
                      <th className="px-4 py-2">Example</th>
                      <th className="px-4 py-2">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="px-4 py-2">int(x)</td><td className="px-4 py-2">To integer</td><td className="px-4 py-2">int(3.9)</td><td className="px-4 py-2">3</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">float(x)</td><td className="px-4 py-2">To float</td><td className="px-4 py-2">float(7)</td><td className="px-4 py-2">7.0</td></tr>
                    <tr className="border-t"><td className="px-4 py-2">complex(x,y)</td><td className="px-4 py-2">To complex</td><td className="px-4 py-2">complex(2,5)</td><td className="px-4 py-2">(2+5j)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-6">
                <CodeSnippet language="python" code={`a = 3.7\nprint(int(a))`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`3`} /></div>
                <CodeSnippet language="python" code={`b = 5\nprint(float(b))`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`5.0`} /></div>
                <CodeSnippet language="python" code={`c = complex(2, 5)\nprint(c)`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`(2+5j)`} /></div>
              </div>

              <MotivationFun motivation={"Casting helps when APIs return strings but you need numbers."} fun={"Casting is like changing your hairstyle — still you, but looks different 😂."} />
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Math Functions</h3>
              <p className="text-neutral-700">Use the <code>math</code> module for common calculations like square root, power, and rounding.</p>

              <div className="space-y-6">
                <CodeSnippet language="python" code={`import math\nprint(math.sqrt(25))`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`5.0`} /></div>
                <CodeSnippet language="python" code={`import math\nprint(math.floor(4.7))\nprint(math.ceil(4.1))`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`4\n5`} /></div>
                <CodeSnippet language="python" code={`import math\nprint("Area of circle:", math.pi * (5**2))`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`Area of circle: 78.53981633974483`} /></div>
              </div>

              <MotivationFun motivation={"Banking interest, physics, 3D graphics rely on math functions."} fun={"math.ceil() is like always rounding your marks UP for parents 😂."} />
            </div>
          )}

          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Random Numbers</h3>
              <p className="text-neutral-700">Use the <code>random</code> module to generate unpredictable values.</p>

              <div className="space-y-6">
                <CodeSnippet language="python" code={`import random\nprint(random.random())  # 0..1`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`0.3748294   # varies`} /></div>
                <CodeSnippet language="python" code={`import random\nprint(random.randint(1, 6))  # dice`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`4   # varies`} /></div>
                <CodeSnippet language="python" code={`import random\nfruits = ["apple","banana","cherry"]\nprint(random.choice(fruits))`} onRun={handleTryNow} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`banana   # varies`} /></div>
              </div>

              <MotivationFun motivation={"Lottery systems, OTPs, shuffling decks rely on randomness."} fun={"Random numbers are like exam questions — totally unpredictable 😂."} />
            </div>
          )}

          {currentStep === 6 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Practice Problems</h3>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>Create variables of type int, float, and complex, and print their types.</li>
                <li>Perform 15 % 4, 15 // 4, and 15 / 4. Explain the difference.</li>
                <li>Convert 7.8 into integer and 10 into float.</li>
                <li>Find the area of a circle with radius 10 using math.pi.</li>
                <li>Generate a random number between 1 and 100.</li>
              </ul>
              <MotivationFun motivation={"Hands-on practice locks concepts into memory."} fun={"Practice is like gym for your brain 🧠💪."} />
            </div>
          )}

          {/* Next Button */}
          {(() => {
            const slugs = [
              "python-numbers-types",
              "python-numbers-ops",
              "python-numbers-casting",
              "python-numbers-math",
              "python-numbers-random",
              "python-numbers-practice",
              "python-numbers-quiz",
            ];
            const labels = [
              "Next: Arithmetic Operations →",
              "Next: Type Conversion →",
              "Next: Math Functions →",
              "Next: Random Numbers →",
              "Next: Practice →",
              "Next: Quiz →",
            ];
            const hasNext = currentStep >= 1 && currentStep <= slugs.length - 1;
            if (!hasNext) return null;
            const nextSlug = slugs[currentStep - 1];
            const nextLabel = labels[currentStep - 1] || "Next →";
            return <LessonNextButton href={`/lesson/${lessonId}/${nextSlug}`} label={nextLabel} />;
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
