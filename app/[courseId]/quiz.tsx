"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";

// Use local modern full-page quiz UI fallback
import { Quiz as ModernQuiz } from "@/components/quiz-modern";

// Keep the existing export name/signature used across the app
export const Quiz = ({ lessonTitle, currentStep, courseId, lessonId }: { lessonTitle: string; currentStep: number; courseId?: string; lessonId?: string }) => {
  // Basic adapter: derive initial values for the modern quiz from existing props.
  // For now, we provide small curated challenge sets per lesson.

  type Option = { id: number; text: string; imageSrc?: string | null; audioSrc?: string | null; correct?: boolean };
  type ChallengeItem = { id: number; type: "SELECT" | "ASSIST" | "MATCH" | "TRUE_FALSE" | "FILL"; question: string; completed: boolean; challengeOptions: Option[] };

  const initialLessonChallenges: ChallengeItem[] = useMemo(() => {
    const isPython = (courseId === "python") || /python/i.test(lessonTitle);

    if (isPython) {
      // Lesson-specific pools
      if (lessonId === "lesson-2") {
        return [
          {
            id: 2101,
            type: "TRUE_FALSE",
            question: "Python is case sensitive.",
            completed: false,
            challengeOptions: [
              { id: 1, text: "True", correct: true },
              { id: 2, text: "False", correct: false },
            ],
          },
          {
            id: 2102,
            type: "SELECT",
            question: "Pick the correctly indented code block.",
            completed: false,
            challengeOptions: [
              { id: 1, text: "if True:\n    print(\"Hi\")", correct: true },
              { id: 2, text: "if True:\nprint(\"Hi\")", correct: false },
              { id: 3, text: "if True print(\"Hi\")", correct: false },
            ],
          },
          {
            id: 2103,
            type: "SELECT",
            question: "Which symbol starts a single-line comment in Python?",
            completed: false,
            challengeOptions: [
              { id: 1, text: "#", correct: true },
              { id: 2, text: "//", correct: false },
              { id: 3, text: "<!-- -->", correct: false },
            ],
          },
          {
            id: 2104,
            type: "SELECT",
            question: "Choose the correct string with an apostrophe.",
            completed: false,
            challengeOptions: [
              { id: 1, text: "print(\"I'm happy\")", correct: true },
              { id: 2, text: "print('I'm happy')", correct: false },
              { id: 3, text: "print(I'm happy)", correct: false },
            ],
          },
          {
            id: 2105,
            type: "TRUE_FALSE",
            question: "Two statements can be written on one line using a semicolon.",
            completed: false,
            challengeOptions: [
              { id: 1, text: "True", correct: true },
              { id: 2, text: "False", correct: false },
            ],
          },
          {
            id: 2106,
            type: "SELECT",
            question: "Which is better for readability (recommended)?",
            completed: false,
            challengeOptions: [
              { id: 1, text: "One statement per line", correct: true },
              { id: 2, text: "Many statements on one line with ;", correct: false },
            ],
          },
        ];
      }

      if (lessonId === "lesson-3") {
        return [
          {
            id: 3101,
            type: "SELECT",
            question: "Which of these is a valid variable name?",
            completed: false,
            challengeOptions: [
              { id: 1, text: "1number", correct: false },
              { id: 2, text: "number1", correct: true },
              { id: 3, text: "number-1", correct: false },
              { id: 4, text: "@num", correct: false },
            ],
          },
          {
            id: 3102,
            type: "SELECT",
            question: "What is the type of 3.0?",
            completed: false,
            challengeOptions: [
              { id: 1, text: "int", correct: false },
              { id: 2, text: "float", correct: true },
              { id: 3, text: "str", correct: false },
              { id: 4, text: "bool", correct: false },
            ],
          },
          {
            id: 3103,
            type: "SELECT",
            question: "Python is:",
            completed: false,
            challengeOptions: [
              { id: 1, text: "Statically typed", correct: false },
              { id: 2, text: "Dynamically typed", correct: true },
              { id: 3, text: "Both", correct: false },
              { id: 4, text: "None", correct: false },
            ],
          },
          {
            id: 3104,
            type: "FILL",
            question: "Python variables are __________ sensitive.",
            completed: false,
            challengeOptions: [
              { id: 1, text: "case", correct: true },
              { id: 2, text: "space", correct: false },
              { id: 3, text: "speed", correct: false },
            ],
          },
          {
            id: 3105,
            type: "FILL",
            question: "The function used to check data type is __________.",
            completed: false,
            challengeOptions: [
              { id: 1, text: "type()", correct: true },
              { id: 2, text: "typeof()", correct: false },
              { id: 3, text: "class()", correct: false },
            ],
          },
          {
            id: 3106,
            type: "FILL",
            question: "To convert \"123\" (string) into a number, we use __________.",
            completed: false,
            challengeOptions: [
              { id: 1, text: "int()", correct: true },
              { id: 2, text: "parseInt()", correct: false },
              { id: 3, text: "Number()", correct: false },
            ],
          },
          {
            id: 3107,
            type: "SELECT",
            question: "What is the output?\n\nx = 10\nx = \"ten\"\nprint(x)",
            completed: false,
            challengeOptions: [
              { id: 1, text: "10", correct: false },
              { id: 2, text: "ten", correct: true },
              { id: 3, text: "Error", correct: false },
            ],
          },
          {
            id: 3108,
            type: "SELECT",
            question: "Identify the error:\n\n2x = 5\nprint(2x)",
            completed: false,
            challengeOptions: [
              { id: 1, text: "Variable name can't start with number", correct: true },
              { id: 2, text: "print should be Print", correct: false },
              { id: 3, text: "Missing semicolon", correct: false },
            ],
          },
        ];
      }

      // Default to Lesson 1 intro quiz
      return [
        {
          id: 1001,
          type: "TRUE_FALSE",
          question: "Python is an interpreted language.",
          completed: false,
          challengeOptions: [
            { id: 1, text: "True", correct: true },
            { id: 2, text: "False", correct: false },
          ],
        },
        {
          id: 1002,
          type: "SELECT",
          question: "Which function prints output in Python?",
          completed: false,
          challengeOptions: [
            { id: 1, text: "echo()", correct: false },
            { id: 2, text: "printf()", correct: false },
            { id: 3, text: "print()", correct: true },
          ],
        },
        {
          id: 1003,
          type: "FILL",
          question: "Select the correct string literal in Python.",
          completed: false,
          challengeOptions: [
            { id: 1, text: "print(Hello)", correct: false },
            { id: 2, text: "print('Hello')", correct: true },
            { id: 3, text: "print(\"Hello)\")", correct: false },
          ],
        },
      ];
    }

    // Fallback simple quiz
    return [
      {
        id: 2001,
        type: "SELECT",
        question: "Select the correct answer.",
        completed: false,
        challengeOptions: [
          { id: 1, text: "A", correct: true },
          { id: 2, text: "B", correct: false },
          { id: 3, text: "C", correct: false },
        ],
      },
    ];
  }, [courseId, lessonTitle, lessonId]);

  const initialPercentage = 0;
  const initialHearts = 3;
  const initialLessonId = 1;
  const userSubscription = null;

  return (
    <div className="flex-1 quiz-content">
      <div className="ml-0 lg:ml-[280px] mr-0 lg:mr-[280px]">
        <ModernQuiz
          initialPercentage={initialPercentage}
          initialHearts={initialHearts}
          initialLessonId={initialLessonId}
          initialLessonChallenges={initialLessonChallenges}
          userSubscription={userSubscription}
        />
      </div>
      <style jsx global>{`
        @media (min-width: 1024px) {
          .quiz-content footer {
            left: 280px !important;
            right: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};
