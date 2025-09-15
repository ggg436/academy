"use client";

import { useState } from "react";

export function UpdateGmailPhotoButton() {
  const [loading, setLoading] = useState(false);

  const updateProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/update-profile-gmail', { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        alert('Profile updated with Gmail photo! Refresh the page to see changes.');
        window.location.reload();
      } else {
        alert('Failed to update profile: ' + result.error);
      }
    } catch (error) {
      alert('Error updating profile: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={updateProfile}
      disabled={loading}
      className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-xs"
    >
      {loading ? 'Updating...' : 'Update My Gmail Photo'}
    </button>
  );
} 