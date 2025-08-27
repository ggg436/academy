import { redirect } from "next/navigation";
import { getUserProgress } from "@/actions/user-progress";
import { getCourses, getCourseById } from "@/lib/data";
import { Quiz } from "../../quiz";
import { Lesson2Content } from "../../lesson-2-content";
import { Lesson3Content } from "../../lesson-3-content";
import { Lesson4Content } from "../../lesson-4-content";
import { Lesson5Content } from "../../lesson-5-content";
import { PythonLesson1Content } from "../../python-lesson-1-content";

type Props = {
  params: {
    lessonId: string;
    stepId: string;
  };
};

const StepPage = async ({
  params,
}: Props) => {
  const userProgress = await getUserProgress();

  if (!userProgress) {
    redirect("/learn");
  }

  // Find the current course
  const course = getCourseById(userProgress.activeCourseId);
  let lessonTitle = "Lesson";
  if (course) {
    for (const unit of course.units) {
      const lesson = unit.lessons.find((l: any) => l.id === params.lessonId);
      if (lesson) {
        lessonTitle = lesson.title;
        break;
      }
    }
  }

  // Extract step number from stepId (e.g., "html-introduction" -> 1, ...)
  let stepNumber = 1;
  
  // Handle new clean URLs
  if (params.lessonId === "lesson-1") {
    // Check if this is Python course
    if (userProgress.activeCourseId === "python") {
      if (params.stepId === "python-introduction") stepNumber = 1;
      else if (params.stepId === "python-basics") stepNumber = 2;
    } else {
      if (params.stepId === "html-introduction") stepNumber = 1;
      else if (params.stepId === "html-element") stepNumber = 2;
      else if (params.stepId === "web-browsers") stepNumber = 3;
      else if (params.stepId === "html-page-structure") stepNumber = 4;
      else if (params.stepId === "html-history") stepNumber = 5;
      else if (params.stepId === "html-forms") stepNumber = 6;
      else if (params.stepId === "html-tables") stepNumber = 7;
      else if (params.stepId === "html-lists") stepNumber = 8;
      else if (params.stepId === "html-media") stepNumber = 9;
      else if (params.stepId === "html-best-practices") stepNumber = 10;
      else if (params.stepId === "wearegoood") stepNumber = 11;
    }
  } else if (params.lessonId === "lesson-2") {
    if (params.stepId === "hi") stepNumber = 1;
    else if (params.stepId === "hlo") stepNumber = 2;
  } else if (params.lessonId === "lesson-3") {
    if (params.stepId === "we") stepNumber = 1;
    else if (params.stepId === "gue") stepNumber = 2;
  } else if (params.lessonId === "lesson-4") {
    if (params.stepId === "html-attributes") stepNumber = 1;
    else if (params.stepId === "html-attributes-advanced") stepNumber = 2;
  } else if (params.lessonId === "lesson-5") {
    if (params.stepId === "html-structure") stepNumber = 1;
    else if (params.stepId === "html-structure-advanced") stepNumber = 2;
  } else {
    // Fallback for old step-X patterns
    if (params.stepId.includes('step-1-') || params.stepId.includes('step-1')) {
      stepNumber = 1;
    } else if (params.stepId.includes('step-2-') || params.stepId.includes('step-2')) {
      stepNumber = 2;
    } else {
      // Fallback for other step patterns
      const stepMatch = params.stepId.match(/step-(\d+)/);
      if (stepMatch) {
        stepNumber = parseInt(stepMatch[1]);
      }
    }
  }

  // Use different content based on lesson ID and course
  if (userProgress.activeCourseId === "python" && params.lessonId === "lesson-1") {
    return <PythonLesson1Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-2") {
    return <Lesson2Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-3") {
    return <Lesson3Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-4") {
    return <Lesson4Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-5") {
    return <Lesson5Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  }

  return (
    <Quiz lessonTitle={lessonTitle} currentStep={stepNumber} courseId={userProgress.activeCourseId} lessonId={params.lessonId} />
  );
};

export default StepPage;
