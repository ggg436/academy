"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Quiz questions for different programming topics
const QUIZ_QUESTIONS = {
  javascript: [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: [
        "var myVariable = 5;",
        "variable myVariable = 5;",
        "v myVariable = 5;",
        "declare myVariable = 5;"
      ],
      correct: 0,
      explanation: "The 'var' keyword is used to declare variables in JavaScript.",
      category: "basics"
    },
    {
      id: 2,
      question: "Which method is used to add an element to the end of an array?",
      options: [
        "push()",
        "pop()",
        "shift()",
        "unshift()"
      ],
      correct: 0,
      explanation: "The push() method adds one or more elements to the end of an array.",
      category: "arrays"
    },
    {
      id: 3,
      question: "What does 'typeof' operator return for an array?",
      options: [
        "'array'",
        "'object'",
        "'list'",
        "'collection'"
      ],
      correct: 1,
      explanation: "In JavaScript, arrays are objects, so typeof returns 'object'.",
      category: "types"
    },
    {
      id: 4,
      question: "What is the purpose of 'use strict'?",
      options: [
        "To make code run faster",
        "To enable strict error checking",
        "To disable all errors",
        "To enable new JavaScript features"
      ],
      correct: 1,
      explanation: "'use strict' enables strict mode which catches common coding mistakes.",
      category: "advanced"
    },
    {
      id: 5,
      question: "How do you create a function in JavaScript?",
      options: [
        "function myFunction() {}",
        "create function myFunction() {}",
        "def myFunction():",
        "func myFunction() {}"
      ],
      correct: 0,
      explanation: "Functions are declared using the 'function' keyword followed by the function name.",
      category: "functions"
    }
  ],
  python: [
    {
      id: 6,
      question: "What is the correct way to create a list in Python?",
      options: [
        "list = [1, 2, 3]",
        "list = (1, 2, 3)",
        "list = {1, 2, 3}",
        "list = <1, 2, 3>"
      ],
      correct: 0,
      explanation: "Lists in Python are created using square brackets [].",
      category: "data-structures"
    },
    {
      id: 7,
      question: "What is the output of print(2 ** 3)?",
      options: [
        "6",
        "8",
        "5",
        "Error"
      ],
      correct: 1,
      explanation: "** is the exponentiation operator, so 2 ** 3 = 8.",
      category: "operators"
    },
    {
      id: 8,
      question: "How do you start a comment in Python?",
      options: [
        "//",
        "/*",
        "#",
        "<!--"
      ],
      correct: 2,
      explanation: "Python uses # for single-line comments.",
      category: "basics"
    },
    {
      id: 9,
      question: "What method is used to add an item to a list?",
      options: [
        "add()",
        "append()",
        "insert()",
        "push()"
      ],
      correct: 1,
      explanation: "The append() method adds an item to the end of a list.",
      category: "data-structures"
    },
    {
      id: 10,
      question: "What is the correct way to define a class in Python?",
      options: [
        "class MyClass:",
        "def class MyClass:",
        "create class MyClass:",
        "new class MyClass:"
      ],
      correct: 0,
      explanation: "Classes are defined using the 'class' keyword followed by the class name.",
      category: "classes"
    }
  ],
  html: [
    {
      id: 11,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language"
      ],
      correct: 0,
      explanation: "HTML stands for Hyper Text Markup Language.",
      category: "basics"
    },
    {
      id: 12,
      question: "Which tag is used for the largest heading?",
      options: [
        "<h6>",
        "<h1>",
        "<head>",
        "<header>"
      ],
      correct: 1,
      explanation: "<h1> is used for the largest heading, <h6> for the smallest.",
      category: "elements"
    },
    {
      id: 13,
      question: "What is the correct HTML for creating a hyperlink?",
      options: [
        "<a href='url'>link</a>",
        "<link>url</link>",
        "<url>link</url>",
        "<href>link</href>"
      ],
      correct: 0,
      explanation: "Hyperlinks are created using the <a> tag with the href attribute.",
      category: "links"
    },
    {
      id: 14,
      question: "Which attribute is used to specify an image source?",
      options: [
        "src",
        "source",
        "img",
        "image"
      ],
      correct: 0,
      explanation: "The 'src' attribute specifies the source URL of an image.",
      category: "images"
    },
    {
      id: 15,
      question: "What is the purpose of the <br> tag?",
      options: [
        "To create a bold text",
        "To create a line break",
        "To create a paragraph",
        "To create a heading"
      ],
      correct: 1,
      explanation: "The <br> tag creates a line break in the text.",
      category: "formatting"
    }
  ],
  css: [
    {
      id: 16,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      correct: 2,
      explanation: "CSS stands for Cascading Style Sheets.",
      category: "basics"
    },
    {
      id: 17,
      question: "Which property is used to change the background color?",
      options: [
        "color",
        "background-color",
        "bgcolor",
        "background"
      ],
      correct: 1,
      explanation: "The background-color property is used to set the background color.",
      category: "colors"
    },
    {
      id: 18,
      question: "How do you select an element with id 'demo'?",
      options: [
        ".demo",
        "#demo",
        "demo",
        "*demo"
      ],
      correct: 1,
      explanation: "The # symbol is used to select elements by their id.",
      category: "selectors"
    },
    {
      id: 19,
      question: "Which property is used to change the font of an element?",
      options: [
        "font-family",
        "font-style",
        "font-weight",
        "font-size"
      ],
      correct: 0,
      explanation: "The font-family property is used to specify the font of an element.",
      category: "typography"
    },
    {
      id: 20,
      question: "How do you make text bold?",
      options: [
        "font-weight: bold;",
        "font: bold;",
        "text-style: bold;",
        "style: bold;"
      ],
      correct: 0,
      explanation: "The font-weight property with value 'bold' makes text bold.",
      category: "typography"
    }
  ]
};

