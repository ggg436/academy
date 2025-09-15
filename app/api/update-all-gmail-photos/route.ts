import { NextRequest, NextResponse } from 'next/server';
import { updateAllUsersGmailPhotos } from '@/actions/user-progress';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const result = await updateAllUsersGmailPhotos();
    
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Bulk update API error:', error);
    return NextResponse.json(
      { error: 'Failed to update all users' },
      { status: 500 }
    );
  }
} 