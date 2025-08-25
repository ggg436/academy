import { redirect } from "next/navigation";

import { getUserProgress } from "@/actions/user-progress";
import { getCourseById } from "@/lib/data";

const LessonPage = async () => {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourseId) {
    redirect("/courses");
  }

  const course = getCourseById(userProgress.activeCourseId);
  if (!course || !course.units.length) {
    redirect("/courses");
  }

  const allLessons = course.units.flatMap((u) => u.lessons || []);
  const firstLessonId = allLessons[0]?.id;
  if (!firstLessonId) redirect("/courses");
  redirect(`/lesson/${firstLessonId}`);
};

export default LessonPage;