export default function CodeQuizPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const currentQuestions = QUIZ_QUESTIONS[selectedLanguage as keyof typeof QUIZ_QUESTIONS] || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Load quiz history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('code-quiz-history');
    if (saved) {
      setQuizHistory(JSON.parse(saved));
    }
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete
      const finalScore = selectedAnswer === currentQuestion.correct ? score + 1 : score;
      const percentage = Math.round((finalScore / currentQuestions.length) * 100);
      
      const quizResult = {
        id: Date.now(),
        language: selectedLanguage,
        score: finalScore,
        total: currentQuestions.length,
        percentage,
        date: new Date().toISOString()
      };

      const updatedHistory = [quizResult, ...quizHistory.slice(0, 9)];
      setQuizHistory(updatedHistory);
      localStorage.setItem('code-quiz-history', JSON.stringify(updatedHistory));
      
      setScore(finalScore);
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const startNewQuiz = (language: string) => {
    setSelectedLanguage(language);
    resetQuiz();
  };

  const getOptionClass = (optionIndex: number) => {
    if (!showResult) {
      return selectedAnswer === optionIndex 
        ? "bg-blue-100 border-blue-500" 
        : "bg-white border-gray-300 hover:bg-gray-50";
    }

    if (optionIndex === currentQuestion.correct) {
      return "bg-green-100 border-green-500";
    } else if (optionIndex === selectedAnswer && optionIndex !== currentQuestion.correct) {
      return "bg-red-100 border-red-500";
    }
    return "bg-white border-gray-300";
  };

  const getProgressPercentage = () => {
    return Math.round(((currentQuestionIndex + 1) / currentQuestions.length) * 100);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <img src="/javascript.svg" alt="Code Quiz" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Code Quiz</h1>
      </div>

      {/* Language Selection */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {Object.keys(QUIZ_QUESTIONS).map((lang) => (
            <Button
              key={lang}
              onClick={() => startNewQuiz(lang)}
              variant={selectedLanguage === lang ? "secondary" : "default"}
              className="capitalize"
            >
              {lang}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => setShowHistory(!showHistory)}
          variant="ghost"
          size="sm"
        >
          ðŸ“Š History
        </Button>
      </div>

      {/* Quiz History */}
      {showHistory && quizHistory.length > 0 && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz History</h3>
          <div className="space-y-2">
            {quizHistory.slice(0, 5).map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <div className="font-medium capitalize">{quiz.language}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(quiz.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{quiz.score}/{quiz.total}</div>
                  <div className="text-sm text-gray-500">{quiz.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Progress Bar */}
      {!quizComplete && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}

      {/* Quiz Complete */}
      {quizComplete ? (
        <Card className="p-8 text-center bg-green-50 border-green-200">
          <h2 className="text-3xl font-bold text-green-800 mb-4">ðŸŽ‰ Quiz Complete!</h2>
          <div className="text-6xl font-bold text-green-600 mb-4">
            {Math.round((score / currentQuestions.length) * 100)}%
          </div>
          <p className="text-lg text-green-700 mb-6">
            You got {score} out of {currentQuestions.length} questions correct!
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={resetQuiz} className="bg-green-600 hover:bg-green-700">
              Try Again
            </Button>
            <Button onClick={() => startNewQuiz(selectedLanguage)} variant="secondary">
              New Quiz
            </Button>
          </div>
        </Card>
      ) : (
        /* Current Question */
        currentQuestion && (
          <Card className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  currentQuestion.category === 'basics' ? 'bg-green-100 text-green-600' :
                  currentQuestion.category === 'advanced' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {currentQuestion.category}
                </span>
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                {currentQuestion.question}
              </h3>
            </div>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    getOptionClass(index)
                  } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>

            {/* Result Display */}
            {showResult && (
              <div className={`p-4 rounded-lg mb-4 ${
                selectedAnswer === currentQuestion.correct 
                  ? 'bg-green-100 border border-green-300' 
                  : 'bg-red-100 border border-red-300'
              }`}>
                <div className="font-semibold mb-2">
                  {selectedAnswer === currentQuestion.correct ? 'âœ… Correct!' : 'âŒ Incorrect!'}
                </div>
                <p className="text-sm text-gray-700">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center">
              {!showResult ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="bg-green-600 hover:bg-green-700">
                  {currentQuestionIndex < currentQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </div>
          </Card>
        )
      )}

      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
} 
