import Image from "next/image";
import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress } from "@/actions/user-progress";
import { getUserSubscription } from "@/actions/user-subscription";

import { Items } from "./items";
import { Quests } from "@/components/quests";

const ShopPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData
  ]);

  // Allow access without authentication - use default values
  const defaultProgress = {
    hearts: 5,
    points: 0,
    activeCourseId: "python"
  };

  const isPro = !!userSubscription?.isActive;
  const progress = userProgress || defaultProgress;

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
            src="/shop.svg"
            alt="Shop"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff.
          </p>
          
          {/* Demo text for text selection feature */}
          <div className="w-full max-w-2xl mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              💡 Try the Text Selection Feature!
            </h3>
            <p className="text-blue-700 mb-3">
              Select any text below to get an AI-powered explanation powered by Gemini AI:
            </p>
            <div className="space-y-2 text-sm text-blue-600">
              <p>• <span className="font-medium">JavaScript</span> - A programming language for web development</p>
              <p>• <span className="font-medium">React</span> - A JavaScript library for building user interfaces</p>
              <p>• <span className="font-medium">API</span> - Application Programming Interface for data exchange</p>
              <p>• <span className="font-medium">CSS</span> - Cascading Style Sheets for web styling</p>
              <p>• <span className="font-medium">Database</span> - Organized collection of structured information</p>
            </div>
            <p className="text-xs text-blue-500 mt-3">
              Simply select any word or phrase above to see an AI explanation!
            </p>
          </div>
          
          <Items
            hearts={progress.hearts}
            points={progress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default ShopPage;
