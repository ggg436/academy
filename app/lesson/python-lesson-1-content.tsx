"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CongratulationPage } from "@/components/congratulation-page";
import { useLanguage } from "@/contexts/language-context";

export const PythonLesson1Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const { language } = useLanguage();

  const handleFinishLesson = () => {
    setShowCongratulations(true);
  };

  const handleContinue = () => {
    setShowCongratulations(false);
    // Navigate to learn page
    window.location.href = "/learn";
  };

  const handlePracticeAgain = () => {
    setShowCongratulations(false);
    // Reset to first step
    window.location.href = "/lesson/lesson-1/python-introduction";
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

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
              {currentStep === 1 ? "Python Introduction" : "Python Basics"}
            </h1>
          </div>
          
          {/* Python Introduction Content - Step 1 */}
          {currentStep === 1 && (
            <div className="mt-8 space-y-8">
              <p className="text-xl text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "Python एक उच्च-स्तरीय, व्याख्यात्मक प्रोग्रामिङ भाषा हो जसले सरल र पठनीय सिन्ट्याक्स प्रदान गर्छ। यो विश्वभरमा सबैभन्दा लोकप्रिय प्रोग्रामिङ भाषाहरू मध्ये एक हो।"
                  : language === "new"
                  ? "Python एँक उच्च-स्तरीय, व्याख्यात्मक प्रोग्रामिङ भाषा छ जो सरल र पढ्न सजिलो सिन्ट्याक्स दिन्छ। यो विश्वभरमा सबैभन्दा लोकप्रिय प्रोग्रामिङ भाषाहरू मध्ये एक छ।"
                  : "Python is a high-level, interpreted programming language that offers simple and readable syntax. It's one of the most popular programming languages worldwide."}
              </p>
              
              <hr className="border-gray-300" />
              
              <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                {language === "ne"
                  ? "Python भनेको के हो?"
                  : language === "new"
                  ? "Python के छ?"
                  : "What is Python?"}
              </h2>
              
              <ul className="space-y-3 text-neutral-600 leading-relaxed">
                {(language === "ne"
                  ? [
                      "Python एक सरल र सिक्न सजिलो प्रोग्रामिङ भाषा हो।",
                      "यसको सिन्ट्याक्स अंग्रेजी भाषासँग मिल्दोजुल्दो छ।",
                      "Python ले विभिन्न प्रकारका अनुप्रयोगहरू बनाउन सक्षम बनाउँछ।",
                      "यो वेब विकास, डाटा विज्ञान, AI, र मोबाइल अनुप्रयोगहरूमा प्रयोग गरिन्छ।",
                      "Python ले ठूलो मानक लाइब्रेरी र तेस्रो-पक्ष प्याकेजहरू प्रदान गर्छ।",
                    ]
                  : language === "new"
                  ? [
                      "Python एँक सरल र सिक्न सजिलो प्रोग्रामिङ भाषा छ।",
                      "येक सिन्ट्याक्स अंग्रेजी भाषासँग मिल्दोजुल्दो छ।",
                      "Python ले विभिन्न प्रकारक अनुप्रयोग बनौना सक्षम गराय्।",
                      "यो वेब विकास, डाटा विज्ञान, AI, र मोबाइल अनुप्रयोगम प्रयोग जाय्।",
                      "Python ले ठूलो मानक लाइब्रेरी र तेस्रो-पक्ष प्याकेज दिन्छ।",
                    ]
                  : [
                      "Python is a simple and easy-to-learn programming language.",
                      "Its syntax is similar to the English language.",
                      "Python enables building various types of applications.",
                      "It's used in web development, data science, AI, and mobile applications.",
                      "Python provides a large standard library and third-party packages.",
                    ]).map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
              
              <hr className="border-gray-300" />
              
              <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                {language === "ne"
                  ? "किन Python सिक्ने?"
                  : language === "new"
                  ? "Python किँ सिकय्?"
                  : "Why Learn Python?"}
              </h2>
              
              <p className="text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "Python ले धेरै क्षेत्रहरूमा रोजगारीको अवसर प्रदान गर्छ र यो सिक्न सजिलो छ।"
                  : language === "new"
                  ? "Python ले धेरै क्षेत्रम रोजगारीक अवसर दिन्छ र यो सिक्न सजिलो छ।"
                  : "Python offers job opportunities in many fields and is easy to learn."}
              </p>
              
              <ul className="space-y-3 text-neutral-600 leading-relaxed">
                {(language === "ne"
                  ? [
                      "वेब विकास र ब्याकएन्ड प्रोग्रामिङ",
                      "डाटा विज्ञान र मशीन लर्निङ",
                      "कृत्रिम बुद्धिमत्ता र डीप लर्निङ",
                      "साइन्टिफिक कम्प्युटिङ र रिसर्च",
                      "ओटोमेशन र स्क्रिप्टिङ",
                    ]
                  : language === "new"
                  ? [
                      "वेब विकास र ब्याकएन्ड प्रोग्रामिङ",
                      "डाटा विज्ञान र मशीन लर्निङ",
                      "कृत्रिम बुद्धिमत्ता र डीप लर्निङ",
                      "वैज्ञानिक कम्प्युटिङ र अनुसन्धान",
                      "स्वचालन र स्क्रिप्टिङ",
                    ]
                  : [
                      "Web development and backend programming",
                      "Data science and machine learning",
                      "Artificial intelligence and deep learning",
                      "Scientific computing and research",
                      "Automation and scripting",
                    ]).map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
              
              <hr className="border-gray-300" />
              
              <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                {language === "ne"
                  ? "Python को पहिलो प्रोग्राम"
                  : language === "new"
                  ? "Python क पहिलो प्रोग्राम"
                  : "Your First Python Program"}
              </h2>
              
              <p className="text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "Python मा 'Hello, World!' प्रोग्राम लेख्न यति सजिलो छ:"
                  : language === "new"
                  ? "Python म 'Hello, World!' प्रोग्राम लेख्न यति सजिलो छ:"
                  : "Writing a 'Hello, World!' program in Python is this simple:"}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-mono text-sm text-gray-700">
                  print(&quot;Hello, World!&quot;)
                </p>
              </div>
              
              <p className="text-neutral-600 leading-relaxed mt-4">
                {language === "ne"
                  ? "यो एकल लाइनले स्क्रिनमा 'Hello, World!' प्रिन्ट गर्छ।"
                  : language === "new"
                  ? "ये एँक लाइनले स्क्रिनम 'Hello, World!' प्रिन्ट गराय्।"
                  : "This single line prints 'Hello, World!' to the screen."}
              </p>
              
              <hr className="border-gray-300" />
            </div>
          )}
          
          {/* Python Basics Content - Step 2 */}
          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <p className="text-xl text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "Python मा आधारभूत कुराहरू सिक्नुहोस् जसले तपाईंलाई सरल प्रोग्रामहरू लेख्न सक्षम बनाउँछन्।"
                  : language === "new"
                  ? "Python म बुनियादी कुरा सिकइ जो तंय्ले सरल प्रोग्राम लेखना सक्षम बनाय्।"
                  : "Learn the fundamentals in Python that will enable you to write simple programs."}
              </p>
              
              <hr className="border-gray-300" />
              
              <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                {language === "ne"
                  ? "Python सिन्ट्याक्स"
                  : language === "new"
                  ? "Python सिन्ट्याक्स"
                  : "Python Syntax"}
              </h2>
              
              <p className="text-neutral-600 leading-relaxed">
                {language === "ne"
                  ? "Python को सिन्ट्याक्स सरल र पठनीय छ। यसले इन्डेन्टेशन (indentation) प्रयोग गर्छ कोड ब्लकहरू परिभाषित गर्न।"
                  : language === "new"
                  ? "Python क सिन्ट्याक्स सरल र पढ्न सजिलो छ। यो इन्डेन्टेशन प्रयोग गरि कोड ब्लक परिभाषित गराय्।"
                  : "Python's syntax is simple and readable. It uses indentation to define code blocks."}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-mono text-sm text-gray-700">
                  if x &gt; 0:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;print(&quot;Positive&quot;)<br/>
                  else:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;print(&quot;Negative&quot;)
                </p>
              </div>
              
              <hr className="border-gray-300" />
              
              <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                {language === "ne"
                  ? "चरहरू र डाटा प्रकारहरू"
                  : language === "new"
                  ? "चर र डाटा प्रकार"
                  : "Variables and Data Types"}
              </h2>
              
              <ul className="space-y-3 text-neutral-600 leading-relaxed">
                {(language === "ne"
                  ? [
                      "चरहरू बिना टाइप घोषणा बनाउन सकिन्छ",
                      "पूर्णांक (int), फ्लोट (float), स्ट्रिङ (str), बूलियन (bool)",
                      "डाटा प्रकार स्वचालित रूपमा निर्धारित हुन्छ",
                      "डायनामिक टाइपिङ समर्थन गर्छ",
                    ]
                  : language === "new"
                  ? [
                      "चर बिना टाइप घोषणा बनौना सकिंछ",
                      "पूर्णांक (int), फ्लोट (float), स्ट्रिङ (str), बूलियन (bool)",
                      "डाटा प्रकार स्वचालित रूपम निर्धारित जाय्",
                      "डायनामिक टाइपिङ समर्थन गराय्",
                    ]
                  : [
                      "Variables can be created without type declaration",
                      "Integer (int), float, string (str), boolean (bool)",
                      "Data types are automatically determined",
                      "Supports dynamic typing",
                    ]).map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
              
              <hr className="border-gray-300" />
            </div>
          )}
          
          {/* Navigation Button */}
          <div className="fixed bottom-6 right-6 z-50">
            {currentStep === 1 ? (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                asChild
              >
                <a href="/lesson/lesson-1/python-basics">
                  Next: Python Basics →
                </a>
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                className="px-6"
                onClick={handleFinishLesson}
              >
                Finish Lesson 🎉
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 