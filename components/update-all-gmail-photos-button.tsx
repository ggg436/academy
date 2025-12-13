"use client";

import { useState } from "react";

export function UpdateAllGmailPhotosButton() {
  const [loading, setLoading] = useState(false);

  const updateAllPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/update-all-gmail-photos', { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        alert(`Success! ${result.message}. Refresh the page to see all Gmail photos.`);
        window.location.reload();
      } else {
        alert('Failed to update all users: ' + result.error);
      }
    } catch (error) {
      alert('Error updating all users: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={updateAllPhotos}
      disabled={loading}
      className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-xs"
    >
      {loading ? 'Updating All...' : 'Update All Gmail Photos'}
    </button>
  );
} 
