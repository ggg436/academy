"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Simple project templates
const PROJECT_TEMPLATES = [
  {
    id: 1,
    title: "Calculator",
    difficulty: "beginner",
    description: "Build a simple calculator with HTML, CSS, and JavaScript",
    category: "web-app",
    template: `<!DOCTYPE html>
<html>
<head>
    <title>Calculator</title>
    <style>
        .calculator {
            width: 300px;
            margin: 50px auto;
            padding: 20px;
            border: 2px solid #ccc;
            border-radius: 10px;
        }
        .display {
            width: 100%;
            height: 50px;
            margin-bottom: 10px;
            font-size: 24px;
            text-align: right;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 5px;
        }
        button {
            padding: 15px;
            font-size: 18px;
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
            <div class=&quot;calculator&quot;>
          <input type=&quot;text&quot; class=&quot;display&quot; id=&quot;display&quot; readonly>
          <div class=&quot;buttons&quot;>
            <button onclick=&quot;clearDisplay()&quot;>C</button>
            <button onclick=&quot;appendNumber('7')&quot;>7</button>
            <button onclick=&quot;appendNumber('8')&quot;>8</button>
            <button onclick=&quot;appendNumber('9')&quot;>9</button>
            <button onclick=&quot;setOperation('+')&quot;>+</button>
            <button onclick=&quot;appendNumber('4')&quot;>4</button>
            <button onclick=&quot;appendNumber('5')&quot;>5</button>
            <button onclick=&quot;appendNumber('6')&quot;>6</button>
            <button onclick=&quot;setOperation('-')&quot;>-</button>
            <button onclick=&quot;appendNumber('1')&quot;>1</button>
            <button onclick=&quot;appendNumber('2')&quot;>2</button>
            <button onclick=&quot;appendNumber('3')&quot;>3</button>
            <button onclick=&quot;setOperation('*')&quot;>×</button>
            <button onclick=&quot;appendNumber('0')&quot;>0</button>
            <button onclick=&quot;appendNumber('.')&quot;>.</button>
            <button onclick=&quot;calculate()&quot;>=</button>
            <button onclick=&quot;setOperation('/')&quot;>÷</button>
          </div>
        </div>

    <script>
        let currentNumber = '';
        let previousNumber = '';
        let operation = null;
        let shouldResetScreen = false;

        const display = document.getElementById('display');

        function appendNumber(number) {
            if (shouldResetScreen) {
                display.value = '';
                shouldResetScreen = false;
            }
            display.value += number;
        }

        function setOperation(op) {
            if (operation !== null) calculate();
            previousNumber = display.value;
            operation = op;
            shouldResetScreen = true;
        }

        function calculate() {
            if (operation === null || shouldResetScreen) return;
            
            let result;
            const prev = parseFloat(previousNumber);
            const current = parseFloat(display.value);
            
            switch (operation) {
                case '+': result = prev + current; break;
                case '-': result = prev - current; break;
                case '*': result = prev * current; break;
                case '/': result = prev / current; break;
                default: return;
            }
            
            display.value = result;
            operation = null;
            shouldResetScreen = true;
        }

        function clearDisplay() {
            display.value = '';
            currentNumber = '';
            previousNumber = '';
            operation = null;
            shouldResetScreen = false;
        }
    </script>
</body>
</html>`
  },
  {
    id: 2,
    title: "Todo List",
    difficulty: "intermediate",
    description: "Create a functional todo list with local storage",
    category: "web-app",
    template: `<!DOCTYPE html>
<html>
<head>
    <title>Todo List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .todo-container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        .input-section {
            display: flex;
            margin-bottom: 20px;
        }
        .input-section input {
            flex: 1;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 5px;
            margin-right: 10px;
            font-size: 16px;
        }
        .input-section button {
            padding: 12px 20px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .todo-item {
            display: flex;
            align-items: center;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 10px;
            background: #f9f9f9;
        }
        .todo-item.completed {
            background: #e8f5e8;
            text-decoration: line-through;
            color: #666;
        }
        .todo-item input[type=&quot;checkbox&quot;] {
            margin-right: 15px;
            transform: scale(1.2);
        }
        .todo-item span {
            flex: 1;
            font-size: 16px;
        }
        .todo-item button {
            padding: 8px 12px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class=&quot;todo-container&quot;>
        <h1>📝 Todo List</h1>
        
        <div class=&quot;input-section&quot;>
            <input type=&quot;text&quot; id=&quot;todoInput&quot; placeholder=&quot;Add a new task...&quot; onkeypress=&quot;handleKeyPress(event)&quot;>
            <button onclick=&quot;addTodo()&quot;>Add Task</button>
        </div>
        
        <div id=&quot;todoList&quot;>
            <!-- Todo items will be added here -->
        </div>
    </div>

    <script>
        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        function addTodo() {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();
            
            if (text === '') return;
            
            const todo = {
                id: Date.now(),
                text: text,
                completed: false
            };
            
            todos.push(todo);
            saveTodos();
            renderTodos();
            input.value = '';
        }

        function toggleTodo(id) {
            todos = todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            saveTodos();
            renderTodos();
        }

        function deleteTodo(id) {
            todos = todos.filter(todo => todo.id !== id);
            saveTodos();
            renderTodos();
        }

        function renderTodos() {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';
            
            todos.forEach(todo => {
                const todoItem = document.createElement('div');
                todoItem.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
                todoItem.innerHTML = \`
                                    <input type=&quot;checkbox&quot; \${todo.completed ? 'checked' : ''} onchange=&quot;toggleTodo(\${todo.id})&quot;>
                <span>\${todo.text}</span>
                <button onclick=&quot;deleteTodo(\${todo.id})&quot;>Delete</button>
                \`;
                todoList.appendChild(todoItem);
            });
        }

        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                addTodo();
            }
        }

        // Initial render
        renderTodos();
    </script>
</body>
</html>`
  }
];

