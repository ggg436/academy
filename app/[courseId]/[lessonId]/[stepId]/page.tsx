import { redirect } from "next/navigation";
import { getUserProgress } from "@/actions/user-progress";
import { getCourseById } from "@/lib/data";
import { Quiz } from "../../quiz";
import { Lesson2Content } from "../../lesson-2-content";
import { Lesson3Content } from "../../lesson-3-content";
import { Lesson4Content } from "../../lesson-4-content";
import { Lesson5Content } from "../../lesson-5-content";
import { PythonLesson1Content } from "../../python-lesson-1-content";

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
    if (activeCourseId === "python") {
      if (params.stepId === "python-case-sensitivity") stepNumber = 1;
      else if (params.stepId === "python-indentation") stepNumber = 2;
      else if (params.stepId === "python-comments") stepNumber = 3;
      else if (params.stepId === "python-quotes") stepNumber = 4;
      else if (params.stepId === "python-multiple-statements") stepNumber = 5;
      else if (params.stepId === "python-problems") stepNumber = 6;
      else if (params.stepId === "python-quiz") stepNumber = 7;
      // Defer rendering; fall through to the later lesson-2 branch that handles quiz vs content
    }
  } else if (params.lessonId === "lesson-3") {
    if (activeCourseId === "python") {
      if (params.stepId === "python-variables") stepNumber = 1;
      else if (params.stepId === "python-variable-rules") stepNumber = 2;
      else if (params.stepId === "python-data-types") stepNumber = 3;
      else if (params.stepId === "python-dynamic-typing") stepNumber = 4;
      else if (params.stepId === "python-type-casting") stepNumber = 5;
      else if (params.stepId === "python-problems") stepNumber = 6;
      else if (params.stepId === "python-quiz") stepNumber = 7;
      if (params.stepId === "python-quiz") {
        return <Quiz lessonTitle={"Python Variables & Types"} currentStep={1} courseId={"python"} lessonId={"lesson-3"} />;
      }
      const { PythonLesson3Content } = await import("../../python-lesson-3-content");
      return <PythonLesson3Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    }
  } else if (params.lessonId === "lesson-4") {
    if (activeCourseId === "python") {
      if (params.stepId === "python-operators-intro") stepNumber = 1;
      else if (params.stepId === "python-arithmetic-operators") stepNumber = 2;
      else if (params.stepId === "python-comparison-operators") stepNumber = 3;
      else if (params.stepId === "python-logical-operators") stepNumber = 4;
      else if (params.stepId === "python-assignment-operators") stepNumber = 5;
      else if (params.stepId === "python-identity-membership") stepNumber = 6;
      else if (params.stepId === "python-operators-problems") stepNumber = 7;
      const { PythonLesson4Content } = await import("../../python-lesson-4-content");
      return <PythonLesson4Content lessonTitle={"Python Operators"} currentStep={stepNumber} />;
    }
    if (params.stepId === "html-attributes") stepNumber = 1;
    else if (params.stepId === "html-attributes-advanced") stepNumber = 2;
  } else if (params.lessonId === "lesson-5") {
    const isPythonStep = params.stepId.startsWith("python-");
    if (courseId === "python" || isPythonStep) {
      if (params.stepId === "python-io-intro") stepNumber = 1;
      else if (params.stepId === "python-print") stepNumber = 2;
      else if (params.stepId === "python-input") stepNumber = 3;
      else if (params.stepId === "python-input-type-conversion") stepNumber = 4;
      else if (params.stepId === "python-formatting-output") stepNumber = 5;
      else if (params.stepId === "python-io-practice") stepNumber = 6;
      else if (params.stepId === "python-io-quiz") stepNumber = 7;
      if (params.stepId === "python-io-quiz") {
        return <Quiz lessonTitle={"Python Input & Output"} currentStep={1} courseId={"python"} lessonId={"lesson-5"} />;
      }
      const { PythonLesson5Content } = await import("../../python-lesson-5-content");
      return <PythonLesson5Content lessonTitle={"Python Input & Output"} currentStep={stepNumber} />;
    }
    return <Lesson5Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-6") {
    // Python track for lesson 6
    if (activeCourseId === "python" || params.stepId.startsWith("python-")) {
      if (params.stepId === "python-comments-intro") stepNumber = 1;
      else if (params.stepId === "python-single-line-comments") stepNumber = 2;
      else if (params.stepId === "python-multi-line-comments") stepNumber = 3;
      else if (params.stepId === "python-docstrings") stepNumber = 4;
      else if (params.stepId === "python-comments-practice") stepNumber = 5;
      else if (params.stepId === "python-comments-quiz") stepNumber = 6;
      if (params.stepId === "python-comments-quiz") {
        return <Quiz lessonTitle={"Python Comments & Documentation"} currentStep={1} courseId={"python"} lessonId={"lesson-6"} />;
      }
      const { PythonLesson6Content } = await import("../../python-lesson-6-content");
      return <PythonLesson6Content lessonTitle={"Python Comments & Documentation"} currentStep={stepNumber} />;
    }
    if (params.stepId === "html-semantics") stepNumber = 1;
    else if (params.stepId === "html-semantics-advanced") stepNumber = 2;
  } else if (params.lessonId === "lesson-7") {
    if (activeCourseId === "python" || params.stepId.startsWith("python-")) {
      if (params.stepId === "python-indentation-intro") stepNumber = 1;
      else if (params.stepId === "python-indentation-rules") stepNumber = 2;
      else if (params.stepId === "python-nested-indentation") stepNumber = 3;
      else if (params.stepId === "python-tabs-vs-spaces") stepNumber = 4;
      else if (params.stepId === "python-indentation-practice") stepNumber = 5;
      else if (params.stepId === "python-indentation-quiz") stepNumber = 6;
      if (params.stepId === "python-indentation-quiz") {
        return <Quiz lessonTitle={"Python Indentation & Code Blocks"} currentStep={1} courseId={"python"} lessonId={"lesson-7"} />;
      }
      const { PythonLesson7Content } = await import("../../python-lesson-7-content");
      return <PythonLesson7Content lessonTitle={"Python Indentation & Code Blocks"} currentStep={stepNumber} />;
    }
  } else if (params.lessonId === "lesson-8") {
    if (activeCourseId === "python" || params.stepId.startsWith("python-")) {
      if (params.stepId === "python-variables-intro") stepNumber = 1;
      else if (params.stepId === "python-variable-rules") stepNumber = 2;
      else if (params.stepId === "python-data-types") stepNumber = 3;
      else if (params.stepId === "python-checking-type") stepNumber = 4;
      else if (params.stepId === "python-changing-variables") stepNumber = 5;
      else if (params.stepId === "python-multiple-assignment") stepNumber = 6;
      else if (params.stepId === "python-variables-practice") stepNumber = 7;
      else if (params.stepId === "python-variables-quiz") stepNumber = 8;
      if (params.stepId === "python-variables-quiz") {
        return <Quiz lessonTitle={"Python Variables & Data Types"} currentStep={1} courseId={"python"} lessonId={"lesson-8"} />;
      }
      const { PythonLesson8Content } = await import("../../python-lesson-8-content");
      return <PythonLesson8Content lessonTitle={"Python Variables & Data Types"} currentStep={stepNumber} />;
    }
  } else if (params.lessonId === "lesson-9") {
    if (activeCourseId === "python" || params.stepId.startsWith("python-")) {
      if (params.stepId === "python-strings-intro") stepNumber = 1;
      else if (params.stepId === "python-quotes") stepNumber = 2;
      else if (params.stepId === "python-concatenation") stepNumber = 3;
      else if (params.stepId === "python-repetition") stepNumber = 4;
      else if (params.stepId === "python-indexing") stepNumber = 5;
      else if (params.stepId === "python-strings-practice") stepNumber = 6;
      else if (params.stepId === "python-strings-quiz") stepNumber = 7;
      if (params.stepId === "python-strings-quiz") {
        return <Quiz lessonTitle={"Python Strings (Basics)"} currentStep={1} courseId={"python"} lessonId={"lesson-9"} />;
      }
      const { PythonLesson9Content } = await import("../../python-lesson-9-content");
      return <PythonLesson9Content lessonTitle={"Python Strings (Basics)"} currentStep={stepNumber} />;
    }
  } else if (params.lessonId === "lesson-10") {
    if (activeCourseId === "python" || params.stepId.startsWith("python-")) {
      if (params.stepId === "python-slicing") stepNumber = 1;
      else if (params.stepId === "python-negative-indexing") stepNumber = 2;
      else if (params.stepId === "python-string-methods") stepNumber = 3;
      else if (params.stepId === "python-string-length") stepNumber = 4;
      else if (params.stepId === "python-strings-ops-practice") stepNumber = 5;
      else if (params.stepId === "python-strings-ops-quiz") stepNumber = 6;
      if (params.stepId === "python-strings-ops-quiz") {
        return <Quiz lessonTitle={"Python String Operations"} currentStep={1} courseId={"python"} lessonId={"lesson-10"} />;
      }
      const { PythonLesson10Content } = await import("../../python-lesson-10-content");
      return <PythonLesson10Content lessonTitle={"Python String Operations"} currentStep={stepNumber} />;
    }
  } else if (params.lessonId === "lesson-11") {
    if (activeCourseId === "python" || params.stepId.startsWith("python-")) {
      if (params.stepId === "python-numbers-types") stepNumber = 1;
      else if (params.stepId === "python-numbers-ops") stepNumber = 2;
      else if (params.stepId === "python-numbers-casting") stepNumber = 3;
      else if (params.stepId === "python-numbers-math") stepNumber = 4;
      else if (params.stepId === "python-numbers-random") stepNumber = 5;
      else if (params.stepId === "python-numbers-practice") stepNumber = 6;
      else if (params.stepId === "python-numbers-quiz") stepNumber = 7;
      if (params.stepId === "python-numbers-quiz") {
        return <Quiz lessonTitle={"Python Numbers"} currentStep={1} courseId={"python"} lessonId={"lesson-11"} />;
      }
      const { PythonLesson11Content } = await import("../../python-lesson-11-content");
      return <PythonLesson11Content lessonTitle={"Numbers in Python"} currentStep={stepNumber} />;
    }
  } else if (params.lessonId === "lesson-12") {
    if (activeCourseId === "python" || params.stepId.startsWith("python-")) {
      if (params.stepId === "python-boolean-intro") stepNumber = 1;
      else if (params.stepId === "python-comparison-operators") stepNumber = 2;
      else if (params.stepId === "python-boolean-numbers-strings") stepNumber = 3;
      else if (params.stepId === "python-logical-operators") stepNumber = 4;
      else if (params.stepId === "python-boolean-if-conditions") stepNumber = 5;
      else if (params.stepId === "python-boolean-practice") stepNumber = 6;
      else if (params.stepId === "python-boolean-quiz") stepNumber = 7;
      if (params.stepId === "python-boolean-quiz") {
        return <Quiz lessonTitle={"Python Boolean & Comparison Operators"} currentStep={1} courseId={"python"} lessonId={"lesson-12"} />;
      }
      const { PythonLesson12Content } = await import("../../python-lesson-12-content");
      return <PythonLesson12Content lessonTitle={"Boolean & Comparison Operators"} currentStep={stepNumber} />;
    }
  } else if (params.lessonId === "lesson-13") {
    if (activeCourseId === "python" || params.stepId.startsWith("python-")) {
      if (params.stepId === "python-conditionals-if") stepNumber = 1;
      else if (params.stepId === "python-conditionals-else") stepNumber = 2;
      else if (params.stepId === "python-conditionals-elif") stepNumber = 3;
      else if (params.stepId === "python-conditionals-nested-if") stepNumber = 4;
      else if (params.stepId === "python-conditionals-practice") stepNumber = 5;
      else if (params.stepId === "python-conditionals-quiz") stepNumber = 6;
      if (params.stepId === "python-conditionals-quiz") {
        return <Quiz lessonTitle={"Conditional Statements (if, elif, else)"} currentStep={1} courseId={"python"} lessonId={"lesson-13"} />;
      }
      const { PythonLesson13Content } = await import("../../python-lesson-13-content");
      return <PythonLesson13Content lessonTitle={"Conditional Statements (if, elif, else)"} currentStep={stepNumber} />;
    }
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
  } else if (params.lessonId === "lesson-2") {
    if (activeCourseId === "python") {
      if (params.stepId === "python-quiz") {
        return <Quiz lessonTitle={"Python Syntax & Rules"} currentStep={1} courseId={"python"} lessonId={"lesson-2"} />;
      }
      const { PythonLesson2Content } = await import("../../python-lesson-2-content");
      return <PythonLesson2Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    }
    return <Lesson2Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-3") {
    return <Lesson3Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-4") {
    if (activeCourseId === "python") {
      const { PythonLesson4Content } = await import("../../python-lesson-4-content");
      return <PythonLesson4Content lessonTitle={"Python Operators"} currentStep={stepNumber} />;
    }
    return <Lesson4Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-5") {
    return <Lesson5Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  }

  return (
    <Quiz lessonTitle={lessonTitle} currentStep={stepNumber} courseId={courseId} lessonId={params.lessonId} />
  );
};

export default StepPage;
