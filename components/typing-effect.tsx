"use client";

import { useState, useEffect } from "react";

interface TypingEffectProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function TypingEffect({ 
  phrases, 
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000
}: TypingEffectProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const currentPhrase = phrases[currentPhraseIndex];
    const speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && currentText === currentPhrase) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
      } else {
        setCurrentText((prev) => currentPhrase.slice(0, prev.length + 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`${className} inline-block`}>
      {currentText}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
}

