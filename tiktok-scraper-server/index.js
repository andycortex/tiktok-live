const express = require('express');
const { WebSocketServer } = require('ws');
const { WebcastPushConnection } = require('tiktok-live-connector');
const cors = require('cors'); // Import cors

const app = express();
const port = 8081; // Changed port to 8081

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Add a simple request logger middleware
app.use((req, res, next) => {
  console.log(`Scraper Server: Incoming request: ${req.method} ${req.url}`);
  next();
});

const wss = new WebSocketServer({ noServer: true });

const activeConnections = new Map(); // Map to store active TikTok connections
const wsClients = new Set(); // Set to store WebSocket clients

wss.on('connection', ws => {
  wsClients.add(ws);
  console.log('WebSocket client connected');

  ws.on('close', () => {
    wsClients.delete(ws);
    console.log('WebSocket client disconnected');
  });

  ws.on('error', error => {
    console.error('WebSocket error:', error);
    wsClients.delete(ws);
  });
});

// Helper function to broadcast messages to all connected WebSocket clients
function broadcast(message) {
  wsClients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// API to connect to a TikTok Live stream
app.post('/connect', async (req, res) => {
  console.log('Scraper Server: /connect endpoint hit');
  const { uniqueId } = req.body;
  console.log('Scraper Server: Received uniqueId:', uniqueId);

  if (!uniqueId) {
    console.error('Scraper Server: TikTok uniqueId is required');
    return res.status(400).json({ error: 'TikTok uniqueId is required' });
  }

  if (activeConnections.has(uniqueId)) {
    console.warn(`Scraper Server: Connection for ${uniqueId} already active.`);
    return res.status(400).json({ error: `Connection for ${uniqueId} already active.` });
  }

  try {
    console.log(`Scraper Server: Creating new WebcastPushConnection for ${uniqueId}`);
    const tiktokConnection = new WebcastPushConnection(uniqueId);

    tiktokConnection.on('chat', data => {
      console.log(`Chat message [${uniqueId}]:`, data.uniqueId, data.comment);
      broadcast({ type: 'chat', uniqueId, data });
    });

    tiktokConnection.on('gift', data => {
      console.log(`Gift received [${uniqueId}]:`, data.uniqueId, data.giftName, data.repeatCount);
      broadcast({ type: 'gift', uniqueId, data });
    });

    tiktokConnection.on('streamEnd', () => {
      console.log(`Stream ended for ${uniqueId}`);
      broadcast({ type: 'stream-end', uniqueId });
      tiktokConnection.disconnect();
      activeConnections.delete(uniqueId);
    });

    tiktokConnection.on('disconnected', (reason) => {
      console.log(`Disconnected from Live of @${uniqueId}. Reason: ${reason}`);
      broadcast({ type: 'disconnected', uniqueId, reason });
      activeConnections.delete(uniqueId);
    });

    tiktokConnection.on('error', (err) => {
      console.error(`Error in connection with @${uniqueId}:`, err);
      broadcast({ type: 'error', uniqueId, error: err.message });
      activeConnections.delete(uniqueId);
    });

    console.log('Scraper Server: Attempting to connect to TikTok Live');
    await tiktokConnection.connect();
    console.log('Scraper Server: Successfully connected to TikTok Live');

    activeConnections.set(uniqueId, tiktokConnection);

    res.status(200).json({ message: `Connected to TikTok Live for ${uniqueId}` });
  } catch (error) {
    console.error(`Scraper Server: Error connecting to TikTok Live for ${uniqueId}:`, error);
    res.status(500).json({ error: error.message });
  }
});

// API to disconnect from a TikTok Live stream
app.post('/disconnect', (req, res) => {
  console.log('Scraper Server: /disconnect endpoint hit');
  const { uniqueId } = req.body;
  console.log('Scraper Server: Received uniqueId for disconnect:', uniqueId);

  if (!uniqueId) {
    console.error('Scraper Server: TikTok uniqueId is required for disconnect');
    return res.status(400).json({ error: 'TikTok uniqueId is required' });
  }

  const tiktokConnection = activeConnections.get(uniqueId);

  if (tiktokConnection) {
    tiktokConnection.disconnect();
    activeConnections.delete(uniqueId);
    console.log(`Scraper Server: Disconnected from TikTok Live for ${uniqueId}`);
    return res.status(200).json({ message: `Disconnected from TikTok Live for ${uniqueId}` });
  } else {
    console.warn(`Scraper Server: No active connection found for ${uniqueId}`);
    return res.status(400).json({ error: `No active connection found for ${uniqueId}` });
  }
});

// Catch-all 404 handler
app.use((req, res) => {
  console.warn(`Scraper Server: 404 Not Found for ${req.method} ${req.url}`);
  res.status(404).send('404 Not Found');
});


const server = app.listen(port, () => {
  console.log(`TikTok Scraper Server listening on port ${port}`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit('connection', ws, request);
  });
});