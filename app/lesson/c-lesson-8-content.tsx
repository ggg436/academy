"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import OneCompilerEmbed from "@/components/onecompiler-embed";
import CCodeRunner from "@/components/c-code-runner";
import { saveLessonCompleteServer } from "@/actions/progress";
import { CodeSnippet } from "@/components/ui/code-snippet";

export const CLesson8Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
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

  const title = currentStep === 1 ? "C Constants" : currentStep === 2 ? "const Keyword" : currentStep === 3 ? "#define Macros" : "Practice Exercise";

  const handleFinish = async () => {
    try {
      setIsCompleting(true);
      await saveLessonCompleteServer("c", "lesson-8", 30);
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
              <p className="text-neutral-700">A <strong>constant</strong> is a value that does not change while your program runs. In C, you typically create constants with the <code>const</code> keyword or with <code>#define</code> macros.</p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800"><strong>Why constants?</strong> They make intent clear, prevent accidental changes, and help the compiler catch mistakes.</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Simple example:</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <CodeSnippet language="c" code={`#include <stdio.h>

int main() {
    const int DAYS_IN_WEEK = 7; // named constant
    printf("There are %d days in a week.\\n", DAYS_IN_WEEK);
    return 0;
}`} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Use the <strong>const</strong> keyword to make a variable read‑only after its initialization. Attempting to modify it will produce a compile-time error.</p>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <CodeSnippet language="c" code={`#include <stdio.h>

int main() {
    const double PI = 3.141592653589793;
    int radius = 5;
    double area = PI * radius * radius;
    printf("area = %.2lf\\n", area);

    // PI = 3.14; // Uncommenting this line causes a compilation error
    return 0;
}`} />
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <ul className="text-sm text-green-900 list-disc ml-6 space-y-1">
                  <li>Prefer <code>const</code> for typed, scoped constants.</li>
                  <li>Combine with pointers for read‑only data: <code>const char *msg = "Hello";</code></li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">A <strong>macro constant</strong> uses the preprocessor: <code>#define NAME value</code>. It has no type and is replaced before compilation. Useful for compile‑time switches or array sizes.</p>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>
#define MAX_USERS 100
#define GREETING "Welcome"

int main() {
    printf("%s! Max users = %d\n", GREETING, MAX_USERS);
    int arr[MAX_USERS]; // macro used in array size
    printf("Array length: %zu\n", sizeof(arr)/sizeof(arr[0]));
    return 0;
}`}</code></pre>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800"><strong>Note:</strong> Prefer <code>const</code> for typed values and use <code>#define</code> for conditional compilation, include guards, or when a value is needed in places where expressions aren’t allowed (e.g., sizes in some old compilers).</p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700 font-medium">Exercise: Create both a <code>const</code> and a <code>#define</code> constant and print them. Then try to modify the <code>const</code> to see the compiler error.</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>
#define VERSION "1.0.0"

int main() {
    const int YEAR = 2025;
    printf("Version %s, Year %d\n", VERSION, YEAR);
    // YEAR = 2026; // try enabling this line and re-run the code
    return 0;
}`}</code></pre>
              </div>
            </div>
          )}

          <div className="fixed bottom-6 right-6 z-50">
            {currentStep < 4 ? (
              <Button variant="secondary" size="lg" className="px-6" asChild>
                <a href={
                  currentStep === 1 ? "/lesson/lesson-8/const-keyword" :
                  currentStep === 2 ? "/lesson/lesson-8/define-macros" :
                  "/lesson/lesson-8/exercise"
                }>Next </a>
              </Button>
            ) : (
              <Button variant="secondary" size="lg" className="px-6" onClick={handleFinish} disabled={isCompleting}>{isCompleting ? "Saving..." : "Finish Lesson "}</Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={runnerOpen} onOpenChange={setRunnerOpen}>
        <DialogContent>
          <DialogTitle>Try Now (C)</DialogTitle>
          <div className="space-y-3">
            <div className="pt-2">
              <CCodeRunner initialCode={runnerCode} height={560} />
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