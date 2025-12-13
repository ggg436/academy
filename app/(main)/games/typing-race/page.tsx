"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SoundEffects } from "@/lib/sound-effects";

// Code snippets for different programming languages
const CODE_SNIPPETS = {
  javascript: [
    {
      title: "Function Declaration",
      code: `function greet(name) {
  return "Hello, " + name + "!";
}`,
      language: "javascript"
    },
    {
      title: "Array Methods",
      code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((a, b) => a + b, 0);`,
      language: "javascript"
    },
    {
      title: "Async Function",
      code: `async function fetchData() {
  try {
    const response = await fetch('/api/data');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}`,
      language: "javascript"
    }
  ],
  python: [
    {
      title: "Function Definition",
      code: `def greet(name):
    return f"Hello, {name}!"`,
      language: "python"
    },
    {
      title: "List Comprehension",
      code: `numbers = [1, 2, 3, 4, 5]
squares = [n**2 for n in numbers]
evens = [n for n in numbers if n % 2 == 0]`,
      language: "python"
    },
    {
      title: "Class Definition",
      code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hi, I'm {self.name}"`,
      language: "python"
    }
  ],
  html: [
    {
      title: "Basic HTML Structure",
      code: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>Welcome to my website!</p>
</body>
</html>`,
      language: "html"
    },
    {
      title: "Form Elements",
      code: `<form action="/submit" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <button type="submit">Submit</button>
</form>`,
      language: "html"
    }
  ],
  css: [
    {
      title: "Basic Styling",
      code: `.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
}`,
      language: "css"
    },
    {
      title: "Flexbox Layout",
      code: `.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}`,
      language: "css"
    }
  ]
};

export default function TypingRacePage() {
  const [currentSnippet, setCurrentSnippet] = useState<any>(null);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    errors: 0,
    totalCharacters: 0
  });
  const [gameHistory, setGameHistory] = useState<any[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load game history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('typing-race-history');
    if (saved) {
      setGameHistory(JSON.parse(saved));
    }
    
    // Initialize sound effects
    SoundEffects.init();
    
    // Load sound preference
    const soundPref = localStorage.getItem('typing-race-sound');
    if (soundPref !== null) {
      setSoundEnabled(soundPref === 'true');
      if (soundPref === 'true') {
        SoundEffects.enable();
      } else {
        SoundEffects.disable();
      }
    }
  }, []);

  // Select a random snippet when language changes
  useEffect(() => {
    selectNewSnippet();
  }, [selectedLanguage]);

  const selectNewSnippet = () => {
    const snippets = CODE_SNIPPETS[selectedLanguage as keyof typeof CODE_SNIPPETS];
    const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
    setCurrentSnippet(randomSnippet);
    resetGame();
  };

  const resetGame = () => {
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setIsTyping(false);
    setIsComplete(false);
    setStats({
      wpm: 0,
      accuracy: 100,
      errors: 0,
      totalCharacters: 0
    });
  };

  const startGame = () => {
    setStartTime(Date.now());
    setIsTyping(true);
    inputRef.current?.focus();
  };

  const calculateStats = () => {
    if (!startTime || !endTime || !currentSnippet) return;

    const timeElapsed = (endTime - startTime) / 1000 / 60; // in minutes
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / timeElapsed);

    // Calculate accuracy
    let errors = 0;
    const targetText = currentSnippet.code;
    const minLength = Math.min(userInput.length, targetText.length);
    
    for (let i = 0; i < minLength; i++) {
      if (userInput[i] !== targetText[i]) {
        errors++;
      }
    }
    
    const accuracy = Math.max(0, Math.round(((minLength - errors) / minLength) * 100));

    const newStats = {
      wpm,
      accuracy,
      errors,
      totalCharacters: userInput.length
    };

    setStats(newStats);

    // Save to history
    const gameResult = {
      id: Date.now(),
      language: selectedLanguage,
      snippet: currentSnippet.title,
      wpm,
      accuracy,
      errors,
      date: new Date().toISOString(),
      timeElapsed: Math.round((endTime - startTime) / 1000)
    };

    const updatedHistory = [gameResult, ...gameHistory.slice(0, 9)]; // Keep last 10 games
    setGameHistory(updatedHistory);
    localStorage.setItem('typing-race-history', JSON.stringify(updatedHistory));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (!isTyping && value.length > 0) {
      startGame();
    }

    // Check if typing is complete
    if (value === currentSnippet?.code) {
      setEndTime(Date.now());
      setIsComplete(true);
      setIsTyping(false);
      calculateStats();
      SoundEffects.playComplete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      setUserInput(prev => prev.substring(0, start) + '  ' + prev.substring(end));
      
      // Set cursor position after tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const toggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    localStorage.setItem('typing-race-sound', newSoundState.toString());
    
    if (newSoundState) {
      SoundEffects.enable();
    } else {
      SoundEffects.disable();
    }
  };

  const getCharacterClass = (index: number) => {
    if (!currentSnippet) return '';
    
    if (index >= userInput.length) return '';
    if (index >= currentSnippet.code.length) return 'bg-red-200 text-red-800';
    
    const isCorrect = userInput[index] === currentSnippet.code[index];
    
    // Play sound effects for character feedback
    if (index === userInput.length - 1 && userInput.length > 0) {
      if (isCorrect) {
        SoundEffects.playCorrect();
      } else {
        SoundEffects.playError();
      }
    }
    
    return isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/react.svg" alt="Typing Race" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Typing Race</h1>
        </div>
        
        {/* User Coins Display */}
        <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg border border-yellow-300">
          <span className="text-yellow-600 font-semibold">🪙</span>
          <span className="text-yellow-800 font-bold text-lg">1000</span>
          <span className="text-yellow-600 text-sm">coins</span>
        </div>
      </div>

      {/* Language Selection */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {Object.keys(CODE_SNIPPETS).map((lang) => (
            <Button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              variant={selectedLanguage === lang ? "secondary" : "default"}
              className="capitalize"
            >
              {lang}
            </Button>
          ))}
        </div>
        <Button
          onClick={toggleSound}
          variant="ghost"
          size="sm"
          className="text-gray-600"
        >
          {soundEnabled ? '🔊' : '🔇'} Sound
        </Button>
      </div>

      {/* Game Stats */}
      {isTyping && (
        <div className="grid grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((Date.now() - (startTime || 0)) / 1000)}s
            </div>
            <div className="text-sm text-blue-500">Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {userInput.trim().split(/\s+/).length}
            </div>
            <div className="text-sm text-green-500">Words</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {userInput.length}
            </div>
            <div className="text-sm text-purple-500">Characters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.wpm}
            </div>
            <div className="text-sm text-orange-500">WPM</div>
          </div>
        </div>
      )}

      {/* Code Snippet */}
      {currentSnippet && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{currentSnippet.title}</h3>
            <Button onClick={selectNewSnippet} variant="secondary" size="sm">
              New Snippet
            </Button>
          </div>
          
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              {currentSnippet.code.split('').map((char: string, index: number) => (
                <span key={index} className={getCharacterClass(index)}>
                  {char}
                </span>
              ))}
            </pre>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Type the code above:</label>
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isComplete}
          className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:border-green-500 focus:outline-none"
          placeholder="Start typing here..."
        />
      </div>

      {/* Results */}
      {isComplete && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">🎉 Race Complete!</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.wpm}</div>
              <div className="text-sm text-green-500">WPM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.accuracy}%</div>
              <div className="text-sm text-blue-500">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.errors}</div>
              <div className="text-sm text-red-500">Errors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.totalCharacters}</div>
              <div className="text-sm text-purple-500">Characters</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={selectNewSnippet} className="bg-green-600 hover:bg-green-700">
              Try Another Snippet
            </Button>
            <Button onClick={() => setSelectedLanguage(selectedLanguage)} variant="secondary">
              Same Language
            </Button>
          </div>
        </div>
      )}

      {/* Game History */}
      {gameHistory.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Games</h3>
          <div className="space-y-2">
            {gameHistory.slice(0, 5).map((game) => (
              <div key={game.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{game.snippet}</div>
                  <div className="text-sm text-gray-500 capitalize">{game.language}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{game.wpm} WPM</div>
                  <div className="text-sm text-gray-500">{game.accuracy}% accuracy</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
} 
