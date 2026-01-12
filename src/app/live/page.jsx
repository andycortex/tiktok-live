"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { LiveControlBar } from "@/components/live/LiveControlBar";
import VideoPlayer from "@/components/ui/VideoPlayer";
import Comments from "@/components/ui/Comments";
import { useUser } from "@/context/UserContext";
import { extractTikTokUsername } from "@/utils/tiktokUsername";
import Button from "@/components/ui/Button";
import { Tv, AlertCircle } from "lucide-react";

const LivePage = () => {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [uniqueId, setUniqueId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [liveComments, setLiveComments] = useState([]);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  // Pre-fill uniqueId from user context once user data is loaded
  useEffect(() => {
    if (!userLoading && user && user.tiktok) {
      setUniqueId(user.tiktok);
    }
  }, [user, userLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleConnect = async () => {
    setError(null);
    let input = extractTikTokUsername(uniqueId.trim());

    if (!input) {
      setError("Por favor ingresa un usuario válido.");
      return;
    }

    try {
      const startRes = await fetch("/api/tiktok-live/scrape/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId: input }),
      });

      if (!startRes.ok) {
        const err = await startRes.json();
        setError(
          err.error?.includes("vivo")
            ? `@${input} no está en vivo actualmente.`
            : "No se pudo conectar a la transmisión."
        );
        return;
      }

      setIsConnected(true);
      setLiveComments([]);

      // Start polling for comments
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/tiktok-live/scrape/comments/${input}`);
          if (!res.ok) return;
          const data = await res.json();
          if (data.comments) {
            // Append new comments or replace? Usually polling returns recent buffer.
            // For simplicity in this demo, replacing. Real app might merge.
            setLiveComments(data.comments);
          }
        } catch (err) {
          console.error("Polling error:", err);
        }
      }, 2000);
    } catch (err) {
      setError("Error de conexión. Intenta nuevamente.");
      console.error(err);
    }
  };

  const handleDisconnect = async () => {
    let input = extractTikTokUsername(uniqueId.trim());
    try {
      if (input) {
        await fetch("/api/tiktok-live/scrape/disconnect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uniqueId: input }),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsConnected(false);
      setLiveComments([]);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  // Lobby View (Disconnected)
  if (!isConnected) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tv size={32} className="text-orange-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Emitir Live
            </h1>
            <p className="text-gray-500 mb-8">
              Conecta tu cuenta de TikTok para comenzar a monitorear comentarios
              y ventas en tiempo real.
            </p>

            <div className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuario de TikTok
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400 font-medium">
                    @
                  </span>
                  <input
                    type="text"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    placeholder="usuario"
                    className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <Button
                onClick={handleConnect}
                className="w-full justify-center"
                size="lg"
                disabled={!uniqueId}
              >
                Conectar Stream
              </Button>

              <p className="text-xs text-center text-gray-400 mt-4">
                Asegúrate de que estás transmitiendo en vivo antes de conectar.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Monitor View (Connected)
  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-100px)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Top Control Bar */}
        <LiveControlBar
          streamerName={uniqueId}
          isConnected={isConnected}
          onDisconnect={handleDisconnect}
          viewerCount={1240} // Mock data for now
        />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Video Area */}
          <div className="flex-1 bg-gray-900 relative flex items-center justify-center p-4">
            {/* This container ensures the video scales nicely but doesn't overflow */}
            <div className="h-full w-full max-w-sm aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
              <VideoPlayer />
            </div>

            {/* Overlay Information (Optional) */}
            <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
              {/* Can put overlay stats here if needed */}
            </div>
          </div>

          {/* Chat Sidebar */}
          <Comments comments={liveComments} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LivePage;
