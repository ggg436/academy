"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CongratulationPage } from "@/components/congratulation-page";

export const Quiz = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [playSound, setPlaySound] = useState(false);

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
                  HTML is the standard markup language for creating Web pages.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  What is HTML?
                </h2>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• HTML stands for Hyper Text Markup Language</li>
                  <li>• HTML is the standard markup language for creating Web pages</li>
                  <li>• HTML describes the structure of a Web page</li>
                  <li>• HTML consists of a series of elements</li>
                  <li>• HTML elements tell the browser how to display the content</li>
                  <li>• HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.</li>
                </ul>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Why Learn HTML?
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  HTML is the foundation of web development. Every website you visit is built with HTML. Learning HTML gives you the power to:
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• Create your own websites from scratch</li>
                  <li>• Understand how web pages are structured</li>
                  <li>• Customize existing websites and templates</li>
                  <li>• Build a strong foundation for learning CSS and JavaScript</li>
                  <li>• Pursue a career in web development</li>
                </ul>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  How HTML Works
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  HTML works by using tags to mark up content. These tags tell web browsers how to display the information. For example:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;h1&gt;This is a heading&lt;/h1&gt;<br/>
                    &lt;p&gt;This is a paragraph&lt;/p&gt;<br/>
                    &lt;a href="..."&gt;This is a link&lt;/a&gt;
                  </p>
                </div>
                
                <p className="text-neutral-600 leading-relaxed mt-4">
                  When a browser reads this HTML, it knows to display the first line as a large heading, the second as a paragraph, and the third as a clickable link.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  What You'll Learn
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  In this course, you'll learn how to:
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• Write clean, semantic HTML code</li>
                  <li>• Structure web pages with proper headings and sections</li>
                  <li>• Create lists, links, and images</li>
                  <li>• Build forms for user input</li>
                  <li>• Understand HTML best practices and accessibility</li>
                </ul>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Element Content */}
            {isLesson1 && currentStep === 2 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  HTML elements are the building blocks of HTML pages. Each element represents a different type of content and tells the browser how to display it.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  What is an HTML Element?
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  An HTML element is defined by a start tag, some content, and an end tag. Elements can contain other elements, text, or be empty.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;tagname&gt;Content goes here...&lt;/tagname&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Basic HTML Elements
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">Heading Elements</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="font-mono text-sm text-gray-700">
                        &lt;h1&gt;Main Heading&lt;/h1&gt;<br/>
                        &lt;h2&gt;Sub Heading&lt;/h2&gt;<br/>
                        &lt;h3&gt;Section Heading&lt;/h3&gt;
                      </p>
                    </div>
                    <p className="text-sm text-neutral-500 mt-2">h1 is the most important, h6 is the least important</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">Paragraph Element</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="font-mono text-sm text-gray-700">
                        &lt;p&gt;This is a paragraph of text. It can contain multiple sentences and will be displayed as a block of text with proper spacing.&lt;/p&gt;
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">Link Element</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="font-mono text-sm text-gray-700">
                        &lt;a href="https://example.com"&gt;Click here to visit Example&lt;/a&gt;
                      </p>
                    </div>
                    <p className="text-sm text-neutral-500 mt-2">The href attribute specifies the destination URL</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Element Structure
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Every HTML element follows this basic structure:
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>Start tag:</strong> &lt;tagname&gt; - tells the browser where the element begins</li>
                  <li>• <strong>Content:</strong> The actual content (text, images, other elements)</li>
                  <li>• <strong>End tag:</strong> &lt;/tagname&gt; - tells the browser where the element ends</li>
                </ul>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> Some elements like &lt;img&gt; and &lt;br&gt; don't have end tags. These are called "self-closing" or "void" elements.
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Common HTML Elements
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded border">
                    <h4 className="font-medium text-neutral-700">Text Elements</h4>
                    <p className="text-sm text-neutral-600">p, span, div, strong, em, mark</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <h4 className="font-medium text-neutral-700">Heading Elements</h4>
                    <p className="text-sm text-neutral-600">h1, h2, h3, h4, h5, h6</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <h4 className="font-medium text-neutral-700">List Elements</h4>
                    <p className="text-sm text-neutral-600">ul, ol, li, dl, dt, dd</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <h4 className="font-medium text-neutral-700">Link & Media</h4>
                    <p className="text-sm text-neutral-600">a, img, video, audio</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* Web Browsers Content */}
            {isLesson1 && currentStep === 3 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Web browsers are software applications that retrieve, display, and navigate information on the World Wide Web. They interpret HTML code and render it into visual web pages.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  How Browsers Work
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  When you visit a website, your browser goes through several steps to display the page:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">Request</h3>
                      <p className="text-neutral-600 text-sm">Browser sends a request to the web server for the HTML file</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">Receive</h3>
                      <p className="text-neutral-600 text-sm">Server sends back the HTML document and related resources</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">Parse</h3>
                      <p className="text-neutral-600 text-sm">Browser parses the HTML and creates a Document Object Model (DOM)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">Render</h3>
                      <p className="text-neutral-600 text-sm">Browser renders the page based on the HTML structure and CSS styling</p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Popular Web Browsers
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Chrome</h3>
                    <p className="text-sm text-neutral-600">Developed by Google, known for speed and extensive extension support</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Firefox</h3>
                    <p className="text-sm text-neutral-600">Open-source browser by Mozilla, focuses on privacy and customization</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Safari</h3>
                    <p className="text-sm text-neutral-600">Apple's browser, optimized for macOS and iOS devices</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-neutral-700 mb-2">Edge</h3>
                    <p className="text-sm text-neutral-600">Microsoft's modern browser, built on Chromium engine</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Browser Developer Tools
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Modern browsers include powerful developer tools that help web developers:
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>Inspect Element:</strong> View and modify HTML structure in real-time</li>
                  <li>• <strong>Console:</strong> Run JavaScript code and view error messages</li>
                  <li>• <strong>Network Tab:</strong> Monitor HTTP requests and responses</li>
                  <li>• <strong>Performance:</strong> Analyze page loading speed and optimization</li>
                  <li>• <strong>Responsive Design:</strong> Test how pages look on different screen sizes</li>
                </ul>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Press F12 or right-click and select "Inspect" to open developer tools in most browsers.
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Cross-Browser Compatibility
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Different browsers may interpret HTML slightly differently. This is why it's important to:
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• Write clean, standards-compliant HTML code</li>
                  <li>• Test your websites in multiple browsers</li>
                  <li>• Use CSS for styling instead of relying on browser defaults</li>
                  <li>• Consider using CSS resets or normalize.css for consistent styling</li>
                </ul>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Page Structure Content */}
            {isLesson1 && currentStep === 4 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  HTML page structure refers to the way HTML documents are organized and structured. Every HTML page follows a standard structure that browsers expect to see.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  Basic HTML Document Structure
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Every HTML document has a specific structure that includes several essential elements:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    &lt;!DOCTYPE html&gt;<br/>
                    &lt;html&gt;<br/>
                    &nbsp;&nbsp;&lt;head&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;Page Title&lt;/title&gt;<br/>
                    &nbsp;&nbsp;&lt;/head&gt;<br/>
                    &nbsp;&nbsp;&lt;body&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Main Heading&lt;/h1&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Page content goes here&lt;/p&gt;<br/>
                    &nbsp;&nbsp;&lt;/body&gt;<br/>
                    &lt;/html&gt;
                  </p>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Essential HTML Elements
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">DOCTYPE Declaration</h3>
                    <p className="text-neutral-600 text-sm mb-2">Tells the browser this is an HTML5 document</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">&lt;!DOCTYPE html&gt;</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">HTML Root Element</h3>
                    <p className="text-neutral-600 text-sm mb-2">The root container for the entire HTML document</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">&lt;html lang="en"&gt;...&lt;/html&gt;</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">Head Section</h3>
                    <p className="text-neutral-600 text-sm mb-2">Contains metadata, title, and links to external resources</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="font-mono text-xs text-gray-700">&lt;head&gt;...&lt;/head&gt;</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">Body Section</h3>
                    <p className="text-neutral-600 text-sm mb-2">Contains all the visible content of the webpage</p>
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
                  HTML has evolved significantly since its creation in the early 1990s. Understanding its history helps us appreciate how web standards have developed and why certain practices exist today.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  The Birth of HTML
                </h2>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Tim Berners-Lee (1989-1991)</h3>
                  <p className="text-blue-700 text-sm">
                    While working at CERN, Tim Berners-Lee created HTML as a way to share scientific documents. He also created the first web browser and web server.
                  </p>
                </div>
                
                <p className="text-neutral-600 leading-relaxed mt-4">
                  HTML was originally designed to be simple and focused on document structure rather than presentation. The goal was to create a universal markup language that could work across different computer systems.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  HTML Version Timeline
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1.0</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">HTML 1.0 (1993)</h3>
                      <p className="text-neutral-600 text-sm">The first official specification included basic elements like headings, paragraphs, and links.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2.0</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">HTML 2.0 (1995)</h3>
                      <p className="text-neutral-600 text-sm">Introduced forms, tables, and became the standard for web development.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3.2</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">HTML 3.2 (1997)</h3>
                      <p className="text-neutral-600 text-sm">Added support for tables, applets, and text flow around images.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4.0</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">HTML 4.0 (1998)</h3>
                      <p className="text-neutral-600 text-sm">Major update with frames, scripting, and better form controls.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">5</div>
                    <div>
                      <h3 className="font-medium text-neutral-700">HTML5 (2014)</h3>
                      <p className="text-neutral-600 text-sm">Modern standard with semantic elements, multimedia support, and APIs.</p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Key Milestones in HTML Development
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">1991: First Website</h4>
                    <p className="text-sm text-neutral-600">The first website went live at CERN, marking the beginning of the World Wide Web</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">1994: W3C Founded</h4>
                    <p className="text-sm text-neutral-600">World Wide Web Consortium established to develop web standards</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">2000: XHTML 1.0</h4>
                    <p className="text-sm text-neutral-600">Attempt to make HTML more XML-like with stricter syntax rules</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-neutral-700 mb-2">2014: HTML5 Standard</h4>
                    <p className="text-sm text-neutral-600">HTML5 becomes an official W3C recommendation</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  The Browser Wars
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  During the late 1990s and early 2000s, browser vendors competed by adding proprietary HTML extensions:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="font-medium text-yellow-800 mb-2">Netscape Navigator</h3>
                    <p className="text-yellow-700 text-sm">Introduced many HTML features and JavaScript</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h3 className="font-medium text-red-800 mb-2">Internet Explorer</h3>
                    <p className="text-red-700 text-sm">Added proprietary tags and features to compete</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-medium text-green-800 mb-2">Result</h3>
                    <p className="text-green-700 text-sm">Led to non-standard HTML and compatibility issues</p>
                  </div>
                </div>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Modern HTML Standards
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Today, HTML development is more collaborative and standards-focused:
                </p>
                
                <ul className="space-y-3 text-neutral-600 leading-relaxed">
                  <li>• <strong>W3C:</strong> Develops and maintains HTML standards</li>
                  <li>• <strong>WHATWG:</strong> Web Hypertext Application Technology Working Group</li>
                  <li>• <strong>Living Standard:</strong> HTML is now a "living standard" that evolves continuously</li>
                  <li>• <strong>Browser Collaboration:</strong> Major browsers work together on new features</li>
                  <li>• <strong>Web Components:</strong> Future of HTML with reusable custom elements</li>
                </ul>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-8">
                  Why HTML History Matters
                </h2>
                
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <p className="text-indigo-800 text-sm">
                    <strong>Understanding HTML history helps you:</strong><br/>
                    • Appreciate why certain practices exist<br/>
                    • Avoid outdated techniques and deprecated elements<br/>
                    • Write more future-proof and standards-compliant code<br/>
                    • Understand the importance of web standards and accessibility
                  </p>
                </div>
                
                <hr className="border-gray-300" />
              </div>
            )}

            {/* HTML Forms Content */}
            {isLesson1 && currentStep === 6 && (
              <div className="mt-8 space-y-8">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  HTML forms are essential for collecting user input on websites. They allow users to submit data, make selections, and interact with web applications.
                </p>
                
                <hr className="border-gray-300" />
                
                <h2 className="text-xl font-semibold text-neutral-700 mt-6">
                  Basic Form Structure
                </h2>
                
                <p className="text-neutral-600 leading-relaxed">
                  Every HTML form starts with the &lt;form&gt; element and contains various input elements:
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
