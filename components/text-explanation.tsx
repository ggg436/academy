"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface TextExplanationProps {
  selectedText: string;
  position: { x: number; y: number };
  onClose: () => void;
}

export function TextExplanation({ selectedText, position, onClose }: TextExplanationProps) {
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isFallback, setIsFallback] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const getExplanation = async () => {
    if (!selectedText.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/text-explanation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: selectedText.trim(),
          context: "This is text selected from a coding learning platform. Provide a simple, educational explanation."
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get explanation');
      }

      const data = await response.json();
      
      if (data.error) {
        console.error('API Error:', data.error, data.details);
        setError(`Error: ${data.error}${data.details ? ` - ${data.details}` : ''}`);
        return;
      }
      
      if (data.fallback) {
        console.log('Using fallback explanation:', data.message);
        setIsFallback(true);
      } else {
        setIsFallback(false);
      }
      
      setExplanation(data.explanation);
    } catch (err) {
      setError('Failed to get explanation. Please try again.');
      console.error('Text explanation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Adjust position to keep popup within viewport
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 400),
    y: Math.min(position.y, window.innerHeight - 300)
  };

  return (
    <div
      ref={popupRef}
      className="fixed z-50 bg-white border-2 border-green-200 rounded-lg shadow-xl p-4 max-w-sm"
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-green-700 text-sm">Text Explanation</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none w-5 h-5 flex items-center justify-center"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-1">Selected text:</p>
        <p className="text-sm bg-gray-50 p-2 rounded border text-gray-700">
          &quot;{selectedText}&quot;
        </p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
          Getting explanation...
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded border mb-3">
          {error}
        </div>
      )}

      {!explanation && !loading && !error && (
        <div className="mb-3">
          <p className="text-sm text-gray-500 text-center py-2">
            Click &quot;Get Result&quot; to see the explanation
          </p>
        </div>
      )}

      {explanation && !loading && !error && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Explanation:</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {explanation}
          </p>
          {isFallback && (
            <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded border mt-2">
              💡 Using fallback explanation (AI service temporarily unavailable)
            </p>
          )}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <Button
          size="sm"
          onClick={getExplanation}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-1.5 font-medium uppercase tracking-wide"
        >
          {loading ? 'Loading...' : 'Get Result'}
        </Button>
        <Button
          size="sm"
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-1.5 font-medium uppercase tracking-wide"
        >
          Close
        </Button>
      </div>
    </div>
  );
} 
