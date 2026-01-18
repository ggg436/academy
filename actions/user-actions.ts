import { revalidatePath } from "next/cache";

export const changePassword = async (newPassword: string) => {
	console.log("Password change requested for guest - ignored");
	return { success: true };
};

export const deleteAccount = async () => {
	console.log("Account deletion requested for guest - ignored");
	revalidatePath("/");
	return { success: true };
};

