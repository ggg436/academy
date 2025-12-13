"use server";

import { cookies } from "next/headers";
import { adminDb } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { getAuth } from "firebase-admin/auth";

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

export const changePassword = async (newPassword: string) => {
	const userId = await getFirebaseUserId();
	if (!userId) {
		throw new Error("Unauthorized");
	}

	try {
		const auth = getAuth();
		await auth.updateUser(userId, { password: newPassword });
		return { success: true };
	} catch (error) {
		console.error("Error changing password:", error);
		throw new Error("Failed to change password");
	}
};

export const deleteAccount = async () => {
	const userId = await getFirebaseUserId();
	if (!userId) {
		throw new Error("Unauthorized");
	}

	try {
		// Delete user data
		await adminDb.collection("userProgress").doc(userId).delete();
		await adminDb.collection("userSettings").doc(userId).delete();
		await adminDb.collection("userSubscription").doc(userId).delete();
		
		// Delete auth user
		const auth = getAuth();
		await auth.deleteUser(userId);
		
		revalidatePath("/");
		return { success: true };
	} catch (error) {
		console.error("Error deleting account:", error);
		throw new Error("Failed to delete account");
	}
};

