"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { Card } from "@/components/ui/card";

// Adventure story and coding challenges
const ADVENTURE_LEVELS = [
  {
    id: 1,
    title: "The Broken Bridge",
    story: "You arrive at a village where the bridge has collapsed! The villagers need you to fix it by creating a loop to place the missing planks.",
    challenge: {
      type: "loop",
      language: "javascript",
      problem: "Create a loop to place 5 planks on the bridge",
      code: `// Fix the bridge by placing planks
let planks = 0;
// TODO: Add a loop to place 5 planks
console.log("Plank placed!");`,
      solution: `// Fix the bridge by placing planks
let planks = 0;
for (let i = 0; i < 5; i++) {
  planks++;
  console.log("Plank placed!");
}`,
      hints: [
        "Use a for loop to repeat the action",
        "You need to place exactly 5 planks",
        "Increment the planks variable inside the loop"
      ],
      testCases: [
        { input: "", expected: "Plank placed!\nPlank placed!\nPlank placed!\nPlank placed!\nPlank placed!" }
      ]
    },
    reward: "Bridge fixed! You can now cross to the next village.",
    unlocked: true
  },
  {
    id: 2,
    title: "The Bug Invasion",
    story: "A swarm of bugs has invaded the code forest! You must write a function to defeat them by counting and eliminating each bug.",
    challenge: {
      type: "function",
      language: "javascript",
      problem: "Create a function that counts and eliminates bugs from an array",
      code: `// Defeat the bugs!
function defeatBugs(bugs) {
  // TODO: Count the bugs and return the count
  // Also log "Bug defeated!" for each bug
}

let bugSwarm = ["bug1", "bug2", "bug3", "bug4"];
console.log("Total bugs defeated:", defeatBugs(bugSwarm));`,
      solution: `// Defeat the bugs!
function defeatBugs(bugs) {
  let count = 0;
  for (let bug of bugs) {
    console.log("Bug defeated!");
    count++;
  }
  return count;
}

let bugSwarm = ["bug1", "bug2", "bug3", "bug4"];
console.log("Total bugs defeated:", defeatBugs(bugSwarm));`,
      hints: [
        "Use a for...of loop to iterate through the bugs array",
        "Count each bug and log a message",
        "Return the total count"
      ],
      testCases: [
        { input: '["bug1", "bug2", "bug3", "bug4"]', expected: "Bug defeated!\nBug defeated!\nBug defeated!\nBug defeated!\nTotal bugs defeated: 4" }
      ]
    },
    reward: "Bugs defeated! The code forest is safe again.",
    unlocked: false
  },
  {
    id: 3,
    title: "The Algorithm Maze",
    story: "You're trapped in a maze! The only way out is to write a sorting algorithm to arrange the magical keys in the correct order.",
    challenge: {
      type: "algorithm",
      language: "javascript",
      problem: "Sort the magical keys to escape the maze",
      code: `// Escape the maze by sorting keys
let keys = [5, 2, 8, 1, 9];
// TODO: Sort the keys array in ascending order
console.log("Sorted keys:", keys);`,
      solution: `// Escape the maze by sorting keys
let keys = [5, 2, 8, 1, 9];
keys.sort((a, b) => a - b);
console.log("Sorted keys:", keys);`,
      hints: [
        "Use the sort() method on the array",
        "You need to provide a comparison function",
        "The comparison should return a - b for ascending order"
      ],
      testCases: [
        { input: "[5, 2, 8, 1, 9]", expected: "Sorted keys: [1, 2, 5, 8, 9]" }
      ]
    },
    reward: "Maze escaped! You've mastered the sorting algorithm.",
    unlocked: false
  },
  {
    id: 4,
    title: "The Recursive Tower",
    story: "A mysterious tower blocks your path! You must solve the Tower of Hanoi puzzle using recursion to unlock the ancient door.",
    challenge: {
      type: "recursion",
      language: "javascript",
      problem: "Implement the Tower of Hanoi algorithm using recursion",
      code: `// Solve the Tower of Hanoi puzzle
function towerOfHanoi(n, source, auxiliary, target) {
  // TODO: Implement the recursive solution
  // Move n disks from source to target using auxiliary
}

console.log("Moving 3 disks from A to C:");
towerOfHanoi(3, 'A', 'B', 'C');`,
      solution: `// Solve the Tower of Hanoi puzzle
function towerOfHanoi(n, source, auxiliary, target) {
  if (n === 1) {
    console.log(\`Move disk 1 from \${source} to \${target}\`);
    return;
  }
  towerOfHanoi(n - 1, source, target, auxiliary);
  console.log(\`Move disk \${n} from \${source} to \${target}\`);
  towerOfHanoi(n - 1, auxiliary, source, target);
}

console.log("Moving 3 disks from A to C:");
towerOfHanoi(3, 'A', 'B', 'C');`,
      hints: [
        "Use recursion with a base case (n === 1)",
        "Move n-1 disks to auxiliary tower first",
        "Move the largest disk to target",
        "Move n-1 disks from auxiliary to target"
      ],
      testCases: [
        { input: "3", expected: "Moving 3 disks from A to C:\nMove disk 1 from A to C\nMove disk 2 from A to B\nMove disk 1 from C to B\nMove disk 3 from A to C\nMove disk 1 from B to A\nMove disk 2 from B to C\nMove disk 1 from A to C" }
      ]
    },
    reward: "Tower solved! The ancient door reveals a treasure trove of knowledge.",
    unlocked: false
  },
  {
    id: 5,
    title: "The Final Challenge",
    story: "You've reached the final boss - a corrupted data structure! You must implement a binary search tree to restore order to the digital realm.",
    challenge: {
      type: "data-structure",
      language: "javascript",
      problem: "Create a simple binary search tree and insert values",
      code: `// Create a Binary Search Tree
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    // TODO: Implement insert method
  }
  
  display() {
    // TODO: Display the tree structure
  }
}

let tree = new BST();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.display();`,
      solution: `// Create a Binary Search Tree
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = new Node(value);
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new Node(value);
          break;
        }
        current = current.right;
      }
    }
  }
  
  display() {
    console.log("BST Structure:");
    this.displayNode(this.root, 0);
  }
  
  displayNode(node, level) {
    if (!node) return;
    console.log("  ".repeat(level) + "└─ " + node.value);
    this.displayNode(node.left, level + 1);
    this.displayNode(node.right, level + 1);
  }
}

let tree = new BST();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.display();`,
      hints: [
        "Start with the root node",
        "Compare values to decide left or right",
        "Create new nodes when reaching null",
        "Use recursion for display"
      ],
      testCases: [
        { input: "10,5,15", expected: "BST Structure:\n└─ 10\n  └─ 5\n  └─ 15" }
      ]
    },
    reward: "Victory! You've mastered data structures and saved the digital realm!",
    unlocked: false
  }
];

