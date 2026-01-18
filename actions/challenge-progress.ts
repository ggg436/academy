"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { challengeProgress } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";

const GUEST_ID = "guest";

export const upsertChallengeProgress = async (challengeId: string, completed: boolean) => {
  try {
    const session = await auth();
    const userId = session?.user?.id || GUEST_ID;
    const isGuest = userId === GUEST_ID || !session?.user;

    // For authenticated users, save to database
    if (!isGuest) {
      const existing = await db.query.challengeProgress.findFirst({
        where: and(
          eq(challengeProgress.userId, userId),
          eq(challengeProgress.challengeId, challengeId)
        ),
      });

      if (existing) {
        await db.update(challengeProgress)
          .set({ completed })
          .where(
            and(
              eq(challengeProgress.userId, userId),
              eq(challengeProgress.challengeId, challengeId)
            )
          );
      } else {
        await db.insert(challengeProgress).values({
          userId: userId,
          challengeId: challengeId,
          completed: completed,
        });
      }
    }
    // For guests, localStorage will be handled client-side

    revalidatePath("/learn");
    revalidatePath("/quests");
    
    return { success: true, isGuest };
  } catch (error) {
    console.error("Error saving challenge progress:", error);
    // Even if DB save fails, allow localStorage save for guests
    return { success: true, isGuest: true };
  }
};

export const getChallengeProgress = async (challengeId: string) => {
  try {
    const session = await auth();
    const userId = session?.user?.id || GUEST_ID;

    const progress = await db.query.challengeProgress.findFirst({
      where: and(
        eq(challengeProgress.userId, userId),
        eq(challengeProgress.challengeId, challengeId)
      ),
    });

    return progress || null;
  } catch (error) {
    console.error("Error getting challenge progress:", error);
    return null;
  }
};
