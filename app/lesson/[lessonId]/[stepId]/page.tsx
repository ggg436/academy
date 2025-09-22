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

  // Canonicalize C lesson 7 path
  if (userProgress.activeCourseId === "c" && params.lessonId === "lesson-7") {
    const allowed7 = ["c-data-types", "basic-data-types", "format-specifiers", "exercise"];
    if (!allowed7.includes(params.stepId)) {
      redirect(`/lesson/${params.lessonId}/c-data-types`);
    }
  }

  // Canonicalize C lesson 8 path
  if (userProgress.activeCourseId === "c" && params.lessonId === "lesson-8") {
    const allowed8 = ["c-constants", "const-keyword", "define-macros", "exercise"];
    if (!allowed8.includes(params.stepId)) {
      redirect(`/lesson/${params.lessonId}/c-constants`);
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
      else if (params.stepId === "python-history") stepNumber = 2;
      else if (params.stepId === "python-popularity") stepNumber = 3;
      else if (params.stepId === "python-applications") stepNumber = 4;
      else if (params.stepId === "python-first-program") stepNumber = 5;
      else if (params.stepId === "python-problems") stepNumber = 6;
      else if (params.stepId === "python-quiz") stepNumber = 7;
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
    if (userProgress.activeCourseId === "c") {
      if (params.stepId === "c-syntax") stepNumber = 1;
      else if (params.stepId === "example-explained") stepNumber = 2;
      else if (params.stepId === "notes") stepNumber = 3;
      else if (params.stepId === "remember") stepNumber = 4;
      const { CLesson3Content } = await import("../../c-lesson-3-content");
      return <CLesson3Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    }
    if (userProgress.activeCourseId === "python") {
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
    if (userProgress.activeCourseId === "c") {
      if (params.stepId === "c-output-print-text") stepNumber = 1;
      else if (params.stepId === "double-quotes") stepNumber = 2;
      else if (params.stepId === "many-printf-functions") stepNumber = 3;
      else if (params.stepId === "exercise") stepNumber = 4;
      const { CLesson4Content } = await import("../../c-lesson-4-content");
      return <CLesson4Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    }
    if (userProgress.activeCourseId === "python") {
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
    if (userProgress.activeCourseId === "python" || isPythonStep) {
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
  } else if (params.lessonId === "lesson-7") {
    if (userProgress.activeCourseId === "c") {
      if (params.stepId === "c-data-types") stepNumber = 1;
      else if (params.stepId === "basic-data-types") stepNumber = 2;
      else if (params.stepId === "format-specifiers") stepNumber = 3;
      else if (params.stepId === "exercise") stepNumber = 4;
      const { CLesson7Content } = await import("../../c-lesson-7-content");
      return <CLesson7Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
    }
  } else if (params.lessonId === "lesson-8") {
    if (userProgress.activeCourseId === "c") {
      if (params.stepId === "c-constants") stepNumber = 1;
      else if (params.stepId === "const-keyword") stepNumber = 2;
      else if (params.stepId === "define-macros") stepNumber = 3;
      else if (params.stepId === "exercise") stepNumber = 4;
      const { CLesson8Content } = await import("../../c-lesson-8-content");
      return <CLesson8Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
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

  if (userProgress.activeCourseId === "python" && params.lessonId === "lesson-1") {
    if (params.stepId === "python-quiz") {
      return <Quiz lessonTitle={"Python Introduction"} currentStep={1} courseId={"python"} lessonId={"lesson-1"} />;
    }
    return <PythonLesson1Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (userProgress.activeCourseId === "c" && params.lessonId === "lesson-1") {
    return <CLesson1Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  	} else if (params.lessonId === "lesson-2") {
		if (userProgress.activeCourseId === "c") {
			const { CLesson2Content } = await import("../../c-lesson-2-content");
			return <CLesson2Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
		}
		if (userProgress.activeCourseId === "python") {
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
    if (userProgress.activeCourseId === "python") {
      const { PythonLesson4Content } = await import("../../python-lesson-4-content");
      return <PythonLesson4Content lessonTitle={"Python Operators"} currentStep={stepNumber} />;
    }
    return <Lesson4Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  } else if (params.lessonId === "lesson-5") {
    return <Lesson5Content lessonTitle={lessonTitle} currentStep={stepNumber} />;
  }

  return (
    <Quiz lessonTitle={lessonTitle} currentStep={stepNumber} courseId={userProgress.activeCourseId} lessonId={params.lessonId} />
  );
};

export default StepPage;
