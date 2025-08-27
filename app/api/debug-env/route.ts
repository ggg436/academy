import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    FB_PROJECT_ID: process.env.FB_PROJECT_ID ? 'Set' : 'Not Set',
    FB_CLIENT_EMAIL: process.env.FB_CLIENT_EMAIL ? 'Set' : 'Not Set',
    FB_PRIVATE_KEY: process.env.FB_PRIVATE_KEY ? 'Set' : 'Not Set',
    NODE_ENV: process.env.NODE_ENV,
  };

  return NextResponse.json(envVars);
} 