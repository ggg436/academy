"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CongratulationPage } from "@/components/congratulation-page";
import { useLanguage } from "@/contexts/language-context";
import { saveLessonCompleteServer } from "@/actions/progress";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MotivationFun } from "@/components/motivation-fun";
import { SoundEffects } from "@/lib/sound-effects";

export const PythonLesson1Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showCodePlayground, setShowCodePlayground] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState("");
  const [solutionCode, setSolutionCode] = useState("");
  const [isProblemStep, setIsProblemStep] = useState(false);
  const { language } = useLanguage();
  // Hoisted Nepali runner state to respect hooks rules
  const [runnerOpenNp, setRunnerOpenNp] = useState(false as any);
  const [runnerCodeNp, setRunnerCodeNp] = useState("");
  const tryNowNepali = (code: string) => { setRunnerCodeNp(code); setRunnerOpenNp(true); };
  const [selectedInstructions, setSelectedInstructions] = useState<string[]>(["", "", "", "", "", "", ""]);
  const [showSolution, setShowSolution] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  // Initialize sound effects
  useEffect(() => {
    SoundEffects.init();
    SoundEffects.enable();
  }, []);

  // Correct order for the instructions (all 7 steps)
  const correctOrder = [
    "Pick up a pen with your right hand",
    "Place the pen tip on a piece of paper",
    "Move your hand 4 inches to the right",
    "Move your hand 4 inches down",
    "Move your hand 4 inches to the left",
    "Move your hand 4 inches up",
    "Lift the pen from the paper"
  ];

  // All available options (correct + distractors)
  const allOptions = [
    "Pick up a pen with your right hand",
    "Place the pen tip on a piece of paper",
    "Move your hand 4 inches to the right",
    "Move your hand 4 inches down",
    "Move your hand 4 inches to the left",
    "Move your hand 4 inches up",
    "Lift the pen from the paper",
    "Find a piece of paper",
    "Get a pen from the drawer",
    "Draw a square shape",
    "Make sure the pen has ink",
    "Check if paper is available"
  ];

  const handleCheckAnswer = () => {
    setIsChecked(true);
    const isAllCorrect = selectedInstructions.every((selected, index) => selected === correctOrder[index]);
    setIsCorrect(isAllCorrect);

    if (isAllCorrect) {
      SoundEffects.playCorrect();
      setTimeout(() => {
        setShowCongrats(true);
        SoundEffects.playComplete();
      }, 500);
    } else {
      SoundEffects.playError();
    }
  };

  const handleReset = () => {
    setSelectedInstructions(["", "", "", "", "", "", ""]);
    setIsChecked(false);
    setIsCorrect(false);
    setShowCongrats(false);
  };

  // Exercise 1: Peanut Butter Sandwich
  const [exercise1Selections, setExercise1Selections] = useState<string[]>(["", "", "", "", ""]);
  const [exercise1Checked, setExercise1Checked] = useState(false);
  const [exercise1Correct, setExercise1Correct] = useState(false);
  const exercise1CorrectOrder = [
    "Get a plate and place it on the counter",
    "Open the bread bag and take out two slices",
    "Open the peanut butter jar",
    "Use a knife to spread peanut butter on one slice",
    "Place the second slice on top to make a sandwich"
  ];
  const exercise1Options = [
    "Get a plate and place it on the counter",
    "Open the bread bag and take out two slices",
    "Open the peanut butter jar",
    "Use a knife to spread peanut butter on one slice",
    "Place the second slice on top to make a sandwich",
    "Eat the sandwich",
    "Put the bread away",
    "Close the peanut butter jar",
    "Wash the knife",
    "Get a glass of milk",
    "Find a clean plate",
    "Check if bread is fresh"
  ];

  const handleExercise1Check = () => {
    setExercise1Checked(true);
    const isAllCorrect = exercise1Selections.every((selected, index) => selected === exercise1CorrectOrder[index]);
    setExercise1Correct(isAllCorrect);
    if (isAllCorrect) {
      SoundEffects.playCorrect();
    } else {
      SoundEffects.playError();
    }
  };

  const handleExercise1Reset = () => {
    setExercise1Selections(["", "", "", "", ""]);
    setExercise1Checked(false);
    setExercise1Correct(false);
  };

  // Exercise 2: Fix Bad Instructions (Tea)
  const [exercise2Selections, setExercise2Selections] = useState<string[]>(["", "", "", "", ""]);
  const [exercise2Checked, setExercise2Checked] = useState(false);
  const [exercise2Correct, setExercise2Correct] = useState(false);
  const exercise2CorrectOrder = [
    "Fill a kettle with water",
    "Place the kettle on the stove and turn on the heat",
    "Wait until the water boils (you'll see steam)",
    "Pour the hot water into a cup with a tea bag",
    "Wait 3-5 minutes, then remove the tea bag"
  ];
  const exercise2Options = [
    "Fill a kettle with water",
    "Place the kettle on the stove and turn on the heat",
    "Wait until the water boils (you'll see steam)",
    "Pour the hot water into a cup with a tea bag",
    "Wait 3-5 minutes, then remove the tea bag",
    "Add sugar if desired",
    "Stir the tea",
    "Drink the tea",
    "Use the stuff",
    "Do the hot thing",
    "Wait a bit",
    "Make a cup of tea"
  ];

  const handleExercise2Check = () => {
    setExercise2Checked(true);
    const isAllCorrect = exercise2Selections.every((selected, index) => selected === exercise2CorrectOrder[index]);
    setExercise2Correct(isAllCorrect);
    if (isAllCorrect) {
      SoundEffects.playCorrect();
    } else {
      SoundEffects.playError();
    }
  };

  const handleExercise2Reset = () => {
    setExercise2Selections(["", "", "", "", ""]);
    setExercise2Checked(false);
    setExercise2Correct(false);
  };

  // Exercise 3: Morning Routine
  const [exercise3Selections, setExercise3Selections] = useState<string[]>(["", "", "", "", ""]);
  const [exercise3Checked, setExercise3Checked] = useState(false);
  const [exercise3Correct, setExercise3Correct] = useState(false);
  const exercise3CorrectOrder = [
    "Open your eyes and sit up in bed",
    "Get out of bed and walk to the bathroom",
    "Brush your teeth and wash your face",
    "Get dressed in clean clothes",
    "Go to the kitchen and prepare breakfast"
  ];
  const exercise3Options = [
    "Open your eyes and sit up in bed",
    "Get out of bed and walk to the bathroom",
    "Brush your teeth and wash your face",
    "Get dressed in clean clothes",
    "Go to the kitchen and prepare breakfast",
    "Eat breakfast",
    "Pack your bag for work/school",
    "Put on your shoes",
    "Leave the house",
    "Lock the door",
    "Wake up",
    "Get ready"
  ];

  const handleExercise3Check = () => {
    setExercise3Checked(true);
    const isAllCorrect = exercise3Selections.every((selected, index) => selected === exercise3CorrectOrder[index]);
    setExercise3Correct(isAllCorrect);
    if (isAllCorrect) {
      SoundEffects.playCorrect();
    } else {
      SoundEffects.playError();
    }
  };

  const handleExercise3Reset = () => {
    setExercise3Selections(["", "", "", "", ""]);
    setExercise3Checked(false);
    setExercise3Correct(false);
  };

  // Bonus Challenge: Tie Shoelaces
  const [bonusSelections, setBonusSelections] = useState<string[]>(["", "", "", "", ""]);
  const [bonusChecked, setBonusChecked] = useState(false);
  const [bonusCorrect, setBonusCorrect] = useState(false);
  const bonusCorrectOrder = [
    "Sit down and place your foot on your opposite knee",
    "Cross the right lace over the left lace",
    "Pull both laces tight to form a knot",
    "Make a loop (bunny ear) with the right lace",
    "Wrap the left lace around the base of the right loop"
  ];
  const bonusOptions = [
    "Sit down and place your foot on your opposite knee",
    "Cross the right lace over the left lace",
    "Pull both laces tight to form a knot",
    "Make a loop (bunny ear) with the right lace",
    "Wrap the left lace around the base of the right loop",
    "Pull the left lace through the hole you created",
    "Tighten both loops to secure the bow",
    "Check that the bow is even on both sides",
    "Stand up and test the knot",
    "Adjust if the laces are too loose or tight",
    "Tie your shoes",
    "Make it tight"
  ];

  const handleBonusCheck = () => {
    setBonusChecked(true);
    const isAllCorrect = bonusSelections.every((selected, index) => selected === bonusCorrectOrder[index]);
    setBonusCorrect(isAllCorrect);
    if (isAllCorrect) {
      SoundEffects.playCorrect();
      setTimeout(() => {
        SoundEffects.playComplete();
      }, 500);
    } else {
      SoundEffects.playError();
    }
  };

  const handleBonusReset = () => {
    setBonusSelections(["", "", "", "", ""]);
    setBonusChecked(false);
    setBonusCorrect(false);
  };

  // Knowledge Check: Interactive Questions (one at a time)
  const [knowledgeCheckCurrentQuestion, setKnowledgeCheckCurrentQuestion] = useState(0);
  const [knowledgeCheckSelectedAnswers, setKnowledgeCheckSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [knowledgeCheckShowResult, setKnowledgeCheckShowResult] = useState<{ [key: number]: boolean }>({});
  const [knowledgeCheckAllComplete, setKnowledgeCheckAllComplete] = useState(false);

  const knowledgeCheckQuestions = [
    {
      id: 1,
      type: "true-false",
      question: "Programming means talking to computers in English",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      id: 2,
      type: "true-false",
      question: "Computers need very specific, step-by-step instructions",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      id: 3,
      type: "true-false",
      question: "Only math geniuses can learn programming",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      id: 4,
      type: "true-false",
      question: "Programming can help automate boring tasks",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      id: 5,
      type: "true-false",
      question: "Computers can understand context and assumptions",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "What is the main difference between human and computer thinking?",
      options: [
        "A) Computers are smarter than humans",
        "B) Humans need more detailed instructions",
        "C) Computers cannot fill in missing information",
        "D) Humans process information slower"
      ],
      correctAnswer: "C) Computers cannot fill in missing information"
    },
    {
      id: 7,
      type: "fill-blank",
      question: "Programming is like giving ________ instructions to a very ________ assistant who follows them exactly.",
      options: [
        "exact / literal",
        "exact / obedient",
        "detailed / literal",
        "perfect / obedient"
      ],
      correctAnswer: "exact / literal"
    }
  ];

  const handleKnowledgeCheckAnswer = (questionId: number, selectedAnswer: string) => {
    const question = knowledgeCheckQuestions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    setKnowledgeCheckSelectedAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));
    setKnowledgeCheckShowResult(prev => ({ ...prev, [questionId]: true }));

    if (isCorrect) {
      SoundEffects.playCorrect();
      // Move to next question after a short delay
      setTimeout(() => {
        if (knowledgeCheckCurrentQuestion < knowledgeCheckQuestions.length - 1) {
          setKnowledgeCheckCurrentQuestion(prev => prev + 1);
        } else {
          // All questions completed
          setKnowledgeCheckAllComplete(true);
          SoundEffects.playComplete();
        }
      }, 1000);
    } else {
      SoundEffects.playError();
    }
  };

  const handleKnowledgeCheckReset = () => {
    setKnowledgeCheckCurrentQuestion(0);
    setKnowledgeCheckSelectedAnswers({});
    setKnowledgeCheckShowResult({});
    setKnowledgeCheckAllComplete(false);
  };

  const handleKnowledgeCheckNext = () => {
    if (knowledgeCheckCurrentQuestion < knowledgeCheckQuestions.length - 1) {
      setKnowledgeCheckCurrentQuestion(prev => prev + 1);
    }
  };

  const handleKnowledgeCheckBack = () => {
    if (knowledgeCheckCurrentQuestion > 0) {
      setKnowledgeCheckCurrentQuestion(prev => prev - 1);
    }
  };

  // Step 2: Exercise states
  // Exercise 1: Python Superpower Match
  const [step2Exercise1Selections, setStep2Exercise1Selections] = useState<string[]>(["", "", "", "", ""]);
  const [step2Exercise1Checked, setStep2Exercise1Checked] = useState(false);
  const [step2Exercise1Correct, setStep2Exercise1Correct] = useState(false);
  const step2Exercise1CorrectOrder = [
    "B) Readable like English",
    "A) Free help available 24/7",
    "D) Don't reinvent the wheel",
    "C) One language for many jobs",
    "E) Build features faster"
  ];
  const step2Exercise1Options = [
    "A) Free help available 24/7",
    "B) Readable like English",
    "C) One language for many jobs",
    "D) Don't reinvent the wheel",
    "E) Build features faster",
    "F) Complex syntax",
    "G) Only for experts",
    "H) Slow performance",
    "I) Limited libraries",
    "J) Hard to learn"
  ];

  const handleStep2Exercise1Check = () => {
    setStep2Exercise1Checked(true);
    const isAllCorrect = step2Exercise1Selections.every((selected, index) => selected === step2Exercise1CorrectOrder[index]);
    setStep2Exercise1Correct(isAllCorrect);
    if (isAllCorrect) {
      SoundEffects.playCorrect();
    } else {
      SoundEffects.playError();
    }
  };

  const handleStep2Exercise1Reset = () => {
    setStep2Exercise1Selections(["", "", "", "", ""]);
    setStep2Exercise1Checked(false);
    setStep2Exercise1Correct(false);
  };

  // Exercise 2: Company Match Game
  const [step2Exercise2Selections, setStep2Exercise2Selections] = useState<string[]>(["", "", "", ""]);
  const [step2Exercise2Checked, setStep2Exercise2Checked] = useState(false);
  const [step2Exercise2Correct, setStep2Exercise2Correct] = useState(false);
  const step2Exercise2CorrectOrder = [
    "B) Movie recommendations",
    "C) Social media platform",
    "D) Space mission data",
    "A) Self-driving cars"
  ];
  const step2Exercise2Options = [
    "A) Self-driving cars",
    "B) Movie recommendations",
    "C) Social media platform",
    "D) Space mission data",
    "E) Music streaming",
    "F) E-commerce platform",
    "G) Video sharing",
    "H) Search engine"
  ];

  const handleStep2Exercise2Check = () => {
    setStep2Exercise2Checked(true);
    const isAllCorrect = step2Exercise2Selections.every((selected, index) => selected === step2Exercise2CorrectOrder[index]);
    setStep2Exercise2Correct(isAllCorrect);
    if (isAllCorrect) {
      SoundEffects.playCorrect();
    } else {
      SoundEffects.playError();
    }
  };

  const handleStep2Exercise2Reset = () => {
    setStep2Exercise2Selections(["", "", "", ""]);
    setStep2Exercise2Checked(false);
    setStep2Exercise2Correct(false);
  };

  // Step 2: Knowledge Check
  const [step2KnowledgeCheckCurrentQuestion, setStep2KnowledgeCheckCurrentQuestion] = useState(0);
  const [step2KnowledgeCheckSelectedAnswers, setStep2KnowledgeCheckSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [step2KnowledgeCheckShowResult, setStep2KnowledgeCheckShowResult] = useState<{ [key: number]: boolean }>({});
  const [step2KnowledgeCheckAllComplete, setStep2KnowledgeCheckAllComplete] = useState(false);

  const step2KnowledgeCheckQuestions = [
    {
      id: 1,
      type: "true-false",
      question: "Python is only used by beginners and students",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      id: 2,
      type: "true-false",
      question: "Big companies like Google and NASA use Python",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      id: 3,
      type: "true-false",
      question: "Python is slower to write than other languages",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      id: 4,
      type: "true-false",
      question: "Python syntax is designed to be readable",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      id: 5,
      type: "true-false",
      question: "Python can be used for web development, data science, and AI",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "What is the main reason Python is good for beginners?",
      options: [
        "A) It's the oldest programming language",
        "B) It reads like simple English",
        "C) It can only do simple tasks",
        "D) It doesn't require any thinking"
      ],
      correctAnswer: "B) It reads like simple English"
    },
    {
      id: 7,
      type: "multiple-choice",
      question: "Which company uses Python for their social media platform?",
      options: [
        "A) Netflix",
        "B) Tesla",
        "C) Instagram",
        "D) NASA"
      ],
      correctAnswer: "C) Instagram"
    },
    {
      id: 8,
      type: "fill-blank",
      question: "Python is used by ________ for space missions and by ________ for movie recommendations.",
      options: [
        "NASA / Netflix",
        "Google / Instagram",
        "Tesla / Spotify",
        "NASA / Google"
      ],
      correctAnswer: "NASA / Netflix"
    }
  ];

  const handleStep2KnowledgeCheckAnswer = (questionId: number, selectedAnswer: string) => {
    const question = step2KnowledgeCheckQuestions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    setStep2KnowledgeCheckSelectedAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));
    setStep2KnowledgeCheckShowResult(prev => ({ ...prev, [questionId]: true }));

    if (isCorrect) {
      SoundEffects.playCorrect();
      setTimeout(() => {
        if (step2KnowledgeCheckCurrentQuestion < step2KnowledgeCheckQuestions.length - 1) {
          setStep2KnowledgeCheckCurrentQuestion(prev => prev + 1);
        } else {
          setStep2KnowledgeCheckAllComplete(true);
          SoundEffects.playComplete();
        }
      }, 1000);
    } else {
      SoundEffects.playError();
    }
  };

  const handleStep2KnowledgeCheckReset = () => {
    setStep2KnowledgeCheckCurrentQuestion(0);
    setStep2KnowledgeCheckSelectedAnswers({});
    setStep2KnowledgeCheckShowResult({});
    setStep2KnowledgeCheckAllComplete(false);
  };

  const handleStep2KnowledgeCheckNext = () => {
    if (step2KnowledgeCheckCurrentQuestion < step2KnowledgeCheckQuestions.length - 1) {
      setStep2KnowledgeCheckCurrentQuestion(prev => prev + 1);
    }
  };

  const handleStep2KnowledgeCheckBack = () => {
    if (step2KnowledgeCheckCurrentQuestion > 0) {
      setStep2KnowledgeCheckCurrentQuestion(prev => prev - 1);
    }
  };

  // Step 3: Setting Up Python
  // Installation Checklist
  const [step3Checklist, setStep3Checklist] = useState({
    pythonInstalled: false,
    editorInstalled: false,
    fileCreated: false,
    programRan: false,
    outputSeen: false
  });

  // Terminal Simulator
  const [step3TerminalInput, setStep3TerminalInput] = useState("");
  const [step3TerminalHistory, setStep3TerminalHistory] = useState([
    { type: 'output', content: 'Microsoft Windows [Version 10.0.19045.3693]' },
    { type: 'output', content: '(c) Microsoft Corporation. All rights reserved.' },
    { type: 'output', content: '' }
  ]);

  const handleStep3TerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = step3TerminalInput.trim();
    const newHistory = [...step3TerminalHistory, { type: 'input', content: input }];

    if (input === 'python --version' || input === 'python3 --version') {
      newHistory.push({ type: 'output', content: 'Python 3.12.1' });
    } else if (input === 'python' || input === 'python3') {
      newHistory.push({ type: 'output', content: 'Python 3.12.1 (tags/v3.12.1:2305ca5, Dec  7 2023, 14:34:18) [MSC v.1937 64 bit (AMD64)] on win32' });
      newHistory.push({ type: 'output', content: 'Type "help", "copyright", "credits" or "license" for more information.' });
      newHistory.push({ type: 'output', content: '>>> ' });
    } else if (input.startsWith('print("') && input.endsWith('")')) {
      // Simple print simulation
      const content = input.slice(7, -2);
      newHistory.push({ type: 'output', content: content });
    } else if (input === 'exit()') {
      newHistory.push({ type: 'output', content: '' });
    } else {
      newHistory.push({ type: 'output', content: `'${input}' is not recognized as an internal or external command, operable program or batch file.` });
    }

    setStep3TerminalHistory(newHistory);
    setStep3TerminalInput("");
  };

  // Success Meter
  const [step3Confidence, setStep3Confidence] = useState(0);

  // Knowledge Check
  const [step3KnowledgeCheckCurrentQuestion, setStep3KnowledgeCheckCurrentQuestion] = useState(0);
  const [step3KnowledgeCheckSelectedAnswers, setStep3KnowledgeCheckSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [step3KnowledgeCheckShowResult, setStep3KnowledgeCheckShowResult] = useState<{ [key: number]: boolean }>({});
  const [step3KnowledgeCheckAllComplete, setStep3KnowledgeCheckAllComplete] = useState(false);

  const step3KnowledgeCheckQuestions = [
    {
      id: 1,
      type: "multiple-choice",
      question: "What does 'Add Python to PATH' do during installation?",
      options: [
        "A) Adds Python to your computer's system path",
        "B) Installs extra features",
        "C) Creates desktop shortcuts",
        "D) Downloads more packages"
      ],
      correctAnswer: "A) Adds Python to your computer's system path"
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "Which editor is specifically designed for Python beginners?",
      options: [
        "A) VS Code",
        "B) Thonny",
        "C) Notepad",
        "D) Microsoft Word"
      ],
      correctAnswer: "B) Thonny"
    },
    {
      id: 3,
      type: "true-false",
      question: "You need to pay for Python",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      id: 4,
      type: "true-false",
      question: "The .py extension is important",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      id: 5,
      type: "true-false",
      question: "Only one code editor works with Python",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      id: 6,
      type: "true-false",
      question: "You can test Python installation with python --version",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      id: 7,
      type: "fill-blank",
      question: "To run a Python file from terminal, use the command python ________.py",
      options: ["filename", "code", "run", "start"],
      correctAnswer: "filename"
    }
  ];

  const handleStep3KnowledgeCheckAnswer = (questionId: number, selectedAnswer: string) => {
    const question = step3KnowledgeCheckQuestions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    setStep3KnowledgeCheckSelectedAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));
    setStep3KnowledgeCheckShowResult(prev => ({ ...prev, [questionId]: true }));

    if (isCorrect) {
      SoundEffects.playCorrect();
      setTimeout(() => {
        if (step3KnowledgeCheckCurrentQuestion < step3KnowledgeCheckQuestions.length - 1) {
          setStep3KnowledgeCheckCurrentQuestion(prev => prev + 1);
        } else {
          setStep3KnowledgeCheckAllComplete(true);
          SoundEffects.playComplete();
        }
      }, 1000);
    } else {
      SoundEffects.playError();
    }
  };

  const handleStep3KnowledgeCheckReset = () => {
    setStep3KnowledgeCheckCurrentQuestion(0);
    setStep3KnowledgeCheckSelectedAnswers({});
    setStep3KnowledgeCheckShowResult({});
    setStep3KnowledgeCheckAllComplete(false);
  };

  const handleStep3KnowledgeCheckNext = () => {
    if (step3KnowledgeCheckCurrentQuestion < step3KnowledgeCheckQuestions.length - 1) {
      setStep3KnowledgeCheckCurrentQuestion(prev => prev + 1);
    }
  };

  const handleStep3KnowledgeCheckBack = () => {
    if (step3KnowledgeCheckCurrentQuestion > 0) {
      setStep3KnowledgeCheckCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinishLesson = async () => {
    try {
      setIsCompleting(true);
      // Mark lesson as completed in the database
      await saveLessonCompleteServer("python", "lesson-1", 25);
      setShowCongratulations(true);
    } catch (error) {
      console.error("Error completing lesson:", error);
      alert("Failed to complete lesson. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleContinue = () => {
    setShowCongratulations(false);
    // Navigate to lesson 2 instead of learn page
    window.location.href = "/python/lesson-2";
  };

  const handlePracticeAgain = () => {
    setShowCongratulations(false);
    // Reset to first step
    window.location.href = "/python/lesson-1/python-introduction";
  };

  const handleTryNow = (code: string, hint?: string, question?: string) => {
    // For Problem steps, show the question in comment format
    const displayCode = isProblemStep && question ? `# ${question}` : code;
    setCurrentCode(displayCode);
    setCurrentHint(hint || "");
    setIsProblemStep(currentStep === 6);
    setShowCodePlayground(true);
  };

  const handleHints = (hint: string) => {
    setCurrentHint(hint);
    setShowHints(true);
  };

  const handleShowSolution = () => {
    // Show the solution code in the playground
    setCurrentCode(solutionCode);
    setShowHints(false);
  };

  const handleCloseHints = () => {
    setShowHints(false);
    setCurrentHint("");
  };

  const handleClosePlayground = () => {
    setShowCodePlayground(false);
  };

  // Hints modal component with solution button
  const HintsModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-blue-600">💡 Hints</h3>
            <button
              onClick={handleCloseHints}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          <div className="p-6 overflow-auto">
            <div className="text-neutral-700 leading-relaxed mb-4">
              {currentHint}
            </div>

            {/* Show solution button for Problem steps */}
            {isProblemStep && solutionCode && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Still need help? Click below to see the solution:</p>
                <Button
                  onClick={handleShowSolution}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Show Solution Code
                </Button>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-gray-50 rounded-b-lg">
            <div className="flex justify-end">
              <Button
                onClick={handleCloseHints}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Got it!
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // OneCompiler iframe embed for code execution
  const CodePlayground = () => {
    useEffect(() => {
      const frame = document.getElementById('oc-editor') as HTMLIFrameElement;

      if (frame && currentCode) {
        const starter = {
          eventType: 'populateCode',
          language: 'python',
          files: [
            {
              name: 'main.py',
              content: currentCode
            }
          ]
        };

        const handleLoad = () => {
          frame.contentWindow?.postMessage(starter, '*');
        };

        frame.addEventListener('load', handleLoad);

        if (frame.contentDocument?.readyState === 'complete') {
          handleLoad();
        }

        return () => {
          frame.removeEventListener('load', handleLoad);
        };
      }
    }, [currentCode]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">Python Code Playground</h3>
              {/* Only show HINT button for Problem steps */}
              {isProblemStep && currentHint && (
                <Button
                  onClick={() => handleHints(currentHint)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 text-sm rounded-lg shadow-md transform hover:scale-105 transition-all duration-200"
                  size="sm"
                >
                  HINT
                </Button>
              )}
            </div>
            <button
              onClick={handleClosePlayground}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          <div className="flex-1 p-4">
            <PythonCodeRunner initialCode={currentCode} height={420} />
          </div>
        </div>
      </div>
    );
  };

  // Show congratulation page when lesson is completed
  if (showCongratulations) {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
            <CongratulationPage
              points={25}
              hearts={3}
              onContinue={handleContinue}
              onPracticeAgain={handlePracticeAgain}
              title="Congratulations! You've completed Python Introduction!"
              lessonTitle="Python Introduction"
              showHearts={true}
            />
          </div>
        </div>
      </div>
    );
  }

  // Nepali translation branch for Lesson 1
  if (language === "ne") {
    return (
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
            <div className="text-left mt-4 ml-1">
              <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
                {currentStep === 1 ? "Python को परिचय" : currentStep === 2 ? "इतिहास" : currentStep === 3 ? "किन Python लोकप्रिय छ?" : currentStep === 4 ? "Python का प्रयोग क्षेत्र" : currentStep === 5 ? "पहिलो प्रोग्राम" : currentStep === 6 ? "अभ्यास प्रश्न" : "क्विज"}
              </h1>
            </div>

            {currentStep === 1 && (
              <div className="mt-8 space-y-6">
                <p className="text-neutral-700">Python एक <strong>high-level programming language</strong> हो, जसको मतलब यो मान्छेको भाषाजस्तै सजिलो छ र कम्प्युटरलाई बुझाउन सजिलो हुन्छ। यो <strong>interpreted</strong> हो र <strong>general-purpose</strong> छ — Web apps, AI, Games, Data science, Automation सबैमा प्रयोग हुन्छ।</p>
                <CodeSnippet language="python" code={`print("Hello, Python!")`} onRun={tryNowNepali} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`Hello, Python!`} /></div>
                <p className="text-neutral-700">print() ले कम्प्युटरलाई &quot;यो देखाऊ&quot; भन्छ, त्यसैले धेरै भाषा &quot;Hello World&quot; बाट सुरु हुन्छ।</p>
                <p className="text-blue-700">💡 Motivation: Python सिक्दा Web Development देखि AI सम्म करियर खुल्छ।</p>
                <p className="text-purple-700">😂 Fun: Python नाम सर्पबाट होइन, Monty Python comedy शोबाट आएको हो 🐍😂।</p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="mt-8 space-y-4">
                <p className="text-neutral-700">Python Guido van Rossum ले 1980s अन्त्यतिर बनाए र 1991 मा सार्वजनिक भयो। नाम comedy शोबाट आएको हो। Guido को लक्ष्य सरल, रमाइलो र शक्तिशाली भाषा बनाउनु थियो।</p>
                <p className="text-blue-700">💡 Motivation: रमाइलोका लागि सुरु भएको भाषा आज करोडौँ Developer ले प्रयोग गर्छन्।</p>
                <p className="text-purple-700">😂 Fun: शुरुमा hobby language भनिएको Python ले आज Job दिन्छ 😂।</p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="mt-8 space-y-4">
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Simple Syntax — English जस्तै</li>
                  <li>Versatile — Web, AI, Automation, Data</li>
                  <li>Huge Libraries — NumPy, Pandas, TensorFlow</li>
                  <li>Cross-platform — Windows, Mac, Linux</li>
                  <li>Community — लाखौँ Developer</li>
                </ul>
                <p className="text-blue-700">💡 Motivation: Google, Netflix, NASA जस्ता कम्पनीले Python प्रयोग गर्छन्।</p>
                <p className="text-purple-700">😂 Fun: Syntax पढ्दा कहिलेकाहीँ अंग्रेजी पढेजस्तो लाग्छ… grammar teacher चाहिँ Python ले fail गर्छ 😂।</p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="mt-8 space-y-4">
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>🌍 Web Development → Django, Flask</li>
                  <li>📊 Data Science → Pandas, NumPy</li>
                  <li>🤖 AI → TensorFlow, PyTorch</li>
                  <li>⚙️ Automation → Scripts र Bots</li>
                  <li>🎮 Game Development → Pygame</li>
                </ul>
                <div className="text-neutral-700 space-y-1">
                  <p>• Netflix → Recommendation system Python मा</p>
                  <p>• Instagram → Backend Python</p>
                  <p>• ChatGPT (OpenAI) → AI training/serving मा Python</p>
                </div>
                <p className="text-blue-700">💡 Motivation: Netflix वा ChatGPT बनाइएको भाषा सिक्दा उत्साह आउँछ।</p>
                <p className="text-purple-700">😂 Fun: Mini-Netflix बनाउन सकिन्छ… तर password साथीलाई नदिने 😂।</p>
              </div>
            )}

            {currentStep === 5 && (
              <div className="mt-8 space-y-6">
                <CodeSnippet language="python" code={`print("Welcome to Python Programming!")`} onRun={tryNowNepali} />
                <div className="mt-2"><CodeSnippet isOutput language="output" code={`Welcome to Python Programming!`} /></div>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>print() → Output देखाउन</li>
                  <li>() → function भित्र data पठाउन</li>
                  <li>&quot; &quot; वा ' ' → Text/string define गर्न</li>
                </ul>
                <p className="text-blue-700">💡 Motivation: यो नै पहिलो step — Computer सँग कुरा गर्ने</p>
                <p className="text-purple-700">😂 Fun: अब तपाईं Hello World club का coder! 🎉</p>
              </div>
            )}

            {currentStep === 6 && (
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-neutral-800">🔧 अभ्यास प्रश्न</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>आफ्नो नाम print गर्ने code लेख।</li>
                  <li>&quot;Python is fun!&quot; line print गर।</li>
                  <li>३ फरक लाइन print() प्रयोग गरेर देखाऊ।</li>
                  <li>एउटै लाइन ५ पटक देखाउने code लेख।</li>
                  <li>Python प्रयोग गर्ने ५ प्रसिद्ध कम्पनी comment मा लेख।</li>
                </ul>
              </div>
            )}

            {currentStep === 7 && (
              <div className="mt-8 space-y-6">
                <h3 className="text-lg font-semibold">क्विज</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Creator? → Guido van Rossum</li>
                  <li>Public year? → 1991</li>
                  <li>नाम? → Comedy Show</li>
                  <li>Language type? → Interpreted</li>
                </ul>
                <h4 className="font-medium">Fill in the blanks</h4>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Python को नाम <em>Comedy Show</em> बाट आएको हो।</li>
                  <li>print() ले <em>Output</em> देखाउँछ।</li>
                  <li>Text/string लाई define गर्न <em>quotes</em> प्रयोग हुन्छ।</li>
                </ul>
                <h4 className="font-medium">Output Based</h4>
                <CodeSnippet language="python" code={`print("Hi" * 3)`} onRun={tryNowNepali} />
                <CodeSnippet language="python" code={`Print("Hello")`} onRun={tryNowNepali} />
              </div>
            )}
          </div>
        </div>

        <Dialog open={runnerOpenNp} onOpenChange={setRunnerOpenNp}>
          <DialogContent className="sm:max-w-6xl">
            <DialogTitle>Try Now (Python)</DialogTitle>
            <PythonCodeRunner initialCode={runnerCodeNp} height={420} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Re-trigger build
  // Main English content
  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
              {currentStep === 1 ? "What is Programming?" : currentStep === 2 ? "Python History" : currentStep === 3 ? "Setting Up Python" : currentStep === 4 ? "Python Applications" : currentStep === 5 ? "First Program" : "Problems"}
            </h1>
          </div>

          {/* Python Introduction Content - Step 1 */}
          {currentStep === 1 && (
            <div className="mt-8 space-y-10">
              <h3 className="text-3xl font-bold text-neutral-800 flex items-center gap-2">
                🐍 What is Programming? - The Ultimate Beginner's Guide
              </h3>

              {/* Learning Objectives */}
              {/* Learning Objectives */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800">Learning Objectives</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-neutral-700 font-medium text-sm">Understand programming in simple terms</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-neutral-700 font-medium text-sm">Computers "think" vs human thinking</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-neutral-700 font-medium text-sm">Giving perfect instructions</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-neutral-700 font-medium text-sm">Solving problems with code</span>
                  </div>
                </div>
              </div>

              {/* Quick Motivation Boost */}
              <section className="space-y-3 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-2xl font-semibold text-neutral-800">🚀 Quick Motivation Boost</h4>
                <blockquote className="text-neutral-700 italic text-lg border-l-4 border-blue-500 pl-4">
                  "Every app you love, every website you visit, every game you play - they all started with someone writing their first line of code, just like you're about to do!"
                </blockquote>
              </section>

              {/* Real-World Connection */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">🏆 Real-World Connection - Look Around You!</h4>
                <p className="text-neutral-700">Programming is EVERYWHERE around you:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">📱 Your Phone</p>
                    <p className="text-neutral-600">Instagram, WhatsApp, TikTok - all run on code written by programmers</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">🚗 Transportation</p>
                    <p className="text-neutral-600">Tesla's self-driving features, Uber algorithms, flight control systems</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">🏥 Healthcare</p>
                    <p className="text-neutral-600">Medical imaging software, patient records, COVID vaccine research tools</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">🎮 Entertainment</p>
                    <p className="text-neutral-600">Netflix recommendations, Spotify algorithms, video game mechanics</p>
                  </div>
                </div>
                <p className="text-neutral-700 mt-3 font-semibold text-lg">You're about to learn the superpower that built all of this!</p>
              </section>

              {/* Core Concept */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">💡 Core Concept: Programming = Perfect Instructions</h4>

                <h5 className="text-xl font-semibold text-neutral-800 mt-4">Human vs Computer Thinking</h5>
                <div className="overflow-x-auto mt-3">
                  <table className="min-w-full border-2 border-gray-300 rounded-lg shadow-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-100 to-purple-100">
                        <th className="border-2 border-gray-300 px-6 py-4 text-left font-semibold text-neutral-800 text-lg">Humans Understand</th>
                        <th className="border-2 border-gray-300 px-6 py-4 text-left font-semibold text-neutral-800 text-lg">Computers Need</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border-2 border-gray-300 px-6 py-4 text-neutral-700 font-medium">"Make me coffee"</td>
                        <td className="border-2 border-gray-300 px-6 py-4 text-neutral-700">
                          <ol className="list-decimal list-inside space-y-1">
                            <li>Go to kitchen</li>
                            <li>Find coffee machine</li>
                            <li>Add water to tank</li>
                            <li>Add coffee grounds</li>
                            <li>Press brew button</li>
                            <li>Wait 3 minutes</li>
                            <li>Pour coffee into mug</li>
                          </ol>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5 className="text-xl font-semibold text-neutral-800 mt-4">Let's Break It Down:</h5>
                <div className="grid gap-4 md:grid-cols-2 mt-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800 mb-2">🧠 Human Brain</p>
                    <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                      <li>Fills in missing details</li>
                      <li>Understands context</li>
                      <li>Makes assumptions</li>
                      <li>"Common sense"</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800 mb-2">💻 Computer Brain</p>
                    <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                      <li>Literal interpretation</li>
                      <li>No context understanding</li>
                      <li>Zero assumptions</li>
                      <li>Follows EXACT instructions</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Interactive Activity */}
              <section className="space-y-4">
                <h4 className="text-2xl font-semibold text-neutral-800">🎮 Interactive Activity: "Human Robot" Game</h4>
                <h5 className="text-xl font-semibold text-neutral-800">Your Turn to Program!</h5>
                <p className="text-neutral-700">Imagine your friend is a robot who follows instructions exactly. Select the correct instructions in order to draw a square:</p>

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-700 font-semibold">SELECT INSTRUCTIONS</span>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="text-sm text-slate-500 mb-4 font-mono italic"># SELECT THE CORRECT INSTRUCTIONS IN ORDER:</div>
                    <div className="space-y-3">
                      {selectedInstructions.map((selected, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-slate-400 font-mono text-sm font-semibold min-w-[24px]">{index + 1}.</span>
                          <select
                            value={selected}
                            onChange={(e) => {
                              const newSelections = [...selectedInstructions];
                              newSelections[index] = e.target.value;
                              setSelectedInstructions(newSelections);
                              setIsChecked(false);
                              setIsCorrect(false);
                              setShowCongrats(false);
                            }}
                            className={`flex-1 px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-neutral-700 transition-all hover:border-slate-300 ${isChecked && selected === correctOrder[index]
                              ? "border-green-500 bg-green-50"
                              : isChecked && selected !== correctOrder[index]
                                ? "border-red-500 bg-red-50"
                                : "border-slate-200"
                              }`}
                            disabled={showCongrats}
                          >
                            <option value="">-- Select an instruction --</option>
                            {allOptions.map((option, optIndex) => (
                              <option key={optIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          {isChecked && selected === correctOrder[index] && (
                            <span className="text-green-600 font-bold text-lg">✅</span>
                          )}
                          {isChecked && selected !== correctOrder[index] && selected !== "" && (
                            <span className="text-red-600 font-bold text-lg">❌</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <div className="text-sm text-neutral-700 flex items-start gap-3">
                        <span className="text-lg">💡</span>
                        <span>
                          <strong className="text-neutral-800">Think:</strong> Are your instructions clear enough?
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-600">
                            <li>What if the paper isn't there?</li>
                            <li>What if the pen is missing?</li>
                            <li>What if the robot doesn't know what "square" means?</li>
                          </ul>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Button
                    onClick={handleCheckAnswer}
                    disabled={selectedInstructions.some(sel => sel === "") || showCongrats}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCorrect ? "✓ Correct!" : "Check Answer"}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-slate-300 hover:bg-slate-50"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => setShowSolution(!showSolution)}
                    variant="outline"
                    className="border-slate-300 hover:bg-slate-50"
                  >
                    {showSolution ? "Hide Solution" : "Show Solution"}
                  </Button>
                </div>

                {isChecked && isCorrect && (
                  <div className="mt-4 p-6 rounded-xl border-2 border-green-500 bg-green-50 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">🎉</span>
                      <div>
                        <h5 className="text-xl font-bold text-green-800">Congratulations!</h5>
                        <p className="text-green-700">You've selected all the correct instructions in the right order!</p>
                      </div>
                    </div>
                  </div>
                )}

                {isChecked && !isCorrect && (
                  <div className="mt-4 p-4 rounded-xl border-2 border-red-300 bg-red-50">
                    <p className="text-red-800 font-semibold">❌ Not quite right. Try again! Check which instructions are marked with ❌ and select the correct ones.</p>
                  </div>
                )}

                {showSolution && (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800 mb-3">Example Solution:</p>
                    <CodeSnippet language="python" code={`1. Pick up a pen with your right hand
2. Place the pen tip on a piece of paper
3. Move your hand 4 inches to the right
4. Move your hand 4 inches down
5. Move your hand 4 inches to the left
6. Move your hand 4 inches up
7. Lift the pen from the paper`} />
                  </div>
                )}
              </section>

              {/* Why Programming Matters */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">🔍 Why Programming Matters</h4>

                <h5 className="text-xl font-semibold text-neutral-800 mt-3">Programming Solves Problems:</h5>
                <div className="overflow-x-auto mt-3">
                  <table className="min-w-full border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-100 to-blue-100">
                        <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-neutral-800 text-lg">Problem Type</th>
                        <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-neutral-800 text-lg">Human Problem</th>
                        <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-neutral-800 text-lg">Programming Solution</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-neutral-800">🔹 Boring Tasks</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">"I hate organizing files"</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">Write a script to do it automatically!</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-neutral-800">🔹 Complex Calculations</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">"This takes hours to calculate"</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">Computer does it in seconds with perfect accuracy</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-neutral-800">🔹 Creative Ideas</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">"I wish there was an app for..."</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">Build it yourself and turn ideas into real products!</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5 className="text-xl font-semibold text-neutral-800 mt-4">You're Learning a Superpower:</h5>
                <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                  <li><strong>Create</strong> anything you can imagine</li>
                  <li><strong>Automate</strong> boring tasks</li>
                  <li><strong>Solve</strong> real-world problems</li>
                  <li><strong>Build</strong> your dream career</li>
                </ul>
              </section>

              {/* Immediate Practice */}
              <section className="space-y-6">
                <h4 className="text-2xl font-semibold text-neutral-800">🛠️ Immediate Practice</h4>

                {/* Exercise 1: Peanut Butter Sandwich */}
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                      <h5 className="text-lg font-semibold text-neutral-800">Exercise 1: Instruction Breakdown</h5>
                    </div>
                    <div className="p-6">
                      <p className="text-neutral-700 mb-3">Break this down into computer steps:</p>
                      <p className="font-semibold text-neutral-800 mb-4">"Make a peanut butter sandwich"</p>

                      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                          <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-700 font-semibold">SELECT STEPS</span>
                        </div>
                        <div className="p-4">
                          <div className="text-sm text-slate-500 mb-4 font-mono italic"># SELECT THE CORRECT STEPS IN ORDER:</div>
                          <div className="space-y-3">
                            {exercise1Selections.map((selected, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <span className="text-slate-400 font-mono text-sm font-semibold min-w-[24px]">{index + 1}.</span>
                                <select
                                  value={selected}
                                  onChange={(e) => {
                                    const newSelections = [...exercise1Selections];
                                    newSelections[index] = e.target.value;
                                    setExercise1Selections(newSelections);
                                    setExercise1Checked(false);
                                    setExercise1Correct(false);
                                  }}
                                  className={`flex-1 px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-neutral-700 transition-all hover:border-slate-300 ${exercise1Checked && selected === exercise1CorrectOrder[index]
                                    ? "border-green-500 bg-green-50"
                                    : exercise1Checked && selected !== exercise1CorrectOrder[index]
                                      ? "border-red-500 bg-red-50"
                                      : "border-slate-200"
                                    }`}
                                  disabled={exercise1Correct}
                                >
                                  <option value="">-- Select a step --</option>
                                  {exercise1Options.map((option, optIndex) => (
                                    <option key={optIndex} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                {exercise1Checked && selected === exercise1CorrectOrder[index] && (
                                  <span className="text-green-600 font-bold text-lg">✅</span>
                                )}
                                {exercise1Checked && selected !== exercise1CorrectOrder[index] && selected !== "" && (
                                  <span className="text-red-600 font-bold text-lg">❌</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button
                          onClick={handleExercise1Check}
                          disabled={exercise1Selections.some(sel => sel === "") || exercise1Correct}
                          className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {exercise1Correct ? "✓ Correct!" : "Check Answer"}
                        </Button>
                        <Button
                          onClick={handleExercise1Reset}
                          variant="outline"
                          className="border-slate-300 hover:bg-slate-50"
                        >
                          Reset
                        </Button>
                      </div>

                      {exercise1Checked && exercise1Correct && (
                        <div className="mt-4 p-4 rounded-xl border-2 border-green-500 bg-green-50">
                          <p className="text-green-800 font-semibold">🎉 Great job! You've broken down the task correctly!</p>
                        </div>
                      )}

                      {exercise1Checked && !exercise1Correct && (
                        <div className="mt-4 p-4 rounded-xl border-2 border-red-300 bg-red-50">
                          <p className="text-red-800 font-semibold">❌ Not quite right. Try again! Check which steps are marked with ❌.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Exercise 2: Fix Bad Instructions */}
                  <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                      <h5 className="text-lg font-semibold text-neutral-800">Exercise 2: Fix the Bad Instructions</h5>
                    </div>
                    <div className="p-6">
                      <p className="text-neutral-700 mb-3">These instructions are TERRIBLE for a computer. Why?</p>
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800 font-mono">1. Make a cup of tea</p>
                        <p className="text-sm text-red-800 font-mono">2. Use the stuff</p>
                        <p className="text-sm text-red-800 font-mono">3. Do the hot thing</p>
                        <p className="text-sm text-red-800 font-mono">4. Wait a bit</p>
                        <p className="text-sm text-red-800 font-mono">5. Drink it</p>
                      </div>
                      <p className="font-semibold text-neutral-800 mb-4">YOUR IMPROVED VERSION:</p>

                      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                          <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-700 font-semibold">SELECT STEPS</span>
                        </div>
                        <div className="p-4">
                          <div className="text-sm text-slate-500 mb-4 font-mono italic"># SELECT THE CORRECT IMPROVED STEPS:</div>
                          <div className="space-y-3">
                            {exercise2Selections.map((selected, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <span className="text-slate-400 font-mono text-sm font-semibold min-w-[24px]">{index + 1}.</span>
                                <select
                                  value={selected}
                                  onChange={(e) => {
                                    const newSelections = [...exercise2Selections];
                                    newSelections[index] = e.target.value;
                                    setExercise2Selections(newSelections);
                                    setExercise2Checked(false);
                                    setExercise2Correct(false);
                                  }}
                                  className={`flex-1 px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-neutral-700 transition-all hover:border-slate-300 ${exercise2Checked && selected === exercise2CorrectOrder[index]
                                    ? "border-green-500 bg-green-50"
                                    : exercise2Checked && selected !== exercise2CorrectOrder[index]
                                      ? "border-red-500 bg-red-50"
                                      : "border-slate-200"
                                    }`}
                                  disabled={exercise2Correct}
                                >
                                  <option value="">-- Select a step --</option>
                                  {exercise2Options.map((option, optIndex) => (
                                    <option key={optIndex} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                {exercise2Checked && selected === exercise2CorrectOrder[index] && (
                                  <span className="text-green-600 font-bold text-lg">✅</span>
                                )}
                                {exercise2Checked && selected !== exercise2CorrectOrder[index] && selected !== "" && (
                                  <span className="text-red-600 font-bold text-lg">❌</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button
                          onClick={handleExercise2Check}
                          disabled={exercise2Selections.some(sel => sel === "") || exercise2Correct}
                          className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {exercise2Correct ? "✓ Correct!" : "Check Answer"}
                        </Button>
                        <Button
                          onClick={handleExercise2Reset}
                          variant="outline"
                          className="border-slate-300 hover:bg-slate-50"
                        >
                          Reset
                        </Button>
                      </div>

                      {exercise2Checked && exercise2Correct && (
                        <div className="mt-4 p-4 rounded-xl border-2 border-green-500 bg-green-50">
                          <p className="text-green-800 font-semibold">🎉 Excellent! You've made the instructions clear and specific!</p>
                        </div>
                      )}

                      {exercise2Checked && !exercise2Correct && (
                        <div className="mt-4 p-4 rounded-xl border-2 border-red-300 bg-red-50">
                          <p className="text-red-800 font-semibold">❌ Not quite right. Try again! Check which steps are marked with ❌.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Exercise 3: Morning Routine */}
                  <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                      <h5 className="text-lg font-semibold text-neutral-800">Exercise 3: Your First "Code"</h5>
                    </div>
                    <div className="p-6">
                      <p className="text-neutral-700 mb-3">Write instructions for a morning routine:</p>
                      <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-1">
                        <li>Wake up</li>
                        <li>Get ready</li>
                        <li>Have breakfast</li>
                        <li>Leave for work/school</li>
                      </ul>

                      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                          <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-700 font-semibold">SELECT STEPS</span>
                        </div>
                        <div className="p-4">
                          <div className="text-sm text-slate-500 mb-4 font-mono italic"># SELECT THE CORRECT STEPS IN ORDER:</div>
                          <div className="space-y-3">
                            {exercise3Selections.map((selected, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <span className="text-slate-400 font-mono text-sm font-semibold min-w-[24px]">{index + 1}.</span>
                                <select
                                  value={selected}
                                  onChange={(e) => {
                                    const newSelections = [...exercise3Selections];
                                    newSelections[index] = e.target.value;
                                    setExercise3Selections(newSelections);
                                    setExercise3Checked(false);
                                    setExercise3Correct(false);
                                  }}
                                  className={`flex-1 px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-neutral-700 transition-all hover:border-slate-300 ${exercise3Checked && selected === exercise3CorrectOrder[index]
                                    ? "border-green-500 bg-green-50"
                                    : exercise3Checked && selected !== exercise3CorrectOrder[index]
                                      ? "border-red-500 bg-red-50"
                                      : "border-slate-200"
                                    }`}
                                  disabled={exercise3Correct}
                                >
                                  <option value="">-- Select a step --</option>
                                  {exercise3Options.map((option, optIndex) => (
                                    <option key={optIndex} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                {exercise3Checked && selected === exercise3CorrectOrder[index] && (
                                  <span className="text-green-600 font-bold text-lg">✅</span>
                                )}
                                {exercise3Checked && selected !== exercise3CorrectOrder[index] && selected !== "" && (
                                  <span className="text-red-600 font-bold text-lg">❌</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button
                          onClick={handleExercise3Check}
                          disabled={exercise3Selections.some(sel => sel === "") || exercise3Correct}
                          className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {exercise3Correct ? "✓ Correct!" : "Check Answer"}
                        </Button>
                        <Button
                          onClick={handleExercise3Reset}
                          variant="outline"
                          className="border-slate-300 hover:bg-slate-50"
                        >
                          Reset
                        </Button>
                      </div>

                      {exercise3Checked && exercise3Correct && (
                        <div className="mt-4 p-4 rounded-xl border-2 border-green-500 bg-green-50">
                          <p className="text-green-800 font-semibold">🎉 Perfect! You're thinking like a programmer!</p>
                        </div>
                      )}

                      {exercise3Checked && !exercise3Correct && (
                        <div className="mt-4 p-4 rounded-xl border-2 border-red-300 bg-red-50">
                          <p className="text-red-800 font-semibold">❌ Not quite right. Try again! Check which steps are marked with ❌.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Success Story Spotlight */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">💫 Success Story Spotlight</h4>
                <p className="text-neutral-700">From Beginner to World-Changer:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">👩💻 Margaret Hamilton</p>
                    <p className="text-neutral-600">Learned programming in the 1960s. Wrote code for Apollo moon missions. Her work helped land humans on the moon!</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">👨💻 Mark Zuckerberg</p>
                    <p className="text-neutral-600">Started programming in middle school. Created Facebook in his dorm room. Changed how billions of people connect.</p>
                  </div>
                </div>
                <p className="text-neutral-700 font-semibold text-lg mt-3">You're starting the same journey they did!</p>
              </section>

              {/* Knowledge Check */}
              <section className="space-y-4">
                <h4 className="text-2xl font-semibold text-neutral-800">🎯 Knowledge Check</h4>

                {!knowledgeCheckAllComplete ? (
                  <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                      <h5 className="text-lg font-semibold text-neutral-800">
                        Question {knowledgeCheckCurrentQuestion + 1} of {knowledgeCheckQuestions.length}
                      </h5>
                      <div className="text-sm text-neutral-600">
                        {Object.keys(knowledgeCheckSelectedAnswers).length} / {knowledgeCheckQuestions.length} answered
                      </div>
                    </div>
                    <div className="p-6">
                      {(() => {
                        const currentQ = knowledgeCheckQuestions[knowledgeCheckCurrentQuestion];
                        const selectedAnswer = knowledgeCheckSelectedAnswers[currentQ.id];
                        const showResult = knowledgeCheckShowResult[currentQ.id];
                        const isCorrect = selectedAnswer === currentQ.correctAnswer;

                        return (
                          <div className="space-y-4">
                            <div>
                              <p className="text-lg font-semibold text-neutral-800 mb-1">
                                {currentQ.type === "true-false" ? "True or False?" : currentQ.type === "multiple-choice" ? "Multiple Choice:" : "Fill in the Blanks:"}
                              </p>
                              <p className="text-neutral-700 text-base">{currentQ.question}</p>
                            </div>

                            <div className="space-y-2">
                              {currentQ.options.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                const isCorrectOption = option === currentQ.correctAnswer;

                                return (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      if (!showResult) {
                                        handleKnowledgeCheckAnswer(currentQ.id, option);
                                      }
                                    }}
                                    disabled={showResult}
                                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${showResult && isCorrectOption
                                      ? "border-green-500 bg-green-50 text-green-800 font-semibold"
                                      : showResult && isSelected && !isCorrectOption
                                        ? "border-red-500 bg-red-50 text-red-800"
                                        : isSelected && !showResult
                                          ? "border-blue-500 bg-blue-50 text-blue-800"
                                          : "border-slate-200 bg-white text-neutral-700 hover:border-slate-300 hover:bg-slate-50"
                                      } ${showResult ? "cursor-default" : "cursor-pointer"}`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{option}</span>
                                      {showResult && isCorrectOption && (
                                        <span className="text-green-600 font-bold text-lg">✅</span>
                                      )}
                                      {showResult && isSelected && !isCorrectOption && (
                                        <span className="text-red-600 font-bold text-lg">❌</span>
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {showResult && isCorrect && (
                              <div className="p-4 rounded-xl border-2 border-green-500 bg-green-50">
                                <p className="text-green-800 font-semibold">🎉 Correct! Great job!</p>
                              </div>
                            )}

                            {showResult && !isCorrect && (
                              <div className="p-4 rounded-xl border-2 border-red-300 bg-red-50">
                                <p className="text-red-800 font-semibold">❌ Not quite right. The correct answer is: <strong>{currentQ.correctAnswer}</strong></p>
                              </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex gap-3 items-center justify-between pt-4 border-t border-slate-200">
                              <Button
                                onClick={handleKnowledgeCheckBack}
                                disabled={knowledgeCheckCurrentQuestion === 0}
                                variant="outline"
                                className="border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                ← Back
                              </Button>
                              <div className="text-sm text-neutral-500">
                                {knowledgeCheckCurrentQuestion + 1} / {knowledgeCheckQuestions.length}
                              </div>
                              <Button
                                onClick={handleKnowledgeCheckNext}
                                disabled={knowledgeCheckCurrentQuestion === knowledgeCheckQuestions.length - 1}
                                variant="outline"
                                className="border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Next →
                              </Button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-green-500 bg-green-50 p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">🎉</span>
                      <div>
                        <h5 className="text-xl font-bold text-green-800">Perfect Score!</h5>
                        <p className="text-green-700">You've answered all {knowledgeCheckQuestions.length} questions correctly! You're mastering the fundamentals!</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleKnowledgeCheckReset}
                      variant="outline"
                      className="mt-4 border-green-300 hover:bg-green-100"
                    >
                      Try Again
                    </Button>
                  </div>
                )}
              </section>

              {/* Quick Summary */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">📚 Quick Summary</h4>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h5 className="text-lg font-semibold text-neutral-800 mb-2">🎯 What You Learned:</h5>
                  <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                    <li>Programming = Giving exact instructions to computers</li>
                    <li>Computers need step-by-step directions (no assumptions!)</li>
                    <li>This skill lets you build apps, websites, games, and more</li>
                    <li>You're starting the same journey as famous programmers</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h5 className="text-lg font-semibold text-neutral-800 mb-2">🚀 What's Coming Next:</h5>
                  <p className="text-neutral-700">In Step 2, you'll discover <strong>Why Python is the perfect first programming language</strong> and how it's used by companies like Google, NASA, and Netflix!</p>
                </div>
              </section>

              {/* Your First Achievement */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">🌟 Your First Achievement!</h4>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="font-semibold text-neutral-800 mb-2">🏆 ACHIEVEMENT UNLOCKED: "First Step Taken"</p>
                  <p className="text-neutral-700">+10 XP Points • Progress: 1/52 steps in Unit 1</p>
                  <p className="text-neutral-600 text-sm mt-2">Next Badge: "Python Enthusiast" (earn at Step 2)</p>
                  <div className="mt-3">
                    <p className="text-neutral-700 text-sm mb-1">📈 YOUR JOURNEY SO FAR: 2% Complete</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm mt-2 italic">"Every expert was once a beginner who didn't give up!"</p>
                </div>
              </section>

              {/* Pro Tip */}
              <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h4 className="text-2xl font-semibold text-neutral-800 mb-2">💡 Pro Tip for Success</h4>
                <p className="text-neutral-700 italic">
                  "Programming isn't about being smart - it's about being precise. The computer will do exactly what you tell it to do, so focus on giving clear, step-by-step instructions!"
                </p>
              </section>

              {/* Bonus Challenge */}
              <section className="space-y-4">
                <h4 className="text-2xl font-semibold text-neutral-800">🎮 Bonus Challenge</h4>
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-200">
                    <h5 className="text-lg font-semibold text-neutral-800">EXTRA CREDIT: Tie Your Shoelaces</h5>
                  </div>
                  <div className="p-6">
                    <p className="text-neutral-700 mb-3 font-semibold">Can you write instructions for "Tie your shoelaces"?</p>
                    <p className="text-sm text-neutral-600 mb-4 italic">💡 This is actually one of the most complex instruction sets in computer science!</p>

                    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                        <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-700 font-semibold">SELECT STEPS</span>
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-slate-500 mb-4 font-mono italic"># SELECT THE CORRECT STEPS IN ORDER:</div>
                        <div className="space-y-3">
                          {bonusSelections.map((selected, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <span className="text-slate-400 font-mono text-sm font-semibold min-w-[24px]">{index + 1}.</span>
                              <select
                                value={selected}
                                onChange={(e) => {
                                  const newSelections = [...bonusSelections];
                                  newSelections[index] = e.target.value;
                                  setBonusSelections(newSelections);
                                  setBonusChecked(false);
                                  setBonusCorrect(false);
                                }}
                                className={`flex-1 px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-neutral-700 transition-all hover:border-slate-300 ${bonusChecked && selected === bonusCorrectOrder[index]
                                  ? "border-green-500 bg-green-50"
                                  : bonusChecked && selected !== bonusCorrectOrder[index]
                                    ? "border-red-500 bg-red-50"
                                    : "border-slate-200"
                                  }`}
                                disabled={bonusCorrect}
                              >
                                <option value="">-- Select a step --</option>
                                {bonusOptions.map((option, optIndex) => (
                                  <option key={optIndex} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              {bonusChecked && selected === bonusCorrectOrder[index] && (
                                <span className="text-green-600 font-bold text-lg">✅</span>
                              )}
                              {bonusChecked && selected !== bonusCorrectOrder[index] && selected !== "" && (
                                <span className="text-red-600 font-bold text-lg">❌</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={handleBonusCheck}
                        disabled={bonusSelections.some(sel => sel === "") || bonusCorrect}
                        className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {bonusCorrect ? "✓ Correct!" : "Check Answer"}
                      </Button>
                      <Button
                        onClick={handleBonusReset}
                        variant="outline"
                        className="border-slate-300 hover:bg-slate-50"
                      >
                        Reset
                      </Button>
                    </div>

                    {bonusChecked && bonusCorrect && (
                      <div className="mt-4 p-6 rounded-xl border-2 border-purple-500 bg-purple-50 shadow-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-4xl">🏆</span>
                          <div>
                            <h5 className="text-xl font-bold text-purple-800">Amazing Work!</h5>
                            <p className="text-purple-700">You've mastered one of the most complex instruction sets! This is exactly how programmers think!</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {bonusChecked && !bonusCorrect && (
                      <div className="mt-4 p-4 rounded-xl border-2 border-red-300 bg-red-50">
                        <p className="text-red-800 font-semibold">❌ Not quite right. Try again! Check which steps are marked with ❌.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Ready for Next Step */}
              <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h4 className="text-2xl font-semibold text-neutral-800 mb-3">🚀 Ready for the Next Step?</h4>
                <p className="text-neutral-700 mb-3">You've just learned the fundamental concept that all programming is built on! In the next step, we'll explore why Python is the perfect language to start your coding journey.</p>
                <p className="text-neutral-700 italic mb-2">
                  <strong>"You don't have to be great to start, but you have to start to be great."</strong>
                </p>
                <p className="text-neutral-600 text-sm mt-3">*✅ <strong>Mark as Complete</strong> to unlock Step 2 and continue your coding adventure!*</p>
              </section>
            </div>
          )}

          {/* Python Basics Content - Step 2 */}
          {currentStep === 2 && (
            <div className="mt-8 space-y-10">
              <h3 className="text-3xl font-bold text-neutral-800 flex items-center gap-2">
                🐍 Why Python is the Perfect First Language
              </h3>

              {/* Learning Objectives */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">🎯 Learning Objectives</h4>
                <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                  <li>Discover why Python is loved by beginners AND experts</li>
                  <li>See real companies using Python today</li>
                  <li>Understand Python's key advantages over other languages</li>
                  <li>Get excited about what YOU can build with Python</li>
                </ul>
              </section>

              {/* Quick Motivation */}
              <section className="space-y-3 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-2xl font-semibold text-neutral-800">🚀 Quick Motivation</h4>
                <blockquote className="text-neutral-700 italic text-lg border-l-4 border-blue-500 pl-4">
                  "Python is the second most loved programming language in the world - and for good reason! It's the language that launched Instagram, powers NASA, and runs Netflix."
                </blockquote>
              </section>

              {/* Python in the Wild */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">🌍 Python in the Wild - Real Companies Using Python</h4>
                <p className="text-neutral-700 font-semibold text-lg mb-3">Tech Giants Love Python:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">🏢 Google</p>
                    <p className="text-neutral-600">"Python where we can, C++ where we must"</p>
                    <p className="text-sm text-neutral-500 mt-1">YouTube, Google Search, Google Cloud</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">🎬 Netflix</p>
                    <p className="text-neutral-600">Recommendation algorithms</p>
                    <p className="text-sm text-neutral-500 mt-1">Suggests what you'll love to watch</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">📸 Instagram</p>
                    <p className="text-neutral-600">World's largest Django app</p>
                    <p className="text-sm text-neutral-500 mt-1">1+ billion users on Python</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">🚀 NASA</p>
                    <p className="text-neutral-600">Space mission planning</p>
                    <p className="text-sm text-neutral-500 mt-1">Mars rover data analysis</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">🔬 Spotify</p>
                    <p className="text-neutral-600">Music recommendations</p>
                    <p className="text-sm text-neutral-500 mt-1">Your Discover Weekly playlist</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800">🤖 Tesla</p>
                    <p className="text-neutral-600">AI and self-driving features</p>
                    <p className="text-sm text-neutral-500 mt-1">Autopilot system development</p>
                  </div>
                </div>

                <h5 className="text-xl font-semibold text-neutral-800 mt-4">What They're Building:</h5>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <p className="text-neutral-700"><strong>Dropbox:</strong> File synchronization for millions</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <p className="text-neutral-700"><strong>Reddit:</strong> Community discussions platform</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <p className="text-neutral-700"><strong>Uber:</strong> Ride matching and pricing</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <p className="text-neutral-700"><strong>Pinterest:</strong> Image sharing and discovery</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:col-span-2">
                    <p className="text-neutral-700"><strong>Disney:</strong> Animation and special effects</p>
                  </div>
                </div>
              </section>

              {/* Core Concept */}
              <section className="space-y-4">
                <h4 className="text-2xl font-semibold text-neutral-800">💡 Core Concept: Python's Superpowers</h4>

                <h5 className="text-xl font-semibold text-neutral-800 mt-4">Python vs Other Languages - The Simplicity Factor</h5>
                <div className="overflow-x-auto mt-3">
                  <table className="min-w-full border-2 border-gray-300 rounded-lg shadow-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-100 to-purple-100">
                        <th className="border-2 border-gray-300 px-6 py-4 text-left font-semibold text-neutral-800 text-lg">Python (Simple & Clean)</th>
                        <th className="border-2 border-gray-300 px-6 py-4 text-left font-semibold text-neutral-800 text-lg">Other Languages (Complex)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border-2 border-gray-300 px-6 py-4 text-neutral-700 font-mono">print("Hello World")</td>
                        <td className="border-2 border-gray-300 px-6 py-4 text-neutral-700 font-mono">System.out.println("Hello World");</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                        <td className="border-2 border-gray-300 px-6 py-4 text-neutral-700 font-mono">age = 25</td>
                        <td className="border-2 border-gray-300 px-6 py-4 text-neutral-700 font-mono">int age = 25;</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border-2 border-gray-300 px-6 py-4 text-neutral-700 font-mono">if user_logged_in:</td>
                        <td className="border-2 border-gray-300 px-6 py-4 text-neutral-700 font-mono">if (userLoggedIn == true) {'{'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5 className="text-xl font-semibold text-neutral-800 mt-4">Why Python Reads Like English:</h5>
                <CodeSnippet
                  language="python"
                  code={`# Instead of complex syntax, Python uses simple words:

# Check if user can vote
if age >= 18:
    print("You can vote!")

# Ask for user's name
name = input("What's your name? ")

# Say hello
print(f"Hello, {name}!")`}
                  onRun={() => handleTryNow(`age = 20\nif age >= 18:\n    print("You can vote!")\nname = input("What's your name? ")\nprint(f"Hello, {name}!")`)}
                />
              </section>

              {/* Interactive Activity */}
              <section className="space-y-4">
                <h4 className="text-2xl font-semibold text-neutral-800">🎮 Interactive Activity: "Language Comparison"</h4>
                <h5 className="text-xl font-semibold text-neutral-800">See the Difference Yourself:</h5>
                <CodeSnippet
                  language="python"
                  code={`# TASK: Calculate the average of three numbers

# Python Version (YOUR TURN):
def calculate_average(a, b, c):
    return (a + b + c) / 3

# Java Version (COMPARE):
# public static double calculateAverage(double a, double b, double c) {
#     return (a + b + c) / 3.0;
# }

# C++ Version (COMPARE):
# double calculateAverage(double a, double b, double c) {
#     return (a + b + c) / 3;
# }`}
                  onRun={() => handleTryNow(`def calculate_average(a, b, c):\n    return (a + b + c) / 3\n\nresult = calculate_average(10, 20, 30)\nprint(f"Average: {result}")`)}
                />
                <p className="text-neutral-700 italic">💡 Which one is easiest to read and understand?</p>
              </section>

              {/* Python's Explosive Growth */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">📊 Python's Explosive Growth</h4>

                <h5 className="text-xl font-semibold text-neutral-800 mt-3">Why Companies Are Switching to Python:</h5>
                <div className="grid gap-4 md:grid-cols-3 mt-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800 mb-2">🚀 Speed of Development</p>
                    <p className="text-neutral-600">Write code 3-5x faster than other languages</p>
                    <p className="text-sm text-neutral-500 mt-1">Quick prototyping = faster to market</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800 mb-2">💰 Cost Effective</p>
                    <p className="text-neutral-600">Less code = fewer bugs = lower costs</p>
                    <p className="text-sm text-neutral-500 mt-1">Hired.com: "Python developers build features 40% faster"</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800 mb-2">🎯 Versatility</p>
                    <p className="text-neutral-600">One team can handle web, data, and automation</p>
                    <p className="text-sm text-neutral-500 mt-1">Stack Overflow: "Fastest-growing major language"</p>
                  </div>
                </div>

                <h5 className="text-xl font-semibold text-neutral-800 mt-4">Job Market Boom:</h5>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-neutral-700 mb-3 font-semibold">📈 Python Developer Demand (2020-2024):</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">2020</span>
                        <span className="text-sm text-neutral-700">100,000 jobs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">2021</span>
                        <span className="text-sm text-neutral-700">120,000 jobs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">2022</span>
                        <span className="text-sm text-neutral-700">150,000 jobs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">2023</span>
                        <span className="text-sm text-neutral-700">180,000 jobs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">2024</span>
                        <span className="text-sm text-neutral-700">200,000+ jobs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Immediate Practice */}
              <section className="space-y-6">
                <h4 className="text-2xl font-semibold text-neutral-800">🛠️ Immediate Practice</h4>

                {/* Exercise 1: Python Superpower Match */}
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <h5 className="text-lg font-semibold text-neutral-800">Exercise 1: Python Superpower Match</h5>
                  </div>
                  <div className="p-6">
                    <p className="text-neutral-700 mb-3">Match each Python advantage with its real benefit:</p>

                    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                        <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-700 font-semibold">SELECT MATCHES</span>
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-slate-500 mb-4 font-mono italic"># MATCH EACH ADVANTAGE WITH ITS BENEFIT:</div>
                        <div className="space-y-3">
                          {step2Exercise1Selections.map((selected, index) => {
                            const labels = [
                              "1. Simple Syntax",
                              "2. Huge Community",
                              "3. Many Libraries",
                              "4. Versatile",
                              "5. Fast Development"
                            ];
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <span className="text-slate-400 font-mono text-sm font-semibold min-w-[140px]">{labels[index]}</span>
                                <select
                                  value={selected}
                                  onChange={(e) => {
                                    const newSelections = [...step2Exercise1Selections];
                                    newSelections[index] = e.target.value;
                                    setStep2Exercise1Selections(newSelections);
                                    setStep2Exercise1Checked(false);
                                    setStep2Exercise1Correct(false);
                                  }}
                                  className={`flex-1 px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-neutral-700 transition-all hover:border-slate-300 ${step2Exercise1Checked && selected === step2Exercise1CorrectOrder[index]
                                    ? "border-green-500 bg-green-50"
                                    : step2Exercise1Checked && selected !== step2Exercise1CorrectOrder[index]
                                      ? "border-red-500 bg-red-50"
                                      : "border-slate-200"
                                    }`}
                                  disabled={step2Exercise1Correct}
                                >
                                  <option value="">-- Select a benefit --</option>
                                  {step2Exercise1Options.map((option, optIndex) => (
                                    <option key={optIndex} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                {step2Exercise1Checked && selected === step2Exercise1CorrectOrder[index] && (
                                  <span className="text-green-600 font-bold text-lg">✅</span>
                                )}
                                {step2Exercise1Checked && selected !== step2Exercise1CorrectOrder[index] && selected !== "" && (
                                  <span className="text-red-600 font-bold text-lg">❌</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={handleStep2Exercise1Check}
                        disabled={step2Exercise1Selections.some(sel => sel === "") || step2Exercise1Correct}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {step2Exercise1Correct ? "✓ Correct!" : "Check Answer"}
                      </Button>
                      <Button
                        onClick={handleStep2Exercise1Reset}
                        variant="outline"
                        className="border-slate-300 hover:bg-slate-50"
                      >
                        Reset
                      </Button>
                    </div>

                    {step2Exercise1Checked && step2Exercise1Correct && (
                      <div className="mt-4 p-4 rounded-xl border-2 border-green-500 bg-green-50">
                        <p className="text-green-800 font-semibold">🎉 Perfect! You understand Python's advantages!</p>
                      </div>
                    )}

                    {step2Exercise1Checked && !step2Exercise1Correct && (
                      <div className="mt-4 p-4 rounded-xl border-2 border-red-300 bg-red-50">
                        <p className="text-red-800 font-semibold">❌ Not quite right. Try again! Check which matches are marked with ❌.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Exercise 2: Your Python Future */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h5 className="text-lg font-semibold text-neutral-800 mb-3">Exercise 2: Your Python Future</h5>
                  <p className="text-neutral-700 mb-3">Circle 2-3 areas that excite YOU most:</p>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm text-neutral-700 space-y-2">
                    <p>[🌐] Web Development (Build websites & apps)</p>
                    <p>[📊] Data Science (Find insights in data)</p>
                    <p>[🤖] AI & Machine Learning (Create smart systems)</p>
                    <p>[🛠️] Automation (Make computers work for you)</p>
                    <p>[🎮] Game Development (Create fun games)</p>
                    <p>[🔬] Scientific Computing (Solve complex problems)</p>
                  </div>
                  <p className="text-neutral-700 mt-3 italic">Why these areas interest you: ________________________________</p>
                </div>

                {/* Exercise 3: Company Match Game */}
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <h5 className="text-lg font-semibold text-neutral-800">Exercise 3: Company Match Game</h5>
                  </div>
                  <div className="p-6">
                    <p className="text-neutral-700 mb-3">Match the company with what they use Python for:</p>

                    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                        <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-700 font-semibold">SELECT MATCHES</span>
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-slate-500 mb-4 font-mono italic"># MATCH EACH COMPANY WITH ITS USE:</div>
                        <div className="space-y-3">
                          {step2Exercise2Selections.map((selected, index) => {
                            const labels = ["1. Netflix", "2. Instagram", "3. NASA", "4. Tesla"];
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <span className="text-slate-400 font-mono text-sm font-semibold min-w-[100px]">{labels[index]}</span>
                                <select
                                  value={selected}
                                  onChange={(e) => {
                                    const newSelections = [...step2Exercise2Selections];
                                    newSelections[index] = e.target.value;
                                    setStep2Exercise2Selections(newSelections);
                                    setStep2Exercise2Checked(false);
                                    setStep2Exercise2Correct(false);
                                  }}
                                  className={`flex-1 px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-neutral-700 transition-all hover:border-slate-300 ${step2Exercise2Checked && selected === step2Exercise2CorrectOrder[index]
                                    ? "border-green-500 bg-green-50"
                                    : step2Exercise2Checked && selected !== step2Exercise2CorrectOrder[index]
                                      ? "border-red-500 bg-red-50"
                                      : "border-slate-200"
                                    }`}
                                  disabled={step2Exercise2Correct}
                                >
                                  <option value="">-- Select a use case --</option>
                                  {step2Exercise2Options.map((option, optIndex) => (
                                    <option key={optIndex} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                {step2Exercise2Checked && selected === step2Exercise2CorrectOrder[index] && (
                                  <span className="text-green-600 font-bold text-lg">✅</span>
                                )}
                                {step2Exercise2Checked && selected !== step2Exercise2CorrectOrder[index] && selected !== "" && (
                                  <span className="text-red-600 font-bold text-lg">❌</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={handleStep2Exercise2Check}
                        disabled={step2Exercise2Selections.some(sel => sel === "") || step2Exercise2Correct}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {step2Exercise2Correct ? "✓ Correct!" : "Check Answer"}
                      </Button>
                      <Button
                        onClick={handleStep2Exercise2Reset}
                        variant="outline"
                        className="border-slate-300 hover:bg-slate-50"
                      >
                        Reset
                      </Button>
                    </div>

                    {step2Exercise2Checked && step2Exercise2Correct && (
                      <div className="mt-4 p-4 rounded-xl border-2 border-green-500 bg-green-50">
                        <p className="text-green-800 font-semibold">🎉 Excellent! You know which companies use Python!</p>
                      </div>
                    )}

                    {step2Exercise2Checked && !step2Exercise2Correct && (
                      <div className="mt-4 p-4 rounded-xl border-2 border-red-300 bg-red-50">
                        <p className="text-red-800 font-semibold">❌ Not quite right. Try again! Check which matches are marked with ❌.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Career Spotlight */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">💼 Career Spotlight</h4>

                <h5 className="text-xl font-semibold text-neutral-800 mt-3">Python Jobs & Salaries (US Market):</h5>
                <div className="overflow-x-auto mt-3">
                  <table className="min-w-full border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-100 to-blue-100">
                        <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-neutral-800 text-lg">Role</th>
                        <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-neutral-800 text-lg">Salary Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-neutral-800">💼 Entry Level Developer</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">$70,000 - $90,000</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-neutral-800">💼 Data Analyst</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">$80,000 - $110,000</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-neutral-800">💼 Web Developer</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">$85,000 - $120,000</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-neutral-800">💼 Machine Learning Engineer</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">$120,000 - $180,000</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-neutral-800">💼 Senior Python Developer</td>
                        <td className="border border-gray-300 px-6 py-4 text-neutral-700">$130,000 - $160,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5 className="text-xl font-semibold text-neutral-800 mt-4">Success Stories:</h5>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800 mb-2">👩💻 Sarah - From Teacher to Developer</p>
                    <p className="text-neutral-600 text-sm">Learned Python in 6 months. Now works as Data Analyst at Spotify. "Python changed my life and career!"</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800 mb-2">👨💻 Mike - Automation Specialist</p>
                    <p className="text-neutral-600 text-sm">Automated his boring Excel tasks. Got promoted with 40% salary increase. "Python made me the office hero!"</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-neutral-800 mb-2">👩🔬 Dr. Chen - Medical Researcher</p>
                    <p className="text-neutral-600 text-sm">Used Python for COVID data analysis. Published groundbreaking research. "Python helped save lives during the pandemic"</p>
                  </div>
                </div>
              </section>

              {/* Knowledge Check */}
              <section className="space-y-4">
                <h4 className="text-2xl font-semibold text-neutral-800">🎯 Knowledge Check</h4>

                {!step2KnowledgeCheckAllComplete ? (
                  <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                      <h5 className="text-lg font-semibold text-neutral-800">
                        Question {step2KnowledgeCheckCurrentQuestion + 1} of {step2KnowledgeCheckQuestions.length}
                      </h5>
                      <div className="text-sm text-neutral-600">
                        {Object.keys(step2KnowledgeCheckSelectedAnswers).length} / {step2KnowledgeCheckQuestions.length} answered
                      </div>
                    </div>
                    <div className="p-6">
                      {(() => {
                        const currentQ = step2KnowledgeCheckQuestions[step2KnowledgeCheckCurrentQuestion];
                        const selectedAnswer = step2KnowledgeCheckSelectedAnswers[currentQ.id];
                        const showResult = step2KnowledgeCheckShowResult[currentQ.id];
                        const isCorrect = selectedAnswer === currentQ.correctAnswer;

                        return (
                          <div className="space-y-4">
                            <div>
                              <p className="text-lg font-semibold text-neutral-800 mb-1">
                                {currentQ.type === "true-false" ? "True or False?" : currentQ.type === "multiple-choice" ? "Multiple Choice:" : "Fill in the Blanks:"}
                              </p>
                              <p className="text-neutral-700 text-base">{currentQ.question}</p>
                            </div>

                            <div className="space-y-2">
                              {currentQ.options.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                const isCorrectOption = option === currentQ.correctAnswer;

                                return (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      if (!showResult) {
                                        handleStep2KnowledgeCheckAnswer(currentQ.id, option);
                                      }
                                    }}
                                    disabled={showResult}
                                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${showResult && isCorrectOption
                                      ? "border-green-500 bg-green-50 text-green-800 font-semibold"
                                      : showResult && isSelected && !isCorrectOption
                                        ? "border-red-500 bg-red-50 text-red-800"
                                        : isSelected && !showResult
                                          ? "border-blue-500 bg-blue-50 text-blue-800"
                                          : "border-slate-200 bg-white text-neutral-700 hover:border-slate-300 hover:bg-slate-50"
                                      } ${showResult ? "cursor-default" : "cursor-pointer"}`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{option}</span>
                                      {showResult && isCorrectOption && (
                                        <span className="text-green-600 font-bold text-lg">✅</span>
                                      )}
                                      {showResult && isSelected && !isCorrectOption && (
                                        <span className="text-red-600 font-bold text-lg">❌</span>
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {showResult && isCorrect && (
                              <div className="p-4 rounded-xl border-2 border-green-500 bg-green-50">
                                <p className="text-green-800 font-semibold">🎉 Correct! Great job!</p>
                              </div>
                            )}

                            {showResult && !isCorrect && (
                              <div className="p-4 rounded-xl border-2 border-red-300 bg-red-50">
                                <p className="text-red-800 font-semibold">❌ Not quite right. The correct answer is: <strong>{currentQ.correctAnswer}</strong></p>
                              </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex gap-3 items-center justify-between pt-4 border-t border-slate-200">
                              <Button
                                onClick={handleStep2KnowledgeCheckBack}
                                disabled={step2KnowledgeCheckCurrentQuestion === 0}
                                variant="outline"
                                className="border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                ← Back
                              </Button>
                              <div className="text-sm text-neutral-500">
                                {step2KnowledgeCheckCurrentQuestion + 1} / {step2KnowledgeCheckQuestions.length}
                              </div>
                              <Button
                                onClick={handleStep2KnowledgeCheckNext}
                                disabled={step2KnowledgeCheckCurrentQuestion === step2KnowledgeCheckQuestions.length - 1}
                                variant="outline"
                                className="border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Next →
                              </Button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-green-500 bg-green-50 p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">🎉</span>
                      <div>
                        <h5 className="text-xl font-bold text-green-800">Perfect Score!</h5>
                        <p className="text-green-700">You've answered all {step2KnowledgeCheckQuestions.length} questions correctly! You're mastering Python fundamentals!</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleStep2KnowledgeCheckReset}
                      variant="outline"
                      className="mt-4 border-green-300 hover:bg-green-100"
                    >
                      Try Again
                    </Button>
                  </div>
                )}
              </section>

              {/* Quick Summary */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">📚 Quick Summary</h4>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h5 className="text-lg font-semibold text-neutral-800 mb-2">🎯 Key Takeaways:</h5>
                  <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                    <li>Python is used by top companies worldwide</li>
                    <li>Simple syntax = faster learning and development</li>
                    <li>Huge community = free help always available</li>
                    <li>Versatile = one language for web, data, AI, automation</li>
                    <li>High demand = excellent career opportunities</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h5 className="text-lg font-semibold text-neutral-800 mb-2">🚀 What's Coming Next:</h5>
                  <p className="text-neutral-700">In Step 3, you'll <strong>install Python on your computer</strong> and write your first real program!</p>
                </div>
              </section>

              {/* Achievement Unlocked */}
              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-neutral-800">🌟 Achievement Unlocked!</h4>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="font-semibold text-neutral-800 mb-2">🏆 ACHIEVEMENT UNLOCKED: "Python Enthusiast"</p>
                  <p className="text-neutral-700">+15 XP Points • Progress: 2/52 steps in Unit 1</p>
                  <p className="text-neutral-600 text-sm mt-2">Next Badge: "Environment Setup Pro" (earn at Step 3)</p>
                  <div className="mt-3">
                    <p className="text-neutral-700 text-sm mb-1">📈 YOUR JOURNEY SO FAR: 4% Complete</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '4%' }}></div>
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm mt-2 italic">"Get ready to install Python and write your first real program!"</p>
                </div>
              </section>

              {/* Pro Tip */}
              <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h4 className="text-2xl font-semibold text-neutral-800 mb-2">💡 Pro Tip for Success</h4>
                <p className="text-neutral-700 italic">
                  "Don't worry about which language is 'the best' - focus on which language helps you build what you want. Python lets you start building real projects quickly, which is the fastest way to learn!"
                </p>
              </section>

              {/* Bonus Challenge */}
              <section className="space-y-4">
                <h4 className="text-2xl font-semibold text-neutral-800">🎮 Bonus Challenge: Future Vision</h4>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-neutral-700 mb-3 font-semibold">IMAGINE: What could YOU build with Python?</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-neutral-700">🌐 Web Application: "A social platform for book lovers"</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-neutral-700">📊 Data Tool: "Analyze your spending habits"</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-neutral-700">🤖 AI Project: "A chatbot that helps with homework"</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-neutral-700">🛠️ Automation: "A script that organizes your photos"</p>
                    </div>
                  </div>
                  <p className="text-neutral-700 mt-3 italic">💭 MY IDEA: ________________________________</p>
                </div>
              </section>

              {/* Ready for Hands-On Coding */}
              <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h4 className="text-2xl font-semibold text-neutral-800 mb-3">🚀 Ready for Hands-On Coding?</h4>
                <p className="text-neutral-700 mb-3">In the next step, you'll roll up your sleeves and get Python running on your own computer. This is where the real fun begins!</p>
                <p className="text-neutral-700 italic mb-2">
                  <strong>"The expert in anything was once a beginner. You're just a few steps away from writing code that could change the world!"</strong>
                </p>
                <p className="text-neutral-600 text-sm mt-3">*✅ <strong>Mark as Complete</strong> to unlock Step 3 and start your coding journey!*</p>
              </section>
            </div>
          )}

          {/* Python Setup Content - Step 3 */}
          {currentStep === 3 && (
            <div className="mt-8 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-20 h-20 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-3 relative z-10">
                  <span className="text-4xl">🐍</span> Setting Up Python
                </h3>
                <p className="text-lg text-neutral-600 mt-2 font-medium">Your journey to becoming a developer starts here.</p>
              </div>

              {/* Learning Objectives */}
              <section className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
                <h4 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg text-sm">🎯</span>
                  Learning Objectives
                </h4>
                <div className="grid md:grid-cols-2 gap-4 relative z-10">
                  {[
                    "Install Python on your computer",
                    "Set up a professional code editor",
                    "Write your first real program",
                    "Troubleshoot common issues"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-xs font-bold">✓</span>
                      </div>
                      <span className="text-neutral-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Start Motivation */}
              <section className="bg-gradient-to-r from-indigo-600 to-blue-600 p-1 rounded-2xl shadow-lg shadow-indigo-200">
                <div className="bg-white rounded-xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-3">
                        🚀 Quick Start Motivation
                      </h4>
                      <blockquote className="text-neutral-600 text-lg leading-relaxed">
                        "This is the moment you become a real programmer! In the next 15 minutes, you'll have a professional coding environment ready to build amazing things."
                      </blockquote>
                    </div>
                    <div className="hidden md:block text-8xl opacity-20 select-none">💻</div>
                  </div>
                </div>
              </section>

              {/* Part 1: Installing Python */}
              <section className="space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
                    1
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-neutral-800">Install Python</h4>
                    <p className="text-sm text-neutral-500">Choose your operating system below</p>
                  </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                  {/* Windows Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-white rounded-3xl border-2 border-blue-100 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-3xl"></div>

                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-4xl">
                          🪟
                        </div>
                        <div>
                          <h5 className="text-2xl font-bold text-neutral-800">Windows</h5>
                          <p className="text-xs text-neutral-500">For Windows 10/11</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                          <div>
                            <p className="text-sm text-neutral-600">Visit <a href="https://python.org/downloads" target="_blank" className="text-blue-600 font-semibold hover:underline">python.org/downloads</a></p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                          <p className="text-sm text-neutral-600">Click <span className="font-semibold text-neutral-800">"Download Python 3.x.x"</span></p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                          <p className="text-sm text-neutral-600">Run the installer</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">!</div>
                          <p className="text-sm font-bold text-red-600">CRITICAL: Check "Add Python to PATH"</p>
                        </div>
                      </div>

                      {/* Terminal */}
                      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                        <div className="bg-slate-800 px-3 py-2 flex items-center gap-2 border-b border-slate-700">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono ml-2">Command Prompt</span>
                        </div>
                        <div className="p-3 font-mono text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-400">{'>'}</span>
                            <span className="text-green-400">python</span>
                            <span className="text-slate-300">--version</span>
                          </div>
                          <div className="text-slate-400 mt-1 text-[11px]">Python 3.12.1</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* macOS Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-500 to-gray-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-500 to-gray-400 rounded-t-3xl"></div>

                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-4xl">
                          🍎
                        </div>
                        <div>
                          <h5 className="text-2xl font-bold text-neutral-800">macOS</h5>
                          <p className="text-xs text-neutral-500">For Mac computers</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-slate-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                          <div>
                            <p className="text-sm text-neutral-600">Visit <a href="https://python.org/downloads" target="_blank" className="text-blue-600 font-semibold hover:underline">python.org/downloads</a></p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-slate-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                          <p className="text-sm text-neutral-600">Download <span className="font-semibold text-neutral-800">macOS installer</span></p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-slate-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                          <p className="text-sm text-neutral-600">Open the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">.pkg</code> file</p>
                        </div>
                      </div>

                      {/* Terminal */}
                      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                        <div className="bg-slate-800 px-3 py-2 flex items-center gap-2 border-b border-slate-700">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono ml-2">Terminal</span>
                        </div>
                        <div className="p-3 font-mono text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-green-400">$</span>
                            <span className="text-green-400">python3</span>
                            <span className="text-slate-300">--version</span>
                          </div>
                          <div className="text-slate-400 mt-1 text-[11px]">Python 3.12.1</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Linux Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-white rounded-3xl border-2 border-orange-100 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-t-3xl"></div>

                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-4xl">
                          🐧
                        </div>
                        <div>
                          <h5 className="text-2xl font-bold text-neutral-800">Linux</h5>
                          <p className="text-xs text-neutral-500">Ubuntu, Fedora, etc.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Ubuntu */}
                        <div>
                          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            Ubuntu / Debian
                          </p>
                          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                            <div className="bg-slate-800 px-3 py-1.5 border-b border-slate-700">
                              <span className="text-[9px] text-slate-400 font-mono">bash</span>
                            </div>
                            <div className="p-3 font-mono text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-green-400">$</span>
                                <span className="text-pink-400">sudo</span>
                                <span className="text-green-400">apt</span>
                                <span className="text-slate-300">install python3</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Fedora */}
                        <div>
                          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            Fedora / RHEL
                          </p>
                          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                            <div className="bg-slate-800 px-3 py-1.5 border-b border-slate-700">
                              <span className="text-[9px] text-slate-400 font-mono">bash</span>
                            </div>
                            <div className="p-3 font-mono text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-green-400">$</span>
                                <span className="text-pink-400">sudo</span>
                                <span className="text-green-400">dnf</span>
                                <span className="text-slate-300">install python3</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Verification Check */}
              <section className="bg-slate-900 rounded-2xl p-6 shadow-2xl shadow-slate-900/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <h4 className="text-white font-mono mb-4 flex items-center gap-2">
                  <span className="text-green-400">➜</span> Verification
                </h4>
                <div className="font-mono text-sm space-y-2">
                  <p className="text-slate-400"># Check if installed correctly:</p>
                  <div className="flex gap-2">
                    <span className="text-green-400">$</span>
                    <span className="text-white">python --version</span>
                  </div>
                  <p className="text-slate-500"># Output should look like:</p>
                  <p className="text-yellow-300">Python 3.12.1</p>
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-xs">
                    🎉 If you see the version number, you are ready!
                  </div>
                </div>
              </section>

              {/* Part 2: Choose Your Code Editor */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">2</div>
                  <h4 className="text-2xl font-bold text-neutral-800">Choose Your Weapon (Editor)</h4>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {/* VS Code */}
                  <div className="relative bg-gradient-to-b from-blue-600 to-blue-700 rounded-2xl p-1 shadow-xl shadow-blue-200 transform hover:scale-105 transition-all duration-300">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                      RECOMMENDED
                    </div>
                    <div className="bg-white rounded-xl p-6 h-full flex flex-col">
                      <h5 className="text-xl font-bold text-blue-700 mb-2">VS Code</h5>
                      <p className="text-sm text-neutral-500 mb-4">The industry standard. Powerful, beautiful, and free.</p>
                      <ul className="space-y-2 text-sm text-neutral-700 mb-6 flex-1">
                        <li className="flex gap-2 items-center"><span className="text-blue-500">✓</span> Professional grade</li>
                        <li className="flex gap-2 items-center"><span className="text-blue-500">✓</span> Huge ecosystem</li>
                        <li className="flex gap-2 items-center"><span className="text-blue-500">✓</span> Great Python support</li>
                      </ul>
                      <a href="https://code.visualstudio.com" target="_blank" className="block text-center bg-blue-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                        Download VS Code
                      </a>
                    </div>
                  </div>

                  {/* Thonny */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                    <h5 className="text-xl font-bold text-green-700 mb-2">Thonny</h5>
                    <p className="text-sm text-neutral-500 mb-4">Designed specifically for beginners.</p>
                    <ul className="space-y-2 text-sm text-neutral-700 mb-6">
                      <li className="flex gap-2 items-center"><span className="text-green-500">✓</span> Zero setup</li>
                      <li className="flex gap-2 items-center"><span className="text-green-500">✓</span> Simple interface</li>
                      <li className="flex gap-2 items-center"><span className="text-green-500">✓</span> Built-in Python</li>
                    </ul>
                    <a href="https://thonny.org" target="_blank" className="block text-center bg-slate-100 text-neutral-700 py-2 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-colors">
                      Download Thonny
                    </a>
                  </div>

                  {/* IDLE */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                    <h5 className="text-xl font-bold text-neutral-700 mb-2">IDLE</h5>
                    <p className="text-sm text-neutral-500 mb-4">The default editor that comes with Python.</p>
                    <ul className="space-y-2 text-sm text-neutral-700 mb-6">
                      <li className="flex gap-2 items-center"><span className="text-neutral-400">✓</span> No download needed</li>
                      <li className="flex gap-2 items-center"><span className="text-neutral-400">✓</span> Very lightweight</li>
                      <li className="flex gap-2 items-center"><span className="text-neutral-400">✓</span> Good for quick tests</li>
                    </ul>
                    <div className="block text-center bg-slate-50 text-neutral-400 py-2 rounded-lg font-semibold text-sm cursor-default">
                      Already Installed
                    </div>
                  </div>
                </div>
              </section>

              {/* Interactive Setup Guide */}
              <section className="space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">3</div>
                  <h4 className="text-2xl font-bold text-neutral-800">Interactive Setup Mission</h4>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Checklist */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <h5 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                        <span className="text-xl">📋</span> Mission Checklist
                      </h5>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                        {Math.round((Object.values(step3Checklist).filter(Boolean).length / 5) * 100)}% Ready
                      </span>
                    </div>

                    <div className="space-y-4 flex-1">
                      {[
                        { key: 'pythonInstalled', label: 'Python installed (python --version works)' },
                        { key: 'editorInstalled', label: 'Code editor installed' },
                        { key: 'fileCreated', label: 'First test program created' },
                        { key: 'programRan', label: 'Program runs successfully' },
                        { key: 'outputSeen', label: 'You can see the output' }
                      ].map((item) => (
                        <label key={item.key} className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer group ${step3Checklist[item.key as keyof typeof step3Checklist] ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-md'}`}>
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${step3Checklist[item.key as keyof typeof step3Checklist] ? 'bg-green-500 border-green-500' : 'border-slate-300 bg-white group-hover:border-blue-400'}`}>
                            {step3Checklist[item.key as keyof typeof step3Checklist] && <span className="text-white text-sm font-bold">✓</span>}
                          </div>
                          <input
                            type="checkbox"
                            checked={step3Checklist[item.key as keyof typeof step3Checklist]}
                            onChange={(e) => setStep3Checklist({ ...step3Checklist, [item.key]: e.target.checked })}
                            className="hidden"
                          />
                          <span className={`font-medium ${step3Checklist[item.key as keyof typeof step3Checklist] ? 'text-green-800' : 'text-neutral-600'}`}>
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(Object.values(step3Checklist).filter(Boolean).length / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Terminal Simulator */}
                  <div className="bg-[#1e1e1e] rounded-2xl shadow-2xl shadow-black/30 overflow-hidden flex flex-col h-[400px] border border-slate-800 ring-4 ring-slate-900/10">
                    <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-[#3d3d3d]">
                      <div className="flex gap-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                      </div>
                      <div className="text-gray-400 text-xs font-mono flex-1 text-center font-medium">Terminal — python</div>
                    </div>

                    <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar space-y-1">
                      {step3TerminalHistory.map((line, i) => (
                        <div key={i} className={`${line.type === 'input' ? 'text-white font-bold mt-2' : 'text-gray-400'}`}>
                          {line.type === 'input' ? <span className="text-green-400 mr-2">➜ ~</span> : ''}{line.content}
                        </div>
                      ))}
                      <form onSubmit={handleStep3TerminalSubmit} className="flex items-center mt-2">
                        <span className="text-green-400 mr-2">➜ ~</span>
                        <input
                          type="text"
                          value={step3TerminalInput}
                          onChange={(e) => setStep3TerminalInput(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm p-0 focus:ring-0 placeholder-gray-600"
                          placeholder="Try: python --version"
                          autoComplete="off"
                          autoFocus
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </section>

              {/* Your First Real Program */}
              <section className="space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-200">
                    4
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-neutral-800">Your First Real Program</h4>
                    <p className="text-sm text-neutral-500">Let's create your very first Python script!</p>
                  </div>
                </div>

                {/* Steps Card */}
                <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-8 border-b border-slate-200">
                    <h5 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                      <span className="text-2xl">💻</span> Let's write some code!
                    </h5>
                    <div className="space-y-4">
                      {/* Step 1 */}
                      <div className="flex gap-4 items-start group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md shadow-blue-200">
                          1
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-800 mb-1">Open your code editor</p>
                          <p className="text-sm text-neutral-600">VS Code, Thonny, or IDLE</p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex gap-4 items-start group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md shadow-blue-200">
                          2
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-800 mb-1">Create a new file and save it as</p>
                          <code className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-3 py-1.5 rounded-lg font-mono font-bold text-sm border border-orange-200 inline-block">
                            first_program.py
                          </code>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex gap-4 items-start group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md shadow-blue-200">
                          3
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-800">Type the code below exactly as shown:</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code Area */}
                  <div className="bg-slate-950 p-6 md:p-8">
                    <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-slate-800/50">
                      <CodeSnippet
                        language="python"
                        code={`print("🎉 Welcome to Python Programming!")
print("This is MY first program!")
print("I can write code now!")
print("The future starts here! 🚀")`}
                        onRun={(code) => handleTryNow(code)}
                      />
                    </div>
                  </div>

                  {/* Run Instruction */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 border-t border-blue-100">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-blue-300">
                        <span className="text-2xl">🚀</span>
                      </div>
                      <div className="flex-1">
                        <h6 className="text-lg font-bold text-neutral-800 mb-2">Run it!</h6>
                        <p className="text-neutral-600 mb-3">
                          Press <kbd className="bg-white px-2 py-1 rounded border border-slate-300 font-mono text-xs shadow-sm">F5</kbd> or click the Run button in your editor
                        </p>
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-blue-200 shadow-sm">
                          <code className="font-mono text-sm font-semibold text-blue-700">python first_program.py</code>
                          <span className="text-neutral-400">→</span>
                          <span className="text-xs text-neutral-500">Execute your program</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Practice Time */}
              <section className="space-y-6">
                <h4 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                  <span className="text-3xl">🛠️</span> Practice Time
                </h4>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
                    <h5 className="text-lg font-bold text-neutral-800 mb-2">Exercise 1: Personalize It</h5>
                    <p className="text-neutral-600 text-sm mb-4">Make the program about YOU. Fill in the blanks:</p>
                    <div className="rounded-xl overflow-hidden border border-slate-200">
                      <CodeSnippet
                        language="python"
                        code={`print("My name is: __________")
print("I love: __________")
print("Fun fact: __________")`}
                        onRun={(code) => handleTryNow(code)}
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🧮</div>
                    <h5 className="text-lg font-bold text-neutral-800 mb-2">Exercise 2: Calculator</h5>
                    <p className="text-neutral-600 text-sm mb-4">Python is a powerful calculator. Try this:</p>
                    <div className="rounded-xl overflow-hidden border border-slate-200">
                      <CodeSnippet
                        language="python"
                        code={`print("Math Time! 🧮")
print(5 + 3)
print(10 - 2)
print(4 * 2) 
print(16 / 2)`}
                        onRun={(code) => handleTryNow(code)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Troubleshooting */}
              <section className="space-y-6">
                <h4 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                  <span className="text-3xl">🔍</span> Troubleshooting
                </h4>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="bg-red-50 rounded-2xl border border-red-100 p-6 shadow-sm hover:shadow-md transition-all">
                    <h5 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                      <span>🚫</span> "python not found"
                    </h5>
                    <p className="text-sm text-red-700 leading-relaxed">
                      <strong>Windows:</strong> You likely missed "Add to PATH" during install. Reinstall and check that box!
                      <br /><br />
                      <strong>Mac/Linux:</strong> Try typing <code>python3</code> instead.
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-2xl border border-orange-100 p-6 shadow-sm hover:shadow-md transition-all">
                    <h5 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                      <span>📄</span> File won't run
                    </h5>
                    <p className="text-sm text-orange-700 leading-relaxed">
                      Did you save it? Is it named <code>.py</code>? Are you in the right folder in terminal?
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-2xl border border-yellow-100 p-6 shadow-sm hover:shadow-md transition-all">
                    <h5 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                      <span>🤔</span> Editor issues
                    </h5>
                    <p className="text-sm text-yellow-700 leading-relaxed">
                      VS Code too complex? Switch to <strong>Thonny</strong> for now. It's much simpler!
                    </p>
                  </div>
                </div>
              </section>

              {/* Success Meter */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8">
                <h4 className="text-xl font-bold text-neutral-800 mb-6 text-center">How confident do you feel?</h4>

                <div className="relative pt-6 pb-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="20"
                    value={step3Confidence}
                    onChange={(e) => setStep3Confidence(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs font-bold text-neutral-400 mt-4 uppercase tracking-wider">
                    <span>Help!</span>
                    <span>Unsure</span>
                    <span>Okay</span>
                    <span>Good</span>
                    <span>Pro!</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-block bg-blue-50 text-blue-700 px-6 py-2 rounded-full font-bold text-lg animate-bounce">
                    {step3Confidence === 0 ? "Let's do this! 💪" :
                      step3Confidence === 20 ? "We'll get there! 🚧" :
                        step3Confidence === 40 ? "Making progress... 🚶" :
                          step3Confidence === 60 ? "Getting the hang of it! 👍" :
                            step3Confidence === 80 ? "Feeling good! 😎" :
                              "I'm a Python Master! 🚀"}
                  </div>
                </div>
              </section>

              {/* Knowledge Check */}
              <section className="space-y-6">
                <h4 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                  <span className="text-3xl">🧠</span> Knowledge Check
                </h4>

                {!step3KnowledgeCheckAllComplete ? (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                      <span className="font-bold text-slate-700">Question {step3KnowledgeCheckCurrentQuestion + 1} of {step3KnowledgeCheckQuestions.length}</span>
                      <div className="flex gap-1">
                        {step3KnowledgeCheckQuestions.map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i < step3KnowledgeCheckCurrentQuestion ? 'bg-green-500' : i === step3KnowledgeCheckCurrentQuestion ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      {(() => {
                        const currentQ = step3KnowledgeCheckQuestions[step3KnowledgeCheckCurrentQuestion];
                        const selectedAnswer = step3KnowledgeCheckSelectedAnswers[currentQ.id];
                        const showResult = step3KnowledgeCheckShowResult[currentQ.id];
                        const isCorrect = selectedAnswer === currentQ.correctAnswer;

                        return (
                          <div className="space-y-6">
                            <div>
                              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded mb-2 uppercase tracking-wide">
                                {currentQ.type === "true-false" ? "True / False" : currentQ.type === "multiple-choice" ? "Multiple Choice" : "Fill in the Blank"}
                              </span>
                              <h5 className="text-xl font-bold text-neutral-800">{currentQ.question}</h5>
                            </div>

                            <div className="grid gap-3">
                              {currentQ.options.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                const isCorrectOption = option === currentQ.correctAnswer;

                                let buttonStyle = "border-slate-200 hover:border-blue-300 hover:bg-blue-50";
                                if (showResult) {
                                  if (isCorrectOption) buttonStyle = "border-green-500 bg-green-50 ring-1 ring-green-500";
                                  else if (isSelected) buttonStyle = "border-red-500 bg-red-50 ring-1 ring-red-500";
                                  else buttonStyle = "border-slate-100 opacity-50";
                                } else if (isSelected) {
                                  buttonStyle = "border-blue-500 bg-blue-50 ring-1 ring-blue-500";
                                }

                                return (
                                  <button
                                    key={index}
                                    onClick={() => !showResult && handleStep3KnowledgeCheckAnswer(currentQ.id, option)}
                                    disabled={showResult}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${buttonStyle}`}
                                  >
                                    <span className={`font-medium ${showResult && isCorrectOption ? 'text-green-900' : 'text-neutral-700'}`}>{option}</span>
                                    {showResult && isCorrectOption && <span className="text-xl">✅</span>}
                                    {showResult && isSelected && !isCorrectOption && <span className="text-xl">❌</span>}
                                  </button>
                                );
                              })}
                            </div>

                            {showResult && (
                              <div className={`p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                <span className="text-2xl">{isCorrect ? '🎉' : '💡'}</span>
                                <div>
                                  <p className="font-bold">{isCorrect ? 'Correct!' : 'Not quite.'}</p>
                                  {!isCorrect && <p className="text-sm mt-1">The correct answer is: <strong>{currentQ.correctAnswer}</strong></p>}
                                </div>
                              </div>
                            )}

                            <div className="flex justify-between pt-6 border-t border-slate-100">
                              <Button
                                onClick={handleStep3KnowledgeCheckBack}
                                disabled={step3KnowledgeCheckCurrentQuestion === 0}
                                variant="ghost"
                                className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
                              >
                                ← BACK
                              </Button>
                              <Button
                                onClick={handleStep3KnowledgeCheckNext}
                                disabled={!showResult || step3KnowledgeCheckCurrentQuestion === step3KnowledgeCheckQuestions.length - 1}
                                className="bg-emerald-400 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-emerald-400/30 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                              >
                                NEXT QUESTION →
                              </Button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 opacity-10 animate-pulse"></div>

                    <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl p-12 text-white text-center shadow-2xl shadow-green-500/40">
                      {/* Confetti Emojis */}
                      <div className="absolute top-4 left-4 text-4xl animate-bounce">🎊</div>
                      <div className="absolute top-8 right-8 text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</div>
                      <div className="absolute bottom-8 left-12 text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>⭐</div>
                      <div className="absolute bottom-4 right-4 text-4xl animate-bounce" style={{ animationDelay: '0.6s' }}>✨</div>

                      {/* Trophy Icon */}
                      <div className="relative">
                        <div className="inline-block text-8xl mb-6 animate-bounce">
                          🏆
                        </div>
                        <div className="absolute -inset-4 bg-yellow-400/30 rounded-full blur-xl animate-pulse"></div>
                      </div>

                      {/* Congratulations Text */}
                      <h5 className="text-4xl font-bold mb-4 drop-shadow-lg">Perfect Score! 🎯</h5>
                      <p className="text-green-50 text-xl mb-3 font-medium">Knowledge Check Complete!</p>
                      <p className="text-green-100 text-lg mb-8 max-w-md mx-auto">
                        You've mastered the basics of setting up Python. Outstanding work! 🚀
                      </p>

                      {/* Stats */}
                      <div className="flex justify-center gap-6 mb-8">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                          <div className="text-3xl font-bold">{step3KnowledgeCheckQuestions.length}/{step3KnowledgeCheckQuestions.length}</div>
                          <div className="text-sm text-green-100">Questions</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                          <div className="text-3xl font-bold">100%</div>
                          <div className="text-sm text-green-100">Accuracy</div>
                        </div>
                      </div>

                      {/* Button */}
                      <Button
                        onClick={handleStep3KnowledgeCheckReset}
                        className="bg-white text-green-700 hover:bg-green-50 font-bold px-10 py-4 rounded-2xl shadow-2xl shadow-black/20 border-2 border-white/50 transform hover:scale-105 transition-all duration-200"
                      >
                        <span className="flex items-center gap-2 text-lg">
                          <span>🔄</span>
                          Review Questions
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
              </section>

              {/* Summary & Achievement */}
              <div className="grid md:grid-cols-2 gap-6">
                <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 p-1 rounded">📚</span> Quick Summary
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Installed Python successfully",
                      "Set up a professional code editor",
                      "Wrote your first .py program",
                      "Ran code in the terminal"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-center text-neutral-600 text-sm">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 text-xs font-bold">✓</span>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                  <h4 className="text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <span>🌟</span> Achievement Unlocked
                  </h4>
                  <p className="text-2xl font-bold text-neutral-800 mb-1">Environment Setup Pro</p>
                  <p className="text-yellow-700 text-sm font-medium mb-4">+20 XP Points</p>
                  <div className="w-full bg-yellow-200 rounded-full h-2 mb-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-xs text-yellow-600 text-right">Badge Earned!</p>
                </section>
              </div>

              {/* Pro Tip */}
              <section className="bg-slate-900 rounded-2xl p-6 shadow-xl shadow-slate-900/10 flex gap-4 items-start">
                <div className="text-3xl">💡</div>
                <div>
                  <h4 className="text-white font-bold mb-2">Pro Tip</h4>
                  <p className="text-slate-300 text-sm leading-relaxed italic">
                    "Every professional developer started exactly where you are right now. The setup might feel technical, but you've just built the foundation for everything you'll create. This is the hardest part - it gets much easier from here!"
                  </p>
                </div>
              </section>

              {/* Bonus Challenge */}
              <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
                <h4 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <span>🎮</span> Bonus Challenge: Explorer Mode
                </h4>
                <div className="space-y-4">
                  <p className="text-purple-800 text-sm">Ready to show off? Try these extra missions:</p>
                  <div className="grid gap-3">
                    <div className="bg-white p-3 rounded-xl border border-purple-100 text-sm text-purple-700 flex gap-3 items-center">
                      <span className="font-bold bg-purple-100 w-6 h-6 flex items-center justify-center rounded text-xs">1</span>
                      Create a program that prints your top 3 favorite movies
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-purple-100 text-sm text-purple-700 flex gap-3 items-center">
                      <span className="font-bold bg-purple-100 w-6 h-6 flex items-center justify-center rounded text-xs">2</span>
                      Make a star pattern using print statements
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-purple-100 text-sm text-purple-700 flex gap-3 items-center">
                      <span className="font-bold bg-purple-100 w-6 h-6 flex items-center justify-center rounded text-xs">3</span>
                      Find and run the Python interactive shell in your terminal
                    </div>
                  </div>
                </div>
              </section>

              {/* Ready for Next Level */}
              <section className="text-center py-8">
                <h4 className="text-3xl font-bold text-neutral-800 mb-4">Ready for Level 2? 🚀</h4>
                <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
                  You now have a professional coding environment! In the next step, you'll learn about <strong>Variables</strong> and start building interactive programs.
                </p>
                <div className="inline-block bg-green-50 text-green-700 px-6 py-3 rounded-xl border border-green-200 text-sm font-medium animate-pulse">
                  ✅ Mark this step as complete to unlock the next lesson!
                </div>
              </section>
            </div>
          )}

          {/* Variables & Data Types Content - Step 4 */}
          {currentStep === 4 && (
            <div className="mt-8 space-y-10">
              {/* Header */}
              <div>
                <h3 className="text-4xl font-bold text-neutral-800 flex items-center gap-3 mb-3">
                  🐍 Python Variables & Data Types
                </h3>
                <p className="text-xl text-neutral-600">Storing Information Like a Pro</p>
              </div>

              {/* Learning Objectives */}
              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-100 p-8 shadow-lg">
                <h4 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🎯</span> Learning Objectives
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Understand what variables are and how to use them",
                    "Learn Python's main data types: strings, numbers, booleans",
                    "Create variables and assign values to them",
                    "Write programs that store and use different types of data"
                  ].map((objective, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                      <span className="text-green-500 text-xl flex-shrink-0">✅</span>
                      <span className="text-neutral-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Motivation */}
              <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-purple-500/30">
                <div className="flex gap-4 items-start">
                  <div className="text-5xl">🚀</div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3">Quick Motivation</h4>
                    <p className="text-purple-100 text-lg leading-relaxed italic">
                      "Variables are like labeled boxes for your data. Once you master them, you can build programs that remember information, make decisions, and interact with users!"
                    </p>
                  </div>
                </div>
              </section>

              {/* Core Concept */}
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
                    💡
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-neutral-800">Core Concept: What Are Variables?</h4>
                    <p className="text-sm text-neutral-500">Variables = Labeled Storage Containers</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Kitchen Analogy */}
                  <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-xl">
                    <h5 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
                      <span>🏠</span> Think of Kitchen Boxes
                    </h5>
                    <CodeSnippet
                      language="python"
                      code={`# Like labeled boxes in your kitchen:
sugar_box = "White Sugar"
flour_box = "All-Purpose Flour"  
spice_jar = "Cinnamon"`}
                      onRun={(code) => handleTryNow(code)}
                    />
                  </div>

                  {/* Programming Version */}
                  <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-xl">
                    <h5 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
                      <span>💻</span> In Programming
                    </h5>
                    <CodeSnippet
                      language="python"
                      code={`name = "Alice"
age = 25
is_student = True`}
                      onRun={(code) => handleTryNow(code)}
                    />
                  </div>
                </div>

                {/* Why We Need Variables */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 border-2 border-slate-200">
                  <h5 className="text-2xl font-bold text-neutral-800 mb-6">Why We Need Variables</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { icon: "🚀", title: "Reuse Information", desc: "Store data once, use it many times" },
                      { icon: "🎯", title: "Dynamic Programs", desc: "Programs that change based on user input" },
                      { icon: "📊", title: "Data Organization", desc: "Keep related information together" },
                      { icon: "🔄", title: "Update Values", desc: "Change information as needed" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 shadow-md border border-slate-100">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className="font-bold text-neutral-800 mb-1">{item.title}</div>
                        <div className="text-sm text-neutral-600">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Data Types */}
              <section className="space-y-8">
                <h4 className="text-3xl font-bold text-neutral-800 flex items-center gap-2">
                  <span>📊</span> Python's Main Data Types
                </h4>

                {/* Strings */}
                <div className="bg-white rounded-3xl border-2 border-green-100 p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 font-bold">
                      1
                    </div>
                    <h5 className="text-2xl font-bold text-neutral-800">Strings (Text Data)</h5>
                  </div>
                  <CodeSnippet
                    language="python"
                    code={`# Strings are for text - use quotes!
name = "Sarah"
message = 'Hello, World!'
address = "123 Main Street"

# You can combine strings:
greeting = "Hello, " + name + "!"
print(greeting)`}
                    onRun={(code) => handleTryNow(code)}
                  />
                </div>

                {/* Numbers */}
                <div className="bg-white rounded-3xl border-2 border-blue-100 p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      2
                    </div>
                    <h5 className="text-2xl font-bold text-neutral-800">Numbers (Integer & Float)</h5>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-blue-600 mb-2 uppercase">Integers (Whole Numbers)</p>
                      <CodeSnippet
                        language="python"
                        code={`age = 25
students_count = 30
temperature = -5`}
                        onRun={(code) => handleTryNow(code)}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-600 mb-2 uppercase">Floats (Decimal Numbers)</p>
                      <CodeSnippet
                        language="python"
                        code={`price = 19.99
pi = 3.14159
average = 85.6`}
                        onRun={(code) => handleTryNow(code)}
                      />
                    </div>
                  </div>
                </div>

                {/* Booleans */}
                <div className="bg-white rounded-3xl border-2 border-purple-100 p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                      3
                    </div>
                    <h5 className="text-2xl font-bold text-neutral-800">Booleans (True/False)</h5>
                  </div>
                  <CodeSnippet
                    language="python"
                    code={`# Booleans are for yes/no, on/off, true/false
is_raining = True
has_license = False
is_logged_in = True`}
                    onRun={(code) => handleTryNow(code)}
                  />
                </div>
              </section>

              {/* Variable Naming Rules */}
              <section className="space-y-8">
                <h4 className="text-3xl font-bold text-neutral-800 flex items-center gap-2">
                  <span>📝</span> Variable Naming Rules
                </h4>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* DOs */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border-2 border-green-200 p-8 shadow-lg">
                    <h5 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                      <span>✅</span> DOs - Good Names
                    </h5>
                    <div className="space-y-3">
                      {[
                        { name: "user_name", value: '"Alice"', desc: "Clear and descriptive" },
                        { name: "student_count", value: "30", desc: "Easy to understand" },
                        { name: "is_logged_in", value: "True", desc: "Reads like English" },
                        { name: "total_price", value: "99.99", desc: "Specific purpose" }
                      ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 border border-green-200">
                          <code className="text-green-700 font-mono font-bold">
                            {item.name} = {item.value}
                          </code>
                          <p className="text-sm text-green-600 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DON'Ts */}
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl border-2 border-red-200 p-8 shadow-lg">
                    <h5 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-2">
                      <span>❌</span> DON'Ts - Bad Names
                    </h5>
                    <div className="space-y-3">
                      {[
                        { name: "a", value: '"Alice"', desc: "Too vague" },
                        { name: "x", value: "30", desc: "What does x mean?" },
                        { name: "temp", value: "True", desc: "Unclear purpose" },
                        { name: "n", value: "99.99", desc: "Meaningless" }
                      ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 border border-red-200">
                          <code className="text-red-700 font-mono font-bold">
                            {item.name} = {item.value}
                          </code>
                          <p className="text-sm text-red-600 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Python Rules */}
                <div className="bg-white rounded-3xl border-2 border-blue-100 p-8 shadow-xl">
                  <h5 className="text-xl font-bold text-neutral-800 mb-4">Python Naming Rules</h5>
                  <div className="space-y-3">
                    {[
                      "Start with letter or underscore: name, _temp",
                      "Can contain letters, numbers, underscores: user1, total_score",
                      "Case sensitive: age ≠ Age ≠ AGE",
                      "No spaces: user_name ✅, user name ❌",
                      "Avoid Python keywords: if, for, while ❌"
                    ].map((rule, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-neutral-700">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Practice Time */}
              <section className="space-y-8">
                <h4 className="text-3xl font-bold text-neutral-800 flex items-center gap-2">
                  <span>🛠️</span> Practice Time
                </h4>

                {/* Exercise 1 */}
                <div className="bg-white rounded-3xl border-2 border-purple-100 p-8 shadow-xl">
                  <h5 className="text-2xl font-bold text-purple-800 mb-4">Exercise 1: User Profile Creator</h5>
                  <p className="text-neutral-600 mb-6">Create a user profile with different types of variables:</p>
                  <CodeSnippet
                    language="python"
                    code={`# CREATE a user profile with variables:
name = "Alice"
age = 25
city = "New York"
is_student = True
favorite_number = 7

# Test your profile:
print("=== USER PROFILE ===")
print("Name:", name)
print("Age:", age)
print("City:", city)
print("Student:", is_student)
print("Favorite Number:", favorite_number)`}
                    onRun={(code) => handleTryNow(code)}
                  />
                </div>

                {/* Exercise 2 */}
                <div className="bg-white rounded-3xl border-2 border-green-100 p-8 shadow-xl">
                  <h5 className="text-2xl font-bold text-green-800 mb-4">Exercise 2: Shopping Cart</h5>
                  <p className="text-neutral-600 mb-6">Create a simple shopping cart calculator:</p>
                  <CodeSnippet
                    language="python"
                    code={`# CREATE a simple shopping cart:
item1 = "Python Book"
price1 = 29.99
item2 = "Laptop Mouse" 
price2 = 15.50
total = price1 + price2

print("=== SHOPPING CART ===")
print("Item 1:", item1, "- $", price1)
print("Item 2:", item2, "- $", price2)
print("TOTAL: $", total)`}
                    onRun={(code) => handleTryNow(code)}
                  />
                </div>
              </section>

              {/* Common Mistakes */}
              <section className="space-y-6">
                <h4 className="text-3xl font-bold text-neutral-800 flex items-center gap-2">
                  <span>🔍</span> Common Mistakes & Fixes
                </h4>

                <div className="grid gap-6">
                  {[
                    {
                      title: "Forgetting Quotes for Strings",
                      wrong: 'name = Alice',
                      correct: 'name = "Alice"'
                    },
                    {
                      title: "Using Quotes for Numbers",
                      wrong: 'age = "25"',
                      correct: 'age = 25'
                    },
                    {
                      title: "Incorrect Boolean Capitalization",
                      wrong: 'is_valid = true',
                      correct: 'is_valid = True'
                    }
                  ].map((mistake, i) => (
                    <div key={i} className="bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-lg">
                      <h5 className="text-lg font-bold text-neutral-800 mb-4">{mistake.title}</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                          <p className="text-xs font-bold text-red-600 mb-2 uppercase">❌ Wrong</p>
                          <code className="text-red-700 font-mono">{mistake.wrong}</code>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                          <p className="text-xs font-bold text-green-600 mb-2 uppercase">✅ Correct</p>
                          <code className="text-green-700 font-mono">{mistake.correct}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Knowledge Check */}
              <section className="space-y-6">
                <h4 className="text-3xl font-bold text-neutral-800 flex items-center gap-2">
                  <span>🧠</span> Knowledge Check
                </h4>

                <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 border-b border-slate-200">
                    <h5 className="text-2xl font-bold text-neutral-800 mb-6">Test Your Understanding</h5>

                    <div className="space-y-8">
                      {/* Question 1 */}
                      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                        <div className="mb-4">
                          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                            Multiple Choice
                          </span>
                          <h6 className="text-lg font-bold text-neutral-800">Which is a valid variable name?</h6>
                        </div>
                        <div className="space-y-3">
                          {[
                            { option: "A) first name", isCorrect: false },
                            { option: "B) 1st_place", isCorrect: false },
                            { option: "C) first_name", isCorrect: true },
                            { option: "D) class", isCorrect: false }
                          ].map((item, i) => (
                            <div
                              key={i}
                              className={`p-4 rounded-xl border-2 transition-all ${item.isCorrect
                                ? 'bg-green-50 border-green-300'
                                : 'bg-slate-50 border-slate-200'
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-neutral-700">{item.option}</span>
                                {item.isCorrect && <span className="text-xl">✅</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-4 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                          ✓ Correct answer: C) first_name - Uses underscore instead of spaces and doesn't start with a number
                        </p>
                      </div>

                      {/* Question 2 */}
                      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                        <div className="mb-4">
                          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                            Multiple Choice
                          </span>
                          <h6 className="text-lg font-bold text-neutral-800">What data type is `is_completed = False`?</h6>
                        </div>
                        <div className="space-y-3">
                          {[
                            { option: "A) String", isCorrect: false },
                            { option: "B) Number", isCorrect: false },
                            { option: "C) Boolean", isCorrect: true },
                            { option: "D) None", isCorrect: false }
                          ].map((item, i) => (
                            <div
                              key={i}
                              className={`p-4 rounded-xl border-2 transition-all ${item.isCorrect
                                ? 'bg-purple-50 border-purple-300'
                                : 'bg-slate-50 border-slate-200'
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-neutral-700">{item.option}</span>
                                {item.isCorrect && <span className="text-xl">✅</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-4 text-sm text-purple-700 bg-purple-50 p-3 rounded-lg">
                          ✓ Correct answer: C) Boolean - True and False are boolean values
                        </p>
                      </div>

                      {/* True/False Questions */}
                      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                        <div className="mb-4">
                          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                            True or False
                          </span>
                          <h6 className="text-lg font-bold text-neutral-800 mb-4">Mark each statement as True or False:</h6>
                        </div>
                        <div className="space-y-4">
                          {[
                            { statement: "Variable names can contain spaces", isTrue: false },
                            { statement: "`age = 25` creates a number variable", isTrue: true },
                            { statement: "`name = Alice` is correct (needs quotes)", isTrue: false },
                            { statement: "`is_ready = True` uses proper boolean capitalization", isTrue: true }
                          ].map((item, i) => (
                            <div
                              key={i}
                              className={`p-4 rounded-xl border-2 ${item.isTrue
                                ? 'bg-green-50 border-green-200'
                                : 'bg-red-50 border-red-200'
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-neutral-700">{item.statement}</span>
                                <span className={`font-bold px-3 py-1 rounded-full text-sm ${item.isTrue
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                                  }`}>
                                  {item.isTrue ? '✅ TRUE' : '❌ FALSE'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fill in the Blank */}
                      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                        <div className="mb-4">
                          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                            Fill in the Blanks
                          </span>
                          <h6 className="text-lg font-bold text-neutral-800 mb-4">Complete this sentence:</h6>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
                          <p className="text-neutral-700 text-lg leading-relaxed">
                            "Variables that store text are called <span className="bg-white px-3 py-1 rounded font-bold text-green-700 border-2 border-green-300">strings</span>, while whole numbers are called <span className="bg-white px-3 py-1 rounded font-bold text-blue-700 border-2 border-blue-300">integers</span>."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Summary */}
              <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-2xl shadow-indigo-500/40">
                <h4 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <span>📚</span> Quick Summary
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-xl font-bold mb-3 text-blue-100">🎯 What You Learned:</h5>
                    <ul className="space-y-2 text-blue-50">
                      <li>• Variables are labeled containers for storing data</li>
                      <li>• Main data types: Strings, Numbers, Booleans</li>
                      <li>• Variable names should be clear and follow Python rules</li>
                      <li>• Build programs that remember and use information</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-3 text-purple-100">🚀 What's Coming Next:</h5>
                    <p className="text-purple-50">
                      In Step 5, you'll learn about <strong>Basic Operations</strong> - how to do math, combine text, and make comparisons in Python!
                    </p>
                  </div>
                </div>
              </section>

              {/* Achievement */}
              <section className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-10 text-white shadow-2xl shadow-orange-500/40 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl animate-bounce">🏆</div>
                <h4 className="text-3xl font-bold mb-6">🌟 Achievement Unlocked!</h4>
                <div className="space-y-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <div className="text-2xl font-bold mb-2">Variable Master</div>
                    <div className="text-yellow-100">+25 XP Points</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <div className="font-bold text-lg mb-3">📈 YOUR JOURNEY SO FAR:</div>
                    <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden mb-2">
                      <div className="bg-white h-full rounded-full transition-all duration-1000" style={{ width: '8%' }}></div>
                    </div>
                    <div className="text-sm text-yellow-50">Progress: 8% Complete | 4 of 52 steps</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <div className="font-bold mb-2">💪 SKILLS GAINED:</div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-yellow-50">
                      <div>✓ Variable Creation & Assignment</div>
                      <div>✓ Data Type Identification</div>
                      <div>✓ Proper Naming Conventions</div>
                      <div>✓ Basic Program Structure</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pro Tip */}
              <section className="bg-slate-900 rounded-3xl p-8 shadow-xl flex gap-4 items-start">
                <div className="text-4xl">💡</div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-3">Pro Tip for Success</h4>
                  <p className="text-slate-300 leading-relaxed italic">
                    "Naming variables well is one of the most important programming skills. Good names make your code readable and maintainable. Think: 'If someone else read this code, would they understand what each variable stores?'"
                  </p>
                </div>
              </section>

              {/* Bonus Challenge */}
              <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-200 p-8">
                <h4 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
                  <span>🎮</span> Bonus Challenge: Personal Diary
                </h4>
                <CodeSnippet
                  language="python"
                  code={`# CREATE a personal diary entry using variables:

mood_today = "Happy"
hours_slept = 8
books_read = 2
learned_something_new = True
today_quote = "Stay curious and keep learning!"

print("=== MY DIARY ===")
print("Mood:", mood_today)
print("Hours Slept:", hours_slept) 
print("Books Read This Week:", books_read)
print("Learned Something New:", learned_something_new)
print("Today's Quote:", today_quote)`}
                  onRun={(code) => handleTryNow(code)}
                />
              </section>

              {/* Ready for Next */}
              <section className="text-center py-8">
                <h4 className="text-3xl font-bold text-neutral-800 mb-4">Ready for Operations? 🚀</h4>
                <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
                  You now know how to store data in variables! Next, you'll learn how to manipulate that data with math, text operations, and comparisons.
                </p>
                <div className="inline-block bg-green-50 text-green-700 px-6 py-3 rounded-xl border border-green-200 text-sm font-medium animate-pulse">
                  ✅ Mark this step as complete to unlock Step 5!
                </div>
              </section>
            </div>
          )}

          {/* Python First Program Content - Step 5 */}
          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-6">First Program</h3>

                  <div className="mb-8">
                    <p className="text-green-600 font-semibold text-base mb-3">✅ Example:</p>
                    <CodeSnippet language="python" code={`print("Welcome to Python Programming!")`} onRun={(code) => handleTryNow(code)} />
                    <div className="mt-3">
                      <Button
                        onClick={() => handleTryNow('print("Welcome to Python Programming!")')}
                        variant="secondary"
                        size="sm"
                      >
                        TRY NOW
                      </Button>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-neutral-800 font-semibold text-base mb-3">👉 Breakdown:</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-neutral-700 border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100 text-neutral-800">
                          <tr>
                            <th className="px-4 py-2 w-40">Part</th>
                            <th className="px-4 py-2">Meaning</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="px-4 py-2 font-semibold whitespace-nowrap">print</td>
                            <td className="px-4 py-2">Command to display output.</td>
                          </tr>
                          <tr className="border-t">
                            <td className="px-4 py-2 font-semibold whitespace-nowrap">()</td>
                            <td className="px-4 py-2">Container for information (arguments).</td>
                          </tr>
                          <tr className="border-t">
                            <td className="px-4 py-2 font-semibold whitespace-nowrap">"Welcome to Python Programming!"</td>
                            <td className="px-4 py-2">Text value (string) passed to print.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mb-8 space-y-4">
                    <p className="text-blue-600 text-base"> Motivation: This is your first step as a developer — today it's text, tomorrow maybe AI 🤖.</p>
                    <p className="text-purple-600 text-base"> Fun: Congrats 🎉 you're officially a Python whisperer 🐍✨.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Python Problems Content - Step 6 */}
          {currentStep === 6 && (
            <div className="mt-8 space-y-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-6">Problems</h3>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <p className="text-neutral-800 font-semibold text-base">🔧 Practice Problems (Subjective)</p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-neutral-700">1. Print your name.</p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleTryNow('', 'print("Your Name")', 'Print your name.')}
                              variant="secondary"
                              size="sm"
                            >
                              TRY NOW
                            </Button>
                            <Button
                              onClick={() => setShowHints(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              size="sm"
                            >
                              HINTS
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-neutral-700">2. Print the sentence: Python is fun!.</p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleTryNow('', 'print("Python is fun!")', 'Print the sentence: Python is fun!.')}
                              variant="secondary"
                              size="sm"
                            >
                              TRY NOW
                            </Button>
                            <Button
                              onClick={() => setShowHints(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              size="sm"
                            >
                              HINTS
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-neutral-700">3. Print 3 different lines using three print() statements.</p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleTryNow('', 'print("Line 1")\nprint("Line 2")\nprint("Line 3")', 'Print 3 different lines using three print() statements.')}
                              variant="secondary"
                              size="sm"
                            >
                              TRY NOW
                            </Button>
                            <Button
                              onClick={() => setShowHints(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              size="sm"
                            >
                              HINTS
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-neutral-700">4. Print the same word 5 times using:</p>
                          <CodeSnippet language="python" code={`print("Hello " * 5)`} />
                          <div className="mt-3 flex gap-2">
                            <Button
                              onClick={() => handleTryNow('', 'print("Hello " * 5)', 'Print the same word 5 times using: print("Hello " * 5)')}
                              variant="secondary"
                              size="sm"
                            >
                              TRY NOW
                            </Button>
                            <Button
                              onClick={() => setShowHints(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              size="sm"
                            >
                              HINTS
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-neutral-700">5. Research & write (in comments) 5 companies that use Python.</p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleTryNow('', '# Google\n# Instagram\n# Netflix\n# Spotify\n# Dropbox', 'Research & write (in comments) 5 companies that use Python.')}
                              variant="secondary"
                              size="sm"
                            >
                              TRY NOW
                            </Button>
                            <Button
                              onClick={() => setShowHints(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              size="sm"
                            >
                              HINTS
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Show modals */}
          {showCodePlayground && <CodePlayground />}
          {showHints && <HintsModal />}

          {/* Navigation Button */}
          {(() => {
            const slugs = [
              "python-history",
              "python-popularity",
              "python-applications",
              "python-first-program",
              "python-problems",
              "python-quiz",
            ];
            const labels = [
              "Next: Python History →",
              "Next: Python Popularity →",
              "Next: Python Applications →",
              "Next: First Program →",
              "Next: Problems →",
              "Next: Quiz →",
            ];
            const hasNext = currentStep >= 1 && currentStep <= slugs.length - 1;
            if (!hasNext) {
              return (
                <LessonNextButton onClick={handleFinishLesson} disabled={isCompleting} label={isCompleting ? "Completing..." : "Next: Lesson →"} />
              );
            }
            const nextSlug = slugs[currentStep - 1];
            const nextLabel = labels[currentStep - 1] || "Next →";
            return (
              <LessonNextButton href={`/python/lesson-1/${nextSlug}`} label={nextLabel} />
            );
          })()}
        </div>
      </div>
    </div>
  );
}; 
