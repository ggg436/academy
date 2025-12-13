"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LessonNextButton } from "@/components/lesson-next-button";
import { useLanguage } from "@/contexts/language-context";
import { saveLessonCompleteServer } from "@/actions/progress";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson2Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
	const [isCompleting, setIsCompleting] = useState(false);
	const { language } = useLanguage();
	const [showHints, setShowHints] = useState(false);
	const [currentHint, setCurrentHint] = useState("");
	const [runnerOpen, setRunnerOpen] = useState(false);
	const [runnerCode, setRunnerCode] = useState("");

	// Determine page title based on the active step
	const stepTitle = (
		currentStep === 1 ? "Python Case Sensitivity" :
		currentStep === 2 ? "Python Indentation" :
		currentStep === 3 ? "Python Comments" :
		currentStep === 4 ? "Python Quotes" :
		currentStep === 5 ? "Python Multiple Statements" :
		currentStep === 6 ? "Python Practice Problems" :
		"Python Quiz"
	);

	const handleFinishLesson = async () => {
		try {
			setIsCompleting(true);
			await saveLessonCompleteServer("python", "lesson-2", 25);
			window.location.href = "/lesson/lesson-3";
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
						<h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
							{stepTitle}
						</h1>
					</div>

					{currentStep === 1 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">Case Sensitivity in Python</h3>
									<p className="text-neutral-700 mb-4">Python treats uppercase and lowercase letters differently.</p>
									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
										<CodeSnippet language="python" code={`print("hello")`} onRun={handleTryNow} />
										<div className="mt-3">
										<Button onClick={() => handleTryNow('print("hello")')} variant="secondary" size="sm">TRY NOW</Button>
										</div>
									</div>

									<div className="mb-8">
										<p className="text-red-600 font-semibold text-base mb-3">❌ Wrong Example:</p>
										<CodeSnippet language="python" code={`Print("hello")`} onRun={handleTryNow} />
										<div className="mt-3">
										<Button onClick={() => handleTryNow('Print("hello")')} variant="secondary" size="sm">TRY NOW</Button>
										</div>
									</div>

									<div className="space-y-4 mt-6">
										<p className="text-sm text-gray-600">👉 Why error? → <span className="font-semibold">print</span> is lowercase. <span className="font-semibold">Print</span> is seen as a completely different thing.</p>
										<MotivationFun motivation={"Imagine if passwords weren’t case-sensitive — hackers would have a party!"} fun={"Python’s like your strict English teacher — “Capital P? Nope, go stand outside!”"} />
									</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 2 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">Indentation in Python</h3>
									<p className="text-neutral-700 mb-4">Python uses indentation (spaces or tabs at the start of a line) to define code blocks.</p>
									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
										<CodeSnippet language="python" code={`if True:\n    print("This is indented correctly")`} onRun={handleTryNow} />
										<Button onClick={() => handleTryNow('if True:\n    print("This is indented correctly")')} variant="secondary" size="sm">TRY NOW</Button>
									</div>

									<div className="mb-8">
										<p className="text-red-600 font-semibold text-base mb-3">❌ Wrong Example:</p>
										<CodeSnippet language="python" code={`if True:\nprint("This will cause an error")`} onRun={handleTryNow} />
										<Button onClick={() => handleTryNow('if True:\nprint("This will cause an error")')} variant="secondary" size="sm">TRY NOW</Button>
									</div>

									<div className="space-y-4 mt-6">
										<p className="text-sm text-gray-600">👉 Why error? → Python expected the code inside <span className="font-semibold">if</span> to be indented.</p>
										<MotivationFun motivation={"This makes Python code clean & readable — that’s why companies like Dropbox and Google love it."} fun={"Forgetting indentation in Python is like forgetting to brush your teeth — you’ll regret it fast 😅."} />
									</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 3 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">Comments in Python</h3>
									<p className="text-neutral-700 mb-4">Use <code>#</code> for single-line comments and <code>"""</code> for multi‑line comments.</p>

									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
										<CodeSnippet language="python" code={`# This is a single-line comment\nprint("Hello")\n\n"""\nThis is a multi-line comment\nIt doesn’t affect the code\n"""\nprint("World")`} onRun={handleTryNow} />
										<Button onClick={() => handleTryNow('# This is a single-line comment\nprint("Hello")\n\n"""\nThis is a multi-line comment\nIt doesn’t affect the code\n"""\nprint("World")')} variant="secondary" size="sm">TRY NOW</Button>
									</div>

									<div className="space-y-4 mt-6">
										<p className="text-sm text-gray-600">👉 Why use comments? → To explain your code so future‑you (or teammates) don’t get confused.</p>
										<MotivationFun motivation={"Even NASA’s code has comments 🚀."} fun={"Writing code without comments is like leaving the house without directions."} />
									</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 4 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">Quotes in Python</h3>
									<p className="text-neutral-700 mb-4">Strings can be written with single quotes ' ' or double quotes " ". Both work.</p>

									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
										<CodeSnippet language="python" code={`print("Python is fun")\nprint('I love coding')`} onRun={handleTryNow} />
										<Button onClick={() => handleTryNow('print("Python is fun")\nprint(\'I love coding\')')} variant="secondary" size="sm">TRY NOW</Button>
									</div>

									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Example with both:</p>
										<CodeSnippet language="python" code={`print("I'm learning Python")`} onRun={handleTryNow} />
										<Button onClick={() => handleTryNow('print("I\'m learning Python")')} variant="secondary" size="sm">TRY NOW</Button>
									</div>

									<div className="space-y-4 mt-6">
										<p className="text-sm text-gray-600">👉 Why two types of quotes? → If your text has ", use ', and vice versa.</p>
									</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 5 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">Multiple Statements in One Line (in Python)</h3>
									<p className="text-neutral-700 mb-4">Normally, each line = one statement. But you can separate statements with a semicolon <code>;</code>.</p>

									<div className="mb-8">
										<p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
										<CodeSnippet language="python" code={`print("Hello"); print("World")`} onRun={handleTryNow} />
										<Button onClick={() => handleTryNow('print("Hello"); print("World")')} variant="secondary" size="sm">TRY NOW</Button>
									</div>

									<div className="space-y-4 mt-6">
										<p className="text-sm text-gray-600">👉 But… writing like this is not recommended. Keep it clean and readable.</p>
									</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 6 && (
						<div className="mt-8 space-y-8">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold text-neutral-800 mb-6">🔧 Practice Problems</h3>
									<div className="space-y-4">
										<div className="space-y-2">
											<p className="text-neutral-700">1. Print “Python is case sensitive” → then try Print.</p>
											<div className="flex gap-2">
												<Button onClick={() => handleTryNow('print("Python is case sensitive")')} variant="secondary" size="sm">TRY NOW</Button>
												<Button onClick={() => openHints('Use lowercase print for the function name.')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg" size="sm">HINTS</Button>
											</div>
										</div>

										<div className="space-y-2">
											<p className="text-neutral-700">2. Write an if statement that prints “Python rocks!”.</p>
											<div className="flex gap-2">
												<Button onClick={() => handleTryNow('if True:\n    print("Python rocks!")')} variant="secondary" size="sm">TRY NOW</Button>
												<Button onClick={() => openHints('Indent the print line with spaces or a tab under the if.')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg" size="sm">HINTS</Button>
											</div>
										</div>

										<div className="space-y-2">
											<p className="text-neutral-700">3. Add comments explaining what each line does.</p>
											<div className="flex gap-2">
												<Button onClick={() => handleTryNow('# comment\nprint("Hello")')} variant="secondary" size="sm">TRY NOW</Button>
												<Button onClick={() => openHints('Use # for single-line comments.')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg" size="sm">HINTS</Button>
											</div>
										</div>

										<div className="space-y-2">
											<p className="text-neutral-700">4. Print "I'm happy!" using correct quotes.</p>
											<div className="flex gap-2">
												<Button onClick={() => handleTryNow('print("I\'m happy!")')} variant="secondary" size="sm">TRY NOW</Button>
												<Button onClick={() => openHints('Use double quotes outside if the string contains a single quote.')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg" size="sm">HINTS</Button>
											</div>
										</div>

										<div className="space-y-2">
											<p className="text-neutral-700">5. Two print statements in one line using ;</p>
											<div className="flex gap-2">
												<Button onClick={() => handleTryNow('print("Hello"); print("World")')} variant="secondary" size="sm">TRY NOW</Button>
												<Button onClick={() => openHints('Prefer one statement per line for readability; semicolons are allowed.')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg" size="sm">HINTS</Button>
											</div>
										</div>
									</div>
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

					{/* Nav/Finish */}
					{(() => {
						const slugs = [
							"python-indentation",
							"python-comments",
							"python-quotes",
							"python-multiple-statements",
							"python-problems",
							"python-quiz",
						];
						const labels = [
							"Next: Indentation →",
							"Next: Comments →",
							"Next: Quotes →",
							"Next: Multiple Statements →",
							"Next: Practice →",
							"Next: Quiz →",
						];
						const hasNext = currentStep >= 1 && currentStep <= slugs.length - 1;
						if (!hasNext) {
							return <LessonNextButton onClick={handleFinishLesson} disabled={isCompleting} label={isCompleting ? "Completing..." : "Next: Lesson →"} />;
						}
						const nextSlug = slugs[currentStep - 1];
						const nextLabel = labels[currentStep - 1] || "Next →";
						return <LessonNextButton href={`/lesson/lesson-2/${nextSlug}`} label={nextLabel} />;
					})()}
				</div>
			</div>

			<Dialog open={runnerOpen} onOpenChange={setRunnerOpen}>
				<DialogContent className="sm:max-w-6xl">
					<DialogTitle>Try Now (Python)</DialogTitle>
					{/* Replacing OneCompiler iframe with in-app runner (editor left, output right) */}
					<PythonCodeRunner initialCode={runnerCode} height={420} />

				</DialogContent>
			</Dialog>
		</div>
	);
}; 
