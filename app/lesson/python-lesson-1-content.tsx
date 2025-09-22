"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CongratulationPage } from "@/components/congratulation-page";
import { useLanguage } from "@/contexts/language-context";
import { saveLessonCompleteServer } from "@/actions/progress";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const PythonLesson1Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showCodePlayground, setShowCodePlayground] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState("");
  const [solutionCode, setSolutionCode] = useState("");
  const [isProblemStep, setIsProblemStep] = useState(false);
  const { language } = useLanguage();
  // Hoisted Nepali runner state to respect hooks rules
  const [runnerOpenNp, setRunnerOpenNp] = useState(false as any);
  const [runnerCodeNp, setRunnerCodeNp] = useState("");
  const tryNowNepali = (code: string) => { setRunnerCodeNp(code); setRunnerOpenNp(true); };

  const handleFinishLesson = async () => {
    try {
      setIsCompleting(true);
      // Mark lesson as completed in the database
      await saveLessonCompleteServer("python", "lesson-1", 25);
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
    // Navigate to lesson 2 instead of learn page
    window.location.href = "/lesson/lesson-2";
  };

  const handlePracticeAgain = () => {
    setShowCongratulations(false);
    // Reset to first step
    window.location.href = "/lesson/lesson-1/python-introduction";
  };

  const handleTryNow = (code: string, hint?: string, question?: string) => {
    // For Problem steps, show the question in comment format
    const displayCode = isProblemStep && question ? `# ${question}` : code;
    setCurrentCode(displayCode);
    setCurrentHint(hint || "");
    setIsProblemStep(currentStep === 6);
    setShowCodePlayground(true);
  };

  const handleHints = (hint: string) => {
    setCurrentHint(hint);
    setShowHints(true);
  };

  const handleShowSolution = () => {
    // Show the solution code in the playground
    setCurrentCode(solutionCode);
    setShowHints(false);
  };

  const handleCloseHints = () => {
    setShowHints(false);
    setCurrentHint("");
  };

  const handleClosePlayground = () => {
    setShowCodePlayground(false);
  };

  // Hints modal component with solution button
  const HintsModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-blue-600">💡 Hints</h3>
            <button 
              onClick={handleCloseHints}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          
          <div className="p-6 overflow-auto">
            <div className="text-neutral-700 leading-relaxed mb-4">
              {currentHint}
            </div>
            
            {/* Show solution button for Problem steps */}
            {isProblemStep && solutionCode && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Still need help? Click below to see the solution:</p>
                <Button
                  onClick={handleShowSolution}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Show Solution Code
                </Button>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t bg-gray-50 rounded-b-lg">
            <div className="flex justify-end">
              <Button
                onClick={handleCloseHints}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Got it!
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // OneCompiler iframe embed for code execution
  const CodePlayground = () => {
    useEffect(() => {
      const frame = document.getElementById('oc-editor') as HTMLIFrameElement;
      
      if (frame && currentCode) {
        const starter = {
          eventType: 'populateCode',
          language: 'python',
          files: [
            {
              name: 'main.py',
              content: currentCode
            }
          ]
        };

        const handleLoad = () => {
          frame.contentWindow?.postMessage(starter, '*');
        };

        frame.addEventListener('load', handleLoad);
        
        if (frame.contentDocument?.readyState === 'complete') {
          handleLoad();
        }

        return () => {
          frame.removeEventListener('load', handleLoad);
        };
      }
    }, [currentCode]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">Python Code Playground</h3>
              {/* Only show HINT button for Problem steps */}
              {isProblemStep && currentHint && (
                <Button 
                  onClick={() => handleHints(currentHint)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 text-sm rounded-lg shadow-md transform hover:scale-105 transition-all duration-200"
                  size="sm"
                >
                  HINT
                </Button>
              )}
            </div>
            <button 
              onClick={handleClosePlayground}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          <div className="flex-1 p-4">
            <PythonCodeRunner initialCode={currentCode} height={560} />
          </div>
        </div>
      </div>
    );
  };

  // Show congratulation page when lesson is completed
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
              title="Congratulations! You've completed Python Introduction!"
              lessonTitle="Python Introduction"
              showHearts={true}
            />
          </div>
        </div>
      </div>
    );
  }

  // Nepali translation branch for Lesson 1
  if (language === "ne") {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
            <div className="text-left mt-4 ml-1">
              <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
                {currentStep === 1 ? "Python को परिचय" : currentStep === 2 ? "इतिहास" : currentStep === 3 ? "किन Python लोकप्रिय छ?" : currentStep === 4 ? "Python का प्रयोग क्षेत्र" : currentStep === 5 ? "पहिलो प्रोग्राम" : currentStep === 6 ? "अभ्यास प्रश्न" : "क्विज"}
              </h1>
            </div>

            {currentStep === 1 && (
              <div className="mt-8 space-y-6">
                <p className="text-neutral-700">Python एक <strong>high-level programming language</strong> हो, जसको मतलब यो मान्छेको भाषाजस्तै सजिलो छ र कम्प्युटरलाई बुझाउन सजिलो हुन्छ। यो <strong>interpreted</strong> हो र <strong>general-purpose</strong> छ — Web apps, AI, Games, Data science, Automation सबैमा प्रयोग हुन्छ।</p>
                <CodeSnippet language="python" code={`print("Hello, Python!")`} onRun={tryNowNepali} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`Hello, Python!`} /></div>
                <p className="text-neutral-700">print() ले कम्प्युटरलाई &quot;यो देखाऊ&quot; भन्छ, त्यसैले धेरै भाषा &quot;Hello World&quot; बाट सुरु हुन्छ।</p>
                <p className="text-blue-700">💡 Motivation: Python सिक्दा Web Development देखि AI सम्म करियर खुल्छ।</p>
                <p className="text-purple-700">😂 Fun: Python नाम सर्पबाट होइन, Monty Python comedy शोबाट आएको हो 🐍😂।</p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="mt-8 space-y-4">
                <p className="text-neutral-700">Python Guido van Rossum ले 1980s अन्त्यतिर बनाए र 1991 मा सार्वजनिक भयो। नाम comedy शोबाट आएको हो। Guido को लक्ष्य सरल, रमाइलो र शक्तिशाली भाषा बनाउनु थियो।</p>
                <p className="text-blue-700">💡 Motivation: रमाइलोका लागि सुरु भएको भाषा आज करोडौँ Developer ले प्रयोग गर्छन्।</p>
                <p className="text-purple-700">😂 Fun: शुरुमा hobby language भनिएको Python ले आज Job दिन्छ 😂।</p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="mt-8 space-y-4">
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Simple Syntax — English जस्तै</li>
                  <li>Versatile — Web, AI, Automation, Data</li>
                  <li>Huge Libraries — NumPy, Pandas, TensorFlow</li>
                  <li>Cross-platform — Windows, Mac, Linux</li>
                  <li>Community — लाखौँ Developer</li>
                </ul>
                <p className="text-blue-700">💡 Motivation: Google, Netflix, NASA जस्ता कम्पनीले Python प्रयोग गर्छन्।</p>
                <p className="text-purple-700">😂 Fun: Syntax पढ्दा कहिलेकाहीँ अंग्रेजी पढेजस्तो लाग्छ… grammar teacher चाहिँ Python ले fail गर्छ 😂।</p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="mt-8 space-y-4">
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>🌍 Web Development → Django, Flask</li>
                  <li>📊 Data Science → Pandas, NumPy</li>
                  <li>🤖 AI → TensorFlow, PyTorch</li>
                  <li>⚙️ Automation → Scripts र Bots</li>
                  <li>🎮 Game Development → Pygame</li>
                </ul>
                <div className="text-neutral-700 space-y-1">
                  <p>• Netflix → Recommendation system Python मा</p>
                  <p>• Instagram → Backend Python</p>
                  <p>• ChatGPT (OpenAI) → AI training/serving मा Python</p>
                </div>
                <p className="text-blue-700">💡 Motivation: Netflix वा ChatGPT बनाइएको भाषा सिक्दा उत्साह आउँछ।</p>
                <p className="text-purple-700">😂 Fun: Mini-Netflix बनाउन सकिन्छ… तर password साथीलाई नदिने 😂।</p>
              </div>
            )}

            {currentStep === 5 && (
              <div className="mt-8 space-y-6">
                <CodeSnippet language="python" code={`print("Welcome to Python Programming!")`} onRun={tryNowNepali} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`Welcome to Python Programming!`} /></div>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>print() → Output देखाउन</li>
                  <li>() → function भित्र data पठाउन</li>
                  <li>&quot; &quot; वा ' ' → Text/string define गर्न</li>
                </ul>
                <p className="text-blue-700">💡 Motivation: यो नै पहिलो step — Computer सँग कुरा गर्ने</p>
                <p className="text-purple-700">😂 Fun: अब तपाईं Hello World club का coder! 🎉</p>
              </div>
            )}

            {currentStep === 6 && (
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-neutral-800">🔧 अभ्यास प्रश्न</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>आफ्नो नाम print गर्ने code लेख।</li>
                  <li>&quot;Python is fun!&quot; line print गर।</li>
                  <li>३ फरक लाइन print() प्रयोग गरेर देखाऊ।</li>
                  <li>एउटै लाइन ५ पटक देखाउने code लेख।</li>
                  <li>Python प्रयोग गर्ने ५ प्रसिद्ध कम्पनी comment मा लेख।</li>
                </ul>
              </div>
            )}

            {currentStep === 7 && (
              <div className="mt-8 space-y-6">
                <h3 className="text-lg font-semibold">क्विज</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Creator? → Guido van Rossum</li>
                  <li>Public year? → 1991</li>
                  <li>नाम? → Comedy Show</li>
                  <li>Language type? → Interpreted</li>
                </ul>
                <h4 className="font-medium">Fill in the blanks</h4>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Python को नाम <em>Comedy Show</em> बाट आएको हो।</li>
                  <li>print() ले <em>Output</em> देखाउँछ।</li>
                  <li>Text/string लाई define गर्न <em>quotes</em> प्रयोग हुन्छ।</li>
                </ul>
                <h4 className="font-medium">Output Based</h4>
                <CodeSnippet language="python" code={`print("Hi" * 3)`} onRun={tryNowNepali} />
                <CodeSnippet language="python" code={`Print("Hello")`} onRun={tryNowNepali} />
              </div>
            )}
          </div>
        </div>

        <Dialog open={runnerOpenNp} onOpenChange={setRunnerOpenNp}>
          <DialogContent className="sm:max-w-4xl">
            <DialogTitle>Try Now (Python)</DialogTitle>
            <PythonCodeRunner initialCode={runnerCodeNp} height={560} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
              {currentStep === 1 ? "Python Introduction" : currentStep === 2 ? "Python History" : currentStep === 3 ? "Python Popularity" : currentStep === 4 ? "Python Applications" : currentStep === 5 ? "First Program" : "Problems"}
            </h1>
          </div>
          
          {/* Python Introduction Content - Step 1 */}
          {currentStep === 1 && (
            <div className="mt-8 space-y-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-6">Introduction</h3>
                  <p className="text-neutral-700 mb-4">Python is a high-level programming language, closer to human language than machine code.</p>
                  <p className="text-neutral-600 mb-8">It is interpreted (no compiling needed, runs directly) and general-purpose (used for web, AI, data science, automation, and more).</p>
                  
                  <div className="mb-8">
                    <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
                    <CodeSnippet language="python" code={`print("Hello, Python!")`} onRun={(code) => handleTryNow(code)} />
										<div className="mt-3">
                    						<Button 
						  onClick={() => handleTryNow('print("Hello, Python!")')}
						  variant="secondary"
						  size="sm"
						>
						  TRY NOW
						</Button>
										</div>
                                      </div>
                  
                  						<div className="mb-8">
							<p className="text-neutral-800 font-semibold text-base mb-3">👉 Breakdown</p>
							<div className="overflow-x-auto">
								<table className="w-full text-sm text-left text-neutral-700 border border-gray-200 rounded-lg">
									<thead className="bg-gray-100 text-neutral-800">
										<tr>
											<th className="px-4 py-2 w-40">Part</th>
											<th className="px-4 py-2">Meaning</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-t">
											<td className="px-4 py-2 font-semibold whitespace-nowrap">print</td>
											<td className="px-4 py-2">Built-in function that displays output.</td>
										</tr>
										<tr className="border-t">
											<td className="px-4 py-2 font-semibold whitespace-nowrap">()</td>
											<td className="px-4 py-2">Parentheses to pass arguments to the function.</td>
										</tr>
										<tr className="border-t">
											<td className="px-4 py-2 font-semibold whitespace-nowrap">" " or ' '</td>
											<td className="px-4 py-2">Quotation marks to represent text (a string).</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
                  
                  <div className="mb-8">
                    <p className="text-red-600 font-semibold text-base mb-3">❌ Wrong Example:</p>
                    <CodeSnippet language="python" code={`print(Hello, Python!)`} onRun={(code) => handleTryNow(code)} />
										<div className="mt-3">
                    						<Button 
						  onClick={() => handleTryNow('print(Hello, Python!)')}
						  variant="secondary"
						  size="sm"
						>
						  TRY NOW
						</Button>
										</div>
                                  </div>
              
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">👉 Why error? → Because no quotes. Python thinks Hello is a variable.</p>
                    <p className="text-blue-600 text-base"> Motivation: Every app starts with "Hello, World!" → Facebook, Google, and even ChatGPT's first code had print() somewhere in it.</p>
                    <p className="text-purple-600 text-base">😂 Fun: print() is like your personal loudspeaker 📢 — Python will shout anything you give it.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Python Basics Content - Step 2 */}
          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-6">History</h3>
                  <ul className="text-neutral-700 space-y-3 mb-8">
                    <li>Created by Guido van Rossum in the late 1980s.</li>
                    <li>Released in 1991.</li>
                    <li>Named after Monty Python's Flying Circus (a comedy group, not the snake).</li>
                    <li>Goal: simple + fun + powerful.</li>
                  </ul>
                  
                  <div className="space-y-4">
                    <p className="text-blue-600 text-base"> Motivation: Guido's dream was a language that anyone could learn. That's why today kids, scientists, and companies like Google use it.</p>
                    <p className="text-purple-600 text-base">😂 Fun: Tell someone "I'm learning Python" → they'll imagine snakes 🐍 around you. Nope… just code.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Python Popularity Content - Step 3 */}
          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-6">Why Python is Popular</h3>
                  								  <div className="overflow-x-auto mb-8">
									<table className="w-full text-sm text-left text-neutral-700 border border-gray-200 rounded-lg">
										<thead className="bg-gray-100 text-neutral-800">
											<tr>
												<th className="px-4 py-2 w-64">Reason</th>
												<th className="px-4 py-2">Details</th>
											</tr>
										</thead>
										<tbody>
											<tr className="border-t">
												<td className="px-4 py-2 font-semibold whitespace-nowrap">Simple Syntax</td>
												<td className="px-4 py-2">Almost like English; easy to read and write.</td>
											</tr>
											<tr className="border-t">
												<td className="px-4 py-2 font-semibold whitespace-nowrap">Versatile</td>
												<td className="px-4 py-2">Used across web, data, automation, scripting, and more.</td>
											</tr>
											<tr className="border-t">
												<td className="px-4 py-2 font-semibold whitespace-nowrap">Huge Libraries</td>
												<td className="px-4 py-2">Rich ecosystem: NumPy, Pandas, TensorFlow, FastAPI, etc.</td>
											</tr>
											<tr className="border-t">
												<td className="px-4 py-2 font-semibold whitespace-nowrap">Cross‑platform</td>
												<td className="px-4 py-2">Runs on Windows, macOS, Linux, and more.</td>
											</tr>
											<tr className="border-t">
												<td className="px-4 py-2 font-semibold whitespace-nowrap">Community</td>
												<td className="px-4 py-2">Millions of developers; tons of tutorials and support.</td>
											</tr>
										</tbody>
									</table>
								  </div>
                  
                  <div className="mb-8">
                    <p className="text-blue-600 font-semibold text-base mb-3"> Motivation:</p>
                    <ul className="text-neutral-700 space-y-2">
                      <li><strong>Instagram</strong> → built backend with Python.</li>
                      <li><strong>YouTube</strong> → uses Python for video features.</li>
                      <li><strong>NASA</strong> → uses Python for space missions 🚀.</li>
                    </ul>
              </div>
              
                  <p className="text-purple-600 text-base">😂 Fun: Even people scared of snakes 🐍 love Python the language.</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Python Applications Content - Step 4 */}
          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-6">Applications of Python</h3>
                  <p className="text-neutral-700 mb-6">Python powers many industries:</p>
                  
                  								  <div className="overflow-x-auto mb-8">
									<table className="w-full text-sm text-left text-neutral-700 border border-gray-200 rounded-lg">
										<thead className="bg-gray-100 text-neutral-800">
											<tr>
												<th className="px-4 py-2 w-64">Area</th>
												<th className="px-4 py-2">Examples</th>
											</tr>
										</thead>
										<tbody>
											<tr className="border-t">
												<td className="px-4 py-2 font-semibold whitespace-nowrap">🌍 Web Development</td>
												<td className="px-4 py-2">Instagram, Reddit (Django/Flask)</td>
											</tr>
											<tr className="border-t">
												<td className="px-4 py-2 font-semibold whitespace-nowrap">📊 Data Science</td>
												<td className="px-4 py-2">Netflix recommendations, Pandas/NumPy</td>
											</tr>
											<tr className="border-t">
												<td className="px-4 py-2 font-semibold whitespace-nowrap">🤖 AI & ML</td>
												<td className="px-4 py-2">OpenAI/ChatGPT, TensorFlow, PyTorch</td>
											</tr>
											<tr className="border-t">
												<td className="px-4 py-2 font-semibold whitespace-nowrap">⚙️ Automation</td>
												<td className="px-4 py-2">Google internal tools, scripts</td>
											</tr>
											<tr className="border-t">
												<td className="px-4 py-2 font-semibold whitespace-nowrap">🎮 Games</td>
												<td className="px-4 py-2">Pygame library for 2D games</td>
											</tr>
										</tbody>
									</table>
								  </div>
              
                  <div className="space-y-4">
                    <p className="text-blue-600 text-base"> Motivation: Learn Python → build your own mini-Netflix, chatbot, or even a game.</p>
                    <p className="text-purple-600 text-base">😂 Fun: Careful… after learning Python, your friends will say: "Bro, make me the next Instagram!" 😂</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Python First Program Content - Step 5 */}
          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-6">First Program</h3>
                  
                  <div className="mb-8">
                    <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
                    <CodeSnippet language="python" code={`print("Welcome to Python Programming!")`} onRun={(code) => handleTryNow(code)} />
										<div className="mt-3">
                    						<Button 
						  onClick={() => handleTryNow('print("Welcome to Python Programming!")')}
						  variant="secondary"
						  size="sm"
						>
						  TRY NOW
						</Button>
										</div>
                                      </div>
                  
                  						<div className="mb-8">
							<p className="text-neutral-800 font-semibold text-base mb-3">👉 Breakdown:</p>
							<div className="overflow-x-auto">
								<table className="w-full text-sm text-left text-neutral-700 border border-gray-200 rounded-lg">
									<thead className="bg-gray-100 text-neutral-800">
										<tr>
											<th className="px-4 py-2 w-40">Part</th>
											<th className="px-4 py-2">Meaning</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-t">
											<td className="px-4 py-2 font-semibold whitespace-nowrap">print</td>
											<td className="px-4 py-2">Command to display output.</td>
										</tr>
										<tr className="border-t">
											<td className="px-4 py-2 font-semibold whitespace-nowrap">()</td>
											<td className="px-4 py-2">Container for information (arguments).</td>
										</tr>
										<tr className="border-t">
											<td className="px-4 py-2 font-semibold whitespace-nowrap">"Welcome to Python Programming!"</td>
											<td className="px-4 py-2">Text value (string) passed to print.</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
                  
                  <div className="mb-8 space-y-4">
                    <p className="text-blue-600 text-base"> Motivation: This is your first step as a developer — today it's text, tomorrow maybe AI 🤖.</p>
                    <p className="text-purple-600 text-base"> Fun: Congrats 🎉 you're officially a Python whisperer 🐍✨.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Python Problems Content - Step 6 */}
          {currentStep === 6 && (
            <div className="mt-8 space-y-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-6">Problems</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <p className="text-neutral-800 font-semibold text-base">🔧 Practice Problems (Subjective)</p>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-neutral-700">1. Print your name.</p>
                          <div className="flex gap-2">
                            									<Button 
									  onClick={() => handleTryNow('', 'print("Your Name")', 'Print your name.')}
									  variant="secondary"
									  size="sm"
									>
									  TRY NOW
									</Button>
                            <Button 
                              onClick={() => setShowHints(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              size="sm"
                            >
                              HINTS
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-neutral-700">2. Print the sentence: Python is fun!.</p>
                          <div className="flex gap-2">
                            									<Button 
									  onClick={() => handleTryNow('', 'print("Python is fun!")', 'Print the sentence: Python is fun!.')}
									  variant="secondary"
									  size="sm"
									>
									  TRY NOW
									</Button>
                            <Button 
                              onClick={() => setShowHints(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              size="sm"
                            >
                              HINTS
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-neutral-700">3. Print 3 different lines using three print() statements.</p>
                          <div className="flex gap-2">
                            									<Button 
									  onClick={() => handleTryNow('', 'print("Line 1")\nprint("Line 2")\nprint("Line 3")', 'Print 3 different lines using three print() statements.')}
									  variant="secondary"
									  size="sm"
									>
									  TRY NOW
									</Button>
                            <Button 
                              onClick={() => setShowHints(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              size="sm"
                            >
                              HINTS
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-neutral-700">4. Print the same word 5 times using:</p>
                          <CodeSnippet language="python" code={`print("Hello " * 5)`} />
                          <div className="mt-3 flex gap-2">
                            									<Button 
									  onClick={() => handleTryNow('', 'print("Hello " * 5)', 'Print the same word 5 times using: print("Hello " * 5)')}
									  variant="secondary"
									  size="sm"
									>
									  TRY NOW
									</Button>
                            <Button 
                              onClick={() => setShowHints(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              size="sm"
                            >
                              HINTS
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-neutral-700">5. Research & write (in comments) 5 companies that use Python.</p>
                          <div className="flex gap-2">
                            									<Button 
									  onClick={() => handleTryNow('', '# Google\n# Instagram\n# Netflix\n# Spotify\n# Dropbox', 'Research & write (in comments) 5 companies that use Python.')}
									  variant="secondary"
									  size="sm"
									>
									  TRY NOW
									</Button>
                            <Button 
                              onClick={() => setShowHints(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              size="sm"
                            >
                              HINTS
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Show modals */}
          {showCodePlayground && <CodePlayground />}
          {showHints && <HintsModal />}
          
          {/* Navigation Button */}
          <div className="fixed bottom-6 right-6 z-50">
            {currentStep === 1 ? (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                asChild
              >
                <a href="/lesson/lesson-1/python-history">
                  Next: Python History →
                </a>
              </Button>
            ) : currentStep === 2 ? (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                asChild
              >
                <a href="/lesson/lesson-1/python-popularity">
                  Next: Python Popularity →
                </a>
              </Button>
            ) : currentStep === 3 ? (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                asChild
              >
                <a href="/lesson/lesson-1/python-applications">
                  Next: Python Applications →
                </a>
              </Button>
            ) : currentStep === 4 ? (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                asChild
              >
                <a href="/lesson/lesson-1/python-first-program">
                  Next: First Program →
                </a>
              </Button>
            ) : currentStep === 5 ? (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                asChild
              >
                <a href="/lesson/lesson-1/python-problems">
                  Next: Problems →
                </a>
              </Button>
            ) : currentStep === 6 ? (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                asChild
              >
                <a href="/lesson/lesson-1/python-quiz">
                  Next: Quiz →
                </a>
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                onClick={handleFinishLesson}
                disabled={isCompleting}
              >
                {isCompleting ? "Completing..." : "Finish Lesson 🎉"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 