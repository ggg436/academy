import { redirect } from "next/navigation";
import { getUserProgress } from "@/actions/user-progress";
import { getCourseById } from "@/lib/data";
import { Quiz } from "../../quiz";
import { PythonLesson1Content } from "../../python-lesson-1-content";
import { PythonLesson2Content } from "../../python-lesson-2-content";

type Props = {
  params: {
    courseId: string;
    lessonId: string;
    stepId: string;
  };
};

const StepPage = async ({ params }: Props) => {
  const userProgress = await getUserProgress();

  // Allow access without authentication - use default course
  const activeCourseId = userProgress?.activeCourseId || params.courseId || "python";

  // Find the current course
  const courseId = params.courseId;
  const course = getCourseById(courseId);
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

  let stepNumber = 1;

  if (params.lessonId === "lesson-1") {
    if (activeCourseId === "python") {
      if (params.stepId === "python-introduction") stepNumber = 1;
      else if (params.stepId === "python-history") stepNumber = 2;
      else if (params.stepId === "python-popularity") stepNumber = 3;
      else if (params.stepId === "python-applications") stepNumber = 4;
      else if (params.stepId === "python-first-program") stepNumber = 5;
      else if (params.stepId === "python-problems") stepNumber = 6;
      else if (params.stepId === "python-quiz") stepNumber = 7;
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
    if (params.stepId === "python-syntax") stepNumber = 1;
    else if (params.stepId === "python-variables") stepNumber = 2;
    else if (params.stepId === "python-data-types") stepNumber = 3;
    else if (params.stepId === "python-operators") stepNumber = 4;
    else if (params.stepId === "python-strings") stepNumber = 5;
    else if (params.stepId === "python-problems-2") stepNumber = 6;
    else if (params.stepId === "python-quiz-2") stepNumber = 7;
  } else {
    if (params.stepId.includes('step-1-') || params.stepId.includes('step-1')) {
      stepNumber = 1;
    } else if (params.stepId.includes('step-2-') || params.stepId.includes('step-2')) {
      stepNumber = 2;
    } else {
      const stepMatch = params.stepId.match(/step-(\d+)/);
      if (stepMatch) {
        stepNumber = parseInt(stepMatch[1]);
      }
    }
  }

  if (courseId === "python" && params.lessonId === "lesson-1") {
    if (params.stepId === "python-quiz") {
      return <Quiz lessonTitle={"Python Introduction"} currentStep={1} courseId={"python"} lessonId={"lesson-1"} />;
    }
    return <PythonLesson1Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  }

  if (courseId === "python" && params.lessonId === "lesson-2") {
    if (params.stepId === "python-quiz-2") {
      return <Quiz lessonTitle={"Python Basics"} currentStep={1} courseId={"python"} lessonId={"lesson-2"} />;
    }
    return <PythonLesson2Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  }

  return (
    <Quiz lessonTitle={lessonTitle} currentStep={stepNumber} courseId={courseId} lessonId={params.lessonId} />
  );
};

export default StepPage;
