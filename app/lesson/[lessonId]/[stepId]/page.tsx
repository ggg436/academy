import { redirect } from "next/navigation";
import { getUserProgress } from "@/actions/user-progress";
import { getCourses, getCourseById } from "@/lib/data";
import { Quiz } from "../../quiz";
import { Lesson2Content } from "../../lesson-2-content";
import { Lesson3Content } from "../../lesson-3-content";

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

  // Extract step number from stepId (e.g., "step-1-intro" -> 1, "step-2-basics" -> 2)
  let stepNumber = 1;
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

  // Use different content based on lesson ID
  if (params.lessonId === "lesson-2") {
    return <Lesson2Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-3") {
    return <Lesson3Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  }

  return (
    <Quiz lessonTitle={lessonTitle} currentStep={stepNumber} />
  );
};

export default StepPage;
