"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Debug challenges with bugs to fix
const DEBUG_CHALLENGES = [
  {
    id: 1,
    title: "The Infinite Loop",
    description: "Fix the infinite loop that's causing the program to crash!",
    language: "javascript",
    buggyCode: `// This function should count from 1 to 5
function countToFive() {
  let i = 1;
  while (i <= 5) {
    console.log(i);
    // BUG: Missing increment!
  }
}

countToFive();`,
    fixedCode: `// This function should count from 1 to 5
function countToFive() {
  let i = 1;
  while (i <= 5) {
    console.log(i);
    i++; // FIXED: Added increment
  }
}

countToFive();`,
    bugType: "infinite-loop",
    difficulty: "easy",
    hints: [
      "The loop condition is correct",
      "Something is missing inside the loop",
      "The variable 'i' never changes"
    ]
  },
  {
    id: 2,
    title: "The Undefined Variable",
    description: "Find and fix the undefined variable error!",
    language: "javascript",
    buggyCode: `// Calculate the sum of numbers
function calculateSum(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

let numbers = [1, 2, 3, 4, 5];
console.log("Sum:", calculateSum(numbers));
console.log("Average:", total / numbers.length); // BUG: 'total' is not defined here`,
    fixedCode: `// Calculate the sum of numbers
function calculateSum(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

let numbers = [1, 2, 3, 4, 5];
let sum = calculateSum(numbers); // FIXED: Store the result
console.log("Sum:", sum);
console.log("Average:", sum / numbers.length);`,
    bugType: "undefined-variable",
    difficulty: "easy",
    hints: [
      "The function returns a value",
      "You need to store the function result",
      "The variable 'total' is only available inside the function"
    ]
  },
  {
    id: 3,
    title: "The Array Index Error",
    description: "Fix the array index out of bounds error!",
    language: "javascript",
    buggyCode: `// Find the maximum number in an array
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i <= arr.length; i++) { // BUG: Should be < not <=
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

let numbers = [3, 7, 2, 9, 1];
console.log("Maximum:", findMax(numbers));`,
    fixedCode: `// Find the maximum number in an array
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) { // FIXED: Changed <= to <
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

let numbers = [3, 7, 2, 9, 1];
console.log("Maximum:", findMax(numbers));`,
    bugType: "array-index",
    difficulty: "medium",
    hints: [
      "Array indices start from 0",
      "The last valid index is length - 1",
      "Check the loop condition carefully"
    ]
  },
  {
    id: 4,
    title: "The Logic Error",
    description: "Fix the logical error in the palindrome checker!",
    language: "javascript",
    buggyCode: `// Check if a string is a palindrome
function isPalindrome(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return str === reversed; // This looks correct...
}

console.log("racecar:", isPalindrome("racecar"));
console.log("hello:", isPalindrome("hello"));
console.log("anna:", isPalindrome("anna")); // BUG: Should return true but returns false`,
    fixedCode: `// Check if a string is a palindrome
function isPalindrome(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return str.toLowerCase() === reversed.toLowerCase(); // FIXED: Added case-insensitive comparison
}

console.log("racecar:", isPalindrome("racecar"));
console.log("hello:", isPalindrome("hello"));
console.log("anna:", isPalindrome("anna"));`,
    bugType: "logic-error",
    difficulty: "medium",
    hints: [
      "The logic looks correct at first glance",
      "Think about case sensitivity",
      "What if the input has mixed cases?"
    ]
  },
  {
    id: 5,
    title: "The Scope Issue",
    description: "Fix the variable scope problem!",
    language: "javascript",
    buggyCode: `// Create a counter function
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

let counter = createCounter();
console.log(counter()); // Should print 1
console.log(counter()); // Should print 2
console.log("Current count:", count); // BUG: 'count' is not accessible here`,
    fixedCode: `// Create a counter function
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

let counter = createCounter();
console.log(counter()); // Should print 1
console.log(counter()); // Should print 2
// FIXED: Removed the line that tries to access 'count' outside its scope
console.log("Counter works correctly!");`,
    bugType: "scope-error",
    difficulty: "hard",
    hints: [
      "The variable 'count' is defined inside the function",
      "It's not accessible from outside the function",
      "This is a scope issue"
    ]
  }
];

