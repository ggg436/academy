import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getAllRegisteredUsersWithProgress } from "@/actions/user-progress";
import { getUserSubscription } from "@/actions/user-subscription";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const LearderboardPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getAllRegisteredUsersWithProgress();

  let userProgress, userSubscription, leaderboard;
  let leaderboardError = null;

  try {
    [userProgress, userSubscription, leaderboard] = await Promise.all([
      userProgressData,
      userSubscriptionData,
      leaderboardData,
    ]);
  } catch (error) {
    console.error("Error loading leaderboard data:", error);
    leaderboardError = error instanceof Error ? error.message : "Unknown error";
    
    // Still try to get user progress for the sidebar
    try {
      [userProgress, userSubscription] = await Promise.all([
        userProgressData,
        userSubscriptionData,
      ]);
    } catch (sidebarError) {
      console.error("Error loading sidebar data:", sidebarError);
    }
    
    leaderboard = [];
  }

  const hasCourse = !!(userProgress && userProgress.activeCourseId);
  const isPro = !!userSubscription?.isActive;

  // Debug logging
  console.log("Leaderboard data:", {
    totalUsers: leaderboard.length,
    hasError: !!leaderboardError,
    error: leaderboardError,
    sampleUsers: leaderboard.slice(0, 3).map((u: any) => ({
      userId: u.userId,
      userName: u.userName,
      userImageSrc: u.userImageSrc,
      points: u.points,
    }))
  });

  return ( 
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {hasCourse && (
        <StickyWrapper>
          <UserProgress
            activeCourse={{
              id: userProgress!.activeCourseId,
              title: "Spanish",
              imageSrc: "/es.svg"
            }}
            hearts={userProgress!.hearts}
            points={userProgress!.points}
            hasActiveSubscription={isPro}
          />
          {!isPro && (
            <Promo />
          )}
          <Quests points={userProgress!.points} />
        </StickyWrapper>
      )}
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the community.
          </p>
          
          {/* Debug information */}
          {leaderboardError ? (
            <div className="text-center text-red-600 py-4 mb-4 bg-red-50 rounded-lg border border-red-200">
              <p className="mb-2 font-semibold">Firebase Error: Cannot Load Real User Data</p>
              <p className="text-sm mb-3">{leaderboardError}</p>
              <div className="flex gap-2 justify-center">
                <a 
                  href="/debug" 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                >
                  Debug Firebase Configuration
                </a>
                <a 
                  href="/leaderboard" 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                >
                  Retry
                </a>
              </div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center text-muted-foreground py-4 mb-4">
              <p className="mb-2">No users found. This might be a Firebase configuration issue.</p>
              <div className="flex gap-2 justify-center">
                <a 
                  href="/debug" 
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  Debug Firebase Configuration
                </a>
                <span className="text-gray-400">|</span>
                <a 
                  href="/leaderboard" 
                  className="text-green-600 hover:text-green-800 underline text-sm"
                >
                  Refresh Leaderboard
                </a>
              </div>
            </div>
          ) : null}
          
          <Separator className="mb-4 h-0.5 rounded-full" />
          
          {leaderboard.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p className="mb-2">No users found. This might be a Firebase configuration issue.</p>
              <p className="text-sm mt-2 mb-4">Check the console for debugging information.</p>
              <a 
                href="/debug" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
              >
                Debug Firebase Configuration
              </a>
            </div>
          ) : (
            leaderboard.map((userProgress: any, index: number) => (
              <div 
                key={userProgress.userId}
                className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
              >
                <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                <Avatar
                  className="border bg-green-500 h-12 w-12 ml-3 mr-6"
                >
                  <AvatarImage
                    className="object-cover"
                    src={userProgress.userImageSrc}
                    alt={userProgress.userName}
                  />
                  <AvatarFallback className="bg-green-100 text-green-600 text-xs font-semibold">
                    {userProgress.userName ? userProgress.userName.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <p className="font-bold text-neutral-800 flex-1">
                  {userProgress.userName}
                </p>
                <p className="text-muted-foreground">
                  {userProgress.points} XP
                </p>
              </div>
            ))
          )}
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default LearderboardPage;