export default function BuildRunPage() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [projectProgress, setProjectProgress] = useState<Record<number, boolean>>({});

  const project = PROJECT_TEMPLATES[selectedProject];

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('build-run-progress');
    if (saved) {
      setProjectProgress(JSON.parse(saved));
    }
  }, []);

  // Set initial code when project changes
  useEffect(() => {
    setUserCode(project.template);
  }, [selectedProject]);

  const runProject = () => {
    // Create a new window/tab with the user's code
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(userCode);
      newWindow.document.close();
    }
  };

  const saveProject = () => {
    // Mark project as completed
    const newProgress = { ...projectProgress, [project.id]: true };
    setProjectProgress(newProgress);
    localStorage.setItem('build-run-progress', JSON.stringify(newProgress));
    
    // Create downloadable file
    const blob = new Blob([userCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`🎉 Project saved! You've successfully built ${project.title}!`);
  };

  const resetProject = () => {
    setUserCode(project.template);
  };

  const nextProject = () => {
    if (selectedProject < PROJECT_TEMPLATES.length - 1) {
      setSelectedProject(selectedProject + 1);
    }
  };

  const previousProject = () => {
    if (selectedProject > 0) {
      setSelectedProject(selectedProject - 1);
    }
  };

  const resetProgress = () => {
    setProjectProgress({});
    localStorage.removeItem('build-run-progress');
    setSelectedProject(0);
  };

  const getProjectStatus = (projectId: number) => {
    if (projectProgress[projectId]) return "completed";
    if (projectId === 1 || projectProgress[projectId - 1]) return "unlocked";
    return "locked";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "text-green-600 bg-green-100";
      case "intermediate": return "text-yellow-600 bg-yellow-100";
      case "advanced": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <img src="/html.svg" alt="Build & Run" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Build & Run</h1>
      </div>

      {/* Project Selection */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2">
          {PROJECT_TEMPLATES.map((proj, index) => (
            <Button
              key={proj.id}
              onClick={() => {
                if (getProjectStatus(proj.id) !== "locked") {
                  setSelectedProject(index);
                }
              }}
              variant={
                getProjectStatus(proj.id) === "completed" ? "default" :
                getProjectStatus(proj.id) === "unlocked" ? "secondary" : "ghost"
              }
              size="sm"
              disabled={getProjectStatus(proj.id) === "locked"}
            >
              {getProjectStatus(proj.id) === "completed" && "✅ "}
              {proj.title}
            </Button>
          ))}
        </div>
        <Button
          onClick={resetProgress}
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700"
        >
          🔄 Reset
        </Button>
      </div>

      {/* Current Project */}
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
              {project.difficulty}
            </span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </div>
        </div>

        {/* Code Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Code:</h3>
            <div className="flex gap-2">
              <Button
                onClick={resetProject}
                variant="secondary"
                size="sm"
              >
                🔄 Reset Template
              </Button>
              <Button
                onClick={runProject}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                ▶️ Run Project
              </Button>
              <Button
                onClick={saveProject}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                💾 Save Project
              </Button>
            </div>
          </div>
          
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 border border-gray-300 rounded-lg resize-none"
            placeholder="Write your HTML, CSS, and JavaScript here..."
          />
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h4 className="font-semibold mb-3">💡 Instructions:</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Modify the code to customize your project</li>
            <li>• Click &quot;Run Project&quot; to see your creation in action</li>
            <li>• Click &quot;Save Project&quot; to download your finished project</li>
            <li>• Try adding new features and styling</li>
          </ul>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={previousProject}
          disabled={selectedProject === 0}
          variant="secondary"
        >
          ← Previous Project
        </Button>
        
        <Button
          onClick={nextProject}
          disabled={selectedProject === PROJECT_TEMPLATES.length - 1}
          variant="secondary"
        >
          Next Project →
        </Button>
      </div>

      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
} 
