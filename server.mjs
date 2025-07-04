import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { initializeWebSocket } from './lib/websocket.ts';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3005;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  initializeWebSocket(server);

  // Initialize and start blockchain monitor
  const { default: BlockchainMonitor } = await import('./lib/blockchain_monitor.mjs');
  const blockchainMonitor = new BlockchainMonitor();

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
