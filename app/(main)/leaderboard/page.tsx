import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getAllRegisteredUsersWithProgress } from "@/actions/user-progress";
import { getUserSubscription } from "@/actions/user-subscription";
import { Separator } from "@/components/ui/separator";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { UpdateGmailPhotoButton } from "@/components/update-gmail-photo-button";
import { UpdateAllGmailPhotosButton } from "@/components/update-all-gmail-photos-button";
import { UserAvatar } from "@/components/user-avatar";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate random users with Indian and Nepali-like names
const generateRandomUsers = () => {
  const indianNames = [
    "Arjun Sharma", "Priya Patel", "Rajesh Kumar", "Sneha Gupta", "Vikram Singh",
    "Kavya Reddy", "Amit Kumar", "Deepika Joshi", "Rohit Verma", "Ananya Iyer",
    "Suresh Nair", "Meera Desai", "Kiran Shah", "Ravi Agarwal", "Pooja Mehta",
    "Nikhil Jain", "Shruti Rao", "Manoj Tiwari", "Ritu Choudhary", "Sandeep Yadav",
    "Neha Agarwal", "Vishal Pandey", "Kritika Sharma", "Abhishek Singh", "Divya Mishra",
    "Rahul Gupta", "Swati Jain", "Pankaj Kumar", "Anjali Verma", "Siddharth Patel",
    "Isha Reddy", "Gaurav Sharma", "Riya Singh", "Harsh Kumar", "Tanvi Agarwal"
  ];

  const nepaliNames = [
    "Bikram Thapa", "Sita Gurung", "Ram Bahadur", "Gita Magar", "Krishna Tamang",
    "Laxmi Rai", "Hari Poudel", "Maya Limbu", "Suresh Shrestha", "Puja Karki",
    "Nabin Bista", "Rita Maharjan", "Dipak Thakuri", "Sunita Basnet", "Rajendra Koirala",
    "Bina Acharya", "Mohan Ghimire", "Sarita Dhakal", "Kumar Shrestha", "Rekha Pradhan",
    "Bishnu Adhikari", "Sangita Timilsina", "Prakash Bhattarai", "Usha Nepal", "Gopal Pokhrel",
    "Indira Kafle", "Keshav Joshi", "Radha Paudel", "Narayan Subedi", "Kamala Bhandari",
    "Ramesh K.C.", "Sushila Gurung", "Bharat Thapa", "Laxmi Magar", "Dinesh Rai"
  ];

  const allNames = [...indianNames, ...nepaliNames];
  
  // Generate 35 random users
  const users = [];
  for (let i = 0; i < 35; i++) {
    const randomName = allNames[Math.floor(Math.random() * allNames.length)];
    const randomPoints = Math.floor(Math.random() * 5000) + 100; // Points between 100-5100
    const randomId = `user_${i + 1}`;
    
    users.push({
      userId: randomId,
      userName: randomName,
      userImageSrc: '/logo.svg', // Default avatar
      points: randomPoints,
      hearts: 5,
      activeCourseId: 'spanish'
    });
  }
  
  // Sort by points in descending order
  return users.sort((a, b) => b.points - a.points);
};

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

  // Use random users if no real users are available
  if (leaderboard.length === 0) {
    leaderboard = generateRandomUsers();
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
          
          {/* Show random users message */}
          {leaderboardError && (
            <div className="text-center text-blue-600 py-4 mb-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="mb-2 font-semibold"> Showing Demo Leaderboard</p>
              <p className="text-sm mb-3">Displaying 35 random users with Indian and Nepali names for demonstration</p>
              <div className="flex gap-2 justify-center">
                <a 
                  href="/debug" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                >
                  Debug Firebase Configuration
                </a>
                <a 
                  href="/leaderboard" 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                >
                  Retry Real Data
                </a>
              </div>
            </div>
          )}
          
          <Separator className="mb-4 h-0.5 rounded-full" />
          
          {leaderboard.map((userProgress: any, index: number) => (
            <div 
              key={userProgress.userId}
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            >
              <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
              <UserAvatar 
                userName={userProgress.userName}
                userImageSrc={userProgress.userImageSrc}
              />
              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground">
                {userProgress.points} XP
              </p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default LearderboardPage;
