import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    console.log("Testing Firebase Admin permissions...");
    
    const results = {
      auth: {
        listUsers: null as any,
        getUser: null as any,
      },
      firestore: {
        read: null as any,
        write: null as any,
      },
      errors: [] as string[],
    };

    // Test Auth permissions
    try {
      console.log("Testing adminAuth.listUsers...");
      const userList = await adminAuth.listUsers(5);
      results.auth.listUsers = {
        success: true,
        userCount: userList.users.length,
        sampleUsers: userList.users.slice(0, 2).map(u => ({
          uid: u.uid,
          displayName: u.displayName,
          email: u.email,
          photoURL: u.photoURL,
        }))
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      results.auth.listUsers = { success: false, error: errorMsg };
      results.errors.push(`listUsers failed: ${errorMsg}`);
    }

    // Test Firestore permissions
    try {
      console.log("Testing Firestore read...");
      const testDoc = await adminDb.collection('userProgress').limit(1).get();
      results.firestore.read = {
        success: true,
        docCount: testDoc.docs.length,
        canRead: true
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      results.firestore.read = { success: false, error: errorMsg };
      results.errors.push(`Firestore read failed: ${errorMsg}`);
    }

    try {
      console.log("Testing Firestore write...");
      // Try to create a test document
      const testRef = adminDb.collection('_test_permissions').doc('temp');
      await testRef.set({ test: true, timestamp: Date.now() });
      await testRef.delete(); // Clean up
      results.firestore.write = { success: true, canWrite: true };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      results.firestore.write = { success: false, error: errorMsg };
      results.errors.push(`Firestore write failed: ${errorMsg}`);
    }

    return NextResponse.json({
      success: true,
      results,
      summary: {
        totalTests: 3,
        passedTests: Object.values(results.auth).filter(r => r?.success).length + 
                    Object.values(results.firestore).filter(r => r?.success).length,
        hasErrors: results.errors.length > 0,
        errorCount: results.errors.length
      }
    });
    
  } catch (error) {
    console.error("Error testing Firebase Admin permissions:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: error instanceof Error ? error.stack : undefined,
      message: "Failed to test Firebase Admin permissions"
    }, { status: 500 });
  }
} 