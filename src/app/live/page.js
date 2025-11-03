'use client';

import LiveHeader from '@/components/LiveHeader';
import VideoPlayer from '@/components/VideoPlayer';
import Comments from '@/components/Comments';

const LivePage = () => {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <LiveHeader />
      <main className="pt-16 pb-4 px-4 h-screen flex">
        <VideoPlayer />
        <Comments />
      </main>
    </div>
  );
};

export default LivePage;
