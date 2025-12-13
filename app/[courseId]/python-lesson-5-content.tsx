"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson5Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState("");

  const handleTryNow = (code: string) => { setRunnerCode(code); setRunnerOpen(true); };

  // Map sidebar label for heading
  const stepTitle = currentStep === 1 ? "What is Input & Output?"
    : currentStep === 2 ? "Python print() function"
    : currentStep === 3 ? "Python input() function"
    : currentStep === 4 ? "Type Conversion for input()"
    : currentStep === 5 ? "Formatting Output (f-strings)"
    : currentStep === 6 ? "Practice"
    : "Quiz";

  // Quiz state
  const mcq = [
    { q: "By default, input() returns:", options: ["int", "float", "str", "bool"], answer: 2 },
    { q: "Which is the correct way to take integer input?", options: [
      'x = input(int("Enter: "))',
      'x = int(input("Enter: "))',
      'x = input("Enter: ").int()',
      'x = str(input("Enter: "))'
    ], answer: 1 },
    { q: "Which is not a valid way to print?", options: [
      'print("Hi")',
      'print(2 + 3)',
      'print("Age:", 20)',
      'print("Hello" + 5)'
    ], answer: 3 },
  ];
  const [mcqSel, setMcqSel] = useState<number[]>(Array(mcq.length).fill(-1));
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:minh-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
              {stepTitle}
            </h1>
          </div>

          {/* Step 1: Intro */}
          {currentStep === 1 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Input is data you give to a program; Output is what the program shows you back.</p>
              <CodeSnippet language="python" code={`print("Hello!")   # Output\nname = input("Enter your name: ")   # Input\nprint("Welcome,", name)`} onRun={handleTryNow} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`Hello!\nEnter your name: Alice\nWelcome, Alice`} />
              </div>
              <p className="text-neutral-700">Without input & output, programs can’t interact with users.</p>
              <MotivationFun motivation={"Instagram asks username (input) and shows profile (output)."} fun={"Input is ordering pizza 🍕, output is the waiter bringing it."} />
            </div>
          )}

          {/* Step 2: print */}
          {currentStep === 2 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">print() displays text, numbers, or variables; commas separate items.</p>
              <CodeSnippet language="python" code={`x = 10\ny = 20\nprint("Sum of x and y is:", x + y)`} onRun={handleTryNow} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`Sum of x and y is: 30`} />
              </div>
              <ul className="list-disc pl-6 text-neutral-700">
                <li>Strings inside quotes</li>
                <li>Comma separates text and values</li>
              </ul>
              <MotivationFun motivation={"News sites display data using output functions."} fun={"print() is like gossiping aunties — always ready to show & tell."} />
            </div>
          )}

          {/* Step 3: input */}
          {currentStep === 3 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">input() lets the user type; it returns a string.</p>
              <CodeSnippet language="python" code={`age = input("Enter your age: ")\nprint("Your age is:", age)`} onRun={handleTryNow} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`Enter your age: 18\nYour age is: 18`} />
              </div>
              <MotivationFun motivation={"Forms, login pages, quizzes rely on input."} fun={"input() is nosy… always asking questions."} />
            </div>
          )}

          {/* Step 4: type conversion */}
          {currentStep === 4 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Convert input to numbers using int() or float().</p>
              <CodeSnippet language="python" code={`num1 = int(input("Enter first number: "))\nnum2 = int(input("Enter second number: "))\nprint("Sum is:", num1 + num2)`} onRun={handleTryNow} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`Enter first number: 5\nEnter second number: 7\nSum is: 12`} />
              </div>
              <p className="text-neutral-700">Without conversion, "5" + "7" becomes "57".</p>
              <MotivationFun motivation={"Calculators convert input text to numbers."} fun={"Forgetting int() makes burgerburger 🍔🍔 instead of 2 burgers."} />
            </div>
          )}

          {/* Step 5: formatting */}
          {currentStep === 5 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Use f-strings for readable, formatted output.</p>
              <CodeSnippet language="python" code={`name = "Alice"\nage = 21\nprint(f"My name is {name} and I am {age} years old.")`} onRun={handleTryNow} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`My name is Alice and I am 21 years old.`} />
              </div>
              <MotivationFun motivation={"Receipts, bills, tickets are formatted output."} fun={"f-strings are Instagram filters for output ✨."} />
            </div>
          )}

          {/* Step 6: Practice */}
          {currentStep === 6 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800">🔧 Practice Problems (Subjective)</h3>
              <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                <li>Input your name and print: "Hello, &lt;name&gt;!"</li>
                <li>Take two numbers and print their product.</li>
                <li>Ask city and age, then display: "I live in &lt;city&gt; and I am &lt;age&gt; years old."</li>
                <li>Show difference between input without int() vs with int().</li>
                <li>Print a receipt-like output using f-strings with name, item, and price.</li>
              </ul>
            </div>
          )}

          {/* Step 7: Quiz handled by shared Quiz component via router */}

          {/* Next Button (fixed) */}
          {(() => {
            const slugs = [
              "python-print",
              "python-input",
              "python-input-type-conversion",
              "python-formatting-output",
              "python-io-practice",
              "python-io-quiz",
            ];
            const labels = [
              "Next: print() →",
              "Next: input() →",
              "Next: Type Conversion →",
              "Next: Formatting Output →",
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
                  <a href={`/lesson/lesson-5/${nextSlug}`}>{nextLabel}</a>
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
