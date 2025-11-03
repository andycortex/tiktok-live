'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import LiveHeader from '@/components/LiveHeader';
import VideoPlayer from '@/components/VideoPlayer';
import Comments from '@/components/Comments';

const LivePage = () => {
  const router = useRouter();
  const [uniqueId, setUniqueId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [liveComments, setLiveComments] = useState([]);
  const wsRef = useRef(null); // Ref to hold the WebSocket instance

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

  const handleConnect = async () => {
    try {
      const response = await fetch('/api/tiktok-live/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueId }),
      });

      if (response.ok) {
        setIsConnected(true);
        setLiveComments([]); // Clear previous comments
        console.log(`Connected to TikTok Live for ${uniqueId}`);

        // Establish WebSocket connection
        wsRef.current = new WebSocket('ws://localhost:8081'); // Connect to the WebSocket server

        wsRef.current.onopen = () => {
          console.log('WebSocket connection opened.');
        };

        wsRef.current.onmessage = (event) => {
          console.log('WebSocket message received:', event.data);
          try {
            const message = JSON.parse(event.data);
            if (message.type === 'chat' || message.type === 'gift') {
              setLiveComments((prevComments) => [...prevComments, {
                user: message.uniqueId,
                comment: message.data.comment || message.data.giftName,
                avatar: message.data.profilePictureUrl || `https://picsum.photos/seed/${message.uniqueId}/32/32`
              }]);
            } else if (message.type === 'stream-end') {
              console.log('WebSocket: Stream ended event received');
              wsRef.current.close();
              setIsConnected(false);
            }
          } catch (parseError) {
            console.error('Error parsing WebSocket message:', parseError, event.data);
          }
        };

        wsRef.current.onerror = (error) => {
          console.error('WebSocket failed:', error);
          wsRef.current.close();
          setIsConnected(false);
        };

        wsRef.current.onclose = () => {
          console.log('WebSocket connection closed.');
          setIsConnected(false);
        };

      } else {
        const errorData = await response.json();
        console.error('Failed to connect:', errorData.error);
      }
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      // Close WebSocket connection first
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
        console.log('WebSocket closed.');
      }

      const response = await fetch('/api/tiktok-live/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueId }),
      });

      if (response.ok) {
        setIsConnected(false);
        console.log('Disconnected from TikTok Live');
      } else {
        const errorData = await response.json();
        console.error('Failed to disconnect:', errorData.error);
      }
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  // Clean up WebSocket on component unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log('WebSocket cleaned up on unmount.');
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <LiveHeader onLogout={handleLogout} />
      <main className="pt-16 pb-4 px-4 h-screen flex">
        <section className="flex-1 flex flex-col items-center justify-center relative">
          <div className="mb-4">
            <input
              type="text"
              placeholder="TikTok @username"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg mr-2"
            />
            <button
              onClick={handleConnect}
              disabled={isConnected || !uniqueId}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              Connect
            </button>
            <button
              onClick={handleDisconnect}
              disabled={!isConnected}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Disconnect
            </button>
          </div>
          <VideoPlayer />
        </section>
        <Comments comments={liveComments} />
      </main>
    </div>
  );
};

export default LivePage;
