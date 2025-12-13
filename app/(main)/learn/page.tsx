import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getCourseById, getCourses } from "@/lib/data";
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

  // Allow access without authentication - show default course if no progress
  const activeCourseId = userProgress?.activeCourseId || "python";
  const course = getCourseById(activeCourseId);
  
  if (!course) {
    // If no course found, show first available course
    const courses = getCourses();
    const defaultCourse = courses[0];
    if (!defaultCourse) {
      return <div>No courses available</div>;
    }
    const defaultUnits = defaultCourse.units.map(unit => ({
      ...unit,
      lessons: unit.lessons.map(lesson => ({
        ...lesson,
        completed: false,
        percentage: 0,
      })),
    }));
    
    return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgress
            activeCourse={defaultCourse}
            hearts={5}
            points={0}
            hasActiveSubscription={false}
          />
          <Promo />
          <Quests points={0} />
        </StickyWrapper>
        <FeedWrapper>
          <Header title={defaultCourse.title} />
          <div className="space-y-4">
            {defaultUnits.map((unit) => (
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
                  activeLesson={unit.lessons[0] && {
                    ...unit.lessons[0],
                    unit: {
                      ...unit,
                      lessons: unit.lessons
                    }
                  }}
                  activeLessonPercentage={0}
                  courseId={defaultCourse.id}
                />
              </div>
            ))}
          </div>
        </FeedWrapper>
      </div>
    );
  }

  // Calculate lesson percentages for each unit
  const units = course.units.map(unit => ({
    ...unit,
    lessons: unit.lessons.map(lesson => {
      const completed = userProgress?.completedLessons?.includes(lesson.id) ?? false;
      return {
        ...lesson,
        completed,
        percentage: completed ? 100 : 0,
      };
    }),
  }));

  // Calculate course progress
  const totalLessons = units.reduce((acc, unit) => acc + unit.lessons.length, 0);
  const completedLessons = userProgress?.completedLessons?.length ?? 0;
  const courseProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={course}
          hearts={userProgress?.hearts ?? 5}
          points={userProgress?.points ?? 0}
          hasActiveSubscription={isPro}
        />
        <Promo />
        <Quests points={userProgress?.points || 0} />
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
                courseId={course.id}
              />
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
