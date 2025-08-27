import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log("Testing Firebase Admin user listing...");
    
    // Test listing users
    const list = await adminAuth.listUsers(10);
    console.log(`Found ${list.users.length} users`);
    
    // Get detailed info about first few users
    const userDetails = list.users.slice(0, 5).map(user => ({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      disabled: user.disabled,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      }
    }));
    
    return NextResponse.json({
      success: true,
      totalUsers: list.users.length,
      userDetails,
      message: `Successfully fetched ${list.users.length} users from Firebase Auth`
    });
    
  } catch (error) {
    console.error("Error testing Firebase Admin user listing:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: error instanceof Error ? error.stack : undefined,
      message: "Failed to fetch users from Firebase Auth"
    }, { status: 500 });
  }
} 