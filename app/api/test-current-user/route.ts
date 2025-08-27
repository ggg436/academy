import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log("Testing current user data from cookies...");
    
    const cookieStore = cookies();
    const authCookie = cookieStore.get('firebase-auth');
    
    if (!authCookie?.value) {
      return NextResponse.json({
        success: false,
        error: "No Firebase auth cookie found",
        message: "User might not be signed in"
      });
    }

    try {
      const authData = JSON.parse(authCookie.value);
      console.log("Auth cookie data:", authData);
      
      return NextResponse.json({
        success: true,
        userData: {
          uid: authData.uid,
          email: authData.email,
          displayName: authData.displayName,
          photoURL: authData.photoURL,
        },
        message: "Successfully parsed auth cookie data"
      });
      
    } catch (parseError) {
      return NextResponse.json({
        success: false,
        error: "Failed to parse auth cookie",
        rawCookie: authCookie.value,
        parseError: parseError instanceof Error ? parseError.message : "Unknown error"
      });
    }
    
  } catch (error) {
    console.error("Error testing current user:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to test current user data"
    }, { status: 500 });
  }
} 