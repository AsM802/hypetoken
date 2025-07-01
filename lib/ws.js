const WebSocket = require('ws');

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', ws => {
    console.log('Client connected to WebSocket');

    ws.on('message', message => {
      console.log(`Received: ${message}`);
      ws.send(`Echo: ${message}`);
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });

    ws.on('error', error => {
      console.error('WebSocket error:', error);
    });
  });

  global.wss = wss;
  console.log('WebSocket server set up.');
}

module.exports = setupWebSocketServer;