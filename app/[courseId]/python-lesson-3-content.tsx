"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LessonNextButton } from "@/components/lesson-next-button";
import { useLanguage } from "@/contexts/language-context";
import { saveLessonCompleteServer } from "@/actions/progress";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MotivationFun } from "@/components/motivation-fun";
import PythonCodeRunner from "@/components/python-code-runner";

export const PythonLesson3Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
	const [isCompleting, setIsCompleting] = useState(false);
	const { language } = useLanguage();
	const [showHints, setShowHints] = useState(false);
	const [currentHint, setCurrentHint] = useState("");
	const [runnerOpen, setRunnerOpen] = useState(false);
	const [runnerCode, setRunnerCode] = useState("");

	const stepTitle = (
		currentStep === 1 ? "Python Variables" :
		currentStep === 2 ? "Python Variable Rules" :
		currentStep === 3 ? "Python Data Types" :
		currentStep === 4 ? "Python Dynamic Typing" :
		currentStep === 5 ? "Python Type Casting" :
		currentStep === 6 ? "Python Practice Problems" :
		"Python Quiz"
	);

	const handleFinishLesson = async () => {
		try {
			setIsCompleting(true);
			await saveLessonCompleteServer("python", "lesson-3", 25);
			window.location.href = "/lesson/lesson-4";
		} finally {
			setIsCompleting(false);
		}
	};

	const handleTryNow = (code: string) => {
		setRunnerCode(code);
		setRunnerOpen(true);
	};

	const openHints = (hint: string) => { setCurrentHint(hint); setShowHints(true); };
	const closeHints = () => { setShowHints(false); setCurrentHint(""); };

	return (
		<div className="flex-1">
			<div className="h-full flex flex-col">
				<div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
					<div className="text-left mt-4 ml-1">
						<h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{stepTitle}</h1>
					</div>

					{currentStep === 1 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">What is a Variable?</h3>
									<p className="text-neutral-700 mb-4">A variable is like a box with a name 🏷️ where we can store data (numbers, text, etc.). The box can be reused — we can change its value anytime. Variables make programs dynamic and powerful.</p>
									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
										<CodeSnippet language="python" code={`name = "Alice"\nage = 21\nprint(name)\nprint(age)`} onRun={handleTryNow} />
										<div className="mt-3">
											<Button onClick={() => handleTryNow('name = "Alice"\nage = 21\nprint(name)\nprint(age)')} variant="secondary" size="sm">TRY NOW</Button>
										</div>
									</div>
									<div className="space-y-2">
										<p className="text-neutral-800 font-semibold text-base">👉 Breakdown</p>
										<div className="overflow-x-auto">
											<table className="w-full text-sm text-left text-neutral-700 border border-gray-200 rounded-lg">
												<thead className="bg-gray-100 text-neutral-800">
													<tr>
														<th className="px-4 py-2 w-48">Part</th>
														<th className="px-4 py-2">Meaning</th>
													</tr>
												</thead>
												<tbody>
													<tr className="border-t">
														<td className="px-4 py-2 font-semibold whitespace-nowrap">name</td>
														<td className="px-4 py-2">Variable storing the text "Alice".</td>
													</tr>
													<tr className="border-t">
														<td className="px-4 py-2 font-semibold whitespace-nowrap">age</td>
														<td className="px-4 py-2">Variable storing the number 21.</td>
													</tr>
													<tr className="border-t">
														<td className="px-4 py-2 font-semibold whitespace-nowrap">=</td>
														<td className="px-4 py-2">Assignment operator (stores the value into the variable).</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div className="space-y-2 mt-6">
										<p className="text-blue-600 text-base">💡 Motivation: Instagram stores your username in a variable. YouTube stores video views in variables. Without variables, apps can’t remember anything.</p>
										<p className="text-purple-600 text-base">😂 Fun: A variable is like your fridge — you can put anything inside and later change it (milk → pizza 🍕).</p>
									</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 2 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">Rules for Variables</h3>
									<p className="text-neutral-700 mb-4">Python has some rules for variable names:</p>
									<ul className="text-neutral-700 list-disc ml-6 space-y-1 mb-6">
										<li>Must start with a letter or underscore _.</li>
										<li>Can’t start with a number.</li>
										<li>Can only contain letters, numbers, and underscores.</li>
										<li>Case sensitive → <span className="font-semibold">Name</span> ≠ <span className="font-semibold">name</span>.</li>
									</ul>
									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Correct Examples:</p>
										<CodeSnippet language="python" code={`student_name = "Bob"\n_age = 19\nscore1 = 95`} onRun={handleTryNow} />
										<div className="mt-3">
											<Button onClick={() => handleTryNow('student_name = "Bob"\n_age = 19\nscore1 = 95')} variant="secondary" size="sm">TRY NOW</Button>
										</div>
									</div>
									<div className="mb-8">
										<p className="text-red-600 font-semibold text-base mb-3">❌ Wrong Examples:</p>
										<CodeSnippet language="python" code={`1name = "John"   # starts with number\nstudent-name = "Mike"   # hyphen not allowed`} onRun={handleTryNow} />
										<div className="mt-3">
											<Button onClick={() => handleTryNow('1name = "John"\nstudent-name = "Mike"')} variant="secondary" size="sm">TRY NOW</Button>
										</div>
									</div>
									<div className="space-y-2">
										<p className="text-neutral-800 font-semibold text-base">Error:</p>
										<CodeSnippet isOutput language="output" code={`SyntaxError: invalid syntax`} />
									</div>
									<div className="space-y-2">
												<MotivationFun motivation={"Rules exist so Python always knows exactly what you mean. Imagine if two friends both had the exact same nickname — chaos!"} fun={"Don’t name your variables like xoxo_lovely_cutie_123 — Python doesn’t care, but your future self will hate you 😂."} />
									</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 3 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">Data Types in Python</h3>
									<p className="text-neutral-700 mb-4">Variables can store different types of data.</p>
									<ul className="text-neutral-700 list-disc ml-6 space-y-1 mb-6">
										<li><span className="font-semibold">int</span> → whole numbers (10, -5)</li>
										<li><span className="font-semibold">float</span> → decimals (3.14, -2.5)</li>
										<li><span className="font-semibold">str</span> → text/strings ("Hello", 'Python')</li>
										<li><span className="font-semibold">bool</span> → True/False</li>
									</ul>
									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
										<CodeSnippet language="python" code={`age = 25          # int\npi = 3.1415       # float\nname = \"Alice\"    # str\nis_student = True # bool\n\nprint(type(age))\nprint(type(pi))\nprint(type(name))\nprint(type(is_student))`} />
										<div className="mt-3">
											<Button onClick={() => handleTryNow('age = 25\npi = 3.1415\nname = "Alice"\nis_student = True\nprint(type(age))\nprint(type(pi))\nprint(type(name))\nprint(type(is_student))')} variant="secondary" size="sm">TRY NOW</Button>
										</div>
									</div>
									<div className="space-y-2">
										<div className="mt-3">
<CodeSnippet isOutput language="output" code={`<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>`} />
</div>
										<div className="space-y-2 mt-6">
											<p className="text-neutral-800 font-semibold text-base">�� Why use types?</p>
											<p className="text-neutral-700">So Python knows how to treat the data. You can’t add "Hello" + 5, but you can add 5 + 10.</p>
										</div>
									</div>
									<div className="space-y-2 mt-6">
												<MotivationFun motivation={"Data types power everything → Netflix ratings (float), Instagram captions (str), True/False likes (bool)."} fun={"Data types are like pizza toppings 🍕 — you can mix some, but not all (pineapple + cheese ✅, pineapple + engine oil ❌)."} />
									</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 4 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">Dynamic Typing in Python</h3>
									<p className="text-neutral-700 mb-4">In Python, you don’t need to declare the type — Python figures it out.</p>
									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
										<CodeSnippet language="python" code={`x = 5        # int\nx = "hello"  # now str\nprint(x)`} onRun={handleTryNow} />
										<div className="mt-3">
											<Button onClick={() => handleTryNow('x = 5\nx = "hello"\nprint(x)')} variant="secondary" size="sm">TRY NOW</Button>
										</div>
									</div>
									<div className="space-y-2">
										<div className="mt-3">
<CodeSnippet isOutput language="output" code={`hello`} />
</div>
										<div className="space-y-2 mt-6">
												<MotivationFun motivation={"This makes Python flexible and beginner-friendly. That’s why startups love it for quick prototyping."} fun={"Python’s chill… it doesn’t care if your box had pizza yesterday and cake today 🎂."} />
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 5 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">Type Casting (Changing Data Types)</h3>
									<p className="text-neutral-700 mb-4">Sometimes we need to convert one type into another.</p>
									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
										<CodeSnippet language="python" code={`x = "100"\ny = int(x)   # convert string to int\nprint(y + 20)`} onRun={handleTryNow} />
										<div className="mt-3">
											<Button onClick={() => handleTryNow('x = "100"\ny = int(x)\nprint(y + 20)')} variant="secondary" size="sm">TRY NOW</Button>
										</div>
									</div>
									<div className="space-y-2">
										<CodeSnippet isOutput language="output" code={`120`} />
										<div className="space-y-2 mt-6">
												<MotivationFun motivation={"Banks use type casting when converting user input (like “2000” in text form) into numbers for transactions."} fun={"Casting is like translating languages 🌍 — “100” in text → 100 in numbers."} />
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 6 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">🔧 Practice Problems (Subjective)</h3>
									<ul className="text-neutral-700 list-disc ml-6 space-y-3">
										<li>Create a variable <span className="font-semibold">city</span> and store your favorite city name. Print it.</li>
										<li>Store your age in a variable. Then print: "I am X years old" using your variable.</li>
										<li>Create 3 variables: <code>a = 10</code>, <code>b = 2.5</code>, <code>c = "Python"</code>. Print their types.</li>
										<li>Change the value of a variable from a number to a string and print both.</li>
										<li>Take the string "50", convert it into an integer, and add 25.</li>
									</ul>
								</div>
							</div>
						</div>
					)}

					{/* Hints Modal */}
					{showHints && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
							<div className="bg-white rounded-lg w-full max-w-lg">
								<div className="p-4 border-b flex items-center justify-between">
									<h3 className="text-lg font-semibold text-blue-600">💡 Hints</h3>
									<button onClick={closeHints} className="text-gray-500 hover:text-gray-700 text-xl">×</button>
								</div>
								<div className="p-6">
									<p className="text-neutral-700 leading-relaxed">{currentHint}</p>
								</div>
								<div className="p-4 border-t bg-gray-50 rounded-b-lg text-right">
									<Button onClick={closeHints} className="bg-blue-600 hover:bg-blue-700 text-white px-6">Got it!</Button>
								</div>
							</div>
						</div>
					)}

					{(() => {
					const slugs = [
						"python-variable-rules",
						"python-data-types",
						"python-dynamic-typing",
						"python-type-casting",
						"python-problems",
						"python-quiz",
					];
					const labels = [
						"Next: Variable Rules →",
						"Next: Data Types →",
						"Next: Dynamic Typing →",
						"Next: Type Casting →",
						"Next: Practice →",
						"Next: Quiz →",
					];
					const hasNext = currentStep >= 1 && currentStep <= slugs.length - 1;
					if (!hasNext) {
						return <LessonNextButton onClick={handleFinishLesson} disabled={isCompleting} label={isCompleting ? "Completing..." : "Next: Lesson →"} />;
					}
					const nextSlug = slugs[currentStep - 1];
					const nextLabel = labels[currentStep - 1] || "Next →";
					return <LessonNextButton href={`/lesson/lesson-3/${nextSlug}`} label={nextLabel} />;
				})()}
				</div>
			</div>

			<Dialog open={runnerOpen} onOpenChange={setRunnerOpen}>
				<DialogContent className="sm:max-w-6xl">
					<DialogTitle>Try Now (Python)</DialogTitle>
					<PythonCodeRunner initialCode={runnerCode} height={420} />

				</DialogContent>
			</Dialog>
		</div>
	);
}; 
