"use client";

import { useState } from "react";

export type Option = { id: number; text: string; imageSrc?: string | null; audioSrc?: string | null; correct?: boolean };
export type ChallengeItem = { id: number; type: "SELECT" | "ASSIST" | "MATCH" | "TRUE_FALSE" | "FILL"; question: string; completed: boolean; challengeOptions: Option[] };

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}: {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: ChallengeItem[];
  userSubscription: any;
}) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);

  const challenge = initialLessonChallenges[index];
  const isLast = index >= initialLessonChallenges.length - 1;

  const handleCheck = () => {
    if (!challenge || selected == null) return;
    const opt = challenge.challengeOptions.find(o => o.id === selected);
    const correct = !!opt?.correct || (challenge.type === "FILL" && !!opt?.text);
    if (correct) {
      setStatus("correct");
      const nextPercent = Math.min(100, Math.round(((index + 1) / initialLessonChallenges.length) * 100));
      setPercentage(nextPercent);
    } else {
      setStatus("incorrect");
      setHearts(h => Math.max(0, h - 1));
    }
  };

  const handleContinue = () => {
    if (!isLast) {
      setIndex(i => i + 1);
      setSelected(null);
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-[900px] mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-neutral-600">Progress: {percentage}%</div>
          <div className="text-rose-500 font-semibold">❤ {hearts}</div>
        </div>
        <h1 className="text-lg lg:text-3xl text-center font-bold text-neutral-700 w-full mb-6 whitespace-pre-wrap">{challenge?.question}</h1>
        <div className="grid gap-3">
          {challenge?.challengeOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`text-left px-4 py-3 rounded border ${selected === opt.id ? "border-green-500 bg-green-50" : "border-neutral-300 bg-white"}`}
            >
              <pre className="m-0 whitespace-pre-wrap text-sm text-neutral-800">{opt.text}</pre>
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className={`text-sm ${status === "correct" ? "text-green-600" : status === "incorrect" ? "text-rose-600" : "text-neutral-500"}`}>
            {status === "correct" ? "Correct!" : status === "incorrect" ? "Try again" : "Select an option"}
          </div>
          {status === "idle" ? (
            <button onClick={handleCheck} disabled={selected == null} className="px-4 py-2 rounded border border-neutral-300 bg-white hover:bg-neutral-50 disabled:opacity-50">Check</button>
          ) : (
            <button onClick={handleContinue} disabled={isLast} className="px-4 py-2 rounded border border-neutral-300 bg-green-600 text-white hover:opacity-90 disabled:opacity-50">{isLast ? "Done" : "Continue"}</button>
          )}
        </div>
      </div>
      <style jsx global>{`
        @media (min-width: 1024px) {
          .quiz-content footer { left: 280px !important; right: 40px !important; }
        }
      `}</style>
    </div>
  );
}; 