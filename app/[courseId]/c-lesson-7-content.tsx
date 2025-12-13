"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import OneCompilerEmbed from "@/components/onecompiler-embed";
import CCodeRunner from "@/components/c-code-runner";
import { saveLessonCompleteServer } from "@/actions/progress";
import { CodeSnippet } from "@/components/ui/code-snippet";

export const CLesson7Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState<string>("");
  const [isCompleting, setIsCompleting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("div.bg-gray-50 pre code")) as HTMLElement[];
    nodes.forEach(codeEl => {
      const container = codeEl.closest("div.bg-gray-50") as HTMLElement | null;
      if (!container) return;
      if (container.getAttribute("data-try-now-attached") === "1") return;
      container.setAttribute("data-try-now-attached", "1");
      const btn = document.createElement("button");
      btn.textContent = "Try Now";
      btn.className = "mt-3 inline-flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wide bg-green-500 text-white border-b-4 border-green-600 hover:bg-green-500/90 active:border-b-0 px-6 h-12";
      btn.onclick = () => { setRunnerCode((codeEl.innerText || "").trim()); setRunnerOpen(true); };
      const wrap = document.createElement("div"); wrap.className = "mt-3"; wrap.appendChild(btn);
      container.insertAdjacentElement("beforeend", wrap);
    });
  }, [currentStep]);

  const title = currentStep === 1 ? "C Data Types" : currentStep === 2 ? "Basic Data Types" : currentStep === 3 ? "Format Specifiers" : "Practice Exercise";

  const handleFinish = async () => {
    try {
      setIsCompleting(true);
      await saveLessonCompleteServer("c", "lesson-7", 30);
      setShowCelebration(true);
    } finally {
      setIsCompleting(false);
    }
  };

  if (showCelebration) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="text-6xl"></div>
          <h1 className="text-4xl font-bold text-green-600">Lesson Complete!</h1>
          <p className="text-xl text-gray-600">You earned 30 points!</p>
          <div className="space-y-4">
            <Button size="lg" className="px-8" asChild>
              <a href="/lesson/lesson-8/c-constants">Continue to Lesson 8 </a>
            </Button>
            <div>
              <Button variant="secondaryOutline" asChild>
                <a href="/learn">Back to Learn</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h+[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative text-[15.5px] leading-7 lg:text-base">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{title}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">In C, every variable must be declared with a <strong>data type</strong>. The type determines the size and layout of the variable's memory and the range of values that can be stored. You use the correct <code>printf</code> format specifier to display values.</p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Example:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`#include <stdio.h>

int main() {
    int myNum = 5;        // Integer (whole number)
    float myFloatNum = 5.99; // Floating point number
    char myLetter = 'D';  // Character

    printf("%d\\n", myNum);
    printf("%f\\n", myFloatNum);
    printf("%c\\n", myLetter);
    return 0;
}`} />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800"><strong>Tip:</strong> Choose the smallest suitable type to save memory and prefer <code>double</code> over <code>float</code> when precision matters.</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Common primitive types and their typical sizes:</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>int</strong>: stores whole numbers (commonly 4 bytes)</li>
                  <li><strong>float</strong>: single-precision floating point (4 bytes)</li>
                  <li><strong>double</strong>: double-precision floating point (8 bytes)</li>
                  <li><strong>char</strong>: single character or small integer (1 byte)</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Quick demo:</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <CodeSnippet language="c" code={`#include <stdio.h>

int main() {
    int age = 21;
    float price = 19.99f;
    double precise = 3.1415926535;
    char grade = 'A';

    printf("age=%d, price=%.2f, precise=%.10lf, grade=%c\\n", age, price, precise, grade);
    return 0;
}`} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Use the correct <strong>format specifier</strong> with <code>printf</code> for each data type.</p>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><code>%d</code> or <code>%i</code> — <strong>int</strong></li>
                  <li><code>%f</code> — <strong>float</strong></li>
                  <li><code>%lf</code> — <strong>double</strong></li>
                  <li><code>%c</code> — <strong>char</strong></li>
                  <li><code>%s</code> — <strong>strings</strong> (null-terminated <code>char</code> arrays)</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Formatting examples:</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
    int count = 42;
    float ratio = 0.3333f;
    double pi = 3.141592653589793;
    char initial = 'C';

    printf("count=%d\n", count);
    printf("ratio=%.2f\n", ratio);     // 2 decimal places
    printf("pi=%.6lf\n", pi);         // 6 decimal places
    printf("initial=%c\n", initial);
    printf("string=%s\n", "hello");
    return 0;
}`}</code></pre>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700 font-medium">Exercise: Declare variables of each basic type and print them using the correct format specifiers.</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
    int whole = 7;
    float single = 2.5f;
    double precise = 123.456789;
    char letter = 'Z';

    // TODO: print each variable with the right specifier
    printf("%d %f %lf %c\n", whole, single, precise, letter);
    return 0;
}`}</code></pre>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800"><strong>Note:</strong> On some platforms <code>sizeof(int)</code> may differ. Use <code>sizeof(type)</code> to check actual sizes.</p>
              </div>
            </div>
          )}

          <div className="fixed bottom-6 right-6 z-50">
            {currentStep >= 4 ? (
              <Button variant="secondary" size="lg" className="px-6" onClick={handleFinish} disabled={isCompleting}>{isCompleting ? "Saving..." : "Next: Lesson →"}</Button>
            ) : null}
          </div>
        </div>
      </div>

      <Dialog open={runnerOpen} onOpenChange={setRunnerOpen}>
        <DialogContent>
          <DialogTitle>Try Now (C)</DialogTitle>
          <div className="space-y-3">
                         <div className="pt-2">
               <CCodeRunner initialCode={runnerCode} height={420} />
             </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondaryOutline" onClick={() => setRunnerOpen(false)}>Close</Button>
              <Button variant="secondary" onClick={() => navigator.clipboard.writeText(runnerCode)}>Copy snippet</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 
