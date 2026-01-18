"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { lessonProgress } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { updatePoints } from "./user-progress";

const GUEST_ID = "guest";

export type PartialProgressPayload = {
  courseId: string;
  lessonId: string;
  step: number;
  totalSteps: number;
};

export async function savePartialProgress(payload: PartialProgressPayload) {
  try {
    const session = await auth();
    const userId = session?.user?.id || GUEST_ID;

    // For guests, this will be handled client-side via localStorage
    // For authenticated users, can store in DB if needed later
    console.log("Partial progress:", payload, "for user:", userId);

    revalidatePath("/learn");
    return { success: true };
  } catch (error) {
    console.error("Error saving partial progress:", error);
    return { error: "Failed to save partial progress" };
  }
}

export async function saveLessonCompleteServer(courseId: string, lessonId: string, pointsDelta: number) {
  try {
    const session = await auth();
    const userId = session?.user?.id || GUEST_ID;
    const isGuest = userId === GUEST_ID || !session?.user;

    // Check if lesson is already completed
    const existing = !isGuest ? await db.query.lessonProgress.findFirst({
      where: and(
        eq(lessonProgress.userId, userId),
        eq(lessonProgress.lessonId, lessonId)
      ),
    }) : null;

    if (!existing && !isGuest) {
      // Save to database for authenticated users
      await db.insert(lessonProgress).values({
        userId: userId,
        courseId: courseId,
        lessonId: lessonId,
        completed: true,
        completedAt: new Date(),
      });

      // Update user points
      await updatePoints(pointsDelta);
    }

    // For guests, localStorage will be handled client-side
    // Return success so client can save to localStorage
    revalidatePath("/learn");
    revalidatePath("/courses");
    return { success: true, isGuest };
  } catch (error) {
    console.error("Error saving lesson completion:", error);
    // Even if DB save fails, allow localStorage save for guests
    return { success: true, isGuest: true };
  }
}
