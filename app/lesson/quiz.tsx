"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CongratulationPage } from "@/components/congratulation-page";
import { useLanguage } from "@/contexts/language-context";

export const Quiz = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const { language } = useLanguage();
  


  // Determine which lesson this is based on the lessonTitle
  const isLesson1 = lessonTitle === "HTML Introduction";
  const isLesson2 = lessonTitle === "HTML Basics";
  const isLesson3 = lessonTitle === "HTML Elements";
  const isLesson4 = lessonTitle === "HTML Attributes";
  const isLesson5 = lessonTitle === "HTML Structure";

  // Play sound effect when congratulations screen shows
  useEffect(() => {
    if (playSound) {
      const audio = new Audio('/finish.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
      setPlaySound(false);
    }
  }, [playSound]);

  const handleFinishLesson = () => {
    if (isLesson1 || isLesson2 || isLesson3 || isLesson4 || isLesson5) {
      setShowCongratulations(true);
      setPlaySound(true);
    }
  };

  // Add CSS styles for confetti animation
  useEffect(() => {
    if (showCongratulations) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        .confetti-piece {
          position: absolute;
          top: -10px;
          font-size: 2rem;
          animation: confetti-fall 3s linear infinite;
          z-index: 10;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [showCongratulations]);

  const getStepHeading = () => {
    if (isLesson1) {
      return currentStep === 1 ? "HTML Introduction" : 
             currentStep === 2 ? "HTML Element" : 
             currentStep === 3 ? "Web Browsers" :
             currentStep === 4 ? "HTML Page Structure" :
             currentStep === 5 ? "HTML History" :
             currentStep === 6 ? "HTML Forms" :
             currentStep === 7 ? "HTML Tables" :
             currentStep === 8 ? "HTML Lists" :
             currentStep === 9 ? "HTML Media" :
             "Best Practices";
    } else if (isLesson2) {
      return currentStep === 1 ? "HI" : "HLO";
    } else if (isLesson3) {
      return currentStep === 1 ? "WE" : "GUE";
    } else if (isLesson4) {
      return currentStep === 1 ? "HTML ATTRIBUTES" : "ADVANCED ATTRIBUTES";
    } else if (isLesson5) {
      return currentStep === 1 ? "HTML STRUCTURE" : "ADVANCED STRUCTURE";
    }
    return lessonTitle;
  };

  const getNextButton = () => {
    if (isLesson1) {
      if (currentStep === 1) {
        return { href: "/lesson/lesson-1/html-element", text: "Next: HTML Element →" };
      } else if (currentStep === 2) {
        return { href: "/lesson/lesson-1/web-browsers", text: "Next: Web Browsers →" };
      } else if (currentStep === 3) {
        return { href: "/lesson/lesson-1/html-page-structure", text: "Next: HTML Page Structure →" };
      } else if (currentStep === 4) {
        return { href: "/lesson/lesson-1/html-history", text: "Next: HTML History →" };
      } else if (currentStep === 5) {
        return { href: "/lesson/lesson-1/html-forms", text: "Next: HTML Forms →" };
      } else if (currentStep === 6) {
        return { href: "/lesson/lesson-1/html-tables", text: "Next: HTML Tables →" };
      } else if (currentStep === 7) {
        return { href: "/lesson/lesson-1/html-lists", text: "Next: HTML Lists →" };
      } else if (currentStep === 8) {
        return { href: "/lesson/lesson-1/html-media", text: "Next: HTML Media →" };
      } else if (currentStep === 9) {
        return { href: "/lesson/lesson-1/html-best-practices", text: "Next: Best Practices →" };
      }
    } else if (isLesson2) {
      if (currentStep === 1) {
        return { href: "/lesson/lesson-2/hlo", text: "Next: hlo →" };
      }
    } else if (isLesson3) {
      if (currentStep === 1) {
        return { href: "/lesson/lesson-3/gue", text: "Next: Element Types →" };
      }
    } else if (isLesson4) {
      if (currentStep === 1) {
        return { href: "/lesson/lesson-4/html-attributes-advanced", text: "Next: Attribute Types →" };
      }
    } else if (isLesson5) {
      if (currentStep === 1) {
        return { href: "/lesson/lesson-5/html-structure-advanced", text: "Next: Structure Patterns →" };
      }
    }
    
    // Default finish button
    return { href: "/learn", text: "Finish Lesson 🎉" };
  };

  const nextButton = getNextButton();
  const isLastStep = nextButton.href === "/learn";

  // Show congratulations screen for all lessons
  if (showCongratulations && (isLesson1 || isLesson2 || isLesson3 || isLesson4 || isLesson5)) {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
            <CongratulationPage
              points={
                isLesson1 ? 25 : 
                isLesson2 ? 20 : 
                isLesson3 ? 18 : 
                isLesson4 ? 22 : 
                isLesson5 ? 24 : 20
              }
              hearts={3}
              onContinue={() => window.location.href = "/learn"}
              onPracticeAgain={() => {
                setShowCongratulations(false);
                // Reset to first step of the lesson
                if (isLesson1) {
                  window.location.href = "/lesson/lesson-1/html-introduction";
                } else if (isLesson2) {
                  window.location.href = "/lesson/lesson-2/hi";
                } else if (isLesson3) {
                  window.location.href = "/lesson/lesson-3/we";
                } else if (isLesson4) {
                  window.location.href = "/lesson/lesson-4/html-attributes";
                } else if (isLesson5) {
                  window.location.href = "/lesson/lesson-5/html-structure";
                }
              }}
              title={
                isLesson1 ? "Congratulations! You've completed HTML Introduction!" :
                isLesson2 ? "Congratulations! You've completed HTML Basics!" :
                isLesson3 ? "Congratulations! You've completed HTML Elements!" :
                isLesson4 ? "Congratulations! You've completed HTML Attributes!" :
                isLesson5 ? "Congratulations! You've completed HTML Structure!" :
                "Congratulations! You've completed the lesson!"
              }
              lessonTitle={
                isLesson1 ? "HTML Introduction" :
                isLesson2 ? "HTML Basics" :
                isLesson3 ? "HTML Elements" :
                isLesson4 ? "HTML Attributes" :
                isLesson5 ? "HTML Structure" :
                "Lesson"
              }
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
        <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
              {getStepHeading()}
            </h1>
            
            {/* HTML Introduction Content */}
            {isLesson1 && currentStep === 1 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML वेब पेजहरू बनाउन प्रयोग हुने मानक मार्कअप भाषा हो।" : "HTML is the standard markup language for creating Web pages."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "HTML भनेको के हो?" : "What is HTML?"}
                </h2>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  {(language === "ne" ? [
                    "HTML को पुरा रूप Hyper Text Markup Language हो।",
                    "HTML वेब पेजहरू बनाउन प्रयोग हुने मानक मार्कअप भाषा हो।",
                    "HTML ले वेब पेजको संरचना वर्णन गर्छ।",
                    "HTML विभिन्न तत्वहरूको श्रृंखलाबाट बनेको हुन्छ।",
                    "HTML तत्वहरूले ब्राउजरलाई सामग्री कसरी देखाउने भनेर बताउँछन्।",
                    "HTML तत्वहरूले सामग्रीका भागहरूलाई लेबल गर्छन्, जस्तै \"यो एउटा शीर्षक हो\", \"यो एउटा अनुच्छेद हो\", \"यो एउटा लिंक हो\" आदि।"
                  ] : [
                    "HTML stands for Hyper Text Markup Language",
                    "HTML is the standard markup language for creating Web pages",
                    "HTML describes the structure of a Web page",
                    "HTML consists of a series of elements",
                    "HTML elements tell the browser how to display the content",
                    "HTML elements label pieces of content such as \"this is a heading\", \"this is a paragraph\", \"this is a link\", etc."
                  ]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "किन HTML सिक्ने?" : "Why Learn HTML?"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML वेब विकासको आधार हो। तपाईंले हेर्ने हरेक वेबसाइट HTML बाट बनेको हुन्छ। HTML सिक्दा तपाईंले निम्न गर्न सक्नुहुन्छ:" : "HTML is the foundation of web development. Every website you visit is built with HTML. Learning HTML gives you the power to:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  {(language === "ne" ? [
                    "आफ्नै वेबसाइट सुरु देखि बनाउन",
                    "वेब पेजहरू कसरी संरचित हुन्छन् भनेर बुझ्न",
                    "पहिले बनाइएका वेबसाइट र टेम्प्लेटलाई परिमार्जन गर्न",
                    "CSS र JavaScript सिक्नको लागि बलियो आधार बनाउन",
                    "वेब विकास क्षेत्रमा करिअर बनाउन"
                  ] : [
                    "Create your own websites from scratch",
                    "Understand how web pages are structured",
                    "Customize existing websites and templates",
                    "Build a strong foundation for learning CSS and JavaScript",
                    "Pursue a career in web development"
                  ]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "HTML कसरी काम गर्छ" : "How HTML Works"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML ले सामग्रीलाई ट्याग (tags) मार्फत चिन्ह लगाएर काम गर्छ। यी ट्यागहरूले वेब ब्राउजरलाई सूचना कसरी देखाउने भनेर बताउँछन्। उदाहरणका लागि:" : "HTML works by using tags to mark up content. These tags tell web browsers how to display the information. For example:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    {(language === "ne" ? "<h1>यो एउटा शीर्षक हो</h1>\n<p>यो एउटा अनुच्छेद हो</p>\n<a href=\"...\">यो एउटा लिंक हो</a>" : "<h1>This is a heading</h1>\n<p>This is a paragraph</p>\n<a href=\"...\">This is a link</a>").split('\n').map((line: string, index: number) => (
                      <span key={index}>
                        {line}
                        {index < (language === "ne" ? "<h1>यो एउटा शीर्षक हो</h1>\n<p>यो एउटा अनुच्छेद हो</p>\n<a href=\"...\">यो एउटा लिंक हो</a>" : "<h1>This is a heading</h1>\n<p>This is a paragraph</p>\n<a href=\"...\">This is a link</a>").split('\n').length - 1 && <br/>}
                      </span>
                    ))}
                  </p>
                </div>
                
                <p className="text-neutral-600 leading-relaxed mt-4">
                  {language === "ne" ? "जब ब्राउजरले यो HTML पढ्छ, उसले पहिलो लाइनलाई ठूलो शीर्षक, दोस्रोलाई अनुच्छेद, र तेस्रोलाई क्लिक गर्न मिल्ने लिंकको रूपमा देखाउँछ।" : "When a browser reads this HTML, it knows to display the first line as a large heading, the second as a paragraph, and the third as a clickable link."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "तपाईं के सिक्नुहुनेछ" : "What You'll Learn"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "यस कोर्समा, तपाईंले निम्न कुरा सिक्नुहुनेछ:" : "In this course, you'll learn how to:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  {(language === "ne" ? [
                    "सफा र अर्थपूर्ण (semantic) HTML कोड लेख्न",
                    "उचित शीर्षक र खण्डहरूसँग वेब पेज संरचना बनाउन",
                    "सूची, लिंक, र छविहरू बनाउन",
                    "प्रयोगकर्ताको इनपुटका लागि फाराम बनाउन",
                    "HTML का उत्कृष्ट अभ्यास (best practices) र पहुँचयोग्यता (accessibility) बुझ्न"
                  ] : [
                    "Write clean, semantic HTML code",
                    "Structure web pages with proper headings and sections",
                    "Create lists, links, and images",
                    "Build forms for user input",
                    "Understand HTML best practices and accessibility"
                  ]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Element Content */}
            {isLesson1 && currentStep === 2 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML तत्वहरू HTML पेजहरूका बिल्डिङ ब्लकहरू हुन्। प्रत्येक तत्वले विभिन्न प्रकारको सामग्री प्रतिनिधित्व गर्छ र ब्राउजरलाई यसलाई कसरी देखाउने भनेर बताउँछ।" : "HTML elements are the building blocks of HTML pages. Each element represents a different type of content and tells the browser how to display it."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "HTML तत्व भनेको के हो?" : "What is an HTML Element?"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "एउटा HTML तत्वलाई सुरु ट्याग, केही सामग्री, र अन्त्य ट्यागले परिभाषित गरिन्छ। तत्वहरूले अन्य तत्वहरू, टेक्स्ट, वा खाली हुन सक्छन्।" : "An HTML element is defined by a start tag, some content, and an end tag. Elements can contain other elements, text, or be empty."}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;tagname&gt;Content goes here...&lt;/tagname&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "आधारभूत HTML तत्वहरू" : "Basic HTML Elements"}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "शीर्षक तत्वहरू" : "Heading Elements"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "h1 देखि h6 सम्मका शीर्षक तत्वहरू" : "Heading elements from h1 to h6"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;h1&gt;{language === "ne" ? "मुख्य शीर्षक" : "Main Heading"}&lt;/h1&gt;<br/>
                        &lt;h2&gt;{language === "ne" ? "उप-शीर्षक" : "Sub Heading"}&lt;/h2&gt;<br/>
                        &lt;h3&gt;{language === "ne" ? "खण्ड शीर्षक" : "Section Heading"}&lt;/h3&gt;
                      </p>
                    </div>
                    <p className="text-neutral-600 text-xs mt-2">
                      {language === "ne" ? "h1 सबैभन्दा महत्वपूर्ण हो, h6 सबैभन्दा कम महत्वपूर्ण हो" : "h1 is the most important, h6 is the least important"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "पैराग्राफ तत्व" : "Paragraph Element"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "टेक्स्ट सामग्रीको लागि प्रयोग गरिने तत्व" : "Element used for text content"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;p&gt;{language === "ne" ? "यो एउटा पैराग्राफ हो" : "This is a paragraph"}&lt;/p&gt;
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "लिङ्क तत्व" : "Link Element"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "अन्य पेजहरू वा वेबसाइटहरूमा जडान गर्ने तत्व" : "Element to link to other pages or websites"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;a href="https://example.com"&gt;{language === "ne" ? "यहाँ क्लिक गर्नुहोस्" : "Click here"}&lt;/a&gt;
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "छवि तत्व" : "Image Element"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "छविहरू देखाउन प्रयोग गरिने तत्व" : "Element used to display images"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;img src="image.jpg" alt="{language === "ne" ? "छवि वर्णन" : "Image description"}" /&gt;
                      </p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "HTML तत्वहरूको संरचना" : "HTML Element Structure"}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "सुरु ट्याग" : "Opening Tag"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "तत्वको सुरुवात चिन्हित गर्ने ट्याग" : "Tag that marks the beginning of an element"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "सामग्री" : "Content"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "तत्वको वास्तविक सामग्री (टेक्स्ट, अन्य तत्वहरू, वा खाली)" : "The actual content of the element (text, other elements, or empty)"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "अन्त्य ट्याग" : "Closing Tag"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "तत्वको अन्त्य चिन्हित गर्ने ट्याग (सुरु ट्यागमा / थपेर)" : "Tag that marks the end of an element (add / to opening tag)"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>{language === "ne" ? "स्मरण राख्नुहोस्:" : "Remember:"}</strong> {language === "ne" ? "सबै HTML तत्वहरूले अन्त्य ट्याग चाहिन्छन् (स्व-बन्द तत्वहरू बाहेक जस्तै &lt;img&gt; वा &lt;br&gt;)" : "All HTML elements need closing tags (except self-closing elements like &lt;img&gt; or &lt;br&gt;)"}
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "तत्वहरूको नेस्टिङ" : "Nesting Elements"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML तत्वहरूलाई एकअर्कामा राख्न सकिन्छ। यसलाई नेस्टिङ भनिन्छ र यो HTML को शक्तिशाली विशेषता हो।" : "HTML elements can be placed inside each other. This is called nesting and it's a powerful feature of HTML."}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;div&gt;<br/>
                    &nbsp;&nbsp;&lt;h1&gt;{language === "ne" ? "शीर्षक" : "Title"}&lt;/h1&gt;<br/>
                    &nbsp;&nbsp;&lt;p&gt;{language === "ne" ? "यहाँ केही <strong>महत्वपूर्ण</strong> सामग्री छ" : "Here is some <strong>important</strong> content"}&lt;/p&gt;<br/>
                    &lt;/div&gt;
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-red-800 text-sm">
                    <strong>{language === "ne" ? "गलत:" : "Wrong:"}</strong> {language === "ne" ? "ट्यागहरू गलत क्रममा बन्द गर्नुहोस्" : "Closing tags in wrong order"}<br/>
                    &lt;p&gt;&lt;strong&gt;{language === "ne" ? "सामग्री" : "Content"}&lt;/p&gt;&lt;/strong&gt;
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm">
                    <strong>{language === "ne" ? "सही:" : "Correct:"}</strong> {language === "ne" ? "ट्यागहरू सही क्रममा बन्द गर्नुहोस्" : "Closing tags in correct order"}<br/>
                    &lt;p&gt;&lt;strong&gt;{language === "ne" ? "सामग्री" : "Content"}&lt;/strong&gt;&lt;/p&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* Web Browsers Content */}
            {isLesson1 && currentStep === 3 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne" ? "वेब ब्राउजरहरू सफ्टवेयर अनुप्रयोगहरू हुन् जसले वर्ल्ड वाइड वेबमा जानकारी पुनर्प्राप्त, प्रदर्शन, र नेभिगेट गर्छन्। तिनीहरू HTML कोड व्याख्या गर्छन् र दृश्य वेब पेजहरूमा रेन्डर गर्छन्।" : "Web browsers are software applications that retrieve, display, and navigate information on the World Wide Web. They interpret HTML code and render it into visual web pages."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "ब्राउजरहरू कसरी काम गर्छन्" : "How Browsers Work"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "जब तपाईं कुनै वेबसाइटमा जानुहुन्छ, ब्राउजरले पृष्ठ देखाउनका लागि केही चरणहरू पालना गर्छ:" : "When you visit a website, your browser goes through several steps to display the page:"}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "अनुरोध (Request)" : "Request"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "ब्राउजरले वेब सर्भरलाई HTML फाइलको लागि अनुरोध पठाउँछ" : "Browser sends a request to the web server for the HTML file"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "प्राप्त (Receive)" : "Receive"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "सर्भरले HTML डकुमेन्ट र सम्बन्धित स्रोतहरू फिर्ता पठाउँछ" : "Server sends back the HTML document and related resources"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "पार्स (Parse)" : "Parse"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "ब्राउजरले HTML पार्स गर्छ र DOM (Document Object Model) बनाउँछ" : "Browser parses the HTML and creates a Document Object Model (DOM)"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "रेन्डर (Render)" : "Render"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "ब्राउजरले HTML संरचना र CSS शैलीको आधारमा पृष्ठ रेन्डर गर्छ" : "Browser renders the page based on the HTML structure and CSS styling"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "लोकप्रिय वेब ब्राउजरहरू" : "Popular Web Browsers"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Chrome</h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "Google द्वारा विकसित, उच्च गति र प्रशस्त एक्सटेन्सन समर्थनका लागि प्रसिद्ध" : "Developed by Google, known for speed and extensive extension support"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Firefox</h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "Mozilla द्वारा विकसित खुला-स्रोत ब्राउजर, गोपनीयता र अनुकूलनमा केन्द्रित" : "Open-source browser by Mozilla, focuses on privacy and customization"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Safari</h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "Apple को ब्राउजर, macOS र iOS डिभाइसहरूका लागि अनुकूलित" : "Apple's browser, optimized for macOS and iOS devices"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Edge</h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "Microsoft को आधुनिक ब्राउजर, Chromium इञ्जिनमा निर्मित" : "Microsoft's modern browser, built on Chromium engine"}
                    </p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "ब्राउजर डेभलपर टुलहरू" : "Browser Developer Tools"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "आधुनिक ब्राउजरहरूमा वेब विकासकर्तालाई मद्दत गर्ने शक्तिशाली डेभलपर टुलहरू समावेश हुन्छन्:" : "Modern browsers include powerful developer tools that help web developers:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>{language === "ne" ? "इन्स्पेक्ट एलिमेन्ट:" : "Inspect Element:"}</strong> {language === "ne" ? "रियल-टाइममा HTML संरचना हेर्न र परिमार्जन गर्न" : "View and modify HTML structure in real-time"}</li>
                  <li>• <strong>{language === "ne" ? "कन्सोल:" : "Console:"}</strong> {language === "ne" ? "JavaScript कोड चलाउन र त्रुटि सन्देशहरू हेर्न" : "Run JavaScript code and view error messages"}</li>
                  <li>• <strong>{language === "ne" ? "नेटवर्क ट्याब:" : "Network Tab:"}</strong> {language === "ne" ? "HTTP अनुरोध र प्रतिक्रिया निगरानी गर्न" : "Monitor HTTP requests and responses"}</li>
                  <li>• <strong>{language === "ne" ? "प्रदर्शन:" : "Performance:"}</strong> {language === "ne" ? "पृष्ठ लोड गति र अनुकूलन विश्लेषण गर्न" : "Analyze page loading speed and optimization"}</li>
                  <li>• <strong>{language === "ne" ? "रिस्पोन्सिभ डिजाइन:" : "Responsive Design:"}</strong> {language === "ne" ? "विभिन्न स्क्रिन आकारहरूमा पृष्ठहरू कसरी देखिन्छन् परीक्षण गर्न" : "Test how pages look on different screen sizes"}</li>
                </ul>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>{language === "ne" ? "सुझाव:" : "Tip:"}</strong> {language === "ne" ? "धेरै ब्राउजरहरूमा डेभलपर टुल खोल्न F12 थिच्नुहोस् वा राइट-क्लिक गरी \"Inspect\" छान्नुहोस्।" : "Press F12 or right-click and select \"Inspect\" to open developer tools in most browsers."}
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "क्रस-ब्राउजर कम्प्याटिबिलिटी" : "Cross-Browser Compatibility"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "विभिन्न ब्राउजरहरूले HTML लाई अलि फरक तरिकाले व्याख्या गर्न सक्छन्। त्यसैले यो कुरा महत्त्वपूर्ण छ:" : "Different browsers may interpret HTML slightly differently. This is why it's important to:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• {language === "ne" ? "सफा र मापदण्ड-अनुरूप HTML कोड लेख्नुहोस्" : "Write clean, standards-compliant HTML code"}</li>
                  <li>• {language === "ne" ? "आफ्नो वेबसाइटलाई विभिन्न ब्राउजरहरूमा परीक्षण गर्नुहोस्" : "Test your websites in multiple browsers"}</li>
                  <li>• {language === "ne" ? "ब्राउजरका डिफल्टमा भर नपरी शैलीकृत गर्न CSS प्रयोग गर्नुहोस्" : "Use CSS for styling instead of relying on browser defaults"}</li>
                  <li>• {language === "ne" ? "समान शैलीका लागि CSS reset वा normalize.css प्रयोग गर्ने विचार गर्नुहोस्" : "Consider using CSS resets or normalize.css for consistent styling"}</li>
                </ul>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Page Structure Content */}
            {isLesson1 && currentStep === 4 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML पेज संरचनाले HTML डकुमेन्टहरू कसरी संगठित र संरचित गरिन्छ भन्ने कुरालाई जनाउँछ। हरेक HTML पेजले ब्राउजरहरूले हेर्ने अपेक्षा गरेको मानक संरचना पालना गर्छ।" : "HTML page structure refers to the way HTML documents are organized and structured. Every HTML page follows a standard structure that browsers expect to see."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "आधारभूत HTML डकुमेन्ट संरचना" : "Basic HTML Document Structure"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "हरेक HTML डकुमेन्टमा केही आवश्यक तत्वहरू समावेश गर्ने विशिष्ट संरचना हुन्छ:" : "Every HTML document has a specific structure that includes several essential elements:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;!DOCTYPE html&gt;<br/>
                    &lt;html&gt;<br/>
                    &nbsp;&nbsp;&lt;head&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;{language === "ne" ? "पेज शीर्षक" : "Page Title"}&lt;/title&gt;<br/>
                    &nbsp;&nbsp;&lt;/head&gt;<br/>
                    &nbsp;&nbsp;&lt;body&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;{language === "ne" ? "मुख्य शीर्षक" : "Main Heading"}&lt;/h1&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;{language === "ne" ? "पेज सामग्री यहाँ जान्छ" : "Page content goes here"}&lt;/p&gt;<br/>
                    &nbsp;&nbsp;&lt;/body&gt;<br/>
                    &lt;/html&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "आवश्यक HTML तत्वहरू" : "Essential HTML Elements"}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "DOCTYPE घोषणा" : "DOCTYPE Declaration"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "ब्राउजरलाई यो HTML5 डकुमेन्ट हो भनेर बताउँछ" : "Tells the browser this is an HTML5 document"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">&lt;!DOCTYPE html&gt;</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "HTML मूल तत्व" : "HTML Root Element"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "सम्पूर्ण HTML डकुमेन्टको लागि मूल कन्टेनर" : "The root container for the entire HTML document"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">&lt;html lang="en"&gt;...&lt;/html&gt;</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "हेड खण्ड" : "Head Section"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "मेटाडाटा, शीर्षक, र बाह्य स्रोतहरूमा लिङ्कहरू समावेश गर्छ" : "Contains metadata, title, and links to external resources"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">&lt;head&gt;...&lt;/head&gt;</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "बडी खण्ड" : "Body Section"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "वेबपेजको सबै दृश्य सामग्री समावेश गर्छ" : "Contains all the visible content of the webpage"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">&lt;body&gt;...&lt;/body&gt;</p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Head Section Elements
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">&lt;title&gt;</h4>
                    <p className="text-sm text-neutral-600">Sets the page title shown in browser tabs and bookmarks</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">&lt;meta&gt;</h4>
                    <p className="text-sm text-neutral-600">Provides metadata like character encoding and viewport settings</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">&lt;link&gt;</h4>
                    <p className="text-sm text-neutral-600">Links to external resources like CSS files and favicons</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">&lt;script&gt;</h4>
                    <p className="text-sm text-neutral-600">Embeds or links to JavaScript code</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Semantic HTML Structure
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Modern HTML uses semantic elements that clearly describe their purpose:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-800 mb-2">Header & Navigation</h3>
                    <div className="font-mono text-sm text-blue-700">
                      &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-medium text-green-800 mb-2">Content Sections</h3>
                    <div className="font-mono text-sm text-green-700">
                      &lt;section&gt;, &lt;article&gt;, &lt;aside&gt;
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-medium text-purple-800 mb-2">Footer</h3>
                    <div className="font-mono text-sm text-purple-700">
                      &lt;footer&gt;
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Best Practices
                </h2>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• Always include the DOCTYPE declaration</li>
                  <li>• Use semantic HTML elements when possible</li>
                  <li>• Include proper meta tags for SEO and accessibility</li>
                  <li>• Structure your content logically with proper headings</li>
                  <li>• Validate your HTML using online validators</li>
                  <li>• Keep your code clean and well-indented</li>
                </ul>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm">
                    <strong>Pro Tip:</strong> Use the HTML5 semantic elements to make your code more readable and accessible to screen readers.
                  </p>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML History Content */}
            {isLesson1 && currentStep === 5 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML ले 1990 को दशकको सुरुवातमा यसको सिर्जनादेखि धेरै विकास गरेको छ। यसको इतिहास बुझ्नाले वेब मापदण्डहरू कसरी विकसित भएका छन् र आज केही प्रथाहरू किन अवस्थित छन् भनेर बुझ्न मद्दत गर्छ।" : "HTML has evolved significantly since its creation in the early 1990s. Understanding its history helps us appreciate how web standards have developed and why certain practices exist today."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "HTML को जन्म" : "The Birth of HTML"}
                </h2>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Tim Berners-Lee (1989-1991)</h3>
                  <p className="text-blue-700 text-sm">
                    {language === "ne" ? "CERN मा काम गर्दै गर्दा, Tim Berners-Lee ले वैज्ञानिक डकुमेन्टहरू साझा गर्ने तरिकाको रूपमा HTML सिर्जना गरे। उनले पहिलो वेब ब्राउजर र वेब सर्भर पनि सिर्जना गरे।" : "While working at CERN, Tim Berners-Lee created HTML as a way to share scientific documents. He also created the first web browser and web server."}
                  </p>
                </div>
                
                <p className="text-neutral-600 leading-relaxed mt-4">
                  {language === "ne" ? "HTML लाई मूल रूपमा सरल र प्रस्तुतिकरण भन्दा डकुमेन्ट संरचनामा केन्द्रित हुन डिजाइन गरिएको थियो। लक्ष्य थियो विभिन्न कम्प्युटर प्रणालीहरूमा काम गर्न सक्ने सार्वभौमिक मार्कअप भाषा सिर्जना गर्नु।" : "HTML was originally designed to be simple and focused on document structure rather than presentation. The goal was to create a universal markup language that could work across different computer systems."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "HTML संस्करण समयरेखा" : "HTML Version Timeline"}
                </h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-medium text-neutral-700 mb-2">HTML 1.0 (1993)</h3>
                    <p className="text-neutral-600 text-sm">
                      {language === "ne" ? "पहिलो आधिकारिक HTML मापदण्ड। सरल तत्वहरू र बुनियादी संरचना मात्र समावेश थियो।" : "The first official HTML standard. Included only simple elements and basic structure."}
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-medium text-neutral-700 mb-2">HTML 2.0 (1995)</h3>
                    <p className="text-neutral-600 text-sm">
                      {language === "ne" ? "फारमहरू, टेबलहरू, र छविहरूको समर्थन थपियो। यो पहिलो HTML मापदण्ड थियो जुन RFC द्वारा मानकीकृत गरिएको थियो।" : "Added support for forms, tables, and images. This was the first HTML standard to be standardized by RFC."}
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-medium text-neutral-700 mb-2">HTML 3.2 (1997)</h3>
                    <p className="text-neutral-600 text-sm">
                      {language === "ne" ? "W3C द्वारा पहिलो मापदण्ड। फन्ट, रङ, र केही लेआउट नियन्त्रणहरू थपियो।" : "First standard by W3C. Added fonts, colors, and some layout controls."}
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-medium text-neutral-700 mb-2">HTML 4.01 (1999)</h3>
                    <p className="text-neutral-600 text-sm">
                      {language === "ne" ? "महत्वपूर्ण अपडेटहरू: CSS समर्थन, स्क्रिप्टिङ, र अधिक सिमान्टिक तत्वहरू। यो लामो समयसम्म प्रमुख मापदण्ड रह्यो।" : "Major updates: CSS support, scripting, and more semantic elements. This remained the dominant standard for a long time."}
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-medium text-neutral-700 mb-2">HTML5 (2014)</h3>
                    <p className="text-neutral-600 text-sm">
                      {language === "ne" ? "आधुनिक वेबका लागि पूर्ण रूपमा पुनर्डिजाइन गरिएको। नयाँ सिमान्टिक तत्वहरू, मल्टिमिडिया समर्थन, र वेब अनुप्रयोगहरूका लागि विशेषताहरू थपियो।" : "Completely redesigned for the modern web. Added new semantic elements, multimedia support, and features for web applications."}
                    </p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "महत्वपूर्ण विकासकर्ताहरू" : "Key Developments"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "CSS को उदय" : "Rise of CSS"}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "HTML बाट प्रस्तुतिकरण अलग गर्ने प्रयासले CSS लाई जन्म दियो। यसले वेब डिजाइनलाई क्रान्तिकारी रूपमा परिवर्तन गर्यो।" : "The effort to separate presentation from HTML gave birth to CSS. This revolutionized web design."}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "सिमान्टिक HTML" : "Semantic HTML"}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "HTML5 ले सामग्रीको अर्थ र संरचनालाई प्राथमिकता दिने तत्वहरू थप्यो। यसले एक्सेसिबिलिटी र SEO लाई सुधार गर्यो।" : "HTML5 added elements that prioritize meaning and structure over content. This improved accessibility and SEO."}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "मोबाइल वेब" : "Mobile Web"}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "स्मार्टफोनहरूको उदयले रिस्पोन्सिभ डिजाइन र मोबाइल-पहिलो दृष्टिकोणलाई जन्म दियो।" : "The rise of smartphones gave birth to responsive design and mobile-first approaches."}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "वेब अनुप्रयोगहरू" : "Web Applications"}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "HTML5 ले वेब अनुप्रयोगहरू बनाउन सक्षम बनायो जुन डेस्कटप अनुप्रयोगहरूसँग प्रतिस्पर्धा गर्न सक्छन्।" : "HTML5 enabled web applications that can compete with desktop applications."}
                    </p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "भविष्यको रुझानहरू" : "Future Trends"}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "Web Components" : "Web Components"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "पुनः प्रयोग गर्न सकिने कस्टम तत्वहरू बनाउन सक्षम बनाउँछ" : "Enables creating reusable custom elements"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "Progressive Web Apps" : "Progressive Web Apps"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "वेब र मोबाइल अनुप्रयोगहरूको बीचको खाडल पूरा गर्ने" : "Bridging the gap between web and mobile applications"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "WebAssembly" : "WebAssembly"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "वेबमा उच्च-प्रदर्शन अनुप्रयोगहरू चलाउन सक्षम बनाउँछ" : "Enables running high-performance applications on the web"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>{language === "ne" ? "स्मरण राख्नुहोस्:" : "Remember:"}</strong> {language === "ne" ? "HTML को इतिहासले हामीलाई सिकाउँछ कि वेब मापदण्डहरू निरन्तर विकसित हुँदैछन्। आजको सर्वोत्तम प्रथाहरू भोलि परिवर्तन हुन सक्छन्।" : "HTML's history teaches us that web standards are constantly evolving. Today's best practices may change tomorrow."}
                  </p>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Forms Content */}
            {isLesson1 && currentStep === 6 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML फारमहरू वेबसाइटहरूमा प्रयोगकर्ता इनपुट संकलन गर्न आवश्यक छन्। तिनीहरूले प्रयोगकर्तालाई डाटा पेश गर्न, छनौट गर्न, र वेब अनुप्रयोगहरूसँग अन्तरक्रिया गर्न अनुमति दिन्छन्।" : "HTML forms are essential for collecting user input on websites. They allow users to submit data, make selections, and interact with web applications."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "आधारभूत फारम संरचना" : "Basic Form Structure"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "हरेक HTML फारम &lt;form&gt; तत्वबाट सुरु हुन्छ र विभिन्न इनपुट तत्वहरू समावेश गर्छ:" : "Every HTML form starts with the &lt;form&gt; element and contains various input elements:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;form action="/submit" method="post"&gt;<br/>
                    &nbsp;&nbsp;&lt;label for="username"&gt;Username:&lt;/label&gt;<br/>
                    &nbsp;&nbsp;&lt;input type="text" id="username" name="username"&gt;<br/>
                    &nbsp;&nbsp;&lt;button type="submit"&gt;Submit&lt;/button&gt;<br/>
                    &lt;/form&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Common Input Types
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Text Inputs</h3>
                    <p className="text-sm text-neutral-600">text, password, email, tel, url</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Selection Inputs</h3>
                    <p className="text-sm text-neutral-600">checkbox, radio, select, textarea</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Special Inputs</h3>
                    <p className="text-sm text-neutral-600">date, time, file, color, range</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Button Types</h3>
                    <p className="text-sm text-neutral-600">submit, reset, button</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Form Validation
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  HTML5 provides built-in validation attributes:
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>required:</strong> Field must be filled before submission</li>
                  <li>• <strong>pattern:</strong> Custom regex validation pattern</li>
                  <li>• <strong>min/max:</strong> Numeric value constraints</li>
                  <li>• <strong>maxlength:</strong> Maximum character limit</li>
                  <li>• <strong>placeholder:</strong> Hint text for input fields</li>
                </ul>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>Example:</strong> &lt;input type="email" required placeholder="Enter your email"&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Form Best Practices
                </h2>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• Always use labels with input fields for accessibility</li>
                  <li>• Group related form elements with fieldset and legend</li>
                  <li>• Provide clear error messages and validation feedback</li>
                  <li>• Use appropriate input types for better mobile experience</li>
                  <li>• Consider using autocomplete for better user experience</li>
                </ul>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Tables Content */}
            {isLesson1 && currentStep === 7 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  HTML tables are used to display data in rows and columns. They're perfect for presenting structured information like schedules, statistics, and comparisons.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  Basic Table Structure
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Tables are built using several key elements:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;table&gt;<br/>
                    &nbsp;&nbsp;&lt;thead&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Header 1&lt;/th&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Header 2&lt;/th&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;<br/>
                    &nbsp;&nbsp;&lt;/thead&gt;<br/>
                    &nbsp;&nbsp;&lt;tbody&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Data 1&lt;/td&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Data 2&lt;/td&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;<br/>
                    &nbsp;&nbsp;&lt;/tbody&gt;<br/>
                    &lt;/table&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Table Elements
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;table&gt;</h3>
                    <p className="text-neutral-600 text-sm">The main container for the entire table</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;thead&gt;</h3>
                    <p className="text-neutral-600 text-sm">Contains the table header row(s)</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;tbody&gt;</h3>
                    <p className="text-neutral-600 text-sm">Contains the main table data</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;tr&gt;</h3>
                    <p className="text-neutral-600 text-sm">Defines a table row</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;th&gt;</h3>
                    <p className="text-neutral-600 text-sm">Table header cell (bold by default)</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;td&gt;</h3>
                    <p className="text-neutral-600 text-sm">Table data cell</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Table Attributes
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">colspan</h4>
                    <p className="text-sm text-neutral-600">Makes a cell span multiple columns</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">rowspan</h4>
                    <p className="text-sm text-neutral-600">Makes a cell span multiple rows</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">border</h4>
                    <p className="text-sm text-neutral-600">Adds borders to table cells</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">cellpadding</h4>
                    <p className="text-sm text-neutral-600">Adds space inside cells</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  When to Use Tables
                </h2>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-800 mb-2">✅ Good Uses:</h3>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Financial data and reports</li>
                    <li>• Product comparison charts</li>
                    <li>• Event schedules and timetables</li>
                    <li>• Statistical data presentation</li>
                    <li>• Any structured, tabular data</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-4">
                  <h3 className="font-medium text-red-800 mb-2">❌ Avoid Using For:</h3>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Page layout and design</li>
                    <li>• Navigation menus</li>
                    <li>• Content that should be in divs</li>
                  </ul>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Lists Content */}
            {isLesson1 && currentStep === 8 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  HTML lists are used to organize and present information in a structured way. They help improve readability and create clear hierarchies in content.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  Types of HTML Lists
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">1. Unordered Lists (&lt;ul&gt;)</h3>
                    <p className="text-neutral-600 text-sm mb-2">Used for items that don't need to be in a specific order</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;ul&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;First item&lt;/li&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;Second item&lt;/li&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;Third item&lt;/li&gt;<br/>
                        &lt;/ul&gt;
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">2. Ordered Lists (&lt;ol&gt;)</h3>
                    <p className="text-neutral-600 text-sm mb-2">Used when the order of items is important</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;ol&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;Step one&lt;/li&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;Step two&lt;/li&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;Step three&lt;/li&gt;<br/>
                        &lt;/ol&gt;
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">3. Definition Lists (&lt;dl&gt;)</h3>
                    <p className="text-neutral-600 text-sm mb-2">Used for term-definition pairs</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;dl&gt;<br/>
                        &nbsp;&nbsp;&lt;dt&gt;HTML&lt;/dt&gt;<br/>
                        &nbsp;&nbsp;&lt;dd&gt;HyperText Markup Language&lt;/dd&gt;<br/>
                        &nbsp;&nbsp;&lt;dt&gt;CSS&lt;/dt&gt;<br/>
                        &nbsp;&nbsp;&lt;dd&gt;Cascading Style Sheets&lt;/dd&gt;<br/>
                        &lt;/dl&gt;
                      </p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  List Attributes
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">type (for &lt;ol&gt;)</h4>
                    <p className="text-sm text-neutral-600">1, A, a, I, i (numbers, letters, roman numerals)</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">start</h4>
                    <p className="text-sm text-neutral-600">Starting number for ordered lists</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">reversed</h4>
                    <p className="text-sm text-neutral-600">Counts down instead of up</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">value</h4>
                    <p className="text-sm text-neutral-600">Specific number for a list item</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Nested Lists
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Lists can be nested inside each other to create complex hierarchies:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;ul&gt;<br/>
                    &nbsp;&nbsp;&lt;li&gt;Main item 1&lt;/li&gt;<br/>
                    &nbsp;&nbsp;&lt;li&gt;Main item 2<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;ul&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;Sub item 2.1&lt;/li&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;Sub item 2.2&lt;/li&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/ul&gt;<br/>
                    &nbsp;&nbsp;&lt;/li&gt;<br/>
                    &nbsp;&nbsp;&lt;li&gt;Main item 3&lt;/li&gt;<br/>
                    &lt;/ul&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Navigation with Lists
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Lists are commonly used for navigation menus:
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>Pro Tip:</strong> Use semantic HTML with CSS styling to create beautiful navigation menus. Lists provide the structure, CSS provides the design.
                  </p>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Media Content */}
            {isLesson1 && currentStep === 9 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  HTML provides powerful elements for embedding and displaying various types of media content, including images, videos, audio, and external content.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  Images (&lt;img&gt;)
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  The &lt;img&gt; element is used to display images on web pages:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;img src="image.jpg" alt="Description" width="300" height="200"&gt;
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">Essential Attributes</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• <strong>src:</strong> Image source URL</li>
                      <li>• <strong>alt:</strong> Alternative text for accessibility</li>
                      <li>• <strong>width/height:</strong> Image dimensions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">Optional Attributes</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• <strong>loading:</strong> Lazy loading for performance</li>
                      <li>• <strong>decoding:</strong> Image decoding hints</li>
                      <li>• <strong>style:</strong> Inline CSS styling</li>
                    </ul>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Video (&lt;video&gt;)
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  The &lt;video&gt; element supports multiple video formats and provides playback controls:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;video width="400" height="300" controls&gt;<br/>
                    &nbsp;&nbsp;&lt;source src="video.mp4" type="video/mp4"&gt;<br/>
                    &nbsp;&nbsp;&lt;source src="video.webm" type="video/webm"&gt;<br/>
                    &nbsp;&nbsp;Your browser does not support the video tag.<br/>
                    &lt;/video&gt;
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> Always provide fallback content for browsers that don't support the video element.
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Audio (&lt;audio&gt;)
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  The &lt;audio&gt; element is used for audio content:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;audio controls&gt;<br/>
                    &nbsp;&nbsp;&lt;source src="audio.mp3" type="audio/mpeg"&gt;<br/>
                    &nbsp;&nbsp;&lt;source src="audio.ogg" type="audio/ogg"&gt;<br/>
                    &lt;/audio&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Iframes (&lt;iframe&gt;)
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Iframes allow you to embed external content from other websites:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;iframe src="https://example.com" width="600" height="400"&gt;&lt;/iframe&gt;
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">Common Uses</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• YouTube videos</li>
                      <li>• Google Maps</li>
                      <li>• Social media posts</li>
                      <li>• External forms</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">Security Considerations</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• Use sandbox attribute</li>
                      <li>• Limit permissions</li>
                      <li>• Trust only reliable sources</li>
                    </ul>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Media Best Practices
                </h2>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• Always provide alt text for images (accessibility)</li>
                  <li>• Use appropriate image formats (JPEG for photos, PNG for graphics)</li>
                  <li>• Optimize media files for web (compression, appropriate sizes)</li>
                  <li>• Consider mobile users (responsive images, touch-friendly controls)</li>
                  <li>• Provide fallback content for unsupported media</li>
                </ul>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Best Practices Content */}
            {isLesson1 && currentStep === 10 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Following HTML best practices ensures your code is clean, accessible, maintainable, and follows web standards. Good HTML practices lead to better user experience and easier development.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  Semantic HTML
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Use semantic elements that clearly describe their purpose:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">Structure Elements</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• &lt;header&gt; - Page header</li>
                      <li>• &lt;nav&gt; - Navigation menu</li>
                      <li>• &lt;main&gt; - Main content</li>
                      <li>• &lt;section&gt; - Content section</li>
                      <li>• &lt;article&gt; - Independent content</li>
                      <li>• &lt;aside&gt; - Sidebar content</li>
                      <li>• &lt;footer&gt; - Page footer</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">Text Elements</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• &lt;strong&gt; - Important text</li>
                      <li>• &lt;em&gt; - Emphasized text</li>
                      <li>• &lt;mark&gt; - Highlighted text</li>
                      <li>• &lt;cite&gt; - Citation</li>
                      <li>• &lt;time&gt; - Date/time</li>
                      <li>• &lt;code&gt; - Code snippet</li>
                    </ul>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Accessibility (A11y)
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Make your HTML accessible to all users, including those using screen readers:
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>Alt text:</strong> Always provide descriptive alt attributes for images</li>
                  <li>• <strong>Headings:</strong> Use proper heading hierarchy (h1 → h2 → h3)</li>
                  <li>• <strong>Labels:</strong> Associate form labels with input fields</li>
                  <li>• <strong>ARIA:</strong> Use ARIA attributes for complex interactions</li>
                  <li>• <strong>Color contrast:</strong> Ensure sufficient contrast between text and background</li>
                  <li>• <strong>Keyboard navigation:</strong> Test navigation without a mouse</li>
                </ul>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm">
                    <strong>Accessibility Tip:</strong> Test your website with screen readers and keyboard navigation to ensure it's accessible to all users.
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Code Quality
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-800 mb-2">Clean Code Practices</h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Use consistent indentation (2 or 4 spaces)</li>
                      <li>• Write meaningful comments for complex sections</li>
                      <li>• Use descriptive class and ID names</li>
                      <li>• Keep lines under 80 characters when possible</li>
                      <li>• Validate your HTML using W3C validator</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-medium text-purple-800 mb-2">Performance Considerations</h3>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Minimize HTML file size</li>
                      <li>• Use appropriate image formats and sizes</li>
                      <li>• Consider lazy loading for images and media</li>
                      <li>• Optimize critical rendering path</li>
                    </ul>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  SEO Best Practices
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Optimize your HTML for search engines:
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>Title tags:</strong> Use descriptive, keyword-rich page titles</li>
                  <li>• <strong>Meta descriptions:</strong> Write compelling summaries for search results</li>
                  <li>• <strong>Heading structure:</strong> Use proper heading hierarchy for content organization</li>
                  <li>• <strong>Semantic markup:</strong> Help search engines understand your content</li>
                  <li>• <strong>Schema markup:</strong> Add structured data for rich snippets</li>
                </ul>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Testing & Validation
                </h2>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="text-orange-800 text-sm">
                    <strong>Essential Tools:</strong><br/>
                    • W3C HTML Validator - Check HTML syntax<br/>
                    • Lighthouse - Performance and accessibility testing<br/>
                    • Browser Developer Tools - Cross-browser testing<br/>
                    • Screen Reader Testing - Accessibility verification
                  </p>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}
          </div>
          
          {/* Navigation Button */}
          <div className="absolute bottom-4 right-4">
            <Button
              variant="default"
              className={`font-semibold px-6 py-3 ${
                isLastStep 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              onClick={isLastStep && (isLesson1 || isLesson2 || isLesson3 || isLesson4 || isLesson5) ? handleFinishLesson : undefined}
              asChild={!isLastStep || !(isLesson1 || isLesson2 || isLesson3 || isLesson4 || isLesson5)}
            >
              {isLastStep && (isLesson1 || isLesson2 || isLesson3 || isLesson4 || isLesson5) ? (
                <span>Finish Lesson 🎉</span>
              ) : (
                <Link href={nextButton.href}>
                  {nextButton.text}
                </Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
