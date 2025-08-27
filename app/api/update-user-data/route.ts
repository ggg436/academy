import { NextResponse } from 'next/server';
import { updateUserProgressWithFirebaseData } from '@/actions/user-progress';

export async function POST() {
  try {
    const result = await updateUserProgressWithFirebaseData();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: 500 }
    );
  }
} 