"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeSnippet } from "@/components/ui/code-snippet";

// Company building simulation with coding challenges
const COMPANY_LEVELS = [
  {
    id: 1,
    title: "Startup Phase",
    description: "You've just founded your tech startup! Your first challenge is to create a simple calculator to attract investors.",
    companyStage: "Startup",
    employees: 1,
    funding: 10000,
    challenge: {
      type: "calculator",
      title: "Build a Calculator",
      description: "Create a basic calculator that can add, subtract, multiply, and divide two numbers.",
      code: `// Build your first product - a calculator
function calculator(num1, num2, operation) {
  // TODO: Implement basic calculator operations
  // Operations: 'add', 'subtract', 'multiply', 'divide'
}

// Test your calculator
console.log("5 + 3 =", calculator(5, 3, 'add'));
console.log("10 - 4 =", calculator(10, 4, 'subtract'));
console.log("6 * 7 =", calculator(6, 7, 'multiply'));
console.log("15 / 3 =", calculator(15, 3, 'divide'));`,
      solution: `// Build your first product - a calculator
function calculator(num1, num2, operation) {
  switch (operation) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      return num1 / num2;
    default:
      return "Invalid operation";
  }
}

// Test your calculator
console.log("5 + 3 =", calculator(5, 3, 'add'));
console.log("10 - 4 =", calculator(10, 4, 'subtract'));
console.log("6 * 7 =", calculator(6, 7, 'multiply'));
console.log("15 / 3 =", calculator(15, 3, 'divide'));`,
      hints: [
        "Use a switch statement to handle different operations",
        "Return the result of each mathematical operation",
        "Handle the case when operation is not recognized"
      ]
    },
    reward: {
      funding: 50000,
      employees: 2,
      message: "Great job! Investors are impressed with your calculator. You've secured $50,000 in funding and hired your first developer!"
    }
  },
  {
    id: 2,
    title: "Growth Phase",
    description: "Your startup is growing! Now you need to build a data sorting system to handle customer information efficiently.",
    companyStage: "Growing Startup",
    employees: 3,
    funding: 60000,
    challenge: {
      type: "data-sorting",
      title: "Customer Database Sorter",
      description: "Create a function that sorts customer data by name, age, and purchase amount.",
      code: `// Sort customer data for your growing business
let customers = [
  { name: "Alice", age: 25, purchases: 150 },
  { name: "Bob", age: 30, purchases: 200 },
  { name: "Charlie", age: 22, purchases: 100 },
  { name: "Diana", age: 28, purchases: 300 }
];

function sortCustomers(customers, sortBy) {
  // TODO: Sort customers by 'name', 'age', or 'purchases'
  // Return the sorted array
}

console.log("Sorted by name:", sortCustomers(customers, 'name'));
console.log("Sorted by age:", sortCustomers(customers, 'age'));
console.log("Sorted by purchases:", sortCustomers(customers, 'purchases'));`,
      solution: `// Sort customer data for your growing business
let customers = [
  { name: "Alice", age: 25, purchases: 150 },
  { name: "Bob", age: 30, purchases: 200 },
  { name: "Charlie", age: 22, purchases: 100 },
  { name: "Diana", age: 28, purchases: 300 }
];

function sortCustomers(customers, sortBy) {
  return customers.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'age') {
      return a.age - b.age;
    } else if (sortBy === 'purchases') {
      return b.purchases - a.purchases; // Descending order
    }
  });
}

console.log("Sorted by name:", sortCustomers(customers, 'name'));
console.log("Sorted by age:", sortCustomers(customers, 'age'));
console.log("Sorted by purchases:", sortCustomers(customers, 'purchases'));`,
      hints: [
        "Use the sort() method with a comparison function",
        "For strings, use localeCompare() for proper sorting",
        "For numbers, subtract to get ascending/descending order"
      ]
    },
    reward: {
      funding: 150000,
      employees: 5,
      message: "Excellent! Your sorting system impressed enterprise clients. You've secured $150,000 in funding and expanded your team!"
    }
  },
  {
    id: 3,
    title: "Scale-Up Phase",
    description: "Your company is scaling up! You need to build an API endpoint to handle user authentication for your web application.",
    companyStage: "Scale-Up",
    employees: 8,
    funding: 210000,
    challenge: {
      type: "api-authentication",
      title: "User Authentication API",
      description: "Create a simple authentication system that validates user credentials and returns appropriate responses.",
      code: `// Build authentication for your web app
let users = [
  { username: "admin", password: "admin123" },
  { username: "user1", password: "pass123" },
  { username: "developer", password: "dev456" }
];

function authenticateUser(username, password) {
  // TODO: Check if username and password match
  // Return success message or error
}

// Test authentication
console.log(authenticateUser("admin", "admin123"));
console.log(authenticateUser("user1", "wrongpass"));
console.log(authenticateUser("newuser", "password"));`,
      solution: `// Build authentication for your web app
let users = [
  { username: "admin", password: "admin123" },
  { username: "user1", password: "pass123" },
  { username: "developer", password: "dev456" }
];

function authenticateUser(username, password) {
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return "User not found";
  }
  
  if (user.password === password) {
    return "Authentication successful! Welcome, " + username;
  } else {
    return "Invalid password";
  }
}

// Test authentication
console.log(authenticateUser("admin", "admin123"));
console.log(authenticateUser("user1", "wrongpass"));
console.log(authenticateUser("newuser", "password"));`,
      hints: [
        "Use find() to search for the user by username",
        "Check if user exists before checking password",
        "Return appropriate messages for different scenarios"
      ]
    },
    reward: {
      funding: 500000,
      employees: 12,
      message: "Outstanding! Your authentication system is enterprise-grade. You've secured $500,000 in funding and are now a serious tech company!"
    }
  },
  {
    id: 4,
    title: "Enterprise Phase",
    description: "You're now an enterprise company! Build a recommendation engine to suggest products to your millions of users.",
    companyStage: "Enterprise",
    employees: 20,
    funding: 760000,
    challenge: {
      type: "recommendation-engine",
      title: "Product Recommendation Engine",
      description: "Create a recommendation system that suggests products based on user purchase history and preferences.",
      code: `// Build recommendation engine for millions of users
let products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999 },
  { id: 2, name: "Phone", category: "Electronics", price: 699 },
  { id: 3, name: "Book", category: "Education", price: 29 },
  { id: 4, name: "Headphones", category: "Electronics", price: 199 },
  { id: 5, name: "Course", category: "Education", price: 99 }
];

let userHistory = [
  { userId: 1, purchases: [1, 3] }, // Bought laptop and book
  { userId: 2, purchases: [2, 4] }  // Bought phone and headphones
];

function getRecommendations(userId, maxRecommendations = 3) {
  // TODO: Analyze user purchase history and suggest relevant products
  // Consider category preferences and price range
}

console.log("Recommendations for user 1:", getRecommendations(1));
console.log("Recommendations for user 2:", getRecommendations(2));`,
      solution: `// Build recommendation engine for millions of users
let products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999 },
  { id: 2, name: "Phone", category: "Electronics", price: 699 },
  { id: 3, name: "Book", category: "Education", price: 29 },
  { id: 4, name: "Headphones", category: "Electronics", price: 199 },
  { id: 5, name: "Course", category: "Education", price: 99 }
];

let userHistory = [
  { userId: 1, purchases: [1, 3] }, // Bought laptop and book
  { userId: 2, purchases: [2, 4] }  // Bought phone and headphones
];

function getRecommendations(userId, maxRecommendations = 3) {
  const user = userHistory.find(u => u.userId === userId);
  if (!user) return [];
  
  // Get categories user has purchased from
  const userCategories = user.purchases.map(purchaseId => {
    const product = products.find(p => p.id === purchaseId);
    return product ? product.category : null;
  }).filter(Boolean);
  
  // Find products in preferred categories that user hasn't bought
  const recommendations = products.filter(product => {
    return userCategories.includes(product.category) && 
           !user.purchases.includes(product.id);
  });
  
  return recommendations.slice(0, maxRecommendations);
}

console.log("Recommendations for user 1:", getRecommendations(1));
console.log("Recommendations for user 2:", getRecommendations(2));`,
      hints: [
        "Find the user's purchase history first",
        "Extract categories from purchased products",
        "Filter products by preferred categories",
        "Exclude already purchased products"
      ]
    },
    reward: {
      funding: 2000000,
      employees: 50,
      message: "Incredible! Your recommendation engine is driving massive revenue. You've secured $2M in funding and are now a tech unicorn!"
    }
  },
  {
    id: 5,
    title: "Tech Giant Phase",
    description: "You're now a tech giant! Build an AI-powered chatbot to handle customer support for your global user base.",
    companyStage: "Tech Giant",
    employees: 100,
    funding: 2600000,
    challenge: {
      type: "ai-chatbot",
      title: "AI Customer Support Chatbot",
      description: "Create an intelligent chatbot that can understand user queries and provide helpful responses.",
      code: `// Build AI chatbot for global customer support
let knowledgeBase = {
  "product": "We offer various products including electronics, software, and services.",
  "pricing": "Our pricing is competitive and varies by product. Contact sales for quotes.",
  "support": "Our support team is available 24/7. You can reach us via email or phone.",
  "shipping": "We offer free shipping on orders over $50. Delivery takes 2-5 business days.",
  "returns": "We have a 30-day return policy. Contact support to initiate a return."
};

function chatbotResponse(userMessage) {
  // TODO: Analyze user message and provide relevant response
  // Handle common keywords and provide helpful information
}

// Test the chatbot
console.log("User: Tell me about your products");
console.log("Bot:", chatbotResponse("Tell me about your products"));
console.log("User: What's your shipping policy?");
console.log("Bot:", chatbotResponse("What's your shipping policy?"));`,
      solution: `// Build AI chatbot for global customer support
let knowledgeBase = {
  "product": "We offer various products including electronics, software, and services.",
  "pricing": "Our pricing is competitive and varies by product. Contact sales for quotes.",
  "support": "Our support team is available 24/7. You can reach us via email or phone.",
  "shipping": "We offer free shipping on orders over $50. Delivery takes 2-5 business days.",
  "returns": "We have a 30-day return policy. Contact support to initiate a return."
};

function chatbotResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  for (let keyword in knowledgeBase) {
    if (message.includes(keyword)) {
      return knowledgeBase[keyword];
    }
  }
  
  return "I'm sorry, I don't understand. Please contact our support team for assistance.";
}

// Test the chatbot
console.log("User: Tell me about your products");
console.log("Bot:", chatbotResponse("Tell me about your products"));
console.log("User: What's your shipping policy?");
console.log("Bot:", chatbotResponse("What's your shipping policy?"));`,
      hints: [
        "Convert user message to lowercase for easier matching",
        "Check if message contains any keywords from knowledge base",
        "Return appropriate response or default message"
      ]
    },
    reward: {
      funding: 10000000,
      employees: 200,
      message: "Congratulations! You've built a tech empire! Your AI chatbot is revolutionizing customer service. You're now a $10M tech giant!"
    }
  }
];

