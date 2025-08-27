import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    console.log("Testing Firebase Admin service account...");
    
    const results = {
      serviceAccount: {
        available: false,
        canListUsers: false,
        canReadFirestore: false,
        userCount: 0,
        sampleUsers: [] as any[],
      },
      environment: {
        projectId: process.env.FB_PROJECT_ID || 'NOT SET',
        clientEmail: process.env.FB_CLIENT_EMAIL ? 'SET' : 'NOT SET',
        privateKey: process.env.FB_PRIVATE_KEY ? 'SET' : 'NOT SET',
      },
      errors: [] as string[],
    };

    // Test if adminAuth is available
    if (!adminAuth) {
      results.errors.push("adminAuth is not available");
      return NextResponse.json(results);
    }

    results.serviceAccount.available = true;

    // Test listing users
    try {
      console.log("Testing adminAuth.listUsers...");
      const userList = await adminAuth.listUsers(10);
      results.serviceAccount.canListUsers = true;
      results.serviceAccount.userCount = userList.users.length;
      
      // Get sample user data
      results.serviceAccount.sampleUsers = userList.users.slice(0, 3).map(user => ({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        disabled: user.disabled,
        providerData: user.providerData?.map(p => ({
          providerId: p.providerId,
          displayName: p.displayName,
          photoURL: p.photoURL,
        })) || []
      }));
      
      console.log(`Successfully listed ${userList.users.length} users`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      results.errors.push(`Cannot list users: ${errorMsg}`);
      console.error("Error listing users:", error);
    }

    // Test Firestore access
    try {
      console.log("Testing Firestore access...");
      const testDoc = await adminDb.collection('userProgress').limit(1).get();
      results.serviceAccount.canReadFirestore = true;
      console.log(`Successfully read ${testDoc.docs.length} Firestore documents`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      results.errors.push(`Cannot read Firestore: ${errorMsg}`);
      console.error("Error reading Firestore:", error);
    }

    return NextResponse.json({
      success: true,
      results,
      summary: {
        serviceAccountWorking: results.serviceAccount.available,
        canListUsers: results.serviceAccount.canListUsers,
        canReadFirestore: results.serviceAccount.canReadFirestore,
        totalErrors: results.errors.length,
        hasUsers: results.serviceAccount.userCount > 0
      }
    });
    
  } catch (error) {
    console.error("Error testing service account:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: error instanceof Error ? error.stack : undefined,
      message: "Failed to test service account"
    }, { status: 500 });
  }
} 