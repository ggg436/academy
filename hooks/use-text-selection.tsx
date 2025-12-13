"use client";

import { useState, useEffect, useCallback } from "react";
import { TextExplanation } from "../components/text-explanation";

export function useTextSelection() {
  const [selectedText, setSelectedText] = useState<string>("");
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showExplanation, setShowExplanation] = useState(false);

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text && text.length > 0) {
      const range = selection?.getRangeAt(0);
      if (range) {
        const rect = range.getBoundingClientRect();
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom + window.scrollY + 10
        });
        setSelectedText(text);
        setShowExplanation(true); // Show popup directly
      }
    } else {
      setShowExplanation(false);
      setSelectedText("");
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    // Small delay to ensure selection is complete
    setTimeout(handleTextSelection, 100);
  }, [handleTextSelection]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    // Handle keyboard selection (Ctrl+A, Shift+Arrow keys, etc.)
    if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Meta') {
      setTimeout(handleTextSelection, 100);
    }
  }, [handleTextSelection]);

  const closeExplanation = useCallback(() => {
    setShowExplanation(false);
    setSelectedText("");
    // Clear any existing selection
    if (window.getSelection) {
      window.getSelection()?.removeAllRanges();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keyup', handleKeyUp);
    
    // Also listen for selection changes
    document.addEventListener('selectionchange', handleTextSelection);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('selectionchange', handleTextSelection);
    };
  }, [handleMouseUp, handleKeyUp, handleTextSelection]);

  return {
    selectedText,
    position,
    showExplanation,
    closeExplanation
  };
}

export function TextSelectionProvider({ children }: { children: React.ReactNode }) {
  const { selectedText, position, showExplanation, closeExplanation } = useTextSelection();

  return (
    <>
      {children}
      {showExplanation && (
        <TextExplanation
          selectedText={selectedText}
          position={position}
          onClose={closeExplanation}
        />
      )}
    </>
  );
} 
