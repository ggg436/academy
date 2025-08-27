"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCourseById } from "@/lib/data";
import { getFirebaseApp } from "@/lib/firebase-client";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getCurrentLessonAndStepFromPath, getTotalStepsForLesson } from "@/lib/lesson-steps";

function Ring({ value }: { value: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const dash = ((100 - Math.min(100, Math.max(0, value))) / 100) * c;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={r} fill="none" stroke="#e5e7eb" strokeWidth="6" />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="#16a34a"
        strokeWidth="6"
        strokeDasharray={c}
        strokeDashoffset={dash}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#111827">
        {Math.round(value)}%
      </text>
    </svg>
  );
}

export default function UserRingClient({ courseId }: { courseId: string }) {
  const [percent, setPercent] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const course = getCourseById(courseId);
    const totalLessons = course ? course.units.reduce((s: number, u: any) => s + (u.lessons?.length || 0), 0) : 0;
    const localRaw = typeof window !== "undefined" ? localStorage.getItem(`course-progress-${courseId}`) : null;
    let completedLessons = 0;
    try {
      if (localRaw) {
        const p = JSON.parse(localRaw);
        completedLessons = Array.isArray(p.completedLessons) ? p.completedLessons.length : 0;
      }
    } catch {}

    // Partial progress for current lesson step
    const { lessonId, step } = getCurrentLessonAndStepFromPath(pathname || "");
    let partial = 0;
    if (lessonId) {
      const totalSteps = getTotalStepsForLesson(lessonId);
      if (totalSteps > 0) partial = Math.min(1, Math.max(0, step / totalSteps));
    }

    if (totalLessons > 0) {
      const base = completedLessons / totalLessons;
      // Blend: treat the in-progress lesson as a fraction of one lesson
      const perLesson = 1 / totalLessons;
      const blended = base + perLesson * partial;
      setPercent(Math.min(100, blended * 100));
    }

    // Firestore override (authoritative if exists)
    (async () => {
      try {
        const app = getFirebaseApp();
        if (!app) return;
        const db = getFirestore(app);
        // Note: This component needs to be updated to use Firebase Auth context
        // For now, we'll skip Firestore progress until we restructure this
        const uid = null;
        if (!uid) return;
        const ref = doc(db, "userProgress", uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as any;
          const completed: string[] = data?.completedLessons || [];
          const partials: Record<string, { step: number; totalSteps: number }> = data?.partials || {};
          if (totalLessons > 0) {
            const base = completed.length / totalLessons;
            const perLesson = 1 / totalLessons;
            const partialRemote = partials && lessonId && partials[lessonId]
              ? Math.min(1, Math.max(0, partials[lessonId].step / (partials[lessonId].totalSteps || 1)))
              : partial;
            const blended = base + perLesson * partialRemote;
            setPercent(Math.min(100, blended * 100));
          }
        }
      } catch {}
    })();
  }, [courseId, pathname]);

  return <Ring value={percent} />;
} 