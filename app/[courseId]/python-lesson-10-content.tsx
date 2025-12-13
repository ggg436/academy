"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson10Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState("");

  const handleTryNow = (code: string) => { setRunnerCode(code); setRunnerOpen(true); };

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative pb-32">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{lessonTitle}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">String Slicing (Cutting Strings)</h3>
              <p className="text-neutral-700">Just like cutting a cake 🎂 into slices, Python allows you to cut strings into parts using slicing.</p>
              <div className="bg-slate-50 rounded-lg border p-4 text-sm text-slate-700"><code>string[start:end]</code> — start is inclusive, end is exclusive. Leaving start means from beginning; leaving end means till the end.</div>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 1 (Basic slice)</p>
                  <CodeSnippet language="python" code={`text = "Python"\nprint(text[0:4])`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Pyth`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 2 (Omitting start)</p>
                  <CodeSnippet language="python" code={`text = "Python"\nprint(text[:3])`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Pyt`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 3 (Omitting end)</p>
                  <CodeSnippet language="python" code={`text = "Python"\nprint(text[2:])`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`thon`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Slicing is used in apps like Instagram to show only the first few characters of captions."} fun={"Slicing is like cutting your friend’s birthday cake 🍰 — but only taking your favorite piece 😂."} />
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Negative Indexing in Strings</h3>
              <p className="text-neutral-700">Python allows negative indexes → counting from the end. <code>-1</code> is last character, <code>-2</code> is second last.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 1</p>
                  <CodeSnippet language="python" code={`text = "Python"\nprint(text[-1])`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`n`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 2</p>
                  <CodeSnippet language="python" code={`text = "Python"\nprint(text[-3:])`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`hon`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 3</p>
                  <CodeSnippet language="python" code={`text = "Python"\nprint(text[:-2])`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Pyth`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Great when you don’t know the string’s length but need the last few characters (like OTP codes)."} fun={"Negative indexing is like checking who’s at the back of the line 😂."} />
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Common String Methods</h3>
              <p className="text-neutral-700">Python provides many built‑in string methods. Below are the most used in real apps.</p>

              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-neutral-800">(a) .upper() & .lower()</h4>
                  <p className="text-neutral-700 mb-2">Change case of letters.</p>
                  <CodeSnippet language="python" code={`name = "python"\nprint(name.upper())\nprint("HELLO".lower())`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`PYTHON\nhello`} /></div>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800">(b) .strip()</h4>
                  <p className="text-neutral-700 mb-2">Removes extra spaces from start and end.</p>
                  <CodeSnippet language="python" code={`msg = "   Hello   "\nprint(msg.strip())\n`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Hello`} /></div>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800">(c) .replace(old, new)</h4>
                  <p className="text-neutral-700 mb-2">Replace part of the string.</p>
                  <CodeSnippet language="python" code={`text = "I love Java"\nprint(text.replace("Java", "Python"))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`I love Python`} /></div>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800">(d) .split()</h4>
                  <p className="text-neutral-700 mb-2">Split string into a list of words.</p>
                  <CodeSnippet language="python" code={`text = "apple,banana,cherry"\nprint(text.split(","))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`['apple', 'banana', 'cherry']`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Used in validations (upper/lower), cleaning inputs (strip), autocorrect (replace), and parsing text (split)."} fun={".replace() is like changing your ex’s name to Don’t Answer in your phone 😂."} />
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">String Length (len)</h3>
              <p className="text-neutral-700">Use <code>len()</code> to count characters (letters, digits, spaces).</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 1</p>
                  <CodeSnippet language="python" code={`word = "Python"\nprint(len(word))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`6`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 2</p>
                  <CodeSnippet language="python" code={`sentence = "I love programming"\nprint(len(sentence))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`18`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 3 (includes spaces!)</p>
                  <CodeSnippet language="python" code={`msg = "   Hi   "\nprint(len(msg))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`8`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Twitter checks if your tweet is under 280 chars using len()."} fun={"Counting length is like counting ladoos 🍬 at a festival 😂."} />
            </div>
          )}

          {/* Next Button */}
          {(() => {
            const slugs = [
              "python-slicing",
              "python-negative-indexing",
              "python-string-methods",
              "python-string-length",
              "python-strings-ops-practice",
              "python-strings-ops-quiz",
            ];
            const labels = [
              "Next: Negative Indexing →",
              "Next: Common Methods →",
              "Next: String Length →",
              "Next: Practice →",
              "Next: Quiz →",
            ];
            const hasNext = currentStep >= 1 && currentStep <= slugs.length - 1;
            if (!hasNext) return null;
            const nextSlug = slugs[currentStep - 1];
            const nextLabel = labels[currentStep - 1] || "Next →";
            return <LessonNextButton href={`/lesson/lesson-10/${nextSlug}`} label={nextLabel} />;
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
