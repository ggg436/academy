"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson9Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState("");

  const handleTryNow = (code: string) => {
    setRunnerCode(code);
    setRunnerOpen(true);
  };

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative pb-32">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{lessonTitle}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">What is a String?</h3>
              <p className="text-neutral-700">A string is a sequence of characters inside quotes. Used for text in programs. Use single quotes, double quotes, or triple quotes for multi‑line text.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1</p>
                  <CodeSnippet language="python" code={`name = "Sita"\nprint(name)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Sita`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 2</p>
                  <CodeSnippet language="python" code={`message = 'Hello, World!'\nprint(message)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Hello, World!`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 3 (Multi-line)</p>
                  <CodeSnippet language="python" code={`note = """This is\na multi-line\nstring"""\nprint(note)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`This is\na multi-line\nstring`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"WhatsApp chats, Instagram captions, YouTube comments → all are strings in Python programs."} fun={"Strings are like gossip messages 📱 — sometimes short, sometimes long, but always text 😂."} />
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Quotes in Strings</h3>
              <p className="text-neutral-700">Use single or double quotes; be consistent. Triple quotes allow multi‑line strings.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1 (Single quotes)</p>
                  <CodeSnippet language="python" code={`word = 'Python'\nprint(word)`} onRun={handleTryNow} />
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 2 (Double quotes)</p>
                  <CodeSnippet language="python" code={`sentence = "Learning Python is fun!"\nprint(sentence)`} onRun={handleTryNow} />
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 3 (Mixing quotes inside)</p>
                  <CodeSnippet language="python" code={`quote = "She said 'Hello!'"\nprint(quote)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`She said 'Hello!'`} /></div>
                </div>
                <div>
                  <p className="text-red-600 font-semibold text-base mb-3">❌ Error Example (Unmatched quotes)</p>
                  <CodeSnippet language="python" code={`bad = 'Python"`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`SyntaxError: EOL while scanning string literal`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Quotes make strings flexible → you can store dialogues, sentences, or book titles easily."} fun={"Forgetting to close quotes is like leaving your house door open 🚪😂."} />
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">String Concatenation (Joining)</h3>
              <p className="text-neutral-700">Use <code>+</code> to join strings. Convert numbers using <code>str()</code> before concatenation.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1</p>
                  <CodeSnippet language="python" code={`first = "Hello"\nsecond = "World"\nprint(first + " " + second)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Hello World`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 2</p>
                  <CodeSnippet language="python" code={`a = "I love "\nb = "Python"\nprint(a + b)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`I love Python`} /></div>
                </div>
                <div>
                  <p className="text-red-600 font-semibold text-base mb-3">❌ Example 3 (Number error)</p>
                  <CodeSnippet language="python" code={`name = "Ram"\nage = 20\nprint(name + " is " + age + " years old")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`TypeError: can only concatenate str (not "int") to str`} /></div>
                  <p className="text-neutral-700">👉 Solution: <code>str(age)</code></p>
                  <CodeSnippet language="python" code={`print(name + " is " + str(age) + " years old")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Ram is 20 years old`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Apps like Amazon join strings → \"Price: Rs.\" + str(price)."} fun={"Concatenation is like mixing tea + milk ☕+🥛😂."} />
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">String Repetition</h3>
              <p className="text-neutral-700">Multiply string by a number using <code>*</code>.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1</p>
                  <CodeSnippet language="python" code={`laugh = "Ha"\nprint(laugh * 3)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`HaHaHa`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 2</p>
                  <CodeSnippet language="python" code={`line = "-="\nprint(line * 10)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`-=-=-=-=-=-=-=-=-=-`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 3</p>
                  <CodeSnippet language="python" code={`word = "Python "\nprint(word * 5)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Python Python Python Python Python `} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Repetition is used for formatting, banners, or testing outputs."} fun={"Like your mom repeating \"Padhaai gar!\" 100 times 😂."} />
            </div>
          )}

          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">String Indexing (Positions)</h3>
              <p className="text-neutral-700">Each character has a position starting from 0. Use <code>[index]</code> to access.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1</p>
                  <CodeSnippet language="python" code={`text = "Python"\nprint(text[0])`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`P`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 2</p>
                  <CodeSnippet language="python" code={`text = "Python"\nprint(text[3])`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`h`} /></div>
                </div>
                <div>
                  <p className="text-red-600 font-semibold text-base mb-3">❌ Example 3 (Out of range)</p>
                  <CodeSnippet language="python" code={`text = "Python"\nprint(text[10])`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`IndexError: string index out of range`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Instagram might access the first letter of your username for initials in profile pic."} fun={"Indexing is like asking for the 3rd slice of pizza 🍕😂."} />
            </div>
          )}

          {/* Next Button */}
          {(() => {
            const slugs = [
              "python-strings-intro",
              "python-quotes",
              "python-concatenation",
              "python-repetition",
              "python-indexing",
              "python-strings-practice",
              "python-strings-quiz",
            ];
            const labels = [
              "Next: Quotes in Strings →",
              "Next: Concatenation →",
              "Next: Repetition →",
              "Next: Indexing →",
              "Next: Practice →",
              "Next: Quiz →",
            ];
            const hasNext = currentStep >= 1 && currentStep <= slugs.length - 1;
            if (!hasNext) return null;
            const nextSlug = slugs[currentStep - 1];
            const nextLabel = labels[currentStep - 1] || "Next →";
            return <LessonNextButton href={`/lesson/lesson-9/${nextSlug}`} label={nextLabel} />;
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
