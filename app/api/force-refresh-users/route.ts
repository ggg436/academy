import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function POST() {
  try {
    console.log("Force refreshing Firebase users...");
    
    // Test Firebase Admin connectivity
    if (!adminAuth) {
      return NextResponse.json({
        success: false,
        error: "Firebase Admin Auth not available"
      }, { status: 500 });
    }

    // List all users
    const list = await adminAuth.listUsers(1000);
    console.log(`Found ${list.users.length} users in Firebase Auth`);
    
    if (list.users.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No users found in Firebase Auth",
        message: "This might indicate a configuration issue or no users have signed up yet"
      }, { status: 404 });
    }

    // Get detailed user information
    const userDetails = list.users.map(user => ({
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

    // Check if users have profile data
    const usersWithPhotos = userDetails.filter(u => u.photoURL);
    const usersWithNames = userDetails.filter(u => u.displayName);
    
    return NextResponse.json({
      success: true,
      totalUsers: list.users.length,
      usersWithPhotos: usersWithPhotos.length,
      usersWithNames: usersWithNames.length,
      sampleUsers: userDetails.slice(0, 5),
      message: `Successfully found ${list.users.length} users. ${usersWithPhotos.length} have profile photos, ${usersWithNames.length} have display names.`
    });
    
  } catch (error) {
    console.error("Error force refreshing Firebase users:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: error instanceof Error ? error.stack : undefined,
      message: "Failed to refresh Firebase users"
    }, { status: 500 });
  }
} 