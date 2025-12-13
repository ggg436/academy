"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Battle arena with algorithm-based combat
const BATTLE_ENEMIES = [
  {
    id: 1,
    name: "Array Goblin",
    health: 50,
    attack: 10,
    description: "A small goblin that attacks with array manipulation. Weak to sorting algorithms.",
    challenge: {
      type: "sorting",
      title: "Sort Attack",
      description: "Write a sorting algorithm to defeat the Array Goblin. Faster algorithms deal more damage!",
      code: `// Sort the array to power your attack
let numbers = [5, 2, 8, 1, 9, 3, 7, 4, 6];

function sortAttack(arr) {
  // TODO: Implement a sorting algorithm
  // The faster your algorithm, the more damage you deal!
  return arr;
}

let sortedNumbers = sortAttack(numbers);
console.log("Attack power:", sortedNumbers.length * 10);`,
      solution: `// Sort the array to power your attack
let numbers = [5, 2, 8, 1, 9, 3, 7, 4, 6];

function sortAttack(arr) {
  return arr.sort((a, b) => a - b);
}

let sortedNumbers = sortAttack(numbers);
console.log("Attack power:", sortedNumbers.length * 10);`,
      hints: [
        "Use the built-in sort() method for maximum efficiency",
        "Provide a comparison function for numerical sorting",
        "The faster the algorithm, the more damage you deal"
      ],
      damageMultiplier: 1.5
    }
  },
  {
    id: 2,
    name: "Loop Dragon",
    health: 100,
    attack: 20,
    description: "A fierce dragon that breathes loops. Defeat it with efficient iteration!",
    challenge: {
      type: "iteration",
      title: "Loop Strike",
      description: "Write an efficient loop to defeat the Loop Dragon. Optimize your code for maximum damage!",
      code: `// Use loops to power your attack
let targets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function loopStrike(arr) {
  let totalDamage = 0;
  // TODO: Calculate total damage using a loop
  // More efficient loops deal more damage!
  return totalDamage;
}

let damage = loopStrike(targets);
console.log("Total damage:", damage);`,
      solution: `// Use loops to power your attack
let targets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function loopStrike(arr) {
  let totalDamage = 0;
  for (let i = 0; i < arr.length; i++) {
    totalDamage += arr[i] * 2;
  }
  return totalDamage;
}

let damage = loopStrike(targets);
console.log("Total damage:", damage);`,
      hints: [
        "Use a for loop to iterate through the array",
        "Multiply each element by 2 for bonus damage",
        "Sum up all the damage values"
      ],
      damageMultiplier: 2.0
    }
  },
  {
    id: 3,
    name: "Recursion Wizard",
    health: 150,
    attack: 30,
    description: "A powerful wizard who uses recursion magic. Counter with your own recursive spells!",
    challenge: {
      type: "recursion",
      title: "Recursive Blast",
      description: "Write a recursive function to defeat the Recursion Wizard. Master the art of recursion!",
      code: `// Use recursion to cast powerful spells
function recursiveBlast(n) {
  // TODO: Implement a recursive function
  // Calculate factorial: n! = n * (n-1)!
  // Base case: 0! = 1, 1! = 1
}

let spellPower = recursiveBlast(5);
console.log("Spell power:", spellPower);`,
      solution: `// Use recursion to cast powerful spells
function recursiveBlast(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * recursiveBlast(n - 1);
}

let spellPower = recursiveBlast(5);
console.log("Spell power:", spellPower);`,
      hints: [
        "Start with base cases: 0! = 1 and 1! = 1",
        "For other numbers: n! = n * (n-1)!",
        "Call the function recursively with n-1"
      ],
      damageMultiplier: 2.5
    }
  },
  {
    id: 4,
    name: "Data Structure Demon",
    health: 200,
    attack: 40,
    description: "A demon made of complex data structures. Defeat it with efficient data manipulation!",
    challenge: {
      type: "data-structures",
      title: "Structure Smash",
      description: "Manipulate data structures to defeat the demon. Use arrays and objects effectively!",
      code: `// Use data structures to defeat the demon
let inventory = [
  { name: "Sword", damage: 15 },
  { name: "Shield", defense: 10 },
  { name: "Potion", healing: 20 },
  { name: "Bow", damage: 12 }
];

function structureSmash(items) {
  // TODO: Find the item with highest damage
  // Return the total damage of all weapons
}

let totalDamage = structureSmash(inventory);
console.log("Total weapon damage:", totalDamage);`,
      solution: `// Use data structures to defeat the demon
let inventory = [
  { name: "Sword", damage: 15 },
  { name: "Shield", defense: 10 },
  { name: "Potion", healing: 20 },
  { name: "Bow", damage: 12 }
];

function structureSmash(items) {
  let totalDamage = 0;
  for (let item of items) {
    if (item.damage) {
      totalDamage += item.damage;
    }
  }
  return totalDamage;
}

let totalDamage = structureSmash(inventory);
console.log("Total weapon damage:", totalDamage);`,
      hints: [
        "Loop through the inventory array",
        "Check if each item has a 'damage' property",
        "Sum up all the damage values"
      ],
      damageMultiplier: 3.0
    }
  },
  {
    id: 5,
    name: "Algorithm Overlord",
    health: 300,
    attack: 60,
    description: "The final boss! A master of all algorithms. Defeat it with the ultimate optimization!",
    challenge: {
      type: "optimization",
      title: "Ultimate Algorithm",
      description: "Write the most efficient algorithm to defeat the Algorithm Overlord. Every optimization counts!",
      code: `// The ultimate algorithm challenge
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function ultimateAlgorithm(arr) {
  // TODO: Find the sum of all even numbers
  // Then find the product of all odd numbers
  // Return the difference: evenSum - oddProduct
}

let power = ultimateAlgorithm(data);
console.log("Ultimate power:", power);`,
      solution: `// The ultimate algorithm challenge
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function ultimateAlgorithm(arr) {
  let evenSum = 0;
  let oddProduct = 1;
  
  for (let num of arr) {
    if (num % 2 === 0) {
      evenSum += num;
    } else {
      oddProduct *= num;
    }
  }
  
  return evenSum - oddProduct;
}

let power = ultimateAlgorithm(data);
console.log("Ultimate power:", power);`,
      hints: [
        "Use a single loop to process all numbers",
        "Check if number is even with modulo operator",
        "Add even numbers, multiply odd numbers"
      ],
      damageMultiplier: 4.0
    }
  }
];

