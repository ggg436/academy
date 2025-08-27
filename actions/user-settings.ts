"use server";

import { cookies } from "next/headers";
import { adminDb } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

// Helper to get Firebase user ID from cookies
async function getFirebaseUserId(): Promise<string | null> {
	try {
		const cookieStore = cookies();
		const authCookie = cookieStore.get('firebase-auth');
		if (authCookie?.value) {
			const authData = JSON.parse(authCookie.value);
			return authData.uid || null;
		}
	} catch {}
	return null;
}

export const updateUserSettings = async (settings: any) => {
	const userId = await getFirebaseUserId();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	try {
		await adminDb.collection("userSettings").doc(userId).set(settings, { merge: true });
		revalidatePath("/settings");
		return { success: true };
	} catch (error) {
		console.error("Error updating user settings:", error);
		throw new Error("Failed to update settings");
	}
};

export const getUserSettings = async () => {
	const userId = await getFirebaseUserId();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	try {
		const snap = await adminDb.collection("userSettings").doc(userId).get();
		if (snap.exists) {
			return snap.data();
		}
		return null;
	} catch (error) {
		console.error("Error getting user settings:", error);
		return null;
	}
}; 