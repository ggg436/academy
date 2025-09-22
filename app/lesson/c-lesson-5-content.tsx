"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import OneCompilerEmbed from "@/components/onecompiler-embed";
import { saveLessonCompleteServer } from "@/actions/progress";
import { CodeSnippet } from "@/components/ui/code-snippet";

export const CLesson5Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
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
      btn.textContent = "Try it Yourself >>";
      btn.className = "mt-3 inline-flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wide bg-green-500 text-white border-b-4 border-green-600 hover:bg-green-500/90 active:border-b-0 px-6 h-12";
      btn.onclick = () => { setRunnerCode((codeEl.innerText || "").trim()); setRunnerOpen(true); };
      const wrap = document.createElement("div"); wrap.className = "mt-3"; wrap.appendChild(btn);
      container.insertAdjacentElement("beforeend", wrap);
    });
  }, [currentStep]);

  const title = currentStep === 1 ? "Comments in C" : currentStep === 2 ? "Single-line Comments" : currentStep === 3 ? "Multi-line Comments" : "Single or Multi-line?";

  const handleFinish = async () => {
    try {
      setIsCompleting(true);
      await saveLessonCompleteServer("c", "lesson-5", 25);
      setShowCelebration(true);
    } finally {
      setIsCompleting(false);
    }
  };

  if (showCelebration) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="text-6xl">🎉</div>
          <h1 className="text-4xl font-bold text-green-600">Lesson Complete!</h1>
          <p className="text-xl text-gray-600">You earned 25 points!</p>
          <div className="space-y-4">
            <Button size="lg" className="px-8" asChild>
              <a href="/learn">Back to Learn</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative text-[15.5px] leading-7 lg:text-base">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{title}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Comments can be used to explain code, and to make it more readable. It can also be used to prevent execution when testing alternative code.</p>
              <p className="text-neutral-700">Comments can be <strong>single-lined or multi-lined</strong>.</p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800"><strong>Note:</strong> Comments are ignored by the compiler and will not be executed.</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Single-line comments start with two forward slashes <code>//</code>.</p>
              <p className="text-neutral-700">Any text between <code>//</code> and the end of the line is ignored by the compiler (will not be executed).</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Example 1 - Comment before code:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`// This is a comment
printf("Hello World!");`} />
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Example 2 - Comment at end of line:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`printf("Hello World!"); // This is a comment`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">Multi-line comments start with <code>/*</code> and ends with <code>*/</code>.</p>
              <p className="text-neutral-700">Any text between <code>/*</code> and <code>*/</code> will be ignored by the compiler.</p>
              
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Example - Multi-line comment:</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <CodeSnippet language="c" code={`/* The code below will print the words Hello World!
to the screen, and it is amazing */
printf("Hello World!");`} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">It is up to you which you want to use. Normally, we use <code>//</code> for short comments, and <code>/* */</code> for longer comments.</p>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800"><strong>Good to know:</strong> Before C99 (1999), only multi-line comments were available in C.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Short comment (recommended):</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`// This is a short comment
printf("Hello World!");`} />
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Long comment (for detailed explanations):</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`/* This is a longer comment
   that spans multiple lines
   and provides detailed
   explanations about the code */
printf("Hello World!");`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="fixed bottom-6 right-6 z-50">
            {currentStep < 4 ? (
              <Button variant="secondary" size="lg" className="px-6" asChild>
                <a href={
                  currentStep === 1 ? "/lesson/lesson-5/single-line-comments" :
                  currentStep === 2 ? "/lesson/lesson-5/multi-line-comments" :
                  "/lesson/lesson-5/single-or-multi-line"
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
          <DialogTitle>Try it Yourself (C)</DialogTitle>
        <div className="space-y-3">
          <OneCompilerEmbed language="c" height={560} />
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
