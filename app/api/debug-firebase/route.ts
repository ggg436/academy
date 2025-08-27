import { NextResponse } from 'next/server';
import { debugFirebaseAdmin } from '@/actions/user-progress';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const result = await debugFirebaseAdmin();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to debug Firebase Admin' },
      { status: 500 }
    );
  }
} 