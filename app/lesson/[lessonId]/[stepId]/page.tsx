import { redirect } from "next/navigation";
import { getUserProgress } from "@/actions/user-progress";
import { getCourseById } from "@/lib/data";
import { Quiz } from "../../quiz";
import { Lesson2Content } from "../../lesson-2-content";
import { Lesson3Content } from "../../lesson-3-content";
import { Lesson4Content } from "../../lesson-4-content";
import { Lesson5Content } from "../../lesson-5-content";
import { PythonLesson1Content } from "../../python-lesson-1-content";
import { CLesson1Content } from "../../c-lesson-1-content";

type Props = {
  params: {
    lessonId: string;
    stepId: string;
  };
};

const StepPage = async ({ params }: Props) => {
  const userProgress = await getUserProgress();

  if (!userProgress) {
    redirect("/learn");
  }

  // Canonicalize C lesson 2 path
  if (userProgress.activeCourseId === "c" && params.lessonId === "lesson-2") {
    const allowed = ["get-started-with-c", "install-c", "install-ide", "c-quickstart"];
    if (!allowed.includes(params.stepId)) {
      redirect(`/lesson/${params.lessonId}/get-started-with-c`);
    }
  }

  // Canonicalize C lesson 3 path
  if (userProgress.activeCourseId === "c" && params.lessonId === "lesson-3") {
    const allowed3 = ["c-syntax", "example-explained", "notes", "remember"];
    if (!allowed3.includes(params.stepId)) {
      redirect(`/lesson/${params.lessonId}/c-syntax`);
    }
  }

  // Canonicalize C lesson 4 path
  if (userProgress.activeCourseId === "c" && params.lessonId === "lesson-4") {
    const allowed4 = ["c-output-print-text", "double-quotes", "many-printf-functions", "exercise"];
    if (!allowed4.includes(params.stepId)) {
      redirect(`/lesson/${params.lessonId}/c-output-print-text`);
    }
  }

  // Canonicalize C lesson 5 path
  if (userProgress.activeCourseId === "c" && params.lessonId === "lesson-5") {
    const allowed5 = ["c-comments", "single-line-comments", "multi-line-comments", "single-or-multi-line"];
    if (!allowed5.includes(params.stepId)) {
      redirect(`/lesson/${params.lessonId}/c-comments`);
    }
  }

  // Canonicalize C lesson 6 path
  if (userProgress.activeCourseId === "c" && params.lessonId === "lesson-6") {
    const allowed6 = ["pointer-to-pointer", "array-of-pointers", "function-pointers", "advanced-examples"];
    if (!allowed6.includes(params.stepId)) {
      redirect(`/lesson/${params.lessonId}/pointer-to-pointer`);
    }
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

  let stepNumber = 1;
  
  if (params.lessonId === "lesson-1") {
    if (userProgress.activeCourseId === "python") {
      if (params.stepId === "python-introduction") stepNumber = 1;
      else if (params.stepId === "python-basics") stepNumber = 2;
    } else if (userProgress.activeCourseId === "c") {
      if (params.stepId === "c-tutorial") stepNumber = 1;
      else if (params.stepId === "examples-in-each-chapter") stepNumber = 2;
      else if (params.stepId === "c-exercises") stepNumber = 3;
      else if (params.stepId === "c-quiz") stepNumber = 4;
      else if (params.stepId === "c-reference") stepNumber = 5;
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
    if (userProgress.activeCourseId === "c") {
      if (params.stepId === "get-started-with-c") stepNumber = 1;
      else if (params.stepId === "install-c") stepNumber = 2;
      else if (params.stepId === "install-ide") stepNumber = 3;
      else if (params.stepId === "c-quickstart") stepNumber = 4;
      const { CLesson2Content } = await import("../../c-lesson-2-content");
      return <CLesson2Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    } else {
      if (params.stepId === "hi") stepNumber = 1;
      else if (params.stepId === "hlo") stepNumber = 2;
    }
  } else if (params.lessonId === "lesson-3") {
    if (userProgress.activeCourseId === "c") {
      if (params.stepId === "c-syntax") stepNumber = 1;
      else if (params.stepId === "example-explained") stepNumber = 2;
      else if (params.stepId === "notes") stepNumber = 3;
      else if (params.stepId === "remember") stepNumber = 4;
      const { CLesson3Content } = await import("../../c-lesson-3-content");
      return <CLesson3Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    }
    if (params.stepId === "we") stepNumber = 1;
    else if (params.stepId === "gue") stepNumber = 2;
  } else if (params.lessonId === "lesson-4") {
    if (userProgress.activeCourseId === "c") {
      if (params.stepId === "c-output-print-text") stepNumber = 1;
      else if (params.stepId === "double-quotes") stepNumber = 2;
      else if (params.stepId === "many-printf-functions") stepNumber = 3;
      else if (params.stepId === "exercise") stepNumber = 4;
      const { CLesson4Content } = await import("../../c-lesson-4-content");
      return <CLesson4Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    }
    if (params.stepId === "html-attributes") stepNumber = 1;
    else if (params.stepId === "html-attributes-advanced") stepNumber = 2;
  } else if (params.lessonId === "lesson-5") {
    if (userProgress.activeCourseId === "c") {
      if (params.stepId === "c-comments") stepNumber = 1;
      else if (params.stepId === "single-line-comments") stepNumber = 2;
      else if (params.stepId === "multi-line-comments") stepNumber = 3;
      else if (params.stepId === "single-or-multi-line") stepNumber = 4;
      const { CLesson5Content } = await import("../../c-lesson-5-content");
      return <CLesson5Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    }
    if (params.stepId === "html-structure") stepNumber = 1;
    else if (params.stepId === "html-structure-advanced") stepNumber = 2;
  } else if (params.lessonId === "lesson-6") {
    if (userProgress.activeCourseId === "c") {
      if (params.stepId === "pointer-to-pointer") stepNumber = 1;
      else if (params.stepId === "array-of-pointers") stepNumber = 2;
      else if (params.stepId === "function-pointers") stepNumber = 3;
      else if (params.stepId === "advanced-examples") stepNumber = 4;
      const { CLesson6Content } = await import("../../c-lesson-6-content");
      return <CLesson6Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    }
    if (params.stepId === "html-semantics") stepNumber = 1;
    else if (params.stepId === "html-semantics-advanced") stepNumber = 2;
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

  if (userProgress.activeCourseId === "python" && params.lessonId === "lesson-1") {
    return <PythonLesson1Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (userProgress.activeCourseId === "c" && params.lessonId === "lesson-1") {
    return <CLesson1Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-2") {
    if (userProgress.activeCourseId === "c") {
      const { CLesson2Content } = await import("../../c-lesson-2-content");
      return <CLesson2Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    }
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
