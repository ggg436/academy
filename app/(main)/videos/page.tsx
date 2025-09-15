"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Video Course type definition
interface VideoCourse {
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
  price: number;
  isFree: boolean;
  isFeatured: boolean;
  language: string;
  certificate: boolean;
}

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample video courses data
  const videoCourses: VideoCourse[] = [
    {
      id: "python-basics",
      title: "Python Programming Fundamentals",
      description: "Master the basics of Python programming language. Learn variables, loops, functions, and object-oriented programming concepts.",
      thumbnail: "/python.svg",
      duration: "8h 30m",
      difficulty: "Beginner",
      category: "Programming",
      lessons: 24,
      rating: 4.9,
      students: 15420,
      tags: ["Python", "Programming", "Basics", "Coding"],
      instructor: "Dr. Alex Johnson",
      lastUpdated: "2024-01-20",
      price: 0,
      isFree: true,
      isFeatured: true,
      language: "English",
      certificate: true
    },
    {
      id: "web-development",
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, React, and Node.js to become a full-stack web developer.",
      thumbnail: "/html.svg",
      duration: "45h 15m",
      difficulty: "Intermediate",
      category: "Web Development",
      lessons: 156,
      rating: 4.8,
      students: 8920,
      tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      instructor: "Sarah Williams",
      lastUpdated: "2024-01-18",
      price: 99,
      isFree: false,
      isFeatured: true,
      language: "English",
      certificate: true
    },
    {
      id: "data-science",
      title: "Data Science with Python",
      description: "Learn data analysis, visualization, and machine learning using Python libraries like Pandas, NumPy, and Scikit-learn.",
      thumbnail: "/python.svg",
      duration: "32h 45m",
      difficulty: "Advanced",
      category: "Data Science",
      lessons: 89,
      rating: 4.7,
      students: 5670,
      tags: ["Python", "Data Science", "Machine Learning", "Pandas"],
      instructor: "Dr. Michael Chen",
      lastUpdated: "2024-01-15",
      price: 149,
      isFree: false,
      isFeatured: false,
      language: "English",
      certificate: true
    },
    {
      id: "mobile-app-dev",
      title: "Mobile App Development with Flutter",
      description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.",
      thumbnail: "/flutter.svg",
      duration: "28h 20m",
      difficulty: "Intermediate",
      category: "Mobile Development",
      lessons: 67,
      rating: 4.6,
      students: 4230,
      tags: ["Flutter", "Dart", "Mobile", "Cross-platform"],
      instructor: "Emily Rodriguez",
      lastUpdated: "2024-01-12",
      price: 79,
      isFree: false,
      isFeatured: false,
      language: "English",
      certificate: true
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Fundamentals",
      description: "Learn essential cybersecurity concepts, ethical hacking, and security best practices to protect systems and data.",
      thumbnail: "/security.svg",
      duration: "25h 10m",
      difficulty: "Intermediate",
      category: "Cybersecurity",
      lessons: 58,
      rating: 4.8,
      students: 6780,
      tags: ["Security", "Ethical Hacking", "Networking", "Cryptography"],
      instructor: "James Thompson",
      lastUpdated: "2024-01-10",
      price: 129,
      isFree: false,
      isFeatured: false,
      language: "English",
      certificate: true
    },
    {
      id: "ai-ml-basics",
      title: "Artificial Intelligence & Machine Learning",
      description: "Introduction to AI and ML concepts, algorithms, and practical applications using Python.",
      thumbnail: "/ai.svg",
      duration: "38h 45m",
      difficulty: "Advanced",
      category: "Artificial Intelligence",
      lessons: 92,
      rating: 4.9,
      students: 7890,
      tags: ["AI", "Machine Learning", "Neural Networks", "Python"],
      instructor: "Dr. Lisa Park",
      lastUpdated: "2024-01-08",
      price: 199,
      isFree: false,
      isFeatured: true,
      language: "English",
      certificate: true
    },
    {
      id: "game-development",
      title: "Game Development with Unity",
      description: "Create 2D and 3D games using Unity game engine. Learn C# programming and game design principles.",
      thumbnail: "/games.svg",
      duration: "42h 30m",
      difficulty: "Intermediate",
      category: "Game Development",
      lessons: 78,
      rating: 4.7,
      students: 3450,
      tags: ["Unity", "C#", "Game Design", "3D Modeling"],
      instructor: "David Kim",
      lastUpdated: "2024-01-05",
      price: 89,
      isFree: false,
      isFeatured: false,
      language: "English",
      certificate: true
    },
    {
      id: "database-design",
      title: "Database Design & SQL Mastery",
      description: "Learn database design principles, SQL programming, and database administration best practices.",
      thumbnail: "/sql.svg",
      duration: "20h 15m",
      difficulty: "Intermediate",
      category: "Database",
      lessons: 45,
      rating: 4.6,
      students: 5120,
      tags: ["SQL", "Database Design", "MySQL", "PostgreSQL"],
      instructor: "Maria Garcia",
      lastUpdated: "2024-01-03",
      price: 69,
      isFree: false,
      isFeatured: false,
      language: "English",
      certificate: true
    }
  ];

  const categories = [
    { id: "all", name: "All Courses", icon: "" },
    { id: "Programming", name: "Programming", icon: "" },
    { id: "Web Development", name: "Web Development", icon: "" },
    { id: "Data Science", name: "Data Science", icon: "" },
    { id: "Mobile Development", name: "Mobile Development", icon: "" },
    { id: "Cybersecurity", name: "Cybersecurity", icon: "" },
    { id: "Artificial Intelligence", name: "AI & ML", icon: "" },
    { id: "Game Development", name: "Game Development", icon: "" },
    { id: "Database", name: "Database", icon: "" }
  ];

  const difficulties = [
    { id: "all", name: "All Levels", icon: "" },
    { id: "Beginner", name: "Beginner", icon: "" },
    { id: "Intermediate", name: "Intermediate", icon: "" },
    { id: "Advanced", name: "Advanced", icon: "" }
  ];

  const filteredCourses = videoCourses.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-600 bg-green-100";
      case "Intermediate": return "text-yellow-600 bg-yellow-100";
      case "Advanced": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : "";
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800"> Video Courses</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master new skills with our comprehensive video courses. From programming to data science, 
          learn at your own pace with expert instructors.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search courses, topics, or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Category and Difficulty Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "secondary" : "default"}
                size="sm"
                className="flex items-center gap-2"
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </Button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2 flex-wrap">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                variant={selectedDifficulty === difficulty.id ? "secondary" : "default"}
                size="sm"
                className="flex items-center gap-2"
              >
                <span>{difficulty.icon}</span>
                <span className="hidden sm:inline">{difficulty.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      {filteredCourses.filter(course => course.isFeatured).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800"> Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses
              .filter(course => course.isFeatured)
              .map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Course Thumbnail */}
                  <div className="relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-48 object-cover"
                    />
                    {course.isFree && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        FREE
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                      {course.duration}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 space-y-4">
                    {/* Difficulty and Category */}
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getCategoryIcon(course.category)} {course.category}
                      </span>
                    </div>

                    {/* Course Title and Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {course.description}
                      </p>
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span> {course.rating}</span>
                        <span> {course.students.toLocaleString()}</span>
                        <span> {course.lessons} lessons</span>
                      </div>
                    </div>

                    {/* Instructor and Last Updated */}
                    <div className="text-sm text-gray-500">
                      <p> {course.instructor}</p>
                      <p> Updated {course.lastUpdated}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
                         Enroll Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* All Courses */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800"> All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              {/* Course Thumbnail */}
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-40 object-cover"
                />
                {course.isFree && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    FREE
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {course.duration}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4 space-y-3">
                {/* Difficulty and Category */}
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">
                    {getCategoryIcon(course.category)}
                  </span>
                </div>

                {/* Course Title and Description */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span> {course.rating}</span>
                  <span> {course.students.toLocaleString()}</span>
                  <span> {course.lessons}</span>
                </div>

                {/* Action Button */}
                <div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 text-sm">
                     Enroll Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* No Courses Message */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Course Statistics */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">{videoCourses.length}</div>
            <div className="text-gray-600">Total Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">{videoCourses.filter(c => c.isFree).length}</div>
            <div className="text-gray-600">Free Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">{videoCourses.reduce((sum, c) => sum + c.lessons, 0)}</div>
            <div className="text-gray-600">Total Lessons</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">{videoCourses.reduce((sum, c) => sum + c.students, 0).toLocaleString()}</div>
            <div className="text-gray-600">Total Students</div>
          </div>
        </div>
      </Card>
    </div>
  );
}



