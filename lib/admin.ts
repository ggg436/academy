import { cookies } from "next/headers";

// Helper to get Firebase user ID from cookies
async function getFirebaseUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('firebase-auth');
    if (authCookie?.value) {
      const authData = JSON.parse(authCookie.value);
      return authData.uid || null;
    }
  } catch {}
  return null;
}

const adminIds = [
  "user_2dGb6YEarBAQHrNYoB5dMtISRWK",
];

export const isAdmin = async () => {
  const userId = await getFirebaseUserId();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
