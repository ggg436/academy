"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { userSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

const GUEST_ID = "guest";

import { auth } from "@/auth";

export const updateUserSettings = async (settings: any) => {
	try {
		const session = await auth();
		const userId = session?.user?.id || GUEST_ID;

		await db.insert(userSettings).values({
			userId: userId,
			...settings
		}).onConflictDoUpdate({
			target: userSettings.userId,
			set: settings,
		});

		console.log("Settings update for", userId, settings);
		revalidatePath("/settings");
		return { success: true };
	} catch (error) {
		console.error("Error updating user settings:", error);
		throw new Error("Failed to update settings");
	}
};

export const getUserSettings = async () => {
	try {
		const session = await auth();
		const userId = session?.user?.id || GUEST_ID;

		const settings = await db.query.userSettings.findFirst({
			where: eq(userSettings.userId, userId),
		});
		return settings;
	} catch (error) {
		console.error("Error getting user settings:", error);
		return null;
	}
};