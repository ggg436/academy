import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Validate environment variables
const requiredEnvVars = {
  FB_PROJECT_ID: process.env.FB_PROJECT_ID,
  FB_CLIENT_EMAIL: process.env.FB_CLIENT_EMAIL,
  FB_PRIVATE_KEY: process.env.FB_PRIVATE_KEY,
};

// Check if all required environment variables are set
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error("Missing Firebase Admin environment variables:", missingVars);
  console.error("Firebase Admin will not work properly without these variables");
}

let app;
try {
  app = getApps().length
    ? getApps()[0]!
    : initializeApp({
        credential: cert({
          projectId: process.env.FB_PROJECT_ID,
          clientEmail: process.env.FB_CLIENT_EMAIL,
          privateKey: (process.env.FB_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        }),
      });
  
  console.log("Firebase Admin initialized successfully");
} catch (error) {
  console.error("Failed to initialize Firebase Admin:", error);
  throw error;
}

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);

// Test Firebase Admin connectivity
export const testFirebaseAdmin = async () => {
  try {
    const auth = getAuth(app);
    const list = await auth.listUsers(1);
    return { success: true, userCount: list.users.length };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}; 