import { redirect } from "next/navigation";
import { getUserProgress } from "@/actions/user-progress";
import { getCourses, getCourseById } from "@/lib/data";
import { Quiz } from "../../quiz";

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

  // Extract step number from stepId (e.g., "step-1" -> 1)
  const stepNumber = parseInt(params.stepId.replace('step-', ''));

  return (
    <Quiz lessonTitle={lessonTitle} currentStep={stepNumber} />
  );
};

export default StepPage;
