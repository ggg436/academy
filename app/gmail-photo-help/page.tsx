import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GmailPhotoInstructions() {
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">How to Display Your Gmail Photo</h1>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Step 1: Sign in with Google</h2>
          <p className="text-blue-700 mb-4">
            Make sure you&apos;re signed in using your Google account. This allows us to access your Gmail profile photo.
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Go to Sign In
            </Button>
          </Link>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Step 2: Update Your Profile</h2>
          <p className="text-green-700 mb-4">
            Once signed in, go to the leaderboard and click &quot;Update My Gmail Photo&quot; to sync your profile picture.
          </p>
          <Link href="/leaderboard">
            <Button className="bg-green-600 hover:bg-green-700">
              Go to Leaderboard
            </Button>
          </Link>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">Step 3: Verify Your Photo</h2>
          <p className="text-purple-700 mb-4">
            After updating, refresh the page to see your Gmail photo displayed in the leaderboard.
          </p>
          <div className="text-sm text-purple-600">
            <p>✅ Your Gmail photo will appear as a circular avatar</p>
            <p>✅ If no photo is available, your initial will be shown</p>
            <p>✅ Photos are automatically synced from your Google account</p>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Troubleshooting</h2>
          <div className="text-yellow-700 space-y-2">
            <p>• Make sure you&apos;re signed in with the same Google account</p>
            <p>• Check that your Google account has a profile picture set</p>
            <p>• Try refreshing the page after updating your profile</p>
            <p>• Check the browser console for any error messages</p>
          </div>
          <Link href="/debug" className="inline-block mt-4">
            <Button className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 bg-transparent">
              Debug Issues
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 