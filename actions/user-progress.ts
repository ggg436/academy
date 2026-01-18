"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { userProgress, lessonProgress } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

const GUEST_ID = "guest";

import { auth } from "@/auth";

export const getUserProgress = async () => {
	try {
		const session = await auth();
		const userId = session?.user?.id || GUEST_ID;

		const progress = await db.query.userProgress.findFirst({
			where: eq(userProgress.userId, userId),
			with: {
				activeCourse: true,
			},
		});

		// Get completed lessons for the active course
		if (progress?.activeCourseId) {
			const completedLessons = await db.query.lessonProgress.findMany({
				where: and(
					eq(lessonProgress.userId, userId),
					eq(lessonProgress.courseId, progress.activeCourseId)
				),
				columns: {
					lessonId: true,
				},
			});

			// Add completedLessons array to progress object
			return {
				...progress,
				completedLessons: completedLessons.map((lp) => lp.lessonId),
			} as any;
		}

		return progress;
	} catch (error) {
		console.error("Error getting user progress:", error);
		return null;
	}
};

export const upsertUserProgress = async (courseId: string) => {
	try {
		const session = await auth();
		const userId = session?.user?.id || GUEST_ID;
		const user = session?.user || { name: "Guest", image: "/mascot.svg" };

		await db.insert(userProgress).values({
			userId: userId,
			activeCourseId: courseId,
			userName: user.name || "User",
			userImageSrc: user.image || "/mascot.svg",
		}).onConflictDoUpdate({
			target: userProgress.userId,
			set: {
				activeCourseId: courseId,
				userName: user.name || "User",
				userImageSrc: user.image || "/mascot.svg",
			}
		});

		revalidatePath("/courses");
		revalidatePath("/learn");
		redirect("/learn");
	} catch (error) {
		console.error("Error upserting user progress:", error);
		throw new Error("Failed to update progress");
	}
};

export const reduceHearts = async () => {
	try {
		const session = await auth();
		const userId = session?.user?.id || GUEST_ID;
		const progress = await getUserProgress(); // Already handles auth internally? better to rely on ID directly if possible but internal call is safer for consistent object

		if (progress && progress.hearts > 0) {
			await db.update(userProgress)
				.set({ hearts: progress.hearts - 1 })
				.where(eq(userProgress.userId, userId));

			revalidatePath("/shop");
			revalidatePath("/learn");
			revalidatePath("/quests");
			revalidatePath("/leaderboard");
		}
	} catch (error) {
		console.error("Error reducing hearts:", error);
	}
};

export const refillHearts = async () => {
	try {
		const session = await auth();
		const userId = session?.user?.id || GUEST_ID;
		const progress = await getUserProgress();

		if (progress) {
			await db.update(userProgress)
				.set({ hearts: 5 })
				.where(eq(userProgress.userId, userId));

			revalidatePath("/shop");
			revalidatePath("/learn");
			revalidatePath("/quests");
			revalidatePath("/leaderboard");
		}
	} catch (error) {
		console.error("Error refilling hearts:", error);
	}
};

export const updatePoints = async (points: number) => {
	try {
		const session = await auth();
		const userId = session?.user?.id || GUEST_ID;

		await db.update(userProgress)
			.set({
				points: sql`${userProgress.points} + ${points}`
			})
			.where(eq(userProgress.userId, userId));

		revalidatePath("/learn");
		revalidatePath("/leaderboard");
		revalidatePath("/quests");
	} catch (error) {
		console.error("Error updating points:", error);
	}
};

export const updateStreak = async () => {
	// TODO: Implement proper streak logic based on dates
	try {
		const session = await auth();
		const userId = session?.user?.id || GUEST_ID;

		await db.update(userProgress)
			.set({
				streak: sql`${userProgress.streak} + 1`
			})
			.where(eq(userProgress.userId, userId));
		revalidatePath("/learn");
	} catch (error) {
		console.error("Error updating streak:", error);
	}
};


// Stubs/Placeholders for features not yet fully implemented or removed
export const getTopTenUsers = async () => {
	return [];
};

export const getAllUsersProgress = async () => {
	return [];
};

export const debugFirebaseAdmin = async () => {
	return { error: "Firebase Admin Removed" };
};

export const updateUserProgressWithFirebaseData = async () => {
	return { success: true };
};

export const getAllRegisteredUsersWithProgress = async () => {
	return [];
};

export const updateAllUsersGmailPhotos = async () => {
	return { success: true };
};