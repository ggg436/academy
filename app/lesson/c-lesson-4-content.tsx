"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import OneCompilerEmbed from "@/components/onecompiler-embed";
import { saveLessonCompleteServer } from "@/actions/progress";

export const CLesson4Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
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

  const title = currentStep === 1 ? "C Output (Print Text)" : currentStep === 2 ? "Double Quotes" : currentStep === 3 ? "Many printf Functions" : "Exercise";

  const handleFinish = async () => {
    try {
      setIsCompleting(true);
      await saveLessonCompleteServer("c", "lesson-4", 25);
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
          <p className="text-xl text-gray-600">You earned 25 points!</p>
          <div className="space-y-4">
            <Button size="lg" className="px-8" asChild>
              <a href="/lesson/lesson-5/c-comments">Continue to Lesson 5 </a>
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
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative text-[15.5px] leading-7 lg:text-base">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{title}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">To output values or print text in C, you can use the <code>printf()</code> function. This is one of the most commonly used functions in C programming.</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Basic Example:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Hello World!");
  return 0;
}`}</code></pre>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Multiple Print Statements:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Welcome to C Programming!");
  printf("This is my first program.");
  printf("I am learning to code!");
  return 0;
}`}</code></pre>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Printing Numbers:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("The number is: 42");
  printf("Another number: 100");
  return 0;
}`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800"><strong>Note:</strong> Always include <code>#include &lt;stdio.h&gt;</code> at the top of your C programs to use printf().</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">When you are working with text, it must be wrapped inside double quotation marks <code>""</code>.</p>
              <p className="text-neutral-700">If you forget the double quotes, an error occurs. Let's see the difference:</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-2"> Working Examples:</p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`printf("This sentence will work!");`}</code></pre>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`printf("Hello, my name is John");`}</code></pre>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`printf("The answer is 42");`}</code></pre>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-red-600 mb-2"> Error Examples:</p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`printf(This sentence will produce an error.);`}</code></pre>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`printf(Hello World);`}</code></pre>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`printf(123);`}</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800"><strong>Remember:</strong> Text in C must always be enclosed in double quotes <code>""</code>. Without quotes, the compiler will think you're referring to a variable name.</p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">You can use as many <code>printf()</code> functions as you want in your program. <strong>However</strong>, note that it does not insert a new line at the end of the output by default.</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Multiple printf() without newlines:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Hello World!");
  printf("I am learning c.");
  printf("And it is awesome!");
  return 0;
}`}</code></pre>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800"><strong>Output:</strong> <code>Hello World!I am learning c.And it is awesome!</code> - all on one line!</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Adding newlines with \\n:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Hello World!\\n");
  printf("I am learning c.\\n");
  printf("And it is awesome!\\n");
  return 0;
}`}</code></pre>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800"><strong>Output:</strong> Each sentence will be on a separate line!</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Mixed examples with numbers and text:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("My name is ");
  printf("Alice");
  printf(" and I am ");
  printf("25");
  printf(" years old.\\n");
  return 0;
}`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-800"><strong>Pro Tip:</strong> Use <code>\\n</code> to create new lines in your output. This is called an "escape sequence" in C programming.</p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700 font-medium">Test your knowledge! Which function is used to print text in C?</p>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                  <input type="radio" name="quiz" value="println" className="w-4 h-4" />
                  <span className="text-neutral-700">println()</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                  <input type="radio" name="quiz" value="printf" className="w-4 h-4" defaultChecked />
                  <span className="text-neutral-700 font-medium">printf()</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                  <input type="radio" name="quiz" value="cout" className="w-4 h-4" />
                  <span className="text-neutral-700">cout()</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                  <input type="radio" name="quiz" value="echo" className="w-4 h-4" />
                  <span className="text-neutral-700">echo()</span>
                </label>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-800"><strong>Correct Answer:</strong> printf() is the function used to print text in C programming. It stands for "print formatted" and is part of the standard input/output library.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700"><strong>Quick Review:</strong></p>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li> Use <code>printf()</code> to display text and numbers</li>
                  <li> Always wrap text in double quotes <code>""</code></li>
                  <li> Use <code>\\n</code> to create new lines</li>
                  <li> Include <code>#include &lt;stdio.h&gt;</code> at the top</li>
                </ul>
              </div>
            </div>
          )}

          <div className="fixed bottom-6 right-6 z-50">
            {currentStep < 4 ? (
              <Button variant="secondary" size="lg" className="px-6" asChild>
                <a href={
                  currentStep === 1 ? "/lesson/lesson-4/double-quotes" :
                  currentStep === 2 ? "/lesson/lesson-4/many-printf-functions" :
                  "/lesson/lesson-4/exercise"
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
