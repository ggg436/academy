import { redirect } from "next/navigation";
import { getUserProgress } from "@/actions/user-progress";

type Props = {
  params: {
    courseId: string;
    lessonId: string;
  };
};

const LessonPage = async ({ params }: Props) => {
  const userProgress = await getUserProgress();
  const courseId = params.courseId;

  // Python course first-step slugs
  if (courseId === "python") {
    if (params.lessonId === "lesson-1") {
      redirect(`/${courseId}/${params.lessonId}/python-introduction`);
    } else if (params.lessonId === "lesson-2") {
      redirect(`/${courseId}/${params.lessonId}/python-case-sensitivity`);
    } else if (params.lessonId === "lesson-3") {
      redirect(`/${courseId}/${params.lessonId}/python-variables`);
    } else if (params.lessonId === "lesson-4") {
      redirect(`/${courseId}/${params.lessonId}/python-operators-intro`);
    } else {
      redirect(`/${courseId}/${params.lessonId}/step-1`);
    }
    return null as any;
  }

  // C course (default) first-step slugs
  if (params.lessonId === "lesson-1") {
    redirect(`/${courseId}/${params.lessonId}/html-introduction`);
  } else if (params.lessonId === "lesson-2") {
    redirect(`/${courseId}/${params.lessonId}/get-started-with-c`);
  } else if (params.lessonId === "lesson-3") {
    redirect(`/${courseId}/${params.lessonId}/c-syntax`);
  } else if (params.lessonId === "lesson-4") {
    redirect(`/${courseId}/${params.lessonId}/c-output-print-text`);
  } else if (params.lessonId === "lesson-5") {
    redirect(`/${courseId}/${params.lessonId}/c-comments`);
  } else if (params.lessonId === "lesson-6") {
    redirect(`/${courseId}/${params.lessonId}/pointer-to-pointer`);
  } else if (params.lessonId === "lesson-7") {
    redirect(`/${courseId}/${params.lessonId}/c-data-types`);
  } else if (params.lessonId === "lesson-8") {
    redirect(`/${courseId}/${params.lessonId}/c-constants`);
  } else {
    redirect(`/${courseId}/${params.lessonId}/step-1`);
  }
};

export default LessonPage;