import { redirect } from "next/navigation";

type Props = {
  params: {
    lessonId: string;
  };
};

const LessonPage = async ({ params }: Props) => {
  // Redirect to the first step of the lesson with descriptive name
  if (params.lessonId === "lesson-1") {
    redirect(`/lesson/${params.lessonId}/step-1-intro`);
  } else if (params.lessonId === "lesson-2") {
    redirect(`/lesson/${params.lessonId}/step-1-hi`);
  } else if (params.lessonId === "lesson-3") {
    redirect(`/lesson/${params.lessonId}/step-1-we`);
  } else {
    redirect(`/lesson/${params.lessonId}/step-1`);
  }
};

export default LessonPage;
