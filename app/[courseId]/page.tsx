import { redirect } from "next/navigation";

import { getUserProgress } from "@/actions/user-progress";
import { getCourseById, getCourses } from "@/lib/data";

const LessonPage = async () => {
  const userProgress = await getUserProgress();

  // Allow access without authentication - use default course
  const activeCourseId = userProgress?.activeCourseId || "python";
  const course = getCourseById(activeCourseId);
  
  if (!course || !course.units.length) {
    // Fallback to first available course
    const courses = getCourses();
    const defaultCourse = courses[0];
    if (!defaultCourse || !defaultCourse.units.length) {
      redirect("/courses");
    }
    const allLessons = defaultCourse.units.flatMap((u) => u.lessons || []);
    const firstLessonId = allLessons[0]?.id;
    if (!firstLessonId) redirect("/courses");
    redirect(`/${defaultCourse.id}/${firstLessonId}`);
  }

  const allLessons = course.units.flatMap((u) => u.lessons || []);
  const firstLessonId = allLessons[0]?.id;
  if (!firstLessonId) redirect("/courses");
  redirect(`/${activeCourseId}/${firstLessonId}`);
};

export default LessonPage;
