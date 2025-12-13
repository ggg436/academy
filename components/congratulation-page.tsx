import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CongratulationPageProps {
  points: number;
  hearts?: number;
  onContinue: () => void;
  onPracticeAgain?: () => void;
  title?: string;
  showHearts?: boolean;
  lessonTitle?: string;
}

export const CongratulationPage = ({
  points,
  hearts = 0,
  onContinue,
  onPracticeAgain,
  title = "Great job! You've completed the lesson.",
  showHearts = true,
  lessonTitle
}: CongratulationPageProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  return (
    <>
      		<Confetti
			width={Math.min(dimensions.width, 1100)}
			height={dimensions.height}
			recycle={false}
			numberOfPieces={500}
			tweenDuration={10000}
		/>
		
		<div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-3xl mx-auto text-center items-center justify-center h-full">
        {/* Finish Icon */}
        <div className="w-16 h-16 lg:w-24 lg:h-24 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
        </div>
        
        {/* Congratulations Message */}
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
          {title}
        </h1>

        {/* Lesson Title */}
        {lessonTitle && (
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full px-6 py-2 mb-4">
            <span className="text-lg font-bold">🏅 {lessonTitle} Mastered!</span>
          </div>
        )}
        
        {/* Achievement Cards */}
        <div className="flex items-center gap-x-4 w-full">
          <div className="flex-1 bg-blue-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{points}</div>
            <div className="text-sm text-blue-500">Points Earned</div>
          </div>
          
          {showHearts && (
            <div className="flex-1 bg-red-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{hearts}</div>
              <div className="text-sm text-red-500">Hearts</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t-2">
        <div className="max-w-lg mx-auto flex gap-4">
          {onPracticeAgain && (
            <button 
              onClick={onPracticeAgain}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Practice Again
            </button>
          )}
          <button 
            onClick={onContinue}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}; 
