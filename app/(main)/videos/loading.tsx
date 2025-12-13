import { Card } from "@/components/ui/card";

export default function VideosLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-10 w-80 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="h-6 w-96 bg-gray-300 rounded animate-pulse mx-auto"></div>
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Course Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              {/* Thumbnail Skeleton */}
              <div className="h-48 bg-gray-300 animate-pulse"></div>
              
              {/* Content Skeleton */}
              <div className="p-6">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-full bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse mb-4"></div>
                
                {/* Tags Skeleton */}
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-6 w-14 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
                
                {/* Stats Skeleton */}
                <div className="flex justify-between mb-4">
                  <div className="h-4 w-12 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                </div>
                
                {/* Button Skeleton */}
                <div className="h-12 w-full bg-gray-300 rounded animate-pulse"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section Skeleton */}
        <div className="mt-16">
          <div className="h-8 w-48 bg-gray-300 rounded animate-pulse mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="h-8 w-16 bg-gray-300 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-5 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
