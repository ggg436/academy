"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, Trophy, Clock, Star } from "lucide-react";

type Props = {
  lessonId: string;
  currentQuestion: number;
  totalQuestions: number;
  percentage: number;
  hearts: number;
  onNavigateToQuestion: (index: number) => void;
};

export const LessonSidebar = ({
  lessonId,
  currentQuestion,
  totalQuestions,
  percentage,
  hearts,
  onNavigateToQuestion,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className={`fixed right-0 top-0 h-full bg-white border-l border-gray-200 transition-all duration-300 z-50 ${
      isExpanded ? 'w-80' : 'w-16'
    }`}>
      {/* Toggle Button */}
      <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
        <Button
          variant="secondaryOutline"
          size="sm"
          className="rounded-full w-6 h-6 p-0 bg-white border-2 border-gray-300 hover:bg-gray-50"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '→' : '←'}
        </Button>
      </div>

      {/* Sidebar Content */}
      <div className="h-full p-4 overflow-y-auto">
        {isExpanded ? (
          <div className="space-y-6">
            {/* Lesson Info */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Lesson {lessonId.replace('lesson-', '')}
              </h3>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>Progress</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{Math.round(percentage)}%</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>

            {/* Hearts */}
            <Card className="p-4 bg-red-50 border-red-200">
              <div className="flex items-center gap-2 text-red-700">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < hearts ? 'bg-red-500' : 'bg-red-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{hearts}/5</span>
              </div>
            </Card>

            {/* Question Navigation */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Questions
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((questionNum) => (
                  <Button
                    key={questionNum}
                    variant={questionNum === currentQuestion ? "default" : "secondaryOutline"}
                    size="sm"
                    className={`w-8 h-8 p-0 text-xs ${
                      questionNum === currentQuestion
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => onNavigateToQuestion(questionNum - 1)}
                  >
                    {questionNum}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Stats
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Completed</span>
                  <span className="font-medium">{Math.round(percentage / 20)}/{totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">2:30</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button variant="secondaryOutline" className="w-full" size="sm">
                <Star className="w-4 h-4 mr-2" />
                Practice Mode
              </Button>
              <Button variant="secondaryOutline" className="w-full" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Review
              </Button>
            </div>
          </div>
        ) : (
          /* Collapsed State Icons */
          <div className="space-y-4 pt-8">
            <div className="flex flex-col items-center">
              <BookOpen className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex flex-col items-center">
              <Target className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex flex-col items-center">
              <Trophy className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
