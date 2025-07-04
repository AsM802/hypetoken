import { WebSocketServer } from 'ws';

export let wss: WebSocketServer | null = null;

export function broadcastMessage(message: string) {
  if (wss) {
    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  }
}

export function initializeWebSocket(server: any) {
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

    server.on('upgrade', (req: any, socket: any, head: any) => {
        wss?.handleUpgrade(req, socket, head, (ws) => {
            wss?.emit('connection', ws, req);
        });
    });
}