export default function CodeTycoonPage() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [gameProgress, setGameProgress] = useState<Record<number, boolean>>({});
  const [showProgress, setShowProgress] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [companyStats, setCompanyStats] = useState({
    stage: "Startup",
    employees: 1,
    funding: 10000
  });

  const level = COMPANY_LEVELS[currentLevel];

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('code-tycoon-progress');
    if (saved) {
      setGameProgress(JSON.parse(saved));
    }
    
    const savedStats = localStorage.getItem('code-tycoon-stats');
    if (savedStats) {
      setCompanyStats(JSON.parse(savedStats));
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
      localStorage.setItem('code-tycoon-progress', JSON.stringify(newProgress));
      
      // Update company stats
      const newStats = {
        stage: level.reward.employees > 100 ? "Tech Giant" :
               level.reward.employees > 20 ? "Enterprise" :
               level.reward.employees > 8 ? "Scale-Up" :
               level.reward.employees > 3 ? "Growing Startup" : "Startup",
        employees: level.reward.employees,
        funding: level.reward.funding
      };
      setCompanyStats(newStats);
      localStorage.setItem('code-tycoon-stats', JSON.stringify(newStats));
      
      // Unlock next level
      if (currentLevel < COMPANY_LEVELS.length - 1) {
        // Next level is automatically unlocked when current level is completed
      }
      
      alert(`🎉 ${level.reward.message}`);
    } else {
      alert("❌ Not quite right! Keep working on your solution.");
    }
  };

  const showNextHint = () => {
    if (hintIndex < level.challenge.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
    setShowHint(true);
  };

  const nextLevel = () => {
    if (currentLevel < COMPANY_LEVELS.length - 1) {
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
    setCompanyStats({ stage: "Startup", employees: 1, funding: 10000 });
    localStorage.removeItem('code-tycoon-progress');
    localStorage.removeItem('code-tycoon-stats');
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
        <img src="/python.svg" alt="Code Tycoon" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Code Tycoon</h1>
      </div>

      {/* Company Stats */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">🏢 Your Company</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{companyStats.stage}</div>
            <div className="text-sm text-blue-500">Company Stage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{companyStats.employees}</div>
            <div className="text-sm text-green-500">Employees</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">${(companyStats.funding / 1000).toFixed(0)}K</div>
            <div className="text-sm text-purple-500">Funding</div>
          </div>
        </div>
      </Card>

      {/* Progress Overview */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2">
          {COMPANY_LEVELS.map((lvl, index) => (
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
              {lvl.companyStage}
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
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Company Growth</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPANY_LEVELS.map((lvl) => (
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
              level.challenge.type === "calculator" ? "bg-blue-100 text-blue-600" :
              level.challenge.type === "data-sorting" ? "bg-green-100 text-green-600" :
              level.challenge.type === "api-authentication" ? "bg-purple-100 text-purple-600" :
              level.challenge.type === "recommendation-engine" ? "bg-orange-100 text-orange-600" :
              "bg-red-100 text-red-600"
            }`}>
              {level.challenge.type}
            </span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 leading-relaxed">{level.description}</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Business Challenge:</h4>
            <p className="text-yellow-700">{level.challenge.description}</p>
          </div>
        </div>

        {/* Code Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Solution:</h3>
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
                ✅ Deploy Solution
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
          ← Previous Phase
        </Button>
        
        <Button
          onClick={nextLevel}
          disabled={currentLevel === COMPANY_LEVELS.length - 1 || !gameProgress[level.id]}
          variant="secondary"
        >
          Next Phase →
        </Button>
      </div>

      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
} 