"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import OneCompilerEmbed from "@/components/onecompiler-embed";
import { CongratulationPage } from "@/components/congratulation-page";
import { useLanguage } from "@/contexts/language-context";
import { saveLessonCompleteServer } from "@/actions/progress";

export const CLesson2Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const { language } = useLanguage();
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState<string>("");

  const handleFinishLesson = async () => {
    try {
      setIsCompleting(true);
      await saveLessonCompleteServer("c", "lesson-2", 25);
      setShowCongratulations(true);
    } catch (error) {
      console.error("Error completing lesson:", error);
      alert("Failed to complete lesson. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleContinue = () => { 
    setShowCongratulations(false); 
    window.location.href = "/lesson/lesson-3"; 
  };
  
  const handlePracticeAgain = () => { 
    setShowCongratulations(false); 
    window.location.href = "/lesson/lesson-2/get-started-with-c"; 
  };

  useEffect(() => {
    // Attach Try Now to code blocks
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
    return () => {
      // no-op cleanup
    };
  }, [currentStep]);

  if (showCongratulations) {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative text-[15.5px] leading-7 lg:text-base">
            <CongratulationPage
              points={25}
              hearts={3}
              onContinue={handleContinue}
              onPracticeAgain={handlePracticeAgain}
              title="Great job! You completed C Lesson 2."
              lessonTitle="C Get Started"
              showHearts={true}
            />
          </div>
        </div>
      </div>
    );
  }

  const title = currentStep === 1
    ? "Get Started With C"
    : currentStep === 2
      ? "Install C"
      : currentStep === 3
        ? "Install IDE"
        : "C Quickstart";

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative text-[15.5px] leading-7 lg:text-base">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{title}</h1>
          </div>

          {/* Step 1: Get Started With C */}
          {currentStep === 1 && (
            <div className="mt-8 space-y-8">
              <p className="text-neutral-600 leading-relaxed">
                You can run C code online without installing anything. Use our embedded editor below to compile and run simple programs, then move on to local setup.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Hello World!\n");
  return 0;
}`}</code></pre>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Output appears in the console area of the runner. Try changing the message and pressing Try Now to re-run.
              </p>
            </div>
          )}

          {/* Step 2: Install C */}
          {currentStep === 2 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">To run C locally, you need:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>A text editor to write code (VS Code, Notepad++, etc.).</li>
                <li>A compiler to translate C code (GCC/Clang on macOS/Linux, MinGW-w64 on Windows).</li>
              </ul>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Windows (MinGW-w64)</h3>
                <ol className="list-decimal pl-6 space-y-2 text-neutral-700">
                  <li>Install "MSYS2" from the official site.</li>
                  <li>Open MSYS2 UCRT64 terminal and run: <code>pacman -S mingw-w64-ucrt-x86_64-gcc</code></li>
                  <li>Add <code>C:\msys64\ucrt64\bin</code> to your PATH.</li>
                  <li>Verify: open a new terminal and run <code>gcc --version</code>.</li>
                </ol>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">macOS</h3>
                <ol className="list-decimal pl-6 space-y-2 text-neutral-700">
                  <li>Install Xcode Command Line Tools: <code>xcode-select --install</code></li>
                  <li>Or install Homebrew and run: <code>brew install gcc</code></li>
                </ol>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Linux</h3>
                <ol className="list-decimal pl-6 space-y-2 text-neutral-700">
                  <li>Ubuntu/Debian: <code>sudo apt update && sudo apt install build-essential</code></li>
                  <li>Fedora: <code>sudo dnf groupinstall "Development Tools"</code></li>
                </ol>
              </div>
            </div>
          )}

          {/* Step 3: Install IDE */}
          {currentStep === 3 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">An IDE helps you write, compile, and debug C in one place.</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>Code::Blocks — simple and great for beginners.</li>
                <li>Visual Studio (Windows) — powerful with great debugging.</li>
                <li>VS Code + C/C++ extension — lightweight and flexible.</li>
              </ul>
              <p className="text-neutral-700">In most IDEs, create a new C project, add a file like <code>main.c</code>, paste the code below, then build and run.</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Running from an IDE!\n");
  return 0;
}`}</code></pre>
              </div>
              <p className="text-neutral-700">Tip: In VS Code, install the <code>C/C++</code> extension by Microsoft and search for "C: Build and debug active file".</p>
            </div>
          )}

          {/* Step 4: C Quickstart */}
          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <p className="text-neutral-700">Let&apos;s create and run your first C file locally.</p>
              <ol className="list-decimal pl-6 space-y-2 text-neutral-700">
                <li>Create a new file named <strong>myfirstprogram.c</strong></li>
                <li>Paste the code below and save.</li>
                <li>Compile: <code className="bg-slate-100 px-2 py-0.5 rounded">gcc myfirstprogram.c -o myfirstprogram</code></li>
                <li>Run: <code className="bg-slate-100 px-2 py-0.5 rounded">./myfirstprogram</code> (Windows: <code>myfirstprogram.exe</code>)</li>
              </ol>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  printf("Hello World!\n");
  return 0;
}`}</code></pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-base font-semibold text-neutral-700 mb-2">Example: Read input</h3>
                <pre className="font-mono text-[15px] lg:text-base text-gray-700 whitespace-pre-wrap"><code>{`#include <stdio.h>

int main() {
  char name[32];
  printf("Your name: ");
  scanf("%31s", name);
  printf("Hi %s!\n", name);
  return 0;
}`}</code></pre>
              </div>
              <p className="text-neutral-700">Expected output: <code className="bg-slate-100 px-2 py-0.5 rounded">Hello World!</code> then the input example greeting.</p>
            </div>
          )}

          {/* Nav/Finish */}
          <div className="fixed bottom-6 right-6 z-50">
            {currentStep >= 4 ? (
              <Button variant="secondary" size="lg" className="px-6" onClick={handleFinishLesson} disabled={isCompleting}>
                {isCompleting ? "Completing..." : "Next: Lesson →"}
              </Button>
            ) : null}
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
