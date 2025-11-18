// src/app/api/tiktok-live/ws/route.js
import { WebSocketServer } from 'ws';

let wss;

export async function GET(request) {
  // Upgrade HTTP → WebSocket
  const { socket, response } = await upgradeHttp(request);

  if (!wss) {
    wss = new WebSocketServer({ noServer: true });
    console.log('WebSocket Server iniciado en /api/tiktok-live/ws');

    wss.on('connection', (ws) => {
      console.log('Cliente WebSocket conectado (frontend o scraper)');
      ws.on('close', () => console.log('Cliente WebSocket desconectado'));
    });
  }

  wss.handleUpgrade(request, socket, Buffer.alloc(0), (ws) => {
    wss.emit('connection', ws, request);
  });

  return response;
}

// Función helper para upgrade (Next.js 15+)
async function upgradeHttp(request) {
  const { socket, response } = await new Promise((resolve) => {
    const server = {
      handleUpgrade: (req, sock, head, callback) => {
        resolve({ socket: sock, response: new Response(null, { status: 101 }) });
        callback();
      },
    };
    // Simula upgrade
    const upgrade = request.headers.get('upgrade');
    if (upgrade === 'websocket') {
      server.handleUpgrade(request, socket, head, () => {});
    }
  });
  return { socket, response };
}

// Función para reenviar comentarios desde scraper
export function broadcastComment(comment) {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(comment));
      }
    });
  }
}