"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LiveHeader from "@/components/LiveHeader";
import VideoPlayer from "@/components/VideoPlayer";
import Comments from "@/components/Comments";
import { useUser } from "@/context/UserContext";

const LivePage = () => {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [uniqueId, setUniqueId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [liveComments, setLiveComments] = useState([]);

  // Pre-fill uniqueId from user context once user data is loaded
  useEffect(() => {
    if (!userLoading && user && user.tiktok) {
      setUniqueId(user.tiktok);
    }
  }, [user, userLoading]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

const handleConnect = async () => {
    let input = uniqueId.trim();
    if (!input) return alert("Ingresa un username o URL de TikTok");

    if (input.startsWith("@")) input = input.slice(1);

    const urlMatch = input.match(/tiktok\.com\/@([^/?\s]+)/i);
    if (urlMatch) input = urlMatch[1];

    const fallbackMatch = input.match(/(?:tiktok\.com[^a-zA-Z0-9]*)([a-zA-Z0-9._]+)/i);
    if (fallbackMatch) input = fallbackMatch[1];

    let cleanUniqueId = input.replace(/[^a-zA-Z0-9._]/g, "");
    if (!cleanUniqueId || cleanUniqueId.length > 50) {
      return console.log("Username inválido");
    }

    try {
      const startRes = await fetch("/api/tiktok-live/scrape/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId: cleanUniqueId })
      });

      if (!startRes.ok) {
        const err = await startRes.json();
        console.log(err.error.includes("vivo") ? `@${cleanUniqueId} no está en vivo` : err.error);
        return;
      }

      setIsConnected(true);
      setLiveComments([]);

      // Limpiar intervalo anterior por si acaso
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Polling cada 2 segundos
      intervalRef.current = setInterval(async () => {
        try {
          const res = await fetch(`http://localhost:5000/comments?username=${cleanUniqueId}`);
          if (!res.ok) return;
          const data = await res.json();
          setLiveComments(data.comments || []);
        } catch (err) {
          console.error("Error polling:", err);
        }
      }, 2000);
    } catch (err) {
     console.log("Error de red al conectar");
    }
  };

const handleDisconnect = async () => {
    if (!uniqueId) return;

    try {
      const response = await fetch("/api/tiktok-live/scrape/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId: uniqueId.trim() }),
      });

      if (response.ok) {
        setIsConnected(false);
        setLiveComments([]);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        console.log("Desconectado correctamente");
      } else {
        const err = await response.json().catch(() => ({}));
        console.log(err.error || "Error al desconectar");
      }
    } catch (error) {
      console.error("Error de red al desconectar:", error);
    }
  };


  // Conditional rendering for input and buttons
  const renderConnectionControls = () => {
    if (userLoading) {
      return <p>Loading user data...</p>;
    }

    const TikTokIcon = () => (
      <svg
        className="w-8 h-8 text-black"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.36-4.08-1.1-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    );

    if (user && user.tiktok) {
      return (
        <div className="mt-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            {/* Encabezado de la Tarjeta */}
            <div className="flex items-center space-x-3 mb-4">
              <TikTokIcon />
              <h2 className="text-2xl font-bold text-gray-800">TikTok</h2>
            </div>

            {/* Cuerpo de la Tarjeta */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Cuenta de Usuario</p>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-1.5">
                  <span className="text-lg font-semibold text-gray-700">
                    @{user.tiktok || "username"}
                  </span>
                </div>
              </div>

              {/* Botón Condicional */}
              {!isConnected ? (
                <button
                  onClick={handleConnect}
                  disabled={!user.tiktok}
                  className="mt-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  <span>Conectar</span>
                </button>
              ) : (
                <button
                  onClick={handleDisconnect}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  <span>Desconectar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <LiveHeader
        onLogout={handleLogout}
        user={user}
        isConnected={isConnected}
      />{" "}
      {/* Pass isConnected prop */}
      <main className="pt-16 pb-4 px-4 h-screen flex">
        <section className="flex-1 flex flex-col items-center justify-center relative">
          <div className="mb-4 flex items-center">
            {renderConnectionControls()}
          </div>
          <VideoPlayer />
        </section>
        <Comments comments={liveComments} />
      </main>
    </div>
  );
};

export default LivePage;
