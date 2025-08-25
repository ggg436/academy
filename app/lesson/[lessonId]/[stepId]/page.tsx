import { redirect } from "next/navigation";
import { getUserProgress } from "@/actions/user-progress";
import { getCourses, getCourseById } from "@/lib/data";
import { Quiz } from "../../quiz";
import { Lesson2Content } from "../../lesson-2-content";
import { Lesson3Content } from "../../lesson-3-content";
import { Lesson4Content } from "../../lesson-4-content";
import { Lesson5Content } from "../../lesson-5-content";

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

  // Extract step number from stepId (e.g., "weare" -> 1, "html-basics" -> 2, "step-1-intro" -> 1)
  let stepNumber = 1;
  
  // Handle new clean URLs
  if (params.lessonId === "lesson-1") {
    if (params.stepId === "weare") stepNumber = 1;
    else if (params.stepId === "html-basics") stepNumber = 2;
    else if (params.stepId === "uuiuui") stepNumber = 3;
    else if (params.stepId === "sanjok") stepNumber = 4;
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

  // Use different content based on lesson ID
  if (params.lessonId === "lesson-2") {
    return <Lesson2Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-3") {
    return <Lesson3Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-4") {
    return <Lesson4Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-5") {
    return <Lesson5Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  }

  return (
    <Quiz lessonTitle={lessonTitle} currentStep={stepNumber} />
  );
};

export default StepPage;
