"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, X } from "lucide-react";

export function TextSelectionInstructions() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if user has dismissed it before (using localStorage)
  useEffect(() => {
    const dismissed = localStorage.getItem('text-selection-help-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('text-selection-help-dismissed', 'true');
    setShowInstructions(false);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <Button
        onClick={() => setShowInstructions(!showInstructions)}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 border-0"
        size="sm"
      >
        <Lightbulb className="h-4 w-4" />
        <span className="font-medium">Text Selection Help</span>
      </Button>
      
      {showInstructions && (
        <div className="absolute bottom-16 left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Lightbulb className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">How to Use Text Selection</h3>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-2.5 text-sm text-gray-700 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-semibold mt-0.5">•</span>
              <p><strong className="text-gray-900">Select any text</strong> on the page by clicking and dragging</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-semibold mt-0.5">•</span>
              <p><strong className="text-gray-900">AI explanation</strong> will appear automatically</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-semibold mt-0.5">•</span>
              <p><strong className="text-gray-900">Powered by Gemini AI</strong> for smart explanations</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-semibold mt-0.5">•</span>
              <p><strong className="text-gray-900">Works everywhere</strong> on the site</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
            <p className="text-xs text-blue-800">
              💡 Try selecting words like <strong>&quot;JavaScript&quot;</strong>, <strong>&quot;React&quot;</strong>, or <strong>&quot;API&quot;</strong> to see it in action!
            </p>
          </div>
          
          <button
            onClick={handleDismiss}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      )}
    </div>
  );
} 
