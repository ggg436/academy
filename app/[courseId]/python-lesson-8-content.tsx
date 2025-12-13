"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson8Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
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
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">What is a Variable?</h3>
              <p className="text-neutral-700">A variable is like a box 🗳️ that stores information. You give the box a name and put data inside it.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1</p>
                  <CodeSnippet language="python" code={`age = 20\nprint(age)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`20`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 2</p>
                  <CodeSnippet language="python" code={`name = "Ram"\nprint("My name is", name)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`My name is Ram`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 3</p>
                  <CodeSnippet language="python" code={`pi = 3.14\nprint("Value of pi:", pi)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Value of pi: 3.14`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"YouTube stores each video’s views in a variable like view_count."} fun={"Variables are like nicknames — easier than calling someone by their full Aadhaar number 😂."} />
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Rules for Variable Names</h3>
              <ul className="list-disc ml-6 text-neutral-700 space-y-2">
                <li>Start with a letter or underscore _.</li>
                <li>Cannot start with a number.</li>
                <li>Only letters, numbers, and underscores.</li>
                <li>Case-sensitive → Python ≠ python.</li>
              </ul>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1 (Valid)</p>
                  <CodeSnippet language="python" code={`student_name = "Sita"\n_age = 25\ncity2 = "Kathmandu"`} onRun={handleTryNow} />
                </div>
                <div>
                  <p className="text-red-600 font-semibold text-base mb-3">❌ Example 2 (Invalid)</p>
                  <CodeSnippet language="python" code={`2city = "Pokhara"`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`SyntaxError: invalid syntax`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 3 (Case-sensitive)</p>
                  <CodeSnippet language="python" code={`Name = "Hari"\nname = "Shyam"\nprint(Name)\nprint(name)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Hari\nShyam`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Proper names make teamwork coding easier."} fun={"Bad names are like saving mom’s contact as \"LevelBossFinal\" 😂."} />
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">What are Data Types?</h3>
              <p className="text-neutral-700">Data types = kind of data stored.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1</p>
                  <CodeSnippet language="python" code={`age = 21        # int\nheight = 5.9    # float\nprint(age, height)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`21 5.9`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 2</p>
                  <CodeSnippet language="python" code={`name = "Asha"   # string\nprint("Hello", name)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Hello Asha`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 3</p>
                  <CodeSnippet language="python" code={`is_student = True\nprint("Student:", is_student)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Student: True`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Banks must use correct data types → balance as float, not string."} fun={"Wrong type is like asking your fridge the time 🕒 😂."} />
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Checking Data Types with type()</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1</p>
                  <CodeSnippet language="python" code={`x = 10\nprint(type(x))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`<class 'int'>`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 2</p>
                  <CodeSnippet language="python" code={`y = "Python"\nprint(type(y))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`<class 'str'>`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 3</p>
                  <CodeSnippet language="python" code={`z = 3.14\nprint(type(z))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`<class 'float'>`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"type() is used a lot in debugging and teaching."} fun={"type() is like asking “Bro, what’s your vibe — chill or angry?” 😂."} />
            </div>
          )}

          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Changing Variable Values</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1</p>
                  <CodeSnippet language="python" code={`score = 50\nscore = 75\nprint(score)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`75`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 2</p>
                  <CodeSnippet language="python" code={`language = "Python"\nlanguage = "Java"\nprint(language)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Java`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 3</p>
                  <CodeSnippet language="python" code={`x = 10\nprint(x)\nx = x + 5\nprint(x)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`10\n15`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Games (like FIFA) update score, time_left every second."} fun={"Variables change moods faster than your ex 😂."} />
            </div>
          )}

          {currentStep === 6 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Assigning Multiple Variables</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 1</p>
                  <CodeSnippet language="python" code={`x, y, z = 5, 10, 15\nprint(x, y, z)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`5 10 15`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 2 (Same value to all)</p>
                  <CodeSnippet language="python" code={`a = b = c = "Python"\nprint(a, b, c)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Python Python Python`} /></div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-base mb-3">✅ Example 3 (Mixing types)</p>
                  <CodeSnippet language="python" code={`name, age, gpa = "Sita", 21, 3.8\nprint(name, age, gpa)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Sita 21 3.8`} /></div>
                </div>
              </div>

              <MotivationFun motivation={"Saves time when initializing many values."} fun={"Like one teacher giving the same homework to the whole class 😂."} />
            </div>
          )}

          {/* Next Button */}
          {(() => {
            const slugs = [
              "python-variables-intro",
              "python-variable-rules",
              "python-data-types",
              "python-checking-type",
              "python-changing-variables",
              "python-multiple-assignment",
              "python-variables-practice",
              "python-variables-quiz",
            ];
            const labels = [
              "Next: Rules for Variable Names →",
              "Next: Data Types →",
              "Next: Checking type() →",
              "Next: Changing Values →",
              "Next: Multiple Assignment →",
              "Next: Practice →",
              "Next: Quiz →",
            ];
            const hasNext = currentStep >= 1 && currentStep <= slugs.length - 1;
            if (!hasNext) return null;
            const nextSlug = slugs[currentStep - 1];
            const nextLabel = labels[currentStep - 1] || "Next →";
            return <LessonNextButton href={`/lesson/lesson-8/${nextSlug}`} label={nextLabel} />;
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
