import React from "react";
import Button from "@/components/ui/Button";
import { Radio, Users, Clock, LogOut } from "lucide-react";

export const LiveControlBar = ({
  streamerName,
  isConnected,
  onDisconnect,
  viewerCount = 0,
}) => {
  return (
    <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm z-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-full">
            <Radio
              className={`h-5 w-5 ${
                isConnected ? "text-red-500 animate-pulse" : "text-gray-400"
              }`}
            />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 leading-tight">
              {isConnected ? "En Vivo" : "Desconectado"}
            </h2>
            <p className="text-xs text-gray-500">
              {isConnected
                ? `Conectado como @${streamerName}`
                : "Esperando conexión..."}
            </p>
          </div>
        </div>

        {isConnected && (
          <>
            <div className="h-8 w-px bg-gray-200" />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} />
              <span className="font-medium">{viewerCount}</span>
              <span className="text-gray-400">espectadores</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              <span className="font-medium">00:45:20</span>
              <span className="text-gray-400">duración</span>
            </div>
          </>
        )}
      </div>

      <div>
        {isConnected && (
          <Button
            variant="danger"
            size="sm"
            icon={LogOut}
            onClick={onDisconnect}
          >
            Terminar Transmisión
          </Button>
        )}
      </div>
    </div>
  );
};
