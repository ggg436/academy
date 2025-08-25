import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";
import { Lesson, Unit as UnitType } from "./types";

type Props = {
  id: string;
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
  activeLesson?: Lesson & {
    unit: UnitType;
  };
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = false; // All lessons unlocked for now
          
          // Create descriptive step names based on lesson
          let stepName = "";
          if (lesson.id === "lesson-1") {
            stepName = index === 0 ? "weare" : index === 1 ? "html-basics" : index === 2 ? "uuiuui" : "sanjok";
          } else if (lesson.id === "lesson-2") {
            stepName = index === 0 ? "hi" : "hlo";
          } else if (lesson.id === "lesson-3") {
            stepName = index === 0 ? "we" : "gue";
          } else if (lesson.id === "lesson-4") {
            stepName = index === 0 ? "html-attributes" : "html-attributes-advanced";
          } else if (lesson.id === "lesson-5") {
            stepName = index === 0 ? "html-structure" : "html-structure-advanced";
          } else {
            stepName = `step-${index + 1}-${lesson.title.toLowerCase().replace(/\s+/g, '-')}`;
          }

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
              stepName={stepName}
            />
          );
        })}
      </div>
    </>
  );
};