export default function AlgoArenaPage() {
  const [currentEnemy, setCurrentEnemy] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [battleProgress, setBattleProgress] = useState<Record<number, boolean>>({});
  const [showProgress, setShowProgress] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [inBattle, setInBattle] = useState(false);

  const enemy = BATTLE_ENEMIES[currentEnemy];

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('algo-arena-progress');
    if (saved) {
      setBattleProgress(JSON.parse(saved));
    }
  }, []);

  // Set initial code when enemy changes
  useEffect(() => {
    setUserCode(enemy.challenge.code);
    setShowHint(false);
    setHintIndex(0);
    setShowSolution(false);
    setCodeOutput("");
    setEnemyHealth(enemy.health);
    setBattleLog([]);
    setInBattle(false);
  }, [currentEnemy]);

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

  const startBattle = () => {
    if (!codeOutput) {
      alert("Run your code first to calculate your attack power!");
      return;
    }

    setInBattle(true);
    setBattleLog([`⚔️ Battle started against ${enemy.name}!`]);
    
    // Extract attack power from output
    const attackMatch = codeOutput.match(/Attack power: (\d+)|Total damage: (\d+)|Spell power: (\d+)|Total weapon damage: (\d+)|Ultimate power: (-?\d+)/);
    const attackPower = attackMatch ? parseInt(attackMatch[1] || attackMatch[2] || attackMatch[3] || attackMatch[4] || attackMatch[5]) : 10;
    
    const finalDamage = Math.floor(attackPower * enemy.challenge.damageMultiplier);
    
    // Player attacks
    setBattleLog(prev => [...prev, `🎯 Your algorithm deals ${finalDamage} damage!`]);
    setEnemyHealth(prev => Math.max(0, prev - finalDamage));
    
    if (enemy.health - finalDamage <= 0) {
      // Victory!
      setBattleLog(prev => [...prev, `💀 ${enemy.name} defeated!`]);
      const newProgress = { ...battleProgress, [enemy.id]: true };
      setBattleProgress(newProgress);
      localStorage.setItem('algo-arena-progress', JSON.stringify(newProgress));
      setTimeout(() => {
        alert(`🎉 Victory! You've defeated ${enemy.name} with your powerful algorithm!`);
      }, 1000);
    } else {
      // Enemy counter-attacks
      setTimeout(() => {
        setBattleLog(prev => [...prev, `🔥 ${enemy.name} attacks for ${enemy.attack} damage!`]);
        setPlayerHealth(prev => Math.max(0, prev - enemy.attack));
        
        if (playerHealth - enemy.attack <= 0) {
          setBattleLog(prev => [...prev, `💀 You have been defeated! Try again with a better algorithm!`]);
        }
      }, 1000);
    }
  };

  const showNextHint = () => {
    if (hintIndex < enemy.challenge.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
    setShowHint(true);
  };

  const nextEnemy = () => {
    if (currentEnemy < BATTLE_ENEMIES.length - 1) {
      setCurrentEnemy(currentEnemy + 1);
    }
  };

  const previousEnemy = () => {
    if (currentEnemy > 0) {
      setCurrentEnemy(currentEnemy - 1);
    }
  };

  const resetProgress = () => {
    setBattleProgress({});
    setPlayerHealth(100);
    localStorage.removeItem('algo-arena-progress');
    setCurrentEnemy(0);
  };

  const getEnemyStatus = (enemyId: number) => {
    if (battleProgress[enemyId]) return "defeated";
    if (enemyId === 1 || battleProgress[enemyId - 1]) return "unlocked";
    return "locked";
  };

  const getEnemyHealthPercentage = () => {
    return (enemyHealth / enemy.health) * 100;
  };

  const getPlayerHealthPercentage = () => {
    return (playerHealth / 100) * 100;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <img src="/javascript.svg" alt="Algo Arena" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Algo Arena</h1>
      </div>

      {/* Battle Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">🏃‍♂️ Your Health</h3>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getPlayerHealthPercentage()}%` }}
            />
          </div>
          <div className="text-sm text-green-600">{playerHealth}/100 HP</div>
        </Card>
        
        <Card className="p-4 bg-red-50 border-red-200">
          <h3 className="font-semibold text-red-800 mb-2">👹 {enemy.name}</h3>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getEnemyHealthPercentage()}%` }}
            />
          </div>
          <div className="text-sm text-red-600">{enemyHealth}/{enemy.health} HP</div>
        </Card>
      </div>

      {/* Enemy Selection */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2">
          {BATTLE_ENEMIES.map((en, index) => (
            <Button
              key={en.id}
              onClick={() => {
                if (getEnemyStatus(en.id) !== "locked") {
                  setCurrentEnemy(index);
                }
              }}
              variant={
                getEnemyStatus(en.id) === "defeated" ? "default" :
                getEnemyStatus(en.id) === "unlocked" ? "secondary" : "ghost"
              }
              size="sm"
              disabled={getEnemyStatus(en.id) === "locked"}
              className="relative"
            >
              {getEnemyStatus(en.id) === "defeated" && "💀 "}
              {en.name}
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
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Battle Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BATTLE_ENEMIES.map((en) => (
              <div key={en.id} className={`p-4 rounded-lg border-2 ${
                getEnemyStatus(en.id) === "defeated" ? "bg-green-100 border-green-300" :
                getEnemyStatus(en.id) === "unlocked" ? "bg-yellow-100 border-yellow-300" :
                "bg-gray-100 border-gray-300"
              }`}>
                <div className="font-semibold">{en.name}</div>
                <div className="text-sm text-gray-600 mt-1">{en.challenge.type}</div>
                <div className="text-xs mt-2">
                  {getEnemyStatus(en.id) === "defeated" ? "💀 Defeated" :
                   getEnemyStatus(en.id) === "unlocked" ? "⚔️ Ready" : "🔒 Locked"}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Current Battle */}
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">⚔️ {enemy.name}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              enemy.challenge.type === "sorting" ? "bg-blue-100 text-blue-600" :
              enemy.challenge.type === "iteration" ? "bg-green-100 text-green-600" :
              enemy.challenge.type === "recursion" ? "bg-purple-100 text-purple-600" :
              enemy.challenge.type === "data-structures" ? "bg-orange-100 text-orange-600" :
              "bg-red-100 text-red-600"
            }`}>
              {enemy.challenge.type}
            </span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 leading-relaxed">{enemy.description}</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Battle Challenge:</h4>
            <p className="text-yellow-700">{enemy.challenge.description}</p>
          </div>
        </div>

        {/* Code Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Algorithm:</h3>
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
                onClick={startBattle}
                disabled={!codeOutput || inBattle}
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                ⚔️ Start Battle
              </Button>
            </div>
          </div>
          
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-green-400 border border-gray-300 rounded-lg resize-none"
            placeholder="Write your algorithm here..."
          />
        </div>

        {/* Output */}
        {codeOutput && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Algorithm Output:</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
              {codeOutput}
            </div>
          </div>
        )}

        {/* Battle Log */}
        {battleLog.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">⚔️ Battle Log:</h4>
            <div className="bg-gray-100 p-4 rounded-lg max-h-32 overflow-y-auto">
              {battleLog.map((log, index) => (
                <div key={index} className="text-sm text-gray-700 mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hints and Help */}
        <div className="mt-6 flex gap-4">
          <Button
            onClick={showNextHint}
            variant="secondary"
            size="sm"
          >
            💡 Hint ({hintIndex + 1}/{enemy.challenge.hints.length})
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
            <p className="text-blue-700">{enemy.challenge.hints[hintIndex]}</p>
          </div>
        )}

        {showSolution && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Solution:</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {enemy.challenge.solution}
            </pre>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={previousEnemy}
          disabled={currentEnemy === 0}
          variant="secondary"
        >
          ← Previous Enemy
        </Button>
        
        <Button
          onClick={nextEnemy}
          disabled={currentEnemy === BATTLE_ENEMIES.length - 1 || !battleProgress[enemy.id]}
          variant="secondary"
        >
          Next Enemy →
        </Button>
      </div>

      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
} 
