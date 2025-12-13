"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DebugPage() {
  const [firebaseResult, setFirebaseResult] = useState<any>(null);
  const [envResult, setEnvResult] = useState<any>(null);
  const [updateResult, setUpdateResult] = useState<any>(null);
  const [userListResult, setUserListResult] = useState<any>(null);
  const [permissionsResult, setPermissionsResult] = useState<any>(null);
  const [forceRefreshResult, setForceRefreshResult] = useState<any>(null);
  const [serviceAccountResult, setServiceAccountResult] = useState<any>(null);
  const [currentUserResult, setCurrentUserResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testFirebase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-firebase');
      const result = await response.json();
      setFirebaseResult(result);
    } catch (error) {
      setFirebaseResult({ error: 'Failed to test Firebase' });
    }
    setLoading(false);
  };

  const testEnv = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-env');
      const result = await response.json();
      setEnvResult(result);
    } catch (error) {
      setEnvResult({ error: 'Failed to test environment' });
    }
    setLoading(false);
  };

  const updateUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/update-user-data', { method: 'POST' });
      const result = await response.json();
      setUpdateResult(result);
    } catch (error) {
      setUpdateResult({ error: 'Failed to update user data' });
    }
    setLoading(false);
  };

  const testUserListing = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-firebase-users');
      const result = await response.json();
      setUserListResult(result);
    } catch (error) {
      setUserListResult({ error: 'Failed to test user listing' });
    }
    setLoading(false);
  };

  const testPermissions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-firebase-permissions');
      const result = await response.json();
      setPermissionsResult(result);
    } catch (error) {
      setPermissionsResult({ error: 'Failed to test permissions' });
    }
    setLoading(false);
  };

  const forceRefreshUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/force-refresh-users', { method: 'POST' });
      const result = await response.json();
      setForceRefreshResult(result);
    } catch (error) {
      setForceRefreshResult({ error: 'Failed to force refresh users' });
    }
    setLoading(false);
  };

  const testServiceAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-service-account');
      const result = await response.json();
      setServiceAccountResult(result);
    } catch (error) {
      setServiceAccountResult({ error: 'Failed to test service account' });
    }
    setLoading(false);
  };

  const testCurrentUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-current-user');
      const result = await response.json();
      setCurrentUserResult(result);
    } catch (error) {
      setCurrentUserResult({ error: 'Failed to test current user' });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Firebase Admin Debug</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <Button onClick={testEnv} disabled={loading}>
            {loading ? 'Testing...' : 'Test Environment Variables'}
          </Button>
          {envResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(envResult, null, 2)}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Firebase Admin Connectivity</h2>
          <Button onClick={testFirebase} disabled={loading}>
            {loading ? 'Testing...' : 'Test Firebase Admin'}
          </Button>
          {firebaseResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(firebaseResult, null, 2)}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Update User Data</h2>
          <Button onClick={updateUserData} disabled={loading}>
            {loading ? 'Updating...' : 'Update User Data with Firebase'}
          </Button>
          {updateResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(updateResult, null, 2)}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Test Firebase User Listing</h2>
          <Button onClick={testUserListing} disabled={loading}>
            {loading ? 'Testing...' : 'Test Firebase Admin User Listing'}
          </Button>
          {userListResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(userListResult, null, 2)}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Permissions Test</h2>
          <Button onClick={testPermissions} disabled={loading}>
            {loading ? 'Testing...' : 'Test Firebase Permissions'}
          </Button>
          {permissionsResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(permissionsResult, null, 2)}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Force Refresh Users</h2>
          <Button onClick={forceRefreshUsers} disabled={loading}>
            {loading ? 'Refreshing...' : 'Force Refresh Users'}
          </Button>
          {forceRefreshResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(forceRefreshResult, null, 2)}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Service Account Test</h2>
          <Button onClick={testServiceAccount} disabled={loading}>
            {loading ? 'Testing...' : 'Test Service Account'}
          </Button>
          {serviceAccountResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(serviceAccountResult, null, 2)}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Current User Test</h2>
          <Button onClick={testCurrentUser} disabled={loading}>
            {loading ? 'Testing...' : 'Test Current User'}
          </Button>
          {currentUserResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(currentUserResult, null, 2)}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <div className="bg-blue-50 p-4 rounded">
            <p className="mb-2">1. Check if environment variables are set correctly</p>
            <p className="mb-2">2. Test Firebase Admin connectivity</p>
            <p className="mb-2">3. Update your user data with real Firebase information</p>
            <p className="mb-2">4. Check the browser console for additional logs</p>
            <p className="mb-2">5. Ensure you have users signed up with Google in your Firebase project</p>
            <p className="mb-2">6. After updating, refresh the leaderboard page to see real user data</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