export default function CodeQuestPage() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [gameProgress, setGameProgress] = useState<Record<number, boolean>>({});
  const [showProgress, setShowProgress] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const level = ADVENTURE_LEVELS[currentLevel];

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('code-quest-progress');
    if (saved) {
      setGameProgress(JSON.parse(saved));
    }
  }, []);

  // Set initial code when level changes
  useEffect(() => {
    setUserCode(level.challenge.code);
    setShowHint(false);
    setHintIndex(0);
    setShowSolution(false);
    setCodeOutput("");
  }, [currentLevel]);

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

  const checkSolution = () => {
    const isCorrect = userCode.trim() === level.challenge.solution.trim();
    
    if (isCorrect) {
      // Mark level as completed
      const newProgress = { ...gameProgress, [level.id]: true };
      setGameProgress(newProgress);
      localStorage.setItem('code-quest-progress', JSON.stringify(newProgress));
      
      // Unlock next level
      if (currentLevel < ADVENTURE_LEVELS.length - 1) {
        ADVENTURE_LEVELS[currentLevel + 1].unlocked = true;
      }
      
      alert(`🎉 ${level.reward}`);
    } else {
      alert("❌ Not quite right! Try again or check the hints.");
    }
  };

  const showNextHint = () => {
    if (hintIndex < level.challenge.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
    setShowHint(true);
  };

  const nextLevel = () => {
    if (currentLevel < ADVENTURE_LEVELS.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const previousLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  const resetProgress = () => {
    setGameProgress({});
    localStorage.removeItem('code-quest-progress');
    setCurrentLevel(0);
  };

  const getLevelStatus = (levelId: number) => {
    if (gameProgress[levelId]) return "completed";
    if (levelId === 1 || gameProgress[levelId - 1]) return "unlocked";
    return "locked";
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <img src="/javascript.svg" alt="Code Quest" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Code Quest</h1>
      </div>

      {/* Progress Overview */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2">
          {ADVENTURE_LEVELS.map((lvl, index) => (
            <Button
              key={lvl.id}
              onClick={() => {
                if (getLevelStatus(lvl.id) !== "locked") {
                  setCurrentLevel(index);
                }
              }}
              variant={
                getLevelStatus(lvl.id) === "completed" ? "default" :
                getLevelStatus(lvl.id) === "unlocked" ? "secondary" : "ghost"
              }
              size="sm"
              disabled={getLevelStatus(lvl.id) === "locked"}
              className="relative"
            >
              {getLevelStatus(lvl.id) === "completed" && "✅ "}
              Level {lvl.id}
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
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Adventure Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADVENTURE_LEVELS.map((lvl) => (
              <div key={lvl.id} className={`p-4 rounded-lg border-2 ${
                getLevelStatus(lvl.id) === "completed" ? "bg-green-100 border-green-300" :
                getLevelStatus(lvl.id) === "unlocked" ? "bg-yellow-100 border-yellow-300" :
                "bg-gray-100 border-gray-300"
              }`}>
                <div className="font-semibold">{lvl.title}</div>
                <div className="text-sm text-gray-600 mt-1">{lvl.challenge.type}</div>
                <div className="text-xs mt-2">
                  {getLevelStatus(lvl.id) === "completed" ? "✅ Completed" :
                   getLevelStatus(lvl.id) === "unlocked" ? "🔓 Unlocked" : "🔒 Locked"}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Current Level */}
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{level.title}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              level.challenge.type === "loop" ? "bg-blue-100 text-blue-600" :
              level.challenge.type === "function" ? "bg-green-100 text-green-600" :
              level.challenge.type === "algorithm" ? "bg-purple-100 text-purple-600" :
              level.challenge.type === "recursion" ? "bg-orange-100 text-orange-600" :
              "bg-red-100 text-red-600"
            }`}>
              {level.challenge.type}
            </span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 leading-relaxed">{level.story}</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Challenge:</h4>
            <p className="text-yellow-700">{level.challenge.problem}</p>
          </div>
        </div>

        {/* Code Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Code:</h3>
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
            placeholder="Write your code here..."
          />
        </div>

        {/* Output */}
        {codeOutput && (
          <div className="mt-4">
            <CodeSnippet isOutput language="output" code={codeOutput} />
          </div>
        )}

        {/* Hints and Help */}
        <div className="mt-6 flex gap-4">
          <Button
            onClick={showNextHint}
            variant="secondary"
            size="sm"
          >
            💡 Hint ({hintIndex + 1}/{level.challenge.hints.length})
          </Button>
          
          <Button
            onClick={() => setShowSolution(!showSolution)}
            variant="ghost"
            size="sm"
          >
            {showSolution ? "Hide" : "Show"} Solution
          </Button>
        </div>

        {showHint && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Hint:</h4>
            <p className="text-blue-700">{level.challenge.hints[hintIndex]}</p>
          </div>
        )}

        {showSolution && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Solution:</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {level.challenge.solution}
            </pre>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={previousLevel}
          disabled={currentLevel === 0}
          variant="secondary"
        >
          ← Previous Level
        </Button>
        
        <Button
          onClick={nextLevel}
          disabled={currentLevel === ADVENTURE_LEVELS.length - 1 || !gameProgress[level.id]}
          variant="secondary"
        >
          Next Level →
        </Button>
      </div>

      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
} 
