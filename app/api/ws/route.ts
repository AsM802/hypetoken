import { NextRequest, NextResponse } from 'next/server';
import { WebSocketServer } from 'ws';

// This is a simplified example. In a real application, you'd manage
// WebSocket connections more robustly (e.g., using a dedicated WebSocket server
// process or a service like Pusher/Socket.io).

// This will hold our WebSocket server instance
let wss: WebSocketServer | null = null;

export async function GET(req: NextRequest) {
  // Initialize WebSocket server if not already running
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', ws => {
      console.log('Client connected to WebSocket');

      ws.on('message', message => {
        console.log(`Received: ${message}`);
        // Echo message back to client
        ws.send(`Echo: ${message}`);
      });

      ws.on('close', () => {
        console.log('Client disconnected from WebSocket');
      });

      ws.on('error', error => {
        console.error('WebSocket error:', error);
      });
    });

    console.log('WebSocket server initialized.');
  }

  // This is a workaround for Next.js's serverless function environment.
  // We need to "upgrade" the HTTP request to a WebSocket connection.
  // In a true Node.js server, you'd handle the 'upgrade' event directly.
  // For Next.js, we'll simulate it.
  // This part is tricky because Next.js API routes are designed for HTTP, not persistent connections.
  // A more robust solution for Next.js would involve a custom server or a third-party service.

  // For now, we'll just return a response indicating the WebSocket is ready.
  // The actual WebSocket connection will be initiated from the client side.
  return NextResponse.json({ message: 'WebSocket endpoint ready. Connect from client.' });
}

// Function to broadcast messages to all connected WebSocket clients
export function broadcastMessage(message: string) {
  if (wss) {
    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  }
}
