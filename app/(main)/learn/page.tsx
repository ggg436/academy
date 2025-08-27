import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getCourseById } from "@/lib/data";
import { getUserProgress } from "@/actions/user-progress";
import { getUserSubscription } from "@/actions/user-subscription";

import { Unit } from "./unit";
import { Header } from "./header";
import { Course, Unit as UnitType } from "./types";

const LearnPage = async () => {
  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);

  // If user is not authenticated or doesn't have progress, redirect to courses
  if (!userProgress || !userProgress.activeCourseId) {
    redirect("/courses");
  }

  const course = getCourseById(userProgress.activeCourseId);
  if (!course) {
    redirect("/courses");
  }

  // Calculate lesson percentages for each unit
  const units = course.units.map(unit => ({
    ...unit,
    lessons: unit.lessons.map(lesson => {
      const completed = userProgress.completedLessons?.includes(lesson.id) ?? false;
      return {
        ...lesson,
        completed,
        percentage: completed ? 100 : 0,
      };
    }),
  }));

  // Calculate course progress
  const totalLessons = units.reduce((acc, unit) => acc + unit.lessons.length, 0);
  const completedLessons = userProgress.completedLessons?.length ?? 0;
  const courseProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={course}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        <Promo />
        <Quests points={userProgress.points || 0} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={course.title} />
        <div className="space-y-4">
          {units.map((unit) => (
            <div 
              key={unit.id}
              className="border-2 border-b-4 border-background rounded-xl p-4 hover:bg-gray-75"
            >
              <Unit
                id={unit.id}
                title={unit.title}
                description={`Complete ${unit.lessons.length} lessons to master ${unit.title}`}
                lessons={unit.lessons}
                order={unit.order}
                activeLesson={unit.lessons.find(l => !l.completed) && {
                  ...unit.lessons.find(l => !l.completed)!,
                  unit: {
                    ...unit,
                    lessons: unit.lessons
                  }
                }}
                activeLessonPercentage={0}
              />
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
