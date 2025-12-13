import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress } from "@/actions/user-progress";
import { getUserSubscription } from "@/actions/user-subscription";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

const QuizesPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  // Allow access without authentication - use default values
  const defaultProgress = {
    hearts: 5,
    points: 0,
    activeCourseId: "python"
  };
  const progress = userProgress || defaultProgress;

  const isPro = !!userSubscription?.isActive;

  return ( 
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{
            id: progress.activeCourseId,
            title: "Python",
            imageSrc: "/python.svg"
          }}
          hearts={progress.hearts}
          points={progress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && (
          <Promo />
        )}
        <Quests points={progress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/quests.svg"
            alt="Quizes"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quizes
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Test your knowledge with interactive quizzes.
          </p>
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg border-2 border-b-4 border-gray-200 p-6 text-center">
              <p className="text-neutral-600 mb-4">
                Quiz functionality coming soon!
              </p>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                🚧 Under Development
              </div>
            </div>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default QuizesPage;
