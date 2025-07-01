const broadcastMessage = (message) => {
  if (global.wss) {
    global.wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
};

module.exports = { broadcastMessage };
