import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';
import { adminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Get user ID from cookies
    const cookieStore = cookies();
    const authCookie = cookieStore.get('firebase-auth');
    
    if (!authCookie?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const authData = JSON.parse(authCookie.value);
    const userId = authData.uid;

    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 });
    }

    // Get user data from Firebase Auth
    const userRecord = await adminAuth.getUser(userId);
    
    const userData = {
      userName: userRecord.displayName || userRecord.email || 'User',
      userImageSrc: userRecord.photoURL || '/mascot.svg',
      email: userRecord.email,
      providerData: userRecord.providerData.map(p => p.providerId)
    };

    // Update user progress document
    await adminDb.collection('userProgress').doc(userId).update({
      userName: userData.userName,
      userImageSrc: userData.userImageSrc,
      updatedAt: Date.now(),
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated with Gmail photo',
      userData
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 