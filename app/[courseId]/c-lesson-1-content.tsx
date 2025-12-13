"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CongratulationPage } from "@/components/congratulation-page";
import { useLanguage } from "@/contexts/language-context";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CCodeRunner from "@/components/c-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { saveLessonCompleteServer } from "@/actions/progress";

export const CLesson1Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const { language } = useLanguage();
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState<string>("");

  const handleFinishLesson = async () => {
    try {
      setIsCompleting(true);
      await saveLessonCompleteServer("c", "lesson-1", 25);
      setShowCongratulations(true);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleContinue = () => {
    setShowCongratulations(false);
    window.location.href = "/lesson/lesson-2";
  };

  const handlePracticeAgain = () => {
    setShowCongratulations(false);
    window.location.href = "/lesson/lesson-1/c-tutorial";
  };

  // Attach Try Now buttons to inline code blocks
  useEffect(() => {
    const preBlocks = Array.from(document.querySelectorAll('div.bg-gray-50 pre code')) as HTMLElement[];
    preBlocks.forEach((node) => {
      const container = node.closest('div.bg-gray-50') as HTMLElement | null;
      if (!container || container.getAttribute('data-try-now-attached') === '1') return;
      container.setAttribute('data-try-now-attached', '1');
      const wrap = document.createElement('div');
      wrap.className = 'mt-3';
      const btn = document.createElement('button');
      btn.textContent = 'TRY NOW';
      btn.className = 'inline-flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wide bg-green-500 text-white border-b-4 border-green-600 hover:bg-green-500/90 active:border-b-0 px-6 h-10';
      btn.onclick = () => { setRunnerCode((node.innerText || '').trim()); setRunnerOpen(true); };
      wrap.appendChild(btn);
      container.insertAdjacentElement('beforeend', wrap);
    });
  }, [currentStep]);

  // Quiz (Step 4)
  const quizQuestions = [
    { q: 'Who developed C?', options: ['Bill Gates', 'Dennis Ritchie', 'James Gosling', 'Bjarne Stroustrup'], answer: 1 },
    { q: 'In which year was C developed?', options: ['1969', '1972', '1989', '1991'], answer: 1 },
    { q: 'Which of the following is NOT written in C?', options: ['Linux Kernel', 'MySQL', 'Microsoft Word', 'Git'], answer: 2 },
  ];
  const [selected, setSelected] = useState<number[]>(Array(quizQuestions.length).fill(-1));
  const [checked, setChecked] = useState(false);
  const correctCount = selected.reduce((acc, val, i) => acc + (val === quizQuestions[i].answer ? 1 : 0), 0);

  if (showCongratulations) {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
            <CongratulationPage
              points={25}
              hearts={3}
              onContinue={handleContinue}
              onPracticeAgain={handlePracticeAgain}
              title="Congratulations! You've completed C Basics!"
              lessonTitle="C Basics"
              showHearts={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
              {currentStep === 1 ? "What is C?" : currentStep === 2 ? "History" : currentStep === 3 ? "Why Learn C?" : currentStep === 4 ? "Quiz" : "First Program & Practice"}
            </h1>
          </div>
          
          {/* Step 1: Introduction */}
          {currentStep === 1 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700 leading-relaxed">
                C is a general-purpose programming language created in the 1970s. It is the mother of many modern languages
                (C++, Java, Python). C is compiled (translated to machine code before running), making programs fast and efficient. It sits
                between low-level and high-level: closer to the hardware than Python, but far easier than Assembly.
              </p>
              
              <div className="space-y-2">
                <p className="text-green-700 font-semibold">✅ Example 1: First Program in C</p>
                <CodeSnippet language="c" code={`#include <stdio.h>

int main() {
    printf("Hello, C!");
    return 0;
}`} onRun={(code) => { setRunnerCode(code); setRunnerOpen(true); }} />
                <div className="mt-2">
                  <CodeSnippet isOutput language="output" code={`Hello, C!`} />
                </div>
              </div>

              <div>
                <p className="text-neutral-700 font-semibold mb-2">👉 Breakdown</p>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li><code>#include &lt;stdio.h&gt;</code> adds Standard I/O library for printf()</li>
                  <li>`int main()` is the entry point of every C program</li>
                  <li>`{}` curly braces group the code</li>
                  <li>`printf("Hello, C!");` prints text to the screen</li>
                  <li>`return 0;` ends the program successfully</li>
              </ul>
              </div>

              <div className="space-y-2">
                <p className="text-rose-700 font-semibold">❌ Wrong Example</p>
                <CodeSnippet language="c" code={`printf("Hello, C!");`} onRun={(code) => { setRunnerCode(code); setRunnerOpen(true); }} />
                <div className="mt-2">
                  <CodeSnippet isOutput language="output" code={`error: expected declaration specifiers or '...' before string constant`} />
                </div>
                <p className="text-neutral-700">👉 Because in C, statements must live inside a function like <code>main()</code>.</p>
              </div>
              
              <p className="text-blue-700">💡 Motivation: C powers Linux, MySQL, Git, and embedded systems.</p>
              <p className="text-purple-700">😂 Fun: C is like your strict math teacher — no shortcuts. Master it and everything else feels easy.</p>
            </div>
          )}
          
          {/* Step 2: History */}
          {currentStep === 2 && (
            <div className="mt-8 space-y-4">
              <p className="text-neutral-700 leading-relaxed">C was developed by <strong>Dennis Ritchie</strong> at <strong>Bell Labs</strong> in <strong>1972</strong> to build UNIX. It became popular for being portable, efficient, and powerful.</p>
              <p className="text-blue-700">💡 Motivation: Without C, there would be no Linux, no modern software.</p>
              <p className="text-purple-700">😂 Fun: Imagine 1972 — bell-bottoms 👖 and C code. Coolest nerds alive.</p>
            </div>
          )}

          {/* Step 3: Why Learn C */}
          {currentStep === 3 && (
            <div className="mt-8 space-y-4">
              <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                <li>Foundation: many languages are based on C concepts</li>
                <li>Speed: compiles to machine code</li>
                <li>Control: direct memory access with pointers</li>
                <li>Portability: write once, run many systems</li>
                <li>Industry use: OS, compilers, databases, embedded</li>
              </ul>
              <div className="space-y-1 text-neutral-700">
                <p>• Linux Kernel → C</p>
                <p>• MySQL → C</p>
                <p>• Git → C</p>
              </div>
              <p className="text-blue-700">💡 Motivation: Learn C to get “superpowers” from PC to IoT to space.</p>
              <p className="text-purple-700">😂 Fun: You can even program a fridge 🧊😂.</p>
            </div>
          )}

          {/* Step 4: Quiz */}
          {currentStep === 4 && (
            <div className="mt-8 space-y-6">
              {quizQuestions.map((item, qi) => (
                <div key={qi} className="space-y-2">
                  <p className="font-medium">{qi + 1}) {item.q}</p>
                  <div className="flex flex-col gap-1">
                    {item.options.map((opt, oi) => (
                      <label key={oi} className="inline-flex items-center gap-2 text-neutral-700">
                        <input
                          type="radio"
                          name={`q-${qi}`}
                          checked={selected[qi] === oi}
                          onChange={() => {
                            const copy = selected.slice();
                            copy[qi] = oi;
                            setSelected(copy);
                          }}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-2">
                {!checked ? (
                  <Button variant="secondary" onClick={() => setChecked(true)}>Check answers</Button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-neutral-700">Score: {correctCount} / {quizQuestions.length}</p>
                    <p className="text-neutral-600 text-sm">{correctCount === quizQuestions.length ? 'Perfect! Proceed to the next step.' : 'Review and try again.'}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: First Program again + Practice */}
          {currentStep === 5 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700 font-semibold">✅ Example 2</p>
              <CodeSnippet language="c" code={`#include <stdio.h>

int main() {
    printf("Welcome to C Programming!");
    return 0;
}`} onRun={(code) => { setRunnerCode(code); setRunnerOpen(true); }} />
              <div className="mt-2">
                <CodeSnippet isOutput language="output" code={`Welcome to C Programming!`} />
              </div>

              <div>
                <p className="text-neutral-700 font-semibold mb-2">👉 Key Takeaways</p>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li><code>#include &lt;stdio.h&gt;</code> → library for I/O</li>
                  <li>`printf()` → displays output</li>
                  <li>`" "` → strings in quotes</li>
                  <li>`;` → every statement ends with semicolon</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800">🔧 Practice Problems (Subjective)</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Print your name using `printf()`.</li>
                  <li>Print: `C is powerful!`</li>
                  <li>Print 3 lines using 3 different `printf()` statements.</li>
                  <li>Remove `return 0;` and observe the behavior on your compiler.</li>
                  <li>In comments, list 3 real-world software built with C.</li>
              </ul>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="fixed bottom-6 right-6 z-50">
            {currentStep >= 5 ? (
              <Button variant="secondary" size="lg" className="px-6" onClick={handleFinishLesson} disabled={isCompleting}>
                {isCompleting ? 'Completing...' : 'Next: Lesson →'}
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Try Now modal */}
      <Dialog open={runnerOpen} onOpenChange={setRunnerOpen}>
        <DialogContent>
          <DialogTitle>Try Now (C)</DialogTitle>
          <div className="space-y-3">
            <CCodeRunner initialCode={runnerCode} height={420} />
            <div className="flex justify-end gap-2">
              <Button variant="secondaryOutline" onClick={() => setRunnerOpen(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 
