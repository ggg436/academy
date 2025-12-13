"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";

interface TextSelectionButtonProps {
  position: { x: number; y: number };
  onGetMeaning: () => void;
  onClose: () => void;
}

export function TextSelectionButton({ position, onGetMeaning, onClose }: TextSelectionButtonProps) {
  // Adjust position to keep button within viewport
  const adjustedPosition = {
    x: Math.min(Math.max(position.x - 80, 10), window.innerWidth - 180),
    y: Math.min(position.y, window.innerHeight - 100)
  };

  return (
    <div
      className="fixed z-[99] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2"
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
      }}
    >
      <Button
        onClick={onGetMeaning}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        size="sm"
      >
        <Sparkles className="h-4 w-4" />
        <span className="font-medium">Get Meaning</span>
      </Button>
      <Button
        onClick={onClose}
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

