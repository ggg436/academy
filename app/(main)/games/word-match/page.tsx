"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Word matching pairs for different programming topics
const WORD_PAIRS = {
  javascript: [
    { term: "Variable", definition: "A container that stores data values" },
    { term: "Function", definition: "A reusable block of code that performs a specific task" },
    { term: "Array", definition: "An ordered collection of values" },
    { term: "Object", definition: "A collection of key-value pairs" },
    { term: "Loop", definition: "A way to repeat code multiple times" },
    { term: "Conditional", definition: "A statement that executes code based on a condition" },
    { term: "Scope", definition: "The accessibility of variables in different parts of code" },
    { term: "Callback", definition: "A function passed as an argument to another function" }
  ],
  python: [
    { term: "List", definition: "An ordered, mutable collection of items" },
    { term: "Tuple", definition: "An ordered, immutable collection of items" },
    { term: "Dictionary", definition: "A collection of key-value pairs" },
    { term: "Set", definition: "An unordered collection of unique items" },
    { term: "Class", definition: "A blueprint for creating objects" },
    { term: "Method", definition: "A function that belongs to a class" },
    { term: "Module", definition: "A file containing Python code" },
    { term: "Package", definition: "A collection of modules" }
  ],
  html: [
    { term: "Tag", definition: "HTML elements that define the structure of a webpage" },
    { term: "Attribute", definition: "Additional information about HTML elements" },
    { term: "Element", definition: "A complete HTML tag with opening and closing tags" },
    { term: "Semantic", definition: "HTML that clearly describes its meaning" },
    { term: "Form", definition: "An element that collects user input" },
    { term: "Link", definition: "A connection between web pages" },
    { term: "Image", definition: "A visual element displayed on a webpage" },
    { term: "Table", definition: "A structured way to display data in rows and columns" }
  ],
  css: [
    { term: "Selector", definition: "A pattern used to select and style HTML elements" },
    { term: "Property", definition: "A characteristic of an element that can be styled" },
    { term: "Value", definition: "The specific setting for a CSS property" },
    { term: "Box Model", definition: "The layout model that includes content, padding, border, and margin" },
    { term: "Flexbox", definition: "A CSS layout model for flexible responsive layouts" },
    { term: "Grid", definition: "A CSS layout system for two-dimensional layouts" },
    { term: "Media Query", definition: "A way to apply styles based on device characteristics" },
    { term: "Pseudo-class", definition: "A keyword that specifies a special state of an element" }
  ]
};

export default function WordMatchPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameHistory, setGameHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const currentPairs = WORD_PAIRS[selectedLanguage as keyof typeof WORD_PAIRS] || [];
  const currentPair = currentPairs[currentPairIndex];

  // Load game history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('word-match-history');
    if (saved) {
      setGameHistory(JSON.parse(saved));
    }
  }, []);

  const handleShowDefinition = () => {
    setShowDefinition(true);
  };

  const handleNextPair = () => {
    if (currentPairIndex < currentPairs.length - 1) {
      setCurrentPairIndex(currentPairIndex + 1);
      setShowDefinition(false);
    } else {
      // Game complete
      const gameResult = {
        id: Date.now(),
        language: selectedLanguage,
        score: score + 1, // +1 for the last pair
        total: currentPairs.length,
        percentage: Math.round(((score + 1) / currentPairs.length) * 100),
        date: new Date().toISOString()
      };

      const updatedHistory = [gameResult, ...gameHistory.slice(0, 9)];
      setGameHistory(updatedHistory);
      localStorage.setItem('word-match-history', JSON.stringify(updatedHistory));
      
      setScore(score + 1);
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentPairIndex(0);
    setShowDefinition(false);
    setScore(0);
    setGameComplete(false);
  };

  const startNewGame = (language: string) => {
    setSelectedLanguage(language);
    resetGame();
  };

  const getProgressPercentage = () => {
    return Math.round(((currentPairIndex + 1) / currentPairs.length) * 100);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <img src="/html.svg" alt="Word Match" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Word Match</h1>
      </div>

      {/* Language Selection */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {Object.keys(WORD_PAIRS).map((lang) => (
            <Button
              key={lang}
              onClick={() => startNewGame(lang)}
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
          📊 History
        </Button>
      </div>

      {/* Game History */}
      {showHistory && gameHistory.length > 0 && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Game History</h3>
          <div className="space-y-2">
            {gameHistory.slice(0, 5).map((game) => (
              <div key={game.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <div className="font-medium capitalize">{game.language}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(game.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{game.score}/{game.total}</div>
                  <div className="text-sm text-gray-500">{game.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Progress Bar */}
      {!gameComplete && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Pair {currentPairIndex + 1} of {currentPairs.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}

      {/* Game Complete */}
      {gameComplete ? (
        <Card className="p-8 text-center bg-purple-50 border-purple-200">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">🎉 Game Complete!</h2>
          <div className="text-6xl font-bold text-purple-600 mb-4">
            {Math.round((score / currentPairs.length) * 100)}%
          </div>
          <p className="text-lg text-purple-700 mb-6">
            You matched {score} out of {currentPairs.length} word pairs!
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={resetGame} className="bg-purple-600 hover:bg-purple-700">
              Play Again
            </Button>
            <Button onClick={() => startNewGame(selectedLanguage)} variant="secondary">
              New Game
            </Button>
          </div>
        </Card>
      ) : (
        /* Current Word Pair */
        currentPair && (
          <Card className="p-8 text-center">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {currentPair.term}
              </h3>
              <p className="text-lg text-gray-600">
                What does this programming term mean?
              </p>
            </div>

            {showDefinition ? (
              <div className="space-y-6">
                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                  <h4 className="text-xl font-semibold text-green-800 mb-2">Definition:</h4>
                  <p className="text-lg text-green-700">
                    {currentPair.definition}
                  </p>
                </div>
                <Button onClick={handleNextPair} className="bg-green-600 hover:bg-green-700">
                  Next Word
                </Button>
              </div>
            ) : (
              <Button onClick={handleShowDefinition} className="bg-purple-600 hover:bg-purple-700">
                Show Definition
              </Button>
            )}
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
