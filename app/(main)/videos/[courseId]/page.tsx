"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";

// Desmos Course type definition
interface DesmosCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  lessons: number;
  rating: number;
  students: number;
  tags: string[];
  instructor: string;
  lastUpdated: string;
  prerequisites: string[];
  learningOutcomes: string[];
  videoUrl?: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoUrl: string;
  completed: boolean;
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<DesmosCourse | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sample course data - in a real app, this would come from an API
  const courseData: DesmosCourse = {
    id: "desmos-basics",
    title: "Desmos Graphing Calculator Basics",
    description: "Learn the fundamentals of Desmos graphing calculator. Master plotting functions, creating tables, and exploring mathematical concepts visually. This comprehensive course covers everything from basic navigation to advanced graphing techniques.",
    thumbnail: "/video.svg",
    duration: "2h 15m",
    difficulty: "Beginner",
    category: "Fundamentals",
    lessons: 12,
    rating: 4.8,
    students: 1247,
    tags: ["Graphing", "Functions", "Basics", "Calculator", "Mathematics", "Visual Learning"],
    instructor: "Dr. Sarah Chen",
    lastUpdated: "2024-01-15",
    prerequisites: ["Basic algebra knowledge", "Familiarity with coordinate systems"],
    learningOutcomes: [
      "Navigate the Desmos interface confidently",
      "Plot and manipulate basic functions",
      "Create and customize tables",
      "Use sliders for interactive exploration",
      "Export and share your graphs"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  };

  // Sample lessons data
  const lessonsData: Lesson[] = [
    {
      id: "lesson-1",
      title: "Introduction to Desmos",
      duration: "15m",
      description: "Get familiar with the Desmos interface and basic navigation",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false
    },
    {
      id: "lesson-2",
      title: "Plotting Your First Function",
      duration: "20m",
      description: "Learn how to plot basic functions like y = x² and y = 2x + 1",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false
    },
    {
      id: "lesson-3",
      title: "Working with Tables",
      duration: "18m",
      description: "Create and customize tables to organize data and functions",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false
    },
    {
      id: "lesson-4",
      title: "Using Sliders",
      duration: "22m",
      description: "Add sliders to make your graphs interactive and dynamic",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false
    },
    {
      id: "lesson-5",
      title: "Function Transformations",
      duration: "25m",
      description: "Explore how to transform functions using parameters",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false
    },
    {
      id: "lesson-6",
      title: "Advanced Graphing Techniques",
      duration: "30m",
      description: "Master advanced features like inequalities and piecewise functions",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setCourse(courseData);
    setLessons(lessonsData);
    setCurrentLesson(lessonsData[0]?.id || null);
  }, [courseId]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-600 bg-green-100";
      case "Intermediate": return "text-yellow-600 bg-yellow-100";
      case "Advanced": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Fundamentals": return "🔰";
      case "Functions": return "📈";
      case "Geometry": return "📐";
      case "Calculus": return "∫";
      case "Statistics": return "📊";
      case "3D Graphing": return "🎲";
      case "Algebra": return "🔢";
      case "Trigonometry": return "🌊";
      default: return "📚";
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-xl font-semibold text-gray-700">Loading course...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/videos" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Videos
          </Link>
        </div>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{getCategoryIcon(course.category)}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
            
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {course.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐</span>
                <span>{course.rating} ({course.students} students)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">⏱️</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">📚</span>
                <span>{course.lessons} lessons</span>
              </div>
            </div>
          </div>
          
          {/* Course Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl text-white">{getCategoryIcon(course.category)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Start Learning</h3>
                <p className="text-gray-600 text-sm mb-4">Begin your mathematical journey today</p>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 mb-4"
                onClick={() => setCurrentLesson(lessons[0]?.id || null)}
              >
                🚀 Start Course
              </Button>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{new Date(course.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{course.category}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              
              {currentLesson && (
                <div className="mb-6">
                  <div className="aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden">
                    <iframe
                      src={course.videoUrl}
                      title={course.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      {lessons.find(l => l.id === currentLesson)?.title}
                    </h3>
                    <span className="text-gray-600">
                      {lessons.find(l => l.id === currentLesson)?.duration}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {lessons.find(l => l.id === currentLesson)?.description}
                  </p>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => {
                        const currentIndex = lessons.findIndex(l => l.id === currentLesson);
                        if (currentIndex > 0) {
                          setCurrentLesson(lessons[currentIndex - 1].id);
                        }
                      }}
                      disabled={lessons.findIndex(l => l.id === currentLesson) === 0}
                      variant="secondary"
                    >
                      ⏮️ Previous
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        const currentIndex = lessons.findIndex(l => l.id === currentLesson);
                        if (currentIndex < lessons.length - 1) {
                          setCurrentLesson(lessons[currentIndex + 1].id);
                        }
                      }}
                      disabled={lessons.findIndex(l => l.id === currentLesson) === lessons.length - 1}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Next ⏭️
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
          
          {/* Lessons List */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Course Lessons</h3>
              <div className="space-y-3">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentLesson === lesson.id 
                        ? 'bg-blue-100 border border-blue-300' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentLesson(lesson.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{lesson.title}</span>
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{lesson.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">Lesson {index + 1}</span>
                      {lesson.completed && (
                        <span className="text-green-500 text-sm">✅</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Course Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Prerequisites */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">📋 Prerequisites</h3>
            <ul className="space-y-2">
              {course.prerequisites.map((prereq, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-gray-700">{prereq}</span>
                </li>
              ))}
            </ul>
          </Card>
          
          {/* Learning Outcomes */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">🎯 What You&apos;ll Learn</h3>
            <ul className="space-y-2">
              {course.learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Master Desmos?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of students who are already learning mathematics through interactive visual experiences. 
              Start your journey today with this comprehensive course.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              onClick={() => setCurrentLesson(lessons[0]?.id || null)}
            >
              🎯 Start Learning Now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
} 