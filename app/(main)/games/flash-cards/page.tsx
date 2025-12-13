"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Flash card content for different programming topics
const FLASH_CARDS = {
  javascript: [
    {
      id: 1,
      front: "What is a variable?",
      back: "A container that stores data values. In JavaScript, you declare variables using 'let', 'const', or 'var'.",
      difficulty: "easy",
      category: "basics"
    },
    {
      id: 2,
      front: "What is the difference between '==' and '==='?",
      back: "'==' compares values with type coercion, while '===' compares both value and type (strict equality).",
      difficulty: "medium",
      category: "operators"
    },
    {
      id: 3,
      front: "What is a callback function?",
      back: "A function passed as an argument to another function, which is then invoked inside the outer function.",
      difficulty: "medium",
      category: "functions"
    },
    {
      id: 4,
      front: "What is closure?",
      back: "A function that has access to variables in its outer scope even after the outer function has returned.",
      difficulty: "hard",
      category: "advanced"
    },
    {
      id: 5,
      front: "What is the 'this' keyword?",
      back: "A reference to the object that is currently executing the code. Its value depends on how the function is called.",
      difficulty: "medium",
      category: "objects"
    }
  ],
  python: [
    {
      id: 6,
      front: "What is a list comprehension?",
      back: "A concise way to create lists based on existing sequences. Syntax: [expression for item in iterable]",
      difficulty: "medium",
      category: "data-structures"
    },
    {
      id: 7,
      front: "What is the difference between a list and a tuple?",
      back: "Lists are mutable (can be changed), tuples are immutable (cannot be changed after creation).",
      difficulty: "easy",
      category: "data-structures"
    },
    {
      id: 8,
      front: "What is a decorator?",
      back: "A function that takes another function and extends its behavior without explicitly modifying it.",
      difficulty: "hard",
      category: "advanced"
    },
    {
      id: 9,
      front: "What is the 'self' parameter?",
      back: "A reference to the instance of the class. It's automatically passed when calling methods on an object.",
      difficulty: "medium",
      category: "classes"
    },
    {
      id: 10,
      front: "What is a generator?",
      back: "A function that returns an iterator object. It uses 'yield' to return values one at a time.",
      difficulty: "hard",
      category: "advanced"
    }
  ],
  html: [
    {
      id: 11,
      front: "What is semantic HTML?",
      back: "HTML elements that clearly describe their meaning to both the browser and the developer (e.g., <header>, <nav>, <main>).",
      difficulty: "easy",
      category: "structure"
    },
    {
      id: 12,
      front: "What is the difference between <div> and <span>?",
      back: "<div> is a block-level element (starts on a new line), <span> is an inline element (doesn't start on a new line).",
      difficulty: "easy",
      category: "elements"
    },
    {
      id: 13,
      front: "What is the purpose of the 'alt' attribute?",
      back: "Provides alternative text for images, important for accessibility and when images fail to load.",
      difficulty: "easy",
      category: "accessibility"
    },
    {
      id: 14,
      front: "What is a form?",
      back: "An HTML element that collects user input and sends it to a server for processing.",
      difficulty: "medium",
      category: "forms"
    },
    {
      id: 15,
      front: "What is the DOCTYPE declaration?",
      back: "Tells the browser which version of HTML the document is using. Must be the first line of an HTML document.",
      difficulty: "easy",
      category: "basics"
    }
  ],
  css: [
    {
      id: 16,
      front: "What is the CSS box model?",
      back: "Every HTML element is treated as a box with content, padding, border, and margin areas.",
      difficulty: "medium",
      category: "layout"
    },
    {
      id: 17,
      front: "What is flexbox?",
      back: "A CSS layout model that allows flexible responsive layout without using float or positioning.",
      difficulty: "medium",
      category: "layout"
    },
    {
      id: 18,
      front: "What is the difference between 'margin' and 'padding'?",
      back: "Margin is the space outside the border, padding is the space inside the border around the content.",
      difficulty: "easy",
      category: "spacing"
    },
    {
      id: 19,
      front: "What is a CSS selector?",
      back: "A pattern used to select and style HTML elements. Examples: class (.), id (#), element (tag name).",
      difficulty: "easy",
      category: "selectors"
    },
    {
      id: 20,
      front: "What is the 'z-index' property?",
      back: "Controls the stacking order of positioned elements. Higher values appear on top of lower values.",
      difficulty: "medium",
      category: "positioning"
    }
  ]
};

