"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson12Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState("");

  const handleTryNow = (code: string) => { setRunnerCode(code); setRunnerOpen(true); };

  // Per-step page title mirroring sidebar naming
  const pageTitleMap: Record<number, string> = {
    1: "Python Boolean",
    2: "Python Comparison Operators", 
    3: "Python Boolean with Numbers & Strings",
    4: "Python Logical Operators",
    5: "Python Boolean in If Conditions",
    6: "Python Practice",
  };
  const pageTitle = pageTitleMap[currentStep] || "Python Lesson";

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative pb-32">
          <div className="text-left mt-4">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{pageTitle}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">What is boolean in python?</h3>
              <p className="text-neutral-700">A <strong>Boolean</strong> (named after George Boole, a mathematician) is the simplest data type in Python. It has only <strong>two possible values</strong>:</p>
              
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li><code className="bg-gray-100 px-2 py-1 rounded">True</code> </li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">False</code> </li>
              </ul>

              <p className="text-neutral-700">Booleans are the foundation of <strong>decision-making</strong> in programming.</p>
              
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>Every time a program needs to make a choice (Yes/No, On/Off, 1/0), Booleans come into play.</li>
                <li>They answer logical questions like: <em>"Is this number bigger than that one?"</em>, <em>"Did the user enter a password?"</em></li>
              </ul>

              <p className="text-blue-600 font-semibold"> Think of Boolean as a <strong>switch</strong>: ON (<code>True</code>) or OFF (<code>False</code>).</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 1 (Direct Boolean values)</p>
                  <CodeSnippet language="python" code={`x = True\ny = False\nprint(x, y)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`True False`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 2 (Check type)</p>
                  <CodeSnippet language="python" code={`print(type(True))\nprint(type(False))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`<class 'bool'>\n<class 'bool'>`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 3 (Boolean in conditions)</p>
                  <CodeSnippet language="python" code={`print(5 > 3)\nprint(10 == 2)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`True\nFalse`} /></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Motivation:</strong> Every time you log in to Facebook, the system checks <code>password == correctPassword</code>. That's a Boolean check.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700"><strong> Fun:</strong> Boolean is like your mom's question: "Have you eaten?"  Only <strong>Yes or No</strong> </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Comparison operators</h3>
              <p className="text-neutral-700">Comparison operators are used to <strong>compare two values</strong>. They always return a <strong>Boolean result</strong> (<code>True</code> or <code>False</code>).</p>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Operator</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Meaning</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Example</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>==</code></td><td className="border border-gray-300 px-4 py-2">Equal to</td><td className="border border-gray-300 px-4 py-2"><code>5 == 5</code></td><td className="border border-gray-300 px-4 py-2">True</td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>!=</code></td><td className="border border-gray-300 px-4 py-2">Not equal to</td><td className="border border-gray-300 px-4 py-2"><code>5 != 3</code></td><td className="border border-gray-300 px-4 py-2">True</td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>&gt;</code></td><td className="border border-gray-300 px-4 py-2">Greater than</td><td className="border border-gray-300 px-4 py-2"><code>10 &gt; 7</code></td><td className="border border-gray-300 px-4 py-2">True</td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>&lt;</code></td><td className="border border-gray-300 px-4 py-2">Less than</td><td className="border border-gray-300 px-4 py-2"><code>2 &lt; 5</code></td><td className="border border-gray-300 px-4 py-2">True</td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>&gt;=</code></td><td className="border border-gray-300 px-4 py-2">Greater or equal to</td><td className="border border-gray-300 px-4 py-2"><code>5 &gt;= 5</code></td><td className="border border-gray-300 px-4 py-2">True</td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>&lt;=</code></td><td className="border border-gray-300 px-4 py-2">Less or equal to</td><td className="border border-gray-300 px-4 py-2"><code>3 &lt;= 7</code></td><td className="border border-gray-300 px-4 py-2">True</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 1 (Equality & Inequality)</p>
                  <CodeSnippet language="python" code={`print(10 == 10)\nprint(10 != 5)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`True\nTrue`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 2 (Greater / Less)</p>
                  <CodeSnippet language="python" code={`print(7 > 9)\nprint(7 < 9)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`False\nTrue`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 3 (With variables)</p>
                  <CodeSnippet language="python" code={`a = 20\nb = 15\nprint(a >= b)\nprint(a <= b)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`True\nFalse`} /></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Real-Life Analogy:</strong></p>
                <ul className="list-disc pl-6 text-blue-700 mt-2 space-y-1">
                  <li><code>age >= 18</code>  Can you vote?</li>
                  <li><code>marks >= 40</code>  Did you pass the exam?</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Motivation:</strong> Used in ATM to check <code>balance >= withdraw_amount</code>.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700"><strong> Fun:</strong> Comparison is like comparing cricket scores with friends   who hit more runs? </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Boolean with numbers & strings</h3>
              <p className="text-neutral-700">Python allows checking Booleans on <strong>numbers, strings, or any data</strong>.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 1 (Numbers)</p>
                  <CodeSnippet language="python" code={`print(bool(0))\nprint(bool(5))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`False\nTrue`} /></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2">
                    <p className="text-gray-700"><strong> Rule:</strong></p>
                    <ul className="list-disc pl-6 text-gray-700 mt-1">
                      <li><code>0</code> = False</li>
                      <li>Any non-zero = True</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 2 (Strings)</p>
                  <CodeSnippet language="python" code={`print(bool(""))\nprint(bool("Hello"))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`False\nTrue`} /></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2">
                    <p className="text-gray-700"><strong> Rule:</strong></p>
                    <ul className="list-disc pl-6 text-gray-700 mt-1">
                      <li>Empty string (<code>""</code>) = False</li>
                      <li>Any non-empty string = True</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 3 (Variables in check)</p>
                  <CodeSnippet language="python" code={`username = "Ram"\nprint(bool(username))   # Non-empty  True`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`True`} /></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Real-Life Analogy:</strong></p>
                <ul className="list-disc pl-6 text-blue-700 mt-2 space-y-1">
                  <li>Empty glass = False </li>
                  <li>Glass with water = True </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Motivation:</strong> Used in websites  if <code>username != ""</code> and <code>password != ""</code>  allow login.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700"><strong> Fun:</strong> Empty plate = False, Full plate = True </p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Logical operators</h3>
              <p className="text-neutral-700">We can <strong>combine multiple Boolean expressions</strong> using logical operators:</p>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Operator</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Meaning</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Example</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>and</code></td><td className="border border-gray-300 px-4 py-2">True if <strong>both</strong> conditions True</td><td className="border border-gray-300 px-4 py-2"><code>(5 &gt; 3 and 7 &gt; 2)</code></td><td className="border border-gray-300 px-4 py-2">True</td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>or</code></td><td className="border border-gray-300 px-4 py-2">True if <strong>at least one</strong> condition True</td><td className="border border-gray-300 px-4 py-2"><code>(5 &gt; 3 or 2 &gt; 9)</code></td><td className="border border-gray-300 px-4 py-2">True</td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>not</code></td><td className="border border-gray-300 px-4 py-2">Reverses result (True  False, False  True)</td><td className="border border-gray-300 px-4 py-2"><code>not(5 &gt; 3)</code></td><td className="border border-gray-300 px-4 py-2">False</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 1 (<code>and</code>)</p>
                  <CodeSnippet language="python" code={`age = 20\ncitizen = True\nprint(age >= 18 and citizen == True)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`True`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 2 (<code>or</code>)</p>
                  <CodeSnippet language="python" code={`has_ticket = False\nis_vip = True\nprint(has_ticket or is_vip)`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`True`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 3 (<code>not</code>)</p>
                  <CodeSnippet language="python" code={`print(not True)\nprint(not (5 > 2))`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`False\nFalse`} /></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Real-Life Analogy:</strong></p>
                <ul className="list-disc pl-6 text-blue-700 mt-2 space-y-1">
                  <li><code>and</code>  You can drive if you are <strong>18+ AND have a license</strong>.</li>
                  <li><code>or</code>  You can enter if you are a <strong>student OR a teacher</strong>.</li>
                  <li><code>not</code>  Like saying <em>"I'm not hungry"</em>.</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Motivation:</strong> Used in shopping apps  "Apply discount if user is Prime <strong>and</strong> cart total  1000".</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700"><strong> Fun:</strong> <code>not</code> is like saying "Not today, bro!" </p>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Boolean in if conditions</h3>
              <p className="text-neutral-700">Most commonly, Booleans are used inside <strong>if statements</strong>.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 1</p>
                  <CodeSnippet language="python" code={`x = 10\nif x > 5:\n    print("x is greater than 5")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`x is greater than 5`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 2</p>
                  <CodeSnippet language="python" code={`password = "1234"\nif password == "1234":\n    print("Access granted")\nelse:\n    print("Access denied")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Access granted`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 3</p>
                  <CodeSnippet language="python" code={`marks = 35\nif marks >= 40:\n    print("Pass")\nelse:\n    print("Fail")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Fail`} /></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Real-Life Analogy:</strong> Like doors with access cards  If <code>card == valid</code>  open door.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Motivation:</strong> Every app uses <code>if</code> + Boolean to decide actions  (login success, checkout allowed, etc.).</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700"><strong> Fun:</strong> If you pass = Happy , else = Sad .</p>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Practice problems</h3>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-4"> Practice Problems (Subjective)</h4>
                <ol className="list-decimal pl-6 text-green-700 space-y-3">
                  <li>Check whether a number is greater than 50 or not.</li>
                  <li>Write a program to see if someone is eligible to vote (age  18).</li>
                  <li>Use <code>and</code> operator to check: is age  18 <strong>and</strong> country == "Nepal".</li>
                  <li>Create a program that prints <code>"Login Successful"</code> only if username and password are not empty.</li>
                  <li>Use <code>not</code> operator to flip the result of a condition.</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-4"> Quiz</h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-3">(A) MCQs</h5>
                    <ol className="list-decimal pl-6 text-blue-700 space-y-2">
                      <li>Boolean values in Python are:
                        <br />a) Yes / No
                        <br />b) True / False
                        <br />c) 1 / 0
                        <br />d) All of the above
                      </li>
                      <li>What is the result of <code>7 != 7</code>?
                        <br />a) True
                        <br />b) False
                        <br />c) Error
                        <br />d) None
                      </li>
                      <li>Which operator checks if two values are equal?
                        <br />a) <code>=</code>
                        <br />b) <code>==</code>
                        <br />c) <code>!=</code>
                        <br />d) <code>equals</code>
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="font-semibold text-blue-700 mb-3">(B) Fill in the blanks</h5>
                    <ol className="list-decimal pl-6 text-blue-700 space-y-2">
                      <li><code>bool("")</code> returns __________.</li>
                      <li>Comparison operators always return __________.</li>
                      <li>To reverse a Boolean value, we use __________ operator.</li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="font-semibold text-blue-700 mb-3">(C) Output Based</h5>
                    <div className="space-y-4">
                      <div>
                        <p className="text-blue-700">1.</p>
                        <CodeSnippet language="python" code={`print(10 > 5 and 2 > 3)`} />
                      </div>
                      <div>
                        <p className="text-blue-700">2.</p>
                        <CodeSnippet language="python" code={`print(bool(0))`} />
                      </div>
                      <div>
                        <p className="text-blue-700">3.</p>
                        <CodeSnippet language="python" code={`x = "Python"\nprint(x == "python")`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700"><strong> Lesson 12 Finalized</strong></p>
                <ul className="list-disc pl-6 text-green-700 mt-2 space-y-1">
                  <li>Explained <strong>Booleans</strong> with meaning.</li>
                  <li>Detailed <strong>comparison operators</strong> with table + examples.</li>
                  <li>Covered Booleans in numbers, strings, logic combinations, and if conditions.</li>
                  <li>Added <strong>real-life use cases + fun lines </strong>.</li>
                </ul>
              </div>
            </div>
          )}

          {(() => {
            const slugs = [
              "python-boolean-intro",
              "python-comparison-operators", 
              "python-boolean-numbers-strings",
              "python-logical-operators",
              "python-boolean-if-conditions",
              "python-boolean-practice",
              "python-boolean-quiz",
            ];
            const labels = [
              "Next: Comparison Operators ",
              "Next: Boolean with Numbers & Strings ", 
              "Next: Logical Operators ",
              "Next: Boolean in If Conditions ",
              "Next: Practice ",
              "Next: Quiz ",
            ];
            const hasNext = currentStep >= 1 && currentStep < slugs.length;
            if (!hasNext) return null;
            const nextSlug = slugs[currentStep];
            const nextLabel = labels[currentStep] || "Next ";
            return <LessonNextButton href={`/lesson/lesson-12/${nextSlug}`} label={nextLabel} />;
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
