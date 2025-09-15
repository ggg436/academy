"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import OneCompilerEmbed from "@/components/onecompiler-embed";
import { saveLessonCompleteServer } from "@/actions/progress";

export const CLesson3Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState<string>("");
  const [isCompleting, setIsCompleting] = useState(false);

  const handleFinish = async () => {
    try {
      setIsCompleting(true);
      await saveLessonCompleteServer("c", "lesson-3", 25);
      window.location.href = "/lesson/lesson-4/c-variables";
    } finally {
      setIsCompleting(false);
    }
  };

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('div.bg-gray-50 pre code')) as HTMLElement[];
    nodes.forEach(codeEl => {
      const container = codeEl.closest('div.bg-gray-50') as HTMLElement | null;
      if (!container) return;
      if (container.getAttribute('data-try-now-attached') === '1') return;
      container.setAttribute('data-try-now-attached', '1');
      const btn = document.createElement('button');
      btn.textContent = 'Try Now';
      btn.className = 'mt-3 inline-flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wide bg-green-500 text-white border-b-4 border-green-600 hover:bg-green-500/90 active:border-b-0 px-6 h-12';
      btn.onclick = () => { setRunnerCode((codeEl.innerText || '').trim()); setRunnerOpen(true); };
      const wrap = document.createElement('div'); wrap.className = 'mt-3'; wrap.appendChild(btn);
      container.insertAdjacentElement('beforeend', wrap);
    });
  }, [currentStep]);

  const title = currentStep === 1 ? "C Syntax" : currentStep === 2 ? "Example explained" : currentStep === 3 ? "Notes" : "Remember";

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative text-[15.5px] leading-7 lg:text-base">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{title}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">You have already seen this code. Let&apos;s break it down to understand the syntax.</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Hello World!\n");
  return 0;
}`}</code></pre>
              </div>
              <p className="text-neutral-700">A basic C program has:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li><strong>Preprocessor directives</strong> like <code>#include</code> to include libraries.</li>
                <li><strong>A <code>main()</code> function</strong> where execution starts.</li>
                <li><strong>Statements</strong> that end with <code>;</code> and run top-to-bottom.</li>
                <li><strong>Braces</strong> <code>{`{`}</code> and <code>{`}`}</code> to group code blocks.</li>
                <li><strong>Comments</strong> to document code.</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-base font-semibold text-neutral-700 mb-2">With comments</h3>
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

// Program entry point
int main() {
  // Print a message
  printf("Hello World!\n");
  return 0; // Exit status
}`}</code></pre>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-6">
              <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-yellow-900">Don&apos;t worry if you don&apos;t understand how <code>#include &lt;stdio.h&gt;</code> works. Think of it as something that appears at the top to enable input/output functions.</div>
              <ol className="list-decimal pl-6 space-y-2 text-neutral-700">
                <li><strong>Line 1</strong>: <code>#include &lt;stdio.h&gt;</code> adds the declarations for <code>printf/scanf</code>.</li>
                <li><strong>Line 2</strong>: A blank line improves readability.</li>
                <li><strong>Line 3</strong>: <code>int main()</code> declares the main function and its return type.</li>
                <li><strong>Line 4</strong>: <code>printf</code> prints text. The <code>\n</code> is a newline character.</li>
                <li><strong>Line 5</strong>: <code>return 0;</code> tells the OS the program finished successfully.</li>
              </ol>

              <hr className="border-gray-200" />
              <h2 className="text-xl font-semibold text-neutral-800">Output (Print Text)</h2>
              <p className="text-neutral-700">Use <code>printf</code> to print text to the screen:</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Hello World!\n");
  return 0;
}`}</code></pre>
              </div>

              <h3 className="text-lg font-semibold text-neutral-800">Double Quotes</h3>
              <p className="text-neutral-700">Text must be wrapped in double quotes. Forgetting them causes a compile error.</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("This sentence will work!\n");
  // printf(This sentence will produce an error.);
  return 0;
}`}</code></pre>
              </div>

              <h3 className="text-lg font-semibold text-neutral-800">Many printf functions</h3>
              <p className="text-neutral-700">You can call <code>printf</code> multiple times. It does not add a newline unless you include <code>\n</code>.</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Hello World!\n");
  printf("I am learning C.\n");
  printf("And it is awesome!\n");
  return 0;
}`}</code></pre>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-6">
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-emerald-900">Remember: The compiler ignores whitespace. Use indentation to show structure clearly.</div>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li><strong>Whitespace</strong>: spaces/newlines don&apos;t change meaning, but help readability.</li>
                <li><strong>Braces</strong>: always pair <code>{`{`}</code> and <code>{`}`}</code>. Most editors auto-format this.</li>
                <li><strong>Escape sequences</strong>: <code>\n</code> (newline), <code>\t</code> (tab), <code>\\</code> (backslash), <code>\"</code> (quote).</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-base font-semibold text-neutral-700 mb-2">Escape sequences demo</h3>
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Item\tQty\n");
  printf("Pencil\t10\n");
  printf("Quote: \"C is fun!\"\n");
  return 0;
}`}</code></pre>
              </div>
              <p className="text-neutral-700">Try editing the strings and add your own lines.</p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-5">
              <p className="text-neutral-700">A few quick reminders before we continue:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>Every C statement ends with a semicolon.</li>
                <li>Do not forget to add the closing curly brace <code>&#125;</code> to end a function.</li>
                <li>Use comments <code>// like this</code> or <code>/* like this */</code> to explain code.</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-base font-semibold text-neutral-700 mb-2">Practice: print your initials</h3>
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("M\nE\n"); // replace with your own initials
  return 0;
}`}</code></pre>
              </div>
            </div>
          )}

          <div className="fixed bottom-6 right-6 z-50">
            {currentStep < 4 ? (
              <Button variant="secondary" size="lg" className="px-6" asChild>
                <a href={
                  currentStep === 1 ? "/lesson/lesson-3/example-explained" :
                  currentStep === 2 ? "/lesson/lesson-3/notes" :
                  "/lesson/lesson-3/remember"
                }>Next →</a>
              </Button>
            ) : (
              <Button variant="secondary" size="lg" className="px-6" onClick={handleFinish} disabled={isCompleting}>
                {isCompleting ? "Saving..." : "Finish Lesson →"}
              </Button>
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