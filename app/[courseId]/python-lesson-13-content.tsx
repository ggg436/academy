"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson13Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState("");

  const handleTryNow = (code: string) => { setRunnerCode(code); setRunnerOpen(true); };

  // Per-step page title mirroring sidebar naming
  const pageTitleMap: Record<number, string> = {
    1: "Python If Statement",
    2: "Python Else Statement", 
    3: "Python Elif Statement",
    4: "Python Nested If",
    5: "Python Practice",
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
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">What is if?</h3>
              <p className="text-neutral-700">The <strong><code>if</code> statement</strong> is how Python makes <strong>decisions</strong>.</p>

              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>It checks a <strong>condition</strong> (becomes True or False).</li>
                <li>If the condition is <strong>True</strong>, the block under it runs.</li>
                <li>If the condition is <strong>False</strong>, Python skips that block.</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700">👉 In simple words: <br/> <strong>if</strong> is like asking a <strong>Yes/No</strong> question. If the answer is <strong>Yes (True)</strong> → do something. If <strong>No (False)</strong> → do nothing.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 1: Basic If</p>
                  <CodeSnippet language="python" code={`age = 20\nif age >= 18:\n    print("You can vote")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`You can vote`} /></div>
                  <p className="text-neutral-700 mt-2">Here, condition = <code>age &gt;= 18</code> → True, so Python runs the inside code.</p>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 2: When Condition is False</p>
                  <CodeSnippet language="python" code={`age = 15\nif age >= 18:\n    print("You can vote")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`(no output, condition is False)`} /></div>
                  <p className="text-neutral-700 mt-2">Since the condition is False, Python just <strong>skips</strong> the block.</p>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 3: Real-Life If</p>
                  <CodeSnippet language="python" code={`temperature = 30\nif temperature > 25:\n    print("Turn on AC")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Turn on AC`} /></div>
                  <p className="text-neutral-700 mt-2">Condition checked: <code>temperature &gt; 25</code> → True. So, AC is turned on.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Part</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Meaning</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>if</code></td><td className="border border-gray-300 px-4 py-2">Python keyword to start decision-making</td><td className="border border-gray-300 px-4 py-2"><code>if age &gt;= 18:</code></td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>condition</code></td><td className="border border-gray-300 px-4 py-2">Expression that becomes True/False</td><td className="border border-gray-300 px-4 py-2"><code>age &gt;= 18</code></td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>:</code></td><td className="border border-gray-300 px-4 py-2">Tells Python: “Now I’ll give you the block of code”</td><td className="border border-gray-300 px-4 py-2"><code>if age &gt;= 18:</code></td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><strong>Indentation</strong></td><td className="border border-gray-300 px-4 py-2">Space before code → defines block (usually 4 spaces)</td><td className="border border-gray-300 px-4 py-2"><code>print("You can vote")</code></td></tr>
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-sm font-semibold text-red-600 mb-2">⚠️ Common Error Example</p>
                <CodeSnippet language="python" code={`if age >= 18\n    print("You can vote")`} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`SyntaxError: expected ':'`} /></div>
                <p className="text-neutral-700 mt-2">Reason: You forgot the <code>:</code> at the end of <code>if</code>.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong>💡 Motivation:</strong> When you open YouTube: If you are logged in → show personalized feed. If not → show general homepage. That’s literally an <code>if</code> in action.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700"><strong>😂 Fun:</strong> <code>if hungry: eat pizza 🍕</code><br/>Else → cry silently with Maggi noodles 😂</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">What is else?</h3>
              <p className="text-neutral-700">The <strong><code>else</code> statement</strong> is the <strong>backup plan</strong> for your <code>if</code>.</p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>If the <code>if</code> condition is <strong>True</strong> → run the <code>if</code> block.</li>
                <li>If the <code>if</code> condition is <strong>False</strong> → run the <code>else</code> block.</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700">👉 Think of it like this: <br/> <strong>If the shop is open → buy snacks.</strong><br/> <strong>Else (shop is closed) → go home hungry.</strong> <br/>So, <code>else</code> always catches the case when <code>if</code> fails.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 1: Voting Example</p>
                  <CodeSnippet language="python" code={`age = 15\nif age >= 18:\n    print("You can vote")\nelse:\n    print("You cannot vote")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`You cannot vote`} /></div>
                  <p className="text-neutral-700 mt-2">Since <code>age &gt;= 18</code> is False, the <code>else</code> block runs.</p>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 2: Login Example</p>
                  <CodeSnippet language="python" code={`password = "admin"\nif password == "1234":\n    print("Access Granted")\nelse:\n    print("Access Denied")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Access Denied`} /></div>
                  <p className="text-neutral-700 mt-2">If password matches → grant access. <strong>Else</strong> → block.</p>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2">✅ Example 3: Shopping Example</p>
                  <CodeSnippet language="python" code={`cart_total = 200\nif cart_total >= 500:\n    print("Free Delivery")\nelse:\n    print("Delivery charge applied")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Delivery charge applied`} /></div>
                  <p className="text-neutral-700 mt-2">If cart &ge; 500, free delivery. <strong>Else</strong>, pay extra.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Part</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Meaning</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>if</code></td><td className="border border-gray-300 px-4 py-2">Checks condition</td><td className="border border-gray-300 px-4 py-2"><code>if age &gt;= 18:</code></td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>else</code></td><td className="border border-gray-300 px-4 py-2">Runs only if condition is False</td><td className="border border-gray-300 px-4 py-2"><code>else:</code></td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><code>:</code></td><td className="border border-gray-300 px-4 py-2">Colon needed at end</td><td className="border border-gray-300 px-4 py-2"><code>else:</code></td></tr>
                    <tr><td className="border border-gray-300 px-4 py-2"><strong>Indentation</strong></td><td className="border border-gray-300 px-4 py-2">Defines block under else</td><td className="border border-gray-300 px-4 py-2"><code>print("You cannot vote")</code></td></tr>
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-sm font-semibold text-red-600 mb-2">⚠️ Common Error Example</p>
                <CodeSnippet language="python" code={`age = 15\nif age >= 18:\n    print("You can vote")\nelse\n    print("You cannot vote")`} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`SyntaxError: expected ':'`} /></div>
                <p className="text-neutral-700 mt-2">Reason: Forgot colon (<code>:</code>) after <code>else</code>.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong>💡 Motivation:</strong> Every website uses <code>else</code>. Example: If user enters correct OTP → allow login. Else → show "Invalid OTP".</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700"><strong>😂 Fun:</strong> If exam passed → celebrate 🎉<br/>Else → hide report card under the bed 😂</p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">What is elif?</h3>
              <p className="text-blue-600 font-semibold"> <strong><code>elif</code> means "else if"</strong>.</p>
              
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>It is used when we want to check <strong>multiple conditions</strong>.</li>
                <li>Python checks conditions <strong>top to bottom</strong>.</li>
                <li>First condition that is <code>True</code> gets executed  others are skipped.</li>
              </ul>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 1 (Grades)</p>
                  <CodeSnippet language="python" code={`marks = 75\nif marks >= 90:\n    print("Grade A")\nelif marks >= 75:\n    print("Grade B")\nelif marks >= 50:\n    print("Grade C")\nelse:\n    print("Fail")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Grade B`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 2 (Weather App)</p>
                  <CodeSnippet language="python" code={`temp = 15\nif temp > 30:\n    print("Hot Day")\nelif temp > 20:\n    print("Warm Day")\nelif temp > 10:\n    print("Cool Day")\nelse:\n    print("Cold Day")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Cool Day`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 3 (Menu Choice)</p>
                  <CodeSnippet language="python" code={`choice = 2\nif choice == 1:\n    print("Pizza")\nelif choice == 2:\n    print("Burger")\nelif choice == 3:\n    print("Pasta")\nelse:\n    print("Invalid choice")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Burger`} /></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Real-Life:</strong> Food delivery app checks <strong>location</strong>  if inside Kathmandu, elif inside Pokhara, else outside delivery zone.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Motivation:</strong> Netflix checks  <em>If premium user show 4K, elif standard show HD, else show SD.</em></p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700"><strong> Fun:</strong> If mom cooks   elif dad cooks   else  order food </p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Nested if</h3>
              <p className="text-blue-600 font-semibold"> Sometimes you need an <strong>if inside another if</strong>  called <strong>nested if</strong>.</p>

              <div className="space-y-6">
                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 1</p>
                  <CodeSnippet language="python" code={`age = 20\ncitizen = "Nepal"\n\nif age >= 18:\n    if citizen == "Nepal":\n        print("You can vote in Nepal")\n    else:\n        print("Not a Nepal citizen")\nelse:\n    print("Too young to vote")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`You can vote in Nepal`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 2 (ATM Withdrawal)</p>
                  <CodeSnippet language="python" code={`balance = 1000\nwithdraw = 500\n\nif withdraw <= balance:\n    if withdraw % 100 == 0:\n        print("Please collect cash")\n    else:\n        print("Amount must be multiple of 100")\nelse:\n    print("Insufficient Balance")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Please collect cash`} /></div>
                </div>

                <div>
                  <p className="text-green-600 font-semibold text-base mb-2"> Example 3 (School Rules)</p>
                  <CodeSnippet language="python" code={`student = "Ram"\nmarks = 45\n\nif student == "Ram":\n    if marks >= 40:\n        print("Ram Passed")\n    else:\n        print("Ram Failed")`} onRun={handleTryNow} />
                  <div className="mt-2"><CodeSnippet isOutput language="output" code={`Ram Passed`} /></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700"><strong> Motivation:</strong> Nested if used in banking apps  <em>If user logged in  if OTP correct  allow transaction</em>.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700"><strong> Fun:</strong> Nested if = like mom asking: "Did you study?"  If yes, "Did you study math?" </p>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Practice problems</h3>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-4"> Practice Problems (Subjective)</h4>
                <ol className="list-decimal pl-6 text-green-700 space-y-3">
                  <li>Write a program that checks if a number is positive, negative, or zero.</li>
                  <li>Write a program that prints the grade of a student based on marks (A, B, C, Fail).</li>
                  <li>Create a program to check eligibility for driving: age  18 and has_license = True.</li>
                  <li>Use nested if: Check if a number is even, and also check if it's greater than 50.</li>
                  <li>Menu-driven program: If user enters 1  Tea, 2  Coffee, 3  Juice, else Invalid.</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-4"> Quiz</h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-3">(A) MCQs</h5>
                    <ol className="list-decimal pl-6 text-blue-700 space-y-2">
                      <li>Which keyword is used for multiple conditions?
                        <br />a) if
                        <br />b) else
                        <br />c) elif
                        <br />d) elseif
                      </li>
                      <li>What will be the output?
                        <br /><code>x = 5<br />if x &gt; 10:<br />    print("A")<br />else:<br />    print("B")</code>
                        <br />a) A
                        <br />b) B
                        <br />c) Error
                        <br />d) None
                      </li>
                      <li>Which statement is correct about indentation?
                        <br />a) Not required in Python
                        <br />b) Required after if, elif, else
                        <br />c) Only optional
                        <br />d) Used only in loops
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="font-semibold text-blue-700 mb-3">(B) Fill in the blanks</h5>
                    <ol className="list-decimal pl-6 text-blue-700 space-y-2">
                      <li><code>elif</code> stands for __________.</li>
                      <li>A block of code inside if must be __________ correctly.</li>
                      <li>Nested if means an if inside __________.</li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="font-semibold text-blue-700 mb-3">(C) Output Based</h5>
                    <div className="space-y-4">
                      <div>
                        <p className="text-blue-700">1.</p>
                        <CodeSnippet language="python" code={`marks = 35\nif marks >= 40:\n    print("Pass")\nelse:\n    print("Fail")`} />
                      </div>
                      <div>
                        <p className="text-blue-700">2.</p>
                        <CodeSnippet language="python" code={`temp = 5\nif temp > 20:\n    print("Hot")\nelif temp > 10:\n    print("Warm")\nelse:\n    print("Cold")`} />
                      </div>
                      <div>
                        <p className="text-blue-700">3.</p>
                        <CodeSnippet language="python" code={`x = 10\nif x > 5:\n    if x > 15:\n        print("Big")\n    else:\n        print("Medium")`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700"><strong> Lesson 13 Complete</strong>  Deep explanation of <strong>if, else, elif, nested if</strong>, with real-life analogies, tables, examples, motivation  and fun .</p>
              </div>
            </div>
          )}

          {(() => {
            const slugs = [
              "python-conditionals-if",
              "python-conditionals-else", 
              "python-conditionals-elif",
              "python-conditionals-nested-if",
              "python-conditionals-practice",
              "python-conditionals-quiz",
            ];
            const labels = [
              "Next: Else Statement ",
              "Next: Elif Statement ", 
              "Next: Nested If ",
              "Next: Practice ",
              "Next: Quiz ",
            ];
            const hasNext = currentStep >= 1 && currentStep < slugs.length;
            if (!hasNext) return null;
            const nextSlug = slugs[currentStep];
            const nextLabel = labels[currentStep] || "Next ";
            return <LessonNextButton href={`/lesson/lesson-13/${nextSlug}`} label={nextLabel} />;
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