export default function FlashCardsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<"learn" | "review">("learn");
  const [progress, setProgress] = useState<Record<number, { known: boolean; lastReviewed: number; streak: number }>>({});
  const [stats, setStats] = useState({
    totalCards: 0,
    knownCards: 0,
    unknownCards: 0,
    currentStreak: 0,
    bestStreak: 0
  });
  const [showStats, setShowStats] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentCards = FLASH_CARDS[selectedLanguage as keyof typeof FLASH_CARDS] || [];
  const currentCard = currentCards[currentCardIndex];

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('flash-cards-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    
    const savedStats = localStorage.getItem('flash-cards-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Update stats when progress changes
  useEffect(() => {
    const knownCards = Object.values(progress).filter(p => p.known).length;
    const unknownCards = Object.values(progress).filter(p => !p.known).length;
    const currentStreak = Math.max(...Object.values(progress).map(p => p.streak), 0);
    const bestStreak = Math.max(currentStreak, stats.bestStreak);

    const newStats = {
      totalCards: Object.keys(progress).length,
      knownCards,
      unknownCards,
      currentStreak,
      bestStreak
    };

    setStats(newStats);
    localStorage.setItem('flash-cards-stats', JSON.stringify(newStats));
  }, [progress]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const markCard = (known: boolean) => {
    if (!currentCard) return;

    const now = Date.now();
    const currentProgress = progress[currentCard.id] || { known: false, lastReviewed: 0, streak: 0 };
    
    const newProgress = {
      ...progress,
      [currentCard.id]: {
        known,
        lastReviewed: now,
        streak: known ? currentProgress.streak + 1 : 0
      }
    };

    setProgress(newProgress);
    localStorage.setItem('flash-cards-progress', JSON.stringify(newProgress));
    
    // Move to next card
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // End of deck
      setCurrentCardIndex(0);
    }
  };

  const previousCard = () => {
    setIsFlipped(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(currentCards.length - 1);
    }
  };

  const resetProgress = () => {
    setProgress({});
    setStats({
      totalCards: 0,
      knownCards: 0,
      unknownCards: 0,
      currentStreak: 0,
      bestStreak: 0
    });
    localStorage.removeItem('flash-cards-progress');
    localStorage.removeItem('flash-cards-stats');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-600 bg-green-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getProgressPercentage = () => {
    if (currentCards.length === 0) return 0;
    return Math.round((currentCardIndex + 1) / currentCards.length * 100);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <img src="/learn.svg" alt="Flash Cards" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Flash Cards</h1>
      </div>

      {/* Language Selection */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {Object.keys(FLASH_CARDS).map((lang) => (
            <Button
              key={lang}
              onClick={() => {
                setSelectedLanguage(lang);
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              variant={selectedLanguage === lang ? "secondary" : "default"}
              className="capitalize"
            >
              {lang}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowStats(!showStats)}
            variant="ghost"
            size="sm"
          >
            📊 Stats
          </Button>
          <Button
            onClick={resetProgress}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            🔄 Reset
          </Button>
        </div>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Your Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalCards}</div>
              <div className="text-sm text-blue-500">Total Studied</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.knownCards}</div>
              <div className="text-sm text-green-500">Known</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.unknownCards}</div>
              <div className="text-sm text-red-500">Unknown</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.currentStreak}</div>
              <div className="text-sm text-purple-500">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.bestStreak}</div>
              <div className="text-sm text-orange-500">Best Streak</div>
            </div>
          </div>
        </Card>
      )}

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Card {currentCardIndex + 1} of {currentCards.length}</span>
          <span>{getProgressPercentage()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Flash Card */}
      {currentCard && (
        <div className="flex justify-center">
          <div 
            className={`flip-card w-full max-w-2xl h-64 ${isFlipped ? 'flipped' : ''}`}
            onClick={flipCard}
          >
            <div className="flip-card-inner">
              {/* Front of card */}
              <div className="flip-card-front bg-white border-2 border-gray-200 rounded-lg shadow-lg p-8 flex items-center justify-center text-center">
                <div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getDifficultyColor(currentCard.difficulty)}`}>
                    {currentCard.difficulty}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                    {currentCard.front}
                  </h3>
                  <p className="text-sm text-gray-500 mt-4">Click to flip</p>
                </div>
              </div>
              
              {/* Back of card */}
              <div className="flip-card-back bg-white border-2 border-gray-200 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center">
                <div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getDifficultyColor(currentCard.difficulty)}`}>
                    {currentCard.difficulty}
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {currentCard.back}
                  </p>
                  <p className="text-sm text-gray-500 mt-4">Click to flip back</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation and Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={previousCard} variant="secondary">
          ← Previous
        </Button>
        
        {isFlipped && (
          <div className="flex gap-2">
            <Button 
              onClick={() => markCard(false)}
              variant="danger"
              className="bg-red-600 hover:bg-red-700"
            >
              ❌ Don&apos;t Know
            </Button>
            <Button 
              onClick={() => markCard(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              ✅ Know It
            </Button>
          </div>
        )}
        
        <Button onClick={nextCard} variant="secondary">
          Next →
        </Button>
      </div>

      {/* Card Info */}
      {currentCard && (
        <div className="text-center text-sm text-gray-500">
          <span className={`inline-block px-2 py-1 rounded ${getDifficultyColor(currentCard.difficulty)}`}>
            {currentCard.difficulty}
          </span>
          <span className="mx-2">•</span>
          <span className="capitalize">{currentCard.category}</span>
          {progress[currentCard.id] && (
            <>
              <span className="mx-2">•</span>
              <span className={progress[currentCard.id].known ? 'text-green-600' : 'text-red-600'}>
                {progress[currentCard.id].known ? 'Known' : 'Unknown'}
              </span>
            </>
          )}
        </div>
      )}

      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
}
 
