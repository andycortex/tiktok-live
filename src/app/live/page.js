'use client';

import { useRouter } from 'next/navigation'; // Import useRouter
import LiveHeader from '@/components/LiveHeader';
import VideoPlayer from '@/components/VideoPlayer';
import Comments from '@/components/Comments';

const LivePage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <LiveHeader onLogout={handleLogout} />
      <main className="pt-16 pb-4 px-4 h-screen flex">
        <VideoPlayer />
        <Comments />
      </main>
    </div>
  );
};

export default LivePage;