"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CongratulationPage } from "@/components/congratulation-page";
import { useLanguage } from "@/contexts/language-context";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import OneCompilerEmbed from "@/components/onecompiler-embed";
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
      // Mark lesson as completed in the database
      await saveLessonCompleteServer("c", "lesson-1", 25);
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
    window.location.href = "/lesson/lesson-1/c-tutorial";
  };

  // Attach "Try Now" buttons to code blocks in this lesson
  useEffect(() => {
    const preBlocks = Array.from(document.querySelectorAll('div.bg-gray-50 pre code')) as HTMLElement[];
    const pBlocks = Array.from(document.querySelectorAll('div.bg-gray-50 p.font-mono')) as HTMLElement[];
    const nodes = [...preBlocks, ...pBlocks];

    nodes.forEach((node) => {
      const container = (node.closest('div.bg-gray-50') || node.parentElement) as HTMLElement | null;
      if (!container) return;
      if (container.getAttribute('data-try-now-attached') === '1') return;
      container.setAttribute('data-try-now-attached', '1');

      const btn = document.createElement('button');
      btn.textContent = 'Try Now';
      btn.className = 'mt-3 inline-flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wide bg-green-500 text-white border-b-4 border-green-600 hover:bg-green-500/90 active:border-b-0 px-6 h-12';
      btn.onclick = () => {
        const code = (node.innerText || '').trim();
        setRunnerCode(code);
        setRunnerOpen(true);
      };
      const wrapper = document.createElement('div');
      wrapper.className = 'mt-3';
      wrapper.appendChild(btn);
      container.insertAdjacentElement('beforeend', wrapper);
    });
  }, [currentStep]);

  // Simple quiz for Step 4
  const quizQuestions = [
    {
      q: 'Which header file is required for printf in C?',
      options: ['stdlib.h', 'stdio.h', 'string.h'],
      answer: 1,
    },
    {
      q: 'Which format specifier prints an integer?',
      options: ['%s', '%f', '%d'],
      answer: 2,
    },
    {
      q: 'What does this print: printf("%d", 2+3);?',
      options: ['23', '5', '2+3'],
      answer: 1,
    }
  ];
  const [selected, setSelected] = useState<number[]>(Array(quizQuestions.length).fill(-1));
  const [checked, setChecked] = useState(false);
  const correctCount = selected.reduce((acc, val, i) => acc + (val === quizQuestions[i].answer ? 1 : 0), 0);

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
              {currentStep === 1 ? "C Tutorial" : currentStep === 2 ? "Examples in Each Chapter" : currentStep === 3 ? "C Exercises" : currentStep === 4 ? "C Quiz" : "C Reference"}
            </h1>
          </div>
          
          {/* Step 1: C Tutorial */}
          {currentStep === 1 && (
            <div className="mt-8 space-y-8">
              <p className="text-xl text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "C एक सामान्य-उद्देश्य प्रोग्रामिङ भाषा हो जसले सिस्टम प्रोग्रामिङ, एम्बेडेड सिस्टम, र अन्य कम्प्युटर अनुप्रयोगहरू विकास गर्न प्रयोग गरिन्छ।"
                  : language === "new"
                  ? "C एँक सामान्य-उद्देश्य प्रोग्रामिङ भाषा छ जो सिस्टम प्रोग्रामिङ, एम्बेडेड सिस्टम, र अन्य कम्प्युटर अनुप्रयोग विकास गर्न प्रयोग जाय्।"
                  : "C is a general-purpose programming language used for system programming, embedded systems, and developing other computer applications."}
              </p>
              
              <hr className="border-gray-300" />
              
              <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                {language === "ne"
                  ? "C भनेको के हो?"
                  : language === "new"
                  ? "C के छ?"
                  : "What is C?"}
              </h2>
              
              <ul className="space-y-3 text-neutral-600 leading-relaxed">
                {(language === "ne"
                  ? [
                      "C एक प्रोसिजरल प्रोग्रामिङ भाषा हो।",
                      "यो मध्यम-स्तरीय भाषा हो जसले हाई-लेवल र लो-लेवल दुवै सुविधाहरू प्रदान गर्छ।",
                      "C ले मेमोरी प्रबन्धन र हार्डवेयर नियन्त्रण गर्न सक्षम बनाउँछ।",
                      "यो UNIX, Linux, र Windows जस्ता ओपरेटिङ सिस्टमहरूमा प्रयोग गरिन्छ।",
                      "C ले उच्च प्रदर्शन र कम मेमोरी उपयोग प्रदान गर्छ।",
                    ]
                  : language === "new"
                  ? [
                      "C एँक प्रोसिजरल प्रोग्रामिङ भाषा छ।",
                      "यो मध्यम-स्तरीय भाषा छ जो हाई-लेवल र लो-लेवल दुवै सुविधा दिन्छ।",
                      "C ले मेमोरी प्रबन्धन र हार्डवेयर नियन्त्रण गर्न सक्षम गराय्।",
                      "यो UNIX, Linux, र Windows जस्ता ओपरेटिङ सिस्टमम प्रयोग जाय्।",
                      "C ले उच्च प्रदर्शन र कम मेमोरी उपयोग दिन्छ।",
                    ]
                  : [
                      "C is a procedural programming language.",
                      "It's a middle-level language that provides both high-level and low-level features.",
                      "C enables memory management and hardware control.",
                      "It's used in operating systems like UNIX, Linux, and Windows.",
                      "C provides high performance and low memory usage.",
                    ]).map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
              
              <hr className="border-gray-300" />
              
              <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                {language === "ne"
                  ? "किन C सिक्ने?"
                  : language === "new"
                  ? "C किँ सिकय्?"
                  : "Why Learn C?"}
              </h2>
              
              <p className="text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "C ले कम्प्युटर प्रोग्रामिङको आधारभूत सिद्धान्तहरू सिक्न सक्षम बनाउँछ र यो अन्य भाषाहरू सिक्नको लागि उत्तम आधार हो।"
                  : language === "new"
                  ? "C ले कम्प्युटर प्रोग्रामिङक बुनियादी सिद्धान्त सिक्ना सक्षम गराय् र यो अन्य भाषा सिक्नक लागि उत्तम आधार छ।"
                  : "C enables learning fundamental computer programming principles and is an excellent foundation for learning other languages."}
              </p>
              
              <ul className="space-y-3 text-neutral-600 leading-relaxed">
                {(language === "ne"
                  ? [
                      "सिस्टम प्रोग्रामिङ र ओपरेटिङ सिस्टम",
                      "एम्बेडेड सिस्टम र ड्राइभर विकास",
                      "गेम डिभेलपमेन्ट र रियल-टाइम अनुप्रयोगहरू",
                      "कम्पाइलर र इन्टरप्रिटर विकास",
                      "हार्डवेयर नियन्त्रण र IoT अनुप्रयोगहरू",
                    ]
                  : language === "new"
                  ? [
                      "सिस्टम प्रोग्रामिङ र ओपरेटिङ सिस्टम",
                      "एम्बेडेड सिस्टम र ड्राइभर विकास",
                      "गेम डिभेलपमेन्ट र रियल-टाइम अनुप्रयोग",
                      "कम्पाइलर र इन्टरप्रिटर विकास",
                      "हार्डवेयर नियन्त्रण र IoT अनुप्रयोग",
                    ]
                  : [
                      "System programming and operating systems",
                      "Embedded systems and driver development",
                      "Game development and real-time applications",
                      "Compiler and interpreter development",
                      "Hardware control and IoT applications",
                    ]).map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
              
              <hr className="border-gray-300" />
              
              <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                {language === "ne"
                  ? "C को पहिलो प्रोग्राम"
                  : language === "new"
                  ? "C क पहिलो प्रोग्राम"
                  : "Your First C Program"}
              </h2>
              
              <p className="text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "C मा 'Hello, World!' प्रोग्राम लेख्न यसरी गर्नुपर्छ:"
                  : language === "new"
                  ? "C म 'Hello, World!' प्रोग्राम लेख्न यसरी गर्नुपर्छ:"
                  : "Writing a 'Hello, World!' program in C looks like this:"}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-mono text-sm text-gray-700">
                  #include &lt;stdio.h&gt;<br/><br/>
                  int main() &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;printf(&quot;Hello, World!\n&quot;);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;return 0;<br/>
                  &#125;
                </p>
              </div>
              
              <p className="text-neutral-600 leading-relaxed mt-4">
                {language === "ne"
                  ? "यो प्रोग्रामले स्क्रिनमा 'Hello, World!' प्रिन्ट गर्छ र नयाँ लाइनमा जान्छ।"
                  : language === "new"
                  ? "ये प्रोग्रामले स्क्रिनम 'Hello, World!' प्रिन्ट गराय् र नयाँ लाइनम जाय्।"
                  : "This program prints 'Hello, World!' to the screen and goes to a new line."}
              </p>
              
              <hr className="border-gray-300" />
            </div>
          )}
          
          {/* Step 2: Examples in Each Chapter */}
          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <p className="text-xl text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "तपाईं प्रत्येक अध्यायमा उदाहरण मार्फत C सिक्न सक्नुहुन्छ। हाम्रो लक्ष्य: पढ्नुहोस् → हेर्नुहोस् → चलाउनुहोस्।"
                  : language === "new"
                  ? "उदाहरण मार्फत प्रत्येक अध्यायम C सिकय्। हाम्रो लक्ष्य: पढ, हे, चलाउ।"
                  : "You can learn C with examples in each chapter. Our goal: Read → See → Run."}
              </p>
              <hr className="border-gray-300" />
              <h2 className="text-xl font-semibold text-neutral-700 mt-6">Try It Yourself</h2>
              <p className="text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "प्रत्येक उदाहरणसँग साधारण कोड स्निपेट हुन्छ जुन तपाईंले आफैं चलाउन सक्नुहुन्छ।"
                  : language === "new"
                  ? "प्रत्येक उदाहरण सँग चलाउन सकिने सानो कोड स्निपेट छ।"
                  : "Each example comes with a small code snippet you can run yourself."}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-mono text-sm text-gray-700">
                  #include &lt;stdio.h&gt;<br/>
                  int main() &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;printf(&quot;Sum: %d\n&quot;, 2 + 3);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;return 0;<br/>
                  &#125;
                </p>
              </div>
              <hr className="border-gray-300" />
            </div>
          )}

          {/* Step 3: C Exercises */}
          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <p className="text-xl text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "अध्यायहरू पछाडि अभ्यासहरू (Exercises) हुन्छन् जसले बुझाइ कति राम्रो छ भनेर जाँच्छ।"
                  : language === "new"
                  ? "अध्याय पछ्यापछि अभ्यास हो जँह ब्याख्या जाँच जान्छ।"
                  : "Chapters end with exercises so you can test your understanding."}
              </p>
              <hr className="border-gray-300" />
              <h2 className="text-xl font-semibold text-neutral-700 mt-6">Sample Exercise</h2>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                <p className="text-neutral-700">Fill in the blank to print an integer variable:</p>
                <p className="font-mono text-sm text-gray-700">int x = 10; printf(&quot;_______&quot;, x);</p>
                <p className="text-neutral-600">Answer: %d</p>
              </div>
              <hr className="border-gray-300" />
            </div>
          )}

          {/* Step 4: C Quiz */}
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
                    <p className="text-neutral-600 text-sm">{correctCount === quizQuestions.length ? 'Perfect! Proceed to the next step.' : 'Review the questions and try again, then proceed.'}</p>
                  </div>
                )}
              </div>
              <hr className="border-gray-300" />
            </div>
          )}

          {/* Step 5: C Reference */}
          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <p className="text-xl text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "शब्द-सूची र फङ्क्सन रेफरेन्स: कीवर्ड, stdio फङ्क्सनहरू, string फङ्क्सनहरू, math फङ्क्सनहरू,ctype आदि।"
                  : language === "new"
                  ? "कीवर्ड, stdio, string, math, ctype बिबरण लिस्ट।"
                  : "Quick reference: keywords, stdio functions, string functions, math functions, ctype and more."}
              </p>
              <ul className="space-y-2 text-neutral-600">
                <li>• Keywords and basic syntax</li>
                <li>• stdio.h: printf, scanf, getchar, putchar</li>
                <li>• string.h: strlen, strcpy, strcmp</li>
                <li>• math.h: pow, sqrt, sin, cos</li>
                <li>• ctype.h: isalpha, isdigit, toupper</li>
              </ul>
              <hr className="border-gray-300" />
            </div>
          )}

          {/* Navigation Button */}
          <div className="fixed bottom-6 right-6 z-50">
            {currentStep < 5 ? (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                asChild
              >
                <a href={
                  currentStep === 1 ? "/lesson/lesson-1/examples-in-each-chapter" :
                  currentStep === 2 ? "/lesson/lesson-1/c-exercises" :
                  currentStep === 3 ? "/lesson/lesson-1/c-quiz" :
                  "/lesson/lesson-1/c-reference"
                }>
                  Next →
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
                {isCompleting ? 'Completing...' : 'Finish Lesson 🎉'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Try Now modal (note: C code cannot run natively in the browser) */}
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