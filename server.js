const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocket = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// When using `next dev`, Next.js handles hot-reloading and other dev features.
// For a custom server, we need to explicitly create the app.
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const wss = new WebSocket.Server({ server });

  wss.on('connection', ws => {
    console.log('Client connected to WebSocket');

    ws.on('message', message => {
      console.log(`Received: ${message}`);
      // For now, just echo back. Later, this will be for broadcasting new trades.
      ws.send(`Echo: ${message}`);
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });

    ws.on('error', error => {
      console.error('WebSocket error:', error);
    });
  });

  // Make the WebSocket server instance accessible globally or via a module
  // This is a simplified approach for demonstration. In a larger app,
  // you might use a dedicated module for WebSocket management.
  global.wss = wss;

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
