"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function TextSelectionInstructions() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <Button
        onClick={() => setShowInstructions(!showInstructions)}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full shadow-lg"
      >
        💡 Text Selection Help
      </Button>
      
      {showInstructions && (
        <div className="absolute bottom-16 left-0 w-80 bg-white border-2 border-blue-200 rounded-lg shadow-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-3">How to Use Text Selection</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• <strong>Select any text</strong> on the page by clicking and dragging</p>
            <p>• <strong>AI explanation</strong> will appear automatically</p>
            <p>• <strong>Powered by Gemini AI</strong> for smart explanations</p>
            <p>• <strong>Works everywhere</strong> on the site</p>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            <p>Try selecting words like &quot;JavaScript&quot;, &quot;React&quot;, or &quot;API&quot; to see it in action!</p>
          </div>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-3 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Got it!
          </button>
        </div>
      )}
    </div>
  );
} 