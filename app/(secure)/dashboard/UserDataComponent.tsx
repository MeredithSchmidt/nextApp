'use client';

import { useState, useEffect } from 'react';
import { useUserfront } from "@userfront/next/client";

interface UserData {
  userId: string;
  email: string;
  username?: string;
}

export default function UserDataComponent() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userfront = useUserfront();

  useEffect(() => {
    async function fetchUserData() {
      const accessToken = userfront.accessToken();
      if (!accessToken) {
        setLoading(false);
        setError('Not authenticated');
        return;
      }

      try {
        const response = await fetch('/api/protected-route', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data.userData);
      } catch (err) {
        setError(`Error fetching user data: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userfront]);

  if (loading) return <div>Loading additional user data...</div>;
  if (error) return <div>Error loading additional data: {error}</div>;
  if (!userData) return <div>No additional user data available</div>;

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Additional User Information</h2>
      <p>User ID: {userData.userId}</p>
      <p>Username: {userData.username}</p>
    </div>
  );
}