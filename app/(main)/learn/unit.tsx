"use client";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";
import { Lesson, Unit as UnitType } from "./types";
import { useLanguage } from "@/contexts/language-context";

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
  courseId: string;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
  courseId,
}: Props) => {
  const { language } = useLanguage();
  const desc = language === "ne"
    ? `${title} सिक्न ${lessons.length} पाठ पुरा गर्नुहोस्`
    : language === "mai"
    ? `${title} सिखबाक लेल ${lessons.length} लेसन पूरा करू`
    : language === "new"
    ? `${title} सिक्न ${lessons.length} पाठ पूरा गरौं`
    : `Complete ${lessons.length} lessons to master ${title}`;

  return (
    <>
      <UnitBanner 
        title={title} 
        description={desc} 
        unitOrder={order}
      />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = false; // All lessons unlocked for now
          
          // Create descriptive step names based on lesson and unit
          let stepName = "";
          
          // Unit 1 lessons
          if (lesson.id === "lesson-1") {
            if (courseId === "python") {
              stepName = index === 0 ? "python-introduction" : "python-basics";
            } else if (courseId === "c") {
              stepName = index === 0 ? "c-tutorial" : index === 1 ? "examples-in-each-chapter" : index === 2 ? "c-exercises" : index === 3 ? "c-quiz" : "c-reference";
            } else {
              stepName = index === 0 ? "html-introduction" : index === 1 ? "html-element" : index === 2 ? "web-browsers" : index === 3 ? "html-page-structure" : index === 4 ? "html-history" : index === 5 ? "html-forms" : index === 6 ? "html-tables" : index === 7 ? "html-lists" : index === 8 ? "html-media" : "html-best-practices";
            }
          } else if (lesson.id === "lesson-2") {
            if (courseId === "c") {
              stepName = index === 0 ? "pointers-tutorial" : index === 1 ? "examples-in-each-chapter" : index === 2 ? "pointers-exercises" : index === 3 ? "pointers-quiz" : "pointers-reference";
            } else {
              stepName = index === 0 ? "html-basics-intro" : "html-basics-advanced";
            }
          } else if (lesson.id === "lesson-3") {
            stepName = index === 0 ? "html-elements-basic" : "html-elements-advanced";
          } else if (lesson.id === "lesson-4") {
            stepName = index === 0 ? "html-attributes" : "html-attributes-advanced";
          } else if (lesson.id === "lesson-5") {
            stepName = index === 0 ? "html-structure" : "html-structure-advanced";
          }
          // Unit 2 lessons
          else if (lesson.id === "lesson-6") {
            if (courseId === "python") {
              stepName = index === 0 ? "oop-introduction" : "oop-advanced";
            } else if (courseId === "javascript") {
              stepName = index === 0 ? "es6-features-intro" : "es6-features-advanced";
            } else if (courseId === "css") {
              stepName = index === 0 ? "css-animations-intro" : "css-animations-advanced";
            } else if (courseId === "react") {
              stepName = index === 0 ? "hooks-advanced-intro" : "hooks-advanced-usage";
            } else if (courseId === "node") {
              stepName = index === 0 ? "database-intro" : "database-advanced";
            } else if (courseId === "flutter") {
              stepName = index === 0 ? "state-management-advanced" : "state-management-patterns";
            } else if (courseId === "ai") {
              stepName = index === 0 ? "deep-learning-intro" : "deep-learning-advanced";
            } else if (courseId === "typescript") {
              stepName = index === 0 ? "advanced-types-intro" : "advanced-types-usage";
            } else if (courseId === "c") {
              stepName = index === 0 ? "advanced-pointers-intro" : "advanced-pointers-usage";
            } else if (courseId === "cpp") {
              stepName = index === 0 ? "advanced-oop-intro" : "advanced-oop-patterns";
            } else if (courseId === "csharp") {
              stepName = index === 0 ? "advanced-csharp-features" : "advanced-csharp-patterns";
            } else {
              stepName = index === 0 ? "html-semantics-intro" : "html-semantics-advanced";
            }
          } else if (lesson.id === "lesson-7") {
            if (courseId === "python") {
              stepName = index === 0 ? "file-handling-intro" : "file-handling-advanced";
            } else if (courseId === "javascript") {
              stepName = index === 0 ? "async-programming-intro" : "async-programming-patterns";
            } else if (courseId === "css") {
              stepName = index === 0 ? "css-variables-intro" : "css-variables-advanced";
            } else if (courseId === "react") {
              stepName = index === 0 ? "state-management-intro" : "state-management-patterns";
            } else if (courseId === "node") {
              stepName = index === 0 ? "authentication-intro" : "authentication-advanced";
            } else if (courseId === "flutter") {
              stepName = index === 0 ? "custom-widgets-intro" : "custom-widgets-advanced";
            } else if (courseId === "ai") {
              stepName = index === 0 ? "computer-vision-intro" : "computer-vision-advanced";
            } else if (courseId === "typescript") {
              stepName = index === 0 ? "decorators-intro" : "decorators-advanced";
            } else if (courseId === "c") {
              stepName = index === 0 ? "dynamic-memory-intro" : "dynamic-memory-advanced";
            } else if (courseId === "cpp") {
              stepName = index === 0 ? "design-patterns-intro" : "design-patterns-implementation";
            } else if (courseId === "csharp") {
              stepName = index === 0 ? "web-apis-intro" : "web-apis-advanced";
            } else {
              stepName = index === 0 ? "forms-advanced-intro" : "forms-advanced-practices";
            }
          } else if (lesson.id === "lesson-8") {
            if (courseId === "python") {
              stepName = index === 0 ? "error-handling-intro" : "error-handling-advanced";
            } else if (courseId === "javascript") {
              stepName = index === 0 ? "error-handling-intro" : "error-handling-patterns";
            } else if (courseId === "css") {
              stepName = index === 0 ? "css-preprocessors-intro" : "css-preprocessors-advanced";
            } else if (courseId === "react") {
              stepName = index === 0 ? "performance-intro" : "performance-optimization";
            } else if (courseId === "node") {
              stepName = index === 0 ? "error-handling-intro" : "error-handling-patterns";
            } else if (courseId === "flutter") {
              stepName = index === 0 ? "animations-intro" : "animations-advanced";
            } else if (courseId === "ai") {
              stepName = index === 0 ? "nlp-intro" : "nlp-advanced";
            } else if (courseId === "typescript") {
              stepName = index === 0 ? "namespaces-intro" : "namespaces-advanced";
            } else if (courseId === "c") {
              stepName = index === 0 ? "data-structures-intro" : "data-structures-implementation";
            } else if (courseId === "cpp") {
              stepName = index === 0 ? "concurrency-intro" : "concurrency-patterns";
            } else if (courseId === "csharp") {
              stepName = index === 0 ? "authentication-intro" : "authentication-advanced";
            } else {
              stepName = index === 0 ? "tables-advanced-intro" : "tables-advanced-styling";
            }
          } else if (lesson.id === "lesson-9") {
            if (courseId === "python") {
              stepName = index === 0 ? "modules-intro" : "modules-advanced";
            } else if (courseId === "javascript") {
              stepName = index === 0 ? "modules-intro" : "modules-bundlers";
            } else if (courseId === "css") {
              stepName = index === 0 ? "css-architecture-intro" : "css-architecture-patterns";
            } else if (courseId === "react") {
              stepName = index === 0 ? "testing-intro" : "testing-advanced";
            } else if (courseId === "node") {
              stepName = index === 0 ? "testing-intro" : "testing-advanced";
            } else if (courseId === "flutter") {
              stepName = index === 0 ? "testing-intro" : "testing-advanced";
            } else if (courseId === "ai") {
              stepName = index === 0 ? "reinforcement-learning-intro" : "reinforcement-learning-advanced";
            } else if (courseId === "typescript") {
              stepName = index === 0 ? "testing-intro" : "testing-advanced";
            } else if (courseId === "c") {
              stepName = index === 0 ? "preprocessor-intro" : "preprocessor-advanced";
            } else if (courseId === "cpp") {
              stepName = index === 0 ? "metaprogramming-intro" : "metaprogramming-advanced";
            } else if (courseId === "csharp") {
              stepName = index === 0 ? "testing-intro" : "testing-advanced";
            } else {
              stepName = index === 0 ? "multimedia-intro" : "multimedia-advanced";
            }
          } else if (lesson.id === "lesson-10") {
            if (courseId === "python") {
              stepName = index === 0 ? "web-development-intro" : "web-development-advanced";
            } else if (courseId === "javascript") {
              stepName = index === 0 ? "testing-debugging-intro" : "testing-debugging-advanced";
            } else if (courseId === "css") {
              stepName = index === 0 ? "css-performance-intro" : "css-performance-optimization";
            } else if (courseId === "react") {
              stepName = index === 0 ? "deployment-intro" : "deployment-advanced";
            } else if (courseId === "node") {
              stepName = index === 0 ? "deployment-intro" : "deployment-advanced";
            } else if (courseId === "flutter") {
              stepName = index === 0 ? "deployment-intro" : "deployment-advanced";
            } else if (courseId === "ai") {
              stepName = index === 0 ? "ai-ethics-intro" : "ai-ethics-considerations";
            } else if (courseId === "typescript") {
              stepName = index === 0 ? "best-practices-intro" : "best-practices-advanced";
            } else if (courseId === "c") {
              stepName = index === 0 ? "system-programming-intro" : "system-programming-advanced";
            } else if (courseId === "cpp") {
              stepName = index === 0 ? "performance-intro" : "performance-optimization";
            } else if (courseId === "csharp") {
              stepName = index === 0 ? "deployment-intro" : "deployment-advanced";
            } else {
              stepName = index === 0 ? "seo-basics-intro" : "seo-basics-advanced";
            }
          }
          // Fallback for other lessons
          else {
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
              completed={lesson.completed}
            />
          );
        })}
      </div>
    </>
  );
};
