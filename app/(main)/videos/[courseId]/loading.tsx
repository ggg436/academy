import { Card } from "@/components/ui/card";

export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6">
          <div className="h-5 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Course Header Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Course Info Skeleton */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
            </div>
            
            <div className="h-12 w-full bg-gray-300 rounded animate-pulse mb-4"></div>
            
            <div className="h-6 w-full bg-gray-300 rounded animate-pulse mb-6"></div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-8 w-20 bg-gray-300 rounded-full animate-pulse"></div>
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-5 w-32 bg-gray-300 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          
          {/* Course Card Skeleton */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 w-48 bg-gray-300 rounded animate-pulse mx-auto mb-4"></div>
              </div>
              
              <div className="h-12 w-full bg-gray-300 rounded animate-pulse mb-4"></div>
              
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex justify-between">
                    <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Course Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Skeleton */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="h-8 w-32 bg-gray-300 rounded animate-pulse mb-4"></div>
              
              <div className="aspect-video bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-5 w-16 bg-gray-300 rounded animate-pulse"></div>
              </div>
              
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-4"></div>
              
              <div className="flex gap-3">
                <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </Card>
          </div>
          
          {/* Lessons List Skeleton */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-5 w-32 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-4 w-12 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-2"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-4 w-6 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Course Details Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Prerequisites Skeleton */}
          <Card className="p-6">
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-4"></div>
            <ul className="space-y-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-300 rounded animate-pulse"></div>
                </li>
              ))}
            </ul>
          </Card>
          
          {/* Learning Outcomes Skeleton */}
          <Card className="p-6">
            <div className="h-6 w-40 bg-gray-300 rounded animate-pulse mb-4"></div>
            <ul className="space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 animate-pulse"></div>
                  <div className="h-4 w-56 bg-gray-300 rounded animate-pulse"></div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Call to Action Skeleton */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="h-8 w-64 bg-white bg-opacity-20 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-5 w-96 bg-white bg-opacity-20 rounded animate-pulse mx-auto mb-6"></div>
            <div className="h-12 w-48 bg-white bg-opacity-20 rounded animate-pulse mx-auto"></div>
          </Card>
        </div>
      </div>
    </div>
  );
} 