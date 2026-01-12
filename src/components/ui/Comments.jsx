"use client";

import { useEffect, useRef } from "react";
import { MessageSquare, Pause, Settings } from "lucide-react";
import { Avatar } from "./Avatar";

const Comments = ({ comments }) => {
  const commentsEndRef = useRef(null);

  // Auto-scroll to the latest comment
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  return (
    <aside className="w-80 lg:w-96 flex flex-col bg-white border-l border-gray-100 h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-gray-500" />
          <h3 className="font-semibold text-gray-900">Chat en vivo</h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
            <Pause size={16} />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50 scroll-smooth">
        {comments.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
            <MessageSquare size={32} className="opacity-20" />
            <p className="text-sm">Esperando comentarios...</p>
          </div>
        ) : (
          comments.map((comment, index) => {
            // The API returns a flat structure: { user: string, name: string, comment: string, timestamp: string }
            // or sometimes nested. Let's handle both just in case, prioritizing the flat structure seen in logs.
            const displayName =
              comment.name ||
              comment.user?.nickname ||
              comment.user ||
              "Usuario";
            const initials = displayName.substring(0, 2).toUpperCase();

            // Avatar might not be in the flat response provided, so we rely on initials
            const avatarUrl = comment.avatar || comment.user?.avatarThumb || "";

            return (
              <div
                key={index}
                className="flex gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <Avatar
                  src={avatarUrl}
                  alt={displayName}
                  initials={initials}
                  size="sm"
                  className="flex-shrink-0 ring-2 ring-gray-50"
                  shape="circle"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-gray-900 truncate">
                      {displayName}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed break-words">
                    {comment.comment}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={commentsEndRef} />
      </div>

      {/* Input Placeholder (simulated) */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 italic">
          El chat es de solo lectura...
        </div>
      </div>
    </aside>
  );
};

export default Comments;
