"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CongratulationPage } from "@/components/congratulation-page";
import { useLanguage } from "@/contexts/language-context";
import HtmlRunner from "@/components/html-runner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Quiz = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const { language } = useLanguage();
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerHtml, setRunnerHtml] = useState<string>("");
  


  // Determine which lesson this is based on the lessonTitle
  const isLesson1 = lessonTitle === "HTML Introduction";
  const isLesson2 = lessonTitle === "HTML Basics";
  const isLesson3 = lessonTitle === "HTML Elements";
  const isLesson4 = lessonTitle === "HTML Attributes";
  const isLesson5 = lessonTitle === "HTML Structure";

  // Enhance all code snippets with a Try Now button (for HTML course)
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('div.bg-gray-50 p.font-mono')) as HTMLElement[];
    nodes.forEach((p) => {
      const container = p.parentElement as HTMLElement | null;
      if (!container) return;
      // Prevent duplicates (React strict mode can double-invoke effects)
      if (container.getAttribute('data-try-now-attached') === '1') return;
      container.setAttribute('data-try-now-attached', '1');

      const btn = document.createElement('button');
      btn.setAttribute('data-try-now', '1');
      btn.textContent = 'Try Now';
      btn.className = 'mt-3 inline-flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wide bg-green-500 text-white border-b-4 border-green-600 hover:bg-green-500/90 active:border-b-0 px-6 h-12';
      btn.onclick = () => {
        const code = (p.innerText || '').trim();
        setRunnerHtml(code);
        setRunnerOpen(true);
      };
      const wrapper = document.createElement('div');
      wrapper.className = 'mt-3';
      wrapper.appendChild(btn);
      container.insertAdjacentElement('afterend', wrapper);
    });
  }, [lessonTitle, currentStep]);

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

  // Helper: open snippet in a sandbox (CodePen-like) using data URL
  const openInSandbox = (html: string) => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  // First snippet content for quick "Try Now"
  const sampleHtmlIntro = (language === "ne"
    ? "<h1>यो एउटा शीर्षक हो</h1>\n<p>यो एउटा अनुच्छेद हो</p>\n<a href=\"...\">यो एउटा लिंक हो</a>"
    : language === "new"
    ? "<h1>द्ये एँक शीर्षक छ</h1>\n<p>द्ये एँक अनुच्छेद छ</p>\n<a href=\"...\">द्ये एँक लिङ्क छ</a>"
    : "<h1>This is a heading</h1>\n<p>This is a paragraph</p>\n<a href=\"#\">This is a link</a>");

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
                  {language === "ne"
                    ? "HTML वेब पेजहरू बनाउन प्रयोग हुने मानक मार्कअप भाषा हो।"
                    : language === "new"
                    ? "HTML वेब पेज बनाियाकि मानक मार्कअप भाषा छ।"
                    : "HTML is the standard markup language for creating Web pages."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne"
                    ? "HTML भनेको के हो?"
                    : language === "new"
                    ? "HTML के छ?"
                    : "What is HTML?"}
                </h2>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  {(language === "ne"
                    ? [
                        "HTML को पुरा रूप Hyper Text Markup Language हो।",
                        "HTML वेब पेजहरू बनाउन प्रयोग हुने मानक मार्कअप भाषा हो।",
                        "HTML ले वेब पेजको संरचना वर्णन गर्छ।",
                        "HTML विभिन्न तत्वहरूको श्रृंखलाबाट बनेको हुन्छ।",
                        "HTML तत्वहरूले ब्राउजरलाई सामग्री कसरी देखाउने भनेर बताउँछन्।",
                        'HTML तत्वहरूले सामग्रीका भागहरूलाई लेबल गर्छन्, जस्तै "यो एउटा शीर्षक हो", "यो एउटा अनुच्छेद हो", "यो एउटा लिंक हो" आदि।',
                      ]
                    : language === "new"
                    ? [
                        "HTML को पूरा नाम Hyper Text Markup Language छ।",
                        "HTML वेब पेज तया यानाय्गु मानक मार्कअप भाषा हो।",
                        "HTML ले वेब पेजय् संरचना बुझाय् दिदो।",
                        "HTML बिभिन्न एलिमेन्ट (तत्व) हरुकि क्रमले बनेगो छ।",
                        "एलिमेन्टय् ब्राउजरलाइ सामग्री कसरी देखाय् नाय् भन्या सूचना दिनछ।",
                        'एलिमेन्टय् सामग्रीक भागय्लाइ लेबल दियेला — जस्तै "द्ये शीर्षक हो", "द्ये अनुच्छेद हो", "द्ये लिङ्क हो"।',
                      ]
                    : [
                        "HTML stands for Hyper Text Markup Language",
                        "HTML is the standard markup language for creating Web pages",
                        "HTML describes the structure of a Web page",
                        "HTML consists of a series of elements",
                        "HTML elements tell the browser how to display the content",
                        'HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.',
                      ]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne"
                    ? "किन HTML सिक्ने?"
                    : language === "new"
                    ? "HTML किँ सिकय्?"
                    : "Why Learn HTML?"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "HTML वेब विकासको आधार हो। तपाईंले हेर्ने हरेक वेबसाइट HTML बाट बनेको हुन्छ। HTML सिक्दा तपाईंले निम्न गर्न सक्नुहुन्छ:"
                    : language === "new"
                    ? "HTML वेब विकासको आधार छ। जंहां-पन वेबसाइट HTMLले बनिन्या छ। HTML सिकेगु बिना तंय्ले या-काम गरना सकने:" 
                    : "HTML is the foundation of web development. Every website you visit is built with HTML. Learning HTML gives you the power to:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  {(language === "ne"
                    ? [
                        "आफ्नै वेबसाइट सुरु देखि बनाउन",
                        "वेब पेजहरू कसरी संरचित हुन्छन् भनेर बुझ्न",
                        "पहिले बनाइएका वेबसाइट र टेम्प्लेटलाई परिमार्जन गर्न",
                        "CSS र JavaScript सिक्नको लागि बलियो आधार बनाउन",
                        "वेब विकास क्षेत्रमा करिअर बनाउन",
                      ]
                    : language === "new"
                    ? [
                        "निजय् वेबसाइट सुरुदिँ तया नाय्",
                        "वेब पेज कसरी संरचित इत्त बुझेगु",
                        "अघिं बनाअय् वेबसाइट/टेम्प्लेट सम्सोधन नाय्",
                        "CSS र JavaScript सिकलागि मजबुत आधार त्यार नाय्",
                        "वेब विकास क्षेत्रय् करिअर अगाडि बढ़ाय्",
                      ]
                    : [
                        "Create your own websites from scratch",
                        "Understand how web pages are structured",
                        "Customize existing websites and templates",
                        "Build a strong foundation for learning CSS and JavaScript",
                        "Pursue a career in web development",
                      ]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne"
                    ? "HTML कसरी काम गर्छ"
                    : language === "new"
                    ? "HTML कसय् काम ज्वाय्"
                    : "How HTML Works"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "HTML ले सामग्रीलाई ट्याग (tags) मार्फत चिन्ह लगाएर काम गर्छ। यी ट्यागहरूले वेब ब्राउजरलाई सूचना कसरी देखाउने भनेर बताउँछन्। उदाहरणका लागि:"
                    : language === "new"
                    ? "HTML ये सामग्रीय्लाइ ट्याग (tags) ले मार्क गयेर काम ज्वाय्। यी ट्यागय् ब्राउजरलाइ जानकारी कसरी देखाय् नाय् भन्या निर्देशन दिनछ। उदाहरण:" 
                    : "HTML works by using tags to mark up content. These tags tell web browsers how to display the information. For example:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    {(language === "ne"
                      ? "<h1>यो एउटा शीर्षक हो</h1>\n<p>यो एउटा अनुच्छेद हो</p>\n<a href=\"...\">यो एउटा लिंक हो</a>"
                      : language === "new"
                      ? "<h1>द्ये एँक शीर्षक छ</h1>\n<p>द्ये एँक अनुच्छेद छ</p>\n<a href=\"...\">द्ये एँक लिङ्क छ</a>"
                      : "<h1>This is a heading</h1>\n<p>This is a paragraph</p>\n<a href=\"#\">This is a link</a>")
                      .split('\n')
                      .map((line: string, index: number, arr: string[]) => (
                        <span key={index}>
                          {line}
                          {index < arr.length - 1 && <br />}
                        </span>
                      ))}
                  </p>
                </div>

                
                <p className="text-neutral-600 leading-relaxed mt-4">
                  {language === "ne"
                    ? "जब ब्राउजरले यो HTML पढ्छ, उसले पहिलो लाइनलाई ठूलो शीर्षक, दोस्रोलाई अनुच्छेद, र तेस्रोलाई क्लिक गर्न मिल्ने लिंकको रूपमा देखाउँछ।"
                    : language === "new"
                    ? "ब्राउजरले ये HTML पढेगु, पहिलाइने ठूलो शीर्षक जस्तो, दोस्रोलाइ अनुच्छेद जस्तो, अनि तेस्रोलाइ क्लिक गर्न मिल्ने लिङ्क जस्तो देखाय्।"
                    : "When a browser reads this HTML, it knows to display the first line as a large heading, the second as a paragraph, and the third as a clickable link."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne"
                    ? "तपाईं के सिक्नुहुनेछ"
                    : language === "new"
                    ? "तंय्ले काजि सिकने"
                    : "What You'll Learn"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "यस कोर्समा, तपाईंले निम्न कुरा सिक्नुहुनेछ:"
                    : language === "new"
                    ? "ये कोर्स-म, तंय्ले ये-ये कुरा सिकने:" 
                    : "In this course, you'll learn how to:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  {(language === "ne"
                    ? [
                        "सफा र अर्थपूर्ण (semantic) HTML कोड लेख्न",
                        "उचित शीर्षक र खण्डहरूसँग वेब पेज संरचना बनाउन",
                        "सूची, लिंक, र छविहरू बनाउन",
                        "प्रयोगकर्ताको इनपुटका लागि फाराम बनाउन",
                        "HTML का उत्कृष्ट अभ्यास (best practices) र पहुँचयोग्यता (accessibility) बुझ्न",
                      ]
                    : language === "new"
                    ? [
                        "सफा, सेमान्टिक HTML कोड लेखय्",
                        "उचित शीर्षक र खण्डसंग वेब पेज संरचना तया नाय्",
                        "सूची, लिङ्क र छवि तया नाय्",
                        "फारम तया नाय्, इनपुट सम्हाल नाय्",
                        "HTML का बेस्ट प्राक्टिस र पहुँच (Accessibility) बुझय्",
                      ]
                    : [
                        "Write clean, semantic HTML code",
                        "Structure web pages with proper headings and sections",
                        "Create lists, links, and images",
                        "Build forms for user input",
                        "Understand HTML best practices and accessibility",
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
                  {language === "ne"
                    ? "HTML तत्वहरू HTML पेजहरूका बिल्डिङ ब्लकहरू हुन्। प्रत्येक तत्वले विभिन्न प्रकारको सामग्री प्रतिनिधित्व गर्छ र ब्राउजरलाई यसलाई कसरी देखाउने भनेर बताउँछ।"
                    : language === "new"
                    ? "HTML एलिमेन्ट वेब पेजय् बनाियाकि आधार ब्लक हुन। प्रत्येक एलिमेन्टये फरक प्रकारक सामग्री प्रतिनिधित्व गर्नि छ र ब्राउजरलाइ कसरी देखाय् नाय् भनंछ।"
                    : "HTML elements are the building blocks of HTML pages. Each element represents a different type of content and tells the browser how to display it."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne"
                    ? "HTML तत्व भनेको के हो?"
                    : language === "new"
                    ? "HTML एलिमेन्ट के छ?"
                    : "What is an HTML Element?"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "एउटा HTML तत्वलाई सुरु ट्याग, केही सामग्री, र अन्त्य ट्यागले परिभाषित गरिन्छ। तत्वहरूले अन्य तत्वहरू, टेक्स्ट, वा खाली हुन सक्छन्।"
                    : language === "new"
                    ? "एँक HTML एलिमेन्ट सुरू ट्याग, भीतरक सामग्री, अनि अन्त्य ट्यागले परिभाषित जान। एलिमेन्टय् भीतर अरू एलिमेन्ट, टेक्स्ट राखिना सकिंछ, बिनाइ खाली पन हुन सकिंछ।"
                    : "An HTML element is defined by a start tag, some content, and an end tag. Elements can contain other elements, text, or be empty."}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;tagname&gt;{language === "ne" ? "यहाँ सामग्री जान्छ..." : language === "new" ? "यत सामग्री जायत..." : "Content goes here..."}&lt;/tagname&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "आधारभूत HTML तत्वहरू" : language === "new" ? "आधारभूत HTML एलिमेन्ट" : "Basic HTML Elements"}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "शीर्षक तत्वहरू" : language === "new" ? "शीर्षक एलिमेन्ट" : "Heading Elements"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "h1 देखि h6 सम्मका शीर्षक तत्वहरू" : language === "new" ? "h1 देकि h6 सम्म शीर्षक एलिमेन्ट" : "Heading elements from h1 to h6"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;h1&gt;{language === "ne" ? "मुख्य शीर्षक" : language === "new" ? "मुख्य शीर्षक" : "Main Heading"}&lt;/h1&gt;<br/>
                        &lt;h2&gt;{language === "ne" ? "उप-शीर्षक" : language === "new" ? "उप-शीर्षक" : "Sub Heading"}&lt;/h2&gt;<br/>
                        &lt;h3&gt;{language === "ne" ? "खण्ड शीर्षक" : language === "new" ? "खंड शीर्षक" : "Section Heading"}&lt;/h3&gt;
                      </p>
                    </div>
                    <p className="text-neutral-600 text-xs mt-2">
                      {language === "ne" ? "h1 सबैभन्दा महत्वपूर्ण हो, h6 सबैभन्दा कम महत्वपूर्ण हो" : language === "new" ? "h1 जादो महत्त्वपूर्ण, h6 कम महत्त्वपूर्ण" : "h1 is the most important, h6 is the least important"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "पैराग्राफ तत्व" : language === "new" ? "अनुच्छेद एलिमेन्ट" : "Paragraph Element"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "टेक्स्ट सामग्रीको लागि प्रयोग गरिने तत्व" : language === "new" ? "टेक्स्ट सामग्रीला लागि प्रयोग इन्ने एलिमेन्ट" : "Element used for text content"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;p&gt;{language === "ne" ? "यो एउटा पैराग्राफ हो" : language === "new" ? "ये एँक अनुच्छेद छ" : "This is a paragraph"}&lt;/p&gt;
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "लिङ्क तत्व" : language === "new" ? "लिङ्क एलिमेन्ट" : "Link Element"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "अन्य पेजहरू वा वेबसाइटहरूमा जडान गर्ने तत्व" : language === "new" ? "अर्का पेज/वेबसाइटत लिङ्क जाय् लागि इन्ने एलिमेन्ट" : "Element to link to other pages or websites"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;a href="https://example.com"&gt;{language === "ne" ? "यहाँ क्लिक गर्नुहोस्" : language === "new" ? "एति क्लिक गरइ" : "Click here"}&lt;/a&gt;
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "छवि तत्व" : language === "new" ? "छवि एलिमेन्ट" : "Image Element"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {language === "ne" ? "छविहरू देखाउन प्रयोग गरिने तत्व" : language === "new" ? "छवि देखाय् लागि प्रयोग इन्ने एलिमेन्ट" : "Element used to display images"}
                    </p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;img src="image.jpg" alt="{language === "ne" ? "छवि वर्णन" : language === "new" ? "छविको वर्णन" : "Image description"}" /&gt;
                      </p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "HTML तत्वहरूको संरचना" : language === "new" ? "HTML एलिमेन्ट संरचना" : "HTML Element Structure"}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "सुरु ट्याग" : language === "new" ? "सुरू ट्याग" : "Opening Tag"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "तत्वको सुरुवात चिन्हित गर्ने ट्याग" : language === "new" ? "एलिमेन्ट सुरू चिन्ह लगाय् दिने ट्याग" : "Tag that marks the beginning of an element"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "सामग्री" : language === "new" ? "सामग्री" : "Content"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "तत्वको वास्तविक सामग्री (टेक्स्ट, अन्य तत्वहरू, वा खाली)" : language === "new" ? "एलिमेन्ट भीतरक वास्तविक सामग्री (टेक्स्ट, अरू एलिमेन्ट, बिनाइ खाली)" : "The actual content of the element (text, other elements, or empty)"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "अन्त्य ट्याग" : language === "new" ? "अन्त्य ट्याग" : "Closing Tag"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "तत्वको अन्त्य चिन्हित गर्ने ट्याग (सुरु ट्यागमा / थपेर)" : language === "new" ? "एलिमेन्ट अन्त्य चिन्ह लगाय् दिने ट्याग (सुरू ट्यागअगाडि / राखि)" : "Tag that marks the end of an element (add / to opening tag)"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>{language === "ne" ? "स्मरण राख्नुहोस्:" : language === "new" ? "याद गरइ:" : "Remember:"}</strong> {language === "ne" ? "सबै HTML तत्वहरूले अन्त्य ट्याग चाहिन्छन् (स्व-बन्द तत्वहरू बाहेक जस्तै &lt;img&gt; वा &lt;br&gt;)" : language === "new" ? "सबइ HTML एलिमेन्टय् अन्त्य ट्याग चाहिं (Self-closing जस्तै &lt;img&gt; र &lt;br&gt; बाहेक)" : "All HTML elements need closing tags (except self-closing elements like &lt;img&gt; or &lt;br&gt;)"}
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "तत्वहरूको नेस्टिङ" : language === "new" ? "एलिमेन्ट नेस्टिङ" : "Nesting Elements"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML तत्वहरूलाई एकअर्कामा राख्न सकिन्छ। यसलाई नेस्टिङ भनिन्छ र यो HTML को शक्तिशाली विशेषता हो।" : language === "new" ? "HTML एलिमेन्ट एेक-एेक भीतरी राखिना सकिंछ — यसलाइ नेस्टिङ भनंछ र या HTML को शक्तिशाली विशेषता हो।" : "HTML elements can be placed inside each other. This is called nesting and it's a powerful feature of HTML."}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;div&gt;<br/>
                    &nbsp;&nbsp;&lt;h1&gt;{language === "ne" ? "शीर्षक" : language === "new" ? "शीर्षक" : "Title"}&lt;/h1&gt;<br/>
                    &nbsp;&nbsp;&lt;p&gt;{language === "ne" ? "यहाँ केही <strong>महत्वपूर्ण</strong> सामग्री छ" : language === "new" ? "यहाँ <strong>महत्त्वपूर्ण</strong> सामग्री छ" : "Here is some <strong>important</strong> content"}&lt;/p&gt;<br/>
                    &lt;/div&gt;
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-red-800 text-sm">
                    <strong>{language === "ne" ? "गलत:" : language === "new" ? "गलत:" : "Wrong:"}</strong> {language === "ne" ? "ट्यागहरू गलत क्रममा बन्द गर्नुहोस्" : language === "new" ? "ट्याग गलत क्रमम बन्द गर्‍याँ" : "Closing tags in wrong order"}<br/>
                    &lt;p&gt;&lt;strong&gt;{language === "ne" ? "सामग्री" : language === "new" ? "सामग्री" : "Content"}&lt;/p&gt;&lt;/strong&gt;
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm">
                    <strong>{language === "ne" ? "सही:" : language === "new" ? "सही:" : "Correct:"}</strong> {language === "ne" ? "ट्यागहरू सही क्रममा बन्द गर्नुहोस्" : language === "new" ? "ट्याग सही क्रमम बन्द गरइ" : "Closing tags in correct order"}<br/>
                    &lt;p&gt;&lt;strong&gt;{language === "ne" ? "सामग्री" : language === "new" ? "सामग्री" : "Content"}&lt;/strong&gt;&lt;/p&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* Web Browsers Content */}
            {isLesson1 && currentStep === 3 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "वेब ब्राउजरहरू सफ्टवेयर अनुप्रयोगहरू हुन् जसले वर्ल्ड वाइड वेबमा जानकारी पुनर्प्राप्त, प्रदर्शन, र नेभिगेट गर्छन्। तिनीहरू HTML कोड व्याख्या गर्छन् र दृश्य वेब पेजहरूमा रेन्डर गर्छन्।"
                    : language === "new"
                    ? "वेब ब्राउजर सफ्टवेयर अनुप्रयोग हो जो World Wide Web मया जानकारी ल्याय्, देखाय् र नेभिगेट गरना साँ। ये HTML कोड बुझाय् वेब पेजय् रेन्डर गरि दिनछ।"
                    : "Web browsers are software applications that retrieve, display, and navigate information on the World Wide Web. They interpret HTML code and render it into visual web pages."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "ब्राउजरहरू कसरी काम गर्छन्" : language === "new" ? "ब्राउजर कसय् काम ज्वाय्" : "How Browsers Work"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "जब तपाईं कुनै वेबसाइटमा जानुहुन्छ, ब्राउजरले पृष्ठ देखाउनका लागि केही चरणहरू पालना गर्छ:"
                    : language === "new"
                    ? "जँया तंय्ले एँक वेबसाइट खोलिं, ब्राउजरले पेज देखाय् नाय् कइटा चरण पछ्याय्:"
                    : "When you visit a website, your browser goes through several steps to display the page:"}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "अनुरोध (Request)" : language === "new" ? "अनुरोध (Request)" : "Request"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne"
                          ? "ब्राउजरले वेब सर्भरलाई HTML फाइलको लागि अनुरोध पठाउँछ"
                          : language === "new"
                          ? "ब्राउजरया वेब सर्भरलाइ HTML फाइल मागि अनुरोध पठाय्"
                          : "Browser sends a request to the web server for the HTML file"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "प्राप्त (Receive)" : language === "new" ? "प्राप्त (Receive)" : "Receive"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne"
                          ? "सर्भरले HTML डकुमेन्ट र सम्बन्धित स्रोतहरू फिर्ता पठाउँछ"
                          : language === "new"
                          ? "सर्भरया HTML डकुमेन्ट अनि सम्बन्धित स्रोत फिर्ता पठाय्"
                          : "Server sends back the HTML document and related resources"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "पार्स (Parse)" : language === "new" ? "पार्स (Parse)" : "Parse"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne"
                          ? "ब्राउजरले HTML पार्स गर्छ र DOM (Document Object Model) बनाउँछ"
                          : language === "new"
                          ? "ब्राउजरया HTML पार्स गरि DOM (Document Object Model) बनाय्"
                          : "Browser parses the HTML and creates a Document Object Model (DOM)"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "रेन्डर (Render)" : language === "new" ? "रेन्डर (Render)" : "Render"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne"
                          ? "ब्राउजरले HTML संरचना र CSS शैलीको आधारमा पृष्ठ रेन्डर गर्छ"
                          : language === "new"
                          ? "ब्राउजरया HTML संरचना र CSS शैली आधारम पेज रेन्डर गरि देखाय्"
                          : "Browser renders the page based on the HTML structure and CSS styling"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "लोकप्रिय वेब ब्राउजरहरू" : language === "new" ? "प्रसिद्ध वेब ब्राउजर" : "Popular Web Browsers"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Chrome</h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "Google द्वारा विकसित, उच्च गति र प्रशस्त एक्सटेन्सन समर्थनका लागि प्रसिद्ध" : language === "new" ? "Google ले बनाय्, छिटो गति र धेरै एक्सटेन्सन समर्थन" : "Developed by Google, known for speed and extensive extension support"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Firefox</h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "Mozilla द्वारा विकसित खुला-स्रोत ब्राउजर, गोपनीयता र अनुकूलनमा केन्द्रित" : language === "new" ? "Mozilla ले बनाय् खुला-स्रोत ब्राउजर — गोपनीयता र अनुकूलनमा ध्यान" : "Open-source browser by Mozilla, focuses on privacy and customization"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Safari</h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "Apple को ब्राउजर, macOS र iOS डिभाइसहरूका लागि अनुकूलित" : language === "new" ? "Apple याकि ब्राउजर — macOS र iOS उपकरणलागि अनुकूलित" : "Apple's browser, optimized for macOS and iOS devices"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Edge</h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "Microsoft को आधुनिक ब्राउजर, Chromium इञ्जिनमा निर्मित" : language === "new" ? "Microsoft को आधुनिक ब्राउजर — Chromium इन्जिनम निर्मित" : "Microsoft's modern browser, built on Chromium engine"}
                    </p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "ब्राउजर डेभलपर टुलहरू" : language === "new" ? "ब्राउजर डेभलपर टुल" : "Browser Developer Tools"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "आधुनिक ब्राउजरहरूमा वेब विकासकर्तालाई मद्दत गर्ने शक्तिशाली डेभलपर टुलहरू समावेश हुन्छन्:" : language === "new" ? "आधुनिक ब्राउजरय् वेब विकासकर्तालाइ मद्दत करन शक्तिशाली डेभलपर टुल सम्मिलित छ:" : "Modern browsers include powerful developer tools that help web developers:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>{language === "ne" ? "इन्स्पेक्ट एलिमेन्ट:" : language === "new" ? "इन्स्पेक्ट एलिमेन्ट:" : "Inspect Element:"}</strong> {language === "ne" ? "रियल-टाइममा HTML संरचना हेर्न र परिमार्जन गर्न" : language === "new" ? "रियल-टाइमम HTML संरचना हेय्/परिमार्जन गरय्" : "View and modify HTML structure in real-time"}</li>
                  <li>• <strong>{language === "ne" ? "कन्सोल:" : language === "new" ? "कन्सोल:" : "Console:"}</strong> {language === "ne" ? "JavaScript कोड चलाउन र त्रुटि सन्देशहरू हेर्न" : language === "new" ? "JavaScript कोड चलाय् र त्रुटि सन्देश हेय्" : "Run JavaScript code and view error messages"}</li>
                  <li>• <strong>{language === "ne" ? "नेटवर्क ट्याब:" : language === "new" ? "नेटवर्क ट्याब:" : "Network Tab:"}</strong> {language === "ne" ? "HTTP अनुरोध र प्रतिक्रिया निगरानी गर्न" : language === "new" ? "HTTP अनुरोध/प्रतिक्रिया निगरानी गरय्" : "Monitor HTTP requests and responses"}</li>
                  <li>• <strong>{language === "ne" ? "प्रदर्शन:" : language === "new" ? "प्रदर्शन:" : "Performance:"}</strong> {language === "ne" ? "पृष्ठ लोड गति र अनुकूलन विश्लेषण गर्न" : language === "new" ? "पेज लोड गति र अनुकूलन विश्लेषण गरय्" : "Analyze page loading speed and optimization"}</li>
                  <li>• <strong>{language === "ne" ? "रिस्पोन्सिभ डिजाइन:" : language === "new" ? "रिस्पोन्सिभ डिजाइन:" : "Responsive Design:"}</strong> {language === "ne" ? "विभिन्न स्क्रिन आकारहरूमा पृष्ठहरू कसरी देखिन्छन् परीक्षण गर्न" : language === "new" ? "विभिन्न स्क्रिन आकारम पेज कसरी देखिं — परीक्षण गरय्" : "Test how pages look on different screen sizes"}</li>
                </ul>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>{language === "ne" ? "सुझाव:" : language === "new" ? "सुझाव:" : "Tip:"}</strong> {language === "ne" ? "धेरै ब्राउजरहरूमा डेभलपर टुल खोल्न F12 थिच्नुहोस् वा राइट-क्लिक गरी \"Inspect\" छान्नुहोस्।" : language === "new" ? "धेरै ब्राउजरम डेभलपर टुल खोल्न F12 थिच, वा दाहिने-क्लिक करि \"Inspect\" छान।" : "Press F12 or right-click and select \"Inspect\" to open developer tools in most browsers."}
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "क्रस-ब्राउजर कम्प्याटिबिलिटी" : language === "new" ? "क्रस-ब्राउजर कम्प्याटिबिलिटी" : "Cross-Browser Compatibility"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "विभिन्न ब्राउजरहरूले HTML लाई अलि फरक तरिकाले व्याख्या गर्न सक्छन्। त्यसैले यो कुरा महत्त्वपूर्ण छ:"
                    : language === "new"
                    ? "विभिन्न ब्राउजरले HTML अलिक फरक तरिकाले बुझय् सकिंछ — तसैले यी कुरा महत्त्वपूर्ण छ:"
                    : "Different browsers may interpret HTML slightly differently. This is why it's important to:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• {language === "ne" ? "सफा र मापदण्ड-अनुरूप HTML कोड लेख्नुहोस्" : language === "new" ? "सफा, मानक-अनुरूप HTML कोड लेखइ" : "Write clean, standards-compliant HTML code"}</li>
                  <li>• {language === "ne" ? "आफ्नो वेबसाइटलाई विभिन्न ब्राउजरहरूमा परीक्षण गर्नुहोस्" : language === "new" ? "आफ्नो वेबसाइट विभिन्न ब्राउजरम परीक्षण गरइ" : "Test your websites in multiple browsers"}</li>
                  <li>• {language === "ne" ? "ब्राउजरका डिफल्टमा भर नपरी शैलीकृत गर्न CSS प्रयोग गर्नुहोस्" : language === "new" ? "ब्राउजर डिफल्टम भर नपरी CSS ले शैली गरइ" : "Use CSS for styling instead of relying on browser defaults"}</li>
                  <li>• {language === "ne" ? "समान शैलीका लागि CSS reset वा normalize.css प्रयोग गर्ने विचार गर्नुहोस्" : language === "new" ? "समान शैलीलागि CSS reset वा normalize.css प्रयोजन गरइ" : "Consider using CSS resets or normalize.css for consistent styling"}</li>
                </ul>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Page Structure Content */}
            {isLesson1 && currentStep === 4 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "HTML पेज संरचनाले HTML डकुमेन्टहरू कसरी संगठित र संरचित गरिन्छ भन्ने कुरालाई जनाउँछ। हरेक HTML पेजले ब्राउजरहरूले हेर्ने अपेक्षा गरेको मानक संरचना पालना गर्छ।"
                    : language === "new"
                    ? "HTML पेजय् संरचना भनीन्या ले HTML डकुमेन्ट कसरी सजाय् र बनाय् नाय् देखाँ। जेकै वेब पेजय् ब्राउजरया अपेक्षा गरियेक निजाम (standard) संरचन पालना जाय्।"
                    : "HTML page structure refers to the way HTML documents are organized and structured. Every HTML page follows a standard structure that browsers expect to see."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "आधारभूत HTML डकुमेन्ट संरचना" : language === "new" ? "आधारभूत HTML डकुमेन्ट संरचना" : "Basic HTML Document Structure"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "हरेक HTML डकुमेन्टमा केही आवश्यक तत्वहरू समावेश गर्ने विशिष्ट संरचना हुन्छ:"
                    : language === "new"
                    ? "जेकै HTML डकुमेन्टम कइटा जरूरी एलिमेन्ट सम्मिलित विशिष्ट संरचना हुला:" 
                    : "Every HTML document has a specific structure that includes several essential elements:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;!DOCTYPE html&gt;<br/>
                    &lt;html&gt;<br/>
                    &nbsp;&nbsp;&lt;head&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;{language === "ne" ? "पेज शीर्षक" : language === "new" ? "पेज शीर्षक" : "Page Title"}&lt;/title&gt;<br/>
                    &nbsp;&nbsp;&lt;/head&gt;<br/>
                    &nbsp;&nbsp;&lt;body&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;{language === "ne" ? "मुख्य शीर्षक" : language === "new" ? "मुख्य शीर्षक" : "Main Heading"}&lt;/h1&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;{language === "ne" ? "पेज सामग्री यहाँ जान्छ" : language === "new" ? "पेज सामग्री एति जायत" : "Page content goes here"}&lt;/p&gt;<br/>
                    &nbsp;&nbsp;&lt;/body&gt;<br/>
                    &lt;/html&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "आवश्यक HTML तत्वहरू" : language === "new" ? "जरूरी HTML एलिमेन्ट" : "Essential HTML Elements"}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">{language === "ne" ? "DOCTYPE घोषणा" : language === "new" ? "DOCTYPE घोषणा" : "DOCTYPE Declaration"}</h3>
                    <p className="text-neutral-600 text-sm mb-2">{language === "ne" ? "ब्राउजरलाई यो HTML5 डकुमेन्ट हो भनेर बताउँछ" : language === "new" ? "ब्राउजरलाइ या HTML5 डकुमेन्ट छ भन्या जनाय्" : "Tells the browser this is an HTML5 document"}</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">&lt;!DOCTYPE html&gt;</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">{language === "ne" ? "HTML मूल तत्व" : language === "new" ? "HTML मूल एलिमेन्ट" : "HTML Root Element"}</h3>
                    <p className="text-neutral-600 text-sm mb-2">{language === "ne" ? "सम्पूर्ण HTML डकुमेन्टको लागि मूल कन्टेनर" : language === "new" ? "पूरो HTML डकुमेन्टय् मूल कन्टेनर" : "The root container for the entire HTML document"}</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">&lt;html lang="en"&gt;...&lt;/html&gt;</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">{language === "ne" ? "हेड खण्ड" : language === "new" ? "हेड खण्ड" : "Head Section"}</h3>
                    <p className="text-neutral-600 text-sm mb-2">{language === "ne" ? "मेटाडाटा, शीर्षक, र बाह्य स्रोतहरूमा लिङ्कहरू समावेश गर्छ" : language === "new" ? "मेटाडाटा, शीर्षक अनि बाह्य स्रोतलक लिङ्क समावेश जाय्" : "Contains metadata, title, and links to external resources"}</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">&lt;head&gt;...&lt;/head&gt;</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">{language === "ne" ? "बडी खण्ड" : language === "new" ? "बडी खण्ड" : "Body Section"}</h3>
                    <p className="text-neutral-600 text-sm mb-2">{language === "ne" ? "वेबपेजको सबै दृश्य सामग्री समावेश गर्छ" : language === "new" ? "वेब पेजक देखिन्या सबै सामग्री समावेश जाय्" : "Contains all the visible content of the webpage"}</p>
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
                  {language === "ne"
                    ? "HTML ले 1990 को दशकको सुरुवातमा यसको सिर्जनादेखि धेरै विकास गरेको छ। यसको इतिहास बुझ्नाले वेब मापदण्डहरू कसरी विकसित भएका छन् र आज केही प्रथाहरू किन अवस्थित छन् भनेर बुझ्न मद्दत गर्छ।"
                    : language === "new"
                    ? "HTML ले 1990 दशकय् सुरुदिँ बनियेकै बेला देकि निकै विकास गरेगो छ। ये इतिहास बुझियेस UN web standard कसरी विकास भैय् अनि आजक कइटा प्रथा किन छ — या बुझन मद्दत जाय्।"
                    : "HTML has evolved significantly since its creation in the early 1990s. Understanding its history helps us appreciate how web standards have developed and why certain practices exist today."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "HTML को जन्म" : language === "new" ? "HTML क जन्म" : "The Birth of HTML"}
                </h2>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Tim Berners-Lee (1989-1991)</h3>
                  <p className="text-blue-700 text-sm">
                    {language === "ne"
                      ? "CERN मा काम गर्दै गर्दा, Tim Berners-Lee ले वैज्ञानिक डकुमेन्टहरू साझा गर्ने तरिकाको रूपमा HTML सिर्जना गरे। उनले पहिलो वेब ब्राउजर र वेब सर्भर पनि सिर्जना गरे।"
                      : language === "new"
                      ? "CERN मया काम करदिँ, Tim Berners‑Lee या वैज्ञानिक कागज साझा गरन HTML बनाय्। उय्ले पहिला वेब ब्राउजर र वेब सर्भर पन बनाय्।"
                      : "While working at CERN, Tim Berners-Lee created HTML as a way to share scientific documents. He also created the first web browser and web server."}
                  </p>
                </div>
                
                <p className="text-neutral-600 leading-relaxed mt-4">
                  {language === "ne"
                    ? "HTML लाई मूल रूपमा सरल र प्रस्तुतिकरण भन्दा डकुमेन्ट संरचनामा केन्द्रित हुन डिजाइन गरिएको थियो। लक्ष्य थियो विभिन्न कम्प्युटर प्रणालीहरूमा काम गर्न सक्ने सार्वभौमिक मार्कअप भाषा सिर्जना गर्नु।"
                    : language === "new"
                    ? "HTML शुरू देखि सरल राखि, प्रस्तुति भन्दा डकुमेन्ट संरचनामा जोड दिइ डिजाइन गरियेको थ्यो। उद्येस्य था — विभिन्न कम्प्युटर प्रणालीम चलेगु सार्वभौमिक मार्कअप भाषा बनाय्।"
                    : "HTML was originally designed to be simple and focused on document structure rather than presentation. The goal was to create a universal markup language that could work across different computer systems."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "HTML संस्करण समयरेखा" : language === "new" ? "HTML संस्करण समयरेखा" : "HTML Version Timeline"}
                </h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-medium text-neutral-700 mb-2">HTML 1.0 (1993)</h3>
                    <p className="text-neutral-600 text-sm">
                      {language === "ne" ? "पहिलो आधिकारिक HTML मापदण्ड। सरल तत्वहरू र बुनियादी संरचना मात्र समावेश थियो।" : language === "new" ? "पहिलो आधिकारिक HTML मापदण्ड — साधा एलिमेन्ट र आधारभूत संरचना मात्र।" : "The first official HTML standard. Included only simple elements and basic structure."}
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-medium text-neutral-700 mb-2">HTML 2.0 (1995)</h3>
                    <p className="text-neutral-600 text-sm">
                      {language === "ne" ? "फारमहरू, टेबलहरू, र छविहरूको समर्थन थपियो। यो पहिलो HTML मापदण्ड थियो जुन RFC द्वारा मानकीकृत गरिएको थियो।" : language === "new" ? "फॉर्म, टेबल, छविको समर्थन थपिय्यो — RFC ले मानकीकृत करेको पहिलो HTML मापदण्ड।" : "Added support for forms, tables, and images. This was the first HTML standard to be standardized by RFC."}
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-medium text-neutral-700 mb-2">HTML 3.2 (1997)</h3>
                    <p className="text-neutral-600 text-sm">
                      {language === "ne" ? "W3C द्वारा पहिलो मापदण्ड। फन्ट, रङ, र केही लेआउट नियन्त्रणहरू थपियो।" : language === "new" ? "W3C ले निकालेक पहिलो मानक — फन्ट, रङ, अनि केही लेआउट नियन्त्रण थपिय्यो।" : "First standard by W3C. Added fonts, colors, and some layout controls."}
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-medium text-neutral-700 mb-2">HTML 4.01 (1999)</h3>
                    <p className="text-neutral-600 text-sm">
                      {language === "ne" ? "महत्वपूर्ण अपडेटहरू: CSS समर्थन, स्क्रिप्टिङ, र अधिक सिमान्टिक तत्वहरू। यो लामो समयसम्म प्रमुख मापदण्ड रह्यो।" : language === "new" ? "ठूला अपडेट — CSS समर्थन, स्क्रिप्टिङ, बढि सेमान्टिक एलिमेन्ट; लामो समयसम्म प्रमुख मानक।" : "Major updates: CSS support, scripting, and more semantic elements. This remained the dominant standard for a long time."}
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-medium text-neutral-700 mb-2">HTML5 (2014)</h3>
                    <p className="text-neutral-600 text-sm">
                      {language === "ne" ? "आधुनिक वेबका लागि पूर्ण रूपमा पुनर्डिजाइन गरिएको। नयाँ सिमान्टिक तत्वहरू, मल्टिमिडिया समर्थन, र वेब अनुप्रयोगहरूका लागि विशेषताहरू थपियो।" : language === "new" ? "आधुनिक वेबलागि पूरै पुनःडिजाइन — नयाँ सेमान्टिक एलिमेन्ट, मल्टिमिडिया समर्थन, वेब एपका सुविधाहरू थपिय्या।" : "Completely redesigned for the modern web. Added new semantic elements, multimedia support, and features for web applications."}
                    </p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "महत्वपूर्ण विकासकर्ताहरू" : language === "new" ? "महत्वपूर्ण विकास" : "Key Developments"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "CSS को उदय" : language === "new" ? "CSS को उदय" : "Rise of CSS"}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "HTML बाट प्रस्तुतिकरण अलग गर्ने प्रयासले CSS लाई जन्म दियो। यसले वेब डिजाइनलाई क्रान्तिकारी रूपमा परिवर्तन गर्यो।" : language === "new" ? "प्रस्तुति HTML बाट अलग गरन खोजेगुले CSS जन्माय् — वेब डिजाइनलाइ क्रान्तिकारी ढंगले बदल्‍लाय्।" : "The effort to separate presentation from HTML gave birth to CSS. This revolutionized web design."}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "सिमान्टिक HTML" : language === "new" ? "सेमान्टिक HTML" : "Semantic HTML"}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "HTML5 ले सामग्रीको अर्थ र संरचनालाई प्राथमिकता दिने तत्वहरू थप्यो। यसले एक्सेसिबिलिटी र SEO लाई सुधार गर्यो।" : language === "new" ? "HTML5 ले सामग्रीक अर्थ/संरचनालाइ प्राथमिकता दिने एलिमेन्ट थपाय् — पहुँच र SEO सुधार।" : "HTML5 added elements that prioritize meaning and structure over content. This improved accessibility and SEO."}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "मोबाइल वेब" : language === "new" ? "मोबाइल वेब" : "Mobile Web"}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "स्मार्टफोनहरूको उदयले रिस्पोन्सिभ डिजाइन र मोबाइल-पहिलो दृष्टिकोणलाई जन्म दियो।" : language === "new" ? "स्मार्टफोनय् बढेकाले रिस्पोन्सिभ डिजाइन र मोबाइल‑पहिलो दृष्टिकोण आय्।" : "The rise of smartphones gave birth to responsive design and mobile-first approaches."}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">
                      {language === "ne" ? "वेब अनुप्रयोगहरू" : language === "new" ? "वेब एप्लिकेशन" : "Web Applications"}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {language === "ne" ? "HTML5 ले वेब अनुप्रयोगहरू बनाउन सक्षम बनायो जुन डेस्कटप अनुप्रयोगहरूसँग प्रतिस्पर्धा गर्न सक्छन्।" : language === "new" ? "HTML5 ले वेब एप बनौना सम्भव गराय् — डेस्कटप एप सँग प्रतिस्पर्धा गर्न सकिंछ।" : "HTML5 enabled web applications that can compete with desktop applications."}
                    </p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "भविष्यको रुझानहरू" : language === "new" ? "भविष्यक प्रवृत्ति" : "Future Trends"}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "Web Components" : language === "new" ? "Web Components" : "Web Components"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "पुनः प्रयोग गर्न सकिने कस्टम तत्वहरू बनाउन सक्षम बनाउँछ" : language === "new" ? "पुनः प्रयोग योग्य कस्टम एलिमेन्ट बनौना सक्षम" : "Enables creating reusable custom elements"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "Progressive Web Apps" : language === "new" ? "Progressive Web Apps" : "Progressive Web Apps"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "वेब र मोबाइल अनुप्रयोगहरूको बीचको खाडल पूरा गर्ने" : language === "new" ? "वेब र मोबाइल एपबीचको खाडल पुरा गरना" : "Bridging the gap between web and mobile applications"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">
                        {language === "ne" ? "WebAssembly" : language === "new" ? "WebAssembly" : "WebAssembly"}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {language === "ne" ? "वेबमा उच्च-प्रदर्शन अनुप्रयोगहरू चलाउन सक्षम बनाउँछ" : language === "new" ? "वेबम उच्च‑प्रदर्शन एप चलौना सक्षम गर्छ" : "Enables running high-performance applications on the web"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>{language === "ne" ? "स्मरण राख्नुहोस्:" : language === "new" ? "याद गरइ:" : "Remember:"}</strong> {language === "ne" ? "HTML को इतिहासले हामीलाई सिकाउँछ कि वेब मापदण्डहरू निरन्तर विकसित हुँदैछन्। आजको सर्वोत्तम प्रथाहरू भोलि परिवर्तन हुन सक्छन्।" : language === "new" ? "HTML क इतिहासले देक्खाय् — वेब मापदण्ड निरन्तर बदलिदैं जान। आजक बेस्ट प्राक्टिस भोलि बदलिना सकिंछ।" : "HTML's history teaches us that web standards are constantly evolving. Today's best practices may change tomorrow."}
                  </p>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Forms Content */}
            {isLesson1 && currentStep === 6 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "HTML फारमहरू वेबसाइटहरूमा प्रयोगकर्ता इनपुट संकलन गर्न आवश्यक छन्। तिनीहरूले प्रयोगकर्तालाई डाटा पेश गर्न, छनौट गर्न, र वेब अनुप्रयोगहरूसँग अन्तरक्रिया गर्न अनुमति दिन्छन्।"
                    : language === "new"
                    ? "HTML फॉर्म वेबसाइटम प्रयोगकर्ताक इनपुट बटोरना जरूरी हो। या ले प्रयोगकर्तालाइ डाटा पठौना, विकल्प छानना, अनि वेब एपसँंग अन्तरक्रिया गरना दिन्छ।"
                    : "HTML forms are essential for collecting user input on websites. They allow users to submit data, make selections, and interact with web applications."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "आधारभूत फारम संरचना" : language === "new" ? "आधारभूत फॉर्म संरचना" : "Basic Form Structure"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "हरेक HTML फारम &lt;form&gt; तत्वबाट सुरु हुन्छ र विभिन्न इनपुट तत्वहरू समावेश गर्छ:" : language === "new" ? "जेकै HTML फॉर्म &lt;form&gt; एलिमेन्टले सुरू जान्छ र भित्र विभिन्न इनपुट एलिमेन्ट रहन्छ:" : "Every HTML form starts with the &lt;form&gt; element and contains various input elements:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;form action="/submit" method="post"&gt;<br/>
                    &nbsp;&nbsp;&lt;label for="username"&gt;{language === "ne" ? "प्रयोगकर्ता नाम:" : language === "new" ? "प्रयोगकर्ता नाम:" : "Username:"}&lt;/label&gt;<br/>
                    &nbsp;&nbsp;&lt;input type="text" id="username" name="username"&gt;<br/>
                    &nbsp;&nbsp;&lt;button type="submit"&gt;{language === "ne" ? "पेश गर्नुहोस्" : language === "new" ? "पठाउ" : "Submit"}&lt;/button&gt;<br/>
                    &lt;/form&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "सामान्य इनपुट प्रकारहरू" : language === "new" ? "सामान्य इनपुट प्रकार" : "Common Input Types"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">{language === "ne" ? "टेक्स्ट इनपुटहरू" : language === "new" ? "टेक्स्ट इनपुट" : "Text Inputs"}</h3>
                    <p className="text-sm text-neutral-600">text, password, email, tel, url</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">{language === "ne" ? "छनौट इनपुटहरू" : language === "new" ? "छनोट इनपुट" : "Selection Inputs"}</h3>
                    <p className="text-sm text-neutral-600">checkbox, radio, select, textarea</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">{language === "ne" ? "विशेष इनपुटहरू" : language === "new" ? "विशेष इनपुट" : "Special Inputs"}</h3>
                    <p className="text-sm text-neutral-600">date, time, file, color, range</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">{language === "ne" ? "बटन प्रकारहरू" : language === "new" ? "बटन प्रकार" : "Button Types"}</h3>
                    <p className="text-sm text-neutral-600">submit, reset, button</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "फारम मान्यता" : language === "new" ? "फॉर्म भ्यालिडेसन" : "Form Validation"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML5 ले बिल्ट-इन मान्यता विशेषताहरू प्रदान गर्छ:" : language === "new" ? "HTML5 मया बिल्ट‑इन भ्यालिडेसन एट्रिब्यूट छ:" : "HTML5 provides built-in validation attributes:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>required:</strong> {language === "ne" ? "पेश गर्नु अघि फिल्ड भर्नुपर्छ" : language === "new" ? "पठौना अगिँ फिल्ड भरियेनु पर्छ" : "Field must be filled before submission"}</li>
                  <li>• <strong>pattern:</strong> {language === "ne" ? "कस्टम regex मान्यता प्याटर्न" : language === "new" ? "कस्टम regex भ्यालिडेसन प्याटर्न" : "Custom regex validation pattern"}</li>
                  <li>• <strong>min/max:</strong> {language === "ne" ? "संख्यात्मक मान सीमाहरू" : language === "new" ? "संख्यात्मक मान सीमा" : "Numeric value constraints"}</li>
                  <li>• <strong>maxlength:</strong> {language === "ne" ? "अधिकतम अक्षर सीमा" : language === "new" ? "अधिकतम क्यारेक्टर सीमा" : "Maximum character limit"}</li>
                  <li>• <strong>placeholder:</strong> {language === "ne" ? "इनपुट फिल्डहरूका लागि संकेत टेक्स्ट" : language === "new" ? "इनपुट फिल्डलागि संकेत टेक्स्ट" : "Hint text for input fields"}</li>
                </ul>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>{language === "ne" ? "उदाहरण:" : language === "new" ? "उदाहरण:" : "Example:"}</strong> &lt;input type="email" required placeholder="{language === "ne" ? "आफ्नो इमेल प्रविष्ट गर्नुहोस्" : language === "new" ? "आफ्नो इमेल लेख" : "Enter your email"}"&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "फारम सर्वोत्तम प्रथाहरू" : language === "new" ? "फॉर्म बेस्ट प्राक्टिस" : "Form Best Practices"}
                </h2>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• {language === "ne" ? "एक्सेसिबिलिटीका लागि सधैं इनपुट फिल्डहरूसँग लेबलहरू प्रयोग गर्नुहोस्" : language === "new" ? "पहुँचलागि सधैं इनपुट फिल्डसँग लेबल प्रयोग गरइ" : "Always use labels with input fields for accessibility"}</li>
                  <li>• {language === "ne" ? "सम्बन्धित फारम तत्वहरूलाई fieldset र legend सँग समूह गर्नुहोस्" : language === "new" ? "सम्बन्धित एलिमेन्ट fieldset/legend सँग समूह गरइ" : "Group related form elements with fieldset and legend"}</li>
                  <li>• {language === "ne" ? "स्पष्ट त्रुटि सन्देशहरू र मान्यता प्रतिक्रिया प्रदान गर्नुहोस्" : language === "new" ? "स्पष्ट त्रुटि सन्देश र भ्यालिडेसन प्रतिक्रिया दिनु" : "Provide clear error messages and validation feedback"}</li>
                  <li>• {language === "ne" ? "राम्रो मोबाइल अनुभवका लागि उपयुक्त इनपुट प्रकारहरू प्रयोग गर्नुहोस्" : language === "new" ? "मोबाइल अनुभव सुधारलागि उपयुक्त इनपुट प्रकार प्रयोग गरइ" : "Use appropriate input types for better mobile experience"}</li>
                  <li>• {language === "ne" ? "राम्रो प्रयोगकर्ता अनुभवका लागि autocomplete प्रयोग गर्ने विचार गर्नुहोस्" : language === "new" ? "प्रयोगकर्ता अनुभव सुधारलागि autocomplete प्रयोग गरन विचार गरइ" : "Consider using autocomplete for better user experience"}</li>
                </ul>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Tables Content */}
            {isLesson1 && currentStep === 7 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "HTML तालिकाहरू पङ्क्ति र स्तम्भहरूमा डेटा देखाउन प्रयोग गरिन्छ। यी तालिकाहरू समयतालिका, तथ्याङ्क, र तुलना जस्ता संरचित जानकारी प्रस्तुत गर्न उपयुक्त हुन्छन्।" : "HTML tables are used to display data in rows and columns. They're perfect for presenting structured information like schedules, statistics, and comparisons."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "आधारभूत तालिका संरचना" : language === "new" ? "आधारभूत टेबल संरचना" : "Basic Table Structure"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "तालिकाहरू केही मुख्य तत्वहरू प्रयोग गरेर बनाइन्छन्:" : language === "new" ? "टेबल केही मुख्य एलिमेन्ट प्रयोग करि बनिन्या छ:" : "Tables are built using several key elements:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;table&gt;<br/>
                    &nbsp;&nbsp;&lt;thead&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;{language === "ne" ? "शीर्षक 1" : language === "new" ? "शीर्षक 1" : "Header 1"}&lt;/th&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;{language === "ne" ? "शीर्षक 2" : language === "new" ? "शीर्षक 2" : "Header 2"}&lt;/th&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;<br/>
                    &nbsp;&nbsp;&lt;/thead&gt;<br/>
                    &nbsp;&nbsp;&lt;tbody&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;{language === "ne" ? "डेटा 1" : language === "new" ? "डेटा 1" : "Data 1"}&lt;/td&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;{language === "ne" ? "डेटा 2" : language === "new" ? "डेटा 2" : "Data 2"}&lt;/td&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;<br/>
                    &nbsp;&nbsp;&lt;/tbody&gt;<br/>
                    &lt;/table&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "तालिका तत्वहरू" : language === "new" ? "टेबल एलिमेन्ट" : "Table Elements"}
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;table&gt;</h3>
                    <p className="text-neutral-600 text-sm">{language === "ne" ? "सम्पूर्ण तालिकाका लागि मुख्य कन्टेनर" : language === "new" ? "पूरो टेबलको मुख्य कन्टेनर" : "The main container for the entire table"}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;thead&gt;</h3>
                    <p className="text-neutral-600 text-sm">{language === "ne" ? "तालिका शीर्षक पङ्क्ति(हरू) समावेश गर्छ" : language === "new" ? "टेबल शीर्षक पङ्क्ति समावेश" : "Contains the table header row(s)"}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;tbody&gt;</h3>
                    <p className="text-neutral-600 text-sm">{language === "ne" ? "मुख्य तालिका डेटा समावेश गर्छ" : language === "new" ? "मुख्य टेबल डेटा समावेश" : "Contains the main table data"}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;tr&gt;</h3>
                    <p className="text-neutral-600 text-sm">{language === "ne" ? "तालिका पङ्क्ति परिभाषित गर्छ" : language === "new" ? "टेबल पङ्क्ति (row) परिभाषित" : "Defines a table row"}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;th&gt;</h3>
                    <p className="text-neutral-600 text-sm">{language === "ne" ? "तालिका शीर्षक सेल (डिफल्टले बाक्लो)" : language === "new" ? "हेडर सेल (डिफल्टले बाक्लो)" : "Table header cell (bold by default)"}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">&lt;td&gt;</h3>
                    <p className="text-neutral-600 text-sm">{language === "ne" ? "तालिका डेटा सेल" : language === "new" ? "डेटा सेल" : "Table data cell"}</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "तालिका विशेषताहरू (Attributes)" : language === "new" ? "टेबल Attributes" : "Table Attributes"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">colspan</h4>
                    <p className="text-sm text-neutral-600">{language === "ne" ? "एक सेललाई अनेकौँ स्तम्भहरूमा फैलाउँछ" : language === "new" ? "एँक सेललाइ धेरै स्तम्भम फैलाउना" : "Makes a cell span multiple columns"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">rowspan</h4>
                    <p className="text-sm text-neutral-600">{language === "ne" ? "एक सेललाई अनेकौँ पङ्क्तिहरूमा फैलाउँछ" : language === "new" ? "एँक सेललाइ धेरै पङ्क्तिम फैलाउना" : "Makes a cell span multiple rows"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">border</h4>
                    <p className="text-sm text-neutral-600">{language === "ne" ? "तालिका सेलहरूमा किनार (बोर्डर) थप्छ" : language === "new" ? "सेलमा किनार (border) थपना" : "Adds borders to table cells"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">cellpadding</h4>
                    <p className="text-sm text-neutral-600">{language === "ne" ? "सेल भित्रको खालीस्थान थप्छ" : language === "new" ? "सेल भित्र खालीस्थान थपना" : "Adds space inside cells"}</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "कहिले तालिका प्रयोग गर्ने" : language === "new" ? "टेबल कहिले प्रयोग गरना" : "When to Use Tables"}
                </h2>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-800 mb-2">✅ {language === "ne" ? "उपयुक्त प्रयोग:" : language === "new" ? "उपयुक्त प्रयोग:" : "Good Uses:"}</h3>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• {language === "ne" ? "वित्तीय डेटा र प्रतिवेदन" : language === "new" ? "वित्तीय डेटा र रिपोर्ट" : "Financial data and reports"}</li>
                    <li>• {language === "ne" ? "प्रोडक्ट तुलना चार्ट" : language === "new" ? "उत्पाद तुलना चार्ट" : "Product comparison charts"}</li>
                    <li>• {language === "ne" ? "कार्यक्रम समयतालिका" : language === "new" ? "इभेन्ट/कक्षा समयतालिका" : "Event schedules and timetables"}</li>
                    <li>• {language === "ne" ? "तथ्याङ्क प्रस्तुतिकरण" : language === "new" ? "तथ्यांक प्रस्तुति" : "Statistical data presentation"}</li>
                    <li>• {language === "ne" ? "कुनै पनि संरचित, तालिकागत डेटा" : language === "new" ? "जसो‑सुकै संरचित, टेबुलर डेटा" : "Any structured, tabular data"}</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-4">
                  <h3 className="font-medium text-red-800 mb-2">❌ {language === "ne" ? "यसका लागि प्रयोग नगर्नुहोस्:" : language === "new" ? "यी लागि प्रयोग नगर्नु:" : "Avoid Using For:"}</h3>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• {language === "ne" ? "पेज लेआउट र डिजाइन" : language === "new" ? "पेज लेआउट/डिजाइन" : "Page layout and design"}</li>
                    <li>• {language === "ne" ? "नेभिगेसन मेनु" : language === "new" ? "नेभिगेसन मेनु" : "Navigation menus"}</li>
                    <li>• {language === "ne" ? "div भित्र हुनुपर्ने सामग्री" : language === "new" ? "div/सेमान्टिक एलिमेन्टम हुनुपर्ने सामग्री" : "Content that should be in divs"}</li>
                  </ul>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Lists Content */}
            {isLesson1 && currentStep === 8 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "HTML सूचीहरू सामग्रीलाई संरचित तरिकाले व्यवस्थित र प्रस्तुत गर्न प्रयोग गरिन्छ। सूचीहरूले पढ्न सजिलो बनाउँछ र सामग्रीमा स्पष्ट श्रेणीक्रम सिर्जना गर्छ।"
                    : language === "new"
                    ? "HTML लिस्ट सामग्रीलाइ संरचित तरीकाले मिलौना र देखौना प्रयोग जां। लिस्टले पढन सजिलो बनाउंछ अनि सामग्रीम स्पष्ट श्रेणीक्रम देंछ।"
                    : "HTML lists are used to organize and present information in a structured way. They help improve readability and create clear hierarchies in content."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "HTML सूचीका प्रकारहरू" : language === "new" ? "HTML लिस्टका प्रकार" : "Types of HTML Lists"}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">{language === "ne" ? "१. अव्यवस्थित सूची (\u003cul\u003e)" : language === "new" ? "१. Unordered लिस्ट (\u003cul\u003e)" : "1. Unordered Lists (\u003cul\u003e)"}</h3>
                    <p className="text-neutral-600 text-sm mb-2">{language === "ne" ? "त्यस्ता वस्तुहरूका लागि प्रयोग गरिन्छ जसमा विशेष क्रम आवश्यक हुँदैन" : language === "new" ? "जस्म खास क्रम जरूरी नहुंच" : "Used for items that don't need to be in a specific order"}</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;ul&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "पहिलो वस्तु" : language === "new" ? "पहिलो वस्तु" : "First item"}&lt;/li&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "दोस्रो वस्तु" : language === "new" ? "दोस्रो वस्तु" : "Second item"}&lt;/li&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "तेस्रो वस्तु" : language === "new" ? "तेस्रो वस्तु" : "Third item"}&lt;/li&gt;<br/>
                        &lt;/ul&gt;
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">{language === "ne" ? "२. व्यवस्थित सूची (\u003col\u003e)" : language === "new" ? "२. Ordered लिस्ट (\u003col\u003e)" : "2. Ordered Lists (\u003col\u003e)"}</h3>
                    <p className="text-neutral-600 text-sm mb-2">{language === "ne" ? "त्यस्ता वस्तुहरूका लागि प्रयोग गरिन्छ जहाँ क्रम महत्त्वपूर्ण हुन्छ" : language === "new" ? "जँय् क्रम महत्त्वपूर्ण छ तेस्तो आइटमलागि" : "Used when the order of items is important"}</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;ol&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "पहिलो चरण" : language === "new" ? "पहिलो चरण" : "Step one"}&lt;/li&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "दोस्रो चरण" : language === "new" ? "दोस्रो चरण" : "Step two"}&lt;/li&gt;<br/>
                        &nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "तेस्रो चरण" : language === "new" ? "तेस्रो चरण" : "Step three"}&lt;/li&gt;<br/>
                        &lt;/ol&gt;
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">{language === "ne" ? "३. परिभाषा सूची (\u003cdl\u003e)" : language === "new" ? "३. Definition लिस्ट (\u003cdl\u003e)" : "3. Definition Lists (\u003cdl\u003e)"}</h3>
                    <p className="text-neutral-600 text-sm mb-2">{language === "ne" ? "शब्द-परिभाषा जोडीहरूका लागि प्रयोग गरिन्छ" : language === "new" ? "शब्द‑परिभाषा जोडीलागि" : "Used for term-definition pairs"}</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">
                        &lt;dl&gt;<br/>
                        &nbsp;&nbsp;&lt;dt&gt;HTML&lt;/dt&gt;<br/>
                        &nbsp;&nbsp;&lt;dd&gt;{language === "ne" ? "हाइपरटेक्स्ट मार्कअप ल्याङ्ग्वेज" : language === "new" ? "हाइपरटेक्स्ट मार्कअप ल्याङ्ग्वेज" : "HyperText Markup Language"}&lt;/dd&gt;<br/>
                        &nbsp;&nbsp;&lt;dt&gt;CSS&lt;/dt&gt;<br/>
                        &nbsp;&nbsp;&lt;dd&gt;{language === "ne" ? "क्यास्केडिङ स्टाइल सिट्स" : language === "new" ? "क्यास्केडिङ स्टाइल सिट्स" : "Cascading Style Sheets"}&lt;/dd&gt;<br/>
                        &lt;/dl&gt;
                      </p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "सूची विशेषताहरू (Attributes)" : language === "new" ? "लिस्ट Attributes" : "List Attributes"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">type (for &lt;ol&gt;)</h4>
                    <p className="text-sm text-neutral-600">{language === "ne" ? "1, A, a, I, i (संख्या, अक्षर, रोमन अंक)" : language === "new" ? "1, A, a, I, i (अंक, अक्षर, रोमन अंक)" : "1, A, a, I, i (numbers, letters, roman numerals)"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">start</h4>
                    <p className="text-sm text-neutral-600">{language === "ne" ? "व्यवस्थित सूचीका लागि सुरु नम्बर" : language === "new" ? "Ordered लिस्टलागि सुरु नम्बर" : "Starting number for ordered lists"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">reversed</h4>
                    <p className="text-sm text-neutral-600">{language === "ne" ? "माथिबाट तलतिर गन्ने" : language === "new" ? "माथिबाट तलतिर गन्ने" : "Counts down instead of up"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">value</h4>
                    <p className="text-sm text-neutral-600">{language === "ne" ? "विशेष सूची वस्तुको लागि निश्चित नम्बर" : language === "new" ? "खास लिस्ट आइटमलागि निश्चित नम्बर" : "Specific number for a list item"}</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "नेस्टेड (भित्र-भित्र) सूची" : language === "new" ? "नेस्टेड (भित्र‑भित्र) लिस्ट" : "Nested Lists"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "जटिल श्रेणीक्रम बनाउन सूचीहरू एक-अर्काका भित्र राख्न सकिन्छ:" : language === "new" ? "जटिल श्रेणीक्रम बनौना लिस्टलाइ एक‑अर्काक भित्र राखिना सकिंछ:" : "Lists can be nested inside each other to create complex hierarchies:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;ul&gt;<br/>
                    &nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "मुख्य वस्तु १" : language === "new" ? "मुख्य वस्तु १" : "Main item 1"}&lt;/li&gt;<br/>
                    &nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "मुख्य वस्तु २" : language === "new" ? "मुख्य वस्तु २" : "Main item 2"}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;ul&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "उप-वस्तु २.१" : language === "new" ? "उप‑वस्तु २.१" : "Sub item 2.1"}&lt;/li&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "उप-वस्तु २.२" : language === "new" ? "उप‑वस्तु २.२" : "Sub item 2.2"}&lt;/li&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/ul&gt;<br/>
                    &nbsp;&nbsp;&lt;/li&gt;<br/>
                    &nbsp;&nbsp;&lt;li&gt;{language === "ne" ? "मुख्य वस्तु ३" : language === "new" ? "मुख्य वस्तु ३" : "Main item 3"}&lt;/li&gt;<br/>
                    &lt;/ul&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "सूचीसँग नेभिगेसन" : language === "new" ? "लिस्टसँग नेभिगेसन" : "Navigation with Lists"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "नेभिगेसन मेनुहरूका लागि सूचीहरू सामान्यतया प्रयोग गरिन्छ:" : language === "new" ? "नेभिगेसन मेनुलागि लिस्ट सामान्यतया प्रयोग जां:" : "Lists are commonly used for navigation menus:"}
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>{language === "ne" ? "प्रो टिप:" : language === "new" ? "प्रो टिप:" : "Pro Tip:"}</strong> {language === "ne" ? "सुन्दर नेभिगेसन मेनु बनाउन सिमान्टिक HTML र CSS शैली प्रयोग गर्नुहोस्। सूचीले संरचना दिन्छ, CSS ले डिजाइन दिन्छ।" : language === "new" ? "राम्रो नेभिगेसन मेनु बनौना semantic HTML अनि CSS शैली प्रयोग गर। लिस्टले संरचना दिन्छ, CSS ले डिजाइन दिन्छ।" : "Use semantic HTML with CSS styling to create beautiful navigation menus. Lists provide the structure, CSS provides the design."}
                  </p>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Media Content */}
            {isLesson1 && currentStep === 9 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne"
                    ? "HTML ले छवि, भिडियो, अडियो, र बाह्य सामग्री लगायतका विभिन्न प्रकारका मिडिया सामग्री समावेश र प्रदर्शन गर्न शक्तिशाली तत्वहरू प्रदान गर्दछ।"
                    : language === "new"
                    ? "HTML ले छवि, भिडियो, अडियो, बाह्य सामग्री लगायत बिभिन्न प्रकारक मिडिया समाहित र देखौना शक्तिशाली एलिमेन्ट दिन्छ।"
                    : "HTML provides powerful elements for embedding and displaying various types of media content, including images, videos, audio, and external content."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "छवि (\u003cimg\u003e)" : language === "new" ? "छवि (\u003cimg\u003e)" : "Images (\u003cimg\u003e)"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "\u003cimg\u003e तत्व वेब पृष्ठहरूमा छविहरू देखाउन प्रयोग हुन्छ:" : language === "new" ? "\u003cimg\u003e एलिमेन्ट वेब पेजम छवि देखौना प्रयोग जां:" : "The \u003cimg\u003e element is used to display images on web pages:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;img src="image.jpg" alt="{language === "ne" ? "वर्णन" : language === "new" ? "वर्णन" : "Description"}" width="300" height="200"&gt;
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">{language === "ne" ? "आवश्यक विशेषताहरू" : language === "new" ? "आवश्यक Attributes" : "Essential Attributes"}</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• <strong>src:</strong> {language === "ne" ? "छविको स्रोत URL" : language === "new" ? "छविको स्रोत URL" : "Image source URL"}</li>
                      <li>• <strong>alt:</strong> {language === "ne" ? "पहुँचका लागि वैकल्पिक पाठ" : language === "new" ? "पहुँचलागि वैकल्पिक पाठ" : "Alternative text for accessibility"}</li>
                      <li>• <strong>width/height:</strong> {language === "ne" ? "छविको आयाम" : language === "new" ? "छविको आयाम" : "Image dimensions"}</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">{language === "ne" ? "वैकल्पिक विशेषताहरू" : language === "new" ? "वैकल्पिक Attributes" : "Optional Attributes"}</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• <strong>loading:</strong> {language === "ne" ? "प्रदर्शनका लागि लेजी लोडिङ" : language === "new" ? "प्रदर्शनलागि लेजी लोडिङ" : "Lazy loading for performance"}</li>
                      <li>• <strong>decoding:</strong> {language === "ne" ? "छवि डिकोडिङ संकेत" : language === "new" ? "छवि डिकोडिङ संकेत" : "Image decoding hints"}</li>
                      <li>• <strong>style:</strong> {language === "ne" ? "इनलाइन CSS शैली" : language === "new" ? "इनलाइन CSS शैली" : "Inline CSS styling"}</li>
                    </ul>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "भिडियो (\u003cvideo\u003e)" : language === "new" ? "भिडियो (\u003cvideo\u003e)" : "Video (\u003cvideo\u003e)"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "\u003cvideo\u003e तत्वले धेरै भिडियो ढाँचाहरू समर्थन गर्छ र प्लेब्याक कन्ट्रोल प्रदान गर्छ:" : language === "new" ? "\u003cvideo\u003e एलिमेन्टले धेरै भिडियो फर्म्याट समर्थन गर्नि, र प्लेब्याक कन्ट्रोल दिनि:" : "The \u003cvideo\u003e element supports multiple video formats and provides playback controls:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                     &lt;video width="400" height="300" controls&gt;<br/>
                     &nbsp;&nbsp;&lt;source src="video.mp4" type="video/mp4"&gt;<br/>
                     &nbsp;&nbsp;&lt;source src="video.webm" type="video/webm"&gt;<br/>
                     &nbsp;&nbsp;{language === "ne" ? "तपाईंको ब्राउजरले भिडियो ट्यागलाई समर्थन गर्दैन।" : language === "new" ? "तमाय् ब्राउजरले video ट्याग समर्थन नय्।" : "Your browser does not support the video tag."}<br/>
                     &lt;/video&gt;
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>{language === "ne" ? "नोट:" : language === "new" ? "नोट:" : "Note:"}</strong> {language === "ne" ? "भिडियो तत्वलाई समर्थन नगर्ने ब्राउजरहरूका लागि सधैं फलब्याक सामग्री प्रदान गर्नुहोस्।" : language === "new" ? "video एलिमेन्ट समर्थन नगर्न्या ब्राउजरलागि सधैं fallback सामग्री देइ।" : "Always provide fallback content for browsers that don't support the video element."}
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "अडियो (\u003caudio\u003e)" : language === "new" ? "अडियो (\u003caudio\u003e)" : "Audio (\u003caudio\u003e)"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "\u003caudio\u003e तत्व अडियो सामग्रीका लागि प्रयोग हुन्छ:" : language === "new" ? "\u003caudio\u003e एलिमेन्ट अडियो सामग्रीलागि प्रयोग जां:" : "The \u003caudio\u003e element is used for audio content:"}
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
                  {language === "ne" ? "आईफ्रेम (\u003ciframe\u003e)" : language === "new" ? "आईफ्रेम (\u003ciframe\u003e)" : "Iframes (\u003ciframe\u003e)"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "आईफ्रेमहरूले अन्य वेबसाइटहरूबाट बाह्य सामग्री एम्बेड गर्न अनुमति दिन्छन्:" : language === "new" ? "आईफ्रेमहरूले अन्य वेबसाइटहरूबाट बाह्य सामग्री एम्बेड गर्न अनुमति दिन्छन्:" : "Iframes allow you to embed external content from other websites:"}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                     &lt;iframe src="https://example.com" width="600" height="400"&gt;&lt;/iframe&gt;
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">{language === "ne" ? "सामान्य प्रयोग" : language === "new" ? "Common प्रयोग" : "Common Uses"}</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• {language === "ne" ? "YouTube भिडियोहरू" : language === "new" ? "YouTube भिडियो" : "YouTube videos"}</li>
                      <li>• {language === "ne" ? "Google Maps" : language === "new" ? "Google Maps" : "Google Maps"}</li>
                      <li>• {language === "ne" ? "सोसल मिडिया पोस्ट" : language === "new" ? "सोसल मिडिया पोस्ट" : "Social media posts"}</li>
                      <li>• {language === "ne" ? "बाह्य फारमहरू" : language === "new" ? "बाह्य फॉर्म" : "External forms"}</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">{language === "ne" ? "सुरक्षा विचारहरू" : language === "new" ? "सुरक्षा Considerations" : "Security Considerations"}</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• {language === "ne" ? "sandbox विशेषता प्रयोग गर्नुहोस्" : language === "new" ? "sandbox Attribute प्रयोग गर" : "Use sandbox attribute"}</li>
                      <li>• {language === "ne" ? "अनुमतिहरू सीमित गर्नुहोस्" : language === "new" ? "परमिशन सीमित गर" : "Limit permissions"}</li>
                      <li>• {language === "ne" ? "विश्वसनीय स्रोतहरू मात्र भरोसा गर्नुहोस्" : language === "new" ? "भरोसालागि मात्र विश्वसनीय स्रोत विश्वास गर" : "Trust only reliable sources"}</li>
                    </ul>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "मिडिया सर्वोत्तम प्रथाहरू" : language === "new" ? "मिडिया बेस्ट प्राक्टिस" : "Media Best Practices"}
                </h2>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• {language === "ne" ? "छविहरूका लागि सधैं alt टेक्स्ट प्रदान गर्नुहोस् (पहुँच)" : language === "new" ? "छविलागि सधैं alt टेक्स्ट देइ (पहुँच)" : "Always provide alt text for images (accessibility)"}</li>
                  <li>• {language === "ne" ? "उपयुक्त छवि ढाँचाहरू प्रयोग गर्नुहोस् (फोटोका लागि JPEG, ग्राफिक्सका लागि PNG)" : language === "new" ? "उपयुक्त छवि फर्म्याट प्रयोग गर (फोटोलागि JPEG, ग्राफिक्सलागि PNG)" : "Use appropriate image formats (JPEG for photos, PNG for graphics)"}</li>
                  <li>• {language === "ne" ? "वेबका लागि मिडिया फाइलहरू अनुकूलन गर्नुहोस् (कम्प्रेसन, उपयुक्त साइज)" : language === "new" ? "वेबलागि मिडिया फाइल अप्टिमाइज गर (compression, उपयुक्त साइज)" : "Optimize media files for web (compression, appropriate sizes)"}</li>
                  <li>• {language === "ne" ? "मोबाइल प्रयोगकर्ताहरू विचार गर्नुहोस् (रिस्पोन्सिभ छविहरू, टच-मैत्री कन्ट्रोलहरू)" : language === "new" ? "मोबाइल प्रयोगकर्तालाइ ध्यान देइ (responsive छवि, touch‑मैत्री कन्ट्रोल)" : "Consider mobile users (responsive images, touch-friendly controls)"}</li>
                  <li>• {language === "ne" ? "समर्थन नभएको मिडियाका लागि फलब्याक सामग्री प्रदान गर्नुहोस्" : language === "new" ? "समर्थन नभएको मिडियालागि fallback सामग्री देइ" : "Provide fallback content for unsupported media"}</li>
                </ul>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Best Practices Content */}
            {isLesson1 && currentStep === 10 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === "ne" ? "HTML का सर्वोत्तम प्रथाहरू पालना गर्दा तपाईंको कोड सफा, पहुँचयोग्य, मर्मतयोग्य, र वेब मापदण्डहरू अनुरूप हुन्छ। राम्रो HTML अभ्यासले राम्रो प्रयोगकर्ता अनुभव र सजिलो विकासतर्फ लैजान्छ।" : "Following HTML best practices ensures your code is clean, accessible, maintainable, and follows web standards. Good HTML practices lead to better user experience and easier development."}
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  {language === "ne" ? "सिमान्टिक HTML" : "Semantic HTML"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "उद्देश्य स्पष्ट रूपमा वर्णन गर्ने सिमान्टिक तत्वहरू प्रयोग गर्नुहोस्:" : "Use semantic elements that clearly describe their purpose:"}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">{language === "ne" ? "संरचना तत्वहरू" : "Structure Elements"}</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• &lt;header&gt; - {language === "ne" ? "पेज हेडर" : "Page header"}</li>
                      <li>• &lt;nav&gt; - {language === "ne" ? "नेभिगेसन मेनु" : "Navigation menu"}</li>
                      <li>• &lt;main&gt; - {language === "ne" ? "मुख्य सामग्री" : "Main content"}</li>
                      <li>• &lt;section&gt; - {language === "ne" ? "सामग्री खण्ड" : "Content section"}</li>
                      <li>• &lt;article&gt; - {language === "ne" ? "स्वतन्त्र सामग्री" : "Independent content"}</li>
                      <li>• &lt;aside&gt; - {language === "ne" ? "साइडबार सामग्री" : "Sidebar content"}</li>
                      <li>• &lt;footer&gt; - {language === "ne" ? "पेज फुटर" : "Page footer"}</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">{language === "ne" ? "टेक्स्ट तत्वहरू" : "Text Elements"}</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• &lt;strong&gt; - {language === "ne" ? "महत्वपूर्ण टेक्स्ट" : "Important text"}</li>
                      <li>• &lt;em&gt; - {language === "ne" ? "जोर दिएको टेक्स्ट" : "Emphasized text"}</li>
                      <li>• &lt;mark&gt; - {language === "ne" ? "हाइलाइट गरिएको टेक्स्ट" : "Highlighted text"}</li>
                      <li>• &lt;cite&gt; - {language === "ne" ? "उद्धरण" : "Citation"}</li>
                      <li>• &lt;time&gt; - {language === "ne" ? "मिति/समय" : "Date/time"}</li>
                      <li>• &lt;code&gt; - {language === "ne" ? "कोड स्निपेट" : "Code snippet"}</li>
                    </ul>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "पहुँचयोग्यता (A11y)" : "Accessibility (A11y)"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "स्क्रिन रिडर प्रयोगकर्तासहित सबै प्रयोगकर्ताका लागि आफ्नो HTML पहुँचयोग्य बनाउनुहोस्:" : "Make your HTML accessible to all users, including those using screen readers:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>{language === "ne" ? "Alt टेक्स्ट:" : "Alt text:"}</strong> {language === "ne" ? "छविहरूका लागि सधैं वर्णनात्मक alt विशेषता प्रदान गर्नुहोस्" : "Always provide descriptive alt attributes for images"}</li>
                  <li>• <strong>{language === "ne" ? "शीर्षकहरू:" : "Headings:"}</strong> {language === "ne" ? "सही शीर्षक श्रेणीक्रम प्रयोग गर्नुहोस् (h1 → h2 → h3)" : "Use proper heading hierarchy (h1 → h2 → h3)"}</li>
                  <li>• <strong>{language === "ne" ? "लेबलहरू:" : "Labels:"}</strong> {language === "ne" ? "फारम लेबलहरू इनपुट फिल्डहरूसँग सम्बद्ध गर्नुहोस्" : "Associate form labels with input fields"}</li>
                  <li>• <strong>ARIA:</strong> {language === "ne" ? "जटिल अन्तरक्रियाहरूका लागि ARIA विशेषताहरू प्रयोग गर्नुहोस्" : "Use ARIA attributes for complex interactions"}</li>
                  <li>• <strong>{language === "ne" ? "रङ कन्ट्रास्ट:" : "Color contrast:"}</strong> {language === "ne" ? "टेक्स्ट र पृष्ठभूमिबीच पर्याप्त कन्ट्रास्ट सुनिश्चित गर्नुहोस्" : "Ensure sufficient contrast between text and background"}</li>
                  <li>• <strong>{language === "ne" ? "किबोर्ड नेभिगेसन:" : "Keyboard navigation:"}</strong> {language === "ne" ? "माउस बिना नेभिगेसन परीक्षण गर्नुहोस्" : "Test navigation without a mouse"}</li>
                </ul>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm">
                    <strong>{language === "ne" ? "पहुँच सुझाव:" : "Accessibility Tip:"}</strong> {language === "ne" ? "आफ्नो वेबसाइटलाई स्क्रिन रिडर र किबोर्ड नेभिगेसनसँग परीक्षण गर्नुहोस् ताकि यो सबै प्रयोगकर्ताहरूका लागि पहुँचयोग्य होस्।" : "Test your website with screen readers and keyboard navigation to ensure it's accessible to all users."}
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "कोड गुणस्तर" : "Code Quality"}
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-800 mb-2">{language === "ne" ? "सफा कोड प्रथाहरू" : "Clean Code Practices"}</h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• {language === "ne" ? "एकै किसिमको इनडेन्टेसन प्रयोग गर्नुहोस् (२ वा ४ स्पेस)" : "Use consistent indentation (2 or 4 spaces)"}</li>
                      <li>• {language === "ne" ? "जटिल भागहरूका लागि अर्थपूर्ण टिप्पणीहरू लेख्नुहोस्" : "Write meaningful comments for complex sections"}</li>
                      <li>• {language === "ne" ? "वर्णनात्मक class र ID नामहरू प्रयोग गर्नुहोस्" : "Use descriptive class and ID names"}</li>
                      <li>• {language === "ne" ? "सम्भव भएसम्म ८० क्यारेक्टर भित्र लाइन राख्नुहोस्" : "Keep lines under 80 characters when possible"}</li>
                      <li>• {language === "ne" ? "W3C भ्यालिडेटर प्रयोग गरेर HTML प्रमाणीकरण गर्नुहोस्" : "Validate your HTML using W3C validator"}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-medium text-purple-800 mb-2">{language === "ne" ? "प्रदर्शन विचारहरू" : "Performance Considerations"}</h3>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• {language === "ne" ? "HTML फाइल साइज न्यूनतम राख्नुहोस्" : "Minimize HTML file size"}</li>
                      <li>• {language === "ne" ? "उपयुक्त छवि ढाँचाहरू र साइजहरू प्रयोग गर्नुहोस्" : "Use appropriate image formats and sizes"}</li>
                      <li>• {language === "ne" ? "छवि र मिडियाका लागि लेजी लोडिङ विचार गर्नुहोस्" : "Consider lazy loading for images and media"}</li>
                      <li>• {language === "ne" ? "क्रिटिकल रेंडरिङ पाथलाई अनुकूलन गर्नुहोस्" : "Optimize critical rendering path"}</li>
                    </ul>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "SEO सर्वोत्तम प्रथाहरू" : "SEO Best Practices"}
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  {language === "ne" ? "सर्च इञ्जिनका लागि आफ्नो HTML अनुकूलन गर्नुहोस्:" : "Optimize your HTML for search engines:"}
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>{language === "ne" ? "शीर्षक ट्याग:" : "Title tags:"}</strong> {language === "ne" ? "वर्णनात्मक, कीवर्डयुक्त पेज शीर्षक प्रयोग गर्नुहोस्" : "Use descriptive, keyword-rich page titles"}</li>
                  <li>• <strong>{language === "ne" ? "मेटा विवरण:" : "Meta descriptions:"}</strong> {language === "ne" ? "सर्च परिणामका लागि आकर्षक सारांश लेख्नुहोस्" : "Write compelling summaries for search results"}</li>
                  <li>• <strong>{language === "ne" ? "शीर्षक संरचना:" : "Heading structure:"}</strong> {language === "ne" ? "सामग्री संगठनका लागि सही शीर्षक संरचना प्रयोग गर्नुहोस्" : "Use proper heading hierarchy for content organization"}</li>
                  <li>• <strong>{language === "ne" ? "सिमान्टिक मार्कअप:" : "Semantic markup:"}</strong> {language === "ne" ? "सर्च इञ्जिनलाई तपाईंको सामग्री बुझ्न मद्दत गर्छ" : "Help search engines understand your content"}</li>
                  <li>• <strong>{language === "ne" ? "स्किमामार्कअप:" : "Schema markup:"}</strong> {language === "ne" ? "रिच स्निपेट्सका लागि संरचित डेटा थप्नुहोस्" : "Add structured data for rich snippets"}</li>
                </ul>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  {language === "ne" ? "परीक्षण र प्रमाणीकरण" : "Testing & Validation"}
                </h2>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="text-orange-800 text-sm">
                    <strong>{language === "ne" ? "आवश्यक उपकरणहरू:" : "Essential Tools:"}</strong><br/>
                    • W3C HTML Validator - {language === "ne" ? "HTML सिन्ट्याक्स जाँच" : "Check HTML syntax"}<br/>
                    • Lighthouse - {language === "ne" ? "प्रदर्शन र पहुँच परीक्षण" : "Performance and accessibility testing"}<br/>
                    • {language === "ne" ? "ब्राउजर डेभलपर टुलहरू - क्रस-ब्राउजर परीक्षण" : "Browser Developer Tools - Cross-browser testing"}<br/>
                    • {language === "ne" ? "स्क्रिन रिडर परीक्षण - पहुँच प्रमाणीकरण" : "Screen Reader Testing - Accessibility verification"}
                  </p>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}
          </div>
          
          {/* Navigation Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              variant="secondary"
              size="lg"
              className="px-6"
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
      <Dialog open={runnerOpen} onOpenChange={setRunnerOpen}>
                 <DialogContent className="w-[95vw] sm:max-w-6xl p-2 sm:p-4">
          <DialogTitle>{language === "ne" ? "यो कोड चलाउनुहोस्" : language === "new" ? "यो कोड चलाउनुहोस्" : "Run this code"}</DialogTitle>
          <HtmlRunner initialHtml={runnerHtml} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