export default function DebugHeroPage() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [debugProgress, setDebugProgress] = useState<Record<number, boolean>>({});
  const [showProgress, setShowProgress] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [bugFound, setBugFound] = useState(false);

  const challenge = DEBUG_CHALLENGES[currentChallenge];

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('debug-hero-progress');
    if (saved) {
      setDebugProgress(JSON.parse(saved));
    }
  }, []);

  // Set initial code when challenge changes
  useEffect(() => {
    setUserCode(challenge.buggyCode);
    setShowHint(false);
    setHintIndex(0);
    setShowSolution(false);
    setCodeOutput("");
    setBugFound(false);
  }, [currentChallenge]);

  const runCode = () => {
    setIsRunning(true);
    setCodeOutput("");
    
    try {
      // Simple code execution simulation
      const code = userCode;
      let output = "";
      
      // Capture console.log outputs
      const originalLog = console.log;
      console.log = (...args) => {
        output += args.join(' ') + '\n';
      };
      
      // Execute the code
      eval(code);
      
      // Restore console.log
      console.log = originalLog;
      
      setCodeOutput(output);
    } catch (error) {
      setCodeOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const checkBug = () => {
    // Check if the bug is still present by comparing with fixed code
    const hasBug = userCode.includes(challenge.buggyCode.split('// BUG:')[0].trim());
    setBugFound(hasBug);
    
    if (hasBug) {
      alert("🐛 Bug still present! Keep debugging!");
    } else {
      alert("✅ Bug fixed! Great debugging work!");
    }
  };

  const checkSolution = () => {
    const isCorrect = userCode.trim() === challenge.fixedCode.trim();
    
    if (isCorrect) {
      // Mark challenge as completed
      const newProgress = { ...debugProgress, [challenge.id]: true };
      setDebugProgress(newProgress);
      localStorage.setItem('debug-hero-progress', JSON.stringify(newProgress));
      
      alert(`🎉 ${challenge.title} completed! You're becoming a Debug Hero!`);
    } else {
      alert("❌ Not quite right! The code should match the fixed version exactly.");
    }
  };

  const showNextHint = () => {
    if (hintIndex < challenge.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
    setShowHint(true);
  };

  const nextChallenge = () => {
    if (currentChallenge < DEBUG_CHALLENGES.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
    }
  };

  const previousChallenge = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(currentChallenge - 1);
    }
  };

  const resetProgress = () => {
    setDebugProgress({});
    localStorage.removeItem('debug-hero-progress');
    setCurrentChallenge(0);
  };

  const getChallengeStatus = (challengeId: number) => {
    if (debugProgress[challengeId]) return "completed";
    if (challengeId === 1 || debugProgress[challengeId - 1]) return "unlocked";
    return "locked";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-600 bg-green-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <img src="/javascript.svg" alt="Debug Hero" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Debug Hero</h1>
      </div>

      {/* Progress Overview */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2">
          {DEBUG_CHALLENGES.map((chall, index) => (
            <Button
              key={chall.id}
              onClick={() => {
                if (getChallengeStatus(chall.id) !== "locked") {
                  setCurrentChallenge(index);
                }
              }}
              variant={
                getChallengeStatus(chall.id) === "completed" ? "default" :
                getChallengeStatus(chall.id) === "unlocked" ? "secondary" : "ghost"
              }
              size="sm"
              disabled={getChallengeStatus(chall.id) === "locked"}
              className="relative"
            >
              {getChallengeStatus(chall.id) === "completed" && "✅ "}
              Bug {chall.id}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowProgress(!showProgress)}
            variant="ghost"
            size="sm"
          >
            📊 Progress
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

      {/* Progress Panel */}
      {showProgress && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Debug Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEBUG_CHALLENGES.map((chall) => (
              <div key={chall.id} className={`p-4 rounded-lg border-2 ${
                getChallengeStatus(chall.id) === "completed" ? "bg-green-100 border-green-300" :
                getChallengeStatus(chall.id) === "unlocked" ? "bg-yellow-100 border-yellow-300" :
                "bg-gray-100 border-gray-300"
              }`}>
                <div className="font-semibold">{chall.title}</div>
                <div className="text-sm text-gray-600 mt-1">{chall.bugType}</div>
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${getDifficultyColor(chall.difficulty)}`}>
                  {chall.difficulty}
                </div>
                <div className="text-xs mt-2">
                  {getChallengeStatus(chall.id) === "completed" ? "✅ Fixed" :
                   getChallengeStatus(chall.id) === "unlocked" ? "🔓 Unlocked" : "🔒 Locked"}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Current Challenge */}
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{challenge.title}</h2>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                {challenge.bugType}
              </span>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg mb-4 border border-red-200">
            <p className="text-red-700 leading-relaxed">{challenge.description}</p>
          </div>
        </div>

        {/* Code Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Fix the Buggy Code:</h3>
            <div className="flex gap-2">
              <Button
                onClick={runCode}
                disabled={isRunning}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                {isRunning ? "Running..." : "▶️ Run Code"}
              </Button>
              <Button
                onClick={checkBug}
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                🐛 Check for Bugs
              </Button>
              <Button
                onClick={checkSolution}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                ✅ Check Solution
              </Button>
            </div>
          </div>
          
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-green-400 border border-gray-300 rounded-lg resize-none"
            placeholder="Fix the buggy code here..."
          />
        </div>

        {/* Output */}
        {codeOutput && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Output:</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
              {codeOutput}
            </div>
          </div>
        )}

        {/* Bug Status */}
        {bugFound && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐛</span>
              <span className="font-semibold text-red-800">Bug Still Present!</span>
            </div>
            <p className="text-red-700 mt-2">Keep debugging! The bug hasn&apos;t been fixed yet.</p>
          </div>
        )}

        {/* Hints and Help */}
        <div className="mt-6 flex gap-4">
          <Button
            onClick={showNextHint}
            variant="secondary"
            size="sm"
          >
            💡 Hint ({hintIndex + 1}/{challenge.hints.length})
          </Button>
          
          <Button
            onClick={() => setShowSolution(!showSolution)}
            variant="ghost"
            size="sm"
          >
            {showSolution ? "Hide" : "Show"} Fixed Code
          </Button>
        </div>

        {showHint && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Hint:</h4>
            <p className="text-blue-700">{challenge.hints[hintIndex]}</p>
          </div>
        )}

        {showSolution && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Fixed Code:</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {challenge.fixedCode}
            </pre>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={previousChallenge}
          disabled={currentChallenge === 0}
          variant="secondary"
        >
          ← Previous Bug
        </Button>
        
        <Button
          onClick={nextChallenge}
          disabled={currentChallenge === DEBUG_CHALLENGES.length - 1 || !debugProgress[challenge.id]}
          variant="secondary"
        >
          Next Bug →
        </Button>
      </div>

      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
} 